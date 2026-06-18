'use client';

import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * A slim persistent "Context Mesh" indicator. It shows the unified chain
 * Goal → Habit → Routine → Calendar → Learn → Workspace, highlights the node
 * tied to the current section, and explains how that section feeds the Mesh.
 */

type MeshKey =
  | 'goals'
  | 'today'
  | 'routines'
  | 'activities'
  | 'calendar'
  | 'learn'
  | 'workspace'
  | 'profile'
  | 'settings';

const NODES = ['Goal', 'Habit', 'Routine', 'Calendar', 'Learn', 'Workspace'] as const;

const MESH: Record<MeshKey, { node: (typeof NODES)[number] | null; message: string }> = {
  goals: { node: 'Goal', message: 'Your answers shape the Mesh.' },
  today: { node: 'Habit', message: 'Daily habits are generated from your Life Map.' },
  routines: { node: 'Routine', message: 'Routines package habits into repeatable systems.' },
  activities: { node: null, message: 'Activities give your goals real-world options.' },
  calendar: { node: 'Calendar', message: 'Your plan becomes time.' },
  learn: { node: 'Learn', message: 'Lessons explain why the protocol works.' },
  workspace: { node: 'Workspace', message: 'Apps are specialized surfaces of the same system.' },
  profile: { node: null, message: 'One identity across the whole Mesh.' },
  settings: { node: null, message: 'You decide what stays local and what syncs.' },
};

export function ContextMeshBar({ view }: { view: MeshKey }) {
  const { node, message } = MESH[view];
  return (
    <div className="glass-strong flex flex-col gap-2 rounded-full px-4 py-2 sm:flex-row sm:items-center sm:gap-4">
      <div className="flex items-center gap-1.5">
        <span className="mr-1 text-[10px] font-bold uppercase tracking-widest text-foreground/45">
          Context Mesh
        </span>
        <div className="flex items-center gap-1 overflow-x-auto">
          {NODES.map((n, i) => {
            const active = n === node;
            return (
              <span key={n} className="flex items-center gap-1">
                <span
                  className={cn(
                    'whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors',
                    active ? 'bg-accent-green text-[#fffdf5]' : 'text-foreground/45'
                  )}
                >
                  {n}
                </span>
                {i < NODES.length - 1 && <ChevronRight className="h-3 w-3 shrink-0 text-foreground/30" />}
              </span>
            );
          })}
        </div>
      </div>
      <p className="truncate text-xs text-foreground/60 sm:ml-auto">{message}</p>
    </div>
  );
}
