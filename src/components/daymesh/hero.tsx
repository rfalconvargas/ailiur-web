'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Activity, Sparkles } from 'lucide-react';
import { DaymeshButton } from './button';
import { DM_HERO } from '@/lib/daymesh/content';
import { PRODUCT_FEEDBACK_URL } from '@/lib/site';
import { MOMENT_META } from './moment-meta';
import { DM_EASE_OUT } from './utils';
import type { MomentType } from '@/lib/daymesh/data';

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: DM_EASE_OUT, delay },
});

/** Small biometric figures rendered in the left panel of the hero visual. */
const BIO = [
  { label: 'Recovery', value: '81', unit: '%', tone: 'var(--dm-sage)' },
  { label: 'Sleep', value: '88', unit: '', tone: 'var(--dm-sage)' },
  { label: 'HRV', value: '96', unit: 'ms', tone: 'var(--dm-amber)' },
  { label: 'RHR', value: '50', unit: 'bpm', tone: 'var(--dm-ink-soft)' },
];

/** Moments rendered in the right panel of the hero visual. */
const SHOTS: { type: MomentType; label: string; time: string }[] = [
  { type: 'outdoor', label: 'Morning light', time: '7:10' },
  { type: 'meal', label: 'Colorful lunch', time: '12:00' },
  { type: 'travel', label: 'Slow drive', time: '17:00' },
];

export function DaymeshHero() {
  return (
    <section className="relative mx-auto w-full max-w-[var(--dm-content-max)] px-4 pb-10 pt-10 sm:px-6 sm:pt-16">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        {/* Copy */}
        <div className="max-w-xl">
          <motion.span
            {...fadeUp(0)}
            className="dm-glass inline-flex items-center gap-2 rounded-[var(--dm-radius-pill)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--dm-amber-deep)]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {DM_HERO.eyebrow}
          </motion.span>

          <motion.h1
            {...fadeUp(0.08)}
            className="mt-6 font-display text-[length:var(--dm-text-display)] font-extrabold leading-[1.02] tracking-tight text-[var(--dm-ink)]"
          >
            {DM_HERO.h1}
          </motion.h1>

          <motion.p
            {...fadeUp(0.14)}
            className="mt-5 font-display text-xl font-bold leading-snug text-[var(--dm-ink-soft)] sm:text-2xl"
          >
            {DM_HERO.kicker}
          </motion.p>

          <motion.p
            {...fadeUp(0.2)}
            className="mt-4 text-[length:var(--dm-text-body)] leading-relaxed text-[var(--dm-muted)] sm:text-lg"
          >
            {DM_HERO.sub}
          </motion.p>

          <motion.div {...fadeUp(0.24)} className="mt-8 flex flex-wrap items-center gap-3">
            <DaymeshButton href="#demo" size="lg" variant="primary">
              {DM_HERO.primaryCta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </DaymeshButton>
            <DaymeshButton href="#waitlist" size="lg" variant="glass">
              {DM_HERO.secondaryCta}
            </DaymeshButton>
            <DaymeshButton href={PRODUCT_FEEDBACK_URL} size="lg" variant="ghost">
              Feedback Form
            </DaymeshButton>
          </motion.div>

          <motion.p
            {...fadeUp(0.32)}
            className="mt-5 text-[length:var(--dm-text-small)] text-[var(--dm-muted)]"
          >
            {DM_HERO.trust}
          </motion.p>
        </div>

        {/* Split-interface visual */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: DM_EASE_OUT, delay: 0.2 }}
          className="relative"
        >
          <HeroSplit />
        </motion.div>
      </div>
    </section>
  );
}

function HeroSplit() {
  return (
    <div className="dm-glass-strong relative overflow-hidden rounded-[var(--dm-radius-xl)] p-4 sm:p-6">
      {/* connector lines layer */}
      <svg
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path className="dm-flow" d="M 46 30 C 50 30 50 30 54 30" stroke="var(--dm-amber)" strokeWidth="0.5" fill="none" />
        <path className="dm-flow" d="M 46 52 C 50 52 50 52 54 52" stroke="var(--dm-sage)" strokeWidth="0.5" fill="none" />
        <path className="dm-flow" d="M 46 74 C 50 74 50 74 54 74" stroke="var(--dm-amber)" strokeWidth="0.5" fill="none" />
      </svg>

      <div className="grid grid-cols-2 gap-3">
        {/* Left — biometrics */}
        <div className="dm-solid rounded-[var(--dm-radius-lg)] p-3.5">
          <div className="flex items-center gap-2 text-[var(--dm-ink-soft)]">
            <Activity className="h-3.5 w-3.5" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em]">Wearable</span>
          </div>
          <div className="mt-3 grid gap-2">
            {BIO.map((b) => (
              <div
                key={b.label}
                className="flex items-center justify-between rounded-[var(--dm-radius-sm)] border border-[var(--dm-hairline)] bg-[var(--dm-bg)] px-3 py-2"
              >
                <span className="text-[0.7rem] font-medium text-[var(--dm-muted)]">{b.label}</span>
                <span className="font-display text-base font-bold" style={{ color: b.tone }}>
                  {b.value}
                  <span className="ml-0.5 text-[0.6rem] font-medium text-[var(--dm-faint)]">{b.unit}</span>
                </span>
              </div>
            ))}
          </div>
          {/* mini sparkline */}
          <svg className="mt-3 h-10 w-full" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden>
            <polyline
              points="0,22 16,18 33,24 50,12 66,16 83,7 100,5"
              fill="none"
              stroke="var(--dm-sage)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Right — camera roll */}
        <div className="dm-solid rounded-[var(--dm-radius-lg)] p-3.5">
          <div className="flex items-center gap-2 text-[var(--dm-ink-soft)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.12em]">Camera roll</span>
          </div>
          <div className="mt-3 grid gap-2">
            {SHOTS.map((s) => {
              const meta = MOMENT_META[s.type];
              const Icon = meta.icon;
              return (
                <div
                  key={s.label}
                  className="flex items-center gap-2.5 rounded-[var(--dm-radius-sm)] border border-[var(--dm-hairline)] bg-[var(--dm-bg)] px-2.5 py-2"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]"
                    style={{ background: meta.tint, color: meta.color }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[0.78rem] font-semibold text-[var(--dm-ink)]">
                      {s.label}
                    </span>
                    <span className="text-[0.66rem] text-[var(--dm-muted)]">{s.time}</span>
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-3 rounded-[var(--dm-radius-sm)] border border-[var(--dm-border)] bg-[var(--dm-bg)] px-3 py-2 text-[0.66rem] leading-snug text-[var(--dm-muted)]">
            <span className="font-semibold text-[var(--dm-sage-deep)]">Insight ·</span> Outdoor, low-strain
            Sunday → your highest HRV.
          </div>
        </div>
      </div>

      <p className="mt-4 px-1 text-center text-[0.68rem] text-[var(--dm-faint)]">
        🔒 Running on-device · 0 photos uploaded · illustrative data
      </p>
    </div>
  );
}
