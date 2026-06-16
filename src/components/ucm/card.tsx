import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { ucmCn } from './utils';

const cardVariants = cva(
  ['rounded-[var(--ucm-radius-lg)] border transition-[box-shadow,transform,border-color,background-color] duration-300 ease-out'].join(
    ' ',
  ),
  {
    variants: {
      variant: {
        glass: 'ucm-glass',
        glassStrong: 'ucm-glass-strong',
        muted: 'border-[var(--ucm-hairline)] bg-[var(--ucm-surface-muted)] shadow-none',
        outline: 'border-[var(--ucm-border)] bg-transparent',
      },
      padding: {
        none: 'p-0',
        sm: 'p-5 sm:p-6',
        md: 'p-6 sm:p-8',
        lg: 'p-8 sm:p-10',
      },
      interactive: {
        true: 'hover:-translate-y-0.5 hover:border-[var(--ucm-border-strong)] hover:bg-[var(--ucm-glass-bg-strong)] hover:shadow-[var(--ucm-shadow-glow)]',
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

type UcmCardProps = VariantProps<typeof cardVariants> & {
  children: ReactNode;
  className?: string;
  as?: 'article' | 'div' | 'section' | 'li';
};

/**
 * Glassy panel card — thin cream hairline, soft shadow, generous padding.
 */
export function UcmCard({
  children,
  className,
  variant,
  padding,
  interactive,
  as: Tag = 'div',
}: UcmCardProps) {
  return (
    <Tag className={ucmCn(cardVariants({ variant, padding, interactive }), className)}>
      {children}
    </Tag>
  );
}

export { cardVariants };
