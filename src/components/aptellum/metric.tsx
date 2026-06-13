import type { ReactNode } from 'react';
import { apCn } from './utils';

type AptellumMetricProps = {
  value: string;
  label: string;
  detail?: string;
  className?: string;
  accent?: 'gold' | 'mist' | 'ink' | 'green';
  icon?: ReactNode;
};

const accentBar = {
  gold: 'bg-[var(--ap-gold)]',
  mist: 'bg-[var(--ap-mist)]',
  ink: 'bg-[var(--ap-ink)]',
  green: 'bg-[var(--ap-ailiur-green)]',
} as const;

/**
 * Trust-building stat block — Mercury-style clarity with editorial type.
 */
export function AptellumMetric({
  value,
  label,
  detail,
  className,
  accent = 'gold',
  icon,
}: AptellumMetricProps) {
  return (
    <div
      className={apCn(
        'flex flex-col gap-2 rounded-[var(--ap-radius-md)] border border-[var(--ap-border)]',
        'bg-[var(--ap-surface)] p-5 shadow-[var(--ap-shadow-sm)] sm:p-6',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-none tracking-tight text-[var(--ap-ink)]"
          aria-label={`${value} ${label}`}
        >
          {value}
        </span>
        {icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--ap-radius-sm)] bg-[var(--ap-mist-soft)] text-[var(--ap-graphite)]">
            {icon}
          </span>
        )}
      </div>
      <div className={apCn('h-0.5 w-8 rounded-full', accentBar[accent])} aria-hidden />
      <p className="text-sm font-semibold tracking-tight text-[var(--ap-ink)]">{label}</p>
      {detail && (
        <p className="text-[length:var(--ap-text-small)] leading-relaxed text-[var(--ap-graphite)]">
          {detail}
        </p>
      )}
    </div>
  );
}
