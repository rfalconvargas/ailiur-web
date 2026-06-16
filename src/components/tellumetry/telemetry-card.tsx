import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { tmCn } from './utils';

type TelemetryCardProps = {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  /** Small supporting line under the value. */
  hint?: ReactNode;
  /** CSS color token for the icon + value. Defaults to ivory. */
  accent?: string;
  /** Dim the value when no estimate exists yet (pre-simulation). */
  pending?: boolean;
  className?: string;
  /** Extra content below the value — e.g. file chips. */
  children?: ReactNode;
};

/**
 * A single telemetry readout — icon + label + a large value, on a muted
 * instrument tile. Reused for every output metric in the preflight demo.
 */
export function TelemetryCard({
  icon: Icon,
  label,
  value,
  hint,
  accent = 'var(--tm-ivory)',
  pending = false,
  className,
  children,
}: TelemetryCardProps) {
  return (
    <div
      className={tmCn(
        'rounded-[var(--tm-radius-md)] border border-[var(--tm-hairline)] bg-[var(--tm-surface-muted)] p-4 sm:p-5',
        className,
      )}
    >
      <div className="flex items-center gap-1.5 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[var(--tm-slate-dim)]">
        <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: pending ? undefined : accent }} strokeWidth={1.75} aria-hidden />
        <span className="truncate">{label}</span>
      </div>
      <div
        className="mt-2 font-mono text-2xl font-semibold leading-none tabular-nums tracking-tight transition-colors duration-300"
        style={{ color: pending ? 'var(--tm-slate-dim)' : accent }}
      >
        {value}
      </div>
      {hint && (
        <p className="mt-1.5 text-[0.75rem] leading-relaxed text-[var(--tm-slate)]">{hint}</p>
      )}
      {children}
    </div>
  );
}
