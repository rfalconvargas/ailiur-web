import { apCn } from './utils';

/** Shared form control styles — one type scale across studio tools. */
export const apFieldClass = apCn(
  'w-full rounded-[var(--ap-radius-md)] border border-[var(--ap-border-strong)]',
  'bg-[var(--ap-surface)] px-4 py-3 text-[0.9375rem] leading-normal text-[var(--ap-ink)] outline-none',
  'placeholder:text-[var(--ap-graphite)]',
  'transition-[border-color,box-shadow,background-color] duration-200',
  'focus:border-[var(--ap-gold)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--ap-gold)_22%,transparent)]',
);

export const apLabelClass =
  'text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ap-graphite)]';

/** Input panel (left column of studio tools). */
export const apToolInputPanel = apCn(
  'ap-tool-panel rounded-[var(--ap-radius-xl)] border border-[var(--ap-border)]',
  'bg-[var(--ap-surface)] p-6 shadow-[var(--ap-shadow-md)] sm:p-8',
  'transition-[box-shadow,border-color] duration-300',
);

/** Output panel (right column of studio tools). */
export const apToolOutputPanel = apCn(
  'ap-tool-output relative min-h-[28rem] rounded-[var(--ap-radius-xl)]',
  'border border-[var(--ap-border-strong)]',
  'bg-[color-mix(in_srgb,var(--ap-mist-soft)_35%,var(--ap-surface))]',
  'p-6 shadow-[var(--ap-shadow-lg)] sm:p-8',
);

/** Grid wrapper for split-panel tools. */
export const apToolGrid = 'grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8';
