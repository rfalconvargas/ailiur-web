'use client';

import { motion } from 'framer-motion';
import { OruvoSection } from './section';
import { orCn, OR_EASE_OUT } from './utils';
import { TIME_ROI, type TimeRoi } from '@/lib/oruvo/content';

const CONFIDENCE_STYLE: Record<TimeRoi['confidence'], string> = {
  High: 'bg-[var(--or-green-tint)] text-[var(--or-green)]',
  Medium: 'bg-[var(--or-gold-tint)] text-[var(--or-gold-deep)]',
  Low: 'bg-[rgba(22,26,32,0.06)] text-[var(--or-slate)]',
};

/** Section 6 — career & time ROI cards (scenario framing, never guaranteed). */
export function TimeRoiCards() {
  return (
    <OruvoSection
      id="time-roi"
      eyebrow="Career & time ROI"
      headline="Your time is the largest asset on the sheet."
      intro="See where your hours point and what each could be worth — framed as scenario planning, not a promise of income."
    >
      <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TIME_ROI.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, ease: OR_EASE_OUT, delay: Math.min(i * 0.05, 0.25) }}
              whileHover={{ y: -4 }}
              className="or-card flex flex-col gap-4 rounded-[var(--or-radius-lg)] p-5 transition-shadow hover:shadow-[var(--or-shadow-md)]"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-[var(--or-radius-sm)] bg-[rgba(22,26,32,0.04)]">
                  <Icon className="h-4 w-4 text-[var(--or-ink)]" aria-hidden />
                </span>
                <span
                  className={orCn(
                    'rounded-[var(--or-radius-pill)] px-2.5 py-1 text-[0.6875rem] font-semibold',
                    CONFIDENCE_STYLE[card.confidence],
                  )}
                >
                  {card.confidence} confidence
                </span>
              </div>
              <p className="font-display text-lg font-bold tracking-tight text-[var(--or-ink)]">
                {card.title}
              </p>
              <div className="mt-auto grid grid-cols-2 gap-3 border-t border-[var(--or-border)] pt-4">
                <div>
                  <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--or-slate-dim)]">
                    Time
                  </p>
                  <p className="or-num mt-0.5 text-sm font-bold text-[var(--or-ink)]">{card.hours}</p>
                </div>
                <div>
                  <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--or-slate-dim)]">
                    Possible upside
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-[var(--or-green)]">{card.upside}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <p className="mt-5 text-xs text-[var(--or-slate-dim)]">
        “Possible upside” describes scenarios, not guaranteed earnings.
      </p>
    </OruvoSection>
  );
}
