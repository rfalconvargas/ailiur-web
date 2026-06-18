'use client';

import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SUPPORT_EMAIL } from '@/lib/site';
import { SmartLink } from '@/components/ui/smart-link';

const easeOut = [0.22, 1, 0.36, 1] as const;
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

// Tier keys MUST stay in sync with the server (src/lib/stripe.ts). The price
// shown here is display-only — the real amount is enforced by the Stripe Price
// ID on the backend, never trusted from the client.
type PaidTier = {
  key: 'starter' | 'pro' | 'max';
  name: string;
  price: number;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
  badge?: string;
};

const PAID_TIERS: PaidTier[] = [
  {
    key: 'starter',
    name: 'Starter',
    price: 15,
    blurb: 'For early users who want the core Ailiur App experience.',
    features: [
      'Early access reservation',
      'Personal goals and life-context onboarding',
      'Core app updates',
      'Founder access status',
    ],
    cta: 'Reserve Starter',
  },
  {
    key: 'pro',
    name: 'Pro',
    price: 50,
    blurb:
      'For users who want deeper personalization across health, learning, focus, and daily systems.',
    features: [
      'Everything in Starter',
      'Priority early-access invite',
      'Advanced context onboarding',
      'Founder feedback channel',
      'Early feature previews',
    ],
    cta: 'Reserve Pro',
    featured: true,
    badge: 'Most popular',
  },
  {
    key: 'max',
    name: 'Max',
    price: 150,
    blurb:
      'For power users, creators, founders, and builders who want the most complete Ailiur experience.',
    features: [
      'Everything in Pro',
      'Highest early-access priority',
      'Expanded life-system onboarding',
      'Private founder updates',
      'Priority product feedback consideration',
    ],
    cta: 'Reserve Max',
  },
];

const ENTERPRISE = {
  name: 'Enterprise',
  blurb: 'For organizations, institutions, providers, teams, and enterprise deployments.',
  cta: 'Contact Sales',
  href: '/contact',
};

const TRUST_NOTES: { title: string; body: string }[] = [
  {
    title: 'Founder Access',
    body: 'Ailiur is currently in early development. Founder Access reserves your selected plan and supports the development of the Ailiur App. Early-access features will roll out progressively.',
  },
  {
    title: 'Billing',
    body: 'Payments and billing are handled securely by Stripe. You can manage your subscription through Stripe’s billing portal.',
  },
  {
    title: 'Access',
    body: 'Founder Access gives you priority access as Ailiur becomes available. Some features described on the website may still be in development.',
  },
];

export function FounderAccess() {
  // Tracks which tier's checkout is in flight, plus any error to surface.
  const [loadingTier, setLoadingTier] = useState<PaidTier['key'] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout(tier: PaidTier['key']) {
    if (loadingTier) return; // ignore double-clicks while a request is in flight
    setError(null);
    setLoadingTier(tier);

    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier }),
      });

      const data = (await res.json().catch(() => null)) as { url?: string; error?: string } | null;

      if (!res.ok || !data?.url) {
        setError(data?.error || 'Something went wrong starting checkout. Please try again.');
        setLoadingTier(null);
        return;
      }

      // Hand off to Stripe-hosted Checkout.
      window.location.assign(data.url);
    } catch {
      setError('Network error. Please check your connection and try again.');
      setLoadingTier(null);
    }
  }

  return (
    <section id="founder-access" className="relative w-full scroll-mt-24 px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={rise}
            className="text-xs font-semibold uppercase tracking-widest text-foreground/50"
          >
            Founder Access
          </motion.span>
          <motion.h2
            variants={rise}
            className="mt-3 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight text-foreground"
          >
            Reserve Ailiur Founder Access
          </motion.h2>
          <motion.p variants={rise} className="mt-4 text-[15px] text-foreground/65">
            Ailiur is an AI-first operating system for goals, health, learning, focus, and life
            context. Choose your founder tier and reserve early access before the full app launches.
          </motion.p>
        </motion.div>

        {/* Inline error banner */}
        {error && (
          <div
            role="alert"
            aria-live="polite"
            className="mx-auto mt-8 flex max-w-2xl items-start gap-2.5 rounded-[var(--radius-card)] border border-[var(--accent-red)]/30 bg-[var(--accent-red)]/8 px-4 py-3 text-sm text-foreground/85"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-red)]" strokeWidth={2.5} />
            <span>{error}</span>
          </div>
        )}

        {/* Tiers */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {PAID_TIERS.map((tier) => {
            const loading = loadingTier === tier.key;
            const disabled = loadingTier !== null;
            return (
              <motion.div
                key={tier.key}
                variants={rise}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className={cn(
                  'relative flex flex-col rounded-[var(--radius-card)] p-7',
                  tier.featured ? 'glass-strong ring-2 ring-accent-green lg:-my-2' : 'glass'
                )}
              >
                {tier.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent-green px-3 py-1 text-xs font-semibold text-[#fffdf5]">
                    {tier.badge}
                  </span>
                )}
                <h3 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
                  {tier.name}
                </h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-extrabold tracking-tight text-foreground">
                    ${tier.price}
                  </span>
                  <span className="text-sm text-foreground/55">/month</span>
                </div>
                <p className="mt-3 text-sm text-foreground/65">{tier.blurb}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[15px] text-foreground/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-green" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => startCheckout(tier.key)}
                  disabled={disabled}
                  aria-busy={loading}
                  className={cn(
                    'mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform',
                    tier.featured ? 'bg-accent-green text-[#fffdf5]' : 'bg-foreground text-[#fffdf5]',
                    disabled
                      ? 'cursor-not-allowed opacity-70'
                      : 'hover:-translate-y-0.5'
                  )}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
                      Redirecting…
                    </>
                  ) : (
                    tier.cta
                  )}
                </button>
              </motion.div>
            );
          })}

          {/* Enterprise — never routes to Stripe */}
          <motion.div
            variants={rise}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="relative flex flex-col rounded-[var(--radius-card)] p-7 glass"
          >
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
              {ENTERPRISE.name}
            </h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-display text-4xl font-extrabold tracking-tight text-foreground">
                Contact Sales
              </span>
            </div>
            <p className="mt-3 text-sm text-foreground/65">{ENTERPRISE.blurb}</p>
            <div className="flex-1" />
            <SmartLink
              href={ENTERPRISE.href}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-foreground/15 bg-[var(--glass-bg-strong)] px-5 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
            >
              {ENTERPRISE.cta}
            </SmartLink>
          </motion.div>
        </motion.div>

        {/* Trust / billing / access notes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {TRUST_NOTES.map((note) => (
            <div key={note.title} className="glass rounded-[var(--radius-card)] p-5 text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground/45">
                {note.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground/70">{note.body}</p>
            </div>
          ))}
        </motion.div>

        {/* Support + legal links */}
        <div className="mx-auto mt-6 max-w-3xl text-center text-sm text-foreground/60">
          <p>
            Questions about billing or access? Contact us at{' '}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-semibold text-foreground/80 hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-foreground/50">
            <SmartLink href="/terms" className="hover:text-foreground">Terms</SmartLink>
            <SmartLink href="/privacy" className="hover:text-foreground">Privacy Policy</SmartLink>
            <SmartLink href="/refund" className="hover:text-foreground">Refund Policy</SmartLink>
            <SmartLink href="/contact" className="hover:text-foreground">Contact</SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
}
