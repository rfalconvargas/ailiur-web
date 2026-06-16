import type { ReactNode } from 'react';
import { LociqReveal } from './scroll-reveal';
import { lqCn } from './utils';

type LociqSectionProps = {
  id?: string;
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  children?: ReactNode;
  className?: string;
  centered?: boolean;
  /** narrow = prose width; default = 6xl; wide = 7xl */
  width?: 'narrow' | 'default' | 'wide' | 'full';
  /** subdued = less vertical padding for dense sequences */
  density?: 'default' | 'subdued';
  /** Subtle top hairline for section rhythm */
  divider?: boolean;
};

const widthMap = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
  full: 'max-w-[var(--lq-content-max)]',
} as const;

const densityMap = {
  default: 'py-[var(--lq-section-y)]',
  subdued: 'py-16 sm:py-20',
} as const;

/**
 * Section scaffold: generous vertical rhythm, editorial header with optional
 * eyebrow, and a constrained content column.
 */
export function LociqSection({
  id,
  eyebrow,
  headline,
  subhead,
  children,
  className,
  centered = false,
  width = 'default',
  density = 'default',
  divider = false,
}: LociqSectionProps) {
  const hasHeader = eyebrow || headline || subhead;

  return (
    <section
      id={id}
      aria-labelledby={headline ? `${id ?? 'section'}-heading` : undefined}
      className={lqCn(
        'relative w-full px-4',
        densityMap[density],
        divider && 'border-t border-[var(--lq-hairline)]',
        className,
      )}
    >
      <div className={lqCn('mx-auto', widthMap[width])}>
        {hasHeader && (
          <LociqReveal
            as="header"
            className={lqCn('mb-12 sm:mb-16', centered && 'mx-auto max-w-3xl text-center')}
          >
            {eyebrow && (
              <span className="inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--lq-green-deep)]">
                <span className="h-px w-6 bg-[color-mix(in_srgb,var(--lq-green)_60%,transparent)]" aria-hidden />
                {eyebrow}
              </span>
            )}
            {headline && (
              <h2
                id={`${id ?? 'section'}-heading`}
                className="mt-5 font-display text-[var(--lq-text-h1)] font-extrabold leading-[1.08] tracking-tight text-[var(--lq-ink)]"
              >
                {headline}
              </h2>
            )}
            {subhead && (
              <p
                className={lqCn(
                  'mt-4 text-[length:var(--lq-text-body)] leading-relaxed text-[var(--lq-slate)]',
                  centered ? 'mx-auto max-w-2xl' : 'max-w-2xl',
                )}
              >
                {subhead}
              </p>
            )}
          </LociqReveal>
        )}
        {children}
      </div>
    </section>
  );
}
