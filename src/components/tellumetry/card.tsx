import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { tmCn } from './utils';

const cardVariants = cva(
  ['rounded-[var(--tm-radius-lg)] border transition-[box-shadow,transform,border-color,background-color] duration-300 ease-out'].join(
    ' ',
  ),
  {
    variants: {
      variant: {
        glass: 'tm-glass',
        glassStrong: 'tm-glass-strong',
        muted: 'border-[var(--tm-hairline)] bg-[var(--tm-surface-muted)] shadow-none',
        outline: 'border-[var(--tm-border)] bg-transparent',
      },
      padding: {
        none: 'p-0',
        sm: 'p-5 sm:p-6',
        md: 'p-6 sm:p-8',
        lg: 'p-8 sm:p-10',
      },
      interactive: {
        true: 'hover:-translate-y-0.5 hover:border-[var(--tm-border-strong)] hover:bg-[var(--tm-glass-bg-strong)] hover:shadow-[var(--tm-shadow-glow)]',
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

type TellumetryCardProps = VariantProps<typeof cardVariants> & {
  children: ReactNode;
  className?: string;
  as?: 'article' | 'div' | 'section' | 'li';
};

/**
 * Glassy instrument card — thin ivory hairline, soft shadow, generous padding.
 */
export function TellumetryCard({
  children,
  className,
  variant,
  padding,
  interactive,
  as: Tag = 'div',
}: TellumetryCardProps) {
  return (
    <Tag className={tmCn(cardVariants({ variant, padding, interactive }), className)}>
      {children}
    </Tag>
  );
}

export { cardVariants };
