import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { lqCn } from './utils';

const cardVariants = cva(
  ['rounded-[var(--lq-radius-lg)] border transition-[box-shadow,transform,border-color,background-color] duration-300 ease-out'].join(
    ' ',
  ),
  {
    variants: {
      variant: {
        glass: 'lq-glass',
        glassStrong: 'lq-glass-strong',
        muted: 'border-[var(--lq-hairline)] bg-[var(--lq-surface-muted)] shadow-none',
        outline: 'border-[var(--lq-border)] bg-[color-mix(in_srgb,var(--lq-paper-raised)_55%,transparent)]',
      },
      padding: {
        none: 'p-0',
        sm: 'p-5 sm:p-6',
        md: 'p-6 sm:p-8',
        lg: 'p-8 sm:p-10',
      },
      interactive: {
        true: 'hover:-translate-y-0.5 hover:border-[var(--lq-border-strong)] hover:bg-[var(--lq-glass-bg-strong)] hover:shadow-[var(--lq-shadow-glow)]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'glass',
      padding: 'md',
      interactive: false,
    },
  },
);

type LociqCardProps = VariantProps<typeof cardVariants> & {
  children: ReactNode;
  className?: string;
  as?: 'article' | 'div' | 'section' | 'li';
};

/**
 * Civic card — frosted paper panel with a thin charcoal hairline and a soft
 * municipal shadow.
 */
export function LociqCard({
  children,
  className,
  variant,
  padding,
  interactive,
  as: Tag = 'div',
}: LociqCardProps) {
  return (
    <Tag className={lqCn(cardVariants({ variant, padding, interactive }), className)}>
      {children}
    </Tag>
  );
}

export { cardVariants };
