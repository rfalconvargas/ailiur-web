import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { apCn } from './utils';

const badgeVariants = cva(
  'inline-flex items-center gap-2 rounded-[var(--ap-radius-pill)] px-4 py-1.5 text-[length:var(--ap-text-small)] font-semibold uppercase tracking-[0.14em]',
  {
    variants: {
      variant: {
        default:
          'border border-[var(--ap-border)] bg-[var(--ap-surface)] text-[var(--ap-graphite)] shadow-[var(--ap-shadow-sm)]',
        gold:
          'border border-[var(--ap-gold-soft)] bg-[color-mix(in_srgb,var(--ap-gold)_12%,var(--ap-ivory))] text-[var(--ap-ink-soft)]',
        mist:
          'border border-[color-mix(in_srgb,var(--ap-mist)_60%,transparent)] bg-[var(--ap-mist-soft)] text-[var(--ap-graphite)]',
        ink:
          'border border-[var(--ap-ink)] bg-[var(--ap-ink)] text-[var(--ap-ivory)]',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

type AptellumBadgeProps = VariantProps<typeof badgeVariants> & {
  children: ReactNode;
  className?: string;
  dot?: boolean;
  dotColor?: 'gold' | 'green' | 'mist';
};

const dotColorMap = {
  gold: 'bg-[var(--ap-gold)]',
  green: 'bg-[var(--ap-ailiur-green)]',
  mist: 'bg-[var(--ap-mist)]',
} as const;

export function AptellumBadge({
  children,
  className,
  variant,
  dot = true,
  dotColor = 'gold',
}: AptellumBadgeProps) {
  return (
    <span className={apCn(badgeVariants({ variant }), className)}>
      {dot && (
        <span
          className={apCn('h-1.5 w-1.5 shrink-0 rounded-full', dotColorMap[dotColor])}
          aria-hidden
        />
      )}
      {children}
    </span>
  );
}

export { badgeVariants };
