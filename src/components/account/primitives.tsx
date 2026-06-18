import type { LucideIcon } from 'lucide-react';
import { SmartLink } from '@/components/ui/smart-link';

/**
 * Pure presentational primitives for the Account Center. No 'use client' — safe
 * to use inside server components. Interactive controls live in separate client
 * files (toggle-control, profile-form, etc.).
 */

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="mb-8">
      {eyebrow && (
        <span className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
          {eyebrow}
        </span>
      )}
      <h1 className="mt-2 font-display text-[clamp(1.7rem,3.5vw,2.5rem)] font-extrabold leading-[1.08] tracking-tight text-foreground">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-foreground/70">{description}</p>
      )}
    </header>
  );
}

export function Card({
  icon: Icon,
  title,
  description,
  action,
  children,
  className = '',
}: {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`glass rounded-[var(--radius-card)] p-6 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            {Icon && (
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-foreground/[0.06] text-foreground/70">
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
            )}
            <div>
              {title && (
                <h2 className="font-display text-base font-extrabold tracking-tight text-foreground">
                  {title}
                </h2>
              )}
              {description && <p className="text-xs text-foreground/60">{description}</p>}
            </div>
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Row({
  label,
  value,
  hint,
}: {
  label: string;
  value: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/40 py-3 last:border-0">
      <div className="min-w-0">
        <span className="block text-sm text-foreground/60">{label}</span>
        {hint && <span className="block text-xs text-foreground/45">{hint}</span>}
      </div>
      <span className="shrink-0 text-right text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

type Tone = 'green' | 'red' | 'neutral' | 'amber';

const TONE: Record<Tone, string> = {
  green: 'bg-accent-green/15 text-accent-green',
  red: 'bg-accent-red/15 text-accent-red',
  amber: 'bg-[#ff9500]/15 text-[#b56b00]',
  neutral: 'bg-foreground/[0.07] text-foreground/65',
};

export function Badge({ tone = 'neutral', children }: { tone?: Tone; children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${TONE[tone]}`}
    >
      {children}
    </span>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  href?: string;
}) {
  const body = (
    <div className="glass flex items-center gap-4 rounded-[var(--radius-card)] p-5 transition-transform hover:-translate-y-0.5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-foreground/[0.06] text-foreground/70">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <div className="min-w-0">
        <p className="font-display text-2xl font-extrabold leading-none tracking-tight text-foreground">
          {value}
        </p>
        <p className="mt-1 text-xs text-foreground/60">{label}</p>
      </div>
    </div>
  );
  return href ? <SmartLink href={href}>{body}</SmartLink> : body;
}

export function EmptyState({
  icon: Icon,
  title,
  body,
  action,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-white/60 bg-white/20 px-6 py-10 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/[0.06] text-foreground/55">
        <Icon className="h-6 w-6" strokeWidth={1.8} />
      </span>
      <p className="mt-4 text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-1 max-w-sm text-sm leading-relaxed text-foreground/60">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

/** Notice shown when the DB account layer isn't provisioned yet (pre-migration). */
export function ProvisionNotice() {
  return (
    <div className="mb-6 rounded-[var(--radius-card)] border border-[#ff9500]/30 bg-[#ff9500]/10 px-5 py-4 text-sm leading-relaxed text-foreground/80">
      Your Ailiur Account record isn’t provisioned yet. Apply the database
      migrations (<span className="font-mono text-xs">supabase db push</span>) and set{' '}
      <span className="font-mono text-xs">SUPABASE_JWT_SECRET</span> to unlock live account data.
      The controls below are wired and will work once that’s done.
    </div>
  );
}
