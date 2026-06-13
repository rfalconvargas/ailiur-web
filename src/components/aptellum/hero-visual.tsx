'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Building2, Briefcase, CheckCircle2, Circle, Sparkles } from 'lucide-react';
import { HERO_MOCK } from '@/lib/aptellum/page-content';
import { AP_EASE_OUT, apCn } from './utils';

const floatTransition = {
  duration: 6,
  repeat: Infinity,
  repeatType: 'reverse' as const,
  ease: 'easeInOut' as const,
};

/**
 * Premium mock studio interface — aligned dashboard cards with a sample co-op brief.
 */
export function HeroVisual() {
  const reduced = useReducedMotion();

  return (
    <div
      className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none"
      aria-label="Aptellum studio preview showing a generated co-op brief"
      role="img"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[var(--ap-radius-xl)] bg-[radial-gradient(ellipse_at_50%_30%,var(--ap-mist-soft)_0%,transparent_70%)]"
        aria-hidden
      />

      {/* Main panel */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: AP_EASE_OUT }}
        className={apCn(
          'ap-glass-strong relative z-10 w-full rounded-[var(--ap-radius-xl)]',
          'border border-[var(--ap-border-strong)] p-5 shadow-[var(--ap-shadow-lg)] sm:p-7',
        )}
      >
        <div className="mb-5 flex items-center justify-between border-b border-[var(--ap-border)] pb-4">
          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--ap-graphite)]">
              Co-op brief
            </p>
            <p className="mt-0.5 font-display text-lg font-bold text-[var(--ap-ink)]">Studio session</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-[var(--ap-radius-pill)] bg-[color-mix(in_srgb,var(--ap-gold)_14%,var(--ap-ivory))] px-3 py-1 text-xs font-semibold text-[var(--ap-ink)]">
            <CheckCircle2 className="h-3.5 w-3.5 text-[var(--ap-gold)]" aria-hidden />
            {HERO_MOCK.status}
          </span>
        </div>

        <div className="space-y-3">
          <BriefRow
            icon={<Building2 className="h-4 w-4" />}
            label="Dream company"
            value={HERO_MOCK.dreamCompany}
          />
          <BriefRow
            icon={<Briefcase className="h-4 w-4" />}
            label="Role"
            value={HERO_MOCK.role}
          />
          <BriefRow
            icon={<Sparkles className="h-4 w-4" />}
            label="Project"
            value={HERO_MOCK.project}
            highlight
          />
        </div>

        <div className="mt-6 rounded-[var(--ap-radius-md)] border border-[var(--ap-border)] bg-[var(--ap-surface-muted)] p-4">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--ap-graphite)]">
            Next step
          </p>
          <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-[var(--ap-ink)]">
            {HERO_MOCK.nextStep}
            <ArrowRight className="h-4 w-4 text-[var(--ap-gold)]" aria-hidden />
          </p>
        </div>

        {/* Progress rail */}
        <div className="mt-5 flex items-center gap-2" aria-hidden>
          {['Discover', 'Map', 'Make', 'Refine', 'Apply'].map((step, i) => (
            <div key={step} className="flex flex-1 flex-col items-center gap-1">
              <Circle
                className={apCn(
                  'h-2 w-2',
                  i < 2 ? 'fill-[var(--ap-gold)] text-[var(--ap-gold)]' : 'text-[var(--ap-mist)]',
                )}
              />
              <span className="hidden text-[0.625rem] text-[var(--ap-graphite)] sm:block">{step}</span>
            </div>
          ))}
        </div>

        <p className="mt-5 border-t border-[var(--ap-border)] pt-4 text-[0.75rem] leading-snug text-[var(--ap-graphite)]">
          Example target · not affiliated with any company shown.
        </p>
      </motion.div>

      {/* Accent cards — static on mobile, subtle drift on desktop */}
      <motion.div
        animate={reduced ? undefined : { y: [-2, 2] }}
        transition={reduced ? undefined : floatTransition}
        className={apCn(
          'ap-glass absolute -left-1 top-10 z-20 hidden max-w-[10rem] rounded-[var(--ap-radius-md)]',
          'border border-[var(--ap-border)] p-3 shadow-[var(--ap-shadow-md)] sm:block sm:-left-5',
        )}
        aria-hidden
      >
        <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-[var(--ap-graphite)]">Delegation</p>
        <p className="mt-1 text-xs font-medium leading-snug text-[var(--ap-ink)]">Student-owned concept & craft</p>
      </motion.div>

      <motion.div
        animate={reduced ? undefined : { y: [2, -2] }}
        transition={reduced ? undefined : { ...floatTransition, delay: 0.8 }}
        className={apCn(
          'ap-glass absolute -right-1 bottom-20 z-20 hidden max-w-[10rem] rounded-[var(--ap-radius-md)]',
          'border border-[var(--ap-border)] p-3 shadow-[var(--ap-shadow-md)] sm:block sm:-right-5',
        )}
        aria-hidden
      >
        <p className="text-[0.625rem] font-semibold uppercase tracking-wider text-[var(--ap-graphite)]">Portfolio</p>
        <p className="mt-1 text-xs font-medium leading-snug text-[var(--ap-ink)]">Case study ready</p>
      </motion.div>
    </div>
  );
}

function BriefRow({
  icon,
  label,
  value,
  highlight,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={apCn(
        'flex items-start gap-3 rounded-[var(--ap-radius-sm)] border p-3',
        highlight
          ? 'border-[color-mix(in_srgb,var(--ap-gold)_30%,transparent)] bg-[color-mix(in_srgb,var(--ap-gold)_8%,var(--ap-surface))]'
          : 'border-[var(--ap-border)] bg-[var(--ap-surface)]',
      )}
    >
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--ap-mist-soft)] text-[var(--ap-graphite)]">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[var(--ap-graphite)]">{label}</p>
        <p className="mt-0.5 text-sm font-medium leading-snug text-[var(--ap-ink)]">{value}</p>
      </div>
    </div>
  );
}
