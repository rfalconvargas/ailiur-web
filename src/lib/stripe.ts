import Stripe from 'stripe';

/**
 * Server-only Stripe helpers.
 *
 * The secret key lives exclusively on the server and is read from
 * `STRIPE_SECRET_KEY`. It is NEVER imported into a client component or exposed
 * to the browser. Only files that run on the server (route handlers, server
 * components) may import from this module.
 */

let cached: Stripe | null = null;

/** Lazily construct a singleton Stripe client. Throws if the key is missing. */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set.');
  }
  if (!cached) {
    cached = new Stripe(key, {
      // No explicit apiVersion → the SDK uses the account's default version,
      // which avoids version-mismatch errors across environments.
      typescript: true,
      appInfo: { name: 'Ailiur App', url: 'https://www.ailiur.com' },
    });
  }
  return cached;
}

/** The paid founder tiers that route to Stripe Checkout. */
export const FOUNDER_TIERS = ['starter', 'pro', 'max'] as const;
export type FounderTier = (typeof FOUNDER_TIERS)[number];

/** Narrow untrusted input (e.g. a request body) to a known tier key. */
export function isFounderTier(value: unknown): value is FounderTier {
  return typeof value === 'string' && (FOUNDER_TIERS as readonly string[]).includes(value);
}

/**
 * Map a tier key to its Stripe Price ID.
 *
 * The amounts are defined ON STRIPE, not in this codebase — we only ever send a
 * Price ID, never a price. Create a recurring (monthly) Price for each tier in
 * the Stripe Dashboard (Products → add a price) and copy the resulting
 * `price_…` ID into the matching environment variable:
 *
 *   starter → STRIPE_PRICE_STARTER
 *   pro     → STRIPE_PRICE_PRO
 *   max     → STRIPE_PRICE_MAX
 *
 * Returns `undefined` if the env var for that tier is not configured.
 */
export function priceIdForTier(tier: FounderTier): string | undefined {
  const map: Record<FounderTier, string | undefined> = {
    starter: process.env.STRIPE_PRICE_STARTER,
    pro: process.env.STRIPE_PRICE_PRO,
    max: process.env.STRIPE_PRICE_MAX,
  };
  return map[tier];
}

/**
 * Reverse of priceIdForTier: given a Stripe Price ID, find the tier key.
 * Used by the webhook to label a subscription when its metadata is missing.
 * Returns null if the price isn't one of our configured founder prices.
 */
export function tierForPriceId(priceId: string | null | undefined): FounderTier | null {
  if (!priceId) return null;
  for (const tier of FOUNDER_TIERS) {
    if (priceIdForTier(tier) === priceId) return tier;
  }
  return null;
}

/**
 * Read a subscription's current period end as an ISO string, tolerant of Stripe
 * API-version differences. Newer API versions expose `current_period_end` on
 * each subscription item rather than the top-level subscription, so we check
 * both. Returns null when unavailable.
 */
export function subscriptionPeriodEndISO(subscription: Stripe.Subscription): string | null {
  // `as` casts because the field's location varies by pinned API version.
  const sub = subscription as unknown as {
    current_period_end?: number | null;
    items?: { data?: Array<{ current_period_end?: number | null }> };
  };
  const unix = sub.current_period_end ?? sub.items?.data?.[0]?.current_period_end ?? null;
  return typeof unix === 'number' ? new Date(unix * 1000).toISOString() : null;
}
