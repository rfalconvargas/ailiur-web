'use client';

import { useMemo, useState, type ReactNode } from 'react';
import {
  COOP_TRACKS,
  COOP_TRACKS_SECTION,
  type CoopTrack,
} from '@/lib/aptellum/coop-tracks';
import { AptellumScrollReveal } from './scroll-reveal';
import { AptellumSection } from './section';
import { apCn } from './utils';

const labelClass =
  'text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--ap-graphite)]';

/**
 * Colossal-inspired editorial track grid with discipline filter chips.
 */
export function AptellumCoopTracksSection() {
  const [active, setActive] = useState<string>('all');

  const filtered = useMemo(() => {
    if (active === 'all') return COOP_TRACKS;
    return COOP_TRACKS.filter((t) => t.id === active);
  }, [active]);

  return (
    <AptellumSection
      id="tracks"
      eyebrow={COOP_TRACKS_SECTION.eyebrow}
      headline={COOP_TRACKS_SECTION.headline}
      subhead={COOP_TRACKS_SECTION.subhead}
      centered
      width="wide"
      divider
    >
      {/* Filter chips */}
      <div
        className="mb-10 flex flex-wrap items-center justify-center gap-2"
        role="group"
        aria-label="Filter tracks by discipline"
      >
        <FilterChip
          label="All tracks"
          active={active === 'all'}
          onClick={() => setActive('all')}
        />
        {COOP_TRACKS.map((track) => (
          <FilterChip
            key={track.id}
            label={track.title}
            active={active === track.id}
            onClick={() => setActive(track.id)}
          />
        ))}
      </div>

      <p className="mb-8 text-center text-xs text-[var(--ap-graphite)]">
        {COOP_TRACKS_SECTION.targetsDisclaimer}
      </p>

      {/* Editorial grid — horizontal scroll on small screens, grid on md+ */}
      <div
        className={apCn(
          'flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-px-4',
          'md:grid md:grid-cols-2 md:overflow-visible md:pb-0 md:snap-none',
          active !== 'all' && 'md:grid-cols-1 lg:max-w-3xl lg:mx-auto',
        )}
        role="list"
      >
        {filtered.map((track, i) => (
          <AptellumScrollReveal
            key={track.id}
            delay={i * 0.04}
            as="li"
            className={apCn(
              'w-[min(88vw,22rem)] shrink-0 snap-center md:w-auto md:shrink',
              active !== 'all' && 'md:w-full',
            )}
          >
            <TrackCard track={track} featured={active !== 'all'} />
          </AptellumScrollReveal>
        ))}
      </div>
    </AptellumSection>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={apCn(
        'rounded-[var(--ap-radius-pill)] px-3.5 py-1.5 text-xs font-semibold transition-all duration-200',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ap-gold)]',
        active
          ? 'bg-[var(--ap-ink)] text-[var(--ap-ivory)] shadow-[var(--ap-shadow-sm)]'
          : 'border border-[var(--ap-border)] bg-[var(--ap-surface)] text-[var(--ap-graphite)] hover:border-[var(--ap-gold-soft)] hover:bg-[var(--ap-mist-soft)]',
      )}
    >
      {label}
    </button>
  );
}

function TrackCard({ track, featured }: { track: CoopTrack; featured?: boolean }) {
  return (
    <article
      className={apCn(
        'group flex h-full flex-col rounded-[var(--ap-radius-xl)] border border-[var(--ap-border-strong)]',
        'bg-[var(--ap-surface)] p-6 shadow-[var(--ap-shadow-sm)] transition-[transform,box-shadow,border-color] duration-300',
        'hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--ap-gold)_30%,var(--ap-border))] hover:shadow-[var(--ap-shadow-hover)]',
        featured && 'md:p-10',
      )}
    >
      <header className="border-b border-[var(--ap-border)] pb-5">
        <h3
          className={apCn(
            'font-display font-extrabold tracking-tight text-[var(--ap-ink)]',
            featured ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-[1.75rem]',
          )}
        >
          {track.title}
        </h3>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--ap-graphite)] sm:text-base">
          {track.description}
        </p>
      </header>

      <div className="mt-5 flex flex-1 flex-col gap-4 text-sm">
        <TrackField label="Example targets">
          <p className="leading-relaxed text-[var(--ap-ink)]">
            {track.exampleTargets.join(' · ')}
          </p>
          <p className="mt-1 text-xs italic text-[var(--ap-graphite-light)]">
            Inspired by — not affiliated.
          </p>
        </TrackField>

        <TrackField label="Example project" highlight>
          <p className="font-medium leading-relaxed text-[var(--ap-ink)]">
            {track.exampleProject}
          </p>
        </TrackField>

        <TrackField label="Skills practiced">
          <ul className="flex flex-wrap gap-1.5" role="list">
            {track.skills.map((s) => (
              <li
                key={s}
                className="rounded-[var(--ap-radius-pill)] bg-[var(--ap-mist-soft)] px-2.5 py-1 text-xs font-medium text-[var(--ap-ink-soft)]"
              >
                {s}
              </li>
            ))}
          </ul>
        </TrackField>

        <TrackField label="Final artifact">
          <p className="font-display text-base font-semibold text-[var(--ap-ink)]">
            {track.artifact}
          </p>
        </TrackField>
      </div>
    </article>
  );
}

function TrackField({
  label,
  children,
  highlight,
}: {
  label: string;
  children: ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={apCn(
        highlight &&
          'rounded-[var(--ap-radius-md)] border border-[color-mix(in_srgb,var(--ap-gold)_22%,transparent)] bg-[color-mix(in_srgb,var(--ap-gold)_5%,var(--ap-surface))] p-4',
      )}
    >
      <p className={labelClass}>{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}
