import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';
import { SmartLink } from '@/components/ui/smart-link';
import { apCn } from './utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 rounded-[var(--ap-radius-pill)]',
    'text-sm font-semibold tracking-tight',
    'transition-[transform,box-shadow,background-color,border-color] duration-300 ease-out',
    'disabled:pointer-events-none disabled:opacity-45',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--ap-gold)]',
  ].join(' '),
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--ap-ink)] text-[var(--ap-ivory)] shadow-[var(--ap-shadow-sm)] hover:-translate-y-px hover:shadow-[var(--ap-shadow-md)] active:translate-y-0',
        secondary:
          'border border-[var(--ap-border-strong)] bg-[var(--ap-surface)] text-[var(--ap-ink)] shadow-[var(--ap-shadow-sm)] hover:-translate-y-px hover:border-[color-mix(in_srgb,var(--ap-gold)_35%,var(--ap-border-strong))] hover:bg-[var(--ap-surface-muted)] hover:shadow-[var(--ap-shadow-md)]',
        ghost:
          'bg-transparent text-[var(--ap-ink)] hover:bg-[color-mix(in_srgb,var(--ap-ink)_4%,transparent)]',
        gold:
          'border border-[var(--ap-gold-soft)] bg-[color-mix(in_srgb,var(--ap-gold)_18%,var(--ap-ivory))] text-[var(--ap-ink)] hover:-translate-y-px hover:shadow-[var(--ap-shadow-sm)]',
        outline:
          'border border-[var(--ap-ink)] bg-transparent text-[var(--ap-ink)] hover:bg-[var(--ap-ink)] hover:text-[var(--ap-ivory)]',
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

type AptellumButtonProps = VariantProps<typeof buttonVariants> &
  Omit<ComponentProps<'button'>, 'children'> & {
    children: ReactNode;
    href?: string;
    className?: string;
    icon?: ReactNode;
    iconPosition?: 'start' | 'end';
  };

export function AptellumButton({
  children,
  className,
  variant,
  size,
  href,
  icon,
  iconPosition = 'end',
  type = 'button',
  ...props
}: AptellumButtonProps) {
  const classes = apCn(buttonVariants({ variant, size }), className);
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
      <SmartLink href={href} className={apCn('group', classes)}>
        {content}
      </SmartLink>
    );
  }

  return (
    <button type={type} className={apCn('group', classes)} {...props}>
      {content}
    </button>
  );
}

export { buttonVariants };
