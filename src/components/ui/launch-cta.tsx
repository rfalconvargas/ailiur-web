'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useAiliurApp } from '@/components/app/app-context';

const easeOut = [0.22, 1, 0.36, 1] as const;
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

/**
 * The single primary product CTA on the homepage. Replaces the old public
 * product-browsing energy: one strong invitation to launch the fullscreen
 * Ailiur App, plus a quiet "stay on homepage" escape.
 */
export function LaunchCta() {
  const { openApp } = useAiliurApp();

  return (
    <section id="launch" className="relative w-full px-4 py-24 sm:py-28">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="glass mx-auto max-w-4xl rounded-[var(--radius-panel)] px-6 py-14 text-center sm:px-12 sm:py-16"
      >
        <motion.span
          variants={rise}
          className="text-xs font-semibold uppercase tracking-widest text-foreground/50"
        >
          The Ailiur App
        </motion.span>
        <motion.h2
          variants={rise}
          className="mt-3 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight text-foreground"
        >
          Enter the operating system for your life.
        </motion.h2>
        <motion.p
          variants={rise}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/70 sm:text-lg"
        >
          Set goals, tune daily habits, build routines, learn better behaviors, schedule your week,
          and launch every Ailiur app from one fullscreen workspace.
        </motion.p>

        <motion.div
          variants={rise}
          className="mt-9 flex flex-col items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={() => openApp()}
            className="group inline-flex items-center gap-2 rounded-full bg-accent-green px-8 py-4 text-base font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
          >
            Launch Ailiur App
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <a
            href="#features"
            className="text-sm font-medium text-foreground/55 underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            Stay on homepage
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
