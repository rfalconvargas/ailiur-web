import type Stripe from 'stripe';
import { NextResponse, type NextRequest } from 'next/server';
import { getStripe, tierForPriceId, subscriptionPeriodEndISO } from '@/lib/stripe';
import {
  markEventProcessed,
  recordCheckoutCompleted,
  upsertSubscription,
  setSubscriptionStatus,
} from '@/lib/billing/store';
import type { SubscriptionRecord } from '@/lib/billing/types';

// Stripe signature verification needs the RAW request body and Node crypto, so
// this handler must run on the Node runtime and never be cached. We read the
// body with req.text() — do NOT call req.json() first, or the bytes won't match
// the signature.
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Pull an id out of a Stripe field that may be a string or an expanded object. */
function idOf(value: string | { id?: string } | null | undefined): string | null {
  if (!value) return null;
  return typeof value === 'string' ? value : value.id ?? null;
}

/** Find the subscription id on an invoice across Stripe API-version shapes. */
function invoiceSubscriptionId(invoice: Stripe.Invoice): string | null {
  const inv = invoice as unknown as {
    subscription?: string | { id?: string } | null;
    lines?: { data?: Array<{ subscription?: string | { id?: string } | null }> };
    parent?: { subscription_details?: { subscription?: string | { id?: string } | null } };
  };
  return (
    idOf(inv.subscription) ??
    idOf(inv.lines?.data?.[0]?.subscription) ??
    idOf(inv.parent?.subscription_details?.subscription)
  );
}

/** Build a SubscriptionRecord from a Stripe Subscription object. */
function subscriptionToRecord(sub: Stripe.Subscription): SubscriptionRecord {
  const item = sub.items?.data?.[0];
  const priceId = item?.price?.id ?? null;
  const tier = (sub.metadata?.tier as string | undefined) ?? tierForPriceId(priceId);
  const preorder = sub.metadata?.preorder === 'true' || sub.metadata?.product === 'ailiur_app';
  return {
    stripeSubscriptionId: sub.id,
    stripeCustomerId: idOf(sub.customer),
    stripePriceId: priceId,
    tier: tier ?? null,
    status: sub.status ?? null,
    email: null, // subscription objects carry no email — don't clobber what checkout stored
    currentPeriodEnd: subscriptionPeriodEndISO(sub),
    preorder: preorder || true, // these subscriptions originate from founder pre-orders
  };
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret) {
    console.error('[stripe-webhook] STRIPE_WEBHOOK_SECRET is not set.');
    return NextResponse.json({ error: 'Webhook not configured.' }, { status: 500 });
  }
  if (!sig) {
    return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 });
  }

  // Raw body — required for signature verification.
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    // Signature failed → could be spoofed. Ignore the event.
    console.warn('[stripe-webhook] signature verification failed:', (err as Error).message);
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  // Idempotency: skip events we've already handled (Stripe re-delivers).
  try {
    const isNew = await markEventProcessed(event.id, event.type);
    if (!isNew) {
      console.info(`[stripe-webhook] duplicate ${event.type} (${event.id}) — skipped`);
      return NextResponse.json({ received: true, duplicate: true });
    }
  } catch (err) {
    console.error('[stripe-webhook] idempotency check failed:', (err as Error).message);
    return NextResponse.json({ error: 'Persistence error.' }, { status: 500 });
  }

  try {
    const stripe = getStripe();

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const meta = session.metadata ?? {};

        // Only fulfill OUR product. Ignore any other Checkout flows.
        if (meta.product !== 'ailiur_app') {
          console.info('[stripe-webhook] checkout.session.completed ignored (not ailiur_app)');
          break;
        }

        const subscriptionId = idOf(session.subscription);
        const email = session.customer_details?.email ?? session.customer_email ?? null;
        const tier = (meta.tier as string | undefined) ?? null;

        // Enrich with the live subscription (status, price, period) when present.
        let subStatus: string | null = null;
        if (subscriptionId) {
          try {
            const sub = await stripe.subscriptions.retrieve(subscriptionId);
            subStatus = sub.status ?? null;
            await upsertSubscription({ ...subscriptionToRecord(sub), email, tier: tier ?? null });
          } catch (e) {
            console.warn('[stripe-webhook] could not retrieve subscription:', (e as Error).message);
          }
        }

        await recordCheckoutCompleted({
          email,
          tier,
          stripeCheckoutSessionId: session.id,
          stripeCustomerId: idOf(session.customer),
          stripeSubscriptionId: subscriptionId,
          status: subStatus,
          preorder: meta.preorder === 'true',
        });

        console.info(`[stripe-webhook] reserved Founder Access — tier=${tier ?? 'n/a'}`);
        break;
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoiceSubscriptionId(invoice);
        if (subscriptionId) {
          // Re-sync the subscription so status + billing period are authoritative.
          try {
            const sub = await stripe.subscriptions.retrieve(subscriptionId);
            await upsertSubscription(subscriptionToRecord(sub));
          } catch {
            await setSubscriptionStatus(subscriptionId, 'active');
          }
          console.info('[stripe-webhook] invoice.paid — subscription marked active');
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = invoiceSubscriptionId(invoice);
        if (subscriptionId) {
          // Flag the payment issue for follow-up. Never delete the user/record.
          await setSubscriptionStatus(subscriptionId, 'past_due');
          console.warn('[stripe-webhook] invoice.payment_failed — marked past_due');
        }
        break;
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        await upsertSubscription(subscriptionToRecord(sub));
        console.info(`[stripe-webhook] subscription.updated — status=${sub.status}`);
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await setSubscriptionStatus(sub.id, 'canceled');
        console.info('[stripe-webhook] subscription.deleted — marked canceled');
        break;
      }

      default:
        // Acknowledge unhandled event types so Stripe stops retrying them.
        console.info(`[stripe-webhook] unhandled event ${event.type}`);
    }
  } catch (err) {
    // A persistence failure → return 500 so Stripe retries later.
    console.error(`[stripe-webhook] handler error for ${event.type}:`, (err as Error).message);
    return NextResponse.json({ error: 'Handler error.' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
