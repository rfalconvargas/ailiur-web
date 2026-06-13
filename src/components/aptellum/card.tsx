import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { apCn } from './utils';

const cardVariants = cva(
  [
    'rounded-[var(--ap-radius-lg)] border transition-[box-shadow,transform,border-color] duration-300 ease-out',
  ].join(' '),
  {
    variants: {
      variant: {
        default:
          'border-[var(--ap-border)] bg-[var(--ap-surface)] shadow-[var(--ap-shadow-sm)]',
        elevated:
          'border-[var(--ap-border)] bg-[var(--ap-surface)] shadow-[var(--ap-shadow-md)]',
        muted:
          'border-[var(--ap-border)] bg-[var(--ap-surface-muted)] shadow-none',
        editorial:
          'border-[var(--ap-border-strong)] bg-[var(--ap-surface)] shadow-[var(--ap-shadow-sm)]',
        ink:
          'border-[var(--ap-ink)] bg-[var(--ap-ink)] text-[var(--ap-ivory)] shadow-[var(--ap-shadow-md)]',
      },
      padding: {
        none: 'p-0',
        sm: 'p-5 sm:p-6',
        md: 'p-6 sm:p-8',
        lg: 'p-8 sm:p-10',
      },
      interactive: {
        true: 'hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--ap-gold)_22%,var(--ap-border-strong))] hover:bg-[var(--ap-surface-muted)] hover:shadow-[var(--ap-shadow-hover)]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      interactive: false,
    },
  },
);

type AptellumCardProps = VariantProps<typeof cardVariants> & {
  children: ReactNode;
  className?: string;
  as?: 'article' | 'div' | 'section';
};

/**
 * Mercury-inspired dashboard card — thin border, soft shadow, generous padding.
 */
export function AptellumCard({
  children,
  className,
  variant,
  padding,
  interactive,
  as: Tag = 'div',
}: AptellumCardProps) {
  return (
    <Tag className={apCn(cardVariants({ variant, padding, interactive }), className)}>
      {children}
    </Tag>
  );
}

export { cardVariants };
