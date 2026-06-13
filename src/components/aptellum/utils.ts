import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Class merge helper for Aptellum components. */
export function apCn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared easing — matches Retellum / Ailiur motion language. */
export const AP_EASE_OUT = [0.22, 1, 0.36, 1] as const;
