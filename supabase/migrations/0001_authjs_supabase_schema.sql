-- Auth.js (NextAuth) schema for the Supabase adapter.
-- Apply with the Supabase CLI (`supabase db push`) or paste into the SQL Editor.
-- After running, expose the `next_auth` schema: Dashboard → Settings → API →
-- "Exposed schemas" → add `next_auth`.

create extension if not exists "uuid-ossp";

create schema if not exists next_auth;
grant usage on schema next_auth to service_role;
grant all on schema next_auth to postgres;

-- users
create table if not exists next_auth.users (
  id uuid not null default uuid_generate_v4(),
  name text,
  email text,
  "emailVerified" timestamptz,
  image text,
  constraint users_pkey primary key (id),
  constraint email_unique unique (email)
);
grant all on table next_auth.users to postgres;
grant all on table next_auth.users to service_role;

create or replace function next_auth.uid() returns uuid
  language sql stable
as $$
  select coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;

-- sessions (unused under JWT strategy, but the adapter expects the table)
create table if not exists next_auth.sessions (
  id uuid not null default uuid_generate_v4(),
  expires timestamptz not null,
  "sessionToken" text not null,
  "userId" uuid,
  constraint sessions_pkey primary key (id),
  constraint sessions_sessiontoken_unique unique ("sessionToken"),
  constraint "sessions_userId_fkey" foreign key ("userId")
    references next_auth.users (id) on delete cascade
);
grant all on table next_auth.sessions to postgres;
grant all on table next_auth.sessions to service_role;

-- accounts (one row per linked OAuth provider, e.g. Google)
create table if not exists next_auth.accounts (
  id uuid not null default uuid_generate_v4(),
  type text not null,
  provider text not null,
  "providerAccountId" text not null,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  oauth_token_secret text,
  oauth_token text,
  "userId" uuid,
  constraint accounts_pkey primary key (id),
  constraint "accounts_userId_fkey" foreign key ("userId")
    references next_auth.users (id) on delete cascade
);
grant all on table next_auth.accounts to postgres;
grant all on table next_auth.accounts to service_role;

-- verification tokens (for email flows; harmless to keep)
create table if not exists next_auth.verification_tokens (
  identifier text,
  token text,
  expires timestamptz not null,
  constraint verification_tokens_pkey primary key (token),
  constraint token_unique unique (token),
  constraint token_identifier_unique unique (token, identifier)
);
grant all on table next_auth.verification_tokens to postgres;
grant all on table next_auth.verification_tokens to service_role;
