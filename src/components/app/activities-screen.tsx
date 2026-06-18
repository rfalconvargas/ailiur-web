'use client';

import { useMemo, useState } from 'react';
import { CalendarPlus, Clock, ListPlus, MapPin, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AddButton, Badge, ScreenHeader } from '@/components/app/app-ui';
import { useLifeOs } from '@/components/app/life-os-context';
import { domainLabel, type DomainId } from '@/components/app/life-os';

// --- Data model ----------------------------------------------------------- //

export type ActivityCategory =
  | 'home'
  | 'recovery'
  | 'movement'
  | 'social'
  | 'creative'
  | 'learning'
  | 'local'
  | 'admin'
  | 'outdoor';

export type Level = 'low' | 'medium' | 'high';
export type LocationType = 'home' | 'outside' | 'local' | 'online';

/** Source is modelled now so Eventbrite/Meetup/Maps can plug in later. */
export type ActivitySource = 'ailiur' | 'eventbrite' | 'meetup' | 'google-maps';

export interface Activity {
  id: string;
  title: string;
  category: ActivityCategory;
  durationMin: number;
  energy: Level;
  social: Level;
  cost: Level;
  location: LocationType;
  domain: DomainId;
  why: string;
  source: ActivitySource;
  externalUrl?: string; // populated when sourced from a real local API
}

export const CATEGORY_LABEL: Record<ActivityCategory, string> = {
  home: 'Home',
  recovery: 'Recovery',
  movement: 'Movement',
  social: 'Social',
  creative: 'Creative',
  learning: 'Learning',
  local: 'Local',
  admin: 'Admin / chores',
  outdoor: 'Outdoor',
};

const LOCATION_LABEL: Record<LocationType, string> = {
  home: 'Home',
  outside: 'Outside',
  local: 'Local community',
  online: 'Online',
};

/** Mock library. Replace with merged Ailiur + local-API results later. */
export const ACTIVITY_LIBRARY: Activity[] = [
  { id: 'a-walk', title: 'Neighborhood walk', category: 'movement', durationMin: 20, energy: 'low', social: 'low', cost: 'low', location: 'outside', domain: 'body', why: 'Easy movement that may lift energy and clear the head.', source: 'ailiur' },
  { id: 'a-mobility', title: 'Mobility flow', category: 'recovery', durationMin: 15, energy: 'low', social: 'low', cost: 'low', location: 'home', domain: 'body', why: 'Gentle range-of-motion work to wind down.', source: 'ailiur' },
  { id: 'a-strength', title: 'Bodyweight strength set', category: 'movement', durationMin: 25, energy: 'high', social: 'low', cost: 'low', location: 'home', domain: 'body', why: 'Builds capacity without a gym.', source: 'ailiur' },
  { id: 'a-coffee-friend', title: 'Coffee with a friend', category: 'social', durationMin: 60, energy: 'medium', social: 'high', cost: 'medium', location: 'local', domain: 'relationships', why: 'One real conversation is a reliable mood lift.', source: 'meetup' },
  { id: 'a-sketch', title: 'Sketch for 20 minutes', category: 'creative', durationMin: 20, energy: 'low', social: 'low', cost: 'low', location: 'home', domain: 'creativity', why: 'Low-stakes making keeps the creative muscle warm.', source: 'ailiur' },
  { id: 'a-read', title: 'Read 10 pages', category: 'learning', durationMin: 15, energy: 'low', social: 'low', cost: 'low', location: 'home', domain: 'learning', why: 'Small, steady input that compounds.', source: 'ailiur' },
  { id: 'a-declutter', title: 'Declutter one drawer', category: 'admin', durationMin: 15, energy: 'medium', social: 'low', cost: 'low', location: 'home', domain: 'home', why: 'A tidy space can make the whole day feel calmer.', source: 'ailiur' },
  { id: 'a-meal-prep', title: 'Prep tomorrow’s lunch', category: 'home', durationMin: 25, energy: 'medium', social: 'low', cost: 'medium', location: 'home', domain: 'body', why: 'Removes a decision and steadies tomorrow.', source: 'ailiur' },
  { id: 'a-park', title: 'Sit in a park', category: 'outdoor', durationMin: 20, energy: 'low', social: 'low', cost: 'low', location: 'outside', domain: 'mind', why: 'Time outside may help reset attention.', source: 'ailiur' },
  { id: 'a-volunteer', title: 'Volunteer shift nearby', category: 'local', durationMin: 120, energy: 'medium', social: 'high', cost: 'low', location: 'local', domain: 'meaning', why: 'Contribution connects daily effort to something larger.', source: 'eventbrite', externalUrl: 'https://www.eventbrite.com' },
  { id: 'a-language', title: 'Language meetup', category: 'local', durationMin: 90, energy: 'medium', social: 'high', cost: 'low', location: 'local', domain: 'learning', why: 'Practice + people in one block.', source: 'meetup', externalUrl: 'https://www.meetup.com' },
  { id: 'a-run', title: 'Easy 5k run', category: 'movement', durationMin: 35, energy: 'high', social: 'low', cost: 'low', location: 'outside', domain: 'body', why: 'Steady cardio for an energy base.', source: 'ailiur' },
  { id: 'a-call-family', title: 'Call family', category: 'social', durationMin: 20, energy: 'low', social: 'medium', cost: 'low', location: 'home', domain: 'relationships', why: 'Keeps your closest ties warm.', source: 'ailiur' },
  { id: 'a-journal', title: 'Evening reflection', category: 'recovery', durationMin: 10, energy: 'low', social: 'low', cost: 'low', location: 'home', domain: 'mind', why: 'Closing the loop on the day supports steadiness.', source: 'ailiur' },
  { id: 'a-museum', title: 'Local museum hour', category: 'local', durationMin: 90, energy: 'low', social: 'medium', cost: 'medium', location: 'local', domain: 'creativity', why: 'Novel input feeds creative momentum.', source: 'google-maps', externalUrl: 'https://maps.google.com' },
  { id: 'a-budget', title: 'Review this week’s spending', category: 'admin', durationMin: 20, energy: 'medium', social: 'low', cost: 'low', location: 'home', domain: 'money', why: 'A quick look keeps money clear, not stressful.', source: 'ailiur' },
  { id: 'a-course', title: 'One online lesson', category: 'learning', durationMin: 30, energy: 'medium', social: 'low', cost: 'low', location: 'online', domain: 'learning', why: 'Structured learning toward a skill you chose.', source: 'ailiur' },
  { id: 'a-garden', title: 'Tend a plant or garden', category: 'home', durationMin: 15, energy: 'low', social: 'low', cost: 'low', location: 'home', domain: 'home', why: 'A small, grounding ritual for your space.', source: 'ailiur' },
];

const LEVEL_TINT: Record<Level, string> = {
  low: 'var(--accent-green)',
  medium: 'var(--ketofy)',
  high: 'var(--accent-red)',
};

// --- Activity card -------------------------------------------------------- //

function ActivityCard({ activity, suggested }: { activity: Activity; suggested?: boolean }) {
  return (
    <div className={cn('glass rounded-[var(--radius-card)] p-5', suggested && 'ring-1 ring-accent-green/40')}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-extrabold tracking-tight text-foreground">
            {activity.title}
          </h3>
          <p className="mt-0.5 text-xs text-foreground/55">{CATEGORY_LABEL[activity.category]}</p>
        </div>
        {suggested && <Badge tint="var(--accent-green)">Suggested</Badge>}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-foreground/65">{activity.why}</p>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <Badge>
          <Clock className="h-3 w-3" />
          {activity.durationMin} min
        </Badge>
        <Badge>
          <MapPin className="h-3 w-3" />
          {LOCATION_LABEL[activity.location]}
        </Badge>
        <Badge tint={LEVEL_TINT[activity.energy]}>{activity.energy} energy</Badge>
        <Badge>{activity.cost === 'low' ? 'Free / low cost' : `${activity.cost} cost`}</Badge>
        <Badge>{domainLabel(activity.domain)}</Badge>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-white/40 pt-4">
        <AddButton label="Add to Today" addedLabel="In Today" icon={Sun} />
        <AddButton label="Add to Routine" addedLabel="In Routine" icon={ListPlus} />
        <AddButton label="Add to Calendar" addedLabel="On Calendar" icon={CalendarPlus} />
      </div>
    </div>
  );
}

// --- Section -------------------------------------------------------------- //

const CATEGORIES = ['all', ...(Object.keys(CATEGORY_LABEL) as ActivityCategory[])] as const;
type CatFilter = (typeof CATEGORIES)[number];
const LOCATIONS = ['all', 'home', 'outside', 'local', 'online'] as const;
type LocFilter = (typeof LOCATIONS)[number];

export function ActivitiesScreen() {
  const { lifeMap } = useLifeOs();
  const [cat, setCat] = useState<CatFilter>('all');
  const [loc, setLoc] = useState<LocFilter>('all');
  const [energy, setEnergy] = useState<'all' | Level>('all');

  // Suggested = activities whose domain is one of the user's priority domains.
  const suggestedIds = useMemo(() => {
    const domains = new Set((lifeMap?.priorityDomains ?? []).map((d) => d.id));
    return new Set(
      ACTIVITY_LIBRARY.filter((a) => domains.has(a.domain)).slice(0, 3).map((a) => a.id)
    );
  }, [lifeMap]);

  const filtered = ACTIVITY_LIBRARY.filter(
    (a) =>
      (cat === 'all' || a.category === cat) &&
      (loc === 'all' || a.location === loc) &&
      (energy === 'all' || a.energy === energy)
  );

  const chip = (active: boolean) =>
    cn(
      'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
      active ? 'bg-accent-green text-[#fffdf5]' : 'bg-white/50 text-foreground/65 hover:bg-white/70'
    );

  return (
    <div className="mx-auto max-w-4xl">
      <ScreenHeader
        eyebrow="Activities"
        title="Find real things to do that move your goals."
        body="Actions, chores, hobbies, recovery, and local options — matched to your goals and the time you have."
      />

      {/* Suggested */}
      {suggestedIds.size > 0 && (
        <section className="mt-8">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground/50">
            Suggested from your goals
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ACTIVITY_LIBRARY.filter((a) => suggestedIds.has(a.id)).map((a) => (
              <ActivityCard key={a.id} activity={a} suggested />
            ))}
          </div>
        </section>
      )}

      {/* Filters */}
      <div className="mt-8 space-y-3">
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button key={c} type="button" onClick={() => setCat(c)} className={chip(cat === c)}>
              {c === 'all' ? 'All' : CATEGORY_LABEL[c as ActivityCategory]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {LOCATIONS.map((l) => (
            <button key={l} type="button" onClick={() => setLoc(l)} className={chip(loc === l)}>
              {l === 'all' ? 'Any place' : LOCATION_LABEL[l as LocationType]}
            </button>
          ))}
          {(['all', 'low', 'medium', 'high'] as const).map((e) => (
            <button key={e} type="button" onClick={() => setEnergy(e)} className={chip(energy === e)}>
              {e === 'all' ? 'Any energy' : `${e} energy`}
            </button>
          ))}
        </div>
      </div>

      {/* Library */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((a) => (
          <ActivityCard key={a.id} activity={a} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="mt-8 text-sm text-foreground/55">No activities match those filters yet.</p>
      )}
    </div>
  );
}
