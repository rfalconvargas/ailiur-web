-- =============================================================================
-- 0006 — Founder onboarding survey
-- =============================================================================
-- Stores responses to the post-checkout "Help shape your Ailiur experience"
-- survey (src/app/founder-onboarding). Written by the service-role API route
-- (src/app/api/founder-onboarding/route.ts via src/lib/onboarding/store.ts).
--
-- This is product-research data, not payment data. It soft-links to an Ailiur
-- account by email only when one exists; no account is required to submit.
--
-- Apply with the Supabase CLI:  `supabase db push`  (requires 0002 helpers).
-- =============================================================================

create extension if not exists "uuid-ossp";

create table if not exists public.founder_onboarding (
  id                uuid primary key default uuid_generate_v4(),
  email             text,
  improve_first     text[] not null default '{}',   -- Q1 (multi)
  biggest_friction  text,                            -- Q2 (free text)
  most_interested   text,                            -- Q3 (single)
  describe_self     text[] not null default '{}',   -- Q4 (multi)
  worth_paying      text,                            -- Q5 (free text)
  can_contact       text,                            -- Q6 (yes|maybe|no)
  -- Raw submitted payload for forward-compatibility if we add questions later.
  responses         jsonb not null default '{}'::jsonb,
  created_at        timestamptz not null default now()
);

create index if not exists founder_onboarding_email_idx on public.founder_onboarding (lower(email));

-- RLS: service-role only. There is no anon/authenticated policy — the row is
-- written and read exclusively via the server (admin client bypasses RLS).
alter table public.founder_onboarding enable row level security;
grant all on public.founder_onboarding to service_role;

-- =============================================================================
-- ROLLBACK (manual):  drop table public.founder_onboarding;
-- =============================================================================
