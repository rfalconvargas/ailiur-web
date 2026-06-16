'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Play,
  Loader2,
  Check,
  Coins,
  Activity,
  Clock,
  ShieldAlert,
  BellRing,
  FileCode2,
  Sparkles,
  Gauge,
  Bell,
  BellOff,
  Volume2,
  type LucideIcon,
} from 'lucide-react';
import { TELLUMETRY_STAGES } from '@/lib/tellumetry/content';
import { TelemetryCard } from './telemetry-card';
import { TM_EASE_OUT, tmCn } from './utils';

/* ────────────────────────────────────────────────────────────────────────────
 * Agent Preflight Simulator — frontend-only landing-page demo.
 *
 * The visitor configures a task, model intensity, risk tolerance, and
 * notification style. On "Simulate Agent Run" the agent pipeline animates stage
 * by stage and the cockpit fills in mock telemetry: tokens, cost, duration,
 * risk, attention check, and the files likely touched.
 *
 * Everything is deterministic template logic — no upload, no AI call, no
 * backend. The numbers are illustrative, never real.
 * ──────────────────────────────────────────────────────────────────────────── */

type PresetId = 'refactor' | 'fix-ts' | 'onboarding' | 'deploy' | 'custom';
type IntensityId = 'economy' | 'balanced' | 'deep';
type NotifyId = 'silent' | 'desktop' | 'audio';
type Status = 'empty' | 'running' | 'done';

type Preset = {
  id: PresetId;
  label: string;
  baseTokens: number; // thousands
  files: string[];
};

const PRESETS: Preset[] = [
  {
    id: 'refactor',
    label: 'Refactor landing page',
    baseTokens: 84,
    files: ['app/page.tsx', 'components/Hero.tsx', 'components/Nav.tsx', 'app/globals.css'],
  },
  {
    id: 'fix-ts',
    label: 'Fix TypeScript errors',
    baseTokens: 46,
    files: ['src/lib/types.ts', 'components/TelemetryCard.tsx', 'app/page.tsx'],
  },
  {
    id: 'onboarding',
    label: 'Add onboarding flow',
    baseTokens: 152,
    files: ['app/onboarding/page.tsx', 'components/OnboardingStepper.tsx', 'lib/auth.ts', 'app/api/user/route.ts'],
  },
  {
    id: 'deploy',
    label: 'Deploy to Vercel',
    baseTokens: 40,
    files: ['vercel.json', '.env.production', 'next.config.ts'],
  },
  {
    id: 'custom',
    label: 'Custom task',
    baseTokens: 90,
    files: [],
  },
];

const INTENSITY: Record<
  IntensityId,
  { label: string; mult: number; pricePerK: number; speed: number; note: string }
> = {
  economy: { label: 'Economy', mult: 0.6, pricePerK: 0.02, speed: 1.3, note: 'fast, cheaper model' },
  balanced: { label: 'Balanced', mult: 1.0, pricePerK: 0.045, speed: 1.0, note: 'default model mix' },
  deep: { label: 'Deep Work', mult: 1.75, pricePerK: 0.08, speed: 0.82, note: 'most capable model' },
};

const NOTIFY: Record<
  NotifyId,
  { label: string; icon: LucideIcon; hint: string; summary: string }
> = {
  silent: {
    label: 'Silent',
    icon: BellOff,
    hint: 'No interruptions — you check the cockpit.',
    summary: 'Tellumetry would stay silent and wait for you to check the cockpit.',
  },
  desktop: {
    label: 'Desktop',
    icon: Bell,
    hint: 'Desktop notification per decision.',
    summary: 'Tellumetry would send a desktop notification when the next human decision is needed.',
  },
  audio: {
    label: 'Audio ping',
    icon: Volume2,
    hint: 'Audio ping per decision.',
    summary: 'Tellumetry would play an audio ping when the next human decision is needed.',
  },
};

/** Words that should raise the risk level when they appear in the task. */
const RISK_WORDS = [
  'auth',
  'database',
  'payment',
  'delete',
  'migration',
  'production',
  'deploy',
  'env',
] as const;

/** Files a custom task is likely to touch, keyed by risk keyword. */
const KEYWORD_FILES: Record<string, string> = {
  auth: 'lib/auth.ts',
  database: 'db/schema.ts',
  payment: 'app/api/checkout/route.ts',
  delete: 'lib/data/remove.ts',
  migration: 'db/migrations/0001_init.sql',
  production: 'next.config.ts',
  deploy: 'vercel.json',
  env: '.env.production',
};

const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n));

type RiskBand = { label: 'Low' | 'Medium' | 'High'; color: string; tone: string };

function riskBand(score: number): RiskBand {
  if (score < 35) return { label: 'Low', color: 'var(--tm-green)', tone: 'safe to run unattended' };
  if (score < 68) return { label: 'Medium', color: 'var(--tm-amber)', tone: 'review the flagged stage' };
  return { label: 'High', color: 'var(--tm-red)', tone: 'wants a human before deploy' };
}

function riskZone(v: number) {
  if (v < 34) return 'Conservative';
  if (v < 67) return 'Normal';
  return 'Aggressive';
}

function customBaseTokens(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (words === 0) return 90;
  return clamp(40 + words * 4, 40, 220);
}

function filesFor(preset: Preset, text: string, hits: string[]): string[] {
  if (preset.id !== 'custom') return preset.files;
  const fromKeywords = hits.map((h) => KEYWORD_FILES[h]).filter(Boolean);
  const base = ['app/page.tsx', 'components/AgentPreflightDemo.tsx', 'lib/utils.ts'];
  const merged = [...new Set([...fromKeywords, ...base])];
  return merged.slice(0, 6);
}

type Analysis = ReturnType<typeof analyze>;

/** Deterministic mock estimate — a pure function of the control state. */
function analyze(input: {
  preset: Preset;
  customTask: string;
  intensity: IntensityId;
  risk: number;
  notify: NotifyId;
}) {
  const { preset, customTask, intensity, risk, notify } = input;
  const taskText = (preset.id === 'custom' ? customTask : preset.label).toLowerCase();
  const intent = INTENSITY[intensity];

  const hits = RISK_WORDS.filter((w) => taskText.includes(w));

  const baseTokens = preset.id === 'custom' ? customBaseTokens(customTask) : preset.baseTokens;
  const tokensK = Math.max(8, Math.round(baseTokens * intent.mult * (0.9 + risk / 250)));
  const cost = tokensK * intent.pricePerK;
  const durationMin = Math.max(2, Math.round(tokensK * 0.12 * intent.speed));
  const savedMin = Math.max(5, Math.round(durationMin * 0.85 + (intensity === 'deep' ? 5 : 2)));

  const riskScore = clamp(
    20 + hits.length * 15 + (risk - 50) * 0.5 + (intensity === 'deep' ? 6 : 0),
  );
  const band = riskBand(riskScore);
  const attentionMin = clamp(Math.round(13 - riskScore / 11), 2, 12);

  const files = filesFor(preset, taskText, hits);

  return {
    tokensK,
    cost,
    durationMin,
    savedMin,
    riskScore: Math.round(riskScore),
    band,
    attentionMin,
    files,
    hits,
    notify: NOTIFY[notify],
    intentLabel: intent.label,
  };
}

const fmtTokens = (k: number) => (k >= 1000 ? `${(k / 1000).toFixed(1)}M` : `${k}K`);

export function AgentPreflightDemo() {
  const [presetId, setPresetId] = useState<PresetId>('refactor');
  const [customTask, setCustomTask] = useState('');
  const [intensity, setIntensity] = useState<IntensityId>('balanced');
  const [risk, setRisk] = useState(45);
  const [notify, setNotify] = useState<NotifyId>('desktop');
  const [status, setStatus] = useState<Status>('empty');
  const [stageStep, setStageStep] = useState(-1);

  const reduced = useReducedMotion();

  const preset = PRESETS.find((p) => p.id === presetId)!;
  const result = useMemo(
    () => analyze({ preset, customTask, intensity, risk, notify }),
    [preset, customTask, intensity, risk, notify],
  );

  // Walk the pipeline one stage at a time, then resolve. Timers are cleaned up
  // on unmount or if the status changes mid-run.
  useEffect(() => {
    if (status !== 'running') return;
    const stepMs = reduced ? 90 : 420;
    const timers = TELLUMETRY_STAGES.map((_, i) =>
      setTimeout(() => setStageStep(i), i * stepMs),
    );
    const done = setTimeout(
      () => setStatus('done'),
      TELLUMETRY_STAGES.length * stepMs + 250,
    );
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [status, reduced]);

  function simulate() {
    if (status === 'running') return;
    setStageStep(-1);
    setStatus('running');
  }

  const done = status === 'done';
  const canSimulate = presetId !== 'custom' || customTask.trim().length > 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:gap-8">
      {/* ── Controls ─────────────────────────────────────────────────────── */}
      <form
        className="tm-glass rounded-[var(--tm-radius-xl)] p-5 sm:p-7"
        onSubmit={(e) => {
          e.preventDefault();
          if (canSimulate) simulate();
        }}
      >
        <div className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--tm-mint)]">
          <Gauge className="h-3.5 w-3.5" aria-hidden />
          Preflight
        </div>

        {/* Task preset */}
        <Field label="Task" htmlFor={undefined}>
          <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Task preset">
            {PRESETS.map((p) => (
              <TaskChip
                key={p.id}
                active={presetId === p.id}
                onClick={() => setPresetId(p.id)}
                wide={p.id === 'custom'}
              >
                {p.label}
              </TaskChip>
            ))}
          </div>
        </Field>

        {/* Custom task textarea — only when custom is selected */}
        <AnimatePresence initial={false}>
          {presetId === 'custom' && (
            <motion.div
              initial={reduced ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={reduced ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: TM_EASE_OUT }}
              className="overflow-hidden"
            >
              <div className="mt-4">
                <label htmlFor="tm-custom-task" className="sr-only">
                  Describe your custom task
                </label>
                <textarea
                  id="tm-custom-task"
                  value={customTask}
                  onChange={(e) => setCustomTask(e.target.value)}
                  rows={3}
                  placeholder="Describe the task you want to hand to an agent…"
                  className={tmCn(
                    'w-full resize-y rounded-[var(--tm-radius-md)] border border-[var(--tm-border-strong)] bg-[var(--tm-surface-muted)]',
                    'px-4 py-3 text-[0.9375rem] leading-relaxed text-[var(--tm-ivory)] outline-none',
                    'placeholder:text-[var(--tm-slate-dim)]',
                    'focus:border-[var(--tm-mint)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--tm-mint)_25%,transparent)]',
                  )}
                />
                <p className="mt-1.5 text-[0.6875rem] text-[var(--tm-slate-dim)]">
                  Words like auth, payment, migration, or deploy raise the risk level.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Model intensity */}
        <Field label="Model intensity">
          <Segmented
            ariaLabel="Model intensity"
            options={(Object.keys(INTENSITY) as IntensityId[]).map((id) => ({
              id,
              label: INTENSITY[id].label,
            }))}
            value={intensity}
            onChange={setIntensity}
          />
          <p className="mt-2 text-[0.6875rem] text-[var(--tm-slate-dim)]">{INTENSITY[intensity].note}</p>
        </Field>

        {/* Risk tolerance */}
        <Field label="Risk tolerance">
          <input
            type="range"
            min={0}
            max={100}
            value={risk}
            aria-label="Risk tolerance"
            aria-valuetext={riskZone(risk)}
            onChange={(e) => setRisk(Number(e.target.value))}
            className="tm-range"
            style={{ '--tm-fill': `${risk}%` } as React.CSSProperties}
          />
          <div className="mt-1.5 flex items-center justify-between text-[0.6875rem] text-[var(--tm-slate)]">
            <span>Conservative</span>
            <span className="font-semibold text-[var(--tm-ivory)]">{riskZone(risk)}</span>
            <span>Aggressive</span>
          </div>
        </Field>

        {/* Notification preference */}
        <Field label="Notify me">
          <Segmented
            ariaLabel="Notification preference"
            options={(Object.keys(NOTIFY) as NotifyId[]).map((id) => ({
              id,
              label: NOTIFY[id].label,
              icon: NOTIFY[id].icon,
            }))}
            value={notify}
            onChange={setNotify}
          />
        </Field>

        <button
          type="submit"
          disabled={status === 'running' || !canSimulate}
          className={tmCn(
            'group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-[var(--tm-radius-pill)]',
            'bg-[var(--tm-ivory)] px-6 py-3.5 text-sm font-semibold text-[var(--tm-ink)]',
            'transition-transform hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--tm-mint)]',
          )}
        >
          {status === 'running' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Simulating…
            </>
          ) : (
            <>
              <Play className="h-4 w-4" aria-hidden />
              {done ? 'Simulate again' : 'Simulate Agent Run'}
            </>
          )}
        </button>
        <p className="mt-3 text-center text-[0.6875rem] text-[var(--tm-slate-dim)]">
          Mock preflight only — no agent runs and nothing connects to a repo.
        </p>
      </form>

      {/* ── Output ───────────────────────────────────────────────────────── */}
      <div className="tm-glass-strong relative min-h-[30rem] overflow-hidden rounded-[var(--tm-radius-xl)] p-5 sm:p-7">
        {status === 'empty' ? (
          <EmptyState reduced={!!reduced} />
        ) : (
          <div className="space-y-6">
            <Pipeline status={status} stageStep={stageStep} reduced={!!reduced} band={result.band} />

            <AnimatePresence>
              {done && (
                <motion.div
                  key="success"
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: TM_EASE_OUT }}
                >
                  <SuccessCard result={result} />
                </motion.div>
              )}
            </AnimatePresence>

            <Telemetry result={result} done={done} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Output: pipeline ─────────────────────────────────────────────────────── */

function Pipeline({
  status,
  stageStep,
  reduced,
  band,
}: {
  status: Status;
  stageStep: number;
  reduced: boolean;
  band: RiskBand;
}) {
  const total = TELLUMETRY_STAGES.length;
  const completed = status === 'done' ? total : Math.max(0, stageStep);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-[0.625rem] font-medium uppercase tracking-[0.14em] text-[var(--tm-slate-dim)]">
        <span>Agent pipeline</span>
        <span>
          {Math.min(completed, total)} / {total}
        </span>
      </div>

      {/* Vertical on mobile, horizontal on md+. */}
      <ol className="flex flex-col md:flex-row md:items-start" role="list">
        {TELLUMETRY_STAGES.map((stage, i) => {
          const state =
            status === 'done' || i < stageStep ? 'done' : i === stageStep ? 'active' : 'pending';
          return (
            <li key={stage.id} className="flex md:flex-1 md:flex-col">
              {/* Connector before this node (skip first) */}
              {i > 0 && (
                <span
                  aria-hidden
                  className={tmCn(
                    // mobile: vertical segment aligned under the circle; desktop: horizontal
                    'ml-[15px] h-5 w-px shrink-0 md:ml-0 md:mt-[15px] md:h-px md:w-full md:flex-1',
                    'transition-colors duration-500',
                    i <= completed ? 'bg-[var(--tm-mint)]' : 'bg-[var(--tm-hairline)]',
                  )}
                />
              )}
              <div className="flex items-center gap-3 md:flex-col md:items-center md:gap-2 md:text-center">
                <span className="relative flex" aria-hidden>
                  <motion.span
                    initial={false}
                    animate={
                      reduced || state !== 'active'
                        ? { scale: 1 }
                        : { scale: [1, 1.12, 1] }
                    }
                    transition={{ duration: 1.1, repeat: state === 'active' ? Infinity : 0, ease: 'easeInOut' }}
                    className={tmCn(
                      'flex h-8 w-8 items-center justify-center rounded-full border',
                      state === 'done'
                        ? 'border-[var(--tm-green)] text-[var(--tm-green)]'
                        : state === 'active'
                          ? 'border-[var(--tm-mint)] text-[var(--tm-mint)]'
                          : 'border-[var(--tm-hairline)] text-[var(--tm-slate-dim)]',
                    )}
                  >
                    {state === 'done' ? (
                      <Check className="h-4 w-4" />
                    ) : state === 'active' ? (
                      <Loader2 className={tmCn('h-4 w-4', !reduced && 'animate-spin')} />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--tm-slate-dim)]" />
                    )}
                  </motion.span>
                </span>
                <span
                  className={tmCn(
                    'text-[0.875rem] font-medium md:text-[0.75rem]',
                    state === 'pending' ? 'text-[var(--tm-slate-dim)]' : 'text-[var(--tm-ivory-soft)]',
                  )}
                >
                  {stage.label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      {status === 'running' && (
        <p className="mt-4 text-[0.8125rem] text-[var(--tm-slate)]">
          Running preflight — estimating tokens, cost, and risk…
        </p>
      )}
      {status === 'done' && band.label !== 'Low' && (
        <p className="mt-4 text-[0.8125rem] text-[var(--tm-slate)]">
          One stage was flagged as {band.label.toLowerCase()} risk — {band.tone}.
        </p>
      )}
    </div>
  );
}

/* ── Output: success card ─────────────────────────────────────────────────── */

function SuccessCard({ result }: { result: Analysis }) {
  return (
    <div className="flex items-start gap-4 rounded-[var(--tm-radius-lg)] border border-[color-mix(in_srgb,var(--tm-mint)_30%,transparent)] bg-[color-mix(in_srgb,var(--tm-mint)_8%,var(--tm-surface-muted))] p-5">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--tm-mint)_20%,transparent)] text-[var(--tm-mint)]">
        <Sparkles className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </span>
      <div>
        <h3 className="font-display text-xl font-extrabold tracking-tight text-[var(--tm-ivory)]">
          Agent run ready for review.
        </h3>
        <p className="mt-1 text-[0.9375rem] leading-relaxed text-[var(--tm-ivory-soft)]">
          You saved ~{result.savedMin} minutes of terminal babysitting.
        </p>
        <p className="mt-2 flex items-center gap-2 text-[0.875rem] leading-relaxed text-[var(--tm-slate)]">
          <BellRing className="h-4 w-4 shrink-0 text-[var(--tm-mint)]" aria-hidden />
          {result.notify.summary}
        </p>
      </div>
    </div>
  );
}

/* ── Output: telemetry grid ───────────────────────────────────────────────── */

function Telemetry({ result, done }: { result: Analysis; done: boolean }) {
  const dash = '— —';
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <TelemetryCard
        icon={Activity}
        label="Est. tokens"
        accent="var(--tm-mint)"
        pending={!done}
        value={done ? fmtTokens(result.tokensK) : dash}
        hint={done ? `${result.intentLabel} model intensity` : undefined}
      />
      <TelemetryCard
        icon={Coins}
        label="Est. cost"
        accent="var(--tm-amber)"
        pending={!done}
        value={done ? `$${result.cost.toFixed(2)}` : dash}
        hint={done ? 'blended per-task estimate' : undefined}
      />
      <TelemetryCard
        icon={Clock}
        label="Est. duration"
        accent="var(--tm-cyan)"
        pending={!done}
        value={done ? `${result.durationMin} min` : dash}
        hint={done ? 'wall-clock, unattended' : undefined}
      />
      <TelemetryCard
        icon={ShieldAlert}
        label="Risk level"
        accent={result.band.color}
        pending={!done}
        value={done ? result.band.label : dash}
        hint={done ? result.band.tone : undefined}
      />
      <TelemetryCard
        icon={BellRing}
        label="Attention check"
        accent="var(--tm-mint)"
        pending={!done}
        value={done ? `every ${result.attentionMin} min` : dash}
        hint={done ? result.notify.hint : undefined}
      />
      <TelemetryCard
        icon={FileCode2}
        label="Files likely touched"
        accent="var(--tm-ivory)"
        pending={!done}
        value={done ? `${result.files.length} files` : dash}
      >
        {done && result.files.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5" role="list">
            {result.files.map((f) => (
              <li
                key={f}
                className="rounded-[var(--tm-radius-pill)] border border-[var(--tm-border)] bg-[var(--tm-glass-bg)] px-2.5 py-1 font-mono text-[0.6875rem] text-[var(--tm-ivory-soft)]"
              >
                {f}
              </li>
            ))}
          </ul>
        )}
      </TelemetryCard>
    </div>
  );
}

/* ── Empty state ──────────────────────────────────────────────────────────── */

function EmptyState({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-full min-h-[28rem] flex-col items-center justify-center text-center"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-[var(--tm-radius-lg)] border border-[var(--tm-hairline)] bg-[var(--tm-surface-muted)] text-[var(--tm-mint)]">
        <Gauge className="h-6 w-6" strokeWidth={1.5} aria-hidden />
      </span>
      <p className="mt-5 max-w-sm font-display text-xl font-bold leading-snug text-[var(--tm-ivory)]">
        Run a preflight check before handing work to an agent.
      </p>
      <p className="mt-2 max-w-xs text-[0.875rem] leading-relaxed text-[var(--tm-slate)]">
        Pick a task, set the model intensity, risk tolerance, and notifications — then simulate the
        run to see cost, risk, and the files it would touch.
      </p>
    </motion.div>
  );
}

/* ── Control primitives ───────────────────────────────────────────────────── */

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-7">
      <label
        htmlFor={htmlFor}
        className="mb-3 block text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[var(--tm-slate-dim)]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function TaskChip({
  active,
  onClick,
  wide,
  children,
}: {
  active: boolean;
  onClick: () => void;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={active}
      onClick={onClick}
      className={tmCn(
        'rounded-[var(--tm-radius-md)] border px-3.5 py-2.5 text-left text-[0.875rem] font-medium transition-colors duration-200',
        wide && 'col-span-2',
        active
          ? 'border-[color-mix(in_srgb,var(--tm-mint)_60%,transparent)] bg-[color-mix(in_srgb,var(--tm-mint)_14%,var(--tm-charcoal))] text-[var(--tm-ivory)]'
          : 'border-[var(--tm-border)] text-[var(--tm-slate)] hover:border-[var(--tm-border-strong)] hover:text-[var(--tm-ivory)]',
      )}
    >
      {children}
    </button>
  );
}

function Segmented<T extends string>({
  ariaLabel,
  options,
  value,
  onChange,
}: {
  ariaLabel: string;
  options: { id: T; label: string; icon?: LucideIcon }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="grid auto-cols-fr grid-flow-col gap-1 rounded-[var(--tm-radius-pill)] border border-[var(--tm-border)] bg-[var(--tm-surface-muted)] p-1"
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.id)}
            className={tmCn(
              'inline-flex items-center justify-center gap-1.5 rounded-[var(--tm-radius-pill)] px-3 py-2 text-[0.8125rem] font-medium transition-colors duration-200',
              active
                ? 'bg-[var(--tm-ivory)] text-[var(--tm-ink)] shadow-[var(--tm-shadow-sm)]'
                : 'text-[var(--tm-slate)] hover:text-[var(--tm-ivory)]',
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden />}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
