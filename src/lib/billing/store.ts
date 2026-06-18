import 'server-only';
import { createAdminClient } from '@/utils/supabase/admin';
import type { CheckoutRecord, Fulfillment, SubscriptionRecord } from '@/lib/billing/types';

/**
 * Billing persistence — the single seam between Stripe fulfillment and the
 * database. The webhook handler talks ONLY to this module, never to Supabase
 * directly, so the backing store can be swapped (Prisma, Drizzle, a different
 * Postgres) by reimplementing these functions.
 *
 * Backed today by Supabase using the service-role admin client (RLS bypassed),
 * writing the tables in supabase/migrations/0005_stripe_billing.sql.
 *
 * Configuration: requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY.
 * When unconfigured, every function no-ops (and reads return null) so the app
 * still builds/runs without a database — the webhook simply can't persist.
 */

const ACTIVE_LIKE = new Set(['active', 'trialing']);

export function isBillingStoreConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

function db() {
  return createAdminClient();
}

/**
 * Idempotency guard. Inserts the event id; returns true if this is the first
 * time we've seen it, false if it was already processed (Stripe re-delivery).
 * Returns true when the store is unconfigured (no dedup available — caller
 * decides whether to process).
 */
export async function markEventProcessed(eventId: string, type: string): Promise<boolean> {
  if (!isBillingStoreConfigured()) return true;
  const { error } = await db().from('stripe_webhook_events').insert({ event_id: eventId, type });
  if (error) {
    if (error.code === '23505') return false; // duplicate primary key → already processed
    throw new Error(`markEventProcessed failed: ${error.message}`);
  }
  return true;
}

/** Upsert the email/account ↔ Stripe customer mapping. */
async function upsertCustomer(email: string | null, stripeCustomerId: string | null) {
  if (!stripeCustomerId) return;
  const { error } = await db()
    .from('billing_customers')
    .upsert({ email, stripe_customer_id: stripeCustomerId }, { onConflict: 'stripe_customer_id' });
  if (error) throw new Error(`upsertCustomer failed: ${error.message}`);
}

/**
 * Persist a completed checkout: customer mapping + preorder row + (if a
 * subscription exists) a subscription row. Idempotent via the unique
 * stripe_checkout_session_id / stripe_subscription_id columns.
 */
export async function recordCheckoutCompleted(rec: CheckoutRecord): Promise<void> {
  if (!isBillingStoreConfigured()) return;
  await upsertCustomer(rec.email, rec.stripeCustomerId);

  const status = rec.status && ACTIVE_LIKE.has(rec.status) ? 'active' : 'reserved';

  const { error: preErr } = await db()
    .from('preorders')
    .upsert(
      {
        email: rec.email,
        tier: rec.tier,
        stripe_checkout_session_id: rec.stripeCheckoutSessionId,
        stripe_customer_id: rec.stripeCustomerId,
        stripe_subscription_id: rec.stripeSubscriptionId,
        status,
      },
      { onConflict: 'stripe_checkout_session_id' }
    );
  if (preErr) throw new Error(`recordCheckoutCompleted (preorder) failed: ${preErr.message}`);

  if (rec.stripeSubscriptionId) {
    const { error: subErr } = await db()
      .from('subscriptions')
      .upsert(
        {
          email: rec.email,
          stripe_customer_id: rec.stripeCustomerId,
          stripe_subscription_id: rec.stripeSubscriptionId,
          tier: rec.tier,
          status: rec.status,
          preorder: rec.preorder,
        },
        { onConflict: 'stripe_subscription_id' }
      );
    if (subErr) throw new Error(`recordCheckoutCompleted (subscription) failed: ${subErr.message}`);
  }
}

/** Upsert subscription state synced from subscription/invoice events. */
export async function upsertSubscription(rec: SubscriptionRecord): Promise<void> {
  if (!isBillingStoreConfigured()) return;
  await upsertCustomer(rec.email, rec.stripeCustomerId);

  // Build the row with only the fields we actually know, so a partial event
  // (e.g. an invoice with no price) never clobbers good data with nulls.
  const row: Record<string, unknown> = {
    stripe_subscription_id: rec.stripeSubscriptionId,
    preorder: rec.preorder,
  };
  if (rec.stripeCustomerId !== null) row.stripe_customer_id = rec.stripeCustomerId;
  if (rec.stripePriceId !== null) row.stripe_price_id = rec.stripePriceId;
  if (rec.tier !== null) row.tier = rec.tier;
  if (rec.status !== null) row.status = rec.status;
  if (rec.email !== null) row.email = rec.email;
  if (rec.currentPeriodEnd !== null) row.current_period_end = rec.currentPeriodEnd;

  const { error } = await db()
    .from('subscriptions')
    .upsert(row, { onConflict: 'stripe_subscription_id' });
  if (error) throw new Error(`upsertSubscription failed: ${error.message}`);

  // Keep any matching preorder row's status in sync for the success page.
  if (rec.status) {
    const preorderStatus =
      rec.status === 'canceled'
        ? 'canceled'
        : rec.status === 'past_due' || rec.status === 'unpaid'
          ? 'past_due'
          : ACTIVE_LIKE.has(rec.status)
            ? 'active'
            : null;
    if (preorderStatus) {
      await db()
        .from('preorders')
        .update({ status: preorderStatus })
        .eq('stripe_subscription_id', rec.stripeSubscriptionId);
    }
  }
}

/** Mark a subscription's status (e.g. on invoice.paid / payment_failed). */
export async function setSubscriptionStatus(
  stripeSubscriptionId: string,
  status: string,
  currentPeriodEnd: string | null = null
): Promise<void> {
  if (!isBillingStoreConfigured()) return;
  const patch: Record<string, unknown> = { status };
  if (currentPeriodEnd) patch.current_period_end = currentPeriodEnd;

  const { error } = await db()
    .from('subscriptions')
    .update(patch)
    .eq('stripe_subscription_id', stripeSubscriptionId);
  if (error) throw new Error(`setSubscriptionStatus failed: ${error.message}`);

  const preorderStatus =
    status === 'canceled'
      ? 'canceled'
      : status === 'past_due' || status === 'unpaid'
        ? 'past_due'
        : ACTIVE_LIKE.has(status)
          ? 'active'
          : null;
  if (preorderStatus) {
    await db()
      .from('preorders')
      .update({ status: preorderStatus })
      .eq('stripe_subscription_id', stripeSubscriptionId);
  }
}

/**
 * Read what we can safely show on the success page for a given checkout
 * session. Returns null if the store is unconfigured or nothing recorded yet
 * (i.e. the webhook hasn't landed).
 */
export async function getFulfillmentBySessionId(sessionId: string): Promise<Fulfillment | null> {
  if (!isBillingStoreConfigured()) return null;
  const { data, error } = await db()
    .from('preorders')
    .select('tier, status')
    .eq('stripe_checkout_session_id', sessionId)
    .maybeSingle();
  if (error || !data) return null;
  return {
    tier: data.tier ?? null,
    status: data.status ?? null,
    confirmed: data.status === 'active' || data.status === 'reserved',
  };
}

/** Resolve the Stripe customer id for a signed-in account's email. */
export async function getCustomerIdForEmail(email: string): Promise<string | null> {
  if (!isBillingStoreConfigured()) return null;
  const { data, error } = await db()
    .from('billing_customers')
    .select('stripe_customer_id')
    .ilike('email', email)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return data.stripe_customer_id ?? null;
}
