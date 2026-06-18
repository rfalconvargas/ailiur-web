'use client';

import { ArrowRight, MessageSquareHeart } from 'lucide-react';
import { OruvoReveal } from './reveal';
import { OruvoButton } from './button';
import { PRODUCT_FEEDBACK_URL } from '@/lib/site';

/** Closing feedback CTA — links out to the shared Ailiur Product Feedback form. */
export function OruvoFeedback() {
  return (
    <section
      id="feedback"
      className="mx-auto w-full max-w-[var(--or-content-max)] scroll-mt-28 px-4 py-[var(--or-section-y)]"
    >
      <OruvoReveal>
        <div className="or-glass-strong relative overflow-hidden rounded-[var(--or-radius-xl)] px-6 py-12 text-center sm:px-12 sm:py-16">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[34rem] -translate-x-1/2 rounded-full bg-[var(--or-gold-soft)] blur-[120px]"
          />
          <div className="relative">
            <span className="or-glass inline-flex items-center gap-2 rounded-[var(--or-radius-pill)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--or-slate)]">
              <MessageSquareHeart className="h-3.5 w-3.5 text-[var(--or-gold)]" aria-hidden />
              Feedback
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-[length:var(--or-text-h1)] font-extrabold leading-[1.08] tracking-tight text-[var(--or-ink)]">
              Give us your honest feedback.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[length:var(--or-text-body)] leading-relaxed text-[var(--or-slate)]">
              Oruvo is early, and it&apos;s shaped by the people who use it. Tell us what&apos;s
              working, what&apos;s missing, and what we should build next — it goes straight to the
              team.
            </p>
            <div className="mt-8 flex justify-center">
              <OruvoButton href={PRODUCT_FEEDBACK_URL} size="lg" variant="primary">
                Ailiur Feedback Form
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </OruvoButton>
            </div>
          </div>
        </div>
      </OruvoReveal>
    </section>
  );
}
