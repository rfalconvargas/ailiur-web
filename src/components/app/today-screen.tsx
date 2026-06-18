'use client';

import { useState } from 'react';
import { ArrowRight, Check, Clock, Plus, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAiliurApp } from '@/components/app/app-context';
import { useLifeOs } from '@/components/app/life-os-context';
import {
  INTENSITIES,
  PROTOCOL_LIBRARY,
  adaptationNote,
  domainLabel,
  type CheckIn,
  type Difficulty,
  type Habit,
} from '@/components/app/life-os';

const DIFFICULTY_TINT: Record<Difficulty, string> = {
  easy: 'var(--accent-green)',
  moderate: 'var(--ketofy)',
  hard: 'var(--accent-red)',
};

function todayLabel(): string {
  return new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

// --- Small controls ------------------------------------------------------- //

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white/55 px-2.5 py-1 text-xs font-medium text-foreground/70">
      {children}
    </span>
  );
}

function Rating({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <span className="text-sm font-medium text-foreground/80">{label}</span>
      <div role="group" aria-label={label} className="mt-2 flex gap-1.5">
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
                active ? 'bg-accent-green text-[#fffdf5]' : 'bg-white/50 text-foreground/60 hover:bg-white/70'
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

function SectionHeading({ index, title, hint }: { index: string; title: string; hint?: string }) {
  return (
    <div className="mb-4 flex items-baseline gap-3">
      <span className="font-display text-sm font-extrabold text-accent-green">{index}</span>
      <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground">{title}</h3>
      {hint && <span className="text-xs text-foreground/45">{hint}</span>}
    </div>
  );
}

// --- Habit card ----------------------------------------------------------- //

function HabitCard({
  habit,
  done,
  inRoutine,
  onToggle,
  onAddToRoutine,
}: {
  habit: Habit;
  done: boolean;
  inRoutine: boolean;
  onToggle: () => void;
  onAddToRoutine: () => void;
}) {
  return (
    <div
      className={cn(
        'glass rounded-[var(--radius-card)] p-5 transition-opacity',
        done && 'opacity-70'
      )}
    >
      <div className="flex items-start gap-3.5">
        <button
          type="button"
          role="checkbox"
          aria-checked={done}
          aria-label={`Mark "${habit.title}" complete`}
          onClick={onToggle}
          className={cn(
            'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition-colors',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
            done ? 'border-accent-green bg-accent-green text-[#fffdf5]' : 'border-foreground/25 hover:border-accent-green'
          )}
        >
          {done && <Check className="h-4 w-4" strokeWidth={3} />}
        </button>

        <div className="min-w-0 flex-1">
          <h4
            className={cn(
              'font-display text-lg font-extrabold tracking-tight text-foreground',
              done && 'line-through decoration-foreground/30'
            )}
          >
            {habit.title}
          </h4>
          <p className="mt-1 text-sm leading-relaxed text-foreground/65">{habit.why}</p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Pill>
              <Clock className="h-3 w-3" />
              {habit.minutes} min
            </Pill>
            <span
              className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize"
              style={{
                backgroundColor: `color-mix(in srgb, ${DIFFICULTY_TINT[habit.difficulty]} 16%, transparent)`,
                color: DIFFICULTY_TINT[habit.difficulty],
              }}
            >
              {habit.difficulty}
            </span>
            <Pill>{domainLabel(habit.domain)}</Pill>

            <button
              type="button"
              onClick={onAddToRoutine}
              disabled={inRoutine}
              className={cn(
                'ml-auto inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-colors',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
                inRoutine
                  ? 'cursor-default text-foreground/45'
                  : 'text-accent-green hover:bg-accent-green/10'
              )}
            >
              {inRoutine ? (
                <>
                  <Check className="h-3.5 w-3.5" /> In routine
                </>
              ) : (
                <>
                  <Plus className="h-3.5 w-3.5" /> Add to routine
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Empty state ---------------------------------------------------------- //

function TodayEmpty({ onGoToGoals }: { onGoToGoals: () => void }) {
  return (
    <div className="mx-auto max-w-2xl">
      <span className="text-xs font-semibold uppercase tracking-widest text-foreground/50">Today</span>
      <h2 className="mt-3 font-display text-[clamp(1.9rem,3.8vw,3rem)] font-extrabold leading-[1.08] tracking-tight text-foreground">
        Your daily protocol will appear here after your goals are set.
      </h2>
      <p className="mt-4 text-base leading-relaxed text-foreground/70 sm:text-lg">
        Once Ailiur understands your goals, today becomes a focused, adaptive plan instead of a
        to-do list.
      </p>
      <button
        type="button"
        onClick={onGoToGoals}
        className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent-green px-7 py-3.5 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
      >
        Begin goal interview
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
    </div>
  );
}

// --- Section entry -------------------------------------------------------- //

export function TodayScreen() {
  const {
    hydrated,
    hasGoals,
    protocol,
    intensity,
    setIntensity,
    completedHabitIds,
    toggleHabit,
    addedHabits,
    addHabit,
    checkIn,
    saveCheckIn,
  } = useLifeOs();
  const { setSection } = useAiliurApp();

  // Local-only check-in draft + "added to routine" markers (mock).
  const [draft, setDraft] = useState<{ energy: number; focus: number; mood: number; easier: string }>({
    energy: 3,
    focus: 3,
    mood: 3,
    easier: '',
  });
  const [routineIds, setRoutineIds] = useState<string[]>([]);

  if (!hydrated) {
    return <div className="mx-auto h-40 max-w-3xl animate-pulse rounded-[var(--radius-card)] bg-white/40" />;
  }

  if (!hasGoals || !protocol) {
    return <TodayEmpty onGoToGoals={() => setSection('goals')} />;
  }

  const habitIds = new Set(protocol.habits.map((h) => h.id));
  const addedIds = new Set(addedHabits.map((h) => h.id));
  const doneCount = protocol.habits.filter((h) => completedHabitIds.includes(h.id)).length;

  const submitCheckIn = () => {
    const entry: CheckIn = { ...draft, at: new Date().toISOString() };
    saveCheckIn(entry);
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
            {todayLabel()}
          </span>
          <h2 className="mt-2 font-display text-[clamp(1.9rem,3.8vw,3rem)] font-extrabold tracking-tight text-foreground">
            Today’s Protocol
          </h2>
          <p className="mt-2 max-w-md text-sm text-foreground/60">
            Generated from your goals, routines, and current context.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {INTENSITIES.map((i) => {
            const active = intensity === i.id;
            return (
              <button
                key={i.id}
                type="button"
                aria-pressed={active}
                onClick={() => setIntensity(i.id)}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
                  active ? 'bg-accent-green text-[#fffdf5]' : 'bg-white/50 text-foreground/65 hover:bg-white/70'
                )}
              >
                {i.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1 — Daily Habit Stack */}
      <section className="mt-10">
        <SectionHeading
          index="01"
          title="Daily Habit Stack"
          hint={`${doneCount}/${protocol.habits.length} complete`}
        />
        <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-white/50">
          <div
            className="h-full rounded-full bg-accent-green transition-all duration-500"
            style={{ width: `${protocol.habits.length ? (doneCount / protocol.habits.length) * 100 : 0}%` }}
          />
        </div>
        <div className="grid grid-cols-1 gap-3">
          {protocol.habits.map((h) => (
            <HabitCard
              key={h.id}
              habit={h}
              done={completedHabitIds.includes(h.id)}
              inRoutine={routineIds.includes(h.id)}
              onToggle={() => toggleHabit(h.id)}
              onAddToRoutine={() => setRoutineIds((r) => [...new Set([...r, h.id])])}
            />
          ))}
        </div>
      </section>

      {/* 2 — Priority Actions */}
      <section className="mt-10">
        <SectionHeading index="02" title="Priority Actions" hint="Three that move the needle" />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {protocol.actions.map((a) => {
            const done = completedHabitIds.includes(a.id);
            const kindLabel = a.kind === 'health' ? 'Body' : a.kind === 'focus' ? 'Focus' : 'Life';
            return (
              <button
                key={a.id}
                type="button"
                role="checkbox"
                aria-checked={done}
                onClick={() => toggleHabit(a.id)}
                className={cn(
                  'glass flex flex-col rounded-[var(--radius-card)] p-5 text-left transition-transform hover:-translate-y-0.5',
                  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
                  done && 'opacity-70'
                )}
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-foreground/45">
                  {kindLabel}
                </span>
                <span
                  className={cn(
                    'mt-2 text-sm font-medium leading-relaxed text-foreground/85',
                    done && 'line-through decoration-foreground/30'
                  )}
                >
                  {a.title}
                </span>
                <span
                  className={cn(
                    'mt-3 inline-flex items-center gap-1 text-xs font-semibold',
                    done ? 'text-accent-green' : 'text-foreground/40'
                  )}
                >
                  <Check className="h-3.5 w-3.5" /> {done ? 'Done' : 'Mark done'}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3 — Check-in */}
      <section className="mt-10">
        <SectionHeading index="03" title="Check-in" hint="Takes 20 seconds" />
        <div className="glass rounded-[var(--radius-card)] p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Rating label="Energy now" value={draft.energy} onChange={(n) => setDraft((d) => ({ ...d, energy: n }))} />
            <Rating label="Focus now" value={draft.focus} onChange={(n) => setDraft((d) => ({ ...d, focus: n }))} />
            <Rating label="Mood now" value={draft.mood} onChange={(n) => setDraft((d) => ({ ...d, mood: n }))} />
          </div>
          <label className="mt-5 block">
            <span className="text-sm font-medium text-foreground/80">
              What is one thing that would make today easier?
            </span>
            <input
              type="text"
              value={draft.easier}
              onChange={(e) => setDraft((d) => ({ ...d, easier: e.target.value }))}
              placeholder="Optional…"
              className="mt-2 w-full rounded-2xl border border-white/60 bg-white/50 p-3.5 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent-green"
            />
          </label>
          <button
            type="button"
            onClick={submitCheckIn}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            {checkIn ? 'Update check-in' : 'Save check-in'}
          </button>
        </div>
      </section>

      {/* 4 — Adaptation (after check-in) */}
      {checkIn && (
        <section className="mt-10">
          <SectionHeading index="04" title="Adaptation" hint="How Ailiur would tune today" />
          <div className="glass rounded-[var(--radius-card)] border-l-4 border-l-accent-green p-6">
            <p className="leading-relaxed text-foreground/85">{adaptationNote(checkIn, intensity)}</p>
            <p className="mt-3 text-xs text-foreground/45">
              A reflective suggestion based on your check-in — not medical advice.
            </p>
          </div>
        </section>
      )}

      {/* 5 — Protocol Library */}
      <section className="mt-10">
        <SectionHeading index="05" title="Protocol Library" hint="Add to today" />
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {PROTOCOL_LIBRARY.map((h) => {
            const inToday = habitIds.has(h.id) || addedIds.has(h.id);
            return (
              <div
                key={h.id}
                className="glass flex items-center gap-3 rounded-2xl p-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{h.title}</p>
                  <p className="truncate text-xs text-foreground/55">
                    {h.minutes} min · {domainLabel(h.domain)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => addHabit(h)}
                  disabled={inToday}
                  aria-label={inToday ? `${h.title} already in today` : `Add ${h.title} to today`}
                  className={cn(
                    'inline-flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
                    inToday
                      ? 'cursor-default bg-white/40 text-foreground/45'
                      : 'bg-accent-green/10 text-accent-green hover:bg-accent-green/20'
                  )}
                >
                  {inToday ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Added
                    </>
                  ) : (
                    <>
                      <Plus className="h-3.5 w-3.5" /> Add
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <div className="mt-10 flex items-center justify-between gap-3 border-t border-white/40 pt-6">
        <button
          type="button"
          onClick={() => setSection('goals')}
          className="text-sm font-medium text-foreground/55 transition-colors hover:text-foreground"
        >
          Edit goals & Life Map
        </button>
        <button
          type="button"
          onClick={() => {
            setDraft({ energy: 3, focus: 3, mood: 3, easier: '' });
            setRoutineIds([]);
          }}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/50 transition-colors hover:text-foreground"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset check-in
        </button>
      </div>
    </div>
  );
}
