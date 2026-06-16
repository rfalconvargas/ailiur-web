import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Class merge helper for Unified Context Mesh components. */
export function ucmCn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared easing — matches Aptellum / Retellum / Tayzt / Tellumetry / Ailiur motion. */
export const UCM_EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Maps a UCM signal name to its scoped CSS color token. */
export const UCM_SIGNAL: Record<
  'gold' | 'green' | 'amber' | 'red' | 'chatgpt' | 'claude' | 'gemini',
  string
> = {
  gold: 'var(--ucm-gold)',
  green: 'var(--ucm-green)',
  amber: 'var(--ucm-amber)',
  red: 'var(--ucm-red)',
  chatgpt: 'var(--ucm-chatgpt)',
  claude: 'var(--ucm-claude)',
  gemini: 'var(--ucm-gemini)',
};
