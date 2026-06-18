import { ArrowRight, Sparkles } from 'lucide-react';
import { LOCIQ_HERO } from '@/lib/lociq/content';
import { LociqButton } from './button';
import { LociqReveal } from './scroll-reveal';
import { TownHallPanel } from './town-hall-panel';
import { lqCn } from './utils';
import { PRODUCT_FEEDBACK_URL } from '@/lib/site';

const PILLARS = ['Report', 'Understand', 'Vote', 'Organize'] as const;

/**
 * Premium hero — editorial type on warm paper, the Town Hall panel, and the
 * two primary calls to action.
 */
export function LociqHeroSection() {
  return (
    <section
      aria-labelledby="lociq-hero-heading"
      className={lqCn('relative w-full px-4', 'pb-20 pt-10 sm:pb-28 sm:pt-14')}
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
        <LociqReveal className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-[var(--lq-radius-pill)] border border-[var(--lq-border)] bg-[var(--lq-glass-bg)] px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[var(--lq-green-deep)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--lq-green)]" aria-hidden />
            {LOCIQ_HERO.eyebrow}
          </span>
          <h1
            id="lociq-hero-heading"
            className="mt-6 font-display text-[var(--lq-text-display)] font-extrabold leading-[1.02] tracking-tight text-[var(--lq-ink)]"
          >
            {LOCIQ_HERO.headline}
          </h1>
          <p className="mt-5 max-w-lg font-display text-xl font-semibold leading-snug text-[var(--lq-charcoal)] sm:text-2xl">
            {LOCIQ_HERO.promise}
          </p>
          <p className="mt-4 max-w-lg text-[length:var(--lq-text-body)] leading-relaxed text-[var(--lq-slate)]">
            {LOCIQ_HERO.body}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <LociqButton
              href={LOCIQ_HERO.primaryCta.href}
              size="lg"
              icon={<Sparkles className="h-4 w-4" />}
              iconPosition="start"
            >
              {LOCIQ_HERO.primaryCta.label}
            </LociqButton>
            <LociqButton
              href={LOCIQ_HERO.secondaryCta.href}
              size="lg"
              variant="secondary"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              {LOCIQ_HERO.secondaryCta.label}
            </LociqButton>
            <a
              href={PRODUCT_FEEDBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={lqCn(
                'group inline-flex h-12 items-center justify-center gap-2 rounded-[var(--lq-radius-pill)] px-8',
                'text-[0.9375rem] font-semibold tracking-tight text-[var(--lq-charcoal)]',
                'transition-[transform,background-color,color] duration-300 ease-out',
                'hover:bg-[color-mix(in_srgb,var(--lq-ink)_6%,transparent)] hover:text-[var(--lq-ink)]',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--lq-green)]',
              )}
            >
              Feedback Form
            </a>
          </div>

          {/* The four civic moves */}
          <div className="mt-10">
            <p className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[var(--lq-slate-dim)]">
              From complaint to coordinated action
            </p>
            <ol className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2" role="list">
              {PILLARS.map((pillar, i) => (
                <li key={pillar} className="flex items-center gap-2">
                  <span className="rounded-[var(--lq-radius-pill)] border border-[var(--lq-border)] bg-[var(--lq-glass-bg)] px-3 py-1 text-[0.75rem] font-semibold text-[var(--lq-charcoal)]">
                    {pillar}
                  </span>
                  {i < PILLARS.length - 1 && (
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--lq-slate-dim)]" aria-hidden />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </LociqReveal>

        <LociqReveal delay={0.08} className="w-full lg:max-w-none">
          <TownHallPanel />
        </LociqReveal>
      </div>
    </section>
  );
}
