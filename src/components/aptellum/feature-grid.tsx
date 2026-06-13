import type { LucideIcon } from 'lucide-react';
import { AptellumCard } from './card';
import { apCn } from './utils';

export type AptellumFeatureItem = {
  title: string;
  body: string;
  icon?: LucideIcon;
  accent?: 'gold' | 'mist' | 'ink';
};

type AptellumFeatureGridProps = {
  items: AptellumFeatureItem[];
  className?: string;
  columns?: 1 | 2 | 3;
  cardVariant?: 'default' | 'elevated' | 'muted' | 'editorial';
  interactive?: boolean;
};

const columnMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
} as const;

const iconAccent = {
  gold: 'bg-[color-mix(in_srgb,var(--ap-gold)_14%,var(--ap-ivory))] text-[var(--ap-gold)]',
  mist: 'bg-[var(--ap-mist-soft)] text-[var(--ap-graphite)]',
  ink: 'bg-[var(--ap-ink)] text-[var(--ap-ivory)]',
} as const;

function FeatureIcon({
  icon: Icon,
  accent = 'mist',
}: {
  icon: LucideIcon;
  accent?: 'gold' | 'mist' | 'ink';
}) {
  return (
    <span
      className={apCn(
        'mb-4 flex h-11 w-11 items-center justify-center rounded-[var(--ap-radius-sm)]',
        iconAccent[accent],
      )}
      aria-hidden
    >
      <Icon className="h-5 w-5" strokeWidth={1.75} />
    </span>
  );
}

/**
 * Colossal-inspired editorial feature grid with Mercury card treatment.
 */
export function AptellumFeatureGrid({
  items,
  className,
  columns = 3,
  cardVariant = 'default',
  interactive = true,
}: AptellumFeatureGridProps) {
  return (
    <ul
      className={apCn('grid gap-4 sm:gap-5', columnMap[columns], className)}
      role="list"
    >
      {items.map((item) => (
        <li key={item.title} className="h-full">
          <AptellumCard
            as="article"
            variant={cardVariant}
            padding="md"
            interactive={interactive}
            className="h-full"
          >
            {item.icon && <FeatureIcon icon={item.icon} accent={item.accent} />}
            <h3 className="font-display text-[length:var(--ap-text-h3)] font-bold tracking-tight text-[var(--ap-ink)]">
              {item.title}
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--ap-graphite)]">
              {item.body}
            </p>
          </AptellumCard>
        </li>
      ))}
    </ul>
  );
}
