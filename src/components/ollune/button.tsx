import type { ComponentProps, ReactNode } from 'react';
import { SmartLink } from '@/components/ui/smart-link';
import { olCn } from './utils';

type Variant = 'primary' | 'glass' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-[var(--ol-radius-pill)] font-semibold tracking-tight transition-all duration-200 focus:outline-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'bg-[var(--ol-green)] text-[var(--ol-ink)] shadow-[var(--ol-glow-green)] hover:-translate-y-0.5 hover:bg-[var(--ol-green-soft)]',
  glass:
    'ol-glass-strong text-[var(--ol-cream)] hover:-translate-y-0.5 hover:border-[var(--ol-border-strong)]',
  ghost:
    'text-[var(--ol-silver)] hover:text-[var(--ol-cream)]',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

type OlluneButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentProps<'button'>, 'ref'>;

/** Shared Ollune action — renders a link when `href` is set, else a button. */
export function OlluneButton({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: OlluneButtonProps) {
  const cls = olCn(base, variants[variant], sizes[size], className);
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
