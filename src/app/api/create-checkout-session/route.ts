import { NextResponse, type NextRequest } from 'next/server';
import { getStripe, isFounderTier, priceIdForTier } from '@/lib/stripe';

// Stripe needs the Node.js runtime (not Edge), and this handler must never be
// statically cached — every call creates a fresh Checkout Session.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Site origin used to build absolute success/cancel URLs. */
function siteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '');
  return url || 'https://www.ailiur.com';
}

/**
 * POST /api/create-checkout-session
 *
 * Body: { tier: 'starter' | 'pro' | 'max' }
 *
 * Creates a Stripe-hosted Checkout Session in subscription mode and returns its
 * URL. The frontend redirects the browser to that URL. We never trust a price
 * sent from the client — the tier key is mapped to a Stripe Price ID on the
 * server (see src/lib/stripe.ts).
 */
export async function POST(req: NextRequest) {
  // 1. Parse + validate the body.
  let tier: unknown;
  try {
    const body = await req.json();
    tier = body?.tier;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!isFounderTier(tier)) {
    return NextResponse.json({ error: 'Invalid plan selected.' }, { status: 400 });
  }

  // 2. Resolve the server-side Price ID. A missing env var is an operator
  //    misconfiguration — log it, but don't leak details to the client.
  const priceId = priceIdForTier(tier);
  if (!priceId) {
    console.error(`[create-checkout-session] Missing Stripe Price ID for tier "${tier}".`);
    return NextResponse.json(
      { error: 'This plan is not available right now. Please try again later.' },
      { status: 500 }
    );
  }

  // Metadata is attached to both the Checkout Session and the resulting
  // subscription so downstream tooling / webhooks can identify pre-orders.
  const metadata = { product: 'ailiur_app', preorder: 'true', tier };

  // 3. Create the hosted Checkout Session.
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl()}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl()}/checkout/cancel`,
      // Stripe Tax — only takes effect once a tax origin is configured in the
      // Stripe Dashboard; harmless to request otherwise.
      automatic_tax: { enabled: true },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      metadata,
      subscription_data: { metadata },
    });

    if (!session.url) {
      return NextResponse.json({ error: 'Could not start checkout.' }, { status: 500 });
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    // Log the real error server-side; return a safe, generic message.
    console.error('[create-checkout-session] Stripe error:', err);
    return NextResponse.json(
      { error: 'Could not start checkout. Please try again.' },
      { status: 500 }
    );
  }
}
