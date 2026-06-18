'use client';

import { ArrowRight, MessageSquareHeart } from 'lucide-react';
import { DaymeshReveal } from './reveal';
import { DaymeshButton } from './button';
import { PRODUCT_FEEDBACK_URL } from '@/lib/site';

export function DaymeshFeedback() {
  return (
    <section
      id="feedback"
      className="mx-auto w-full max-w-[var(--dm-content-max)] scroll-mt-28 px-4 py-[var(--dm-section-y)] sm:px-6"
    >
      <DaymeshReveal>
        <div className="dm-glass-strong relative overflow-hidden rounded-[var(--dm-radius-xl)] px-6 py-12 text-center sm:px-12 sm:py-16">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[34rem] -translate-x-1/2 rounded-full bg-[var(--dm-amber-soft)] blur-[120px]"
          />
          <div className="relative">
            <span className="dm-glass inline-flex items-center gap-2 rounded-[var(--dm-radius-pill)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--dm-amber-deep)]">
              <MessageSquareHeart className="h-3.5 w-3.5 text-[var(--dm-amber)]" aria-hidden />
              Feedback
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl font-display text-[length:var(--dm-text-h1)] font-extrabold leading-[1.08] tracking-tight text-[var(--dm-ink)]">
              Give us your honest feedback.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[length:var(--dm-text-body)] leading-relaxed text-[var(--dm-muted)]">
              Daymesh is early, and it&apos;s shaped by the people who use it. Tell us what&apos;s
              working, what&apos;s missing, and what we should build next — it goes straight to the
              team.
            </p>
            <div className="mt-8 flex justify-center">
              <DaymeshButton href={PRODUCT_FEEDBACK_URL} size="lg" variant="primary">
                Ailiur Feedback Form
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </DaymeshButton>
            </div>
          </div>
        </div>
      </DaymeshReveal>
    </section>
  );
}
