'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ListChecks, Calculator, AlertTriangle } from 'lucide-react';
import { OruvoSection, OruvoHint } from './section';
import { orCn, OR_EASE_OUT } from './utils';
import { SCENARIOS, HINTS } from '@/lib/oruvo/content';

/** Section 7 — AI scenario planner preview (transparent, shows its work). */
export function ScenarioPlanner() {
  const [active, setActive] = useState(0);
  const scenario = SCENARIOS[active];

  return (
    <OruvoSection
      id="scenarios"
      eyebrow="AI scenario planner"
      headline="“What changes my trajectory?” — answered out loud."
      intro="Not stock tips. Not black boxes. Pick a question and Oruvo shows the assumptions, the math, and the caution behind every answer."
    >
      <div className="mt-8">
        <OruvoHint>{HINTS.scenarios}</OruvoHint>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.15fr]">
        {/* Prompt chips */}
        <div className="flex flex-col gap-2.5" role="tablist" aria-label="Example questions">
          {SCENARIOS.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.prompt}
                role="tab"
                type="button"
                aria-selected={isActive}
                onClick={() => setActive(i)}
                className={orCn(
                  'group flex items-center gap-3 rounded-[var(--or-radius-lg)] px-4 py-3.5 text-left text-sm font-medium transition-all',
                  isActive
                    ? 'or-glass-strong text-[var(--or-ink)]'
                    : 'or-glass text-[var(--or-slate)] hover:-translate-y-0.5 hover:text-[var(--or-ink)]',
                )}
              >
                <Sparkles
                  className={orCn(
                    'h-4 w-4 shrink-0',
                    isActive ? 'text-[var(--or-gold)]' : 'text-[var(--or-slate-dim)]',
                  )}
                  aria-hidden
                />
                {s.prompt}
              </button>
            );
          })}
        </div>

        {/* Transparent answer — keyed remount replays the fade-in on select.
            (Plain keyed motion.div, not AnimatePresence `mode="wait"`, which can
            stall on a direct keyed child in this React/framer combo.) */}
        <div className="or-card rounded-[var(--or-radius-xl)] p-6 sm:p-7">
          <motion.div
            key={scenario.prompt}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: OR_EASE_OUT }}
          >
            <p className="font-display text-xl font-bold leading-snug tracking-tight text-[var(--or-ink)]">
              {scenario.answer}
            </p>

            <div className="mt-5 space-y-4">
              <Block icon={ListChecks} title="Assumptions" tone="var(--or-slate)">
                <ul className="space-y-1" role="list">
                  {scenario.assumptions.map((a) => (
                    <li key={a} className="flex gap-2 text-sm text-[var(--or-slate)]">
                      <span className="text-[var(--or-gold)]">·</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block icon={Calculator} title="Calculation" tone="var(--or-green)">
                <p className="or-num rounded-[var(--or-radius-md)] bg-[var(--or-green-tint)] px-3 py-2 text-sm font-semibold text-[var(--or-green)]">
                  {scenario.calculation}
                </p>
              </Block>

              <Block icon={AlertTriangle} title="Caution" tone="var(--or-gold-deep)">
                <p className="text-sm leading-relaxed text-[var(--or-slate)]">{scenario.caution}</p>
              </Block>
            </div>
          </motion.div>
        </div>
      </div>
    </OruvoSection>
  );
}

function Block({
  icon: Icon,
  title,
  tone,
  children,
}: {
  icon: typeof Sparkles;
  title: string;
  tone: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p
        className="mb-1.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]"
        style={{ color: tone }}
      >
        <Icon className="h-3.5 w-3.5" aria-hidden />
        {title}
      </p>
      {children}
    </div>
  );
}
