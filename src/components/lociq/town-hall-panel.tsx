'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Landmark, Vote, Route, Check } from 'lucide-react';
import { LOCIQ_STAGES } from '@/lib/lociq/content';
import { ConsensusRing } from './consensus-ring';
import { LQ_EASE_OUT, lqCn } from './utils';

/* Which civic stage the panel is currently "on" — earlier ones are done. */
const ACTIVE_INDEX = 2; // Vote

const STAGE_ICONS = [MapPin, Landmark, Vote, Route] as const;

const STEPS = [
  { label: 'Issue routed to Dept. of Transportation', done: true },
  { label: '128 neighbors backed “signal + crossing”', done: true },
  { label: 'Walk-through scheduled with the district office', done: false },
] as const;

/**
 * Town Hall panel — the hero's instrument. Decorative (aria-hidden): a reported
 * issue header, the four-stage civic pipeline, a consensus ring, and the route
 * of next steps. A municipal dashboard rendered as calm product marketing.
 */
export function TownHallPanel({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div
      className={lqCn(
        'lq-glass-strong relative overflow-hidden rounded-[var(--lq-radius-xl)] p-5 sm:p-7',
        className,
      )}
      aria-hidden
    >
      {/* Ambient accent fragments */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-12 -top-14 h-40 w-40 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--lq-green)_30%,transparent),transparent_70%)] blur-2xl" />
        <div className="absolute -bottom-16 left-6 h-44 w-44 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--lq-blue)_24%,transparent),transparent_70%)] blur-2xl" />
      </div>

      {/* Header — reported issue + live status */}
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--lq-radius-md)] border border-[var(--lq-border)] bg-[var(--lq-surface-muted)] text-[var(--lq-green)]">
            <MapPin className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div>
            <p className="font-display text-base font-bold leading-tight text-[var(--lq-ink)]">
              Maple &amp; 3rd crosswalk
            </p>
            <p className="mt-0.5 text-[0.75rem] text-[var(--lq-slate)]">Riverside · reported by 3 neighbors</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 rounded-[var(--lq-radius-pill)] border border-[color-mix(in_srgb,var(--lq-green)_35%,transparent)] bg-[color-mix(in_srgb,var(--lq-green)_10%,transparent)] px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-[var(--lq-green-deep)]">
          <span className="relative flex h-1.5 w-1.5">
            {!reduced && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--lq-green)] opacity-60" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--lq-green)]" />
          </span>
          In progress
        </span>
      </div>

      {/* Civic pipeline */}
      <div className="relative mt-6">
        <ol className="flex items-start" role="list">
          {LOCIQ_STAGES.map((stage, i) => {
            const Icon = STAGE_ICONS[i];
            const state = i < ACTIVE_INDEX ? 'done' : i === ACTIVE_INDEX ? 'active' : 'pending';
            return (
              <li key={stage.id} className="flex flex-1 flex-col">
                <div className="flex items-center">
                  <span
                    className={lqCn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full border',
                      state === 'done'
                        ? 'border-[var(--lq-green)] bg-[color-mix(in_srgb,var(--lq-green)_12%,transparent)] text-[var(--lq-green)]'
                        : state === 'active'
                          ? 'border-[var(--lq-gold)] bg-[color-mix(in_srgb,var(--lq-gold)_14%,transparent)] text-[var(--lq-gold)]'
                          : 'border-[var(--lq-hairline)] text-[var(--lq-slate-dim)]',
                    )}
                  >
                    {state === 'done' ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" strokeWidth={1.75} />}
                  </span>
                  {i < LOCIQ_STAGES.length - 1 && (
                    <span className="mx-1 h-px flex-1 bg-[var(--lq-hairline)]">
                      <span
                        className={lqCn('block h-px', i < ACTIVE_INDEX ? 'w-full bg-[var(--lq-green)]' : 'w-0')}
                      />
                    </span>
                  )}
                </div>
                <span
                  className={lqCn(
                    'mt-2 text-[0.6875rem] font-medium',
                    state === 'pending' ? 'text-[var(--lq-slate-dim)]' : 'text-[var(--lq-charcoal)]',
                  )}
                >
                  {stage.label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Consensus + decision-maker */}
      <div className="relative mt-6 grid grid-cols-[auto_1fr] items-center gap-4 rounded-[var(--lq-radius-lg)] border border-[var(--lq-hairline)] bg-[var(--lq-surface-muted)] p-4">
        <ConsensusRing percent={78} size={116} label="agree" sublabel="of 164 voters" />
        <div className="min-w-0">
          <p className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-[var(--lq-slate-dim)]">
            Leading solution
          </p>
          <p className="mt-1 font-display text-lg font-bold leading-tight text-[var(--lq-ink)]">
            Signal + protected crossing
          </p>
          <div className="mt-2 flex items-center gap-2 text-[0.75rem] text-[var(--lq-slate)]">
            <Landmark className="h-3.5 w-3.5 shrink-0 text-[var(--lq-blue)]" strokeWidth={1.75} />
            Dept. of Transportation
          </div>
        </div>
      </div>

      {/* Route of next steps */}
      <div className="relative mt-5">
        <p className="mb-3 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-[var(--lq-slate-dim)]">
          Next steps
        </p>
        <ol className="relative space-y-3 pl-1" role="list">
          {/* Thin route line */}
          <span className="absolute left-[6px] top-1 h-[calc(100%-0.5rem)] w-px bg-[var(--lq-hairline)]" aria-hidden />
          {STEPS.map((step, i) => (
            <motion.li
              key={step.label}
              initial={reduced ? false : { opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: LQ_EASE_OUT, delay: 0.15 + i * 0.1 }}
              className="relative flex items-start gap-3"
            >
              <span
                className={lqCn(
                  'relative z-[1] mt-1 h-3 w-3 shrink-0 rounded-full border-2 bg-[var(--lq-paper-raised)]',
                  step.done ? 'border-[var(--lq-green)]' : 'border-[var(--lq-gold)]',
                )}
              />
              <span
                className={lqCn(
                  'text-[0.8125rem] leading-relaxed',
                  step.done ? 'text-[var(--lq-charcoal)]' : 'text-[var(--lq-slate)]',
                )}
              >
                {step.label}
              </span>
            </motion.li>
          ))}
        </ol>
      </div>
    </div>
  );
}
