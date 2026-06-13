import { FLUENCY_ARCHITECTURE } from '@/lib/aptellum/fluency-section';
import { TRUST_LINES } from '@/lib/aptellum/microcopy';
import { AptellumBadge } from './badge';
import { AptellumCard } from './card';
import { AptellumScrollReveal } from './scroll-reveal';
import { AptellumSection } from './section';
import { apCn } from './utils';

const PILLAR_INDEX = ['01', '02', '03', '04'] as const;

/**
 * Product-architecture view of AI fluency — connected pillars, interaction
 * modes, and a sample diligence statement. Institutional, not courseware.
 */
export function AptellumFluencySection() {
  const { eyebrow, headline, subhead, pillars, interactionModes, diligenceLabel, diligenceSample } =
    FLUENCY_ARCHITECTURE;

  return (
    <AptellumSection
      id="fluency"
      eyebrow={eyebrow}
      headline={headline}
      subhead={subhead}
      centered
      badgeVariant="gold"
      width="wide"
      divider
    >
      {/* Framework diagram — connected pillars */}
      <div className="relative">
        {/* Desktop connector rail */}
        <div
          className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[4.5rem] hidden h-px bg-[var(--ap-border-strong)] lg:block"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[4.35rem] hidden lg:flex lg:justify-between"
          aria-hidden
        >
          {pillars.map((p) => (
            <span
              key={p.id}
              className="h-2 w-2 -translate-y-1/2 rounded-full border border-[var(--ap-gold-soft)] bg-[var(--ap-ivory)]"
            />
          ))}
        </div>

        <ol
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          role="list"
          aria-label="AI fluency framework"
        >
          {pillars.map((pillar, i) => (
            <AptellumScrollReveal key={pillar.id} delay={i * 0.06} as="li" className="h-full">
              <FluencyPillarCard pillar={pillar} index={PILLAR_INDEX[i]} />
            </AptellumScrollReveal>
          ))}
        </ol>
      </div>

      {/* Interaction modes — compact row */}
      <AptellumScrollReveal className="mt-10">
        <div
          className={apCn(
            'rounded-[var(--ap-radius-xl)] border border-[var(--ap-border)]',
            'bg-[var(--ap-surface-muted)] p-5 sm:p-6',
          )}
        >
          <p className="text-center text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--ap-graphite)]">
            How AI participates in the studio
          </p>
          <div className="mt-5 grid gap-px overflow-hidden rounded-[var(--ap-radius-md)] border border-[var(--ap-border)] bg-[var(--ap-border)] sm:grid-cols-3">
            {interactionModes.map((mode, i) => (
              <div
                key={mode.id}
                className={apCn(
                  'group bg-[var(--ap-surface)] px-4 py-4 transition-colors duration-300 sm:px-5 sm:py-5',
                  'hover:bg-[color-mix(in_srgb,var(--ap-mist-soft)_55%,var(--ap-surface))]',
                )}
              >
                <div className="flex items-center gap-2">
                  <span
                    className={apCn(
                      'font-mono text-[0.625rem] font-medium tabular-nums text-[var(--ap-graphite-light)]',
                      'transition-colors group-hover:text-[var(--ap-gold)]',
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-base font-bold text-[var(--ap-ink)]">
                    {mode.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ap-graphite)]">{mode.body}</p>
              </div>
            ))}
          </div>
        </div>
      </AptellumScrollReveal>

      {/* Diligence statement */}
      <AptellumScrollReveal className="mx-auto mt-10 max-w-3xl">
        <figure
          className={apCn(
            'relative rounded-[var(--ap-radius-lg)] border border-[var(--ap-border-strong)]',
            'bg-[var(--ap-surface)] px-6 py-8 shadow-[var(--ap-shadow-sm)] sm:px-10 sm:py-10',
          )}
        >
          <div
            className="absolute left-6 top-0 h-full w-px bg-[linear-gradient(180deg,var(--ap-gold)_0%,transparent_100%)] sm:left-10"
            aria-hidden
          />
          <figcaption className="pl-4 sm:pl-6">
            <AptellumBadge variant="mist" dot={false} className="mb-4 text-[0.625rem]">
              {diligenceLabel}
            </AptellumBadge>
            <blockquote className="font-display text-[clamp(1rem,2.5vw,1.125rem)] font-medium leading-relaxed text-[var(--ap-ink)]">
              &ldquo;{diligenceSample}&rdquo;
            </blockquote>
            <p className="mt-5 text-sm leading-relaxed text-[var(--ap-graphite)]">
              {TRUST_LINES.studentOwnership}
            </p>
          </figcaption>
        </figure>
      </AptellumScrollReveal>
    </AptellumSection>
  );
}

function FluencyPillarCard({
  pillar,
  index,
}: {
  pillar: (typeof FLUENCY_ARCHITECTURE.pillars)[number];
  index: string;
}) {
  return (
    <AptellumCard
      as="article"
      variant="editorial"
      padding="md"
      interactive
      className={apCn(
        'group relative h-full border-[var(--ap-border)]',
        'hover:border-[color-mix(in_srgb,var(--ap-gold)_35%,var(--ap-border))]',
      )}
    >
      {/* Node marker for framework diagram */}
      <span
        className={apCn(
          'absolute -top-3 left-6 hidden h-2 w-2 rounded-full border border-[var(--ap-gold-soft)]',
          'bg-[var(--ap-ivory)] lg:block',
        )}
        aria-hidden
      />

      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-display text-xl font-extrabold tracking-tight text-[var(--ap-ink)]">
          {pillar.title}
        </h3>
        <span className="font-mono text-xs tabular-nums text-[var(--ap-graphite-light)] transition-colors group-hover:text-[var(--ap-gold)]">
          {index}
        </span>
      </div>

      <p className="mt-4 text-sm font-medium leading-snug text-[var(--ap-ink-soft)]">
        {pillar.question}
      </p>

      <div className="mt-5 border-t border-[var(--ap-border)] pt-4">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--ap-graphite-light)]">
          In the product
        </p>
        <p className="mt-2 text-[0.8125rem] leading-relaxed text-[var(--ap-graphite)]">
          {pillar.productBehavior}
        </p>
      </div>
    </AptellumCard>
  );
}
