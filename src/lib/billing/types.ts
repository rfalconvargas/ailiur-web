/**
 * Shared billing types. Kept free of Stripe/Supabase imports so both the
 * webhook handler and the persistence store can depend on them.
 */

/** Data extracted from a completed Checkout Session, ready to persist. */
export type CheckoutRecord = {
  email: string | null;
  tier: string | null;
  stripeCheckoutSessionId: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  /** Stripe subscription status if known (e.g. 'active', 'trialing'). */
  status: string | null;
  preorder: boolean;
};

/** A subscription's current state, synced from subscription/invoice events. */
export type SubscriptionRecord = {
  stripeSubscriptionId: string;
  stripeCustomerId: string | null;
  stripePriceId: string | null;
  tier: string | null;
  status: string | null;
  email: string | null;
  currentPeriodEnd: string | null; // ISO timestamp
  preorder: boolean;
};

/** What the success page is allowed to show the user (no sensitive Stripe data). */
export type Fulfillment = {
  tier: string | null;
  status: string | null;
  /** true once a webhook has recorded this checkout as confirmed. */
  confirmed: boolean;
};
