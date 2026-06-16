import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { SmartLink } from '@/components/ui/smart-link';
import { tmCn } from './utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-[var(--tm-radius-pill)]',
    'text-sm font-semibold tracking-tight',
    'transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-out',
    'disabled:pointer-events-none disabled:opacity-45',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--tm-mint)]',
  ].join(' '),
  {
    variants: {
      variant: {
        // Soft ivory button — the primary action.
        primary:
          'bg-[var(--tm-ivory)] text-[var(--tm-ink)] shadow-[var(--tm-shadow-sm)] hover:-translate-y-px hover:bg-white hover:shadow-[var(--tm-shadow-md)] active:translate-y-0',
        // Glassy outline for the secondary action.
        secondary:
          'tm-glass border border-[var(--tm-border-strong)] text-[var(--tm-ivory)] hover:-translate-y-px hover:border-[color-mix(in_srgb,var(--tm-mint)_45%,var(--tm-border-strong))] hover:bg-[var(--tm-glass-bg-strong)]',
        ghost:
          'bg-transparent text-[var(--tm-ivory)] hover:bg-[color-mix(in_srgb,var(--tm-ivory)_8%,transparent)]',
        mint:
          'border border-[color-mix(in_srgb,var(--tm-mint)_50%,transparent)] bg-[color-mix(in_srgb,var(--tm-mint)_16%,var(--tm-charcoal))] text-[var(--tm-ivory)] hover:-translate-y-px hover:bg-[color-mix(in_srgb,var(--tm-mint)_24%,var(--tm-charcoal))]',
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

type TellumetryButtonProps = VariantProps<typeof buttonVariants> &
  Omit<ComponentProps<'button'>, 'children'> & {
    children: ReactNode;
    href?: string;
    className?: string;
    icon?: ReactNode;
    iconPosition?: 'start' | 'end';
  };

export function TellumetryButton({
  children,
  className,
  variant,
  size,
  href,
  icon,
  iconPosition = 'end',
  type = 'button',
  ...props
}: TellumetryButtonProps) {
  const classes = tmCn(buttonVariants({ variant, size }), className);
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
      <SmartLink href={href} className={tmCn('group', classes)}>
        {content}
      </SmartLink>
    );
  }

  return (
    <button type={type} className={tmCn('group', classes)} {...props}>
      {content}
    </button>
  );
}

export { buttonVariants };
