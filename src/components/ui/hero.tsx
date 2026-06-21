'use client';

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SmartLink } from '@/components/ui/smart-link';
import { track } from '@/lib/analytics';

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
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden px-4 pb-24 pt-32 sm:pt-36">
      {/* Full-bleed brand render: red pillar + green loop orbiting on the right,
          spacious warm-yellow field on the left for the headline. */}
      <div className="pointer-events-none absolute inset-0 select-none" aria-hidden="true">
        <Image
          src="/ailiur-hero-image.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[82%_center] sm:object-[right_center]"
          draggable={false}
        />
        {/* Left scrim — the brand-yellow hero moment. Keeps the dark headline
            crisp while letting the orbital paths whisper through; lighter on
            large screens so the object breathes. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-yellow)] via-[var(--color-brand-yellow)]/70 to-transparent sm:via-[var(--color-brand-yellow)]/45 lg:via-[var(--color-brand-yellow)]/25" />
        {/* Bottom fade so the render dissolves seamlessly into the neutral canvas. */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-[var(--color-canvas)]" />
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
            className="badge-brand mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/80"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
            AI-first outcome engines
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={rise}
            className="font-display text-[clamp(2.75rem,7vw,5rem)] font-extrabold leading-[1.02] tracking-tight text-foreground"
          >
            Outcome engines
            <br />
            for a better human{' '}
            <span className="font-[200] italic">life</span>.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={rise}
            className="mt-6 max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg"
          >
            Ailiur builds AI-first apps for learning, health, creativity, personal intelligence, and
            work — each one an engine that produces results, connected by one private Context Mesh so
            progress in one compounds across all.
          </motion.p>

          {/* Primary CTA: pricing (conversion). Explore is secondary. */}
          <motion.div
            variants={rise}
            className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
          >
            <SmartLink
              href="#pricing"
              onClick={() =>
                track('cta_click', { id: 'see_pricing', location: 'hero', label: 'See pricing' })
              }
              className="group inline-flex items-center gap-2 rounded-full bg-accent-green px-7 py-3.5 text-sm font-semibold text-[#fffdf5] shadow-lg shadow-accent-green/20 transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
            >
              See pricing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </SmartLink>
            <SmartLink
              href="#ecosystem"
              onClick={() =>
                track('cta_click', { id: 'explore_ecosystem', location: 'hero', label: 'Explore the ecosystem' })
              }
              className="glass-strong inline-flex items-center rounded-full px-6 py-3.5 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
            >
              Explore the ecosystem
            </SmartLink>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
