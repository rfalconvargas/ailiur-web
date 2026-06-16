import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Class merge helper for Tellumetry components. */
export function tmCn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared easing — matches Aptellum / Retellum / Tayzt / Ailiur motion language. */
export const TM_EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Maps a Tellumetry signal name to its scoped CSS color token. */
export const TM_SIGNAL: Record<'mint' | 'cyan' | 'green' | 'amber' | 'red', string> = {
  mint: 'var(--tm-mint)',
  cyan: 'var(--tm-cyan)',
  green: 'var(--tm-green)',
  amber: 'var(--tm-amber)',
  red: 'var(--tm-red)',
};
