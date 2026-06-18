-- =============================================================================
-- 0002 — Ailiur Account System
-- =============================================================================
-- The canonical "Ailiur Account" layer: one identity that works across every
-- Ailiur product ("Sign in with Ailiur"), plus the app registry, consent layer,
-- and context foundation that make the ecosystem a moat.
--
-- DESIGN: the Auth.js Supabase adapter OWNS the `next_auth` schema
-- (next_auth.users + next_auth.accounts). We do NOT replace it. Instead this
-- layer lives in `public`, keyed 1:1 to next_auth.users.id, and is kept in sync
-- by triggers (see bottom of file). This means:
--   • Google login keeps working untouched (the adapter still writes next_auth).
--   • Every existing/new auth user automatically gets an Ailiur Account.
--   • session.user.id / the minted Supabase JWT `sub` / next_auth.uid() all keep
--     pointing at the SAME id — so RLS and every subdomain keep working.
--
-- Apply with the Supabase CLI:  `supabase db push`
-- (or paste into the SQL Editor). Requires 0001 to have run first.
-- =============================================================================

create extension if not exists "uuid-ossp";

-- -----------------------------------------------------------------------------
-- Enums
-- -----------------------------------------------------------------------------
do $$ begin
  create type public.account_status as enum ('active', 'pending', 'suspended', 'deleted');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.onboarding_status as enum ('not_started', 'in_progress', 'completed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.app_category as enum ('consumer', 'enterprise', 'provider', 'institution', 'internal');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.app_status as enum ('active', 'coming_soon', 'internal', 'disabled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.connection_status as enum ('connected', 'expired', 'revoked', 'error', 'disconnected');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.permission_state as enum ('granted', 'denied', 'revoked', 'pending');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.access_status as enum ('active', 'invited', 'pending', 'revoked');
exception when duplicate_object then null; end $$;

-- How sensitive a context record is / how widely it may travel.
do $$ begin
  create type public.privacy_level as enum ('local', 'account', 'cross_app', 'shared', 'public');
exception when duplicate_object then null; end $$;

-- -----------------------------------------------------------------------------
-- Shared updated_at trigger helper
-- -----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =============================================================================
-- 1. ailiur_accounts — the canonical identity object
-- =============================================================================
-- id is the SAME uuid as next_auth.users.id (1:1). Google/Apple/etc. are NOT
-- the user; they attach as external_identities below.
create table if not exists public.ailiur_accounts (
  id                 uuid primary key
                       references next_auth.users (id) on delete cascade,
  email              text,
  display_name       text,
  avatar_url         text,
  handle             text unique,                         -- optional @username
  status             public.account_status not null default 'active',
  onboarding_status  public.onboarding_status not null default 'not_started',
  last_login_at      timestamptz,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

create index if not exists ailiur_accounts_email_idx on public.ailiur_accounts (lower(email));

drop trigger if exists trg_ailiur_accounts_updated_at on public.ailiur_accounts;
create trigger trg_ailiur_accounts_updated_at
  before update on public.ailiur_accounts
  for each row execute function public.set_updated_at();

-- =============================================================================
-- 2. account_profiles — 1:1 extended profile + privacy/consent metadata
-- =============================================================================
create table if not exists public.account_profiles (
  account_id          uuid primary key
                        references public.ailiur_accounts (id) on delete cascade,
  full_name           text,
  pronouns            text,
  bio                 text,
  locale              text default 'en-US',
  timezone            text default 'UTC',
  -- Free-form, app-extensible bags. Kept as jsonb so products can add fields
  -- without a migration; promote hot fields to columns later.
  profile_metadata    jsonb not null default '{}'::jsonb,   -- prefs, theme, avatars…
  privacy_metadata    jsonb not null default '{}'::jsonb,   -- local-first toggles, visibility
  consent_metadata    jsonb not null default '{}'::jsonb,   -- ToS/marketing/research consents + timestamps
  workspace_metadata  jsonb not null default '{}'::jsonb,   -- primary workspace, org, seat info
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

drop trigger if exists trg_account_profiles_updated_at on public.account_profiles;
create trigger trg_account_profiles_updated_at
  before update on public.account_profiles
  for each row execute function public.set_updated_at();

-- =============================================================================
-- 3. external_identities — login providers attached to an Ailiur Account
-- =============================================================================
-- Google / Apple / GitHub / future. Mirrors next_auth.accounts (the adapter's
-- table) via a trigger, enriched with connection lifecycle + scope tracking.
-- THIS is where "Google is no longer the user — it's an attached identity"
-- becomes concrete.
create table if not exists public.external_identities (
  id                    uuid primary key default uuid_generate_v4(),
  account_id            uuid not null references public.ailiur_accounts (id) on delete cascade,
  provider              text not null,                       -- 'google', 'apple', 'github'…
  provider_account_id   text not null,                       -- provider's stable user id
  provider_email        text,
  scopes                text[] not null default '{}',
  access_token          text,
  refresh_token         text,
  expires_at            timestamptz,
  connection_status     public.connection_status not null default 'connected',
  is_primary_login      boolean not null default false,      -- the provider used to create the account
  last_refreshed_at     timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  constraint external_identities_provider_uid_unique unique (provider, provider_account_id)
);

create index if not exists external_identities_account_idx on public.external_identities (account_id);

drop trigger if exists trg_external_identities_updated_at on public.external_identities;
create trigger trg_external_identities_updated_at
  before update on public.external_identities
  for each row execute function public.set_updated_at();

-- =============================================================================
-- 4. connected_accounts — external DATA sources (not necessarily login)
-- =============================================================================
-- e.g. Google Calendar, Gmail, Drive, Notion, Spotify. A connected account may
-- be backed by an external_identity (OAuth) or stand alone (API key). This is
-- distinct from external_identities, which is specifically about *signing in*.
create table if not exists public.connected_accounts (
  id                    uuid primary key default uuid_generate_v4(),
  account_id            uuid not null references public.ailiur_accounts (id) on delete cascade,
  identity_id           uuid references public.external_identities (id) on delete set null,
  provider              text not null,                       -- 'google_calendar', 'gmail', 'notion'…
  external_account_label text,                               -- e.g. the connected email/handle
  scopes                text[] not null default '{}',
  connection_status     public.connection_status not null default 'connected',
  metadata              jsonb not null default '{}'::jsonb,
  last_synced_at        timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now(),
  constraint connected_accounts_unique unique (account_id, provider, external_account_label)
);

create index if not exists connected_accounts_account_idx on public.connected_accounts (account_id);

drop trigger if exists trg_connected_accounts_updated_at on public.connected_accounts;
create trigger trg_connected_accounts_updated_at
  before update on public.connected_accounts
  for each row execute function public.set_updated_at();

-- =============================================================================
-- 5. account_sessions — device / session ledger (audit + revocation)
-- =============================================================================
-- Sessions are JWT (stateless) today, so this is an OPTIONAL audit ledger for
-- "your devices" + remote sign-out. Populated on sign-in (see auth.ts events).
create table if not exists public.account_sessions (
  id              uuid primary key default uuid_generate_v4(),
  account_id      uuid not null references public.ailiur_accounts (id) on delete cascade,
  session_token   text unique,                               -- jti / opaque ref (not the JWT itself)
  user_agent      text,
  ip_address      inet,
  origin_app_id   uuid,                                      -- which app initiated (soft ref to app_registry)
  created_at      timestamptz not null default now(),
  last_seen_at    timestamptz not null default now(),
  expires_at      timestamptz,
  revoked_at      timestamptz
);

create index if not exists account_sessions_account_idx on public.account_sessions (account_id);

-- =============================================================================
-- 6. app_registry — the catalog of Ailiur apps (public read)
-- =============================================================================
create table if not exists public.app_registry (
  id                    uuid primary key default uuid_generate_v4(),
  slug                  text not null unique,
  name                  text not null,
  category              public.app_category not null,
  url                   text,                                -- https://qetos.ailiur.com
  status                public.app_status not null default 'active',
  description           text,
  icon                  text,                                -- icon key / emoji / url
  brand_color           text,                                -- css var or hex for UI tinting
  is_first_party        boolean not null default true,
  required_permissions  text[] not null default '{}',        -- scopes the app needs to function
  optional_permissions  text[] not null default '{}',        -- scopes the app may request later
  context_types         text[] not null default '{}',        -- context types it can read/write
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

drop trigger if exists trg_app_registry_updated_at on public.app_registry;
create trigger trg_app_registry_updated_at
  before update on public.app_registry
  for each row execute function public.set_updated_at();

-- =============================================================================
-- 7. user_app_access — which apps a user has connected to their account
-- =============================================================================
create table if not exists public.user_app_access (
  id                   uuid primary key default uuid_generate_v4(),
  account_id           uuid not null references public.ailiur_accounts (id) on delete cascade,
  app_id               uuid not null references public.app_registry (id) on delete cascade,
  access_status        public.access_status not null default 'active',
  roles                text[] not null default '{}',          -- 'owner','admin','member' for enterprise apps
  first_authorized_at  timestamptz not null default now(),
  last_accessed_at     timestamptz,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now(),
  constraint user_app_access_unique unique (account_id, app_id)
);

create index if not exists user_app_access_account_idx on public.user_app_access (account_id);

drop trigger if exists trg_user_app_access_updated_at on public.user_app_access;
create trigger trg_user_app_access_updated_at
  before update on public.user_app_access
  for each row execute function public.set_updated_at();

-- =============================================================================
-- 8. app_context_permissions — the consent layer (per app, per scope)
-- =============================================================================
-- One row per (account, app, permission). This is what users grant/revoke.
-- Scopes are strings like 'profile:read', 'health_context:read',
-- 'google_calendar:read', 'app_data:write', 'context:read' (cross-app).
create table if not exists public.app_context_permissions (
  id            uuid primary key default uuid_generate_v4(),
  account_id    uuid not null references public.ailiur_accounts (id) on delete cascade,
  app_id        uuid not null references public.app_registry (id) on delete cascade,
  permission    text not null,
  state         public.permission_state not null default 'granted',
  granted_at    timestamptz,
  revoked_at    timestamptz,
  source        text,                                         -- 'onboarding','settings','oauth_consent'
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint app_context_permissions_unique unique (account_id, app_id, permission)
);

create index if not exists app_context_permissions_account_idx on public.app_context_permissions (account_id);
create index if not exists app_context_permissions_app_idx on public.app_context_permissions (app_id);

drop trigger if exists trg_app_context_permissions_updated_at on public.app_context_permissions;
create trigger trg_app_context_permissions_updated_at
  before update on public.app_context_permissions
  for each row execute function public.set_updated_at();

-- =============================================================================
-- 9. context_sources — registry of where an account's context comes from
-- =============================================================================
-- A source is either an Ailiur app (app_id) or an external connection
-- (connected_account_id), producing one or more context types.
create table if not exists public.context_sources (
  id                    uuid primary key default uuid_generate_v4(),
  account_id            uuid not null references public.ailiur_accounts (id) on delete cascade,
  source_kind           text not null default 'app',          -- 'app' | 'provider'
  app_id                uuid references public.app_registry (id) on delete set null,
  connected_account_id  uuid references public.connected_accounts (id) on delete set null,
  context_type          text not null,                         -- 'health_context','learning_context'…
  display_name          text,
  status                public.connection_status not null default 'connected',
  last_synced_at        timestamptz,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index if not exists context_sources_account_idx on public.context_sources (account_id);

drop trigger if exists trg_context_sources_updated_at on public.context_sources;
create trigger trg_context_sources_updated_at
  before update on public.context_sources
  for each row execute function public.set_updated_at();

-- =============================================================================
-- 10. context_records — the actual normalized context units (the moat)
-- =============================================================================
-- Append-friendly store of normalized context. Keep AI retrieval OUT of scope
-- for now — this is just the clean account/data foundation.
create table if not exists public.context_records (
  id                    uuid primary key default uuid_generate_v4(),
  account_id            uuid not null references public.ailiur_accounts (id) on delete cascade,
  context_source_id     uuid references public.context_sources (id) on delete set null,
  source_app            text,                                  -- denormalized slug for fast filtering
  context_type          text not null,
  title                 text,
  summary               text,
  raw_metadata          jsonb not null default '{}'::jsonb,
  normalized_metadata   jsonb not null default '{}'::jsonb,
  privacy_level         public.privacy_level not null default 'account',
  occurred_at           timestamptz,                           -- when the event happened
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index if not exists context_records_account_idx on public.context_records (account_id);
create index if not exists context_records_type_idx on public.context_records (account_id, context_type);
create index if not exists context_records_occurred_idx on public.context_records (account_id, occurred_at desc);

drop trigger if exists trg_context_records_updated_at on public.context_records;
create trigger trg_context_records_updated_at
  before update on public.context_records
  for each row execute function public.set_updated_at();

-- =============================================================================
-- Row Level Security
-- =============================================================================
-- The data clients run as role `authenticated` carrying a Supabase JWT whose
-- `sub` = the account id (see auth.config.ts "Option B"). next_auth.uid()
-- returns that sub. So "own rows" = account_id = next_auth.uid().
-- The service_role (adapter + admin client + triggers) BYPASSES RLS.

grant usage on schema next_auth to authenticated, anon;
grant execute on function next_auth.uid() to authenticated, anon;

alter table public.ailiur_accounts        enable row level security;
alter table public.account_profiles        enable row level security;
alter table public.external_identities     enable row level security;
alter table public.connected_accounts      enable row level security;
alter table public.account_sessions        enable row level security;
alter table public.app_registry            enable row level security;
alter table public.user_app_access         enable row level security;
alter table public.app_context_permissions enable row level security;
alter table public.context_sources         enable row level security;
alter table public.context_records         enable row level security;

-- Own-account: id = uid()
drop policy if exists "account self read"   on public.ailiur_accounts;
drop policy if exists "account self update" on public.ailiur_accounts;
create policy "account self read"   on public.ailiur_accounts for select using (id = next_auth.uid());
create policy "account self update" on public.ailiur_accounts for update using (id = next_auth.uid());

-- Helper: a reusable "owns this account_id" predicate is just account_id = uid().
-- Per-table policies (select + update/insert where it makes sense for the user).

drop policy if exists "profile self rw" on public.account_profiles;
create policy "profile self rw" on public.account_profiles
  using (account_id = next_auth.uid()) with check (account_id = next_auth.uid());

drop policy if exists "identities self read" on public.external_identities;
create policy "identities self read" on public.external_identities
  for select using (account_id = next_auth.uid());
-- Allow the user to revoke/disconnect their own identities.
drop policy if exists "identities self update" on public.external_identities;
create policy "identities self update" on public.external_identities
  for update using (account_id = next_auth.uid());

drop policy if exists "connected self rw" on public.connected_accounts;
create policy "connected self rw" on public.connected_accounts
  using (account_id = next_auth.uid()) with check (account_id = next_auth.uid());

drop policy if exists "sessions self read" on public.account_sessions;
create policy "sessions self read" on public.account_sessions
  for select using (account_id = next_auth.uid());
drop policy if exists "sessions self update" on public.account_sessions;
create policy "sessions self update" on public.account_sessions
  for update using (account_id = next_auth.uid());

-- app_registry is a public catalog: anyone (even signed-out) can read it.
drop policy if exists "registry public read" on public.app_registry;
create policy "registry public read" on public.app_registry for select using (true);

drop policy if exists "app access self rw" on public.user_app_access;
create policy "app access self rw" on public.user_app_access
  using (account_id = next_auth.uid()) with check (account_id = next_auth.uid());

drop policy if exists "permissions self rw" on public.app_context_permissions;
create policy "permissions self rw" on public.app_context_permissions
  using (account_id = next_auth.uid()) with check (account_id = next_auth.uid());

drop policy if exists "context sources self rw" on public.context_sources;
create policy "context sources self rw" on public.context_sources
  using (account_id = next_auth.uid()) with check (account_id = next_auth.uid());

drop policy if exists "context records self rw" on public.context_records;
create policy "context records self rw" on public.context_records
  using (account_id = next_auth.uid()) with check (account_id = next_auth.uid());

-- Table grants for the data roles (RLS still gates row visibility).
grant select on public.app_registry to anon, authenticated;
grant select, update on public.ailiur_accounts to authenticated;
grant select, insert, update on public.account_profiles to authenticated;
grant select, update on public.external_identities to authenticated;
grant select, insert, update, delete on public.connected_accounts to authenticated;
grant select, update on public.account_sessions to authenticated;
grant select, insert, update, delete on public.user_app_access to authenticated;
grant select, insert, update, delete on public.app_context_permissions to authenticated;
grant select, insert, update, delete on public.context_sources to authenticated;
grant select, insert, update, delete on public.context_records to authenticated;

-- service_role gets everything (adapter / admin client / triggers).
grant all on all tables in schema public to service_role;

-- =============================================================================
-- Sync triggers: next_auth (adapter-owned) -> public (Ailiur layer)
-- =============================================================================
-- These keep Google login working WITHOUT changes: the adapter writes
-- next_auth.users / next_auth.accounts, and these triggers mirror them into the
-- canonical Ailiur layer. SECURITY DEFINER so they can write into public
-- regardless of which role triggered the insert.

create or replace function public.sync_account_from_authjs_user()
returns trigger
language plpgsql
security definer
set search_path = public, next_auth
as $$
begin
  insert into public.ailiur_accounts (id, email, display_name, avatar_url, last_login_at)
  values (new.id, new.email, new.name, new.image, now())
  on conflict (id) do update
    set email        = excluded.email,
        -- never clobber a name/avatar the user has customized in Ailiur
        display_name  = coalesce(public.ailiur_accounts.display_name, excluded.display_name),
        avatar_url    = coalesce(public.ailiur_accounts.avatar_url, excluded.avatar_url),
        updated_at    = now();

  insert into public.account_profiles (account_id, full_name)
  values (new.id, new.name)
  on conflict (account_id) do nothing;

  return new;
end;
$$;

drop trigger if exists trg_sync_account_from_authjs_user on next_auth.users;
create trigger trg_sync_account_from_authjs_user
  after insert or update on next_auth.users
  for each row execute function public.sync_account_from_authjs_user();

create or replace function public.sync_identity_from_authjs_account()
returns trigger
language plpgsql
security definer
set search_path = public, next_auth
as $$
declare
  v_email text;
  v_has_other boolean;
begin
  select email into v_email from next_auth.users where id = new."userId";

  -- Mark this identity primary if it's the account's first/only identity.
  select exists(
    select 1 from public.external_identities
    where account_id = new."userId"
      and not (provider = new.provider and provider_account_id = new."providerAccountId")
  ) into v_has_other;

  insert into public.external_identities (
    account_id, provider, provider_account_id, provider_email, scopes,
    access_token, refresh_token, expires_at, connection_status,
    is_primary_login, last_refreshed_at
  )
  values (
    new."userId", new.provider, new."providerAccountId", v_email,
    case when new.scope is null then '{}'::text[] else string_to_array(new.scope, ' ') end,
    new.access_token, new.refresh_token,
    case when new.expires_at is null then null else to_timestamp(new.expires_at) end,
    'connected',
    not coalesce(v_has_other, false),
    now()
  )
  on conflict (provider, provider_account_id) do update
    set account_id        = excluded.account_id,
        provider_email     = excluded.provider_email,
        scopes             = excluded.scopes,
        access_token       = excluded.access_token,
        refresh_token      = coalesce(excluded.refresh_token, public.external_identities.refresh_token),
        expires_at         = excluded.expires_at,
        connection_status  = 'connected',
        last_refreshed_at  = now(),
        updated_at         = now();

  return new;
end;
$$;

drop trigger if exists trg_sync_identity_from_authjs_account on next_auth.accounts;
create trigger trg_sync_identity_from_authjs_account
  after insert or update on next_auth.accounts
  for each row execute function public.sync_identity_from_authjs_account();

-- =============================================================================
-- ROLLBACK (manual): to undo this migration, drop in reverse dependency order.
--   drop trigger trg_sync_identity_from_authjs_account on next_auth.accounts;
--   drop trigger trg_sync_account_from_authjs_user on next_auth.users;
--   drop function public.sync_identity_from_authjs_account();
--   drop function public.sync_account_from_authjs_user();
--   drop table public.context_records, public.context_sources,
--     public.app_context_permissions, public.user_app_access,
--     public.account_sessions, public.connected_accounts,
--     public.external_identities, public.account_profiles,
--     public.app_registry, public.ailiur_accounts cascade;
--   drop function public.set_updated_at();
--   drop type public.privacy_level, public.access_status, public.permission_state,
--     public.connection_status, public.app_status, public.app_category,
--     public.onboarding_status, public.account_status;
-- next_auth.* is untouched, so Google login keeps working after rollback.
-- =============================================================================
