import { ArrowRight, MessageSquareHeart } from 'lucide-react';
import { UcmReveal } from './scroll-reveal';
import { UcmButton } from './button';
import { ucmCn } from './utils';
import { PRODUCT_FEEDBACK_URL } from '@/lib/site';

/**
 * Feedback CTA — a centered glass card inviting honest feedback. Links out to
 * the shared Ailiur feedback form. Mirrors the structure of other product
 * microsites, re-themed to UCM's warm-gold dark tokens.
 */
export function UcmFeedback() {
  return (
    <section
      id="feedback"
      className="relative w-full scroll-mt-28 px-4 py-[var(--ucm-section-y)]"
    >
      <div className="mx-auto max-w-3xl">
        <UcmReveal>
          <div className="ucm-glass-strong relative overflow-hidden rounded-[var(--ucm-radius-xl)] border border-[var(--ucm-border-strong)] px-6 py-12 text-center sm:px-12 sm:py-16">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[34rem] -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--ucm-gold)_22%,transparent)] blur-[120px]"
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-[var(--ucm-radius-pill)] border border-[var(--ucm-border)] bg-[var(--ucm-glass-bg)] px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[var(--ucm-gold)]">
                <MessageSquareHeart className="h-3.5 w-3.5" aria-hidden />
                Feedback
              </span>
              <h2 className="mt-6 font-display text-[var(--ucm-text-h1)] font-extrabold leading-[1.08] tracking-tight text-[var(--ucm-cream)]">
                Give us your honest feedback.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[length:var(--ucm-text-body)] leading-relaxed text-[var(--ucm-sand)]">
                UCM is early, and it&apos;s shaped by the people who use it. Tell us what&apos;s
                working, what&apos;s missing, and what we should build next — it goes straight to the
                team.
              </p>
              <div className="mt-8 flex justify-center">
                <UcmButton
                  href={PRODUCT_FEEDBACK_URL}
                  size="lg"
                  variant="primary"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Ailiur Feedback Form
                </UcmButton>
              </div>
            </div>
          </div>
        </UcmReveal>
      </div>
    </section>
  );
}
