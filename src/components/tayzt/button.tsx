import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { SmartLink } from '@/components/ui/smart-link';
import { tzCn } from './utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-[var(--tz-radius-pill)]',
    'text-sm font-semibold tracking-tight',
    'transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-out',
    'disabled:pointer-events-none disabled:opacity-45',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--tz-gold)]',
  ].join(' '),
  {
    variants: {
      variant: {
        // Warm cream button on dark — the primary cinematic action.
        primary:
          'bg-[var(--tz-cream)] text-[var(--tz-ink)] shadow-[var(--tz-shadow-sm)] hover:-translate-y-px hover:bg-white hover:shadow-[var(--tz-shadow-md)] active:translate-y-0',
        // Glassy outline for the secondary action.
        secondary:
          'tz-glass border border-[var(--tz-border-strong)] text-[var(--tz-cream)] hover:-translate-y-px hover:border-[color-mix(in_srgb,var(--tz-gold)_45%,var(--tz-border-strong))] hover:bg-[var(--tz-glass-bg-strong)]',
        ghost:
          'bg-transparent text-[var(--tz-cream)] hover:bg-[color-mix(in_srgb,var(--tz-cream)_8%,transparent)]',
        gold:
          'border border-[color-mix(in_srgb,var(--tz-gold)_50%,transparent)] bg-[color-mix(in_srgb,var(--tz-gold)_16%,var(--tz-charcoal))] text-[var(--tz-cream)] hover:-translate-y-px hover:bg-[color-mix(in_srgb,var(--tz-gold)_24%,var(--tz-charcoal))]',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6',
        lg: 'h-12 px-8 text-[0.9375rem]',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

type TayztButtonProps = VariantProps<typeof buttonVariants> &
  Omit<ComponentProps<'button'>, 'children'> & {
    children: ReactNode;
    href?: string;
    className?: string;
    icon?: ReactNode;
    iconPosition?: 'start' | 'end';
  };

export function TayztButton({
  children,
  className,
  variant,
  size,
  href,
  icon,
  iconPosition = 'end',
  type = 'button',
  ...props
}: TayztButtonProps) {
  const classes = tzCn(buttonVariants({ variant, size }), className);
  const content = (
    <>
      {icon && iconPosition === 'start' && (
        <span className="shrink-0" aria-hidden>
          {icon}
        </span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'end' && (
        <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <SmartLink href={href} className={tzCn('group', classes)}>
        {content}
      </SmartLink>
    );
  }

  return (
    <button type={type} className={tzCn('group', classes)} {...props}>
      {content}
    </button>
  );
}

export { buttonVariants };
