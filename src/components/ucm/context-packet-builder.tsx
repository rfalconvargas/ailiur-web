'use client';

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import { ArrowRight, Boxes, Check, Loader2, Lock, Package, Sparkles } from 'lucide-react';
import {
  DEPTH_LIMIT,
  retrieveContext,
  UCM_DEPTHS,
  UCM_EXAMPLE_QUERIES,
  UCM_PROJECTS,
  UCM_SOURCES,
  type RetrievalResult,
  type ScoredMemory,
  type UcmDepth,
  type UcmProjectKey,
  type UcmSource,
} from '@/lib/ucm/demo-data';
import { UCM_EASE_OUT, UCM_SIGNAL, ucmCn } from './utils';

type Status = 'idle' | 'loading' | 'ready';

const SOURCE_SIGNAL: Record<UcmSource, 'chatgpt' | 'claude' | 'gemini'> = {
  ChatGPT: 'chatgpt',
  Claude: 'claude',
  Gemini: 'gemini',
};

/**
 * Context Packet Builder — the interactive UCM demo.
 *
 * Fully client-side: it scores hardcoded mock memories against the chosen
 * project, sources, query, and retrieval depth, then renders the assembled
 * "context packet". No backend, no API, no vector DB — see lib/ucm/demo-data.
 */
export function ContextPacketBuilder() {
  const reduced = useReducedMotion();

  const [project, setProject] = useState<UcmProjectKey>('Qetos');
  const [sources, setSources] = useState<UcmSource[]>([...UCM_SOURCES]);
  const [query, setQuery] = useState(UCM_EXAMPLE_QUERIES[0]);
  const [depth, setDepth] = useState<UcmDepth>('Balanced');

  const [status, setStatus] = useState<Status>('idle');
  const [packet, setPacket] = useState<RetrievalResult | null>(null);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const canGenerate = sources.length > 0 && query.trim().length > 0;

  function toggleSource(source: UcmSource) {
    setSources((prev) =>
      prev.includes(source) ? prev.filter((s) => s !== source) : [...prev, source],
    );
  }

  function handleGenerate() {
    if (!canGenerate) return;
    const result = retrieveContext({ project, sources, query, depth });

    if (timer.current) clearTimeout(timer.current);
    setStatus('loading');
    setPacket(null);

    // Simulated retrieval latency (700–1200ms), collapsed under reduced motion.
    const delay = reduced ? 200 : 700 + Math.round(Math.random() * 500);
    timer.current = setTimeout(() => {
      setPacket(result);
      setStatus('ready');
    }, delay);
  }

  return (
    <div
      className="ucm-glass-strong relative overflow-hidden rounded-[var(--ucm-radius-xl)] border border-[var(--ucm-border-strong)] p-5 shadow-[var(--ucm-shadow-glow)] sm:p-7"
      data-ucm-slot="context-packet-builder"
    >
      {/* Gold accent rail — marks the demo as the page's centerpiece */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--ucm-gold)_70%,transparent),transparent)]"
        aria-hidden
      />
      <div className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-8">
        {/* ── Left: controls ─────────────────────────────────────── */}
        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate();
          }}
        >
          {/* Project */}
          <fieldset className="min-w-0">
            <legend className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--ucm-sand)]">
              Active Ailiur app
            </legend>
            <div className="mt-3 flex flex-wrap gap-1.5" role="radiogroup" aria-label="Active Ailiur app">
              {UCM_PROJECTS.map((p) => {
                const active = p === project;
                return (
                  <button
                    key={p}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setProject(p)}
                    className={ucmCn(
                      'rounded-[var(--ucm-radius-pill)] border px-3 py-1.5 text-[0.8125rem] font-medium transition-colors',
                      active
                        ? 'border-[color-mix(in_srgb,var(--ucm-gold)_55%,transparent)] bg-[color-mix(in_srgb,var(--ucm-gold)_16%,var(--ucm-surface-muted))] text-[var(--ucm-cream)]'
                        : 'border-[var(--ucm-border)] bg-[var(--ucm-surface-muted)] text-[var(--ucm-sand)] hover:border-[var(--ucm-border-strong)] hover:text-[var(--ucm-cream)]',
                    )}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </fieldset>

          {/* Sources */}
          <fieldset className="min-w-0">
            <legend className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--ucm-sand)]">
              AI exports
            </legend>
            <div className="mt-3 flex flex-wrap gap-1.5" role="group" aria-label="AI exports">
              {UCM_SOURCES.map((s) => {
                const active = sources.includes(s);
                const color = UCM_SIGNAL[SOURCE_SIGNAL[s]];
                return (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleSource(s)}
                    className={ucmCn(
                      'inline-flex items-center gap-1.5 rounded-[var(--ucm-radius-pill)] border px-3 py-1.5 text-[0.8125rem] font-medium transition-colors',
                      active
                        ? 'border-[var(--ucm-border-strong)] bg-[var(--ucm-surface)] text-[var(--ucm-cream)]'
                        : 'border-[var(--ucm-hairline)] bg-transparent text-[var(--ucm-sand-dim)] hover:text-[var(--ucm-sand)]',
                    )}
                  >
                    <span
                      className="h-2 w-2 rounded-full transition-opacity"
                      style={{ backgroundColor: color, opacity: active ? 1 : 0.35 }}
                      aria-hidden
                    />
                    {s}
                  </button>
                );
              })}
            </div>
            {sources.length === 0 && (
              <p className="mt-2 text-[0.75rem] text-[var(--ucm-red)]">Select at least one export.</p>
            )}
          </fieldset>

          {/* Query */}
          <div className="min-w-0">
            <label
              htmlFor="ucm-query"
              className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--ucm-sand)]"
            >
              Ask your past work
            </label>
            <textarea
              id="ucm-query"
              rows={2}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What should this app remember about my…"
              className={ucmCn(
                'mt-3 w-full resize-none rounded-[var(--ucm-radius-md)] border border-[var(--ucm-border-strong)] bg-[var(--ucm-surface-muted)]',
                'px-3.5 py-3 text-[0.9375rem] leading-relaxed text-[var(--ucm-cream)] outline-none',
                'placeholder:text-[var(--ucm-sand-dim)]',
                'focus:border-[var(--ucm-gold)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--ucm-gold)_25%,transparent)]',
              )}
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {UCM_EXAMPLE_QUERIES.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => setQuery(q)}
                  className={ucmCn(
                    'rounded-[var(--ucm-radius-pill)] border border-[var(--ucm-hairline)] bg-[var(--ucm-surface-muted)] px-2.5 py-1',
                    'text-left text-[0.6875rem] leading-snug text-[var(--ucm-sand)] transition-colors',
                    'hover:border-[var(--ucm-border)] hover:text-[var(--ucm-cream-soft)]',
                    query === q && 'border-[color-mix(in_srgb,var(--ucm-gold)_45%,transparent)] text-[var(--ucm-cream-soft)]',
                  )}
                >
                  {q.length > 34 ? `${q.slice(0, 32)}…` : q}
                </button>
              ))}
            </div>
          </div>

          {/* Depth */}
          <fieldset className="min-w-0">
            <legend className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--ucm-sand)]">
              Retrieval depth
            </legend>
            <div
              className="mt-3 grid grid-cols-3 gap-1 rounded-[var(--ucm-radius-pill)] border border-[var(--ucm-border)] bg-[var(--ucm-surface-muted)] p-1"
              role="radiogroup"
              aria-label="Retrieval depth"
            >
              {UCM_DEPTHS.map((d) => {
                const active = d === depth;
                return (
                  <button
                    key={d}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setDepth(d)}
                    className={ucmCn(
                      'rounded-[var(--ucm-radius-pill)] px-2 py-1.5 text-[0.8125rem] font-medium transition-colors',
                      active
                        ? 'bg-[var(--ucm-cream)] text-[var(--ucm-ink)]'
                        : 'text-[var(--ucm-sand)] hover:text-[var(--ucm-cream)]',
                    )}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-[0.75rem] text-[var(--ucm-sand-dim)]">
              Returns up to {DEPTH_LIMIT[depth]} memories.
            </p>
          </fieldset>

          <button
            type="submit"
            disabled={!canGenerate || status === 'loading'}
            className={ucmCn(
              'group inline-flex items-center justify-center gap-2 rounded-[var(--ucm-radius-pill)]',
              'bg-[var(--ucm-cream)] px-6 py-3 text-sm font-semibold text-[var(--ucm-ink)]',
              'transition-transform hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--ucm-gold)]',
            )}
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                Building packet…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" aria-hidden />
                Generate Context Packet
              </>
            )}
          </button>
        </form>

        {/* ── Right: pipeline + packet ───────────────────────────── */}
        <div className="flex min-w-0 flex-col gap-5">
          <Pipeline sources={sources} status={status} reduced={!!reduced} />

          <div className="min-w-0 flex-1">
            <AnimatePresence mode="wait">
              {status === 'idle' && <EmptyState key="empty" />}
              {status === 'loading' && <LoadingState key="loading" reduced={!!reduced} />}
              {status === 'ready' && packet && (
                <ReadyState key="ready" packet={packet} project={project} reduced={!!reduced} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Privacy disclaimer — always visible */}
      <p className="mt-6 flex items-center gap-2 border-t border-[var(--ucm-hairline)] pt-4 text-[0.75rem] leading-relaxed text-[var(--ucm-sand-dim)]">
        <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden />
        This demo uses mock data. Real imports would require user-authorized exports.
      </p>
    </div>
  );
}

/* ── Pipeline ───────────────────────────────────────────────────────────────── */

function Pipeline({
  sources,
  status,
  reduced,
}: {
  sources: UcmSource[];
  status: Status;
  reduced: boolean;
}) {
  const active = status === 'loading';

  return (
    <div className="rounded-[var(--ucm-radius-lg)] border border-[var(--ucm-hairline)] bg-[var(--ucm-surface-muted)] p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[var(--ucm-sand-dim)]">
          Retrieval pipeline
        </span>
        <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[var(--ucm-sand-dim)]">
          Local · mock data
        </span>
      </div>

      <div className="mt-4 grid grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-2 sm:gap-3">
        {/* Source nodes */}
        <div className="flex flex-col gap-1.5">
          {UCM_SOURCES.map((s) => {
            const on = sources.includes(s);
            const color = UCM_SIGNAL[SOURCE_SIGNAL[s]];
            return (
              <div
                key={s}
                className={ucmCn(
                  'flex items-center gap-1.5 rounded-[var(--ucm-radius-pill)] border px-2 py-1 transition-opacity',
                  on ? 'border-[var(--ucm-border)] bg-[var(--ucm-surface)]' : 'border-[var(--ucm-hairline)] opacity-40',
                )}
              >
                <motion.span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: color }}
                  animate={
                    active && on && !reduced
                      ? { opacity: [0.4, 1, 0.4], scale: [1, 1.35, 1] }
                      : { opacity: on ? 1 : 0.4, scale: 1 }
                  }
                  transition={{ duration: 1, repeat: active && on ? Infinity : 0, ease: 'easeInOut' }}
                  aria-hidden
                />
                <span className="text-[0.625rem] font-medium text-[var(--ucm-cream-soft)]">{s}</span>
              </div>
            );
          })}
        </div>

        <Connector active={active} reduced={reduced} />

        {/* Central matrix */}
        <motion.div
          className="flex flex-col items-center gap-1 rounded-[var(--ucm-radius-md)] border border-[color-mix(in_srgb,var(--ucm-gold)_35%,var(--ucm-border))] bg-[color-mix(in_srgb,var(--ucm-gold)_8%,var(--ucm-surface))] px-2.5 py-2.5 text-center"
          animate={active && !reduced ? { scale: [1, 1.04, 1] } : { scale: 1 }}
          transition={{ duration: 1, repeat: active ? Infinity : 0, ease: 'easeInOut' }}
        >
          <Boxes className="h-4 w-4 text-[var(--ucm-gold)]" aria-hidden />
          <span className="text-[0.5625rem] font-semibold uppercase leading-tight tracking-[0.08em] text-[var(--ucm-gold)]">
            Local Vector
            <br />
            Matrix
          </span>
        </motion.div>

        <Connector active={active} reduced={reduced} />

        {/* Packet node */}
        <div className="flex flex-col items-center gap-1 rounded-[var(--ucm-radius-md)] border border-[var(--ucm-border)] bg-[var(--ucm-surface)] px-2.5 py-2.5 text-center">
          <Package className="h-4 w-4 text-[var(--ucm-cream)]" aria-hidden />
          <span className="text-[0.5625rem] font-semibold uppercase leading-tight tracking-[0.08em] text-[var(--ucm-sand)]">
            Context
            <br />
            Packet
          </span>
        </div>
      </div>
    </div>
  );
}

function Connector({ active, reduced }: { active: boolean; reduced: boolean }) {
  return (
    <div className="relative h-px w-full overflow-hidden bg-[var(--ucm-border)]" aria-hidden>
      {active && !reduced && (
        <motion.span
          className="absolute inset-y-0 w-1/2 bg-[linear-gradient(90deg,transparent,var(--ucm-gold),transparent)]"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </div>
  );
}

/* ── States ─────────────────────────────────────────────────────────────────── */

function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex h-full min-h-[14rem] flex-col items-center justify-center rounded-[var(--ucm-radius-lg)] border border-dashed border-[var(--ucm-border)] bg-[var(--ucm-surface-muted)] p-8 text-center"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--ucm-hairline)] bg-[var(--ucm-surface)] text-[var(--ucm-gold)]">
        <Sparkles className="h-5 w-5" aria-hidden />
      </span>
      <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-[var(--ucm-sand)]">
        Choose a project and ask what your next app should remember.
      </p>
    </motion.div>
  );
}

const LOADING_STAGES = [
  'Reading selected exports',
  'Stripping noise & boilerplate',
  'Matching the local vector matrix',
  'Assembling the context packet',
] as const;

function LoadingState({ reduced }: { reduced: boolean }) {
  const [stage, setStage] = useState(reduced ? LOADING_STAGES.length - 1 : 0);

  useEffect(() => {
    if (reduced) return;
    // Advance through the stages so the wait reads as deliberate work, not a spinner.
    const id = setInterval(() => {
      setStage((s) => Math.min(s + 1, LOADING_STAGES.length - 1));
    }, 240);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="rounded-[var(--ucm-radius-lg)] border border-[var(--ucm-hairline)] bg-[var(--ucm-surface-muted)] p-5"
      role="status"
      aria-live="polite"
    >
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--ucm-gold)]">
        Building packet
      </p>
      <ol className="mt-4 space-y-2.5" role="list">
        {LOADING_STAGES.map((label, i) => {
          const done = i < stage;
          const current = i === stage;
          return (
            <li key={label} className="flex items-center gap-2.5 text-[0.8125rem]">
              <span
                className={ucmCn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
                  done
                    ? 'border-[var(--ucm-green)] bg-[color-mix(in_srgb,var(--ucm-green)_18%,transparent)] text-[var(--ucm-green)]'
                    : current
                      ? 'border-[var(--ucm-gold)] text-[var(--ucm-gold)]'
                      : 'border-[var(--ucm-hairline)] text-[var(--ucm-sand-dim)]',
                )}
                aria-hidden
              >
                {done ? (
                  <Check className="h-3 w-3" />
                ) : current ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <span className="h-1 w-1 rounded-full bg-current" />
                )}
              </span>
              <span
                className={ucmCn(
                  'transition-colors',
                  done
                    ? 'text-[var(--ucm-sand)]'
                    : current
                      ? 'text-[var(--ucm-cream)]'
                      : 'text-[var(--ucm-sand-dim)]',
                )}
              >
                {label}
                {current ? '…' : ''}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Progress rail */}
      <div className="mt-4 h-1 w-full overflow-hidden rounded-[var(--ucm-radius-pill)] bg-[var(--ucm-hairline)]" aria-hidden>
        <motion.div
          className="h-full rounded-[var(--ucm-radius-pill)] bg-[var(--ucm-gold)]"
          initial={{ width: '8%' }}
          animate={{ width: `${((stage + 1) / LOADING_STAGES.length) * 100}%` }}
          transition={{ duration: 0.3, ease: UCM_EASE_OUT }}
        />
      </div>
    </motion.div>
  );
}

function ReadyState({
  packet,
  project,
  reduced,
}: {
  packet: RetrievalResult;
  project: UcmProjectKey;
  reduced: boolean;
}) {
  const { results, usedFallback, sourcesUsed } = packet;

  const listVariants: Variants = {
    show: { transition: { staggerChildren: reduced ? 0 : 0.06 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Success header */}
      <div className="flex items-start gap-3 rounded-[var(--ucm-radius-lg)] border border-[color-mix(in_srgb,var(--ucm-green)_30%,var(--ucm-border))] bg-[color-mix(in_srgb,var(--ucm-green)_8%,var(--ucm-surface-muted))] p-4">
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--ucm-green)] text-[var(--ucm-ink)]">
          <Check className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="font-display text-lg font-bold tracking-tight text-[var(--ucm-cream)]">
            Context Packet Ready
          </p>
          <p className="mt-1 text-[0.875rem] leading-relaxed text-[var(--ucm-sand)]">
            UCM found relevant context across selected AI exports and prepared it for the active
            Ailiur app.
          </p>
        </div>
      </div>

      {/* Meta line */}
      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.75rem] text-[var(--ucm-sand-dim)]">
        <span className="font-medium text-[var(--ucm-gold)]">{results.length} memories</span>
        <span aria-hidden>·</span>
        <span>
          {sourcesUsed.length} {sourcesUsed.length === 1 ? 'source' : 'sources'}
        </span>
        <span aria-hidden>·</span>
        <span>
          for <span className="text-[var(--ucm-cream-soft)]">{project}</span>
        </span>
        {usedFallback && (
          <>
            <span aria-hidden>·</span>
            <span className="text-[var(--ucm-amber)]">no exact match — showing strongest global context</span>
          </>
        )}
      </div>

      {/* Result cards */}
      <motion.ul
        className="mt-4 grid gap-3 sm:grid-cols-2"
        variants={listVariants}
        initial="hidden"
        animate="show"
        role="list"
      >
        {results.map((m) => (
          <MemoryCard key={m.id} memory={m} reduced={reduced} />
        ))}
      </motion.ul>

      {/* Context packet footer — prepared for the active app */}
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-[var(--ucm-radius-lg)] border border-[color-mix(in_srgb,var(--ucm-gold)_30%,var(--ucm-border))] bg-[color-mix(in_srgb,var(--ucm-gold)_7%,var(--ucm-surface-muted))] px-4 py-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--ucm-radius-sm)] border border-[color-mix(in_srgb,var(--ucm-gold)_35%,transparent)] text-[var(--ucm-gold)]">
          <Package className="h-4 w-4" aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block text-[0.8125rem] font-semibold text-[var(--ucm-cream)]">
            Prepared for {project === 'Custom' ? 'your custom app' : project}
          </span>
          <span className="block text-[0.75rem] text-[var(--ucm-sand)]">
            {results.length} {results.length === 1 ? 'memory' : 'memories'} packed · ready to hand off
          </span>
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-[var(--ucm-radius-pill)] border border-[var(--ucm-border)] bg-[var(--ucm-surface)] px-2.5 py-1 text-[0.6875rem] font-medium text-[var(--ucm-cream-soft)]">
          Context packet
          <ArrowRight className="h-3.5 w-3.5 text-[var(--ucm-gold)]" aria-hidden />
        </span>
      </div>
    </motion.div>
  );
}

function MemoryCard({ memory, reduced }: { memory: ScoredMemory; reduced: boolean }) {
  const color = UCM_SIGNAL[SOURCE_SIGNAL[memory.source]];
  const itemVariants: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: UCM_EASE_OUT } },
  };

  return (
    <motion.li
      variants={itemVariants}
      className="flex flex-col rounded-[var(--ucm-radius-lg)] border border-[var(--ucm-border)] bg-[var(--ucm-glass-bg)] p-4"
    >
      {/* Header: source · pillar · confidence */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
        <span className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold text-[var(--ucm-cream)]">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} aria-hidden />
          {memory.source}
        </span>
        <span className="rounded-[var(--ucm-radius-pill)] border border-[var(--ucm-hairline)] bg-[var(--ucm-surface-muted)] px-2 py-0.5 text-[0.625rem] font-medium uppercase tracking-[0.08em] text-[var(--ucm-gold)]">
          {memory.pillar}
        </span>
        <span className="ml-auto text-[0.6875rem] font-medium text-[var(--ucm-sand)]">
          {Math.round(memory.confidence * 100)}% confidence
        </span>
      </div>

      {/* Summary */}
      <p className="mt-2.5 text-[0.875rem] leading-relaxed text-[var(--ucm-cream-soft)]">
        {memory.summary}
      </p>

      {/* Why matched */}
      <div className="mt-3 border-t border-[var(--ucm-hairline)] pt-3">
        <p className="text-[0.75rem] leading-relaxed text-[var(--ucm-sand)]">
          <span className="font-semibold text-[var(--ucm-sand-dim)]">Why matched · </span>
          {memory.whyMatched}
        </p>
        {memory.matchedTerms.length > 0 && (
          <ul className="mt-2 flex flex-wrap gap-1" role="list">
            {memory.matchedTerms.slice(0, 4).map((term) => (
              <li
                key={term}
                className="rounded-[var(--ucm-radius-pill)] border border-[color-mix(in_srgb,var(--ucm-gold)_30%,transparent)] bg-[color-mix(in_srgb,var(--ucm-gold)_10%,transparent)] px-2 py-0.5 text-[0.625rem] font-medium text-[var(--ucm-gold)]"
              >
                {term}
              </li>
            ))}
          </ul>
        )}
      </div>

      <span className="mt-3 text-[0.625rem] font-medium uppercase tracking-[0.1em] text-[var(--ucm-sand-dim)]">
        {memory.project}
      </span>
    </motion.li>
  );
}
