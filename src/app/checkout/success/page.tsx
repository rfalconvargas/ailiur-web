import type { Metadata } from 'next';
import { CheckCircle2, Clock } from 'lucide-react';
import { getStripe } from '@/lib/stripe';
import { SUPPORT_EMAIL } from '@/lib/site';
import { getFulfillmentBySessionId } from '@/lib/billing/store';
import { SuccessActions } from '@/components/checkout/success-actions';

export const metadata: Metadata = {
  title: 'Founder Access reserved — Ailiur',
  description: 'Your Ailiur Founder Access reservation is confirmed.',
};

// Always render at request time — depends on the session_id query param.
export const dynamic = 'force-dynamic';

const TIER_LABELS: Record<string, string> = {
  starter: 'Starter',
  pro: 'Pro',
  max: 'Max',
};

const STATUS_LABELS: Record<string, string> = {
  reserved: 'Reserved',
  active: 'Active',
  past_due: 'Payment issue',
  canceled: 'Canceled',
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  // The WEBHOOK is the source of truth. We check the database first; the
  // success page never grants access on its own.
  const fulfillment = session_id ? await getFulfillmentBySessionId(session_id) : null;
  const confirmed = Boolean(fulfillment?.confirmed);

  // Tier is safe to display for a nicer confirmation. Prefer the DB value; fall
  // back to a best-effort read of the Stripe session metadata. Never surface
  // any sensitive Stripe data here.
  let tier = fulfillment?.tier ?? null;
  if (!tier && session_id) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(session_id);
      tier = (session.metadata?.tier as string | undefined) ?? null;
    } catch {
      /* ignore — generic confirmation below */
    }
  }
  const tierLabel = tier ? TIER_LABELS[tier] ?? null : null;
  const statusLabel = fulfillment?.status ? STATUS_LABELS[fulfillment.status] ?? null : null;

  return (
    <main className="relative flex min-h-[70vh] items-center justify-center px-4 pt-20 pb-24">
      <div className="glass-strong mx-auto w-full max-w-xl rounded-[var(--radius-panel)] p-8 text-center sm:p-10">
        <div
          className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
            confirmed ? 'bg-accent-green/15' : 'bg-[var(--ailiur-yellow-deep)]/25'
          }`}
        >
          {confirmed ? (
            <CheckCircle2 className="h-8 w-8 text-accent-green" strokeWidth={2.25} />
          ) : (
            <Clock className="h-8 w-8 text-[#8a6d00]" strokeWidth={2.25} />
          )}
        </div>

        <h1 className="mt-6 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-foreground">
          You&rsquo;re on the Ailiur Founder Access list.
        </h1>

        {/* Plan / status chips when known */}
        {(tierLabel || statusLabel) && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {tierLabel && (
              <span className="rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-[#fffdf5]">
                {tierLabel} plan
              </span>
            )}
            {statusLabel && (
              <span className="glass rounded-full px-3 py-1 text-xs font-semibold text-foreground/75">
                {statusLabel}
              </span>
            )}
          </div>
        )}

        <p className="mt-5 text-[15px] leading-relaxed text-foreground/70">
          {confirmed ? (
            <>
              Your reservation is confirmed. Ailiur is currently in early development, and Founder
              Access gives you priority access as the app becomes available.
            </>
          ) : (
            <>
              Thanks &mdash; we&rsquo;re confirming your reservation now. This usually takes only a
              moment. You&rsquo;ll receive an email update once it&rsquo;s finalized, and Founder
              Access gives you priority access as the app becomes available.
            </>
          )}
        </p>

        {/* Next steps */}
        <div className="glass mx-auto mt-6 max-w-md rounded-[var(--radius-card)] p-5 text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/45">
            Next steps
          </p>
          <ul className="mt-3 space-y-2 text-sm text-foreground/75">
            <li>Complete your onboarding preferences.</li>
            <li>Watch for early-access updates.</li>
            <li>Manage billing securely through Stripe.</li>
          </ul>
        </div>

        <SuccessActions sessionId={session_id} />

        <p className="mt-6 text-sm leading-relaxed text-foreground/55">
          Need a hand? Email{' '}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="font-semibold text-foreground underline-offset-2 hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>{' '}
          and we&rsquo;ll help with anything around your reservation or billing.
        </p>
      </div>
    </main>
  );
}
