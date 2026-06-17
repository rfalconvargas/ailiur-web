'use client';

import { motion } from 'framer-motion';
import { orCn, OR_EASE_OUT, TONE_COLOR } from './utils';
import type { MetricDatum } from '@/lib/oruvo/content';

/** A single hover-animated balance-sheet card (the required `MetricCard`). */
export function MetricCard({ datum, index = 0 }: { datum: MetricDatum; index?: number }) {
  const Icon = datum.icon;
  const accent = TONE_COLOR[datum.tone] ?? 'var(--or-slate)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: OR_EASE_OUT, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={{ y: -4 }}
      className="or-card group flex flex-col gap-3 rounded-[var(--or-radius-lg)] p-5 transition-shadow hover:shadow-[var(--or-shadow-md)]"
    >
      <div className="flex items-center justify-between">
        <span
          className="flex h-9 w-9 items-center justify-center rounded-[var(--or-radius-sm)]"
          style={{ backgroundColor: 'color-mix(in srgb, ' + accent + ' 14%, transparent)' }}
        >
          <Icon className="h-4.5 w-4.5" style={{ color: accent }} aria-hidden />
        </span>
        {datum.delta && (
          <span
            className="or-num rounded-[var(--or-radius-pill)] px-2.5 py-1 text-[0.6875rem] font-semibold"
            style={{
              color: accent,
              backgroundColor: 'color-mix(in srgb, ' + accent + ' 12%, transparent)',
            }}
          >
            {datum.delta}
          </span>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-[var(--or-slate)]">{datum.label}</p>
        <p className="or-num mt-0.5 text-2xl font-extrabold tracking-tight text-[var(--or-ink)]">
          {datum.value}
        </p>
      </div>

      <p className={orCn('text-xs leading-relaxed text-[var(--or-slate-dim)]')}>{datum.note}</p>
    </motion.div>
  );
}
