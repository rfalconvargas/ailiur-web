/**
 * Daymesh demo dataset — one representative week for the fictional user "Maya".
 * Entirely local mock data. No medical claims; values are illustrative ranges
 * in the style of consumer wearables (WHOOP/Oura/Apple Health).
 */

export type MomentType =
  | 'meal'
  | 'screenshot'
  | 'workout'
  | 'work'
  | 'social'
  | 'late-scroll'
  | 'travel'
  | 'outdoor';

/** Filter chips shown in the demo, each mapping to one or more moment types. */
export type FilterKey =
  | 'Food'
  | 'Sleep'
  | 'Screenshots'
  | 'Social'
  | 'Movement'
  | 'Work';

export const FILTERS: { key: FilterKey; types: MomentType[] }[] = [
  { key: 'Food', types: ['meal'] },
  { key: 'Sleep', types: ['late-scroll'] },
  { key: 'Screenshots', types: ['screenshot'] },
  { key: 'Social', types: ['social'] },
  { key: 'Movement', types: ['workout', 'outdoor', 'travel'] },
  { key: 'Work', types: ['work'] },
];

export type Moment = {
  /** 24h clock label, e.g. "21:30". Sorted ascending within a day. */
  time: string;
  type: MomentType;
  /** Short title shown on the card. */
  label: string;
  /** On-device derived note — the "context" Daymesh reads, not the photo. */
  note: string;
  /** Flagged when this moment is one the day's insight is built on. */
  driver?: boolean;
};

export type Biometrics = {
  /** 0–100 */
  sleep: number;
  /** 0–100 */
  recovery: number;
  /** ms */
  hrv: number;
  /** bpm */
  rhr: number;
  /** 0–21 */
  strain: number;
  /** 0–100 self-rated/derived energy */
  energy: number;
};

export type Day = {
  id: string;
  /** Short weekday label for the timeline. */
  short: string;
  /** Full label, e.g. "Monday, Jun 8". */
  full: string;
  bio: Biometrics;
  moments: Moment[];
  /** One observational, non-prescriptive insight. */
  insight: string;
  /** A gentle, optional experiment for the next day. */
  experiment: string;
};

/** Recovery/sleep zone from a 0–100 score → drives accent color. */
export type Zone = 'high' | 'mid' | 'low';
export function zoneFor(score: number): Zone {
  if (score >= 67) return 'high';
  if (score >= 45) return 'mid';
  return 'low';
}

export const WEEK: Day[] = [
  {
    id: 'mon',
    short: 'Mon',
    full: 'Monday, Jun 8',
    bio: { sleep: 84, recovery: 78, hrv: 92, rhr: 52, strain: 11.4, energy: 80 },
    moments: [
      { time: '07:10', type: 'outdoor', label: 'Morning run by the lake', note: '4.2 mi · sunlight before 8am', driver: true },
      { time: '13:15', type: 'meal', label: 'Grain bowl + salmon', note: 'high protein · midday' },
      { time: '21:30', type: 'screenshot', label: 'Saved a reading list', note: 'calm wind-down · no late caffeine' },
    ],
    insight:
      'A bright, early start. Outdoor light before 8am lined up with one of your steadiest recovery days this week.',
    experiment: 'Keep the morning-light habit — try repeating it tomorrow before screens.',
  },
  {
    id: 'tue',
    short: 'Tue',
    full: 'Tuesday, Jun 9',
    bio: { sleep: 76, recovery: 64, hrv: 78, rhr: 55, strain: 14.8, energy: 68 },
    moments: [
      { time: '18:40', type: 'workout', label: 'Heavy leg day', note: 'highest strain of the week (14.8)' },
      { time: '20:55', type: 'meal', label: 'Late tacos + 2 beers', note: 'after 9pm · alcohol', driver: true },
      { time: '22:10', type: 'screenshot', label: 'Order confirmation', note: 'screen time past 10pm' },
    ],
    insight:
      'A hard session your body handled fine — but a late, heavier meal with alcohol nudged your sleep quality down a notch.',
    experiment: 'Tomorrow, aim to finish dinner before 8pm and see how HRV responds.',
  },
  {
    id: 'wed',
    short: 'Wed',
    full: 'Wednesday, Jun 10',
    bio: { sleep: 52, recovery: 41, hrv: 58, rhr: 61, strain: 9.2, energy: 39 },
    moments: [
      { time: '00:48', type: 'late-scroll', label: 'Late-night scrolling', note: '40+ min · 1:00–1:40am', driver: true },
      { time: '08:05', type: 'screenshot', label: 'Calendar: 6 back-to-back', note: 'dense day ahead' },
      { time: '14:30', type: 'meal', label: 'Cold brew #3', note: 'caffeine after 2pm', driver: true },
      { time: '23:20', type: 'work', label: 'Figma at the desk', note: 'work past 11pm' },
    ],
    insight:
      'Your lowest recovery of the week followed a 1am scroll, a packed calendar, and late caffeine. The day didn’t cause this — the night before did.',
    experiment: 'Set a soft 11pm cutoff for screens tonight. Even one night can move the needle.',
  },
  {
    id: 'thu',
    short: 'Thu',
    full: 'Thursday, Jun 11',
    bio: { sleep: 70, recovery: 52, hrv: 67, rhr: 58, strain: 8.1, energy: 55 },
    moments: [
      { time: '07:50', type: 'meal', label: 'Eggs + greens', note: 'slow, protein-first morning' },
      { time: '18:15', type: 'outdoor', label: 'Walk + sauna', note: 'active recovery · low strain', driver: true },
      { time: '22:00', type: 'screenshot', label: 'Saved a recipe', note: 'earlier wind-down than Tue/Wed' },
    ],
    insight:
      'A deliberate recovery day. Lower strain and an earlier evening helped you climb back from Wednesday’s dip.',
    experiment: 'Notice what made today calmer — protect one of those choices tomorrow.',
  },
  {
    id: 'fri',
    short: 'Fri',
    full: 'Friday, Jun 12',
    bio: { sleep: 80, recovery: 70, hrv: 85, rhr: 53, strain: 12.0, energy: 74 },
    moments: [
      { time: '12:30', type: 'social', label: 'Team lunch on the patio', note: 'daylight + people', driver: true },
      { time: '17:30', type: 'workout', label: 'Easy bike + mobility', note: 'moderate strain' },
      { time: '21:00', type: 'meal', label: 'Dinner at home, early', note: 'before 8pm' },
    ],
    insight:
      'Back in the green. A sociable, sunlit midday and an earlier dinner tracked with strong overnight HRV.',
    experiment: 'Daylight social time seems to suit you — try one outdoor break this weekend.',
  },
  {
    id: 'sat',
    short: 'Sat',
    full: 'Saturday, Jun 13',
    bio: { sleep: 60, recovery: 49, hrv: 63, rhr: 57, strain: 16.2, energy: 58 },
    moments: [
      { time: '10:00', type: 'outdoor', label: 'Long morning walk', note: 'good light early' },
      { time: '21:10', type: 'social', label: 'Friend’s birthday', note: 'late night out · loud venue' },
      { time: '23:55', type: 'meal', label: 'Midnight pizza', note: 'food photo after 9pm', driver: true },
      { time: '01:00', type: 'late-scroll', label: 'Wind-down scroll', note: 'past 1am again', driver: true },
    ],
    insight:
      'A great social Saturday with a familiar cost: a late meal and a 1am finish softened your sleep score.',
    experiment: 'Late nights are worth it sometimes — front-load tomorrow with light and water.',
  },
  {
    id: 'sun',
    short: 'Sun',
    full: 'Sunday, Jun 14',
    bio: { sleep: 88, recovery: 81, hrv: 96, rhr: 50, strain: 6.5, energy: 85 },
    moments: [
      { time: '09:30', type: 'outdoor', label: 'Farmers market', note: 'outdoors · steps + sunlight', driver: true },
      { time: '12:00', type: 'meal', label: 'Big colorful lunch', note: 'unhurried · midday' },
      { time: '17:00', type: 'travel', label: 'Hill Country drive', note: 'low strain · calm' },
    ],
    insight:
      'Your best day of the week. A low-strain, outdoor, early-to-bed Sunday produced your highest HRV (96ms).',
    experiment: 'This is your reset template — worth repeating when a week runs hot.',
  },
];

/** The headline cross-day pattern surfaced in the demo. */
export const PATTERN = {
  title: 'Pattern found',
  body: 'On days with a late-caffeine screenshot and a food photo after 9 PM, your sleep score averaged 18% lower.',
  detail: 'Seen across 3 of 7 days this week (Tue, Wed, Sat). A correlation worth noticing — not a diagnosis.',
};
