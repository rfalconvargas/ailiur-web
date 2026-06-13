import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { apCn } from './utils';

const pillVariants = cva(
  'inline-flex items-center gap-1.5 rounded-[var(--ap-radius-pill)] text-[length:var(--ap-text-small)] font-medium transition-colors duration-200',
  {
    variants: {
      variant: {
        default:
          'border border-[var(--ap-border)] bg-[var(--ap-surface)] text-[var(--ap-graphite)]',
        mist: 'bg-[var(--ap-mist-soft)] text-[var(--ap-ink-soft)]',
        gold:
          'border border-[color-mix(in_srgb,var(--ap-gold)_35%,transparent)] bg-[color-mix(in_srgb,var(--ap-gold)_10%,var(--ap-ivory))] text-[var(--ap-ink)]',
        ink: 'bg-[var(--ap-ink)] text-[var(--ap-ivory)]',
        outline: 'border border-[var(--ap-border-strong)] bg-transparent text-[var(--ap-graphite)]',
      },
      size: {
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-3.5 py-1.5',
        lg: 'px-4 py-2 text-sm',
      },
    },
    defaultVariants: { variant: 'default', size: 'md' },
  },
);

type AptellumPillProps = VariantProps<typeof pillVariants> & {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
};

export function AptellumPill({ children, className, variant, size, icon }: AptellumPillProps) {
  return (
    <span className={apCn(pillVariants({ variant, size }), className)}>
      {icon && <span className="shrink-0 opacity-70">{icon}</span>}
      {children}
    </span>
  );
}

export { pillVariants };
