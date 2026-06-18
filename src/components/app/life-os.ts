/**
 * Life-OS data model + deterministic mock generation for the Ailiur App.
 *
 * Everything here is local-first, deterministic, and dependency-free so it can
 * be swapped for a real API later: replace `generateLifeMap` /
 * `generateDailyProtocol` with network calls returning the same shapes.
 *
 * IMPORTANT: This is not medical advice and never diagnoses. Interpretive copy
 * is intentionally hedged ("may", "likely", "suggests").
 */

// --- Enums / unions ------------------------------------------------------- //

export type DomainId =
  | 'body'
  | 'mind'
  | 'work'
  | 'learning'
  | 'money'
  | 'relationships'
  | 'home'
  | 'creativity'
  | 'meaning';

export type FrictionId =
  | 'low-energy'
  | 'poor-sleep'
  | 'inconsistent-routines'
  | 'distraction'
  | 'overwhelm'
  | 'unclear-priorities'
  | 'stress'
  | 'social-isolation'
  | 'money-pressure'
  | 'lack-of-feedback'
  | 'too-many-tools'
  | 'unsure';

export type ConstraintId =
  | 'limited-time'
  | 'limited-budget'
  | 'family-obligations'
  | 'work-school-schedule'
  | 'health-limitations'
  | 'low-motivation'
  | 'irregular-sleep'
  | 'no-gym-access'
  | 'prefer-local-first'
  | 'other';

export type BaselineMetricId =
  | 'energy'
  | 'sleep'
  | 'focus'
  | 'movement'
  | 'social'
  | 'financial'
  | 'learning'
  | 'emotional';

export type ProtocolIntensity = 'gentle' | 'balanced' | 'ambitious' | 'operator';

export type CoachingStyle =
  | 'calm'
  | 'direct'
  | 'scientific'
  | 'minimal'
  | 'accountability'
  | 'creative';

export type Difficulty = 'easy' | 'moderate' | 'hard';

// --- Core records --------------------------------------------------------- //

export type Baseline = Record<BaselineMetricId, number>; // each 1–5

export interface GoalInterview {
  fiveYearVision: string;
  priorityDomains: DomainId[];
  ninetyDayTurningPoint: string;
  friction: FrictionId[];
  baseline: Baseline;
  constraints: ConstraintId[];
  intensity: ProtocolIntensity;
  coachingStyle: CoachingStyle;
  completedAt: string; // ISO timestamp
}

export interface LifeMap {
  identityShift: string;
  fiveYearDirection: string;
  ninetyDayNorthStar: string;
  priorityDomains: { id: DomainId; label: string }[];
  bottlenecks: string[];
  firstLoop: string;
  dailySignals: string[];
  recommendedTodaySetup: string[];
  intensity: ProtocolIntensity;
  generatedAt: string; // ISO timestamp
}

export interface Habit {
  id: string;
  title: string;
  why: string;
  minutes: number;
  difficulty: Difficulty;
  domain: DomainId;
}

export interface PriorityAction {
  id: string;
  kind: 'health' | 'focus' | 'life';
  title: string;
  domain: DomainId;
}

export interface DailyProtocol {
  habits: Habit[];
  actions: PriorityAction[];
  intensity: ProtocolIntensity;
}

export interface CheckIn {
  energy: number; // 1–5
  focus: number; // 1–5
  mood: number; // 1–5
  easier: string;
  at: string; // ISO timestamp
}

// --- Option metadata (single source of truth for the interview UI) -------- //

export const DOMAINS: { id: DomainId; label: string }[] = [
  { id: 'body', label: 'Body & energy' },
  { id: 'mind', label: 'Mind & emotional state' },
  { id: 'work', label: 'Work & career' },
  { id: 'learning', label: 'Learning & skills' },
  { id: 'money', label: 'Money & stability' },
  { id: 'relationships', label: 'Relationships & social life' },
  { id: 'home', label: 'Home & environment' },
  { id: 'creativity', label: 'Creativity & play' },
  { id: 'meaning', label: 'Meaning & contribution' },
];

export const FRICTIONS: { id: FrictionId; label: string }[] = [
  { id: 'low-energy', label: 'Low energy' },
  { id: 'poor-sleep', label: 'Poor sleep' },
  { id: 'inconsistent-routines', label: 'Inconsistent routines' },
  { id: 'distraction', label: 'Distraction' },
  { id: 'overwhelm', label: 'Overwhelm' },
  { id: 'unclear-priorities', label: 'Unclear priorities' },
  { id: 'stress', label: 'Stress' },
  { id: 'social-isolation', label: 'Social isolation' },
  { id: 'money-pressure', label: 'Money pressure' },
  { id: 'lack-of-feedback', label: 'Lack of feedback' },
  { id: 'too-many-tools', label: 'Too many tools' },
  { id: 'unsure', label: 'I am not sure' },
];

export const CONSTRAINTS: { id: ConstraintId; label: string }[] = [
  { id: 'limited-time', label: 'Limited time' },
  { id: 'limited-budget', label: 'Limited budget' },
  { id: 'family-obligations', label: 'Family obligations' },
  { id: 'work-school-schedule', label: 'Work/school schedule' },
  { id: 'health-limitations', label: 'Health limitations' },
  { id: 'low-motivation', label: 'Low motivation' },
  { id: 'irregular-sleep', label: 'Irregular sleep' },
  { id: 'no-gym-access', label: 'No gym access' },
  { id: 'prefer-local-first', label: 'Prefer private/local-first tools' },
  { id: 'other', label: 'Other' },
];

export const BASELINE_METRICS: { id: BaselineMetricId; label: string }[] = [
  { id: 'energy', label: 'Energy' },
  { id: 'sleep', label: 'Sleep consistency' },
  { id: 'focus', label: 'Focus' },
  { id: 'movement', label: 'Movement' },
  { id: 'social', label: 'Social connection' },
  { id: 'financial', label: 'Financial clarity' },
  { id: 'learning', label: 'Learning momentum' },
  { id: 'emotional', label: 'Emotional steadiness' },
];

export const INTENSITIES: { id: ProtocolIntensity; label: string; blurb: string }[] = [
  { id: 'gentle', label: 'Gentle', blurb: 'Small, sustainable steps.' },
  { id: 'balanced', label: 'Balanced', blurb: 'Realistic but challenging.' },
  { id: 'ambitious', label: 'Ambitious', blurb: 'Strong momentum.' },
  { id: 'operator', label: 'Operator Mode', blurb: 'Intense, structured, high-accountability.' },
];

export const COACHING_STYLES: { id: CoachingStyle; label: string }[] = [
  { id: 'calm', label: 'Calm and encouraging' },
  { id: 'direct', label: 'Direct and structured' },
  { id: 'scientific', label: 'Scientific and explanatory' },
  { id: 'minimal', label: 'Minimal and quiet' },
  { id: 'accountability', label: 'High-accountability' },
  { id: 'creative', label: 'Creative and reflective' },
];

// How many daily habits each intensity asks for.
const HABIT_COUNT: Record<ProtocolIntensity, number> = {
  gentle: 3,
  balanced: 4,
  ambitious: 5,
  operator: 5,
};

// --- Habit library -------------------------------------------------------- //

/** The browseable library shown in Today. Each can be added to the day. */
export const PROTOCOL_LIBRARY: Habit[] = [
  {
    id: 'morning-sunlight',
    title: 'Morning sunlight',
    why: 'Early daylight may help your sleep–wake rhythm settle.',
    minutes: 10,
    difficulty: 'easy',
    domain: 'body',
  },
  {
    id: 'ten-minute-walk',
    title: '10-minute walk',
    why: 'A short walk is the smallest version of movement that still counts.',
    minutes: 10,
    difficulty: 'easy',
    domain: 'body',
  },
  {
    id: 'plan-tomorrow',
    title: 'Plan tomorrow tonight',
    why: 'Deciding in advance may reduce morning friction and decision fatigue.',
    minutes: 5,
    difficulty: 'easy',
    domain: 'work',
  },
  {
    id: 'deep-work',
    title: 'Deep work block',
    why: 'One protected block is where most meaningful progress tends to happen.',
    minutes: 60,
    difficulty: 'hard',
    domain: 'work',
  },
  {
    id: 'protein-breakfast',
    title: 'Protein-forward breakfast',
    why: 'A steadier first meal may help energy hold through the morning.',
    minutes: 15,
    difficulty: 'easy',
    domain: 'body',
  },
  {
    id: 'five-minute-reset',
    title: '5-minute reset',
    why: 'A brief pause may take the edge off stress before it compounds.',
    minutes: 5,
    difficulty: 'easy',
    domain: 'mind',
  },
  {
    id: 'weekly-review',
    title: 'Weekly review',
    why: 'A short review closes the loop so the system can adapt with you.',
    minutes: 20,
    difficulty: 'moderate',
    domain: 'work',
  },
  {
    id: 'call-one-person',
    title: 'Call one person',
    why: 'One real conversation is a reliable antidote to social drift.',
    minutes: 10,
    difficulty: 'easy',
    domain: 'relationships',
  },
  {
    id: 'clean-one-surface',
    title: 'Clean one surface',
    why: 'A single tidy surface can make your whole environment feel calmer.',
    minutes: 5,
    difficulty: 'easy',
    domain: 'home',
  },
  {
    id: 'read-ten-pages',
    title: 'Read 10 pages',
    why: 'Ten pages a day keeps learning momentum quietly compounding.',
    minutes: 15,
    difficulty: 'easy',
    domain: 'learning',
  },
];

// --- Helpers -------------------------------------------------------------- //

export function emptyBaseline(): Baseline {
  return {
    energy: 3,
    sleep: 3,
    focus: 3,
    movement: 3,
    social: 3,
    financial: 3,
    learning: 3,
    emotional: 3,
  };
}

export function emptyInterviewDraft(): Omit<GoalInterview, 'completedAt'> {
  return {
    fiveYearVision: '',
    priorityDomains: [],
    ninetyDayTurningPoint: '',
    friction: [],
    baseline: emptyBaseline(),
    constraints: [],
    intensity: 'balanced',
    coachingStyle: 'calm',
  };
}

export function domainLabel(id: DomainId): string {
  return DOMAINS.find((d) => d.id === id)?.label ?? id;
}

// Maps a baseline metric to the domain it most informs (for bottleneck → loop).
const METRIC_DOMAIN: Record<BaselineMetricId, DomainId> = {
  energy: 'body',
  sleep: 'body',
  focus: 'work',
  movement: 'body',
  social: 'relationships',
  financial: 'money',
  learning: 'learning',
  emotional: 'mind',
};

// Identity-shift line per dominant domain.
const IDENTITY_LINES: Record<DomainId, string> = {
  body: 'someone who treats energy as the foundation everything else is built on',
  mind: 'someone who meets their own mind with steadiness instead of pressure',
  work: 'someone whose deep work consistently turns into real progress',
  learning: 'someone who is always quietly getting better at something that matters',
  money: 'someone whose finances feel clear, calm, and in their own hands',
  relationships: 'someone who stays genuinely connected to the people who matter',
  home: 'someone whose environment supports the life they are building',
  creativity: 'someone who makes space to create and play, not just produce',
  meaning: 'someone whose days point at something larger than the day itself',
};

/** Return the lowest-scoring baseline metrics (the likely bottlenecks). */
function lowestMetrics(baseline: Baseline, n: number): BaselineMetricId[] {
  return BASELINE_METRICS.map((m) => m.id)
    .slice()
    .sort((a, b) => baseline[a] - baseline[b] || BASELINE_METRICS.findIndex((m) => m.id === a) - BASELINE_METRICS.findIndex((m) => m.id === b))
    .slice(0, n);
}

function firstSentence(text: string, fallback: string): string {
  const trimmed = text.trim();
  if (!trimmed) return fallback;
  const match = trimmed.split(/(?<=[.!?])\s/)[0];
  return match.length > 160 ? match.slice(0, 157).trimEnd() + '…' : match;
}

/**
 * Deterministically derive a "Life Map" artifact from the interview.
 * Same input → same output. No diagnosis; interpretive lines are hedged.
 */
export function generateLifeMap(interview: GoalInterview): LifeMap {
  const domains = interview.priorityDomains.length
    ? interview.priorityDomains
    : (['body', 'work', 'mind'] as DomainId[]);
  const primary = domains[0];

  const priorityDomains = domains.map((id) => ({ id, label: domainLabel(id) }));

  // Bottlenecks: combine self-reported friction with the two lowest baselines.
  const lowMetrics = lowestMetrics(interview.baseline, 2);
  const frictionLabels = interview.friction
    .filter((f) => f !== 'unsure')
    .map((f) => FRICTIONS.find((x) => x.id === f)?.label ?? f);
  const bottlenecks: string[] = [];
  for (const m of lowMetrics) {
    const label = BASELINE_METRICS.find((x) => x.id === m)?.label ?? m;
    bottlenecks.push(`${label} looks like a likely limiting factor right now.`);
  }
  if (frictionLabels.length) {
    bottlenecks.push(`You flagged ${frictionLabels.slice(0, 3).join(', ').toLowerCase()} as recurring drains.`);
  }
  if (!bottlenecks.length) {
    bottlenecks.push('No single bottleneck stands out yet — a week of signals will sharpen this.');
  }

  // First loop to tune: anchor on the lowest baseline's domain.
  const loopDomain = METRIC_DOMAIN[lowMetrics[0]];
  const loopMetricLabel = BASELINE_METRICS.find((x) => x.id === lowMetrics[0])?.label ?? 'Energy';
  const firstLoop = `${loopMetricLabel} → a small daily ${domainLabel(loopDomain).split(' ')[0].toLowerCase()} habit → tomorrow's ${loopMetricLabel.toLowerCase()}. Tightening this loop first may unlock the others.`;

  // Suggested daily signals: lowest baselines plus a focus/mood staple.
  const signalMetrics = lowestMetrics(interview.baseline, 3);
  const dailySignals = Array.from(
    new Set([
      ...signalMetrics.map((m) => `${BASELINE_METRICS.find((x) => x.id === m)?.label} (1–5)`),
      'Focus before noon (1–5)',
      'Mood at day’s end (1–5)',
    ])
  ).slice(0, 4);

  const setup = HABIT_COUNT[interview.intensity];
  const recommendedTodaySetup = [
    `${setup} daily habits, weighted toward ${domainLabel(primary).toLowerCase()}`,
    '3 priority actions: one body, one focus, one life',
    'A 20-second evening check-in to close the loop',
    interview.constraints.includes('limited-time')
      ? 'Kept deliberately short — you flagged limited time'
      : 'Adaptive load based on your morning check-in',
  ];

  return {
    identityShift: `You are becoming ${IDENTITY_LINES[primary]}.`,
    fiveYearDirection: firstSentence(
      interview.fiveYearVision,
      `A life organized around ${domains.slice(0, 3).map(domainLabel).join(', ').toLowerCase()} — with days that feel like they belong to you.`
    ),
    ninetyDayNorthStar: firstSentence(
      interview.ninetyDayTurningPoint,
      `Build one reliable daily loop in ${domainLabel(primary).toLowerCase()} and hold it for 90 days.`
    ),
    priorityDomains,
    bottlenecks,
    firstLoop,
    dailySignals,
    recommendedTodaySetup,
    intensity: interview.intensity,
    generatedAt: new Date().toISOString(),
  };
}

// Candidate daily habits per domain (drawn from the library + a few extras).
const DOMAIN_HABITS: Record<DomainId, string[]> = {
  body: ['morning-sunlight', 'ten-minute-walk', 'protein-breakfast'],
  mind: ['five-minute-reset', 'morning-sunlight'],
  work: ['deep-work', 'plan-tomorrow', 'weekly-review'],
  learning: ['read-ten-pages', 'deep-work'],
  money: ['plan-tomorrow', 'weekly-review'],
  relationships: ['call-one-person'],
  home: ['clean-one-surface'],
  creativity: ['five-minute-reset', 'read-ten-pages'],
  meaning: ['five-minute-reset', 'read-ten-pages'],
};

function habitById(id: string): Habit | undefined {
  return PROTOCOL_LIBRARY.find((h) => h.id === id);
}

/**
 * Deterministically build today's protocol from the Life Map + intensity.
 * Picks habits tied to the user's priority domains, capped by intensity.
 */
export function generateDailyProtocol(
  lifeMap: LifeMap,
  intensity: ProtocolIntensity
): DailyProtocol {
  const count = HABIT_COUNT[intensity];
  const ordered: Habit[] = [];
  const seen = new Set<string>();

  // Walk priority domains in order, pulling their candidate habits.
  for (const { id } of lifeMap.priorityDomains) {
    for (const hid of DOMAIN_HABITS[id] ?? []) {
      if (seen.has(hid)) continue;
      const h = habitById(hid);
      if (!h) continue;
      // Operator mode keeps the hard block; gentle drops it for sustainability.
      if (intensity === 'gentle' && h.difficulty === 'hard') continue;
      seen.add(hid);
      ordered.push(h);
    }
  }
  // Backfill from the library if we don't have enough yet.
  for (const h of PROTOCOL_LIBRARY) {
    if (ordered.length >= count) break;
    if (seen.has(h.id)) continue;
    if (intensity === 'gentle' && h.difficulty === 'hard') continue;
    seen.add(h.id);
    ordered.push(h);
  }

  const habits = ordered.slice(0, count);

  const primary = lifeMap.priorityDomains[0]?.id ?? 'body';
  const actions: PriorityAction[] = [
    {
      id: 'action-health',
      kind: 'health',
      domain: 'body',
      title: 'Take the smallest version of your movement habit — even 10 minutes.',
    },
    {
      id: 'action-focus',
      kind: 'focus',
      domain: primary === 'learning' ? 'learning' : 'work',
      title:
        primary === 'learning'
          ? 'Protect one focused block to learn something that compounds.'
          : 'Protect one focused block for the work that matters most today.',
    },
    {
      id: 'action-life',
      kind: 'life',
      domain: 'relationships',
      title: 'Do one small life action: a message, a tidy surface, or a quick errand.',
    },
  ];

  return { habits, actions, intensity };
}

/** A short, hedged adaptation note based on the morning check-in. */
export function adaptationNote(check: CheckIn, intensity: ProtocolIntensity): string {
  const low = (n: number) => n <= 2;
  const high = (n: number) => n >= 4;
  const band = (n: number) => (low(n) ? 'low' : high(n) ? 'high' : 'medium');

  if (low(check.energy) && !high(check.focus)) {
    return `Because your energy is ${band(check.energy)} and your focus is ${band(
      check.focus
    )}, Ailiur would reduce today's load and prioritize the smallest version of your movement habit.`;
  }
  if (high(check.energy) && high(check.focus)) {
    return `Energy and focus both look ${band(
      check.energy
    )} — a good day to front-load your deep work block while the window is open.`;
  }
  if (low(check.mood)) {
    return `Mood is reading ${band(
      check.mood
    )}, so Ailiur would keep today gentle and lean on one connection habit rather than pushing volume.`;
  }
  return `Your check-in looks steady, so Ailiur would hold today's ${intensity} plan as-is and protect your main focus block.`;
}
