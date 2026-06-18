-- =============================================================================
-- 0005 — Stripe billing (Founder Access pre-orders)
-- =============================================================================
-- Persistence for Ailiur App Founder Access pre-orders. The Stripe WEBHOOK is
-- the source of truth — these tables are written by the service-role webhook
-- handler (src/app/api/stripe/webhook/route.ts via src/lib/billing/store.ts),
-- never by the browser.
--
-- Pre-orders happen BEFORE a user signs in, so these tables key primarily on
-- email + Stripe ids and only SOFT-link to public.ailiur_accounts (nullable
-- account_id) when we can match one. We deliberately do NOT touch the
-- next_auth schema or invent a new auth system.
--
-- Apply with the Supabase CLI:  `supabase db push`
-- (or paste into the SQL Editor). Requires 0002 (set_updated_at, ailiur_accounts).
-- =============================================================================

create extension if not exists "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. stripe_webhook_events — idempotency ledger
-- -----------------------------------------------------------------------------
-- One row per Stripe event id we have processed. The handler INSERTs here first;
-- a duplicate insert (Stripe re-delivers events) is detected and the event is
-- skipped. Stores no payment details — just the id, type, and time.
create table if not exists public.stripe_webhook_events (
  event_id      text primary key,            -- Stripe evt_… id
  type          text not null,               -- e.g. 'checkout.session.completed'
  processed_at  timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- 2. billing_customers — email/account ↔ Stripe customer mapping
-- -----------------------------------------------------------------------------
create table if not exists public.billing_customers (
  id                  uuid primary key default uuid_generate_v4(),
  account_id          uuid references public.ailiur_accounts (id) on delete set null,
  email               text,
  stripe_customer_id  text not null unique,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists billing_customers_email_idx   on public.billing_customers (lower(email));
create index if not exists billing_customers_account_idx on public.billing_customers (account_id);

drop trigger if exists trg_billing_customers_updated_at on public.billing_customers;
create trigger trg_billing_customers_updated_at
  before update on public.billing_customers
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 3. preorders — one row per completed Founder Access checkout
-- -----------------------------------------------------------------------------
create table if not exists public.preorders (
  id                          uuid primary key default uuid_generate_v4(),
  email                       text,
  tier                        text,                                  -- 'starter' | 'pro' | 'max'
  stripe_checkout_session_id  text unique,                           -- cs_… (idempotency key)
  stripe_customer_id          text,
  stripe_subscription_id      text,
  status                      text not null default 'reserved',      -- reserved|active|past_due|canceled
  created_at                  timestamptz not null default now(),
  updated_at                  timestamptz not null default now()
);

create index if not exists preorders_email_idx    on public.preorders (lower(email));
create index if not exists preorders_customer_idx on public.preorders (stripe_customer_id);

drop trigger if exists trg_preorders_updated_at on public.preorders;
create trigger trg_preorders_updated_at
  before update on public.preorders
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 4. subscriptions — current state of each Stripe subscription
-- -----------------------------------------------------------------------------
create table if not exists public.subscriptions (
  id                       uuid primary key default uuid_generate_v4(),
  account_id               uuid references public.ailiur_accounts (id) on delete set null,
  email                    text,
  stripe_customer_id       text,
  stripe_subscription_id   text not null unique,                      -- sub_… (idempotency key)
  stripe_price_id          text,
  tier                     text,
  status                   text,                                      -- Stripe status: active|past_due|canceled|…
  preorder                 boolean not null default true,
  current_period_end       timestamptz,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

create index if not exists subscriptions_email_idx    on public.subscriptions (lower(email));
create index if not exists subscriptions_customer_idx on public.subscriptions (stripe_customer_id);
create index if not exists subscriptions_account_idx  on public.subscriptions (account_id);

drop trigger if exists trg_subscriptions_updated_at on public.subscriptions;
create trigger trg_subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- =============================================================================
-- Row Level Security
-- =============================================================================
-- All writes go through the service-role webhook handler, which BYPASSES RLS.
-- We enable RLS and grant signed-in users read-only access to rows soft-linked
-- to their own account. preorders/webhook_events have NO anon/authenticated
-- policy — they are service-role only (read server-side via the admin client).

alter table public.stripe_webhook_events enable row level security;
alter table public.billing_customers     enable row level security;
alter table public.preorders             enable row level security;
alter table public.subscriptions         enable row level security;

drop policy if exists "billing customer self read" on public.billing_customers;
create policy "billing customer self read" on public.billing_customers
  for select using (account_id = next_auth.uid());

drop policy if exists "subscription self read" on public.subscriptions;
create policy "subscription self read" on public.subscriptions
  for select using (account_id = next_auth.uid());

-- Read grants for the data role (RLS still gates row visibility).
grant select on public.billing_customers to authenticated;
grant select on public.subscriptions     to authenticated;

-- service_role gets everything (webhook handler / admin client).
grant all on public.stripe_webhook_events to service_role;
grant all on public.billing_customers     to service_role;
grant all on public.preorders             to service_role;
grant all on public.subscriptions         to service_role;

-- =============================================================================
-- ROLLBACK (manual):
--   drop table public.subscriptions, public.preorders,
--     public.billing_customers, public.stripe_webhook_events cascade;
-- =============================================================================
