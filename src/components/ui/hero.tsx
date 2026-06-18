'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SmartLink } from '@/components/ui/smart-link';
import { useAiliurApp } from '@/components/app/app-context';

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export function Hero() {
  const { openApp } = useAiliurApp();

  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden px-4 pb-24 pt-32 sm:pt-36">
      {/* Full-bleed brand render: red pillar + green loop orbiting on the right,
          spacious warm-yellow field on the left for the headline. */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
        <img
          src="/ailiur-hero-image.png"
          alt=""
          className="h-full w-full object-cover object-[82%_center] sm:object-[right_center]"
          draggable={false}
        />
        {/* Left scrim — keeps the dark headline crisp while letting the orbital
            paths whisper through. Lighter on large screens so the object breathes. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#ffd60a] via-[#ffd60a]/70 to-transparent sm:via-[#ffd60a]/45 lg:via-[#ffd60a]/25" />
        {/* Bottom fade so the render dissolves seamlessly into the page yellow. */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#ffd60a]" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-6xl"
      >
        <div className="max-w-2xl text-left">
          {/* Eyebrow */}
          <motion.span
            variants={rise}
            className="glass-strong mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-foreground/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
            Operating System for Life
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={rise}
            className="font-display text-[clamp(2.75rem,7vw,5rem)] font-extrabold leading-[1.02] tracking-tight text-foreground"
          >
            The operating system
            <br />
            for human{' '}
            <span className="font-[200] italic">flourishing</span>.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={rise}
            className="mt-6 max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg"
          >
            Ailiur unifies your health, learning, and focus into one local-first
            system — connected by the Context Mesh, so every part of your life
            compounds.
          </motion.p>

          {/* Primary CTA: launch the fullscreen app. Account stays secondary. */}
          <motion.div
            variants={rise}
            className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
          >
            <button
              type="button"
              onClick={() => openApp()}
              className="group inline-flex items-center gap-2 rounded-full bg-accent-green px-7 py-3.5 text-sm font-semibold text-[#fffdf5] shadow-lg shadow-accent-green/20 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
            >
              Launch Ailiur App
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <SmartLink
              href="/signup"
              className="glass-strong inline-flex items-center rounded-full px-6 py-3.5 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
            >
              Create your account
            </SmartLink>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
