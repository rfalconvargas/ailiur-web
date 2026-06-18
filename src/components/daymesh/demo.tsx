'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, FlaskConical, TrendingUp, Lock, Play, Pause } from 'lucide-react';
import { WEEK, FILTERS, PATTERN, zoneFor, type FilterKey, type Day, type Moment } from '@/lib/daymesh/data';
import { MOMENT_META } from './moment-meta';
import { DaymeshReveal } from './reveal';
import { DM_EASE_OUT, DM_ZONE_COLOR, dmCn } from './utils';

/* ── Metric display config ─────────────────────────────────────── */
const METRICS: { key: keyof Day['bio']; label: string; unit: string; max: number }[] = [
  { key: 'recovery', label: 'Recovery', unit: '%', max: 100 },
  { key: 'sleep', label: 'Sleep', unit: '', max: 100 },
  { key: 'hrv', label: 'HRV', unit: 'ms', max: 120 },
  { key: 'rhr', label: 'Resting HR', unit: 'bpm', max: 80 },
  { key: 'strain', label: 'Strain', unit: '', max: 21 },
  { key: 'energy', label: 'Energy', unit: '%', max: 100 },
];

const PLAY_MS = 1500;

export function DaymeshDemo() {
  const [selected, setSelected] = useState(2); // start on Wednesday — the crash day tells the story
  const [filters, setFilters] = useState<Set<FilterKey>>(new Set());
  const [playing, setPlaying] = useState(false);

  // Auto-advance through the week, then stop at Sunday.
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setSelected((s) => {
        if (s >= WEEK.length - 1) {
          setPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, PLAY_MS);
    return () => clearInterval(id);
  }, [playing]);

  const activeTypes = useMemo(() => {
    if (filters.size === 0) return null;
    const set = new Set<string>();
    FILTERS.filter((f) => filters.has(f.key)).forEach((f) => f.types.forEach((t) => set.add(t)));
    return set;
  }, [filters]);

  const day = WEEK[selected];

  function selectDay(i: number) {
    setPlaying(false); // manual interaction stops playback
    setSelected(i);
  }

  function togglePlay() {
    if (!playing && selected >= WEEK.length - 1) setSelected(0); // replay from start
    setPlaying((p) => !p);
  }

  function toggleFilter(key: FilterKey) {
    setFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="mt-10">
      {/* Pattern-found card */}
      <DaymeshReveal>
        <div className="dm-glass-strong relative overflow-hidden rounded-[var(--dm-radius-xl)] p-5 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--dm-radius-md)] bg-[rgba(207,138,51,0.14)] text-[var(--dm-amber-deep)]">
              <TrendingUp className="h-6 w-6" />
            </span>
            <div className="flex-1">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--dm-amber-deep)]">
                {PATTERN.title}
              </span>
              <p className="mt-1.5 font-display text-lg font-bold leading-snug text-[var(--dm-ink)] sm:text-xl">
                {PATTERN.body}
              </p>
              <p className="mt-1.5 text-[length:var(--dm-text-small)] text-[var(--dm-muted)]">
                {PATTERN.detail}
              </p>
            </div>
          </div>
        </div>
      </DaymeshReveal>

      {/* Timeline */}
      <DaymeshReveal delay={0.05}>
        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--dm-muted)]">
                Your week
              </span>
              <button
                type="button"
                onClick={togglePlay}
                aria-pressed={playing}
                className="inline-flex items-center gap-1.5 rounded-[var(--dm-radius-pill)] border border-[var(--dm-border)] bg-[var(--dm-surface)] px-3 py-1 text-[0.78rem] font-semibold text-[var(--dm-ink)] shadow-[var(--dm-shadow-sm)] transition-all hover:-translate-y-0.5"
              >
                {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {playing ? 'Pause' : 'Play the week'}
              </button>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[0.72rem] text-[var(--dm-muted)]">
              <Lock className="h-3 w-3" /> On-device<span className="hidden sm:inline"> · 0 uploaded</span>
            </span>
          </div>
          <div className="grid grid-cols-7 gap-1.5 sm:gap-3">
            {WEEK.map((d, i) => (
              <DayTab
                key={d.id}
                day={d}
                active={i === selected}
                flagged={hasType(d, activeTypes)}
                onClick={() => selectDay(i)}
              />
            ))}
          </div>
          <p className="mt-2 px-1 text-[0.72rem] text-[var(--dm-faint)]">
            Tap any day to see the body and the life behind it.
          </p>
        </div>
      </DaymeshReveal>

      {/* Filters */}
      <DaymeshReveal delay={0.08}>
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--dm-muted)]">
              Filter context
            </span>
            {filters.size > 0 && (
              <button
                type="button"
                onClick={() => setFilters(new Set())}
                className="text-sm font-medium text-[var(--dm-muted)] underline-offset-2 hover:underline"
              >
                Clear
              </button>
            )}
          </div>
          <div className="dm-no-scrollbar flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
            {FILTERS.map((f) => {
              const on = filters.has(f.key);
              return (
                <button
                  key={f.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleFilter(f.key)}
                  className={dmCn(
                    'shrink-0 rounded-[var(--dm-radius-pill)] border px-3.5 py-1.5 text-sm font-medium transition-all',
                    on
                      ? 'border-transparent bg-[var(--dm-ink)] text-[var(--dm-bg)] shadow-[var(--dm-shadow-sm)]'
                      : 'border-[var(--dm-border)] bg-[var(--dm-glass-bg)] text-[var(--dm-ink-soft)] hover:border-[var(--dm-border-strong)]',
                  )}
                >
                  {f.key}
                </button>
              );
            })}
          </div>
        </div>
      </DaymeshReveal>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={day.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: DM_EASE_OUT }}
          className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_1fr]"
        >
          {/* Left: biometrics + moments */}
          <div className="grid gap-5">
            <BioSummary day={day} />
            <MomentsList day={day} activeTypes={activeTypes} />
          </div>

          {/* Right: insight + experiment */}
          <div className="grid content-start gap-5">
            <InsightCard day={day} />
            <ExperimentCard day={day} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── Day tab with recovery ring ────────────────────────────────── */
function DayTab({
  day,
  active,
  flagged,
  onClick,
}: {
  day: Day;
  active: boolean;
  flagged: boolean;
  onClick: () => void;
}) {
  const zone = zoneFor(day.bio.recovery);
  const color = DM_ZONE_COLOR[zone];
  const r = 15;
  const c = 2 * Math.PI * r;
  const pct = day.bio.recovery / 100;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={`${day.full}, recovery ${day.bio.recovery}%`}
      className={dmCn(
        'group relative flex flex-col items-center gap-1.5 rounded-[var(--dm-radius-md)] border px-1 py-2.5 transition-all sm:py-3',
        active
          ? 'border-transparent bg-[var(--dm-surface)] shadow-[var(--dm-shadow-md)] ring-1 ring-[var(--dm-border-strong)]'
          : 'border-[var(--dm-border)] bg-[var(--dm-glass-bg)] hover:-translate-y-0.5 hover:border-[var(--dm-border-strong)]',
      )}
    >
      {flagged && (
        <span
          className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--dm-amber)]"
          aria-hidden
        />
      )}
      <span className="text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-[var(--dm-muted)]">
        {day.short}
      </span>
      <span className="relative flex h-[40px] w-[40px] items-center justify-center">
        <svg className="absolute inset-0 -rotate-90" viewBox="0 0 40 40" aria-hidden>
          <circle cx="20" cy="20" r={r} fill="none" stroke="var(--dm-hairline)" strokeWidth="3.5" />
          <circle
            cx="20"
            cy="20"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct)}
          />
        </svg>
        <span className="font-display text-[0.82rem] font-bold" style={{ color }}>
          {day.bio.recovery}
        </span>
      </span>
    </button>
  );
}

/* ── Biometric summary ─────────────────────────────────────────── */
function BioSummary({ day }: { day: Day }) {
  const zone = zoneFor(day.bio.recovery);
  return (
    <div className="dm-solid rounded-[var(--dm-radius-lg)] p-5">
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-lg font-bold text-[var(--dm-ink)]">{day.full}</h3>
        <span
          className="rounded-[var(--dm-radius-pill)] px-2.5 py-0.5 text-[0.7rem] font-semibold"
          style={{ color: DM_ZONE_COLOR[zone], background: 'var(--dm-bg)' }}
        >
          {zone === 'high' ? 'In the green' : zone === 'mid' ? 'Moderate' : 'Run-down'}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {METRICS.map((m) => {
          const value = day.bio[m.key];
          const pct = Math.min(1, value / m.max);
          const barColor =
            m.key === 'recovery' || m.key === 'sleep' || m.key === 'energy'
              ? DM_ZONE_COLOR[zoneFor(value)]
              : 'var(--dm-amber)';
          return (
            <div
              key={m.key}
              className="rounded-[var(--dm-radius-sm)] border border-[var(--dm-hairline)] bg-[var(--dm-bg)] px-3 py-2.5"
            >
              <span className="text-[0.66rem] font-medium uppercase tracking-[0.08em] text-[var(--dm-muted)]">
                {m.label}
              </span>
              <div className="mt-0.5 font-display text-xl font-bold text-[var(--dm-ink)]">
                {value}
                <span className="ml-0.5 text-[0.62rem] font-medium text-[var(--dm-faint)]">{m.unit}</span>
              </div>
              <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-[var(--dm-hairline)]">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: barColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct * 100}%` }}
                  transition={{ duration: 0.6, ease: DM_EASE_OUT }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Camera-roll moments ───────────────────────────────────────── */
function MomentsList({ day, activeTypes }: { day: Day; activeTypes: Set<string> | null }) {
  return (
    <div className="dm-solid rounded-[var(--dm-radius-lg)] p-5">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[var(--dm-amber-deep)]" />
        <h3 className="font-display text-base font-bold text-[var(--dm-ink)]">Camera-roll moments</h3>
        <span className="ml-auto text-[0.7rem] text-[var(--dm-muted)]">{day.moments.length} today</span>
      </div>
      <ul className="mt-3 grid gap-2" role="list">
        {day.moments.map((m) => (
          <MomentRow key={`${m.time}-${m.label}`} m={m} dimmed={!!activeTypes && !activeTypes.has(m.type)} />
        ))}
      </ul>
    </div>
  );
}

function MomentRow({ m, dimmed }: { m: Moment; dimmed: boolean }) {
  const meta = MOMENT_META[m.type];
  const Icon = meta.icon;
  const highlight = m.driver && !dimmed;
  return (
    <li
      className={dmCn(
        'flex items-center gap-3 rounded-[var(--dm-radius-sm)] border px-3 py-2.5 transition-all duration-300',
        highlight ? 'dm-driver' : 'border-[var(--dm-hairline)] bg-[var(--dm-bg)]',
        dimmed && 'opacity-35',
      )}
    >
      <span className="w-10 shrink-0 text-[0.72rem] font-semibold tabular-nums text-[var(--dm-muted)]">
        {m.time}
      </span>
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px]"
        style={{ background: meta.tint, color: meta.color }}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[0.9rem] font-semibold text-[var(--dm-ink)]">{m.label}</span>
        <span className="block truncate text-[0.74rem] text-[var(--dm-muted)]">{m.note}</span>
      </span>
      {highlight && (
        <span className="hidden shrink-0 items-center gap-1 rounded-[var(--dm-radius-pill)] bg-[rgba(207,138,51,0.16)] px-2 py-0.5 text-[0.62rem] font-semibold text-[var(--dm-amber-deep)] sm:inline-flex">
          <Sparkles className="h-3 w-3" /> shaped today
        </span>
      )}
    </li>
  );
}

/* ── Insight ───────────────────────────────────────────────────── */
function InsightCard({ day }: { day: Day }) {
  const driverCount = day.moments.filter((m) => m.driver).length;
  return (
    <div className="rounded-[var(--dm-radius-lg)] border border-[var(--dm-border)] bg-[linear-gradient(160deg,rgba(207,138,51,0.08),rgba(122,168,134,0.06))] p-5 shadow-[var(--dm-shadow-sm)]">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-[var(--dm-surface)] text-[var(--dm-amber-deep)] shadow-[var(--dm-shadow-sm)]">
          <Sparkles className="h-4 w-4" />
        </span>
        <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--dm-amber-deep)]">
          What Daymesh noticed
        </h3>
      </div>
      <p className="mt-3 text-[0.98rem] leading-relaxed text-[var(--dm-ink)]">{day.insight}</p>
      <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.72rem] text-[var(--dm-muted)]">
        {driverCount > 0 && (
          <span className="font-medium text-[var(--dm-amber-deep)]">
            Built from {driverCount} highlighted moment{driverCount > 1 ? 's' : ''}.
          </span>
        )}
        <span>A correlation, not a diagnosis.</span>
      </p>
    </div>
  );
}

/* ── Experiment ────────────────────────────────────────────────── */
function ExperimentCard({ day }: { day: Day }) {
  return (
    <div className="dm-solid rounded-[var(--dm-radius-lg)] p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-[rgba(93,138,107,0.14)] text-[var(--dm-sage-deep)]">
          <FlaskConical className="h-4 w-4" />
        </span>
        <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--dm-sage-deep)]">
          A gentle experiment
        </h3>
      </div>
      <p className="mt-3 text-[0.98rem] leading-relaxed text-[var(--dm-ink-soft)]">{day.experiment}</p>
      <span className="mt-4 inline-flex items-center gap-2 rounded-[var(--dm-radius-pill)] border border-[var(--dm-border)] bg-[var(--dm-bg)] px-3 py-1.5 text-[0.74rem] font-medium text-[var(--dm-muted)]">
        Optional · for tomorrow
      </span>
    </div>
  );
}

/* ── helpers ───────────────────────────────────────────────────── */
function hasType(day: Day, activeTypes: Set<string> | null): boolean {
  if (!activeTypes) return false;
  return day.moments.some((m) => activeTypes.has(m.type));
}
