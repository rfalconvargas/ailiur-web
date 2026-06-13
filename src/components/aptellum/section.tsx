import type { ReactNode } from 'react';
import { AptellumBadge } from './badge';
import { apCn } from './utils';

type AptellumSectionProps = {
  id?: string;
  eyebrow?: string;
  headline?: string;
  subhead?: string;
  children?: ReactNode;
  className?: string;
  /** Center-align section header copy. */
  centered?: boolean;
  /** narrow = prose width; default = 6xl; wide = 7xl */
  width?: 'narrow' | 'default' | 'wide' | 'full';
  /** subdued = less vertical padding for dense sequences */
  density?: 'default' | 'subdued' | 'hero';
  badgeVariant?: 'default' | 'gold' | 'mist';
  /** Subtle top rule for section rhythm */
  divider?: boolean;
};

const widthMap = {
  narrow: 'max-w-3xl',
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
  full: 'max-w-[var(--ap-content-max)]',
} as const;

const densityMap = {
  hero: 'py-[clamp(6rem,14vw,10rem)]',
  default: 'py-[var(--ap-section-y)]',
  subdued: 'py-16 sm:py-20',
} as const;

/**
 * Apple-style section scaffold: generous vertical rhythm, editorial header,
 * optional eyebrow badge, and a constrained content column.
 */
export function AptellumSection({
  id,
  eyebrow,
  headline,
  subhead,
  children,
  className,
  centered = false,
  width = 'default',
  density = 'default',
  badgeVariant = 'default',
  divider = false,
}: AptellumSectionProps) {
  const hasHeader = eyebrow || headline || subhead;

  return (
    <section
      id={id}
      aria-labelledby={headline ? `${id ?? 'section'}-heading` : undefined}
      className={apCn(
        'relative w-full px-4',
        densityMap[density],
        divider && 'border-t border-[var(--ap-border)]',
        className,
      )}
    >
      <div className={apCn('mx-auto', widthMap[width])}>
        {hasHeader && (
          <header
            className={apCn(
              'mb-12 sm:mb-16',
              centered && 'mx-auto max-w-3xl text-center',
            )}
          >
            {eyebrow && (
              <AptellumBadge variant={badgeVariant} className="mb-5">
                {eyebrow}
              </AptellumBadge>
            )}
            {headline && (
              <h2
                id={`${id ?? 'section'}-heading`}
                className="font-display text-[var(--ap-text-h1)] font-extrabold leading-[1.08] tracking-tight text-[var(--ap-ink)]"
              >
                {headline}
              </h2>
            )}
            {subhead && (
              <p
                className={apCn(
                  'mt-4 text-[length:var(--ap-text-body)] leading-relaxed text-[var(--ap-graphite)]',
                  centered ? 'mx-auto max-w-2xl' : 'max-w-2xl',
                )}
              >
                {subhead}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
