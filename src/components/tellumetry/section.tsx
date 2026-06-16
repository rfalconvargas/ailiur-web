import type { ReactNode } from 'react';
import { TellumetryReveal } from './scroll-reveal';
import { tmCn } from './utils';

type TellumetrySectionProps = {
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
  full: 'max-w-[var(--tm-content-max)]',
} as const;

const densityMap = {
  default: 'py-[var(--tm-section-y)]',
  subdued: 'py-16 sm:py-20',
} as const;

/**
 * Section scaffold: generous vertical rhythm, editorial header with optional
 * eyebrow, and a constrained content column.
 */
export function TellumetrySection({
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
}: TellumetrySectionProps) {
  const hasHeader = eyebrow || headline || subhead;

  return (
    <section
      id={id}
      aria-labelledby={headline ? `${id ?? 'section'}-heading` : undefined}
      className={tmCn(
        'relative w-full px-4',
        densityMap[density],
        divider && 'border-t border-[var(--tm-hairline)]',
        className,
      )}
    >
      <div className={tmCn('mx-auto', widthMap[width])}>
        {hasHeader && (
          <TellumetryReveal
            as="header"
            className={tmCn('mb-12 sm:mb-16', centered && 'mx-auto max-w-3xl text-center')}
          >
            {eyebrow && (
              <span className="inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-[var(--tm-mint)]">
                <span className="h-px w-6 bg-[color-mix(in_srgb,var(--tm-mint)_60%,transparent)]" aria-hidden />
                {eyebrow}
              </span>
            )}
            {headline && (
              <h2
                id={`${id ?? 'section'}-heading`}
                className="mt-5 font-display text-[var(--tm-text-h1)] font-extrabold leading-[1.08] tracking-tight text-[var(--tm-ivory)]"
              >
                {headline}
              </h2>
            )}
            {subhead && (
              <p
                className={tmCn(
                  'mt-4 text-[length:var(--tm-text-body)] leading-relaxed text-[var(--tm-slate)]',
                  centered ? 'mx-auto max-w-2xl' : 'max-w-2xl',
                )}
              >
                {subhead}
              </p>
            )}
          </TellumetryReveal>
        )}
        {children}
      </div>
    </section>
  );
}
