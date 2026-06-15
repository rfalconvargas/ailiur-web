'use client';

import { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import {
  Wand2,
  Sparkles,
  Activity,
  AudioLines,
  Layers,
  Film,
  Gauge,
  Heart,
  Loader2,
  type LucideIcon,
} from 'lucide-react';
import { TZ_EASE_OUT, tzCn } from './utils';

/* ────────────────────────────────────────────────────────────────────────────
 * Tayzt Atmosphere Lab — frontend-only landing-page demo.
 *
 * The user picks a raw-footage scenario + a taste profile, tunes two emotional
 * sliders, optionally enables a (mocked) creative-state read, and generates a
 * "treatment". Everything is deterministic template logic — no upload, no AI
 * call, no backend. The goal is a convincing 30–90s magic moment.
 * ──────────────────────────────────────────────────────────────────────────── */

type ScenarioId = 'rainy-street' | 'desk-product' | 'paleoart' | 'music-video';
type TasteId = 'ritual-cinematic' | 'soft-documentary' | 'electric-editorial' | 'analog-dream';
type Status = 'empty' | 'loading' | 'success';

type Scenario = {
  id: ScenarioId;
  label: string;
  footage: string;
  sound: string;
  pacing: string;
};

type Taste = {
  id: TasteId;
  label: string;
  soundChar: string;
  overlay: string;
  color: string;
  pacingChar: string;
  feelingWords: string[];
};

const SCENARIOS: Scenario[] = [
  {
    id: 'rainy-street',
    label: 'Rainy street vlog',
    footage: 'Handheld, rain-flecked lens, neon reflections sliding across wet asphalt.',
    sound: 'rain ticking on pavement, distant tire wash, a passing umbrella',
    pacing: 'long lens drifts between puddles',
  },
  {
    id: 'desk-product',
    label: 'Desk setup product shot',
    footage: 'Locked-off macro, a slow push across keys and the grain of the desk.',
    sound: 'close room tone, soft keystroke clicks, the low hum of a monitor',
    pacing: 'patient macro holds and one slow reveal',
  },
  {
    id: 'paleoart',
    label: 'Paleoart process clip',
    footage: 'Overhead of pigment and pencil, a hand entering frame mid-stroke.',
    sound: 'pencil scratch, brush drag, quiet studio air',
    pacing: 'time-lapse swells between still holds',
  },
  {
    id: 'music-video',
    label: 'Music video fragment',
    footage: 'Strobe-lit performer, motion blur, quick reframes off the beat.',
    sound: 'sub-bass pulse, tape hiss, chopped vocal fragments',
    pacing: 'cuts on the kick, whip-pans between angles',
  },
];

const TASTES: Taste[] = [
  {
    id: 'ritual-cinematic',
    label: 'Ritual cinematic',
    soundChar: 'a deep drone and a single struck bell at the transition',
    overlay: 'thin gold ritual marks and a vignette that breathes with the frame',
    color: 'deep teal shadows, candle-warm highlights, gentle filmic roll-off',
    pacingChar: 'ceremonial holds — nothing rushed',
    feelingWords: ['reverent', 'composed', 'cinematic'],
  },
  {
    id: 'soft-documentary',
    label: 'Soft documentary',
    soundChar: 'warm room tone and breath-close foley',
    overlay: 'almost none — a faint lower-third hairline and a single green signal cue',
    color: 'natural skin, softly lifted blacks, honest daylight',
    pacingChar: 'observational — let moments land',
    feelingWords: ['honest', 'gentle', 'present'],
  },
  {
    id: 'electric-editorial',
    label: 'Electric editorial',
    soundChar: 'tight transient clicks and filtered synth stabs',
    overlay: 'kinetic type and hard red / yellow signal pulses on the accents',
    color: 'punchy contrast, cooled mids, clean specular highlights',
    pacingChar: 'snappy and beat-locked',
    feelingWords: ['sharp', 'modern', 'confident'],
  },
  {
    id: 'analog-dream',
    label: 'Analog dream',
    soundChar: 'low vinyl air, soft cloth movement, a single glass chime at the transition',
    overlay: 'translucent cream glyphs, slow hand-drawn contour lines, subtle red / yellow signal pulses',
    color: 'muted grain, warm shadows, a slight edge bloom',
    pacingChar: 'dreamlike — cut on breath instead of beat',
    feelingWords: ['intimate', 'intelligent', 'slightly haunted', 'handmade'],
  },
];

const LOADING_STEPS = [
  'Reading footage rhythm…',
  'Matching taste graph…',
  'Tuning atmosphere…',
  'Building timeline treatment…',
] as const;

type CreativeState = 'reflective' | 'focused' | 'restless';

function creativeStateFor(eq: number): CreativeState {
  if (eq > 66) return 'restless';
  if (eq < 34) return 'reflective';
  return 'focused';
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** Deterministic treatment generator — pure function of the control state. */
function buildTreatment(args: {
  scenario: Scenario;
  taste: Taste;
  eq: number;
  texture: number;
  biometric: boolean;
}) {
  const { scenario, taste, eq, texture, biometric } = args;
  const creative = creativeStateFor(eq);

  const eqBand = eq > 66 ? 'charged' : eq < 34 ? 'calm' : 'balanced';
  const texBand = texture > 66 ? 'heavy' : texture < 34 ? 'clean' : 'tactile';

  const eqSound =
    eqBand === 'charged'
      ? 'Pushed forward with rhythmic urgency.'
      : eqBand === 'calm'
        ? 'Kept sparse and patient.'
        : 'Layered with restraint.';

  const texOverlay =
    texBand === 'heavy'
      ? ', dense and physical across the frame'
      : texBand === 'clean'
        ? ', kept minimal and crisp'
        : ', layered lightly over the image';

  const texColor =
    texBand === 'heavy'
      ? 'Heavy grain and halation — almost tactile.'
      : texBand === 'clean'
        ? 'Grain dialed back to a whisper.'
        : 'A visible film grain rides the image.';

  const eqPacing =
    eqBand === 'charged'
      ? 'Trim 2–3 frames off every cut and ride the energy.'
      : eqBand === 'calm'
        ? 'Hold the first shot ~0.8s longer; breathe between cuts.'
        : 'Keep an even cadence and let the rhythm settle.';

  const biometricClause = biometric ? ` Tuned to a ${creative} creative state.` : '';

  const eqFeeling =
    eqBand === 'charged' ? 'propulsive' : eqBand === 'calm' ? 'unhurried' : 'assured';
  const feelingWords = [...taste.feelingWords, eqFeeling];

  return {
    header: `${taste.label} / ${eq}% Emotional EQ`,
    sound: `${cap(scenario.sound)}, with ${taste.soundChar}. ${eqSound}`,
    overlay: `${cap(taste.overlay)}${texOverlay}.`,
    texture: `${taste.color}. ${texColor}`,
    pacing: `${cap(scenario.pacing)}; ${taste.pacingChar}. ${eqPacing}${biometricClause}`,
    feeling: `${cap(feelingWords.join(', '))}.`,
    creative,
  };
}

/* ── Mock timeline layers ─────────────────────────────────────────────────── */

type Track = { key: string; label: string; color: string; segments: number[] };

const TRACKS: Track[] = [
  { key: 'footage', label: 'Footage', color: 'var(--tz-cream-soft)', segments: [24, 18, 30, 20] },
  { key: 'sound', label: 'Sound', color: 'var(--tz-gold)', segments: [12, 9, 14, 8, 12, 10, 16] },
  { key: 'overlay', label: 'Overlay', color: 'var(--tz-green)', segments: [40, 28, 20] },
  { key: 'texture', label: 'Texture', color: 'var(--tz-amber)', segments: [96] },
  { key: 'pacing', label: 'Pacing', color: 'var(--tz-red)', segments: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6] },
];

export function TayztAtmosphereLab() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>('rainy-street');
  const [tasteId, setTasteId] = useState<TasteId>('analog-dream');
  const [eq, setEq] = useState(72);
  const [texture, setTexture] = useState(58);
  const [biometric, setBiometric] = useState(false);
  const [status, setStatus] = useState<Status>('empty');
  const [loadingStep, setLoadingStep] = useState(0);

  const reduced = useReducedMotion();

  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;
  const taste = TASTES.find((t) => t.id === tasteId)!;
  const treatment = buildTreatment({ scenario, taste, eq, texture, biometric });

  // Drive the loading sequence, then resolve to success. Timers are cleaned up
  // on unmount or if the status changes mid-flight.
  useEffect(() => {
    if (status !== 'loading') return;
    const stepMs = reduced ? 120 : 300;
    const timers = LOADING_STEPS.map((_, i) =>
      setTimeout(() => setLoadingStep(i), i * stepMs),
    );
    const done = setTimeout(() => setStatus('success'), LOADING_STEPS.length * stepMs + 140);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [status, reduced]);

  function generate() {
    if (status === 'loading') return;
    setLoadingStep(0);
    setStatus('loading');
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-8">
      {/* ── Control surface ──────────────────────────────────────────────── */}
      <div className="tz-glass rounded-[var(--tz-radius-xl)] p-5 sm:p-7">
        <div className="flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--tz-gold)]">
          <Wand2 className="h-3.5 w-3.5" aria-hidden />
          Direction
        </div>

        <Field label="Raw clip">
          <ChipRow>
            {SCENARIOS.map((s) => (
              <Chip key={s.id} active={scenarioId === s.id} onClick={() => setScenarioId(s.id)}>
                {s.label}
              </Chip>
            ))}
          </ChipRow>
        </Field>

        <Field label="Taste profile">
          <ChipRow>
            {TASTES.map((t) => (
              <Chip key={t.id} active={tasteId === t.id} onClick={() => setTasteId(t.id)}>
                {t.label}
              </Chip>
            ))}
          </ChipRow>
        </Field>

        <Field label="Emotional EQ">
          <Slider value={eq} onChange={setEq} leftLabel="Calm" rightLabel="Charged" ariaLabel="Emotional EQ" />
        </Field>

        <Field label="Texture">
          <Slider value={texture} onChange={setTexture} leftLabel="Clean" rightLabel="Textured" ariaLabel="Texture" />
        </Field>

        {/* Mock biometric toggle */}
        <div className="mt-7 rounded-[var(--tz-radius-md)] border border-[var(--tz-hairline)] bg-[var(--tz-surface-muted)] p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-[0.875rem] font-medium text-[var(--tz-cream-soft)]">
              <Activity className="h-4 w-4 text-[var(--tz-graphite)]" aria-hidden />
              Use mock creative state
            </span>
            <Toggle on={biometric} onClick={() => setBiometric((v) => !v)} label="Use mock creative state" />
          </div>
          <p className="mt-2 text-[0.6875rem] leading-relaxed text-[var(--tz-graphite-dim)]">
            Biometric creative state is a future opt-in concept. This demo uses mock state only.
          </p>
          <AnimatePresence initial={false}>
            {biometric && (
              <motion.div
                initial={reduced ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={reduced ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: TZ_EASE_OUT }}
                className="overflow-hidden"
              >
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-[var(--tz-radius-pill)] border border-[color-mix(in_srgb,var(--tz-green)_45%,transparent)] bg-[color-mix(in_srgb,var(--tz-green)_12%,transparent)] px-3 py-1 text-[0.8125rem] font-medium text-[var(--tz-cream)]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--tz-green)]" aria-hidden />
                    Creative state: {treatment.creative}
                  </span>
                  <span className="text-[0.6875rem] text-[var(--tz-graphite-dim)]">mock signal</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={generate}
          disabled={status === 'loading'}
          className={tzCn(
            'group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[var(--tz-radius-pill)]',
            'bg-[var(--tz-cream)] px-6 py-3.5 text-sm font-semibold text-[var(--tz-ink)]',
            'transition-transform hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-70',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--tz-gold)]',
          )}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Generating…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" aria-hidden />
              {status === 'success' ? 'Regenerate treatment' : 'Generate Tayzt Treatment'}
            </>
          )}
        </button>
      </div>

      {/* ── Result stage ─────────────────────────────────────────────────── */}
      <div className="tz-glass-strong relative min-h-[26rem] overflow-hidden rounded-[var(--tz-radius-xl)] p-5 sm:p-7">
        {status === 'empty' && <EmptyState reduced={!!reduced} />}
        {status === 'loading' && <LoadingState step={loadingStep} reduced={!!reduced} />}
        {status === 'success' && <SuccessState treatment={treatment} reduced={!!reduced} />}
      </div>
    </div>
  );
}

/* ── Result states ────────────────────────────────────────────────────────── */

function EmptyState({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-[var(--tz-radius-lg)] border border-[var(--tz-hairline)] bg-[var(--tz-surface-muted)] text-[var(--tz-gold)]">
        <Wand2 className="h-6 w-6" strokeWidth={1.5} aria-hidden />
      </span>
      <p className="mt-5 font-display text-xl font-bold text-[var(--tz-cream)]">
        Choose a clip and tune the feeling.
      </p>
      <p className="mt-2 max-w-xs text-[0.875rem] leading-relaxed text-[var(--tz-graphite)]">
        Set a scenario, a taste profile, and the emotional dials — then generate a treatment.
      </p>
    </motion.div>
  );
}

function LoadingState({ step, reduced }: { step: number; reduced: boolean }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex h-full min-h-[24rem] flex-col justify-center"
    >
      <ol className="mx-auto w-full max-w-sm space-y-3" role="list">
        {LOADING_STEPS.map((label, i) => {
          const state = i < step ? 'done' : i === step ? 'active' : 'pending';
          return (
            <li
              key={label}
              className={tzCn(
                'flex items-center gap-3 text-[0.9375rem] transition-colors duration-300',
                state === 'pending' && 'text-[var(--tz-graphite-dim)]',
                state === 'active' && 'text-[var(--tz-cream)]',
                state === 'done' && 'text-[var(--tz-graphite)]',
              )}
            >
              <span
                className={tzCn(
                  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                  state === 'done'
                    ? 'border-[var(--tz-green)] text-[var(--tz-green)]'
                    : state === 'active'
                      ? 'border-[var(--tz-gold)] text-[var(--tz-gold)]'
                      : 'border-[var(--tz-hairline)]',
                )}
                aria-hidden
              >
                {state === 'done' ? (
                  <span className="text-[0.625rem]">✓</span>
                ) : state === 'active' ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <span className="h-1 w-1 rounded-full bg-[var(--tz-graphite-dim)]" />
                )}
              </span>
              {label}
            </li>
          );
        })}
      </ol>
    </motion.div>
  );
}

function SuccessState({
  treatment,
  reduced,
}: {
  treatment: ReturnType<typeof buildTreatment>;
  reduced: boolean;
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: TZ_EASE_OUT }}
    >
      {/* Treatment header */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--tz-gold)]">
          Treatment
        </span>
        <span className="h-px flex-1 bg-[var(--tz-hairline)]" aria-hidden />
        <span className="font-display text-sm font-bold text-[var(--tz-cream)]">
          {treatment.header}
        </span>
      </div>

      {/* Mock timeline */}
      <Timeline reduced={reduced} />

      {/* Output cards */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <OutputCard icon={AudioLines} title="Sound design" signal="var(--tz-gold)" body={treatment.sound} delay={0.05} reduced={reduced} />
        <OutputCard icon={Layers} title="Abstract overlay" signal="var(--tz-green)" body={treatment.overlay} delay={0.1} reduced={reduced} />
        <OutputCard icon={Film} title="Texture / color mood" signal="var(--tz-amber)" body={treatment.texture} delay={0.15} reduced={reduced} />
        <OutputCard icon={Gauge} title="Pacing direction" signal="var(--tz-red)" body={treatment.pacing} delay={0.2} reduced={reduced} />
        <OutputCard icon={Heart} title="Viewer feeling" signal="var(--tz-cream)" body={treatment.feeling} delay={0.25} reduced={reduced} className="sm:col-span-2" />
      </div>
    </motion.div>
  );
}

function Timeline({ reduced }: { reduced: boolean }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-[var(--tz-radius-md)] border border-[var(--tz-hairline)] bg-[var(--tz-surface-muted)] p-4">
      <div className="min-w-[22rem] space-y-2.5">
        {TRACKS.map((track, ti) => (
          <div key={track.key} className="flex items-center gap-3">
            <span className="w-16 shrink-0 text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-[var(--tz-graphite)]">
              {track.label}
            </span>
            <div className="flex h-3 flex-1 items-center gap-[3px]">
              {track.segments.map((w, si) => (
                <motion.span
                  key={si}
                  className="h-full rounded-[3px]"
                  style={{ width: `${w}%`, background: track.color, opacity: 0.85, transformOrigin: 'left' }}
                  initial={reduced ? false : { scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 0.85 }}
                  transition={{
                    duration: 0.45,
                    ease: TZ_EASE_OUT,
                    delay: reduced ? 0 : ti * 0.09 + si * 0.03,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OutputCard({
  icon: Icon,
  title,
  signal,
  body,
  delay,
  reduced,
  className,
}: {
  icon: LucideIcon;
  title: string;
  signal: string;
  body: string;
  delay: number;
  reduced: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: TZ_EASE_OUT, delay: reduced ? 0 : delay }}
      className={tzCn(
        'rounded-[var(--tz-radius-md)] border border-[var(--tz-hairline)] bg-[var(--tz-glass-bg)] p-4',
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" style={{ color: signal }} strokeWidth={1.75} aria-hidden />
        <h4 className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--tz-graphite)]">
          {title}
        </h4>
      </div>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--tz-cream-soft)]">{body}</p>
    </motion.div>
  );
}

/* ── Control primitives ───────────────────────────────────────────────────── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-7">
      <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[var(--tz-graphite-dim)]">
        {label}
      </p>
      {children}
    </div>
  );
}

function ChipRow({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-2">{children}</div>;
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
      onClick={onClick}
      aria-pressed={active}
      className={tzCn(
        'rounded-[var(--tz-radius-pill)] border px-3.5 py-1.5 text-[0.8125rem] font-medium transition-colors duration-200',
        active
          ? 'border-[color-mix(in_srgb,var(--tz-gold)_60%,transparent)] bg-[color-mix(in_srgb,var(--tz-gold)_18%,var(--tz-charcoal))] text-[var(--tz-cream)]'
          : 'border-[var(--tz-border)] text-[var(--tz-graphite)] hover:border-[var(--tz-border-strong)] hover:text-[var(--tz-cream)]',
      )}
    >
      {children}
    </button>
  );
}

function Slider({
  value,
  onChange,
  leftLabel,
  rightLabel,
  ariaLabel,
}: {
  value: number;
  onChange: (v: number) => void;
  leftLabel: string;
  rightLabel: string;
  ariaLabel: string;
}) {
  return (
    <div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        aria-label={ariaLabel}
        aria-valuetext={`${value}%`}
        onChange={(e) => onChange(Number(e.target.value))}
        className="tz-range"
        style={{ '--tz-fill': `${value}%` } as React.CSSProperties}
      />
      <div className="mt-1.5 flex items-center justify-between text-[0.6875rem] text-[var(--tz-graphite)]">
        <span>{leftLabel}</span>
        <span className="font-semibold text-[var(--tz-cream)]">{value}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

function Toggle({ on, onClick, label }: { on: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onClick}
      className={tzCn(
        'relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-200',
        on
          ? 'border-[color-mix(in_srgb,var(--tz-green)_55%,transparent)] bg-[color-mix(in_srgb,var(--tz-green)_30%,var(--tz-charcoal))]'
          : 'border-[var(--tz-border)] bg-[var(--tz-surface-muted)]',
      )}
    >
      <span
        className={tzCn(
          'absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full transition-all duration-200',
          on ? 'left-[calc(100%-1.25rem)] bg-[var(--tz-green)]' : 'left-1 bg-[var(--tz-graphite)]',
        )}
        aria-hidden
      />
    </button>
  );
}
