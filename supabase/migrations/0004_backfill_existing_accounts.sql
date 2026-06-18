-- =============================================================================
-- 0004 — Backfill existing Google-auth users into Ailiur Accounts
-- =============================================================================
-- The triggers in 0002 only fire on FUTURE next_auth writes. This migration
-- migrates users who already signed in with Google BEFORE this system existed.
--
-- Rules honored:
--   • Existing Google users become canonical Ailiur Accounts.
--   • Their Google identity is attached as an external_identity (not the user).
--   • No duplicate users: ailiur_accounts.id reuses next_auth.users.id exactly,
--     so existing session ids / JWTs / RLS keep working unchanged.
--   • Email matching is NOT used to merge — we key strictly on the existing
--     auth user id, which is already unique. (Email-based merging of separate
--     auth users is deliberately left as a manual, reviewed step — see docs.)
--   • Fully idempotent: safe to run multiple times (ON CONFLICT guards).
--
-- Apply with `supabase db push`. Requires 0002 (and ideally 0003).
-- =============================================================================

-- 1. One Ailiur Account per existing auth user.
insert into public.ailiur_accounts (id, email, display_name, avatar_url, last_login_at)
select u.id, u.email, u.name, u.image, null
from next_auth.users u
on conflict (id) do nothing;

-- 2. Extended profile row per account.
insert into public.account_profiles (account_id, full_name)
select u.id, u.name
from next_auth.users u
on conflict (account_id) do nothing;

-- 3. Attach each existing OAuth account (Google, etc.) as an external_identity.
--    The first identity per account is marked primary.
with ranked as (
  select
    a."userId"               as account_id,
    a.provider               as provider,
    a."providerAccountId"    as provider_account_id,
    u.email                  as provider_email,
    case when a.scope is null then '{}'::text[]
         else string_to_array(a.scope, ' ') end as scopes,
    a.access_token           as access_token,
    a.refresh_token          as refresh_token,
    case when a.expires_at is null then null
         else to_timestamp(a.expires_at) end    as expires_at,
    row_number() over (partition by a."userId" order by a.id) as rn
  from next_auth.accounts a
  join next_auth.users u on u.id = a."userId"
)
insert into public.external_identities (
  account_id, provider, provider_account_id, provider_email, scopes,
  access_token, refresh_token, expires_at, connection_status,
  is_primary_login, last_refreshed_at
)
select
  account_id, provider, provider_account_id, provider_email, scopes,
  access_token, refresh_token, expires_at, 'connected',
  (rn = 1), now()
from ranked
on conflict (provider, provider_account_id) do nothing;

-- 4. (Optional convenience) auto-enroll every existing account into the main
--    Ailiur app so the Account Center has something to show on day one.
insert into public.user_app_access (account_id, app_id, access_status, first_authorized_at)
select acc.id, app.id, 'active', now()
from public.ailiur_accounts acc
cross join lateral (select id from public.app_registry where slug = 'ailiur') app
on conflict (account_id, app_id) do nothing;

-- =============================================================================
-- ROLLBACK (manual, destructive — only if you want to discard the Ailiur layer
-- data for migrated users; next_auth.* is the source of truth and is untouched):
--
--   delete from public.user_app_access
--     where app_id = (select id from public.app_registry where slug = 'ailiur');
--   delete from public.external_identities
--     where (provider, provider_account_id) in
--       (select provider, "providerAccountId" from next_auth.accounts);
--   delete from public.account_profiles
--     where account_id in (select id from next_auth.users);
--   delete from public.ailiur_accounts
--     where id in (select id from next_auth.users);
--
-- Because everything keys off next_auth.users.id, re-running this migration
-- after a rollback fully reconstructs the Ailiur layer.
-- =============================================================================
