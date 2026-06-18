import { ArrowRight } from 'lucide-react';
import { APTELLUM_META } from '@/lib/aptellum/content';
import { PAGE_HERO } from '@/lib/aptellum/page-content';
import { PRODUCT_FEEDBACK_URL } from '@/lib/site';
import { AptellumBadge } from './badge';
import { AptellumButton } from './button';
import { HeroVisual } from './hero-visual';
import { AptellumScrollReveal } from './scroll-reveal';
import { AptellumTrustStrip } from './trust-strip';
import { apCn } from './utils';

/**
 * Premium hero — editorial type, studio preview, trust microcopy.
 */
export function AptellumHeroSection() {
  return (
    <section
      aria-labelledby="aptellum-hero-heading"
      className={apCn(
        'relative w-full px-4',
        'pb-20 pt-4 sm:pb-28 sm:pt-6',
      )}
    >
      {/* Soft hero atmosphere — no parallax */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[min(70vh,32rem)] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,var(--ap-mist-soft)_0%,transparent_72%)]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
        <AptellumScrollReveal className="max-w-xl">
          <AptellumBadge variant="mist" className="mb-6">
            {PAGE_HERO.eyebrow}
          </AptellumBadge>
          <h1
            id="aptellum-hero-heading"
            className="font-display text-[var(--ap-text-display)] font-extrabold leading-[1.03] tracking-tight text-[var(--ap-ink)]"
          >
            {PAGE_HERO.headline}
          </h1>
          <p className="mt-6 max-w-lg text-[length:var(--ap-text-body)] leading-relaxed text-[var(--ap-graphite)] sm:text-lg">
            {PAGE_HERO.subhead}
          </p>
          <p className="mt-4 max-w-lg font-display text-[1.0625rem] font-semibold leading-snug text-[var(--ap-ink-soft)]">
            {APTELLUM_META.thesis}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <AptellumButton
              href={PAGE_HERO.primaryCta.href}
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              {PAGE_HERO.primaryCta.label}
            </AptellumButton>
            <AptellumButton href={PAGE_HERO.secondaryCta.href} size="lg" variant="secondary">
              {PAGE_HERO.secondaryCta.label}
            </AptellumButton>
            <AptellumButton href={PRODUCT_FEEDBACK_URL} size="lg" variant="ghost">
              Feedback Form
            </AptellumButton>
          </div>
          <AptellumTrustStrip className="mt-10 max-w-lg" variant="stacked" />
        </AptellumScrollReveal>

        <AptellumScrollReveal delay={0.06} className="w-full lg:max-w-none">
          <HeroVisual />
        </AptellumScrollReveal>
      </div>
    </section>
  );
}
