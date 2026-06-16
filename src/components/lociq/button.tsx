import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { SmartLink } from '@/components/ui/smart-link';
import { lqCn } from './utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-[var(--lq-radius-pill)]',
    'text-sm font-semibold tracking-tight',
    'transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-out',
    'disabled:pointer-events-none disabled:opacity-45',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--lq-green)]',
  ].join(' '),
  {
    variants: {
      variant: {
        // Civic green — the primary action.
        primary:
          'bg-[var(--lq-green)] text-white shadow-[var(--lq-shadow-sm)] hover:-translate-y-px hover:bg-[var(--lq-green-deep)] hover:shadow-[var(--lq-shadow-md)] active:translate-y-0',
        // Frosted outline for the secondary action.
        secondary:
          'lq-glass border border-[var(--lq-border-strong)] text-[var(--lq-charcoal)] hover:-translate-y-px hover:border-[color-mix(in_srgb,var(--lq-green)_45%,var(--lq-border-strong))] hover:bg-[var(--lq-glass-bg-strong)]',
        ghost:
          'bg-transparent text-[var(--lq-charcoal)] hover:bg-[color-mix(in_srgb,var(--lq-ink)_6%,transparent)]',
        ink:
          'bg-[var(--lq-ink)] text-[var(--lq-paper-raised)] shadow-[var(--lq-shadow-sm)] hover:-translate-y-px hover:bg-[var(--lq-charcoal)] hover:shadow-[var(--lq-shadow-md)]',
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

type LociqButtonProps = VariantProps<typeof buttonVariants> &
  Omit<ComponentProps<'button'>, 'children'> & {
    children: ReactNode;
    href?: string;
    className?: string;
    icon?: ReactNode;
    iconPosition?: 'start' | 'end';
  };

export function LociqButton({
  children,
  className,
  variant,
  size,
  href,
  icon,
  iconPosition = 'end',
  type = 'button',
  ...props
}: LociqButtonProps) {
  const classes = lqCn(buttonVariants({ variant, size }), className);
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
      <SmartLink href={href} className={lqCn('group', classes)}>
        {content}
      </SmartLink>
    );
  }

  return (
    <button type={type} className={lqCn('group', classes)} {...props}>
      {content}
    </button>
  );
}

export { buttonVariants };
