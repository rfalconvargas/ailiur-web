import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Class merge helper for Ollune components. */
export function olCn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared easing — matches Retellum / Aptellum / Ailiur motion language. */
export const OL_EASE_OUT = [0.22, 1, 0.36, 1] as const;
