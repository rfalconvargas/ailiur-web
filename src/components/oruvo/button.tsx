import type { ComponentProps, ReactNode } from 'react';
import { SmartLink } from '@/components/ui/smart-link';
import { orCn } from './utils';

type Variant = 'primary' | 'glass' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-[var(--or-radius-pill)] font-semibold tracking-tight transition-all duration-200 focus:outline-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--or-gold)] text-white shadow-[var(--or-glow-gold)] hover:-translate-y-0.5 hover:bg-[var(--or-gold-deep)]',
  glass:
    'or-glass-strong text-[var(--or-ink)] hover:-translate-y-0.5 hover:border-[var(--or-border-strong)]',
  ghost: 'text-[var(--or-slate)] hover:text-[var(--or-ink)]',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

type OruvoButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentProps<'button'>, 'ref'>;

/** Shared Oruvo action — renders a link when `href` is set, else a button. */
export function OruvoButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: OruvoButtonProps) {
  const cls = orCn(base, variants[variant], sizes[size], className);
  if (href) {
    return (
      <SmartLink href={href} className={cls}>
        {children}
      </SmartLink>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
