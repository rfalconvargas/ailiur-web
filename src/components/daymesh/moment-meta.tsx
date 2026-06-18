import {
  Utensils,
  Smartphone,
  Dumbbell,
  Briefcase,
  Users,
  MoonStar,
  Plane,
  Sun,
  type LucideIcon,
} from 'lucide-react';
import type { MomentType } from '@/lib/daymesh/data';

/** Visual metadata for each camera-roll moment type. */
export const MOMENT_META: Record<
  MomentType,
  { icon: LucideIcon; label: string; color: string; tint: string }
> = {
  meal: { icon: Utensils, label: 'Meal', color: 'var(--dm-amber-deep)', tint: 'rgba(207,138,51,0.12)' },
  screenshot: { icon: Smartphone, label: 'Screenshot', color: 'var(--dm-ink-soft)', tint: 'rgba(34,31,26,0.07)' },
  workout: { icon: Dumbbell, label: 'Workout', color: 'var(--dm-sage-deep)', tint: 'rgba(93,138,107,0.14)' },
  work: { icon: Briefcase, label: 'Work', color: 'var(--dm-ink-soft)', tint: 'rgba(34,31,26,0.07)' },
  social: { icon: Users, label: 'Social', color: 'var(--dm-amber-deep)', tint: 'rgba(207,138,51,0.12)' },
  'late-scroll': { icon: MoonStar, label: 'Late-night', color: 'var(--dm-clay)', tint: 'rgba(192,88,75,0.12)' },
  travel: { icon: Plane, label: 'Travel', color: 'var(--dm-sage-deep)', tint: 'rgba(93,138,107,0.14)' },
  outdoor: { icon: Sun, label: 'Outdoor', color: 'var(--dm-sage-deep)', tint: 'rgba(93,138,107,0.14)' },
};
