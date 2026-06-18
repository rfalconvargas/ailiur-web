import { NextResponse, type NextRequest } from 'next/server';
import { auth } from '@/auth';
import { getStripe } from '@/lib/stripe';
import { SUPPORT_EMAIL } from '@/lib/site';
import { getCustomerIdForEmail } from '@/lib/billing/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// IMPORTANT: The Stripe Customer Portal must be enabled & configured once in the
// Stripe Dashboard before this works:
//   Dashboard → Settings → Billing → Customer portal → activate + save.
// (Choose which actions customers may take: update payment method, cancel, etc.)

function siteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '');
  return url || 'https://www.ailiur.com';
}

/**
 * POST /api/create-customer-portal-session
 *
 * Resolves the caller's Stripe customer id and returns a Billing Portal URL.
 *
 * SECURITY: we never accept a raw Stripe customer id from the browser (anyone
 * could POST someone else's `cus_…`). Instead the customer is resolved from:
 *   1. the signed-in Ailiur session (email → billing_customers), or
 *   2. a `session_id` from a just-completed Checkout (proves possession), which
 *      we verify with Stripe before using its customer.
 *
 * Body (optional): { session_id?: string }  // a Stripe Checkout Session id
 */
export async function POST(req: NextRequest) {
  let sessionId: string | undefined;
  try {
    const body = await req.json().catch(() => ({}));
    sessionId = typeof body?.session_id === 'string' ? body.session_id : undefined;
  } catch {
    /* empty body is fine */
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('[customer-portal] STRIPE_SECRET_KEY is not set.');
    return NextResponse.json({ error: 'Billing is not configured.' }, { status: 500 });
  }

  let customerId: string | null = null;

  // 1. Prefer the authenticated user.
  try {
    const session = await auth();
    const email = session?.user?.email;
    if (email) {
      customerId = await getCustomerIdForEmail(email);
    }
  } catch {
    /* not signed in — fall through to session_id */
  }

  // 2. Fall back to a verified Checkout Session id.
  if (!customerId && sessionId) {
    try {
      const checkout = await getStripe().checkout.sessions.retrieve(sessionId);
      if (checkout.metadata?.product === 'ailiur_app') {
        customerId =
          typeof checkout.customer === 'string'
            ? checkout.customer
            : checkout.customer?.id ?? null;
      }
    } catch {
      /* invalid/expired session id — handled below */
    }
  }

  // 3. Nothing to manage — respond helpfully instead of erroring out.
  if (!customerId) {
    return NextResponse.json(
      {
        error:
          'We couldn’t find a billing account to manage. If you just reserved Founder Access, ' +
          `sign in with the same email, or contact ${SUPPORT_EMAIL} and we’ll help.`,
      },
      { status: 404 }
    );
  }

  try {
    const portal = await getStripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: `${siteUrl()}/account`,
    });
    return NextResponse.json({ url: portal.url });
  } catch (err) {
    console.error('[customer-portal] Stripe error:', (err as Error).message);
    return NextResponse.json(
      { error: 'Could not open the billing portal. Please try again.' },
      { status: 500 }
    );
  }
}
