'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Coins, Activity, ShieldCheck, BellRing, Check, Loader2 } from 'lucide-react';
import { TELLUMETRY_STAGES } from '@/lib/tellumetry/content';
import { TM_EASE_OUT, tmCn } from './utils';

/* Which stage the cockpit is currently "on" — earlier ones are done. */
const ACTIVE_INDEX = 2; // Edit

const METRICS = [
  { icon: Coins, label: 'Est. cost', value: '$4.80', signal: 'var(--tm-amber)' },
  { icon: Activity, label: 'Token load', value: '96K', signal: 'var(--tm-mint)' },
  { icon: ShieldCheck, label: 'Risk', value: 'Low', signal: 'var(--tm-green)' },
] as const;

/**
 * Agent Cockpit — the hero's instrument panel. Decorative (aria-hidden): three
 * telemetry readouts, the six-stage pipeline with a shimmering active stage,
 * and the ambient attention card.
 */
export function CockpitPanel({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div
      className={tmCn(
        'tm-glass-strong relative overflow-hidden rounded-[var(--tm-radius-xl)] p-5 sm:p-7',
        className,
      )}
      aria-hidden
    >
      {/* Ambient accent fragments — kept faint so the panel reads calm, not neon. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-12 -top-14 h-40 w-40 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--tm-cyan)_20%,transparent),transparent_70%)] blur-3xl" />
        <div className="absolute -bottom-16 left-6 h-44 w-44 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--tm-mint)_16%,transparent),transparent_70%)] blur-3xl" />
      </div>

      {/* Window chrome + run label */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--tm-red)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--tm-amber)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--tm-green)]" />
        </div>
        <span className="inline-flex items-center gap-2 rounded-[var(--tm-radius-pill)] border border-[var(--tm-border)] px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[var(--tm-mint)]">
          <span className="relative flex h-1.5 w-1.5">
            {!reduced && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--tm-mint)] opacity-60" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--tm-mint)]" />
          </span>
          Agent running
        </span>
      </div>

      {/* Telemetry readouts */}
      <div className="relative mt-6 grid grid-cols-3 gap-3">
        {METRICS.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="rounded-[var(--tm-radius-md)] border border-[var(--tm-hairline)] bg-[var(--tm-surface-muted)] p-3.5"
            >
              <div className="flex items-center gap-1.5 text-[0.625rem] font-medium uppercase tracking-[0.12em] text-[var(--tm-slate-dim)]">
                <Icon className="h-3.5 w-3.5" style={{ color: m.signal }} strokeWidth={1.75} />
                {m.label}
              </div>
              <p
                className="mt-2 font-mono text-2xl font-semibold tabular-nums tracking-tight"
                style={{ color: m.signal }}
              >
                {m.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Pipeline */}
      <div className="relative mt-6">
        <div className="mb-3 flex items-center justify-between text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[var(--tm-slate-dim)]">
          <span>Pipeline</span>
          <span>3 / 6</span>
        </div>
        <ol className="space-y-2" role="list">
          {TELLUMETRY_STAGES.map((stage, i) => {
            const state = i < ACTIVE_INDEX ? 'done' : i === ACTIVE_INDEX ? 'active' : 'pending';
            return (
              <li key={stage.id} className="flex items-center gap-3">
                <span
                  className={tmCn(
                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[0.625rem]',
                    state === 'done'
                      ? 'border-[var(--tm-green)] text-[var(--tm-green)]'
                      : state === 'active'
                        ? 'border-[var(--tm-mint)] text-[var(--tm-mint)]'
                        : 'border-[var(--tm-hairline)] text-[var(--tm-slate-dim)]',
                  )}
                >
                  {state === 'done' ? (
                    <Check className="h-3 w-3" />
                  ) : state === 'active' ? (
                    <Loader2 className={tmCn('h-3 w-3', !reduced && 'animate-spin')} />
                  ) : (
                    <span className="h-1 w-1 rounded-full bg-[var(--tm-slate-dim)]" />
                  )}
                </span>
                <span
                  className={tmCn(
                    'w-20 shrink-0 text-[0.8125rem] font-medium',
                    state === 'pending' ? 'text-[var(--tm-slate-dim)]' : 'text-[var(--tm-ivory-soft)]',
                  )}
                >
                  {stage.label}
                </span>
                <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--tm-surface-muted)]">
                  <span
                    className={tmCn(
                      'absolute inset-y-0 left-0 rounded-full',
                      state === 'done' && 'w-full bg-[var(--tm-green)] opacity-70',
                      state === 'active' && 'w-1/2 bg-[var(--tm-mint)]',
                      state === 'pending' && 'w-0',
                    )}
                  />
                  {state === 'active' && !reduced && (
                    <span className="tm-shimmer absolute inset-0 rounded-full" />
                  )}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Attention card */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: TM_EASE_OUT, delay: 0.3 }}
        className="relative mt-6 flex items-start gap-3 rounded-[var(--tm-radius-md)] border border-[color-mix(in_srgb,var(--tm-mint)_30%,transparent)] bg-[color-mix(in_srgb,var(--tm-mint)_8%,var(--tm-surface-muted))] p-4"
      >
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--tm-mint)_20%,transparent)] text-[var(--tm-mint)]">
          <BellRing className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <div>
          <p className="text-[0.9375rem] font-semibold text-[var(--tm-ivory)]">
            You can step away.
          </p>
          <p className="mt-0.5 text-[0.8125rem] leading-relaxed text-[var(--tm-slate)]">
            Next attention check in 8 min — we’ll ping you only if a decision is needed.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
