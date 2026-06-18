import { ArrowRight, MessageSquareHeart, Play } from 'lucide-react';
import { TAYZT_HERO } from '@/lib/tayzt/content';
import { PRODUCT_FEEDBACK_URL } from '@/lib/site';
import { TayztButton } from './button';
import { TayztReveal } from './scroll-reveal';
import { TimelinePreview } from './timeline-preview';
import { tzCn } from './utils';

/**
 * Premium cinematic hero — editorial type on dark ink, timeline preview,
 * and the two primary calls to action.
 */
export function TayztHeroSection() {
  return (
    <section
      aria-labelledby="tayzt-hero-heading"
      className={tzCn('relative w-full px-4', 'pb-20 pt-10 sm:pb-28 sm:pt-14')}
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
        <TayztReveal className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-[var(--tz-radius-pill)] border border-[var(--tz-border)] bg-[var(--tz-glass-bg)] px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[var(--tz-gold)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--tz-green)]" aria-hidden />
            {TAYZT_HERO.eyebrow}
          </span>
          <h1
            id="tayzt-hero-heading"
            className="mt-6 font-display text-[var(--tz-text-display)] font-extrabold leading-[1.02] tracking-tight text-[var(--tz-cream)]"
          >
            {TAYZT_HERO.headline}
          </h1>
          <p className="mt-5 max-w-lg font-display text-xl font-semibold leading-snug text-[var(--tz-cream-soft)] sm:text-2xl">
            {TAYZT_HERO.promise}
          </p>
          <p className="mt-4 max-w-lg text-[length:var(--tz-text-body)] leading-relaxed text-[var(--tz-graphite)]">
            {TAYZT_HERO.body}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TayztButton
              href={TAYZT_HERO.primaryCta.href}
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              {TAYZT_HERO.primaryCta.label}
            </TayztButton>
            <TayztButton
              href={TAYZT_HERO.secondaryCta.href}
              size="lg"
              variant="secondary"
              icon={<Play className="h-4 w-4" />}
              iconPosition="start"
            >
              {TAYZT_HERO.secondaryCta.label}
            </TayztButton>
            <TayztButton
              href={PRODUCT_FEEDBACK_URL}
              size="lg"
              variant="ghost"
              icon={<MessageSquareHeart className="h-4 w-4" />}
              iconPosition="start"
            >
              Feedback Form
            </TayztButton>
          </div>
        </TayztReveal>

        <TayztReveal delay={0.08} className="w-full lg:max-w-none">
          <TimelinePreview animated />
        </TayztReveal>
      </div>
    </section>
  );
}
