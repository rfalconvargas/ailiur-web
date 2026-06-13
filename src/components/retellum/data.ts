import {
  Film,
  MonitorPlay,
  BookOpen,
  Gamepad2,
  FileText,
  Disc3,
  Drama,
  UserRound,
  FolderKanban,
  type LucideIcon,
} from 'lucide-react';

/** The medium of a logged work. Values match the labels shown in the UI. */
export type MediaType =
  | 'Film'
  | 'YouTube'
  | 'Book'
  | 'Game'
  | 'Essay'
  | 'Album'
  | 'Play'
  | 'Creator'
  | 'Project';

export type MediaItem = {
  id: string;
  title: string;
  type: MediaType;
  creator: string;
  year: string;
  tags: string[];
  reflection: string;
  lesson: string;
  /** ids of related items — drawn as edges in the constellation. */
  connectedTo: string[];
};

/** Per-type presentation: icon + a muted, editorial accent color. */
export const TYPE_META: Record<MediaType, { icon: LucideIcon; accent: string }> = {
  Film: { icon: Film, accent: '#b4532a' },
  YouTube: { icon: MonitorPlay, accent: '#c0453a' },
  Book: { icon: BookOpen, accent: '#1fa85c' },
  Game: { icon: Gamepad2, accent: '#6b5a16' },
  Essay: { icon: FileText, accent: '#8a6d3b' },
  Album: { icon: Disc3, accent: '#7d5fb2' },
  Play: { icon: Drama, accent: '#b8860b' },
  Creator: { icon: UserRound, accent: '#1c1606' },
  Project: { icon: FolderKanban, accent: '#2a7d6b' },
};

/** Ordered list of types — used for select inputs. */
export const MEDIA_TYPES = Object.keys(TYPE_META) as MediaType[];

/**
 * Hardcoded sample footprint for the interactive prototype. The `connectedTo`
 * edges form a small, coherent web around shared themes (attention, time,
 * craft, curiosity) so the constellation reads as a real map of taste.
 */
export const sampleMediaItems: MediaItem[] = [
  {
    id: 'space-odyssey',
    title: '2001: A Space Odyssey',
    type: 'Film',
    creator: 'Stanley Kubrick',
    year: '1968',
    tags: ['silence', 'evolution', 'awe'],
    reflection:
      'Watched it slowly, twice. The patience of the editing reframed how I think about pacing — that restraint can be louder than spectacle.',
    lesson: 'Withholding can communicate more than showing. Leave room for the viewer to arrive.',
    connectedTo: ['order-of-time', 'in-rainbows', 'miyazaki'],
  },
  {
    id: 'how-to-speak',
    title: 'How to Speak',
    type: 'YouTube',
    creator: 'Patrick Winston · MIT',
    year: '2018',
    tags: ['communication', 'craft', 'teaching'],
    reflection:
      'A lecture I return to before any talk. It turned vague intuitions about clarity into a small set of repeatable moves.',
    lesson: 'Start with a promise, end with a contribution. Structure is a courtesy to your audience.',
    connectedTo: ['this-is-water', 'long-now', 'thinking-fast'],
  },
  {
    id: 'order-of-time',
    title: 'The Order of Time',
    type: 'Book',
    creator: 'Carlo Rovelli',
    year: '2017',
    tags: ['physics', 'memory', 'perception'],
    reflection:
      'Read it in one weekend by the window. It loosened my grip on time as a line and let me feel it as relationship and granularity.',
    lesson: 'What feels most fundamental is often the most assumed. Question the frame, not just the picture.',
    connectedTo: ['space-odyssey', 'long-now', 'outer-wilds'],
  },
  {
    id: 'outer-wilds',
    title: 'Outer Wilds',
    type: 'Game',
    creator: 'Mobius Digital',
    year: '2019',
    tags: ['curiosity', 'discovery', 'mortality'],
    reflection:
      'The only progression is understanding. Knowing more is the upgrade. It rewired what I think a game — or a tool — can be for.',
    lesson: 'Curiosity is its own reward system. Design for the moment of "oh, I see".',
    connectedTo: ['order-of-time', 'this-is-water', 'miyazaki'],
  },
  {
    id: 'this-is-water',
    title: 'This Is Water',
    type: 'Essay',
    creator: 'David Foster Wallace',
    year: '2005',
    tags: ['attention', 'empathy', 'default-mode'],
    reflection:
      'Reread every few months. It reframes attention itself as a moral act — what you choose to notice quietly builds the life you live.',
    lesson: 'Awareness is a discipline, not a mood. The work is choosing what to attend to.',
    connectedTo: ['how-to-speak', 'outer-wilds', 'rosencrantz', 'thinking-fast'],
  },
  {
    id: 'in-rainbows',
    title: 'In Rainbows',
    type: 'Album',
    creator: 'Radiohead',
    year: '2007',
    tags: ['texture', 'warmth', 'restraint'],
    reflection:
      'The record that taught me space in a mix is an instrument. The gaps between sounds carry as much feeling as the sounds.',
    lesson: 'Negative space is a design material. What you leave out shapes what lands.',
    connectedTo: ['space-odyssey', 'miyazaki'],
  },
  {
    id: 'rosencrantz',
    title: 'Rosencrantz & Guildenstern Are Dead',
    type: 'Play',
    creator: 'Tom Stoppard',
    year: '1966',
    tags: ['perspective', 'fate', 'wit'],
    reflection:
      'Saw it staged in a small theatre. Telling Hamlet from the margins showed me how much a story changes with whose eyes you borrow.',
    lesson: 'Every minor character is the protagonist of a story you are not telling. Shift the vantage point.',
    connectedTo: ['this-is-water', 'miyazaki'],
  },
  {
    id: 'miyazaki',
    title: 'Hayao Miyazaki',
    type: 'Creator',
    creator: 'Studio Ghibli',
    year: 'ongoing',
    tags: ['craft', 'stillness', 'wonder'],
    reflection:
      'Tracking a body of work, not a title. His insistence on quiet, mundane moments amid spectacle reset my sense of what deserves screen time.',
    lesson: 'A signature is built from small, repeated convictions — not from any single masterpiece.',
    connectedTo: ['space-odyssey', 'in-rainbows', 'outer-wilds', 'rosencrantz'],
  },
  {
    id: 'long-now',
    title: 'The Clock of the Long Now',
    type: 'Project',
    creator: 'The Long Now Foundation',
    year: 'in progress',
    tags: ['time', 'stewardship', 'scale'],
    reflection:
      'A clock built to keep time for 10,000 years. Following the project stretched my planning horizon and how I weigh what lasts.',
    lesson: 'Designing for a longer horizon changes every near-term decision. Set the timescale first.',
    connectedTo: ['order-of-time', 'how-to-speak'],
  },
  {
    id: 'thinking-fast',
    title: 'Thinking, Fast and Slow',
    type: 'Book',
    creator: 'Daniel Kahneman',
    year: '2011',
    tags: ['cognition', 'bias', 'attention'],
    reflection:
      'Slow read with a notebook. It gave names to the quiet automatic moves my mind makes before I ever decide anything.',
    lesson: 'You cannot correct a bias you cannot name. Vocabulary is the first instrument of judgment.',
    connectedTo: ['this-is-water', 'how-to-speak', 'outer-wilds'],
  },
];

export const MEDIA_BY_ID = Object.fromEntries(
  sampleMediaItems.map((e) => [e.id, e]),
) as Record<string, MediaItem>;
