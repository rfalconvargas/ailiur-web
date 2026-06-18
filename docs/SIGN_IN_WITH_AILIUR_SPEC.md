# Sign in with Ailiur — Developer Spec (v0)

> How a future Ailiur app (consumer, enterprise, provider) integrates with the
> Ailiur Account as its identity + context layer. This is the forward-looking
> spec; some pieces are implemented today and some are documented TODOs. Where
> they differ, it says so explicitly.

Related: [AILIUR_ACCOUNT_SYSTEM.md](./AILIUR_ACCOUNT_SYSTEM.md) (account model,
schema, migrations) and the live Account Center at `/account`.

---

## 1. Product purpose

"Sign in with Ailiur" makes the **Ailiur Account** the canonical identity across
every Ailiur product — the way "Sign in with Google" works for the Google
ecosystem, but owned by Ailiur. The payoff is the **Context Mesh**: each app
keeps its own data, but the account can broker user-approved context between
apps. That shared, consented context is the moat.

Three principles:
1. **Ailiur Account is the identity.** Google/Apple/etc. attach to it.
2. **Conservative by default.** No cross-app data flows without explicit consent.
3. **Transparent & reversible.** Every grant is visible and revocable in `/account`.

---

## 2. Account model

The canonical identity (`public.ailiur_accounts`), keyed 1:1 to the Auth.js user
id, with `account_profiles` for extended/JSON data. One account spans all apps.
See AILIUR_ACCOUNT_SYSTEM.md §1–3.

```
ailiur_accounts ──1:1── account_profiles
       │
       ├──< external_identities      (google, apple, github — login providers)
       ├──< connected_accounts        (gmail, gcal, drive — data sources)
       ├──< user_app_access           (which apps the account uses)
       ├──< app_context_permissions   (per-app, per-scope consent)
       ├──< context_sources           (where context comes from)
       └──< context_records           (normalized context units)
```

## 3. App model

Every Ailiur app is a row in `public.app_registry`:
`slug, name, category (consumer|enterprise|provider|institution|internal), url,
status, required_permissions[], optional_permissions[], context_types[]`.

An app appears in a user's Account Center once they have a `user_app_access` row
(`active` | `pending` | `revoked`). The app declares the scopes it needs; the
user grants them as `app_context_permissions`.

## 4. Provider model

- **`external_identities`** — providers used to *authenticate* (Google today).
- **`connected_accounts`** — external *data sources* (Gmail, Calendar, Drive…),
  optionally linked to an identity. Connecting a data source ≠ logging in.

## 5. Permission scopes

`<domain>:<action>` strings (catalog in `src/lib/account/permissions.ts`):

| Scope | Meaning |
|---|---|
| `profile:read` / `profile:write` | Account profile basics |
| `context:read` / `context:write` | Cross-app context (the moat) |
| `health_context:read`, `learning_context:read`, `finance_context:read`, `calendar_context:read`, `media_context:read`, `creative_context:read`, `project_context:read` | Domain context (read) |
| `google_calendar:read`, `google_gmail:read`, `google_drive:read` | Connected Google data |
| `app_data:read` / `app_data:write` | The app's own data |

Strings (not an enum) so new apps add domains without a migration.

## 6. Suggested OAuth/OIDC-style flow (FUTURE)

> **Status: NOT YET IMPLEMENTED.** Today, cross-subdomain apps share the session
> via a parent-domain cookie + shared `AUTH_SECRET` (§8). The flow below is the
> target once Ailiur runs a real **Identity Provider / OIDC service**.

```
1. App (qetos.ailiur.com) needs the user → redirects to:
   https://www.ailiur.com/oauth/authorize
     ?client_id=qetos
     &redirect_uri=https://qetos.ailiur.com/api/ailiur/callback
     &scope=profile:read context:read health_context:write
     &state=<csrf>
2. Ailiur authenticates the user (magic link / Google) if not already.
3. Ailiur shows a CONSENT screen listing the requested scopes
   (backed by app_context_permissions). User approves/declines per scope.
4. Ailiur redirects back with ?code=<authz_code>&state=<csrf>.
5. App exchanges code at https://www.ailiur.com/oauth/token (server-to-server,
   client_secret) → { access_token, id_token (OIDC), refresh_token }.
6. App calls https://www.ailiur.com/api/account/me (or a userinfo endpoint)
   with the access token → canonical account id + granted scopes.
7. App reads/writes context via the Context Mesh API, gated by granted scopes.
8. The app already shows in the user's Account Center (user_app_access).
```

### Callback / redirect rules
- `redirect_uri` must be an allow-listed `*.ailiur.com` URL per registered app.
- `state` is required (CSRF). PKCE for public clients.
- The Auth.js `redirect` callback already restricts post-auth redirects to the
  same origin or `*.ailiur.com` (`src/auth.config.ts`).

## 7. Token / session strategy (high level)

- **Today:** stateless **JWT** session (Auth.js), shared across `*.ailiur.com`
  via a `.ailiur.com` cookie + shared `AUTH_SECRET`. "Option B" mints a
  short-lived Supabase JWT (`sub = account id`) so Postgres RLS scopes data per
  user (`next_auth.uid()`).
- **Future IdP:** issue OIDC `id_token` (identity) + `access_token` (scoped,
  short-lived) + `refresh_token` (rotating). Access tokens carry the granted
  scope set; the Context Mesh API authorizes each call against
  `app_context_permissions`.

## 8. Cross-subdomain behavior (TODAY)

Any `*.ailiur.com` app can **read the session now** without the IdP:
1. Import the shared, edge-safe `auth.config.ts` and use the same `AUTH_SECRET`.
2. `NextAuth(authConfig)` → `auth()` returns the session; `session.user.id` is
   the Ailiur Account id.
3. Mint the Option-B Supabase JWT (same `SUPABASE_JWT_SECRET`) to read/write the
   account's RLS-scoped data.

This is enough for first-party apps Ailiur controls. The OIDC flow (§6) is for
when apps need *scoped, consented, server-to-server* access rather than implicit
shared-cookie trust.

## 9. Security considerations

- Never expose `SUPABASE_SERVICE_ROLE_KEY` / `AUTH_SECRET` / `SUPABASE_JWT_SECRET`
  to the client. OAuth `client_secret`s are server-only.
- OAuth tokens for connected providers (Google) are stored server-side in
  `external_identities` / `connected_accounts` and **never** selected into client
  responses (see `IDENTITY_COLUMNS` in `server.ts`).
- Enforce `redirect_uri` allow-lists, `state`/PKCE, short token TTLs, rotation.
- All per-user data is RLS-scoped to `account_id = next_auth.uid()`.
- Consent is per-scope and revocable; revocation must invalidate issued tokens
  (needs the session-version/`jti` work in the TODOs).
- True "sign out everywhere" requires server-side session revocation (rotate
  `AUTH_SECRET` or add a session-version claim) — stateless JWTs can't be killed
  individually today.

## 10. Example integration (future subdomain app)

```ts
// qetos.ailiur.com — app/api/ailiur/callback/route.ts (sketch, FUTURE IdP)
export async function GET(req: Request) {
  const { code, state } = parseQuery(req);
  assertState(state);
  const tokens = await fetch('https://www.ailiur.com/oauth/token', {
    method: 'POST',
    body: form({ grant_type: 'authorization_code', code, client_id: 'qetos',
      client_secret: process.env.AILIUR_CLIENT_SECRET!,
      redirect_uri: 'https://qetos.ailiur.com/api/ailiur/callback' }),
  }).then(r => r.json());

  const me = await fetch('https://www.ailiur.com/api/account/me', {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  }).then(r => r.json());

  // me.overview.account.id is the canonical Ailiur Account id.
  await createLocalSession(me.overview.account.id, tokens);
  return redirect('/');
}
```

Until the IdP exists, a first-party subdomain instead uses the shared-cookie
approach in §8 — no token exchange needed.

## 11. TODOs before public launch

- [ ] **Ailiur Identity Provider / OIDC service** — `/oauth/authorize`,
      `/oauth/token`, userinfo, per-app `client_id`/`client_secret`, redirect
      allow-lists, consent screen backed by `app_context_permissions`.
- [ ] **Context Mesh API** — scoped read/write of `context_records`, authorized
      by granted permissions (`context:read` / domain scopes).
- [ ] **Connected data sync** — real Gmail/Calendar/Drive ingestion into
      `connected_accounts` + `context_records` (currently metadata-only).
- [ ] **Token revocation / sign-out-everywhere** — session-version or `jti`.
- [ ] **Account deletion** — cascade across `next_auth.*` + the Ailiur layer.
- [ ] **Passkeys** — Auth.js passkey provider as an `external_identity`.
- [ ] **Audit log** — record consent grants/revocations and cross-app reads.
- [ ] **Rate limiting & abuse protection** on auth + token endpoints.
- [ ] Apply migrations `0002–0004` to production and set `SUPABASE_JWT_SECRET`.
