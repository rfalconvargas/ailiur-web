import { ArrowRight, MessageSquareHeart } from 'lucide-react';
import { Reveal } from '@/components/retellum/reveal';
import { PRODUCT_FEEDBACK_URL } from '@/lib/site';

export function RetellumFeedback() {
  return (
    <section
      id="feedback"
      className="mx-auto w-full max-w-6xl scroll-mt-28 px-4 py-20 sm:py-28"
    >
      <Reveal className="relative mx-auto max-w-2xl">
        {/* soft blurred accent glow behind the card */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 mx-auto h-full w-full max-w-md rounded-full bg-accent-green/25 blur-3xl"
        />
        <div className="glass-strong rounded-[var(--radius-panel)] px-6 py-12 text-center sm:px-12 sm:py-14">
          <span className="glass-strong inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/70">
            <MessageSquareHeart className="h-3.5 w-3.5 text-accent-green" />
            Feedback
          </span>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-foreground">
            Give us your honest feedback.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-foreground/70">
            Retellum is early, and it&apos;s shaped by the people who use it. Tell
            us what&apos;s working, what&apos;s missing, and what we should build
            next — it goes straight to the team.
          </p>
          <div className="mt-9 flex justify-center">
            <a
              href={PRODUCT_FEEDBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-green px-6 py-3.5 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
            >
              Ailiur Feedback Form
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
