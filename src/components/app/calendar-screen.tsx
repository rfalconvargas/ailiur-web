'use client';

import { useState } from 'react';
import { CalendarSync, Repeat } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AddButton, Badge, ScreenHeader, Segmented, SoftDisclaimer } from '@/components/app/app-ui';
import { domainLabel, type DomainId } from '@/components/app/life-os';
import { CADENCE_LABEL, type Cadence } from '@/components/app/routines-screen';

// --- Data model ----------------------------------------------------------- //

export type EventType = 'habit' | 'routine' | 'event' | 'focus' | 'activity' | 'learning';
export type EventSource = 'ailiur' | 'google' | 'notion' | 'manual';

export interface CalEvent {
  id: string;
  title: string;
  type: EventType;
  day: number; // 0 = Monday … 6 = Sunday
  start: string; // "HH:MM"
  end: string; // "HH:MM"
  recurrence: Cadence | 'none';
  domain?: DomainId;
  source: EventSource;
}

const TYPE_COLOR: Record<EventType, string> = {
  habit: '#1fa85c',
  routine: '#ff9500',
  focus: '#1c1606',
  event: '#e5392b',
  activity: '#2a9d8f',
  learning: '#7a5cc0',
};

const TYPE_LABEL: Record<EventType, string> = {
  habit: 'Habit',
  routine: 'Routine',
  focus: 'Focus',
  event: 'Event',
  activity: 'Activity',
  learning: 'Learning',
};

const SOURCE_LABEL: Record<EventSource, string> = {
  ailiur: 'Ailiur',
  google: 'Google',
  notion: 'Notion',
  manual: 'Manual',
};

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Mock week plan. Ailiur-sourced blocks dominate; a couple sync'd-in externals. */
export const MOCK_EVENTS: CalEvent[] = [
  { id: 'e1', title: 'Calm Morning Activation', type: 'routine', day: 0, start: '06:45', end: '07:05', recurrence: 'daily', domain: 'body', source: 'ailiur' },
  { id: 'e2', title: 'Deep work block', type: 'focus', day: 0, start: '09:30', end: '11:00', recurrence: 'daily', domain: 'work', source: 'ailiur' },
  { id: 'e3', title: 'Team standup', type: 'event', day: 0, start: '11:15', end: '11:45', recurrence: 'weekly', source: 'google' },
  { id: 'e4', title: '10-minute walk', type: 'habit', day: 0, start: '12:45', end: '13:00', recurrence: 'daily', domain: 'body', source: 'ailiur' },
  { id: 'e5', title: 'Focus Without Burnout — lesson', type: 'learning', day: 0, start: '17:00', end: '17:25', recurrence: 'none', domain: 'mind', source: 'ailiur' },
  { id: 'e6', title: 'Evening Shutdown', type: 'routine', day: 0, start: '21:30', end: '21:50', recurrence: 'daily', domain: 'mind', source: 'ailiur' },

  { id: 'e7', title: 'Calm Morning Activation', type: 'routine', day: 1, start: '06:45', end: '07:05', recurrence: 'daily', domain: 'body', source: 'ailiur' },
  { id: 'e8', title: 'Deep work block', type: 'focus', day: 1, start: '09:30', end: '11:00', recurrence: 'daily', domain: 'work', source: 'ailiur' },
  { id: 'e9', title: 'Coffee with a friend', type: 'activity', day: 1, start: '15:00', end: '16:00', recurrence: 'none', domain: 'relationships', source: 'ailiur' },
  { id: 'e10', title: 'Easy 5k run', type: 'activity', day: 2, start: '07:30', end: '08:05', recurrence: 'weekly', domain: 'body', source: 'ailiur' },
  { id: 'e11', title: 'Deep work block', type: 'focus', day: 2, start: '09:30', end: '11:00', recurrence: 'daily', domain: 'work', source: 'ailiur' },
  { id: 'e12', title: 'Dentist', type: 'event', day: 2, start: '14:00', end: '15:00', recurrence: 'none', source: 'notion' },

  { id: 'e13', title: 'Deep work block', type: 'focus', day: 3, start: '09:30', end: '11:00', recurrence: 'daily', domain: 'work', source: 'ailiur' },
  { id: 'e14', title: 'Read 10 pages', type: 'habit', day: 3, start: '20:00', end: '20:20', recurrence: 'daily', domain: 'learning', source: 'ailiur' },
  { id: 'e15', title: 'Weekly Life Review', type: 'routine', day: 4, start: '17:00', end: '17:30', recurrence: 'weekly', domain: 'work', source: 'ailiur' },
  { id: 'e16', title: 'Language meetup', type: 'activity', day: 4, start: '18:30', end: '20:00', recurrence: 'none', domain: 'learning', source: 'google' },
  { id: 'e17', title: 'Recovery Day Routine', type: 'routine', day: 5, start: '11:00', end: '12:05', recurrence: 'weekly', domain: 'body', source: 'ailiur' },
  { id: 'e18', title: 'Volunteer shift', type: 'activity', day: 6, start: '10:00', end: '12:00', recurrence: 'none', domain: 'meaning', source: 'manual' },
];

// Grid config (6:00 → 22:00).
const DAY_START = 6 * 60;
const DAY_END = 22 * 60;
const HOUR_H = 52; // px per hour
const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
const top = (t: string) => ((toMin(t) - DAY_START) / 60) * HOUR_H;
const height = (s: string, e: string) => Math.max(18, ((toMin(e) - toMin(s)) / 60) * HOUR_H);
const HOURS = Array.from({ length: (DAY_END - DAY_START) / 60 + 1 }, (_, i) => 6 + i);

function todayIndex() {
  const js = new Date().getDay(); // 0 Sun … 6 Sat
  return (js + 6) % 7; // → 0 Mon … 6 Sun
}

// --- Event block ---------------------------------------------------------- //

function EventBlock({ ev, compact }: { ev: CalEvent; compact?: boolean }) {
  const color = TYPE_COLOR[ev.type];
  return (
    <div
      className="absolute left-1 right-1 overflow-hidden rounded-xl px-2 py-1 text-left"
      style={{
        top: top(ev.start),
        height: height(ev.start, ev.end),
        backgroundColor: `color-mix(in srgb, ${color} 14%, white)`,
        borderLeft: `3px solid ${color}`,
      }}
      title={`${ev.title} · ${ev.start}–${ev.end}`}
    >
      <p className="truncate text-[11px] font-semibold leading-tight text-foreground">{ev.title}</p>
      {!compact && (
        <p className="truncate text-[10px] text-foreground/55">
          {ev.start}–{ev.end} · {SOURCE_LABEL[ev.source] ?? 'Ailiur'}
        </p>
      )}
    </div>
  );
}

function DayColumn({ events, label, highlight }: { events: CalEvent[]; label?: string; highlight?: boolean }) {
  return (
    <div className="min-w-0 flex-1">
      {label && (
        <div
          className={cn(
            'mb-1 rounded-lg px-2 py-1 text-center text-xs font-semibold',
            highlight ? 'bg-accent-green text-[#fffdf5]' : 'text-foreground/60'
          )}
        >
          {label}
        </div>
      )}
      <div className="relative rounded-xl bg-white/30" style={{ height: HOURS.length * HOUR_H - HOUR_H }}>
        {events.map((ev) => (
          <EventBlock key={ev.id} ev={ev} compact={!label ? false : true} />
        ))}
      </div>
    </div>
  );
}

// --- Section -------------------------------------------------------------- //

export function CalendarScreen() {
  const [view, setView] = useState<'day' | 'week'>('week');
  const day = todayIndex();
  const dayEvents = MOCK_EVENTS.filter((e) => e.day === day).sort((a, b) => toMin(a.start) - toMin(b.start));

  return (
    <div className="mx-auto max-w-5xl">
      <ScreenHeader
        eyebrow="Calendar"
        title="Your plan becomes time."
        body="Ailiur is the source of your plan. Google Calendar and Notion Calendar are sync destinations — your routines, habits, focus, and activities flow outward."
        right={
          <Segmented
            ariaLabel="Calendar view"
            options={[
              { id: 'week', label: 'Week' },
              { id: 'day', label: 'Day' },
            ]}
            value={view}
            onChange={setView}
          />
        }
      />

      {/* Sync actions */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <AddButton label="Send to Google Calendar" addedLabel="Synced to Google" icon={CalendarSync} />
        <AddButton label="Send to Notion Calendar" addedLabel="Synced to Notion" icon={CalendarSync} />
        <AddButton label="Create recurring routine" addedLabel="Routine scheduled" icon={Repeat} />
      </div>

      {/* Legend */}
      <div className="mt-5 flex flex-wrap gap-2">
        {(Object.keys(TYPE_LABEL) as EventType[]).map((t) => (
          <span key={t} className="inline-flex items-center gap-1.5 text-xs text-foreground/60">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: TYPE_COLOR[t] }} />
            {TYPE_LABEL[t]}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="glass mt-5 overflow-x-auto rounded-[var(--radius-card)] p-4">
        <div className="flex gap-2" style={{ minWidth: view === 'week' ? 760 : 360 }}>
          {/* Hour rail */}
          <div className="w-12 shrink-0 pt-6">
            <div className="relative" style={{ height: HOURS.length * HOUR_H - HOUR_H }}>
              {HOURS.slice(0, -1).map((h, i) => (
                <div
                  key={h}
                  className="absolute -translate-y-1/2 text-[10px] font-medium text-foreground/40"
                  style={{ top: i * HOUR_H }}
                >
                  {String(h).padStart(2, '0')}:00
                </div>
              ))}
            </div>
          </div>

          {view === 'day' ? (
            <div className="flex-1 pt-6">
              <DayColumn events={dayEvents} />
            </div>
          ) : (
            DAYS.map((d, i) => (
              <DayColumn
                key={d}
                label={d}
                highlight={i === day}
                events={MOCK_EVENTS.filter((e) => e.day === i)}
              />
            ))
          )}
        </div>
      </div>

      {view === 'day' && (
        <div className="mt-5">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground/50">
            {DAYS[day]} · {dayEvents.length} blocks
          </h3>
          <div className="space-y-2">
            {dayEvents.map((ev) => (
              <div key={ev.id} className="glass flex items-center gap-3 rounded-2xl p-3">
                <span className="h-8 w-1 rounded-full" style={{ backgroundColor: TYPE_COLOR[ev.type] }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-foreground">{ev.title}</p>
                  <p className="text-xs text-foreground/55">
                    {ev.start}–{ev.end} · {TYPE_LABEL[ev.type]}
                    {ev.domain ? ` · ${domainLabel(ev.domain)}` : ''}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <Badge>{SOURCE_LABEL[ev.source] ?? 'Ailiur'}</Badge>
                  {ev.recurrence !== 'none' && (
                    <span className="text-[10px] text-foreground/45">{CADENCE_LABEL[ev.recurrence as Cadence]}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <SoftDisclaimer>
        Calendar sync is shown as a prototype — connecting Google or Notion happens later from
        Settings → Calendar sync.
      </SoftDisclaimer>
    </div>
  );
}
