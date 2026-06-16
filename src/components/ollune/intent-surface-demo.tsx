'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  CornerDownLeft,
  FolderKanban,
  Layers,
  Link2,
  ListChecks,
  Moon,
  Network,
  RotateCcw,
  Sparkles,
  Target,
  type LucideIcon,
} from 'lucide-react';
import { OL_EASE_OUT, olCn } from './utils';

/* ── Types ───────────────────────────────────────────────────── */

type ContextSource =
  | 'Mytabolism'
  | 'Enchiridion'
  | 'Doblu'
  | 'Moment'
  | 'Context Mesh';

type DemoCard = { icon: LucideIcon; title: string; body: string };

type Workspace = {
  summary: string;
  sources: ContextSource[];
  cards: DemoCard[];
  firstAction: string;
};

type Preset = { id: string; label: string; intent: string; workspace: Workspace };

type Phase = 'idle' | 'loading' | 'ready' | 'done';

/* ── Mock data (deterministic, frontend-only) ────────────────── */

const PRESETS: Preset[] = [
  {
    id: 'deep-work',
    label: 'Prepare for deep work',
    intent: 'Prepare for deep work',
    workspace: {
      summary:
        'A protected execution surface, tuned to your current energy and the work you left open.',
      sources: ['Mytabolism', 'Context Mesh'],
      cards: [
        { icon: Target, title: 'Focus Window', body: '52 minutes of protected execution' },
        { icon: Activity, title: 'Mytabolism Signal', body: 'Moderate energy, low distraction tolerance' },
        { icon: ListChecks, title: 'Action Queue', body: 'Draft → organize → execute' },
        { icon: Moon, title: 'Environment', body: 'Notifications silenced, visual noise reduced' },
        { icon: Link2, title: 'Recent Context', body: 'Notes, files, and tasks reconnected' },
      ],
      firstAction: 'Enter a 52-minute focus block',
    },
  },
  {
    id: 'learning-sprint',
    label: 'Plan a learning sprint',
    intent: 'Plan a learning sprint',
    workspace: {
      summary:
        'A staged path that sequences your sources into a week of deliberate, recoverable progress.',
      sources: ['Enchiridion', 'Mytabolism'],
      cards: [
        { icon: BookOpen, title: 'Enchiridion Path', body: 'Review 3 source notes before synthesis' },
        { icon: Layers, title: 'Sprint Shape', body: '5 sessions across 7 days' },
        { icon: Activity, title: 'Mytabolism Signal', body: 'Study scheduled in high-focus windows' },
        { icon: CheckCircle2, title: 'Checkpoint', body: 'A short recall test after each session' },
        { icon: ListChecks, title: 'Action Queue', body: 'Read → annotate → synthesize' },
      ],
      firstAction: 'Open the first source note',
    },
  },
  {
    id: 'recover',
    label: 'Recover after a low-energy day',
    intent: 'Recover after a low-energy day',
    workspace: {
      summary:
        'A gentle surface that lowers the bar — only what restores you, and nothing that drains.',
      sources: ['Mytabolism', 'Moment'],
      cards: [
        { icon: Activity, title: 'Mytabolism Signal', body: 'Low energy — rest is the priority' },
        { icon: ListChecks, title: 'Light Queue', body: 'Two small, satisfying tasks only' },
        { icon: Moon, title: 'Environment', body: 'Dim, quiet, minimal visual load' },
        { icon: Clock, title: 'Moment Recall', body: 'Revisit one thing that went well today' },
        { icon: Target, title: 'Tomorrow', body: 'First action pre-staged for the morning' },
      ],
      firstAction: 'Mark today complete and wind down',
    },
  },
  {
    id: 'notes-to-project',
    label: 'Turn scattered notes into a project',
    intent: 'Turn scattered notes into a project',
    workspace: {
      summary:
        'Your loose notes, clustered and shaped into a project with a clear first move.',
      sources: ['Enchiridion', 'Doblu'],
      cards: [
        { icon: BookOpen, title: 'Enchiridion Path', body: '14 notes clustered into 4 themes' },
        { icon: FolderKanban, title: 'Doblu Project', body: 'A draft structure, ready to name' },
        { icon: Sparkles, title: 'Synthesis', body: 'The 3 strongest notes to build from' },
        { icon: Link2, title: 'Recent Context', body: 'Files and conversations linked in' },
        { icon: ListChecks, title: 'Action Queue', body: 'Cluster → outline → draft' },
      ],
      firstAction: 'Create the project from these clusters',
    },
  },
];

/** Build a believable generic workspace for any typed intent. */
function buildGenericWorkspace(intent: string): Workspace {
  const trimmed = intent.trim().replace(/\s+/g, ' ');
  const short = trimmed.length > 48 ? `${trimmed.slice(0, 45)}…` : trimmed;
  return {
    summary: `A surface assembled around “${short}” — context pulled from across your Ailiur apps.`,
    sources: ['Context Mesh', 'Mytabolism'],
    cards: [
      { icon: Target, title: 'Intent Read', body: `Understood as “${short}”` },
      { icon: Network, title: 'Context Mesh', body: '4 relevant sources connected' },
      { icon: Activity, title: 'Mytabolism Signal', body: 'Queued for your next focus window' },
      { icon: ListChecks, title: 'Action Queue', body: 'Clarify → gather → execute' },
      { icon: Link2, title: 'Recent Context', body: 'Notes, files, and tasks reconnected' },
      { icon: Moon, title: 'Environment', body: 'Tuned to reduce friction' },
    ],
    firstAction: 'Start with the first suggested step',
  };
}

const LOADING_STEPS: { id: string; label: string; ms: number }[] = [
  { id: 'reading', label: 'Reading intent', ms: 720 },
  { id: 'gathering', label: 'Gathering Ailiur context', ms: 880 },
  { id: 'generating', label: 'Generating surface', ms: 820 },
];

/* ── Component ───────────────────────────────────────────────── */

export function IntentSurfaceDemo() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [value, setValue] = useState('');
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loadStep, setLoadStep] = useState(0);
  const [announce, setAnnounce] = useState('');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduce = useReducedMotion();

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const generate = useCallback(
    (ws: Workspace, label: string) => {
      clearTimers();
      setWorkspace(ws);
      setPhase('loading');
      setLoadStep(0);
      setAnnounce(`Forming a surface for: ${label}. ${LOADING_STEPS[0].label}.`);

      let elapsed = 0;
      const speed = reduce ? 0.35 : 1;
      LOADING_STEPS.forEach((step, i) => {
        elapsed += step.ms * speed;
        timers.current.push(
          setTimeout(() => {
            const next = i + 1;
            if (next < LOADING_STEPS.length) {
              setLoadStep(next);
              setAnnounce(LOADING_STEPS[next].label);
            } else {
              setPhase('ready');
              setAnnounce('Surface ready. Review the workspace and execute the first step.');
            }
          }, elapsed),
        );
      });
    },
    [clearTimers, reduce],
  );

  function handlePreset(p: Preset) {
    setValue('');
    generate(p.workspace, p.label);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const intent = value.trim();
    if (!intent) return;
    generate(buildGenericWorkspace(intent), intent);
  }

  function handleExecute() {
    setPhase('done');
    setAnnounce(`Surface ready. First action queued: ${workspace?.firstAction ?? ''}.`);
  }

  function handleReset() {
    clearTimers();
    setPhase('idle');
    setWorkspace(null);
    setLoadStep(0);
    setValue('');
    setAnnounce('Surface dissolved. Choose or type a new intent.');
  }

  function handleInputKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  const busy = phase === 'loading';

  return (
    <section
      aria-label="Intent Surface Demo"
      className="ol-glass-strong relative mx-auto w-full max-w-4xl overflow-hidden rounded-[var(--ol-radius-xl)] p-4 sm:p-6"
    >
      {/* Ambient mesh inside the stage */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            'radial-gradient(ellipse 50% 60% at 18% -5%, rgba(31,168,92,0.16), transparent 60%), radial-gradient(ellipse 45% 55% at 92% 105%, rgba(154,162,178,0.1), transparent 60%)',
        }}
      />

      {/* Stage chrome */}
      <div className="relative mb-4 flex items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ol-red)]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ol-yellow)]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ol-green)]/80" />
        </div>
        <span className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[var(--ol-silver-dim)]">
          Ollune surface · live demo
        </span>
      </div>

      {/* Screen-reader live status */}
      <p className="sr-only" role="status" aria-live="polite">
        {announce}
      </p>

      <div className="relative min-h-[24rem]">
        <AnimatePresence mode="wait">
          {/* ── IDLE ───────────────────────────────────────────── */}
          {phase === 'idle' && (
            <motion.div
              key="idle"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.4, ease: OL_EASE_OUT }}
              className="flex flex-col items-center px-1 py-6 text-center sm:py-8"
            >
              <Orb reduce={!!reduce} />
              <h3 className="mt-7 font-display text-xl font-bold tracking-tight text-[var(--ol-cream)] sm:text-2xl">
                Describe what you’re trying to do.
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--ol-silver)]">
                Ollune reads your intent, gathers context across your Ailiur apps,
                and forms a surface around it.
              </p>

              {/* Command input */}
              <form
                onSubmit={handleSubmit}
                className="mt-6 w-full max-w-md"
                role="search"
                aria-label="Type an intent"
              >
                <div className="ol-glass group flex items-center gap-2 rounded-[var(--ol-radius-lg)] p-1.5 pl-4 transition-colors focus-within:border-[var(--ol-green)]">
                  <CornerDownLeft aria-hidden className="h-4 w-4 shrink-0 text-[var(--ol-green)]" />
                  <label htmlFor="isd-intent" className="sr-only">
                    Describe your intent
                  </label>
                  <input
                    id="isd-intent"
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleInputKey}
                    placeholder="e.g. Prepare for a hard conversation"
                    autoComplete="off"
                    className="min-w-0 flex-1 bg-transparent py-2 text-[15px] text-[var(--ol-cream)] outline-none placeholder:text-[var(--ol-silver-dim)]"
                  />
                  <button
                    type="submit"
                    disabled={!value.trim()}
                    aria-label="Generate surface from typed intent"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--ol-radius-md)] bg-[var(--ol-green)] text-[var(--ol-ink)] shadow-[var(--ol-glow-green)] transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
                  >
                    <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
                  </button>
                </div>
              </form>

              {/* Preset intents */}
              <div className="mt-5 w-full max-w-lg">
                <p className="mb-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--ol-silver-dim)]">
                  Or start from an intent
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handlePreset(p)}
                      className="ol-glass group/preset inline-flex items-center gap-1.5 rounded-[var(--ol-radius-pill)] px-3.5 py-2 text-sm font-medium text-[var(--ol-cream-soft)] transition-all hover:-translate-y-0.5 hover:border-[var(--ol-border-strong)] hover:text-[var(--ol-cream)]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--ol-green)] transition-shadow group-hover/preset:shadow-[0_0_8px_var(--ol-green)]" />
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── LOADING ─────────────────────────────────────────── */}
          {phase === 'loading' && (
            <motion.div
              key="loading"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.4, ease: OL_EASE_OUT }}
              className="flex flex-col items-center px-1 py-10 text-center"
            >
              <Orb reduce={!!reduce} active />

              <ol className="mt-9 w-full max-w-xs space-y-2.5 text-left" aria-hidden>
                {LOADING_STEPS.map((step, i) => {
                  const state = i < loadStep ? 'done' : i === loadStep ? 'active' : 'pending';
                  return (
                    <li key={step.id} className="flex items-center gap-3">
                      <span
                        className={olCn(
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors',
                          state === 'done' &&
                            'border-[var(--ol-green)] bg-[var(--ol-green)] text-[var(--ol-ink)]',
                          state === 'active' &&
                            'border-[var(--ol-green)] text-[var(--ol-green)]',
                          state === 'pending' &&
                            'border-[var(--ol-border)] text-[var(--ol-silver-dim)]',
                        )}
                      >
                        {state === 'done' ? (
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        ) : state === 'active' ? (
                          <motion.span
                            className="h-2.5 w-2.5 rounded-full bg-[var(--ol-green)]"
                            animate={reduce ? undefined : { scale: [1, 0.6, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-current opacity-50" />
                        )}
                      </span>
                      <span
                        className={olCn(
                          'text-sm font-medium transition-colors',
                          state === 'pending' ? 'text-[var(--ol-silver-dim)]' : 'text-[var(--ol-cream)]',
                        )}
                      >
                        {step.label}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </motion.div>
          )}

          {/* ── READY / DONE ───────────────────────────────────── */}
          {(phase === 'ready' || phase === 'done') && workspace && (
            <motion.div
              key="ready"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0 }}
              transition={{ duration: 0.45, ease: OL_EASE_OUT }}
              className="px-1 py-2"
            >
              {/* Summary + sources */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--ol-green)]">
                    Surface generated
                  </p>
                  <p className="mt-1.5 max-w-xl text-[15px] leading-relaxed text-[var(--ol-cream)]">
                    {workspace.summary}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-[var(--ol-radius-pill)] px-3 py-1.5 text-xs font-medium text-[var(--ol-silver)] transition-colors hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--ol-cream)]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  New intent
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[var(--ol-silver-dim)]">
                  Context from
                </span>
                {workspace.sources.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-[var(--ol-radius-pill)] border border-[var(--ol-border)] bg-[rgba(255,255,255,0.04)] px-2.5 py-1 text-xs font-medium text-[var(--ol-cream-soft)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--ol-green)]" />
                    {s}
                  </span>
                ))}
              </div>

              {/* Cards — materialize with stagger */}
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {workspace.cards.map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={
                      reduce ? false : { opacity: 0, y: 14, scale: 0.96, filter: 'blur(6px)' }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.5, ease: OL_EASE_OUT, delay: 0.05 + i * 0.07 }}
                    className="ol-glass group/card rounded-[var(--ol-radius-lg)] p-4 transition-colors hover:border-[var(--ol-border-strong)]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-[var(--ol-radius-sm)] bg-[rgba(81,201,143,0.12)] text-[var(--ol-green)] transition-transform group-hover/card:scale-105">
                      <card.icon className="h-4.5 w-4.5" />
                    </span>
                    <p className="mt-3 text-sm font-semibold text-[var(--ol-cream)]">{card.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-[var(--ol-silver)]">
                      {card.body}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Recommended first action */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: OL_EASE_OUT,
                  delay: 0.05 + workspace.cards.length * 0.07,
                }}
                className="ol-glass-strong mt-3 flex flex-col gap-3 rounded-[var(--ol-radius-lg)] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--ol-silver-dim)]">
                    Recommended first step
                  </p>
                  <p className="mt-0.5 font-display text-lg font-bold tracking-tight text-[var(--ol-cream)]">
                    {workspace.firstAction}
                  </p>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  {phase === 'ready' ? (
                    <motion.button
                      key="execute"
                      type="button"
                      onClick={handleExecute}
                      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25, ease: OL_EASE_OUT }}
                      className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-[var(--ol-radius-pill)] bg-[var(--ol-green)] px-5 py-3 text-sm font-semibold text-[var(--ol-ink)] shadow-[var(--ol-glow-green)] transition-transform hover:-translate-y-0.5"
                    >
                      Execute first step
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </motion.button>
                  ) : (
                    <motion.div
                      key="queued"
                      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, ease: OL_EASE_OUT }}
                      className="inline-flex shrink-0 items-center gap-2 rounded-[var(--ol-radius-pill)] border border-[var(--ol-green)]/40 bg-[rgba(81,201,143,0.12)] px-5 py-3 text-sm font-semibold text-[var(--ol-green-soft)]"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--ol-green)] text-[var(--ol-ink)]">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      Surface ready. First action queued.
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="relative mt-5 text-center text-xs text-[var(--ol-silver-dim)]">
        {busy
          ? 'Composing your surface…'
          : 'A live, frontend-only demo — intent becomes context becomes interface.'}
      </p>
    </section>
  );
}

/* ── Glowing orb / mesh for empty + loading states ───────────── */

function Orb({ active, reduce }: { active?: boolean; reduce: boolean }) {
  return (
    <div className="relative flex h-24 w-24 items-center justify-center" aria-hidden>
      {!reduce &&
        [0, 1].map((ring) => (
          <motion.span
            key={ring}
            className="absolute rounded-full border border-[var(--ol-green)]/30"
            initial={{ width: 56, height: 56, opacity: 0.5 }}
            animate={{
              width: [56, 96],
              height: [56, 96],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: active ? 1.6 : 2.4,
              repeat: Infinity,
              ease: 'easeOut',
              delay: ring * (active ? 0.8 : 1.2),
            }}
          />
        ))}
      <motion.span
        className="h-14 w-14 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 35% 30%, var(--ol-green-soft), var(--ol-green-deep) 70%)',
          boxShadow: '0 0 40px rgba(81,201,143,0.5), inset 0 0 16px rgba(255,255,255,0.2)',
        }}
        animate={reduce ? undefined : { scale: active ? [1, 1.08, 1] : [1, 1.04, 1] }}
        transition={{ duration: active ? 1.4 : 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
