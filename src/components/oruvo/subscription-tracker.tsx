'use client';

import { useMemo, useState } from 'react';
import { OruvoSection, OruvoHint } from './section';
import { orCn } from './utils';
import { SUBSCRIPTIONS, DEMO_NOTE, HINTS, type SubStatus } from '@/lib/oruvo/content';

const STATUSES: { key: SubStatus; label: string }[] = [
  { key: 'keep', label: 'Keep' },
  { key: 'review', label: 'Review' },
  { key: 'cancel', label: 'Cancel later' },
];

const fmt = (n: number) => '$' + n.toLocaleString('en-US');

/** Section 5 — subscription & price/value tracker. */
export function SubscriptionTracker() {
  const [statuses, setStatuses] = useState<Record<string, SubStatus>>(
    () => Object.fromEntries(SUBSCRIPTIONS.map((s) => [s.id, s.defaultStatus])),
  );

  const { monthlyTotal, possibleSavings } = useMemo(() => {
    let total = 0;
    let savings = 0;
    for (const s of SUBSCRIPTIONS) {
      total += s.cost;
      // "Possible savings" = anything not actively kept (reviewing or cancelling).
      if (statuses[s.id] !== 'keep') savings += s.cost;
    }
    return { monthlyTotal: total, possibleSavings: savings };
  }, [statuses]);

  return (
    <OruvoSection
      id="subscriptions"
      eyebrow="Price & value tracker"
      headline="Find the money quietly leaking out of your life."
      intro="Every recurring charge, rated by what it’s actually worth to you. Mark what to keep, review, or cancel — and watch the possible savings update."
    >
      <div className="mt-8">
        <OruvoHint>{HINTS.subscriptions}</OruvoHint>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        {/* List */}
        <div className="or-card divide-y divide-[var(--or-border)] rounded-[var(--or-radius-xl)] p-2 sm:p-3">
          {SUBSCRIPTIONS.map((s) => {
            const Icon = s.icon;
            const status = statuses[s.id];
            return (
              <div key={s.id} className="flex flex-wrap items-center gap-3 p-3 sm:flex-nowrap">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--or-radius-sm)] bg-[rgba(22,26,32,0.04)]">
                  <Icon className="h-4 w-4 text-[var(--or-slate)]" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[var(--or-ink)]">{s.name}</p>
                  <p className="flex items-center gap-2 text-xs text-[var(--or-slate-dim)]">
                    {s.category}
                    <span aria-label={`Value ${s.value} of 5`} className="tracking-tight">
                      {'●'.repeat(s.value)}
                      <span className="text-[var(--or-border-strong)]">{'●'.repeat(5 - s.value)}</span>
                    </span>
                  </p>
                </div>
                <span className="or-num w-16 text-right text-sm font-bold text-[var(--or-ink)]">
                  {fmt(s.cost)}
                </span>
                <div
                  role="radiogroup"
                  aria-label={`Status for ${s.name}`}
                  className="flex shrink-0 rounded-[var(--or-radius-pill)] bg-[rgba(22,26,32,0.04)] p-0.5"
                >
                  {STATUSES.map((opt) => {
                    const active = status === opt.key;
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        onClick={() => setStatuses((p) => ({ ...p, [s.id]: opt.key }))}
                        className={orCn(
                          'rounded-[var(--or-radius-pill)] px-2.5 py-1 text-[0.6875rem] font-semibold transition-colors',
                          active
                            ? opt.key === 'keep'
                              ? 'bg-[var(--or-green)] text-white'
                              : opt.key === 'cancel'
                                ? 'bg-[var(--or-red)] text-white'
                                : 'bg-[var(--or-gold)] text-white'
                            : 'text-[var(--or-slate)] hover:text-[var(--or-ink)]',
                        )}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Totals */}
        <div className="or-glass-strong flex flex-col gap-5 rounded-[var(--or-radius-xl)] p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--or-slate-dim)]">
              Monthly total
            </p>
            <p className="or-num mt-1 font-display text-4xl font-extrabold tracking-tight text-[var(--or-ink)]">
              {fmt(monthlyTotal)}
            </p>
          </div>
          <div className="border-t border-[var(--or-border)] pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--or-slate-dim)]">
              Possible savings
            </p>
            <p className="or-num mt-1 font-display text-4xl font-extrabold tracking-tight text-[var(--or-green)]">
              {fmt(possibleSavings)}
              <span className="ml-1 text-base font-bold text-[var(--or-slate)]">/ mo</span>
            </p>
            <p className="mt-1 or-num text-xs text-[var(--or-slate-dim)]">
              ≈ {fmt(possibleSavings * 12)} a year if reviewed
            </p>
          </div>
          <p className="mt-auto text-xs text-[var(--or-slate-dim)]">{DEMO_NOTE}</p>
        </div>
      </div>
    </OruvoSection>
  );
}
