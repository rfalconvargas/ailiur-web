import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { tzCn } from './utils';

const cardVariants = cva(
  ['rounded-[var(--tz-radius-lg)] border transition-[box-shadow,transform,border-color,background-color] duration-300 ease-out'].join(
    ' ',
  ),
  {
    variants: {
      variant: {
        // Glassy black card — the default cinematic surface.
        glass: 'tz-glass',
        glassStrong: 'tz-glass-strong',
        muted: 'border-[var(--tz-hairline)] bg-[var(--tz-surface-muted)] shadow-none',
        outline: 'border-[var(--tz-border)] bg-transparent',
      },
      padding: {
        none: 'p-0',
        sm: 'p-5 sm:p-6',
        md: 'p-6 sm:p-8',
        lg: 'p-8 sm:p-10',
      },
      interactive: {
        true: 'hover:-translate-y-0.5 hover:border-[var(--tz-border-strong)] hover:bg-[var(--tz-glass-bg-strong)] hover:shadow-[var(--tz-shadow-glow)]',
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

type TayztCardProps = VariantProps<typeof cardVariants> & {
  children: ReactNode;
  className?: string;
  as?: 'article' | 'div' | 'section' | 'li';
};

/**
 * Glassy black card — thin cream hairline, soft shadow, generous padding.
 */
export function TayztCard({
  children,
  className,
  variant,
  padding,
  interactive,
  as: Tag = 'div',
}: TayztCardProps) {
  return (
    <Tag className={tzCn(cardVariants({ variant, padding, interactive }), className)}>
      {children}
    </Tag>
  );
}

export { cardVariants };
