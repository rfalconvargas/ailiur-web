'use client';

import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SmartLink } from '@/components/ui/smart-link';
import { track } from '@/lib/analytics';

const easeOut = [0.22, 1, 0.36, 1] as const;
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

type Tier = {
  name: string;
  // Per-month price. `null` means custom / contact-sales pricing.
  priceMonthly: number | null;
  priceAnnual: number | null;
  headline: string;
  blurb: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
  badge?: string;
};

// Illustrative pricing — confirm tiers and amounts before launch.
const TIERS: Tier[] = [
  {
    name: 'Core',
    priceMonthly: 15,
    priceAnnual: 12,
    headline: 'Start with one Ailiur tool.',
    blurb: 'Choose one focused product and build your first personal context layer.',
    features: [
      'One outcome engine: Enchiridion, Qetos, Oruvo, Tayzt, or Tellumetry',
      'Personal local-first storage',
      'Basic Unified Context Mesh memory',
      'Standard AI usage',
      'One workspace',
      'Export your data anytime',
    ],
    cta: 'Start Core',
    href: '/signup?plan=core',
  },
  {
    name: 'Mesh',
    priceMonthly: 50,
    priceAnnual: 40,
    headline: 'The full personal ecosystem.',
    blurb: 'Connect every Ailiur consumer app into one intelligent daily system.',
    features: [
      'All consumer products',
      'Cross-app Unified Context Mesh',
      'Higher AI usage limits',
      'Multi-device sync',
      'Personal automations between apps',
      'Priority product updates',
      'Connected insights across learning, health, media, money, and creation',
    ],
    cta: 'Start Mesh',
    href: '/signup?plan=mesh',
    featured: true,
    badge: 'Most popular',
  },
  {
    name: 'Operator',
    priceMonthly: 150,
    priceAnnual: 120,
    headline: 'For serious builders and power users.',
    blurb: 'Ailiur as your daily operating system for research, creation, and execution.',
    features: [
      'Everything in Mesh',
      'Highest consumer AI limits',
      'Advanced agents and workflows',
      'Advanced Tayzt and Tellumetry tools',
      'Unlimited projects and knowledge graphs',
      'Model routing and cost controls',
      'API / export tools',
      'Early access to Iris-style interfaces',
      'Premium support',
    ],
    cta: 'Start Operator',
    href: '/signup?plan=operator',
  },
  {
    name: 'Enterprise',
    priceMonthly: null,
    priceAnnual: null,
    headline: 'For institutions, providers, advisors, and teams.',
    blurb:
      'Deploy Ailiur infrastructure across organizations with custom controls, analytics, and integrations.',
    features: [
      'Civis',
      'Iris',
      'Aptellum',
      'Qetos Provider',
      'Enchiridion Institution',
      'Oruvo Advisors',
      'Unified Context Mesh API',
      'Admin controls, SSO, audit logs',
      'Custom integrations and deployment support',
    ],
    cta: 'Contact us',
    href: '/contact',
  },
];

const GUIDE: { name: string; line: string }[] = [
  { name: 'Core', line: 'I want one app.' },
  { name: 'Mesh', line: 'I want the full connected ecosystem.' },
  { name: 'Operator', line: 'I use Ailiur for serious daily work.' },
  { name: 'Enterprise', line: 'I need Ailiur for an organization.' },
];

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="relative w-full px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
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
            Pricing
          </motion.span>
          <motion.h2
            variants={rise}
            className="mt-3 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight text-foreground"
          >
            One ecosystem. Simple pricing.
          </motion.h2>
          <motion.p variants={rise} className="mt-4 text-[15px] text-foreground/60">
            Three consumer plans for the full Ailiur ecosystem — plus Enterprise for teams.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            variants={rise}
            className="glass-strong mx-auto mt-8 inline-flex items-center gap-1 rounded-full p-1 text-sm font-medium"
          >
            {(['monthly', 'annual'] as const).map((mode) => {
              const active = (mode === 'annual') === annual;
              return (
                <button
                  key={mode}
                  onClick={() => setAnnual(mode === 'annual')}
                  className={cn(
                    'rounded-full px-4 py-1.5 capitalize transition-colors',
                    active ? 'bg-foreground text-[#fffdf5]' : 'text-foreground/70 hover:text-foreground'
                  )}
                >
                  {mode}
                  {mode === 'annual' && <span className="ml-1 text-accent-green">−20%</span>}
                </button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Tiers */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {TIERS.map((tier) => {
            const price = annual ? tier.priceAnnual : tier.priceMonthly;
            const custom = price === null;
            return (
              <motion.div
                key={tier.name}
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
                <p className="mt-1 text-[15px] font-semibold text-foreground/85">{tier.headline}</p>
                <p className="mt-1.5 text-sm text-foreground/60">{tier.blurb}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  {custom ? (
                    <span className="font-display text-4xl font-extrabold tracking-tight text-foreground">
                      Custom
                    </span>
                  ) : (
                    <>
                      <span className="font-display text-5xl font-extrabold tracking-tight text-foreground">
                        ${price}
                      </span>
                      <span className="text-sm text-foreground/55">/mo</span>
                    </>
                  )}
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[15px] text-foreground/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-green" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <SmartLink
                  href={tier.href}
                  onClick={() =>
                    track('plan_select', {
                      plan: tier.name.toLowerCase(),
                      billing: annual ? 'annual' : 'monthly',
                    })
                  }
                  className={cn(
                    'mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5',
                    tier.featured ? 'bg-accent-green text-[#fffdf5]' : 'bg-foreground text-[#fffdf5]'
                  )}
                >
                  {tier.cta}
                </SmartLink>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Founding member banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="glass mx-auto mt-6 flex max-w-2xl items-center justify-center gap-2 rounded-full px-5 py-3 text-center text-sm text-foreground/75"
        >
          <span className="font-semibold text-foreground">Founding Member</span>
          <span className="text-foreground/40">·</span>
          <span>lock in 40% off your plan forever for early supporters.</span>
        </motion.div>

        {/* Plan guide */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <h3 className="text-center font-display text-xl font-extrabold tracking-tight text-foreground">
            Which plan is right for me?
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {GUIDE.map((g) => (
              <div
                key={g.name}
                className="glass flex flex-col gap-1 rounded-[var(--radius-card)] px-5 py-4"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-foreground/45">
                  {g.name}
                </span>
                <span className="text-[15px] text-foreground/80">“{g.line}”</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
