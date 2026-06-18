'use client';

import { useMemo, useState } from 'react';
import { BookOpen, Check, ListPlus, Lock, Sparkles, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocalState } from '@/components/app/use-local-state';
import { AddButton, Badge, Drawer, ScreenHeader } from '@/components/app/app-ui';
import { useLifeOs } from '@/components/app/life-os-context';
import { type DomainId } from '@/components/app/life-os';

// --- Data model ----------------------------------------------------------- //

export type LessonType = 'lesson' | 'practice' | 'reflection' | 'protocol';
export type LessonStatus = 'locked' | 'available' | 'complete';

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  minutes: number;
  keyIdea: string;
  linked?: string; // a habit or activity this lesson supports
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  domain: DomainId;
  recommendedBecause: string;
  lessons: Lesson[];
}

const TYPE_LABEL: Record<LessonType, string> = {
  lesson: 'Lesson',
  practice: 'Practice',
  reflection: 'Reflection',
  protocol: 'Protocol',
};

const L = (id: string, title: string, type: LessonType, minutes: number, keyIdea: string, linked?: string): Lesson => ({
  id,
  title,
  type,
  minutes,
  keyIdea,
  linked,
});

/** Ten learning paths. Swap for a CMS/API later — shapes stay the same. */
export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'energy',
    title: 'Foundations of Energy',
    description: 'How light, movement, and food shape the energy you feel each day.',
    domain: 'body',
    recommendedBecause: 'You flagged energy as a priority.',
    lessons: [
      L('energy-1', 'Why energy is a system', 'lesson', 6, 'Energy is produced and spent — both are trainable.', 'Morning sunlight'),
      L('energy-2', 'Morning light practice', 'practice', 5, 'Early daylight may help your rhythm settle.', '10-minute walk'),
      L('energy-3', 'Map your energy curve', 'reflection', 8, 'Noticing your curve lets you plan around it.'),
    ],
  },
  {
    id: 'focus',
    title: 'Focus Without Burnout',
    description: 'Protect attention and do deep work without running yourself down.',
    domain: 'work',
    recommendedBecause: 'You mentioned distraction and overwhelm.',
    lessons: [
      L('focus-1', 'Attention is a budget', 'lesson', 7, 'You spend attention whether you mean to or not.'),
      L('focus-2', 'The 90-minute block', 'protocol', 6, 'One protected block beats a scattered day.', 'Deep work block'),
      L('focus-3', 'Reset between blocks', 'practice', 5, 'Short resets may keep focus sustainable.', '5-minute reset'),
    ],
  },
  {
    id: 'consistency',
    title: 'Building Consistency',
    description: 'Make habits stick by shrinking them and anchoring them.',
    domain: 'mind',
    recommendedBecause: 'You flagged inconsistent routines.',
    lessons: [
      L('cons-1', 'Smallest viable habit', 'lesson', 6, 'Tiny habits survive bad days.'),
      L('cons-2', 'Anchor to what exists', 'practice', 5, 'Attach the new habit to a current one.'),
      L('cons-3', 'Repair, don’t restart', 'reflection', 5, 'Missing once is data, not failure.'),
    ],
  },
  {
    id: 'sleep',
    title: 'Better Sleep Rhythm',
    description: 'Build a wind-down that makes mornings easier.',
    domain: 'body',
    recommendedBecause: 'You flagged poor or irregular sleep.',
    lessons: [
      L('sleep-1', 'The wind-down window', 'lesson', 6, 'A consistent close to the day may help sleep.'),
      L('sleep-2', 'Evening shutdown', 'protocol', 5, 'A short ritual signals the day is done.', 'Evening Shutdown'),
      L('sleep-3', 'Light and timing', 'lesson', 6, 'When you see light shapes when you sleep.'),
    ],
  },
  {
    id: 'longevity',
    title: 'Longevity Basics',
    description: 'The simple, durable inputs that support a long healthy life.',
    domain: 'body',
    recommendedBecause: 'Body & energy is one of your domains.',
    lessons: [
      L('long-1', 'Move often, lift sometimes', 'lesson', 7, 'Movement is the broadest lever you have.', 'Bodyweight strength set'),
      L('long-2', 'Protein & whole foods', 'lesson', 6, 'Steady inputs beat perfect ones.', 'Protein-forward breakfast'),
      L('long-3', 'Recovery counts', 'reflection', 5, 'Rest is part of the training, not a break from it.'),
    ],
  },
  {
    id: 'emotion',
    title: 'Emotional Regulation',
    description: 'Meet hard moments with skills instead of pressure.',
    domain: 'mind',
    recommendedBecause: 'You flagged stress.',
    lessons: [
      L('emo-1', 'Name it to tame it', 'lesson', 6, 'Labeling a feeling can lower its charge.'),
      L('emo-2', 'A 5-minute reset', 'practice', 5, 'A brief pause may take the edge off.', '5-minute reset'),
      L('emo-3', 'Evening reflection', 'reflection', 6, 'Closing the day with honesty builds steadiness.'),
    ],
  },
  {
    id: 'learning',
    title: 'Learning How to Learn',
    description: 'Study less, remember more, and keep momentum.',
    domain: 'learning',
    recommendedBecause: 'Learning & skills is one of your domains.',
    lessons: [
      L('learn-1', 'Spacing & retrieval', 'lesson', 7, 'Recalling beats re-reading.', 'Read 10 pages'),
      L('learn-2', 'Ten pages a day', 'practice', 5, 'Small daily input compounds.', 'Read 10 pages'),
      L('learn-3', 'Teach it back', 'reflection', 6, 'Explaining reveals what you don’t yet know.'),
    ],
  },
  {
    id: 'money',
    title: 'Money Clarity',
    description: 'Make your finances calm and legible, not stressful.',
    domain: 'money',
    recommendedBecause: 'You flagged money pressure.',
    lessons: [
      L('money-1', 'See the whole picture', 'lesson', 7, 'Clarity reduces money anxiety.'),
      L('money-2', 'Monthly money reset', 'protocol', 6, 'A short monthly review keeps things current.', 'Monthly Money Reset'),
      L('money-3', 'One number to watch', 'reflection', 5, 'Pick a single signal you can steer.'),
    ],
  },
  {
    id: 'social',
    title: 'Social Connection',
    description: 'Keep the relationships that sustain you, even when busy.',
    domain: 'relationships',
    recommendedBecause: 'You flagged social isolation.',
    lessons: [
      L('social-1', 'Connection is a habit', 'lesson', 6, 'Closeness comes from small, frequent contact.'),
      L('social-2', 'Call one person', 'practice', 5, 'One conversation is a reliable lift.', 'Call one person'),
      L('social-3', 'Your inner circle', 'reflection', 6, 'Name who matters, then make time.'),
    ],
  },
  {
    id: 'creative',
    title: 'Creative Momentum',
    description: 'Make space to create and play, not just produce.',
    domain: 'creativity',
    recommendedBecause: 'Creativity & play is one of your domains.',
    lessons: [
      L('create-1', 'Lower the stakes', 'lesson', 6, 'Play unlocks what pressure shuts down.'),
      L('create-2', 'Twenty-minute sketch', 'practice', 5, 'Short sessions keep the muscle warm.', 'Sketch for 20 minutes'),
      L('create-3', 'Capture sparks', 'reflection', 5, 'A simple inbox for ideas keeps them alive.'),
    ],
  },
];

// --- Helpers -------------------------------------------------------------- //

function lessonStatus(path: LearningPath, index: number, done: Set<string>): LessonStatus {
  const id = path.lessons[index].id;
  if (done.has(id)) return 'complete';
  if (index === 0 || done.has(path.lessons[index - 1].id)) return 'available';
  return 'locked';
}

function pathProgress(path: LearningPath, done: Set<string>) {
  const completed = path.lessons.filter((l) => done.has(l.id)).length;
  return { completed, total: path.lessons.length, pct: Math.round((completed / path.lessons.length) * 100) };
}

const estMinutes = (p: LearningPath) => p.lessons.reduce((n, l) => n + l.minutes, 0);

// --- Path card ------------------------------------------------------------ //

function PathCard({
  path,
  done,
  recommended,
  onOpen,
  onContinue,
}: {
  path: LearningPath;
  done: Set<string>;
  recommended: boolean;
  onOpen: () => void;
  onContinue: () => void;
}) {
  const { completed, total, pct } = pathProgress(path, done);
  const finished = completed === total;
  return (
    <div className={cn('glass rounded-[var(--radius-card)] p-6', recommended && 'ring-1 ring-accent-green/40')}>
      <div className="flex items-start justify-between gap-3">
        <button type="button" onClick={onOpen} className="text-left">
          <h3 className="font-display text-lg font-extrabold tracking-tight text-foreground">{path.title}</h3>
        </button>
        {recommended && <Badge tint="var(--accent-green)">Recommended</Badge>}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-foreground/65">{path.description}</p>
      {recommended && (
        <p className="mt-2 text-xs text-foreground/50">
          <Sparkles className="mr-1 inline h-3 w-3 text-accent-green" />
          {path.recommendedBecause}
        </p>
      )}

      <div className="mt-4 flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/50">
          <div className="h-full rounded-full bg-accent-green transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <span className="text-xs font-medium text-foreground/55">
          {completed}/{total}
        </span>
      </div>
      <p className="mt-2 text-xs text-foreground/45">~{estMinutes(path)} min · {total} lessons</p>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-white/40 pt-4">
        <button
          type="button"
          onClick={finished ? onOpen : onContinue}
          className="inline-flex items-center gap-1 rounded-full bg-accent-green px-4 py-2 text-xs font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
        >
          <BookOpen className="h-3.5 w-3.5" />
          {finished ? 'Review' : completed ? 'Continue' : 'Start'}
        </button>
        <AddButton label="Apply to Today" addedLabel="In Today" icon={Sun} />
        <AddButton label="Add practice to Routine" addedLabel="In Routine" icon={ListPlus} />
      </div>
    </div>
  );
}

// --- Section -------------------------------------------------------------- //

export function LearnScreen() {
  const { lifeMap } = useLifeOs();
  const [doneList, setDoneList] = useLocalState<string[]>('ailiur.learn.v1', []);
  const [detail, setDetail] = useState<LearningPath | null>(null);

  const done = useMemo(() => new Set(doneList), [doneList]);
  const priorityDomains = useMemo(
    () => new Set((lifeMap?.priorityDomains ?? []).map((d) => d.id)),
    [lifeMap]
  );

  const toggleLesson = (path: LearningPath, index: number) => {
    const status = lessonStatus(path, index, done);
    if (status === 'locked') return;
    const id = path.lessons[index].id;
    setDoneList((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));
  };

  const continuePath = (path: LearningPath) => {
    const next = path.lessons.findIndex((l) => !done.has(l.id));
    if (next === -1) return;
    setDoneList((list) => [...list, path.lessons[next].id]);
  };

  // Recommended paths first.
  const sorted = [...LEARNING_PATHS].sort(
    (a, b) => Number(priorityDomains.has(b.domain)) - Number(priorityDomains.has(a.domain))
  );

  return (
    <div className="mx-auto max-w-4xl">
      <ScreenHeader
        eyebrow="Learn"
        title="Understand why the protocol works."
        body="Short lessons, practices, and reflections — unlocked as you go. Each one explains the idea behind a habit so it’s easier to sustain."
      />

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sorted.map((p) => (
          <PathCard
            key={p.id}
            path={p}
            done={done}
            recommended={priorityDomains.has(p.domain)}
            onOpen={() => setDetail(p)}
            onContinue={() => continuePath(p)}
          />
        ))}
      </div>

      {/* Path detail */}
      <Drawer open={!!detail} onClose={() => setDetail(null)} title={detail?.title ?? 'Path'}>
        {detail && (
          <div>
            <p className="text-sm leading-relaxed text-foreground/70">{detail.description}</p>
            <div className="mt-5 space-y-2">
              {detail.lessons.map((lesson, i) => {
                const status = lessonStatus(detail, i, done);
                const locked = status === 'locked';
                const complete = status === 'complete';
                return (
                  <button
                    key={lesson.id}
                    type="button"
                    disabled={locked}
                    onClick={() => toggleLesson(detail, i)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors',
                      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
                      locked
                        ? 'cursor-not-allowed border-white/40 bg-white/25 opacity-70'
                        : 'border-white/60 bg-white/45 hover:bg-white/65'
                    )}
                  >
                    <span
                      className={cn(
                        'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                        complete ? 'bg-accent-green text-[#fffdf5]' : 'bg-white/70 text-foreground/60'
                      )}
                    >
                      {locked ? <Lock className="h-3.5 w-3.5" /> : complete ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-foreground">{lesson.title}</span>
                        <Badge>{TYPE_LABEL[lesson.type]}</Badge>
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-foreground/60">{lesson.keyIdea}</span>
                      <span className="mt-1 block text-[11px] text-foreground/40">
                        {lesson.minutes} min{lesson.linked ? ` · supports “${lesson.linked}”` : ''}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <AddButton label="Apply to Today" addedLabel="In Today" icon={Sun} />
              <AddButton label="Add practice to Routine" addedLabel="In Routine" icon={ListPlus} />
            </div>
            <p className="mt-5 text-xs leading-relaxed text-foreground/45">
              Educational content only — not medical, psychological, or financial advice.
            </p>
          </div>
        )}
      </Drawer>
    </div>
  );
}
