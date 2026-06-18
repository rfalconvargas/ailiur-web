import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Class merge helper for Daymesh components. */
export function dmCn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared easing — matches the Ailiur ecosystem motion language. */
export const DM_EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Maps a Daymesh zone to its accent CSS variable. */
export const DM_ZONE_COLOR = {
  high: 'var(--dm-sage)',
  mid: 'var(--dm-amber)',
  low: 'var(--dm-clay)',
} as const;
