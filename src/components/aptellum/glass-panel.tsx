import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { apCn } from './utils';

const glassVariants = cva('rounded-[var(--ap-radius-xl)]', {
  variants: {
    strength: {
      default: 'ap-glass',
      strong: 'ap-glass-strong',
    },
    padding: {
      none: '',
      sm: 'p-5 sm:p-6',
      md: 'p-6 sm:p-10',
      lg: 'p-8 sm:p-12 md:p-14',
      hero: 'px-6 py-12 sm:px-12 sm:py-16 md:py-20',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
    },
  },
  defaultVariants: {
    strength: 'default',
    padding: 'md',
    align: 'left',
  },
});

type AptellumGlassPanelProps = VariantProps<typeof glassVariants> & {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article';
};

/**
 * Ivory frosted panel — Aptellum's answer to Ailiur glass, tuned for
 * institutional calm rather than yellow-field saturation.
 */
export function AptellumGlassPanel({
  children,
  className,
  strength,
  padding,
  align,
  as: Tag = 'div',
}: AptellumGlassPanelProps) {
  return (
    <Tag className={apCn(glassVariants({ strength, padding, align }), className)}>
      {children}
    </Tag>
  );
}

export { glassVariants };
