'use client';

import { useState } from 'react';
import {
  CalendarPlus,
  Clock,
  Copy,
  Pencil,
  Plus,
  Target,
  Trash2,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocalState } from '@/components/app/use-local-state';
import { AddButton, Badge, Drawer, ScreenHeader, Segmented } from '@/components/app/app-ui';
import { DOMAINS, domainLabel, type DomainId } from '@/components/app/life-os';

// --- Data model ----------------------------------------------------------- //

export type Cadence =
  | 'daily'
  | 'weekly'
  | 'bi-monthly'
  | 'monthly'
  | 'quarterly'
  | 'semi-annual'
  | 'yearly';

export const CADENCE_LABEL: Record<Cadence, string> = {
  daily: 'Daily',
  weekly: 'Weekly',
  'bi-monthly': 'Bi-monthly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  'semi-annual': 'Every 6 months',
  yearly: 'Yearly',
};

export type RoutineType =
  | 'morning'
  | 'evening'
  | 'weekly-review'
  | 'monthly-reset'
  | 'quarterly-planning'
  | 'yearly-review'
  | 'custom';

export const ROUTINE_TYPE_LABEL: Record<RoutineType, string> = {
  morning: 'Morning routine',
  evening: 'Evening routine',
  'weekly-review': 'Weekly review',
  'monthly-reset': 'Monthly reset',
  'quarterly-planning': 'Quarterly planning',
  'yearly-review': 'Yearly review',
  custom: 'Custom routine',
};

export interface RoutineStep {
  id: string;
  label: string;
  minutes: number;
}

export interface Routine {
  id: string;
  name: string;
  type: RoutineType;
  cadence: Cadence;
  domain: DomainId;
  durationMin: number;
  steps: RoutineStep[];
  signal: string; // KPI / signal to watch
  scheduledTime: string; // "06:30"
}

let _id = 0;
const newId = (p: string) => `${p}-${Date.now().toString(36)}-${_id++}`;
const sumMinutes = (steps: RoutineStep[]) => steps.reduce((n, s) => n + (s.minutes || 0), 0);

const step = (label: string, minutes: number): RoutineStep => ({
  id: newId('step'),
  label,
  minutes,
});

/** Seven seed templates. Swap this array for an API response later. */
export const ROUTINE_TEMPLATES: Routine[] = ([
  {
    id: 'tpl-calm-morning',
    name: 'Calm Morning Activation',
    type: 'morning',
    cadence: 'daily',
    domain: 'body',
    scheduledTime: '06:45',
    signal: 'Morning energy (1–5)',
    steps: [
      step('Water + daylight', 5),
      step('Gentle movement or stretch', 10),
      step('Set the one thing that matters today', 5),
    ],
    durationMin: 0,
  },
  {
    id: 'tpl-evening-shutdown',
    name: 'Evening Shutdown',
    type: 'evening',
    cadence: 'daily',
    domain: 'mind',
    scheduledTime: '21:30',
    signal: 'Wind-down before screens off',
    steps: [
      step('Tidy one surface', 5),
      step('Plan tomorrow’s first block', 5),
      step('Screens off + read', 15),
    ],
    durationMin: 0,
  },
  {
    id: 'tpl-weekly-review',
    name: 'Weekly Life Review',
    type: 'weekly-review',
    cadence: 'weekly',
    domain: 'work',
    scheduledTime: '17:00',
    signal: 'Weeks reviewed in a row',
    steps: [
      step('Review the past week', 10),
      step('Check progress vs. goals', 5),
      step('Plan the week ahead', 10),
    ],
    durationMin: 0,
  },
  {
    id: 'tpl-monthly-money',
    name: 'Monthly Money Reset',
    type: 'monthly-reset',
    cadence: 'monthly',
    domain: 'money',
    scheduledTime: '10:00',
    signal: 'Spending vs. plan',
    steps: [
      step('Reconcile last month', 15),
      step('Review subscriptions', 10),
      step('Set next month’s targets', 10),
    ],
    durationMin: 0,
  },
  {
    id: 'tpl-quarterly-direction',
    name: 'Quarterly Direction Reset',
    type: 'quarterly-planning',
    cadence: 'quarterly',
    domain: 'meaning',
    scheduledTime: '09:00',
    signal: 'Direction confidence (1–5)',
    steps: [
      step('Reflect on the last 90 days', 20),
      step('Re-read your Life Map', 10),
      step('Choose the next 90-day north star', 15),
    ],
    durationMin: 0,
  },
  {
    id: 'tpl-deep-work-launch',
    name: 'Deep Work Launch Sequence',
    type: 'custom',
    cadence: 'daily',
    domain: 'work',
    scheduledTime: '09:30',
    signal: 'Deep work blocks completed',
    steps: [
      step('Clear the desk + phone away', 3),
      step('Write the single outcome', 2),
      step('90-minute focus block', 90),
    ],
    durationMin: 0,
  },
  {
    id: 'tpl-recovery-day',
    name: 'Recovery Day Routine',
    type: 'custom',
    cadence: 'weekly',
    domain: 'body',
    scheduledTime: '11:00',
    signal: 'Felt recovery (1–5)',
    steps: [
      step('Easy walk outside', 20),
      step('Mobility or stretch', 15),
      step('Unstructured rest', 30),
    ],
    durationMin: 0,
  },
] as Routine[]).map((r) => ({ ...r, durationMin: sumMinutes(r.steps) }));

const DEFAULT_ROUTINES: Routine[] = ['tpl-calm-morning', 'tpl-evening-shutdown']
  .map((id) => ROUTINE_TEMPLATES.find((t) => t.id === id)!)
  .map((t) => ({ ...t, id: newId('rt'), steps: t.steps.map((s) => ({ ...s, id: newId('step') })) }));

// --- Routine card --------------------------------------------------------- //

function RoutineCard({
  routine,
  onOpen,
  onDuplicate,
  onEdit,
}: {
  routine: Routine;
  onOpen: () => void;
  onDuplicate: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="glass rounded-[var(--radius-card)] p-5">
      <button type="button" onClick={onOpen} className="block w-full text-left">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-extrabold tracking-tight text-foreground">
            {routine.name}
          </h3>
          <Badge tint="var(--accent-green)">{CADENCE_LABEL[routine.cadence]}</Badge>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-foreground/65">
          <Badge>
            <Clock className="h-3 w-3" />
            {routine.durationMin} min
          </Badge>
          <Badge>
            <Target className="h-3 w-3" />
            {domainLabel(routine.domain)}
          </Badge>
          <Badge>{routine.scheduledTime}</Badge>
        </div>
        <p className="mt-3 text-sm text-foreground/60">
          <span className="font-medium text-foreground/75">Signal:</span> {routine.signal}
        </p>
        <p className="mt-1 text-xs text-foreground/45">
          {routine.steps.length} steps · {ROUTINE_TYPE_LABEL[routine.type]}
        </p>
      </button>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/40 pt-4">
        <AddButton label="Add to Calendar" addedLabel="On Calendar" icon={CalendarPlus} />
        <button
          type="button"
          onClick={onDuplicate}
          className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-foreground/70 transition-colors hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
        >
          <Copy className="h-3.5 w-3.5" /> Duplicate
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-foreground/70 transition-colors hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
        >
          <Pencil className="h-3.5 w-3.5" /> Edit
        </button>
      </div>
    </div>
  );
}

// --- Builder -------------------------------------------------------------- //

const CADENCES = Object.keys(CADENCE_LABEL) as Cadence[];
const TYPES = Object.keys(ROUTINE_TYPE_LABEL) as RoutineType[];

function RoutineBuilder({
  initial,
  onSave,
  onCancel,
}: {
  initial: Routine | null;
  onSave: (routine: Routine) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? '');
  const [type, setType] = useState<RoutineType>(initial?.type ?? 'custom');
  const [cadence, setCadence] = useState<Cadence>(initial?.cadence ?? 'daily');
  const [domain, setDomain] = useState<DomainId>(initial?.domain ?? 'body');
  const [scheduledTime, setScheduledTime] = useState(initial?.scheduledTime ?? '07:00');
  const [signal, setSignal] = useState(initial?.signal ?? '');
  const [steps, setSteps] = useState<RoutineStep[]>(
    initial?.steps ?? [step('First step', 5)]
  );

  const field =
    'w-full rounded-2xl border border-white/60 bg-white/50 p-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent-green';

  const save = () => {
    const cleaned = steps.filter((s) => s.label.trim());
    onSave({
      id: initial?.id ?? newId('rt'),
      name: name.trim() || 'Untitled routine',
      type,
      cadence,
      domain,
      scheduledTime,
      signal: signal.trim() || 'Consistency (days in a row)',
      steps: cleaned.length ? cleaned : [step('First step', 5)],
      durationMin: sumMinutes(cleaned),
    });
  };

  return (
    <div className="glass rounded-[var(--radius-card)] p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground">
          {initial ? 'Edit routine' : 'Build a routine'}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          aria-label="Cancel"
          className="flex h-8 w-8 items-center justify-center rounded-full text-foreground/60 hover:bg-white/60"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="text-xs font-medium text-foreground/70">Name</span>
          <input className={cn(field, 'mt-1.5')} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Calm Morning Activation" />
        </label>
        <label className="block">
          <span className="text-xs font-medium text-foreground/70">Type</span>
          <select className={cn(field, 'mt-1.5')} value={type} onChange={(e) => setType(e.target.value as RoutineType)}>
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {ROUTINE_TYPE_LABEL[t]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-medium text-foreground/70">Cadence</span>
          <select className={cn(field, 'mt-1.5')} value={cadence} onChange={(e) => setCadence(e.target.value as Cadence)}>
            {CADENCES.map((c) => (
              <option key={c} value={c}>
                {CADENCE_LABEL[c]}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-medium text-foreground/70">Linked domain</span>
          <select className={cn(field, 'mt-1.5')} value={domain} onChange={(e) => setDomain(e.target.value as DomainId)}>
            {DOMAINS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-medium text-foreground/70">Scheduled time</span>
          <input type="time" className={cn(field, 'mt-1.5')} value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} />
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-medium text-foreground/70">KPI / signal to watch</span>
          <input className={cn(field, 'mt-1.5')} value={signal} onChange={(e) => setSignal(e.target.value)} placeholder="e.g. Morning energy (1–5)" />
        </label>
      </div>

      {/* Steps */}
      <div className="mt-5">
        <span className="text-xs font-medium text-foreground/70">Steps</span>
        <div className="mt-2 space-y-2">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <input
                className={cn(field, 'flex-1')}
                value={s.label}
                onChange={(e) =>
                  setSteps((arr) => arr.map((x, j) => (j === i ? { ...x, label: e.target.value } : x)))
                }
                placeholder={`Step ${i + 1}`}
              />
              <input
                type="number"
                min={0}
                aria-label="Minutes"
                className={cn(field, 'w-20')}
                value={s.minutes}
                onChange={(e) =>
                  setSteps((arr) =>
                    arr.map((x, j) => (j === i ? { ...x, minutes: Number(e.target.value) } : x))
                  )
                }
              />
              <button
                type="button"
                onClick={() => setSteps((arr) => arr.filter((_, j) => j !== i))}
                aria-label="Remove step"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-foreground/50 hover:bg-white/60 hover:text-accent-red"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setSteps((arr) => [...arr, step('', 5)])}
          className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/55 px-3 py-1.5 text-xs font-semibold text-foreground/75 hover:bg-white/80"
        >
          <Plus className="h-3.5 w-3.5" /> Add step
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          className="rounded-full bg-accent-green px-6 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
        >
          {initial ? 'Save changes' : 'Create routine'}
        </button>
        <button type="button" onClick={onCancel} className="text-sm font-medium text-foreground/60 hover:text-foreground">
          Cancel
        </button>
      </div>
    </div>
  );
}

// --- Section -------------------------------------------------------------- //

export function RoutinesScreen() {
  const [routines, setRoutines] = useLocalState<Routine[]>('ailiur.routines.v1', DEFAULT_ROUTINES);
  const [tab, setTab] = useState<'yours' | 'templates'>('yours');
  const [detail, setDetail] = useState<Routine | null>(null);
  const [editing, setEditing] = useState<Routine | null>(null);
  const [building, setBuilding] = useState(false);

  const duplicate = (r: Routine) =>
    setRoutines((list) => [
      ...list,
      { ...r, id: newId('rt'), name: `${r.name} (copy)`, steps: r.steps.map((s) => ({ ...s, id: newId('step') })) },
    ]);

  const upsert = (r: Routine) => {
    setRoutines((list) => (list.some((x) => x.id === r.id) ? list.map((x) => (x.id === r.id ? r : x)) : [...list, r]));
    setBuilding(false);
    setEditing(null);
  };

  const applyTemplate = (t: Routine) =>
    setRoutines((list) => [
      ...list,
      { ...t, id: newId('rt'), steps: t.steps.map((s) => ({ ...s, id: newId('step') })) },
    ]);

  return (
    <div className="mx-auto max-w-4xl">
      <ScreenHeader
        eyebrow="Routines"
        title="Turn habits into repeatable systems."
        body="Daily, weekly, monthly, and yearly routines — each with steps, a signal to watch, and a place on your calendar."
        right={
          !building && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setBuilding(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              <Plus className="h-4 w-4" /> New routine
            </button>
          )
        }
      />

      {building && (
        <div className="mt-8">
          <RoutineBuilder
            initial={editing}
            onSave={upsert}
            onCancel={() => {
              setBuilding(false);
              setEditing(null);
            }}
          />
        </div>
      )}

      {!building && (
        <>
          <div className="mt-7">
            <Segmented
              ariaLabel="Routine view"
              options={[
                { id: 'yours', label: `Your routines (${routines.length})` },
                { id: 'templates', label: 'Templates' },
              ]}
              value={tab}
              onChange={setTab}
            />
          </div>

          {tab === 'yours' ? (
            routines.length ? (
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {routines.map((r) => (
                  <RoutineCard
                    key={r.id}
                    routine={r}
                    onOpen={() => setDetail(r)}
                    onDuplicate={() => duplicate(r)}
                    onEdit={() => {
                      setEditing(r);
                      setBuilding(true);
                    }}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-8 text-sm text-foreground/55">
                No routines yet — start from a template or build your own.
              </p>
            )
          ) : (
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {ROUTINE_TEMPLATES.map((t) => (
                <div key={t.id} className="glass rounded-[var(--radius-card)] p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-extrabold tracking-tight text-foreground">
                      {t.name}
                    </h3>
                    <Badge tint="var(--ketofy)">{CADENCE_LABEL[t.cadence]}</Badge>
                  </div>
                  <p className="mt-2 text-sm text-foreground/60">
                    {t.steps.length} steps · {t.durationMin} min · {domainLabel(t.domain)}
                  </p>
                  <button
                    type="button"
                    onClick={() => applyTemplate(t)}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent-green/15 px-4 py-2 text-xs font-semibold text-accent-green transition-colors hover:bg-accent-green/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
                  >
                    <Plus className="h-3.5 w-3.5" /> Use template
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Detail drawer */}
      <Drawer open={!!detail} onClose={() => setDetail(null)} title={detail?.name ?? 'Routine'}>
        {detail && (
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge tint="var(--accent-green)">{CADENCE_LABEL[detail.cadence]}</Badge>
              <Badge>
                <Clock className="h-3 w-3" />
                {detail.durationMin} min
              </Badge>
              <Badge>
                <Target className="h-3 w-3" />
                {domainLabel(detail.domain)}
              </Badge>
              <Badge>{detail.scheduledTime}</Badge>
            </div>
            <p className="mt-4 text-sm text-foreground/70">
              <span className="font-medium text-foreground">Signal:</span> {detail.signal}
            </p>

            <h4 className="mt-6 text-xs font-semibold uppercase tracking-widest text-foreground/50">
              Steps
            </h4>
            <ol className="mt-3 space-y-2">
              {detail.steps.map((s, i) => (
                <li key={s.id} className="flex items-center gap-3 rounded-2xl bg-white/45 px-4 py-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-bold text-[#fffdf5]">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm text-foreground/80">{s.label}</span>
                  <span className="text-xs text-foreground/50">{s.minutes}m</span>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-wrap gap-2">
              <AddButton label="Add to Calendar" addedLabel="On Calendar" icon={CalendarPlus} />
              <button
                type="button"
                onClick={() => {
                  duplicate(detail);
                  setDetail(null);
                }}
                className="inline-flex items-center gap-1 rounded-full bg-white/55 px-3 py-1.5 text-xs font-semibold text-foreground/75 hover:bg-white/80"
              >
                <Copy className="h-3.5 w-3.5" /> Duplicate
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(detail);
                  setDetail(null);
                  setBuilding(true);
                }}
                className="inline-flex items-center gap-1 rounded-full bg-white/55 px-3 py-1.5 text-xs font-semibold text-foreground/75 hover:bg-white/80"
              >
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
