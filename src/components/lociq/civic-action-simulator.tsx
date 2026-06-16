'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  MapPin,
  Landmark,
  Sparkles,
  Loader2,
  Check,
  ArrowRight,
  ArrowLeft,
  Users,
  Flag,
  UserCheck,
  Coins,
  Gauge,
  Mountain,
  Copy,
  RotateCcw,
  type LucideIcon,
} from 'lucide-react';
import {
  PRESET_ISSUES,
  DEMO_NEIGHBORHOODS,
  buildPlan,
  resolveSupport,
  type CivicPlan,
  type DemoNeighborhood,
  type Solution,
  type Tier,
  type Difficulty,
} from '@/lib/lociq/simulator-data';
import { ConsensusRing } from './consensus-ring';
import { LQ_EASE_OUT, lqCn } from './utils';

/* ────────────────────────────────────────────────────────────────────────────
 * Civic Action Simulator — the Lociq landing-page demo.
 *
 * Flow: pick an issue (preset or custom) + a demo neighborhood → "Generate
 * civic path" → a short stepped loading animation → a deterministic mock civic
 * action plan (category, explanation, responsible body, three fixes, support &
 * consensus) → pick a fix → "Create action card" → a polished, shareable card.
 *
 * Mock data only — see lib/lociq/simulator-data.ts. No backend, API, AI, auth,
 * or map. Numbers are illustrative.
 * ──────────────────────────────────────────────────────────────────────────── */

type Stage = 'empty' | 'loading' | 'plan' | 'card';

const LOADING_STEPS = [
  'Reading issue…',
  'Mapping responsible civic path…',
  'Estimating practical fixes…',
  'Tallying neighbor support…',
] as const;

/* Tier / difficulty → civic-palette accent. Kept non-alarming and on-brand. */
const COST_COLOR: Record<Tier, string> = {
  Low: 'var(--lq-green)',
  Medium: 'var(--lq-gold)',
  High: 'var(--lq-charcoal)',
};
const IMPACT_COLOR: Record<Tier, string> = {
  Low: 'var(--lq-slate-dim)',
  Medium: 'var(--lq-gold)',
  High: 'var(--lq-green)',
};
const DIFFICULTY_COLOR: Record<Difficulty, string> = {
  Easy: 'var(--lq-green)',
  Moderate: 'var(--lq-gold)',
  Hard: 'var(--lq-blue)',
};

export function CivicActionSimulator() {
  const [presetIndex, setPresetIndex] = useState<number | null>(0);
  const [customText, setCustomText] = useState('');
  const [neighborhood, setNeighborhood] = useState<DemoNeighborhood>('Santurce');

  const [stage, setStage] = useState<Stage>('empty');
  const [loadingStep, setLoadingStep] = useState(0);

  // Captured at generate time so editing controls mid-run doesn't mutate output.
  const [plan, setPlan] = useState<CivicPlan | null>(null);
  const [planIssue, setPlanIssue] = useState('');
  const [planNeighborhood, setPlanNeighborhood] = useState<DemoNeighborhood>('Santurce');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [delegate, setDelegate] = useState(false);
  const [copied, setCopied] = useState(false);

  const reduced = useReducedMotion();

  const effectiveIssue = presetIndex !== null ? PRESET_ISSUES[presetIndex] : customText.trim();
  const canGenerate = effectiveIssue.length > 0;

  const support = useMemo(() => {
    if (!plan || !selectedId) return null;
    return resolveSupport(plan, planNeighborhood, selectedId);
  }, [plan, planNeighborhood, selectedId]);

  const selectedSolution = plan?.solutions.find((s) => s.id === selectedId) ?? null;

  // Stepped loading → resolves to the plan. Cleans up on unmount / restart.
  useEffect(() => {
    if (stage !== 'loading') return;
    const stepMs = reduced ? 160 : 620;
    const timers = LOADING_STEPS.map((_, i) => setTimeout(() => setLoadingStep(i), i * stepMs));
    const done = setTimeout(() => setStage('plan'), LOADING_STEPS.length * stepMs + 280);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [stage, reduced]);

  function generate() {
    if (!canGenerate) return;
    const built = buildPlan(effectiveIssue);
    setPlan(built);
    setPlanIssue(effectiveIssue);
    setPlanNeighborhood(neighborhood);
    // Pre-select the most-backed fix so the plan reads as alive.
    const leading = [...built.solutions].sort((a, b) => b.share - a.share)[0];
    setSelectedId(leading.id);
    setDelegate(false);
    setCopied(false);
    setLoadingStep(0);
    setStage('loading');
  }

  function createCard() {
    if (selectedId) setStage('card');
  }

  function startOver() {
    setStage('empty');
    setPlan(null);
    setSelectedId(null);
    setDelegate(false);
    setCopied(false);
  }

  async function copySummary() {
    if (!plan || !selectedSolution || !support) return;
    const text = [
      `Lociq civic action — ${planNeighborhood}`,
      `Issue: ${planIssue}`,
      `Category: ${plan.category}`,
      `Responsible: ${plan.responsibleBody}`,
      `Chosen fix: ${selectedSolution.title} (cost ${selectedSolution.cost}, impact ${selectedSolution.impact}, difficulty ${selectedSolution.difficulty})`,
      `Support: ${support.backers} neighbors · ${support.consensus}% consensus`,
      `Next action: ${plan.nextAction}`,
      delegate ? 'Delegated to a trusted neighbor.' : '',
      'From complaint to coordinated action · lociq.ailiur.com',
    ]
      .filter(Boolean)
      .join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard may be unavailable (e.g. insecure context) — log as a fallback.
      console.log('[Lociq action card]\n' + text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-8">
      {/* ── Controls ─────────────────────────────────────────────────────── */}
      <form
        className="lq-glass rounded-[var(--lq-radius-xl)] p-5 sm:p-7"
        onSubmit={(e) => {
          e.preventDefault();
          generate();
        }}
      >
        <div className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--lq-green-deep)]">
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          Report an issue
        </div>

        {/* Issue presets */}
        <Field label="Pick an issue your neighborhood keeps ignoring">
          <div className="grid gap-2" role="radiogroup" aria-label="Neighborhood issue">
            {PRESET_ISSUES.map((issue, i) => (
              <Chip
                key={issue}
                active={presetIndex === i}
                onClick={() => {
                  setPresetIndex(i);
                  setCustomText('');
                }}
              >
                {issue}
              </Chip>
            ))}
          </div>
        </Field>

        {/* Custom issue */}
        <Field label="…or describe your own">
          <textarea
            value={customText}
            onChange={(e) => {
              setCustomText(e.target.value);
              setPresetIndex(e.target.value.trim() ? null : 0);
            }}
            rows={2}
            placeholder="e.g. The corner floods every time it rains"
            className={lqCn(
              'w-full resize-y rounded-[var(--lq-radius-md)] border border-[var(--lq-border-strong)] bg-[var(--lq-paper-raised)]',
              'px-4 py-3 text-[0.9375rem] leading-relaxed text-[var(--lq-ink)] outline-none',
              'placeholder:text-[var(--lq-slate-dim)]',
              'focus:border-[var(--lq-green)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--lq-green)_25%,transparent)]',
            )}
          />
        </Field>

        {/* Neighborhood */}
        <Field label="Demo neighborhood">
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Demo neighborhood">
            {DEMO_NEIGHBORHOODS.map((n) => (
              <NeighborhoodChip key={n} active={neighborhood === n} onClick={() => setNeighborhood(n)}>
                {n}
              </NeighborhoodChip>
            ))}
          </div>
        </Field>

        <button
          type="submit"
          disabled={!canGenerate || stage === 'loading'}
          className={lqCn(
            'group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-[var(--lq-radius-pill)]',
            'bg-[var(--lq-green)] px-6 py-3.5 text-sm font-semibold text-white',
            'transition-[transform,background-color] hover:-translate-y-px hover:bg-[var(--lq-green-deep)]',
            'disabled:cursor-not-allowed disabled:opacity-60',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--lq-green)]',
          )}
        >
          {stage === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Generating…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" aria-hidden />
              {stage === 'empty' ? 'Generate civic path' : 'Regenerate'}
            </>
          )}
        </button>
        <p className="mt-3 text-center text-[0.6875rem] text-[var(--lq-slate-dim)]">
          Mock simulation with sample data — nothing is reported or sent anywhere.
        </p>
      </form>

      {/* ── Output ───────────────────────────────────────────────────────── */}
      <div className="lq-glass-strong relative min-h-[34rem] overflow-hidden rounded-[var(--lq-radius-xl)] p-5 sm:p-7">
        <AnimatePresence mode="wait">
          {stage === 'empty' && <EmptyState key="empty" reduced={!!reduced} />}

          {stage === 'loading' && <LoadingState key="loading" step={loadingStep} reduced={!!reduced} />}

          {stage === 'plan' && plan && (
            <PlanState
              key="plan"
              plan={plan}
              issue={planIssue}
              neighborhood={planNeighborhood}
              selectedId={selectedId}
              onSelect={setSelectedId}
              delegate={delegate}
              onToggleDelegate={() => setDelegate((v) => !v)}
              support={support}
              onCreateCard={createCard}
              reduced={!!reduced}
            />
          )}

          {stage === 'card' && plan && selectedSolution && support && (
            <CardState
              key="card"
              plan={plan}
              issue={planIssue}
              neighborhood={planNeighborhood}
              solution={selectedSolution}
              support={support}
              delegate={delegate}
              copied={copied}
              onCopy={copySummary}
              onEdit={() => setStage('plan')}
              onRestart={startOver}
              reduced={!!reduced}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── Empty state ──────────────────────────────────────────────────────────── */

function EmptyState({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      className="flex h-full min-h-[30rem] flex-col items-center justify-center text-center"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-[var(--lq-radius-lg)] border border-[var(--lq-hairline)] bg-[var(--lq-surface-muted)] text-[var(--lq-green)]">
        <Flag className="h-6 w-6" strokeWidth={1.5} aria-hidden />
      </span>
      <p className="mt-5 max-w-sm font-display text-xl font-bold leading-snug text-[var(--lq-ink)]">
        Start with one problem your neighborhood keeps ignoring.
      </p>
      <p className="mt-2 max-w-xs text-[0.875rem] leading-relaxed text-[var(--lq-slate)]">
        Pick an issue and a neighborhood, then generate the civic path — who decides, what to do, and
        how neighbors agree on it.
      </p>
      <span className="mt-6 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-[var(--lq-green-deep)]">
        Start on the left
        <ArrowRight className="h-4 w-4" aria-hidden />
      </span>
    </motion.div>
  );
}

/* ── Loading state ────────────────────────────────────────────────────────── */

function LoadingState({ step, reduced }: { step: number; reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      className="flex h-full min-h-[30rem] flex-col justify-center"
    >
      <div className="mx-auto w-full max-w-sm">
        <div className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--lq-green-deep)]">
          <Loader2 className={lqCn('h-3.5 w-3.5', !reduced && 'animate-spin')} aria-hidden />
          Generating civic path
        </div>
        <ol className="mt-6 space-y-3" role="list" aria-live="polite">
          {LOADING_STEPS.map((label, i) => {
            const state = i < step ? 'done' : i === step ? 'active' : 'pending';
            return (
              <li
                key={label}
                className={lqCn(
                  'flex items-center gap-3 rounded-[var(--lq-radius-md)] border px-4 py-3 transition-colors duration-300',
                  state === 'pending'
                    ? 'border-[var(--lq-hairline)] bg-transparent'
                    : 'border-[var(--lq-border)] bg-[var(--lq-surface-muted)]',
                )}
              >
                <span
                  className={lqCn(
                    'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border',
                    state === 'done'
                      ? 'border-[var(--lq-green)] bg-[color-mix(in_srgb,var(--lq-green)_12%,transparent)] text-[var(--lq-green)]'
                      : state === 'active'
                        ? 'border-[var(--lq-gold)] text-[var(--lq-gold)]'
                        : 'border-[var(--lq-hairline)] text-[var(--lq-slate-dim)]',
                  )}
                >
                  {state === 'done' ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : state === 'active' ? (
                    <Loader2 className={lqCn('h-3.5 w-3.5', !reduced && 'animate-spin')} />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--lq-slate-dim)]" />
                  )}
                </span>
                <span
                  className={lqCn(
                    'text-[0.9375rem] font-medium',
                    state === 'pending' ? 'text-[var(--lq-slate-dim)]' : 'text-[var(--lq-charcoal)]',
                  )}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </motion.div>
  );
}

/* ── Plan state ───────────────────────────────────────────────────────────── */

type SupportInfo = ReturnType<typeof resolveSupport> | null;

function PlanState({
  plan,
  issue,
  neighborhood,
  selectedId,
  onSelect,
  delegate,
  onToggleDelegate,
  support,
  onCreateCard,
  reduced,
}: {
  plan: CivicPlan;
  issue: string;
  neighborhood: DemoNeighborhood;
  selectedId: string | null;
  onSelect: (id: string) => void;
  delegate: boolean;
  onToggleDelegate: () => void;
  support: SupportInfo;
  onCreateCard: () => void;
  reduced: boolean;
}) {
  // Sequenced reveal for the generated blocks.
  const reveal = (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, ease: LQ_EASE_OUT, delay: reduced ? 0 : 0.06 * i },
  });

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      className="space-y-6"
    >
      {/* Header: category + neighborhood + explanation + responsible body */}
      <motion.div {...reveal(0)}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-[var(--lq-radius-pill)] border border-[color-mix(in_srgb,var(--lq-green)_35%,transparent)] bg-[color-mix(in_srgb,var(--lq-green)_10%,transparent)] px-3 py-1 text-[0.75rem] font-semibold text-[var(--lq-green-deep)]">
            {plan.category}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-[var(--lq-slate)]">
            <MapPin className="h-3.5 w-3.5 text-[var(--lq-blue)]" strokeWidth={1.75} aria-hidden />
            {neighborhood}
          </span>
        </div>
        <h3 className="mt-3 font-display text-xl font-extrabold leading-snug tracking-tight text-[var(--lq-ink)]">
          {issue}
        </h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--lq-slate)]">{plan.explanation}</p>
        <div className="mt-3 flex items-start gap-2 rounded-[var(--lq-radius-md)] border border-[var(--lq-hairline)] bg-[var(--lq-surface-muted)] px-4 py-3">
          <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-[var(--lq-blue)]" strokeWidth={1.75} aria-hidden />
          <p className="text-[0.875rem] leading-relaxed text-[var(--lq-charcoal)]">
            <span className="font-semibold text-[var(--lq-ink)]">Likely responsible: </span>
            {plan.responsibleBody}
          </p>
        </div>
      </motion.div>

      {/* Solution cards */}
      <motion.div {...reveal(1)}>
        <p className="mb-3 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-[var(--lq-slate-dim)]">
          Choose a fix to back
        </p>
        <div
          className="grid gap-3 sm:grid-cols-3"
          role="radiogroup"
          aria-label="Proposed fixes"
        >
          {plan.solutions.map((sol) => (
            <SolutionCard
              key={sol.id}
              solution={sol}
              active={selectedId === sol.id}
              onClick={() => onSelect(sol.id)}
            />
          ))}
        </div>
      </motion.div>

      {/* Support + consensus visualization */}
      <motion.div {...reveal(2)}>
        <div className="grid items-center gap-5 rounded-[var(--lq-radius-lg)] border border-[var(--lq-hairline)] bg-[var(--lq-surface-muted)] p-5 sm:grid-cols-[auto_1fr]">
          <div className="mx-auto sm:mx-0">
            <ConsensusRing
              percent={support?.consensus ?? 0}
              size={132}
              label="consensus"
              sublabel={support ? `${support.backers} of ${support.pool}` : undefined}
            />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-[var(--lq-slate-dim)]">
              <Users className="h-3.5 w-3.5 text-[var(--lq-green)]" strokeWidth={1.75} aria-hidden />
              Community support
            </div>
            <p className="mt-1 font-display text-3xl font-extrabold leading-none tracking-tight text-[var(--lq-ink)]">
              {support?.backers ?? 0}
              <span className="ml-1 align-baseline text-sm font-semibold text-[var(--lq-slate)]">neighbors</span>
            </p>
            {/* Per-solution distribution bars */}
            <ul className="mt-4 space-y-2" role="list">
              {plan.solutions.map((sol) => (
                <li key={sol.id} className="flex items-center gap-2">
                  <span
                    className={lqCn(
                      'w-24 shrink-0 truncate text-[0.6875rem]',
                      selectedId === sol.id ? 'font-semibold text-[var(--lq-ink)]' : 'text-[var(--lq-slate)]',
                    )}
                  >
                    {sol.title}
                  </span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[color-mix(in_srgb,var(--lq-ink)_8%,transparent)]">
                    <motion.span
                      className="block h-full rounded-full"
                      style={{
                        background:
                          selectedId === sol.id ? 'var(--lq-green)' : 'color-mix(in srgb, var(--lq-slate) 55%, transparent)',
                      }}
                      initial={reduced ? false : { width: 0 }}
                      animate={{ width: `${Math.round(sol.share * 100)}%` }}
                      transition={{ duration: reduced ? 0 : 0.6, ease: LQ_EASE_OUT }}
                    />
                  </span>
                  <span className="w-9 shrink-0 text-right text-[0.6875rem] tabular-nums text-[var(--lq-slate)]">
                    {Math.round(sol.share * 100)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Suggested next action */}
      <motion.div {...reveal(3)}>
        <div className="flex items-start gap-3 rounded-[var(--lq-radius-md)] border border-[color-mix(in_srgb,var(--lq-gold)_35%,transparent)] bg-[color-mix(in_srgb,var(--lq-gold)_9%,var(--lq-surface-muted))] px-4 py-3.5">
          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--lq-gold)]" aria-hidden />
          <p className="text-[0.9375rem] leading-relaxed text-[var(--lq-charcoal)]">
            <span className="font-semibold text-[var(--lq-ink)]">Suggested next action: </span>
            {plan.nextAction}
          </p>
        </div>
      </motion.div>

      {/* Delegation toggle */}
      <motion.div {...reveal(4)}>
        <DelegateToggle on={delegate} onToggle={onToggleDelegate} />
      </motion.div>

      {/* Create action card */}
      <motion.div {...reveal(5)}>
        <button
          type="button"
          onClick={onCreateCard}
          disabled={!selectedId}
          className={lqCn(
            'group inline-flex w-full items-center justify-center gap-2 rounded-[var(--lq-radius-pill)]',
            'bg-[var(--lq-ink)] px-6 py-3.5 text-sm font-semibold text-[var(--lq-paper-raised)]',
            'transition-[transform,background-color] hover:-translate-y-px hover:bg-[var(--lq-charcoal)]',
            'disabled:cursor-not-allowed disabled:opacity-60',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--lq-green)]',
          )}
        >
          Create action card
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ── Success state: the shareable action card ─────────────────────────────── */

function CardState({
  plan,
  issue,
  neighborhood,
  solution,
  support,
  delegate,
  copied,
  onCopy,
  onEdit,
  onRestart,
  reduced,
}: {
  plan: CivicPlan;
  issue: string;
  neighborhood: DemoNeighborhood;
  solution: Solution;
  support: NonNullable<SupportInfo>;
  delegate: boolean;
  copied: boolean;
  onCopy: () => void;
  onEdit: () => void;
  onRestart: () => void;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      className="flex h-full flex-col"
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: LQ_EASE_OUT }}
        className="relative overflow-hidden rounded-[var(--lq-radius-lg)] border border-[var(--lq-border-strong)] bg-[var(--lq-paper-raised)] p-6 shadow-[var(--lq-shadow-md)] sm:p-7"
      >
        {/* Map-grid + accent wash */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          aria-hidden
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(26,30,36,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(26,30,36,0.05) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 90% 80% at 100% 0%, black, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 100% 0%, black, transparent 70%)',
          }}
        />
        <div
          className="pointer-events-none absolute -right-10 -top-12 h-36 w-36 rounded-full blur-2xl"
          aria-hidden
          style={{ background: 'radial-gradient(circle, color-mix(in srgb, var(--lq-green) 28%, transparent), transparent 70%)' }}
        />

        {/* Card header — wordmark + neighborhood */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1" aria-hidden>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lq-green)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lq-gold)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lq-blue)]" />
            </span>
            <span className="font-display text-base font-extrabold tracking-tight text-[var(--lq-ink)]">
              Lociq
            </span>
            <span className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-[var(--lq-slate-dim)]">
              Action card
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-[var(--lq-slate)]">
            <MapPin className="h-3.5 w-3.5 text-[var(--lq-blue)]" strokeWidth={1.75} aria-hidden />
            {neighborhood}
          </span>
        </div>

        {/* Issue + category */}
        <div className="relative mt-5">
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-[var(--lq-green-deep)]">
            {plan.category}
          </span>
          <h3 className="mt-1 font-display text-2xl font-extrabold leading-tight tracking-tight text-[var(--lq-ink)]">
            {issue}
          </h3>
        </div>

        {/* Chosen fix + metric chips */}
        <div className="relative mt-5 rounded-[var(--lq-radius-md)] border border-[var(--lq-border)] bg-[var(--lq-surface-muted)] p-4">
          <div className="flex items-center gap-2 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-[var(--lq-slate-dim)]">
            <Check className="h-3.5 w-3.5 text-[var(--lq-green)]" aria-hidden />
            Chosen fix
          </div>
          <p className="mt-1.5 font-display text-lg font-bold text-[var(--lq-ink)]">{solution.title}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <MetricChip icon={Coins} label="Cost" value={solution.cost} color={COST_COLOR[solution.cost]} />
            <MetricChip icon={Gauge} label="Impact" value={solution.impact} color={IMPACT_COLOR[solution.impact]} />
            <MetricChip
              icon={Mountain}
              label="Difficulty"
              value={solution.difficulty}
              color={DIFFICULTY_COLOR[solution.difficulty]}
            />
          </div>
        </div>

        {/* Support + responsible + next action */}
        <div className="relative mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[var(--lq-radius-md)] border border-[var(--lq-hairline)] bg-[var(--lq-paper-raised)] p-3.5">
            <div className="flex items-center gap-1.5 text-[0.625rem] font-medium uppercase tracking-[0.12em] text-[var(--lq-slate-dim)]">
              <Users className="h-3.5 w-3.5 text-[var(--lq-green)]" strokeWidth={1.75} aria-hidden />
              Support
            </div>
            <p className="mt-1 text-[0.9375rem] font-bold text-[var(--lq-ink)]">
              {support.backers} neighbors · {support.consensus}%
            </p>
          </div>
          <div className="rounded-[var(--lq-radius-md)] border border-[var(--lq-hairline)] bg-[var(--lq-paper-raised)] p-3.5">
            <div className="flex items-center gap-1.5 text-[0.625rem] font-medium uppercase tracking-[0.12em] text-[var(--lq-slate-dim)]">
              <Landmark className="h-3.5 w-3.5 text-[var(--lq-blue)]" strokeWidth={1.75} aria-hidden />
              Responsible
            </div>
            <p className="mt-1 text-[0.8125rem] font-semibold leading-snug text-[var(--lq-ink)]">
              {plan.responsibleBody}
            </p>
          </div>
        </div>

        <div className="relative mt-3 flex items-start gap-2 rounded-[var(--lq-radius-md)] border border-[color-mix(in_srgb,var(--lq-gold)_30%,transparent)] bg-[color-mix(in_srgb,var(--lq-gold)_8%,transparent)] px-4 py-3">
          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[var(--lq-gold)]" aria-hidden />
          <p className="text-[0.8125rem] leading-relaxed text-[var(--lq-charcoal)]">{plan.nextAction}</p>
        </div>

        {delegate && (
          <div className="relative mt-3 flex items-center gap-2 text-[0.8125rem] font-medium text-[var(--lq-green-deep)]">
            <UserCheck className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            Delegated to a trusted neighbor.
          </div>
        )}

        {/* Footer */}
        <div className="relative mt-5 border-t border-[var(--lq-hairline)] pt-3 text-[0.6875rem] text-[var(--lq-slate-dim)]">
          From complaint to coordinated action · lociq.ailiur.com
        </div>
      </motion.div>

      {/* Card actions */}
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={onCopy}
          className={lqCn(
            'inline-flex flex-1 items-center justify-center gap-2 rounded-[var(--lq-radius-pill)] border px-5 py-3 text-sm font-semibold transition-colors',
            copied
              ? 'border-[var(--lq-green)] bg-[color-mix(in_srgb,var(--lq-green)_10%,transparent)] text-[var(--lq-green-deep)]'
              : 'border-[var(--lq-border-strong)] text-[var(--lq-charcoal)] hover:border-[var(--lq-green)]',
          )}
        >
          {copied ? <Check className="h-4 w-4" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
          {copied ? 'Copied' : 'Copy summary'}
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-[var(--lq-radius-pill)] border border-[var(--lq-border-strong)] px-5 py-3 text-sm font-semibold text-[var(--lq-charcoal)] transition-colors hover:border-[var(--lq-green)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Edit plan
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-[var(--lq-radius-pill)] px-5 py-3 text-sm font-semibold text-[var(--lq-slate)] transition-colors hover:text-[var(--lq-ink)]"
        >
          <RotateCcw className="h-4 w-4" aria-hidden />
          Start over
        </button>
      </div>
    </motion.div>
  );
}

/* ── Pieces ───────────────────────────────────────────────────────────────── */

function SolutionCard({
  solution,
  active,
  onClick,
}: {
  solution: Solution;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={lqCn(
        'flex h-full flex-col rounded-[var(--lq-radius-lg)] border p-4 text-left transition-[border-color,background-color,box-shadow,transform] duration-200',
        active
          ? 'border-[color-mix(in_srgb,var(--lq-green)_55%,transparent)] bg-[color-mix(in_srgb,var(--lq-green)_8%,var(--lq-paper-raised))] shadow-[var(--lq-shadow-sm)]'
          : 'border-[var(--lq-border)] bg-[var(--lq-paper-raised)] hover:-translate-y-0.5 hover:border-[var(--lq-border-strong)] hover:shadow-[var(--lq-shadow-sm)]',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-display text-[0.9375rem] font-bold leading-tight text-[var(--lq-ink)]">
          {solution.title}
        </h4>
        <span
          className={lqCn(
            'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2',
            active ? 'border-[var(--lq-green)]' : 'border-[var(--lq-slate-dim)]',
          )}
          aria-hidden
        >
          {active && <span className="h-2 w-2 rounded-full bg-[var(--lq-green)]" />}
        </span>
      </div>
      <p className="mt-2 flex-1 text-[0.8125rem] leading-relaxed text-[var(--lq-slate)]">{solution.summary}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <MiniMetric label="Cost" value={solution.cost} color={COST_COLOR[solution.cost]} />
        <MiniMetric label="Impact" value={solution.impact} color={IMPACT_COLOR[solution.impact]} />
        <MiniMetric label="Difficulty" value={solution.difficulty} color={DIFFICULTY_COLOR[solution.difficulty]} />
      </div>
    </button>
  );
}

function MiniMetric({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-[var(--lq-radius-pill)] border border-[var(--lq-hairline)] bg-[var(--lq-surface-muted)] px-2 py-0.5 text-[0.625rem] font-medium text-[var(--lq-slate)]">
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} aria-hidden />
      <span className="sr-only">{label}: </span>
      {value}
    </span>
  );
}

function MetricChip({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[var(--lq-radius-pill)] border border-[var(--lq-border)] bg-[var(--lq-paper-raised)] px-2.5 py-1 text-[0.75rem] font-medium text-[var(--lq-charcoal)]">
      <Icon className="h-3.5 w-3.5" style={{ color }} strokeWidth={1.75} aria-hidden />
      <span className="text-[var(--lq-slate-dim)]">{label}</span>
      <span className="font-semibold text-[var(--lq-ink)]">{value}</span>
    </span>
  );
}

function DelegateToggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={lqCn(
        'flex w-full items-center justify-between gap-3 rounded-[var(--lq-radius-md)] border px-4 py-3 text-left transition-colors',
        on
          ? 'border-[color-mix(in_srgb,var(--lq-green)_45%,transparent)] bg-[color-mix(in_srgb,var(--lq-green)_8%,transparent)]'
          : 'border-[var(--lq-border)] bg-[var(--lq-paper-raised)] hover:border-[var(--lq-border-strong)]',
      )}
    >
      <span className="flex items-center gap-3">
        <UserCheck
          className={lqCn('h-4 w-4 shrink-0', on ? 'text-[var(--lq-green)]' : 'text-[var(--lq-slate-dim)]')}
          strokeWidth={1.75}
          aria-hidden
        />
        <span className="text-[0.875rem] font-medium text-[var(--lq-charcoal)]">
          Delegate this topic to a trusted neighbor
        </span>
      </span>
      <span
        className={lqCn(
          'relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200',
          on ? 'bg-[var(--lq-green)]' : 'bg-[color-mix(in_srgb,var(--lq-ink)_18%,transparent)]',
        )}
        aria-hidden
      >
        <span
          className={lqCn(
            'absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-[left] duration-200',
            on ? 'left-[1.125rem]' : 'left-0.5',
          )}
        />
      </span>
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <span className="mb-3 block text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[var(--lq-slate-dim)]">
        {label}
      </span>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={lqCn(
        'rounded-[var(--lq-radius-md)] border px-3.5 py-2.5 text-left text-[0.875rem] font-medium transition-colors duration-200',
        active
          ? 'border-[color-mix(in_srgb,var(--lq-green)_55%,transparent)] bg-[color-mix(in_srgb,var(--lq-green)_12%,transparent)] text-[var(--lq-ink)]'
          : 'border-[var(--lq-border)] text-[var(--lq-slate)] hover:border-[var(--lq-border-strong)] hover:text-[var(--lq-ink)]',
      )}
    >
      {children}
    </button>
  );
}

function NeighborhoodChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={lqCn(
        'rounded-[var(--lq-radius-pill)] border px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors duration-200',
        active
          ? 'border-[color-mix(in_srgb,var(--lq-blue)_55%,transparent)] bg-[color-mix(in_srgb,var(--lq-blue)_12%,transparent)] text-[var(--lq-ink)]'
          : 'border-[var(--lq-border)] text-[var(--lq-slate)] hover:border-[var(--lq-border-strong)] hover:text-[var(--lq-ink)]',
      )}
    >
      {children}
    </button>
  );
}
