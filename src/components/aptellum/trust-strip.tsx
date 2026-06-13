import { TRUST_LINES_LIST } from '@/lib/aptellum/microcopy';
import { apCn } from './utils';

type AptellumTrustStripProps = {
  className?: string;
  /** compact = single row on md+; stacked on mobile */
  variant?: 'compact' | 'stacked';
};

/**
 * Institutional trust microcopy — no partnership or verdict claims.
 */
export function AptellumTrustStrip({ className, variant = 'compact' }: AptellumTrustStripProps) {
  return (
    <ul
      className={apCn(
        'flex flex-col gap-2 border-t border-[var(--ap-border)] pt-6',
        variant === 'compact' && 'md:flex-row md:flex-wrap md:items-center md:gap-x-6 md:gap-y-2',
        className,
      )}
      role="list"
      aria-label="Product principles"
    >
      {TRUST_LINES_LIST.map((line) => (
        <li
          key={line}
          className="flex items-start gap-2 text-[0.8125rem] leading-snug text-[var(--ap-graphite)]"
        >
          <span
            className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[var(--ap-gold)]"
            aria-hidden
          />
          {line}
        </li>
      ))}
    </ul>
  );
}
