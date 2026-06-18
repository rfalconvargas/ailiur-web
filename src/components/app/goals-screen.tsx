'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, RefreshCw, Sparkles, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAiliurApp } from '@/components/app/app-context';
import { useLifeOs } from '@/components/app/life-os-context';
import {
  BASELINE_METRICS,
  COACHING_STYLES,
  CONSTRAINTS,
  DOMAINS,
  FRICTIONS,
  INTENSITIES,
  emptyInterviewDraft,
  type GoalInterview,
  type LifeMap,
  type ProtocolIntensity,
} from '@/components/app/life-os';

const easeOut = [0.22, 1, 0.36, 1] as const;

type Draft = Omit<GoalInterview, 'completedAt'>;

// --- Small shared controls ------------------------------------------------ //

function ChipMulti<T extends string>({
  options,
  selected,
  onToggle,
  columns = 'sm:grid-cols-2',
}: {
  options: { id: T; label: string }[];
  selected: T[];
  onToggle: (id: T) => void;
  columns?: string;
}) {
  return (
    <div role="group" className={cn('grid grid-cols-1 gap-2.5', columns)}>
      {options.map((o) => {
        const active = selected.includes(o.id);
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            onClick={() => onToggle(o.id)}
            className={cn(
              'flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left text-sm font-medium transition-colors',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
              active
                ? 'border-accent-green bg-accent-green/10 text-foreground'
                : 'border-white/60 bg-white/40 text-foreground/75 hover:bg-white/60'
            )}
          >
            {o.label}
            <span
              aria-hidden
              className={cn(
                'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
                active ? 'border-accent-green bg-accent-green text-[#fffdf5]' : 'border-foreground/25'
              )}
            >
              {active && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function OptionCards<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { id: T; label: string; blurb?: string }[];
  value: T;
  onChange: (id: T) => void;
}) {
  return (
    <div role="radiogroup" className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.id)}
            className={cn(
              'rounded-2xl border px-4 py-3.5 text-left transition-colors',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
              active
                ? 'border-accent-green bg-accent-green/10'
                : 'border-white/60 bg-white/40 hover:bg-white/60'
            )}
          >
            <span className="block text-sm font-semibold text-foreground">{o.label}</span>
            {o.blurb && <span className="mt-0.5 block text-xs text-foreground/60">{o.blurb}</span>}
          </button>
        );
      })}
    </div>
  );
}

function RatingRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className="text-sm font-medium text-foreground/80">{label}</span>
      <div role="group" aria-label={label} className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => {
          const active = value === n;
          return (
            <button
              key={n}
              type="button"
              aria-pressed={active}
              aria-label={`${label}: ${n} of 5`}
              onClick={() => onChange(n)}
              className={cn(
                'h-9 w-9 rounded-xl text-sm font-semibold transition-colors',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
                active
                  ? 'bg-accent-green text-[#fffdf5]'
                  : 'bg-white/45 text-foreground/60 hover:bg-white/70'
              )}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepFrame({
  question,
  helper,
  children,
}: {
  question: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-display text-[clamp(1.5rem,3vw,2.1rem)] font-extrabold leading-[1.12] tracking-tight text-foreground">
        {question}
      </h3>
      {helper && <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/60">{helper}</p>}
      <div className="mt-7">{children}</div>
    </div>
  );
}

// --- Interview flow ------------------------------------------------------- //

const TOTAL_STEPS = 8;

function InterviewFlow({
  initial,
  onComplete,
  onCancel,
}: {
  initial: GoalInterview | null;
  onComplete: (interview: GoalInterview) => void;
  onCancel?: () => void;
}) {
  const [draft, setDraft] = useState<Draft>(() => ({
    ...emptyInterviewDraft(),
    ...(initial ?? {}),
  }));
  const [step, setStep] = useState(0);

  const set = <K extends keyof Draft>(key: K, val: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: val }));

  const toggleIn = <T,>(arr: T[], id: T): T[] =>
    arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id];

  const last = step === TOTAL_STEPS - 1;
  const progress = Math.round(((step + 1) / TOTAL_STEPS) * 100);

  const finish = () => {
    onComplete({ ...draft, completedAt: new Date().toISOString() });
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header / progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
            Goal interview
          </span>
          <span className="text-xs font-medium text-foreground/50">
            Step {step + 1} of {TOTAL_STEPS}
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/50">
          <motion.div
            className="h-full rounded-full bg-accent-green"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: easeOut }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.28, ease: easeOut }}
        >
          {step === 0 && (
            <StepFrame
              question="Imagine it is five years from now and your life is meaningfully better. What changed?"
              helper="Think body, energy, work, money, relationships, learning, creativity, and the way your days feel."
            >
              <textarea
                value={draft.fiveYearVision}
                onChange={(e) => set('fiveYearVision', e.target.value)}
                rows={6}
                placeholder="Write as much or as little as you like…"
                className="w-full resize-none rounded-2xl border border-white/60 bg-white/50 p-4 text-sm leading-relaxed text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent-green"
              />
            </StepFrame>
          )}

          {step === 1 && (
            <StepFrame
              question="Which areas matter most right now?"
              helper="Choosing about 3 keeps your protocol focused — but pick what feels true."
            >
              <ChipMulti
                options={DOMAINS}
                selected={draft.priorityDomains}
                onToggle={(id) => set('priorityDomains', toggleIn(draft.priorityDomains, id))}
              />
              <p className="mt-3 text-xs text-foreground/50">
                {draft.priorityDomains.length} selected
                {draft.priorityDomains.length > 3 ? ' · 3 is the sweet spot' : ''}
              </p>
            </StepFrame>
          )}

          {step === 2 && (
            <StepFrame question="What would make the next 90 days feel like a real turning point?">
              <input
                type="text"
                value={draft.ninetyDayTurningPoint}
                onChange={(e) => set('ninetyDayTurningPoint', e.target.value)}
                placeholder="One sentence is plenty…"
                className="w-full rounded-2xl border border-white/60 bg-white/50 p-4 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent-green"
              />
            </StepFrame>
          )}

          {step === 3 && (
            <StepFrame question="What usually breaks your momentum?">
              <ChipMulti
                options={FRICTIONS}
                selected={draft.friction}
                onToggle={(id) => set('friction', toggleIn(draft.friction, id))}
              />
            </StepFrame>
          )}

          {step === 4 && (
            <StepFrame
              question="How would you describe your current baseline?"
              helper="A quick gut read on each — 1 is low, 5 is strong. This just calibrates your starting point."
            >
              <div className="divide-y divide-white/40 rounded-2xl border border-white/60 bg-white/40 px-4">
                {BASELINE_METRICS.map((m) => (
                  <RatingRow
                    key={m.id}
                    label={m.label}
                    value={draft.baseline[m.id]}
                    onChange={(n) => set('baseline', { ...draft.baseline, [m.id]: n })}
                  />
                ))}
              </div>
            </StepFrame>
          )}

          {step === 5 && (
            <StepFrame question="What constraints should Ailiur respect?">
              <ChipMulti
                options={CONSTRAINTS}
                selected={draft.constraints}
                onToggle={(id) => set('constraints', toggleIn(draft.constraints, id))}
              />
            </StepFrame>
          )}

          {step === 6 && (
            <StepFrame question="How should Ailiur guide you?">
              <OptionCards
                options={INTENSITIES}
                value={draft.intensity}
                onChange={(id) => set('intensity', id)}
              />
            </StepFrame>
          )}

          {step === 7 && (
            <StepFrame question="What kind of support do you respond to best?">
              <OptionCards
                options={COACHING_STYLES}
                value={draft.coachingStyle}
                onChange={(id) => set('coachingStyle', id)}
              />
            </StepFrame>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer nav */}
      <div className="mt-10 flex items-center justify-between gap-3">
        {step === 0 ? (
          onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-full px-4 py-2.5 text-sm font-medium text-foreground/60 transition-colors hover:text-foreground"
            >
              Cancel
            </button>
          ) : (
            <span />
          )
        ) : (
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        )}

        {last ? (
          <button
            type="button"
            onClick={finish}
            className="group inline-flex items-center gap-2 rounded-full bg-accent-green px-6 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
          >
            <Sparkles className="h-4 w-4" />
            Generate my Life Map
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1))}
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            Continue
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>
    </div>
  );
}

// --- Life Map artifact ---------------------------------------------------- //

function MapBlock({
  label,
  children,
  span = false,
}: {
  label: string;
  children: React.ReactNode;
  span?: boolean;
}) {
  return (
    <div className={cn('glass rounded-[var(--radius-card)] p-6', span && 'sm:col-span-2')}>
      <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground/50">{label}</h4>
      <div className="mt-3 text-foreground">{children}</div>
    </div>
  );
}

function LifeMapView({
  lifeMap,
  intensity,
  onEdit,
  onRegenerate,
  onIntensity,
  onClear,
  onGoToToday,
}: {
  lifeMap: LifeMap;
  intensity: ProtocolIntensity;
  onEdit: () => void;
  onRegenerate: () => void;
  onIntensity: (i: ProtocolIntensity) => void;
  onClear: () => void;
  onGoToToday: () => void;
}) {
  return (
    <div className="mx-auto max-w-4xl">
      {/* Artifact header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-foreground/50">
            <Sparkles className="h-3.5 w-3.5 text-accent-green" />
            Your Life Map
          </span>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,3.8vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-foreground">
            {lifeMap.identityShift}
          </h2>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="glass-strong rounded-full px-4 py-2 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
          >
            Edit answers
          </button>
          <button
            type="button"
            onClick={onRegenerate}
            className="glass-strong inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Regenerate
          </button>
        </div>
      </div>

      {/* Intensity switcher */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-medium uppercase tracking-widest text-foreground/45">
          Intensity
        </span>
        {INTENSITIES.map((i) => {
          const active = intensity === i.id;
          return (
            <button
              key={i.id}
              type="button"
              aria-pressed={active}
              onClick={() => onIntensity(i.id)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
                active
                  ? 'bg-accent-green text-[#fffdf5]'
                  : 'bg-white/50 text-foreground/65 hover:bg-white/70'
              )}
            >
              {i.label}
            </button>
          );
        })}
      </div>

      {/* Map grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MapBlock label="5-Year Direction" span>
          <p className="text-base leading-relaxed text-foreground/85">{lifeMap.fiveYearDirection}</p>
        </MapBlock>

        <MapBlock label="90-Day North Star">
          <p className="leading-relaxed text-foreground/85">{lifeMap.ninetyDayNorthStar}</p>
        </MapBlock>

        <MapBlock label="Priority Domains">
          <div className="flex flex-wrap gap-2">
            {lifeMap.priorityDomains.map((d) => (
              <span
                key={d.id}
                className="rounded-full bg-white/55 px-3 py-1 text-xs font-medium text-foreground/80"
              >
                {d.label}
              </span>
            ))}
          </div>
        </MapBlock>

        <MapBlock label="Current Bottlenecks" span>
          <ul className="space-y-1.5">
            {lifeMap.bottlenecks.map((b, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground/80">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-red" />
                {b}
              </li>
            ))}
          </ul>
        </MapBlock>

        <MapBlock label="First Loop to Tune" span>
          <p className="leading-relaxed text-foreground/85">{lifeMap.firstLoop}</p>
        </MapBlock>

        <MapBlock label="Suggested Daily Signals">
          <ul className="space-y-1.5">
            {lifeMap.dailySignals.map((s, i) => (
              <li key={i} className="text-sm text-foreground/80">
                {s}
              </li>
            ))}
          </ul>
        </MapBlock>

        <MapBlock label="Recommended Today Setup">
          <ul className="space-y-1.5">
            {lifeMap.recommendedTodaySetup.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-foreground/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-green" strokeWidth={2.5} />
                {s}
              </li>
            ))}
          </ul>
        </MapBlock>
      </div>

      {/* Footer actions */}
      <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onGoToToday}
          className="group inline-flex items-center gap-2 rounded-full bg-accent-green px-7 py-3.5 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
        >
          Set up Today from this map
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/50 transition-colors hover:text-accent-red"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Clear my data
        </button>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-foreground/45">
        This Life Map is a reflective starting point generated from your answers — not medical,
        psychological, or financial advice.
      </p>
    </div>
  );
}

// --- Empty state (pre-interview) ------------------------------------------ //

function GoalsIntro({ onBegin }: { onBegin: () => void }) {
  return (
    <div className="mx-auto max-w-2xl">
      <span className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
        Goals
      </span>
      <h2 className="mt-3 font-display text-[clamp(1.9rem,3.8vw,3rem)] font-extrabold leading-[1.08] tracking-tight text-foreground">
        Start by telling Ailiur what you want the next five years to become.
      </h2>
      <p className="mt-4 text-base leading-relaxed text-foreground/70 sm:text-lg">
        A calm, 3–5 minute guided interview — eight short questions. Ailiur turns your answers into a
        personal Life Map, then shapes your daily protocol around it.
      </p>
      <button
        type="button"
        onClick={onBegin}
        className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent-green px-7 py-3.5 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
      >
        Begin goal interview
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}

// --- Section entry -------------------------------------------------------- //

export function GoalsScreen() {
  const {
    hydrated,
    interview,
    lifeMap,
    intensity,
    hasGoals,
    saveInterview,
    regenerate,
    setIntensity,
    clearAll,
  } = useLifeOs();
  const { setSection } = useAiliurApp();

  // 'auto' defers to whether goals exist; explicit modes override (begin/edit).
  const [mode, setMode] = useState<'auto' | 'interview'>('auto');

  const showInterview = useMemo(
    () => mode === 'interview' || (mode === 'auto' && hydrated && !hasGoals),
    [mode, hydrated, hasGoals]
  );

  if (!hydrated) {
    return <div className="mx-auto h-40 max-w-2xl animate-pulse rounded-[var(--radius-card)] bg-white/40" />;
  }

  if (showInterview) {
    return (
      <InterviewFlow
        initial={interview}
        onComplete={(data) => {
          saveInterview(data);
          setMode('auto');
        }}
        onCancel={hasGoals ? () => setMode('auto') : undefined}
      />
    );
  }

  if (lifeMap) {
    return (
      <LifeMapView
        lifeMap={lifeMap}
        intensity={intensity}
        onEdit={() => setMode('interview')}
        onRegenerate={regenerate}
        onIntensity={setIntensity}
        onClear={clearAll}
        onGoToToday={() => setSection('today')}
      />
    );
  }

  return <GoalsIntro onBegin={() => setMode('interview')} />;
}
