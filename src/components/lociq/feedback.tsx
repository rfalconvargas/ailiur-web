import { ArrowRight, MessageSquareHeart } from 'lucide-react';
import { LociqReveal } from './scroll-reveal';
import { LociqButton } from './button';
import { PRODUCT_FEEDBACK_URL } from '@/lib/site';

/** Closing feedback CTA — links out to the shared Ailiur Product Feedback form. */
export function LociqFeedback() {
  return (
    <section
      id="feedback"
      className="mx-auto w-full max-w-[var(--lq-content-max)] scroll-mt-28 px-4 py-[var(--lq-section-y)]"
    >
      <LociqReveal>
        <div className="lq-glass-strong relative overflow-hidden rounded-[var(--lq-radius-xl)] border border-[var(--lq-border-strong)] px-6 py-12 text-center sm:px-12 sm:py-16">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[34rem] -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--lq-green)_22%,transparent)] blur-[120px]"
          />
          <div className="relative">
            <span className="lq-glass inline-flex items-center gap-2 rounded-[var(--lq-radius-pill)] border border-[var(--lq-border)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--lq-slate)]">
              <MessageSquareHeart className="h-3.5 w-3.5 text-[var(--lq-green)]" aria-hidden />
              Feedback
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-[length:var(--lq-text-h1)] font-extrabold leading-[1.08] tracking-tight text-[var(--lq-ink)]">
              Give us your honest feedback.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[length:var(--lq-text-body)] leading-relaxed text-[var(--lq-slate)]">
              Lociq is early, and it&apos;s shaped by the people who use it. Tell us what&apos;s
              working, what&apos;s missing, and what we should build next — it goes straight to the
              team.
            </p>
            <div className="mt-8 flex justify-center">
              <LociqButton
                href={PRODUCT_FEEDBACK_URL}
                size="lg"
                variant="primary"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Ailiur Feedback Form
              </LociqButton>
            </div>
          </div>
        </div>
      </LociqReveal>
    </section>
  );
}
