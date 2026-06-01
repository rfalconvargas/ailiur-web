'use client';

import { motion, type Variants } from 'framer-motion';
import { Boxes, RefreshCw, ShieldCheck, type LucideIcon } from 'lucide-react';

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

type Feature = {
  icon: LucideIcon;
  title: string;
  body: string;
  tint: string; // CSS color var for the icon chip
};

const FEATURES: Feature[] = [
  {
    icon: Boxes,
    title: 'Unified Context Mesh',
    body: 'Your health, learning, and focus share one local context layer — so an insight in one app sharpens every other. No more siloed data.',
    tint: 'var(--accent-green)',
  },
  {
    icon: RefreshCw,
    title: 'Closed-Loop by Default',
    body: 'Ailiur watches its own output, measures against your targets, and tunes itself. A system that improves while you live your life.',
    tint: 'var(--accent-red)',
  },
  {
    icon: ShieldCheck,
    title: 'Local-First & Sovereign',
    body: 'Everything runs on-device — deterministic, private, and fast. Your data never leaves unless you explicitly send it.',
    tint: 'var(--ketofy)',
  },
];

export function Features() {
  return (
    <section id="features" className="relative w-full px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Section heading */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={rise}
            className="text-xs font-semibold uppercase tracking-widest text-foreground/50"
          >
            The System
          </motion.span>
          <motion.h2
            variants={rise}
            className="mt-3 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight text-foreground"
          >
            One context. Every part of your life.
          </motion.h2>
          <motion.p variants={rise} className="mt-4 text-base text-foreground/65 sm:text-lg">
            Ketofy and Enchiridion are different surfaces of the same operating
            system — quietly connected underneath.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {FEATURES.map(({ icon: Icon, title, body, tint }) => (
            <motion.div
              key={title}
              variants={rise}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="glass rounded-[var(--radius-card)] p-8"
            >
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `color-mix(in srgb, ${tint} 16%, transparent)`, color: tint }}
              >
                <Icon className="h-6 w-6" strokeWidth={2} />
              </span>
              <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-foreground">
                {title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-foreground/70">{body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
