'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Hand } from 'lucide-react';
import { OruvoButton } from './button';
import { OruvoReveal } from './reveal';
import { orCn, OR_EASE_OUT, TONE_COLOR } from './utils';
import { BRAND, HERO, HERO_TABS, HINTS, type HeroTabKey } from '@/lib/oruvo/content';
import { PRODUCT_FEEDBACK_URL } from '@/lib/site';

/** Interactive phone/dashboard card with switchable tabs. */
function DashboardCard() {
  const [tab, setTab] = useState<HeroTabKey>('assets');
  const active = HERO_TABS.find((t) => t.key === tab) ?? HERO_TABS[0];

  return (
    <div className="or-glass-strong mx-auto w-full max-w-sm rounded-[var(--or-radius-xl)] p-4 sm:p-5">
      {/* window chrome */}
      <div className="mb-3 flex items-center justify-between px-1">
        <span className="font-display text-sm font-bold tracking-tight text-[var(--or-ink)]">
          {BRAND.name}
        </span>
        <span className="rounded-[var(--or-radius-pill)] bg-[var(--or-gold-tint)] px-2.5 py-1 text-[0.6875rem] font-semibold text-[var(--or-gold-deep)]">
          Live preview
        </span>
      </div>

      {/* tabs */}
      <div
        role="tablist"
        aria-label="Dashboard views"
        className="flex gap-1 rounded-[var(--or-radius-md)] bg-[rgba(22,26,32,0.04)] p-1"
      >
        {HERO_TABS.map((t) => {
          const selected = t.key === tab;
          return (
            <button
              key={t.key}
              role="tab"
              type="button"
              aria-selected={selected}
              onClick={() => setTab(t.key)}
              className={orCn(
                'relative flex-1 rounded-[var(--or-radius-sm)] px-2 py-1.5 text-[0.7rem] font-semibold transition-colors',
                selected ? 'text-[var(--or-ink)]' : 'text-[var(--or-slate-dim)] hover:text-[var(--or-slate)]',
              )}
            >
              {selected && (
                <motion.span
                  layoutId="oruvo-hero-tab"
                  className="absolute inset-0 rounded-[var(--or-radius-sm)] bg-[var(--or-cloud)] shadow-[var(--or-shadow-sm)]"
                  transition={{ duration: 0.3, ease: OR_EASE_OUT }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* panel — keyed so each tab change remounts and replays the fade-in.
          (No AnimatePresence/exit here: a shared-layout tab indicator can stall
          `mode="wait"` exit completion, which would freeze the panel.) */}
      <div className="mt-3 min-h-[13rem] rounded-[var(--or-radius-lg)] bg-[var(--or-cloud)] p-4 shadow-[var(--or-inner-hi)]">
        <motion.div
          key={active.key}
          role="tabpanel"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, ease: OR_EASE_OUT }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--or-slate-dim)]">
            {active.headline}
          </p>
          <ul className="mt-3 space-y-2.5" role="list">
            {active.rows.map((row) => (
              <li key={row.label} className="flex items-center justify-between gap-3">
                <span className="text-sm text-[var(--or-slate)]">{row.label}</span>
                <span
                  className="or-num text-sm font-bold"
                  style={{ color: row.tone ? TONE_COLOR[row.tone] : 'var(--or-ink)' }}
                >
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <p className="mt-3 flex items-center justify-center gap-1.5 px-1 text-center text-[0.6875rem] text-[var(--or-slate-dim)]">
        <Hand className="h-3 w-3" aria-hidden />
        {HINTS.heroTabs} · illustrative figures
      </p>
    </div>
  );
}

export function OruvoHero() {
  return (
    <section id="top" className="mx-auto w-full max-w-[var(--or-content-max)] px-4 pb-8 pt-10 sm:pt-14">
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <OruvoReveal>
          <span className="or-glass inline-flex items-center gap-2 rounded-[var(--or-radius-pill)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--or-slate)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--or-gold)] shadow-[0_0_8px_var(--or-gold-soft)]" />
            {HERO.eyebrow}
          </span>

          <h1 className="mt-5 font-display text-[length:var(--or-text-display)] font-extrabold leading-[1.04] tracking-tight text-[var(--or-ink)]">
            {HERO.headline}
          </h1>

          <p className="mt-5 max-w-xl text-[length:var(--or-text-body)] leading-relaxed text-[var(--or-slate)]">
            {HERO.subhead}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <OruvoButton href="#waitlist" size="lg" variant="primary">
              {HERO.primaryCta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </OruvoButton>
            <OruvoButton href="#balance-sheet" size="lg" variant="glass">
              {HERO.secondaryCta}
            </OruvoButton>
            <OruvoButton href={PRODUCT_FEEDBACK_URL} size="lg" variant="ghost">
              Feedback Form
            </OruvoButton>
          </div>

          <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2" role="list">
            {HERO.microtrust.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--or-slate)]"
              >
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--or-green)]" />
                {item}
              </li>
            ))}
          </ul>
        </OruvoReveal>

        {/* Interactive card */}
        <OruvoReveal delay={0.12}>
          <DashboardCard />
        </OruvoReveal>
      </div>
    </section>
  );
}
