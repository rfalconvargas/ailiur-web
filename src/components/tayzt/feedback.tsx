import { ArrowRight, MessageSquareHeart } from 'lucide-react';
import { TayztButton } from './button';
import { TayztReveal } from './scroll-reveal';
import { tzCn } from './utils';
import { PRODUCT_FEEDBACK_URL } from '@/lib/site';

/** Closing feedback CTA — links out to the shared Ailiur Product Feedback form. */
export function TayztFeedback() {
  return (
    <section
      id="feedback"
      aria-labelledby="tayzt-feedback-heading"
      className="relative w-full scroll-mt-28 px-4 py-[var(--tz-section-y)]"
    >
      <TayztReveal className="mx-auto max-w-3xl">
        <div
          className={tzCn(
            'tz-glass-strong relative overflow-hidden rounded-[var(--tz-radius-xl)] border border-[var(--tz-border-strong)]',
            'px-6 py-12 text-center sm:px-12 sm:py-16',
          )}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[34rem] -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--tz-gold)_22%,transparent)] blur-[120px]"
          />
          <div className="relative">
            <span className="tz-glass inline-flex items-center gap-2 rounded-[var(--tz-radius-pill)] border border-[var(--tz-border)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--tz-graphite)]">
              <MessageSquareHeart className="h-3.5 w-3.5 text-[var(--tz-gold)]" aria-hidden />
              Feedback
            </span>
            <h2
              id="tayzt-feedback-heading"
              className="mx-auto mt-5 max-w-2xl font-display text-[var(--tz-text-h1)] font-extrabold leading-[1.08] tracking-tight text-[var(--tz-cream)]"
            >
              Give us your honest feedback.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[length:var(--tz-text-body)] leading-relaxed text-[var(--tz-graphite)]">
              Tayzt is early, and it&apos;s shaped by the people who use it. Tell us what&apos;s
              working, what&apos;s missing, and what we should build next — it goes straight to the
              team.
            </p>
            <div className="mt-8 flex justify-center">
              <TayztButton
                href={PRODUCT_FEEDBACK_URL}
                size="lg"
                variant="primary"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Ailiur Feedback Form
              </TayztButton>
            </div>
          </div>
        </div>
      </TayztReveal>
    </section>
  );
}
