'use client';

import { motion } from 'framer-motion';
import { Check, Minus } from 'lucide-react';
import { OruvoSection } from './section';
import { OR_EASE_OUT } from './utils';
import { DIFFERENTIATION } from '@/lib/oruvo/content';

/**
 * Differentiation — makes the wedge obvious: budgeting / inventory / net-worth
 * tools each track one slice; Oruvo is designed to map the whole life sheet.
 */
export function Differentiation() {
  return (
    <OruvoSection
      id="why"
      eyebrow={DIFFERENTIATION.eyebrow}
      headline={DIFFERENTIATION.headline}
      intro={DIFFERENTIATION.intro}
    >
      <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DIFFERENTIATION.rows.map((row, i) => (
          <motion.div
            key={row.tool}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: OR_EASE_OUT, delay: Math.min(i * 0.05, 0.25) }}
            className="or-card flex flex-col gap-4 rounded-[var(--or-radius-lg)] p-5"
          >
            <p className="font-display text-base font-bold tracking-tight text-[var(--or-ink)]">
              {row.tool}
            </p>
            <div className="space-y-3 border-t border-[var(--or-border)] pt-4">
              <div className="flex items-start gap-2.5">
                <Minus className="mt-0.5 h-4 w-4 shrink-0 text-[var(--or-slate-dim)]" aria-hidden />
                <p className="text-sm text-[var(--or-slate)]">
                  <span className="font-semibold text-[var(--or-ink)]">Tracks:</span> {row.slice}
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--or-green)]" aria-hidden />
                <p className="text-sm text-[var(--or-ink)]">
                  <span className="font-semibold text-[var(--or-gold-deep)]">Oruvo:</span> {row.oruvo}
                </p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Summary tile — the one-line thesis. */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: OR_EASE_OUT, delay: 0.3 }}
          className="flex flex-col justify-center rounded-[var(--or-radius-lg)] bg-[var(--or-ink)] p-6 text-[var(--or-paper)]"
        >
          <p className="font-display text-lg font-extrabold leading-snug tracking-tight">
            One sheet for money, belongings, goals, and time — instead of five apps that each see a sliver.
          </p>
        </motion.div>
      </div>

      <p className="mt-5 max-w-3xl text-xs leading-relaxed text-[var(--or-slate-dim)]">
        {DIFFERENTIATION.footnote}
      </p>
    </OruvoSection>
  );
}
