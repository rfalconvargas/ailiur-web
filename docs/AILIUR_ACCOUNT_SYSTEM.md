# Ailiur Account System

> "Sign in with Ailiur." One canonical identity across every Ailiur product —
> with a central Account Center, connected providers, an app registry, a
> consent layer, and a shared context foundation. This is the ecosystem moat.

This document explains the foundation implemented in this repo: what an Ailiur
Account is, how it differs from Google login, and how future apps integrate.

**Related:** the user-facing **Account Center** lives at `/account`
(overview · profile · apps · connections · privacy · context · security ·
billing). The forward-looking integration/IdP spec is in
[SIGN_IN_WITH_AILIUR_SPEC.md](./SIGN_IN_WITH_AILIUR_SPEC.md).

---

## 1. What an Ailiur Account is

An **Ailiur Account** is the user's main identity object. It is the "you" that
exists across Ailiur — Qetos, Enchiridion, Oruvo, Daymesh, Retellum, Tayzt,
Tellumetry, the Unified Context Mesh, and every future app.

It lives in the `public.ailiur_accounts` table and carries:

| Field | Meaning |
|---|---|
| `id` | uuid — the canonical user id (see §3 for why it equals the auth id) |
| `email`, `display_name`, `avatar_url`, `handle` | core profile basics |
| `status` | `active` / `pending` / `suspended` / `deleted` |
| `onboarding_status` | `not_started` / `in_progress` / `completed` |
| `last_login_at`, `created_at`, `updated_at` | lifecycle timestamps |

Extended data lives in `public.account_profiles` (1:1): locale, timezone, bio,
pronouns, and four extensible JSON bags — `profile_metadata`,
`privacy_metadata`, `consent_metadata`, `workspace_metadata`.

---

## 2. How it differs from Google login

**Before:** Google *was* the user. The Auth.js Supabase adapter created a row in
`next_auth.users` and a Google row in `next_auth.accounts`, and that was the
whole identity.

**Now:** The Ailiur Account is the user. **Google is an attached identity** — a
row in `public.external_identities` with `provider = 'google'`. The same person
can later attach Apple, GitHub, passkeys, or magic links without their identity
changing. Google is something you *connect to* your account, not the account.

```
            ┌─────────────────────────┐
            │   public.ailiur_accounts │   ← the canonical "you"
            └────────────┬────────────┘
                         │ 1:1
         ┌───────────────┼───────────────────────────────┐
         │               │                               │
 account_profiles   external_identities            user_app_access
 (profile/consent)  (google, apple, github…)       (which apps you use)
                         │
                  connected_accounts
                  (gmail, gcal, drive, notion…)
```

Crucially, **Google auth still works untouched.** The adapter keeps writing
`next_auth.*`; database triggers mirror those rows into the Ailiur layer (§3).

---

## 3. Architecture: why the Ailiur layer keys off the auth id

The Auth.js Supabase adapter *owns* the `next_auth` schema. Rather than fight
it, the Ailiur Account layer lives in `public` and is keyed **1:1 to
`next_auth.users.id`** — `ailiur_accounts.id` *is* the auth user id.

Why this matters:

- `session.user.id`, the minted Supabase JWT `sub`, and `next_auth.uid()` all
  already point at that id. Reusing it means **RLS, every subdomain, and every
  existing session keep working with zero remapping.**
- Migration of existing users is trivial and non-duplicating (§6).

Two `SECURITY DEFINER` triggers keep the layers in sync
(`0002_ailiur_account_system.sql`):

| Trigger on | Mirrors into |
|---|---|
| `next_auth.users` (insert/update) | `ailiur_accounts` + `account_profiles` |
| `next_auth.accounts` (insert/update) | `external_identities` |

So a brand-new Google sign-in automatically produces a full Ailiur Account.

### Session & cross-subdomain
Sessions are JWT (`auth.config.ts`), shared across `*.ailiur.com` via a
parent-domain cookie + shared `AUTH_SECRET`. "Option B" mints a short-lived
Supabase JWT (`sub = account id`) so Postgres RLS sees `next_auth.uid()`. Every
account-scoped table is protected by `account_id = next_auth.uid()` policies;
`app_registry` is public-read.

`account_sessions` is an **optional device/session ledger** for "your devices"
and remote sign-out — JWTs are stateless, so it is an audit aid, not the
session store.

---

## 4. Connected providers vs. connected accounts

Two deliberately separate concepts:

- **`external_identities`** — providers used to **sign in** (Google, Apple,
  GitHub). Stores provider, provider account id, scopes, tokens, connection
  status, and `is_primary_login`. Mirrored from `next_auth.accounts`.
- **`connected_accounts`** — external **data sources** you connect for context
  (Google Calendar, Gmail, Drive, Notion, Spotify). May be backed by an
  `external_identity` (OAuth) or stand alone. This is where "connect Gmail to
  Ailiur" lands, distinct from "log in with Google."

> Tokens (`access_token` / `refresh_token`) are stored server-side only and are
> **never** selected into client responses (see `IDENTITY_COLUMNS` in
> `src/lib/account/server.ts`).

---

## 5. App registry & permissions

### App registry (`app_registry`)
A system-level catalog of every Ailiur app. Public-read. Each entry has a
`slug`, `name`, `category` (`consumer` / `enterprise` / `provider` /
`institution` / `internal`), `url`, `status` (`active` / `coming_soon` /
`internal` / `disabled`), brand metadata, and three string arrays:
`required_permissions`, `optional_permissions`, `context_types`.

Seeded in `0003_seed_app_registry.sql` and mirrored for the UI in
`src/lib/account/app-registry.ts` *(TS catalog — keep the two in sync)*.

### Permission & consent layer
- **`user_app_access`** — which apps a user has connected (status + roles).
- **`app_context_permissions`** — the consent rows: one per
  `(account, app, permission)` with a `state` of `granted` / `denied` /
  `revoked` / `pending`. **This is what users grant and revoke.**

Permissions are `<domain>:<action>` strings (catalog in
`src/lib/account/permissions.ts`), e.g.:

```
profile:read         profile:write
context:read         context:write          (cross-app — the moat)
health_context:read  learning_context:read  finance_context:read
calendar_context:read
google_calendar:read google_gmail:read      google_drive:read
app_data:read        app_data:write
```

Strings (not an enum) so new products add domains without a migration.

---

## 6. Context foundation (the moat)

One account can gather context from many apps and sources so one app can
improve another **with consent**.

- **`context_sources`** — registry of where an account's context comes from:
  either an Ailiur app (`app_id`) or an external connection
  (`connected_account_id`), producing a `context_type`.
- **`context_records`** — normalized context units: `context_type`, `title`,
  `summary`, `raw_metadata`, `normalized_metadata`, `privacy_level`
  (`local` / `account` / `cross_app` / `shared` / `public`), `occurred_at`.

> AI retrieval/embeddings are intentionally **out of scope** for now — this is
> the clean account/data foundation only. An append-only `context_events`
> variant can be layered on later; `context_records` is the current store.

---

## 7. How a future Ailiur app integrates

A new app (say `iris.ailiur.com`) should:

1. **Add itself to the registry** — a row in `app_registry` (and the TS
   mirror), declaring `required_permissions`, `optional_permissions`, and
   `context_types`.
2. **Read the session** — import the shared `auth.config.ts` + `AUTH_SECRET`;
   no adapter or Google provider needed to *read* a session. `session.user.id`
   is the Ailiur Account id.
3. **Identify the account** — call `GET /api/account/me` on ailiur.com (shared
   cookie) or query `ailiur_accounts` directly with the Option-B Supabase JWT.
4. **Request consent** — create/aspire `app_context_permissions` rows; gate
   features on `state = 'granted'`.
5. **Contribute & read context** — write `context_records` it owns; read
   cross-app context only for granted scopes.

### Server data layer (this repo)
`src/lib/account/server.ts` exposes RLS-scoped reads — `getAiliurAccount()`,
`getAccountProfile()`, `getExternalIdentities()`, `getConnectedAccounts()`,
`getAuthorizedApps()`, `getAppPermissions()`, and `getAccountOverview()`. They
never take an `accountId`; RLS scopes everything to the signed-in user.
`recordSignIn()` (in `mutations.ts`, service-role) stamps `last_login_at` from
the Auth.js `signIn` event.

---

## 8. The "Sign in with Ailiur" experience

The auth surface is **Ailiur-first**. Google is no longer the headline.

**Primary — email magic link.** `/login` and `/signup` lead with an email field
and a "Sign in with Ailiur" / "Create your Ailiur Account" button. Submitting
calls `signIn('resend', { email, redirect: false })`; Auth.js issues a
verification token (stored in `next_auth.verification_tokens`) and
`sendAiliurMagicLink` either sends a branded Resend email (prod) or **logs the
link to the server console** (dev, when `AUTH_RESEND_KEY` is unset — so the flow
is testable with zero email infra). Clicking the link hits
`/api/auth/callback/resend`, the adapter creates/resolves the `next_auth.users`
row (→ trigger creates the `ailiur_accounts` row), and a JWT session is issued.

**Secondary — Continue with Google.** Kept (the original system was Google-only)
but visually and verbally demoted: it sits below an "or" divider and reads
"Signs into your Ailiur Account using Google as a verification method." Google is
an *attached* identity, never the account. `allowDangerousEmailAccountLinking`
is enabled on the Google provider so a magic-link user can later connect Google
(same verified email) and it links to the **same** Ailiur Account.

**Routing.** Both paths use `callbackUrl=/dashboard`. The dashboard is the
onboarding gate: if `onboarding_status !== 'completed'`, it redirects to
`/onboarding`. New users therefore always land in onboarding first.

**Onboarding (`/onboarding`)** is a 4-step wizard (profile → app interests →
connect Google → privacy/consent), each step persisted by a server action.
Privacy defaults are conservative: cross-app context is **off** until the user
opts in. The current step is mirrored to `?step=` so the Google OAuth round-trip
resumes in place.

**Dashboard (`/dashboard`)** shows the profile/status card, connected providers
(with Google connect/disconnect), connected apps, privacy/context status, the
product catalog, and an "Open Account Center" button (the in-app overlay). If the
account row isn't provisioned yet (migrations not applied) it degrades to a
session-based view with a notice instead of breaking.

### Auth edge cases handled
- **Duplicate email** — the adapter keys users by email; magic-link + Google for
  one email resolve to one account (linking enabled).
- **Provider already linked** — `external_identities` has a unique
  `(provider, provider_account_id)`; the sync trigger upserts rather than dupes.
- **Revoked Google** — `disconnectGoogle()` marks the identity/connections
  `revoked`; the dashboard then offers "Reconnect Google".
- **Logout** — `signOut({ callbackUrl: '/' })` from the nav account menu.
- **Validation / errors** — email format is validated client-side; send and
  callback failures surface inline and via `/login?error=…`.

## 9. Files & schema map

| File | Purpose |
|---|---|
| `supabase/migrations/0002_ailiur_account_system.sql` | All tables, enums, RLS, sync triggers |
| `supabase/migrations/0003_seed_app_registry.sql` | Seeds the app catalog |
| `supabase/migrations/0004_backfill_existing_accounts.sql` | Migrates existing Google users |
| `src/lib/account/types.ts` | TS types mirroring the schema |
| `src/lib/account/permissions.ts` | Permission + context-type catalog |
| `src/lib/account/app-registry.ts` | TS mirror of the seeded apps |
| `src/lib/account/server.ts` | RLS-scoped server reads |
| `src/lib/account/mutations.ts` | Service-role writes (`recordSignIn`) |
| `src/lib/account/actions.ts` | Onboarding + connection server actions |
| `src/lib/auth/email.ts` | Branded magic-link sender (+ dev console fallback) |
| `src/utils/supabase/admin.ts` | Service-role client (server-only) |
| `src/app/api/account/me/route.ts` | `GET /api/account/me` overview endpoint |
| `src/components/auth/ailiur-auth-form.tsx` | Email-first auth form (login + signup) |
| `src/app/login/page.tsx`, `src/app/signup/page.tsx` | Ailiur-first auth pages |
| `src/app/verify-request/page.tsx` | "Check your email" page |
| `src/app/onboarding/page.tsx` + `src/components/onboarding/onboarding-flow.tsx` | 4-step onboarding |
| `src/app/dashboard/page.tsx` + `src/components/dashboard/*` | Authenticated account dashboard |
| `src/components/app/profile-settings.tsx` | Account Center Profile, live |
| `src/auth.ts` | Resend + Google providers, `events.signIn` |
| `src/auth.config.ts` | `pages.signIn=/login`, same-origin redirect allow |

---

## 10. Migration & local testing

```bash
# Apply the migrations to your Supabase project
cd web
supabase db push          # runs 0002, 0003, 0004 in order
# (or paste each file into the Supabase SQL Editor in order)

# After 0002: Dashboard → Settings → API → Exposed schemas must include
# `next_auth` (already required by 0001) and `public` (default).

npm run dev
```

**Test "Sign in with Ailiur" (magic link) — no email infra needed:**
1. Go to `/login`, enter any email, click **Sign in with Ailiur**.
2. The page shows "Check your inbox"; the magic link is printed to the **dev
   server console** (because `AUTH_RESEND_KEY` is unset). Open that link.
3. You're signed in and routed to `/dashboard` → (new user) `/onboarding`.
4. Set `AUTH_RESEND_KEY` to send real branded emails instead.

**Test Google (secondary / connect):**
- Click **Continue with Google** on `/login` — resolves to your Ailiur Account.
- Or, signed in, use **Connect Google** on `/dashboard` / onboarding step 3.
  Same-email accounts link to one Ailiur Account.

**Test the account API:** `curl http://localhost:3000/api/account/me`.

### Environment variables
The account system reuses existing vars; the magic-link login adds two
(optional in dev):

| Var | Used for |
|---|---|
| `AUTH_SECRET` | Auth.js JWT signing (existing) |
| `AUTH_RESEND_KEY` | **Magic-link email** via Resend. Unset → links log to console (dev) |
| `AUTH_EMAIL_FROM` | From address for magic-link emails (Resend-verified domain in prod) |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | Google provider (existing) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (existing) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Anon/authed data client (existing) |
| `SUPABASE_SERVICE_ROLE_KEY` | Adapter + **admin client / `recordSignIn`** (existing) |
| `SUPABASE_JWT_SECRET` | Option-B RLS bridge — **required** for per-user reads/writes |
| `AUTH_COOKIE_DOMAIN` | `.ailiur.com` in prod for cross-subdomain session |

> If `SUPABASE_JWT_SECRET` is unset, the data client stays on the anon role and
> RLS will (correctly) return no account rows — onboarding writes and the
> dashboard's account data won't work. Set it for the full experience.

---

## 11. What remains to be implemented (TODOs)

- **Write paths / consent UI** — granting & revoking `app_context_permissions`
  from Settings; OAuth-style consent screens for third-party Ailiur apps.
- **Connected-accounts flows** — actual Gmail/Calendar/Drive connect + token
  refresh into `connected_accounts`; surface in Settings → Integrations.
- **Account linking** — DONE for Google (same-email linking via
  `allowDangerousEmailAccountLinking`). Still TODO: an explicit in-app "link
  another provider" flow and the backfill email-collision policy (0004 does not
  auto-merge two pre-existing separate users).
- **Passkeys** — schema supports them as `external_identities` providers; wire
  the Auth.js passkey provider. (Email magic link is DONE.)
- **Email deliverability** — set `AUTH_RESEND_KEY` + a verified `AUTH_EMAIL_FROM`
  domain for production; the dev console fallback is not for prod.
- **Session ledger population** — write `account_sessions` rows on sign-in for a
  real "your devices" + remote sign-out experience.
- **Context ingestion** — per-app writers into `context_records`, plus the
  cross-app read API gated by `context:read`. (Retrieval/embeddings later.)
- **Generated types** — replace hand-written `types.ts` with
  `supabase gen types typescript` once the schema settles.
- **`last_login_at` accuracy** — `recordSignIn` covers Google now; ensure every
  future provider's sign-in path hits the same event.

---

## 12. Rollback

Each migration ends with explicit rollback SQL. Because the entire Ailiur layer
keys off `next_auth.users.id` and `next_auth.*` is never modified, **rolling
back the Ailiur layer cannot break Google login** — and re-running the
migrations fully reconstructs the layer from the auth tables.
