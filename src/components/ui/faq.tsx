'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const easeOut = [0.22, 1, 0.36, 1] as const;
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};

const FAQS = [
  {
    q: 'What exactly is Ailiur?',
    a: 'Ailiur is an operating system for a frictionless life. Its apps — Ketofy for metabolic health and Enchiridion for learning — run on a shared, local-first Context Mesh, so progress in one part of your life informs the rest.',
  },
  {
    q: 'What is the Unified Context Mesh?',
    a: 'A lightweight, on-device data layer that lets your apps share context securely. Health signals, study patterns, and focus data cross-pollinate locally, with sub-millisecond retrieval and no cloud dependency.',
  },
  {
    q: 'Is my data private?',
    a: 'Yes. Ailiur is local-first and sovereign by design — your data lives on your device and is never sent anywhere unless you explicitly choose to sync or share it.',
  },
  {
    q: 'Do I need both apps to get value?',
    a: 'No. Start with either Ketofy or Enchiridion on the Free plan. The Mesh simply makes them better together when you add the second.',
  },
  {
    q: 'Can I switch from another tool?',
    a: 'Yes — “Switch to Ailiur” walks you through importing your existing data and protocols so you can move over without losing history.',
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={rise} className="glass overflow-hidden rounded-[var(--radius-card)]">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
          {q}
        </span>
        <Plus
          className={cn(
            'h-5 w-5 shrink-0 text-foreground/60 transition-transform duration-300',
            open && 'rotate-45'
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
          >
            <p className="px-6 pb-5 text-[15px] leading-relaxed text-foreground/70">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="relative w-full px-4 py-24 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <motion.span
            variants={rise}
            className="text-xs font-semibold uppercase tracking-widest text-foreground/50"
          >
            FAQ
          </motion.span>
          <motion.h2
            variants={rise}
            className="mt-3 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight text-foreground"
          >
            Questions, answered.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 space-y-3"
        >
          {FAQS.map((f) => (
            <FaqItem key={f.q} {...f} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
