import type { ComponentProps, ReactNode } from 'react';
import { SmartLink } from '@/components/ui/smart-link';
import { dmCn } from './utils';

type Variant = 'primary' | 'glass' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-[var(--dm-radius-pill)] font-semibold tracking-tight transition-all duration-200 focus:outline-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--dm-ink)] text-[var(--dm-bg)] shadow-[var(--dm-shadow-sm)] hover:-translate-y-0.5 hover:bg-[var(--dm-amber-deep)]',
  glass:
    'dm-glass-strong text-[var(--dm-ink)] hover:-translate-y-0.5 hover:border-[var(--dm-border-strong)]',
  ghost: 'text-[var(--dm-ink-soft)] hover:text-[var(--dm-ink)]',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

type DaymeshButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentProps<'button'>, 'ref'>;

/** Shared Daymesh action — renders a link when `href` is set, else a button. */
export function DaymeshButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: DaymeshButtonProps) {
  const cls = dmCn(base, variants[variant], sizes[size], className);
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
