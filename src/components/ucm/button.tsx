import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { SmartLink } from '@/components/ui/smart-link';
import { ucmCn } from './utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-[var(--ucm-radius-pill)]',
    'text-sm font-semibold tracking-tight',
    'transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-out',
    'disabled:pointer-events-none disabled:opacity-45',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--ucm-gold)]',
  ].join(' '),
  {
    variants: {
      variant: {
        // Soft cream button — the primary action.
        primary:
          'bg-[var(--ucm-cream)] text-[var(--ucm-ink)] shadow-[var(--ucm-shadow-sm)] hover:-translate-y-px hover:bg-white hover:shadow-[var(--ucm-shadow-md)] active:translate-y-0',
        // Glassy outline for the secondary action.
        secondary:
          'ucm-glass border border-[var(--ucm-border-strong)] text-[var(--ucm-cream)] hover:-translate-y-px hover:border-[color-mix(in_srgb,var(--ucm-gold)_45%,var(--ucm-border-strong))] hover:bg-[var(--ucm-glass-bg-strong)]',
        ghost:
          'bg-transparent text-[var(--ucm-cream)] hover:bg-[color-mix(in_srgb,var(--ucm-cream)_8%,transparent)]',
        gold:
          'border border-[color-mix(in_srgb,var(--ucm-gold)_50%,transparent)] bg-[color-mix(in_srgb,var(--ucm-gold)_16%,var(--ucm-charcoal))] text-[var(--ucm-cream)] hover:-translate-y-px hover:bg-[color-mix(in_srgb,var(--ucm-gold)_24%,var(--ucm-charcoal))]',
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

type UcmButtonProps = VariantProps<typeof buttonVariants> &
  Omit<ComponentProps<'button'>, 'children'> & {
    children: ReactNode;
    href?: string;
    className?: string;
    icon?: ReactNode;
    iconPosition?: 'start' | 'end';
  };

export function UcmButton({
  children,
  className,
  variant,
  size,
  href,
  icon,
  iconPosition = 'end',
  type = 'button',
  ...props
}: UcmButtonProps) {
  const classes = ucmCn(buttonVariants({ variant, size }), className);
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
      <SmartLink href={href} className={ucmCn('group', classes)}>
        {content}
      </SmartLink>
    );
  }

  return (
    <button type={type} className={ucmCn('group', classes)} {...props}>
      {content}
    </button>
  );
}

export { buttonVariants };
