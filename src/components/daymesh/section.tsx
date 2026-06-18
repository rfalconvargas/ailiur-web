import type { ReactNode } from 'react';
import { DaymeshReveal } from './reveal';
import { dmCn } from './utils';

export function DaymeshEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="dm-glass inline-flex items-center gap-2 rounded-[var(--dm-radius-pill)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--dm-amber-deep)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--dm-amber)] shadow-[0_0_8px_var(--dm-amber-soft)]" />
      {children}
    </span>
  );
}

type DaymeshSectionProps = {
  id?: string;
  eyebrow?: string;
  headline: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  centered?: boolean;
  className?: string;
};

/** Consistent section scaffold: eyebrow, display headline, optional intro. */
export function DaymeshSection({
  id,
  eyebrow,
  headline,
  intro,
  children,
  centered,
  className,
}: DaymeshSectionProps) {
  return (
    <section
      id={id}
      className={dmCn(
        'mx-auto w-full max-w-[var(--dm-content-max)] px-4 py-[var(--dm-section-y)] sm:px-6',
        className,
      )}
    >
      <DaymeshReveal className={dmCn('max-w-2xl', centered && 'mx-auto text-center')}>
        {eyebrow && <DaymeshEyebrow>{eyebrow}</DaymeshEyebrow>}
        <h2 className="mt-5 font-display text-[length:var(--dm-text-h1)] font-extrabold leading-[1.08] tracking-tight text-[var(--dm-ink)]">
          {headline}
        </h2>
        {intro && (
          <p className="mt-5 text-[length:var(--dm-text-body)] leading-relaxed text-[var(--dm-muted)]">
            {intro}
          </p>
        )}
      </DaymeshReveal>
      {children}
    </section>
  );
}
