import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Class merge helper for Lociq components. */
export function lqCn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared easing — matches Aptellum / Retellum / Tayzt / Tellumetry / Ailiur motion language. */
export const LQ_EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Maps a Lociq signal name to its scoped CSS color token. */
export const LQ_SIGNAL: Record<'green' | 'gold' | 'blue' | 'charcoal', string> = {
  green: 'var(--lq-green)',
  gold: 'var(--lq-gold)',
  blue: 'var(--lq-blue)',
  charcoal: 'var(--lq-charcoal)',
};
