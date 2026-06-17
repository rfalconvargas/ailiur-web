'use client';

import { OruvoSection } from './section';
import { MetricCard } from './metric-card';
import { BALANCE_SHEET, BALANCE_NET_WORTH, DEMO_NOTE } from '@/lib/oruvo/content';

/** Section 2 — the interactive life balance sheet (cards animate on hover). */
export function BalanceSheet() {
  return (
    <OruvoSection
      id="balance-sheet"
      eyebrow="Your life balance sheet"
      headline="Everything that makes up your worth — on one surface."
      intro="Money apps stop at your bank balance. Oruvo holds the whole picture: liquid and physical, assets and liabilities, what you owe and what your time is building."
    >
      <div className="mt-9 flex flex-wrap items-end justify-between gap-4">
        <div className="or-glass-strong rounded-[var(--or-radius-lg)] px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--or-slate-dim)]">
            Estimated net worth
          </p>
          <p className="or-num mt-1 font-display text-4xl font-extrabold tracking-tight text-[var(--or-ink)]">
            {BALANCE_NET_WORTH}
          </p>
        </div>
        <p className="max-w-xs text-xs leading-relaxed text-[var(--or-slate-dim)]">{DEMO_NOTE}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {BALANCE_SHEET.map((datum, i) => (
          <MetricCard key={datum.key} datum={datum} index={i} />
        ))}
      </div>
    </OruvoSection>
  );
}
