'use client';

import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SmartLink } from '@/components/ui/smart-link';

const easeOut = [0.22, 1, 0.36, 1] as const;
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

type Tier = {
  name: string;
  priceMonthly: number;
  priceAnnual: number; // per month, billed annually
  blurb: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
};

// Illustrative pricing — confirm tiers and amounts before launch.
const TIERS: Tier[] = [
  {
    name: 'Free',
    priceMonthly: 0,
    priceAnnual: 0,
    blurb: 'Start with one app and the local Context Mesh.',
    features: ['Ketofy or Enchiridion', 'Local-first storage', 'Core closed-loop tuning'],
    cta: 'Get started',
    href: '/signup',
  },
  {
    name: 'Pro',
    priceMonthly: 19,
    priceAnnual: 15,
    blurb: 'The full ecosystem, fully connected.',
    features: [
      'Ketofy + Enchiridion',
      'Unified Context Mesh',
      'Advanced closed-loop targets',
      'Priority sync & support',
    ],
    cta: 'Start Pro',
    href: '/signup?plan=pro',
    featured: true,
  },
  {
    name: 'Founder',
    priceMonthly: 0,
    priceAnnual: 0,
    blurb: 'Pay once. Own it for life.',
    features: ['Everything in Pro', 'Lifetime license', 'Full data sovereignty', 'Early access to new apps'],
    cta: 'Buy lifetime',
    href: '/signup?plan=founder',
  },
];

const FOUNDER_PRICE = 499;

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="relative w-full px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
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
            One system. Simple pricing.
          </motion.h2>

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
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {TIERS.map((tier) => {
            const isFounder = tier.name === 'Founder';
            const price = isFounder ? FOUNDER_PRICE : annual ? tier.priceAnnual : tier.priceMonthly;
            const unit = isFounder ? 'once' : '/mo';
            return (
              <motion.div
                key={tier.name}
                variants={rise}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className={cn(
                  'relative flex flex-col rounded-[var(--radius-card)] p-8',
                  tier.featured
                    ? 'glass-strong ring-2 ring-accent-green'
                    : 'glass'
                )}
              >
                {tier.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent-green px-3 py-1 text-xs font-semibold text-[#fffdf5]">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
                  {tier.name}
                </h3>
                <p className="mt-1 text-sm text-foreground/60">{tier.blurb}</p>
                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-extrabold tracking-tight text-foreground">
                    ${price}
                  </span>
                  <span className="text-sm text-foreground/55">{unit}</span>
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
                  className={cn(
                    'mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5',
                    tier.featured
                      ? 'bg-accent-green text-[#fffdf5]'
                      : 'bg-foreground text-[#fffdf5]'
                  )}
                >
                  {tier.cta}
                </SmartLink>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
