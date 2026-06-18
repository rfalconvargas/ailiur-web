import { ArrowRight, MessageSquareHeart } from 'lucide-react';
import { PRODUCT_FEEDBACK_URL } from '@/lib/site';
import { TellumetryButton } from './button';
import { TellumetryReveal } from './scroll-reveal';

/** Closing feedback CTA — links out to the shared Ailiur Product Feedback form. */
export function TellumetryFeedback() {
  return (
    <section
      id="feedback"
      className="relative w-full scroll-mt-28 px-4 py-[var(--tm-section-y)]"
    >
      <div className="mx-auto max-w-3xl">
        <TellumetryReveal>
          <div className="tm-glass-strong relative overflow-hidden rounded-[var(--tm-radius-xl)] border border-[var(--tm-border-strong)] px-6 py-12 text-center sm:px-12 sm:py-16">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[34rem] -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--tm-mint)_22%,transparent)] blur-[120px]"
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-[var(--tm-radius-pill)] border border-[var(--tm-border)] bg-[var(--tm-glass-bg)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--tm-slate)]">
                <MessageSquareHeart className="h-3.5 w-3.5 text-[var(--tm-mint)]" aria-hidden />
                Feedback
              </span>
              <h2 className="mx-auto mt-5 max-w-2xl font-display text-[var(--tm-text-h1)] font-extrabold leading-[1.08] tracking-tight text-[var(--tm-ivory)]">
                Give us your honest feedback.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[length:var(--tm-text-body)] leading-relaxed text-[var(--tm-slate)]">
                Tellumetry is early, and it&apos;s shaped by the people who use it. Tell us
                what&apos;s working, what&apos;s missing, and what we should build next — it goes
                straight to the team.
              </p>
              <div className="mt-8 flex justify-center">
                <TellumetryButton href={PRODUCT_FEEDBACK_URL} size="lg" variant="primary">
                  Ailiur Feedback Form
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </TellumetryButton>
              </div>
            </div>
          </div>
        </TellumetryReveal>
      </div>
    </section>
  );
}
