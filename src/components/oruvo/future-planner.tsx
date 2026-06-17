'use client';

import { useMemo, useState } from 'react';
import { OruvoSection, OruvoHint } from './section';
import { orCn } from './utils';
import { WISH_ITEMS, PLANNER_DEFAULTS, DEMO_NOTE, HINTS } from '@/lib/oruvo/content';

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

/** Section 4 — future studio/house planner with an affordability timeline. */
export function FuturePlanner() {
  const [priorityId, setPriorityId] = useState(WISH_ITEMS[1].id);
  const [monthlySavings, setMonthlySavings] = useState(PLANNER_DEFAULTS.monthlySavings);
  const [currentFunds, setCurrentFunds] = useState(PLANNER_DEFAULTS.currentFunds);

  const priority = WISH_ITEMS.find((w) => w.id === priorityId) ?? WISH_ITEMS[0];

  const { months, affordable, progress } = useMemo(() => {
    const remaining = Math.max(priority.price - currentFunds, 0);
    const m = remaining === 0 ? 0 : Math.ceil(remaining / Math.max(monthlySavings, 1));
    return {
      months: m,
      affordable: remaining === 0,
      progress: Math.min(100, Math.round((currentFunds / priority.price) * 100)),
    };
  }, [priority.price, currentFunds, monthlySavings]);

  return (
    <OruvoSection
      id="planner"
      eyebrow="Plan the life before you buy it"
      headline="Turn a wishlist into an honest timeline."
      intro="Pick what matters most, set what you can put aside, and watch the “reachable by” date move. Aspiration, made plannable — never a promise."
    >
      <div className="mt-8">
        <OruvoHint>{HINTS.planner}</OruvoHint>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        {/* Controls */}
        <div className="or-card flex flex-col gap-6 rounded-[var(--or-radius-xl)] p-5 sm:p-6">
          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--or-slate)]">
              Priority item
            </label>
            <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Priority item">
              {WISH_ITEMS.map((w) => {
                const Icon = w.icon;
                const active = w.id === priorityId;
                return (
                  <button
                    key={w.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setPriorityId(w.id)}
                    className={orCn(
                      'inline-flex items-center gap-1.5 rounded-[var(--or-radius-pill)] px-3 py-1.5 text-xs font-medium transition-all',
                      active
                        ? 'bg-[var(--or-ink)] text-[var(--or-paper)]'
                        : 'or-glass text-[var(--or-ink)] hover:border-[var(--or-border-strong)]',
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                    {w.name}
                  </button>
                );
              })}
            </div>
          </div>

          <RangeRow
            id="planner-savings"
            label="Monthly savings"
            value={monthlySavings}
            min={100}
            max={2000}
            step={50}
            onChange={setMonthlySavings}
            display={fmt(monthlySavings) + ' / mo'}
          />
          <RangeRow
            id="planner-funds"
            label="Available now"
            value={currentFunds}
            min={0}
            max={15000}
            step={100}
            onChange={setCurrentFunds}
            display={fmt(currentFunds)}
          />
        </div>

        {/* Result */}
        <div className="or-glass-strong flex flex-col justify-between rounded-[var(--or-radius-xl)] p-6 sm:p-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--or-slate-dim)]">
              {priority.name} · {fmt(priority.price)}
            </p>
            <p className="mt-3 font-display text-5xl font-extrabold tracking-tight text-[var(--or-ink)]">
              {affordable ? (
                <span className="text-[var(--or-green)]">Reachable now</span>
              ) : (
                <>
                  <span className="or-num">{months}</span>
                  <span className="ml-2 text-2xl font-bold text-[var(--or-slate)]">
                    {months === 1 ? 'month' : 'months'}
                  </span>
                </>
              )}
            </p>
            <p className="mt-2 text-sm text-[var(--or-slate)]">
              {affordable
                ? 'Your available funds already cover this goal.'
                : `Estimated time to afford at ${fmt(monthlySavings)}/mo.`}
            </p>
          </div>

          {/* progress bar */}
          <div className="mt-6">
            <div className="flex justify-between text-xs font-medium text-[var(--or-slate-dim)]">
              <span>{progress}% funded</span>
              <span className="or-num">
                {fmt(currentFunds)} / {fmt(priority.price)}
              </span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-[var(--or-radius-pill)] bg-[rgba(22,26,32,0.07)]">
              <div
                className="h-full rounded-[var(--or-radius-pill)] bg-[linear-gradient(90deg,var(--or-gold-soft),var(--or-gold-deep))] transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-[var(--or-slate-dim)]">Simple front-end projection · {DEMO_NOTE}</p>
          </div>
        </div>
      </div>
    </OruvoSection>
  );
}

function RangeRow({
  id,
  label,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  display: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--or-slate)]">
          {label}
        </label>
        <span className="or-num text-sm font-bold text-[var(--or-ink)]">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--or-gold)]"
      />
    </div>
  );
}
