import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Class merge helper for Oruvo components. */
export function orCn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared easing — matches Ollune / Retellum / Ailiur motion language. */
export const OR_EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Tone → CSS var color, used by metric/asset chips. */
export const TONE_COLOR: Record<string, string> = {
  pos: 'var(--or-green)',
  neg: 'var(--or-red)',
  gold: 'var(--or-gold)',
  neutral: 'var(--or-slate)',
};
