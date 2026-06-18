import { ArrowRight, MessageSquareHeart } from 'lucide-react';
import { OlluneReveal } from './reveal';
import { PRODUCT_FEEDBACK_URL } from '@/lib/site';

/**
 * Ollune feedback CTA — a centered, dark-legible card inviting early users
 * to send honest feedback via the shared Ailiur product feedback form.
 */
export function OlluneFeedback() {
  return (
    <section
      id="feedback"
      className="mx-auto w-full max-w-[var(--ol-content-max)] scroll-mt-28 px-4 py-[var(--ol-section-y)]"
    >
      <OlluneReveal>
        <div className="relative mx-auto max-w-2xl">
          {/* Soft blurred accent glow behind the card */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[280px] w-[520px] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[90px]"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(31,168,92,0.18), transparent 65%)',
            }}
          />

          <div className="ol-glass-strong relative z-10 flex flex-col items-center rounded-[var(--ol-radius-xl)] px-6 py-12 text-center sm:px-12">
            <span className="ol-glass inline-flex items-center gap-2 rounded-[var(--ol-radius-pill)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ol-silver)]">
              <MessageSquareHeart className="h-3.5 w-3.5 text-[var(--ol-green)]" />
              Feedback
            </span>

            <h2 className="mt-6 font-display text-[length:var(--ol-text-h1)] font-extrabold leading-[1.08] tracking-tight text-[var(--ol-cream)]">
              Give us your honest feedback.
            </h2>

            <p className="mt-5 max-w-md text-[length:var(--ol-text-body)] leading-relaxed text-[var(--ol-silver)]">
              Ollune is early, and it&apos;s shaped by the people who use it. Tell us
              what&apos;s working, what&apos;s missing, and what we should build next
              — it goes straight to the team.
            </p>

            <a
              href={PRODUCT_FEEDBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center justify-center gap-2 rounded-[var(--ol-radius-pill)] bg-[var(--ol-green)] px-7 py-3.5 text-base font-semibold tracking-tight text-[var(--ol-ink)] shadow-[var(--ol-glow-green)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--ol-green-soft)]"
            >
              Ailiur Feedback Form
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </OlluneReveal>
    </section>
  );
}
