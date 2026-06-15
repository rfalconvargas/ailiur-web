import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Class merge helper for Tayzt components. */
export function tzCn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared easing — matches Aptellum / Retellum / Ailiur motion language. */
export const TZ_EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Maps an Ailiur signal name to its scoped CSS color token. */
export const TZ_SIGNAL: Record<'gold' | 'green' | 'red' | 'amber', string> = {
  gold: 'var(--tz-gold)',
  green: 'var(--tz-green)',
  red: 'var(--tz-red)',
  amber: 'var(--tz-amber)',
};
