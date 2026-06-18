'use client';

import {
  Activity,
  Calendar,
  GraduationCap,
  LayoutGrid,
  Repeat,
  Sun,
  Target,
  type LucideIcon,
} from 'lucide-react';
import { GoalsScreen } from '@/components/app/goals-screen';
import { TodayScreen } from '@/components/app/today-screen';
import { RoutinesScreen } from '@/components/app/routines-screen';
import { ActivitiesScreen } from '@/components/app/activities-screen';
import { CalendarScreen } from '@/components/app/calendar-screen';
import { LearnScreen } from '@/components/app/learn-screen';
import { WorkspaceScreen } from '@/components/app/workspace-screen';

/**
 * The fullscreen Ailiur App is organized into a small set of life-OS sections.
 * Each section is a self-contained screen module; this file just registers the
 * sidebar metadata and routes the active section to its screen.
 */

export type SectionId =
  | 'goals'
  | 'today'
  | 'routines'
  | 'activities'
  | 'calendar'
  | 'learn'
  | 'workspace';

export type AppSection = {
  id: SectionId;
  label: string;
  icon: LucideIcon;
  /** Short description shown under the screen title. */
  blurb: string;
};

// Goals is first so a new user starts by telling Ailiur what they want.
export const DEFAULT_SECTION: SectionId = 'goals';

export const APP_SECTIONS: AppSection[] = [
  { id: 'goals', label: 'Goals', icon: Target, blurb: 'Where everything in Ailiur begins.' },
  { id: 'today', label: 'Today', icon: Sun, blurb: 'Your daily protocol, at a glance.' },
  { id: 'routines', label: 'Routines', icon: Repeat, blurb: 'Habits, turned into repeatable time.' },
  { id: 'activities', label: 'Activities', icon: Activity, blurb: 'Actions that move your goals.' },
  { id: 'calendar', label: 'Calendar', icon: Calendar, blurb: 'Plan inside, sync outward.' },
  { id: 'learn', label: 'Learn', icon: GraduationCap, blurb: 'Understand the why behind the habit.' },
  { id: 'workspace', label: 'Workspace', icon: LayoutGrid, blurb: 'Every Ailiur app, one place.' },
];

export function SectionScreen({ id }: { id: SectionId }) {
  switch (id) {
    case 'goals':
      return <GoalsScreen />;
    case 'today':
      return <TodayScreen />;
    case 'routines':
      return <RoutinesScreen />;
    case 'activities':
      return <ActivitiesScreen />;
    case 'calendar':
      return <CalendarScreen />;
    case 'learn':
      return <LearnScreen />;
    case 'workspace':
      return <WorkspaceScreen />;
  }
}
