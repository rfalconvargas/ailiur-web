import { Activity, Images, Search, FlaskConical, ArrowRight } from 'lucide-react';
import {
  DaymeshHero,
  DaymeshSection,
  DaymeshReveal,
  DaymeshDemo,
  DaymeshButton,
  DaymeshPrivacyVisual,
  DaymeshWaitlist,
  DaymeshFeedback,
  DaymeshFooter,
} from '@/components/daymesh';
import {
  DM_PROBLEM,
  DM_HOW,
  DM_DEMO,
  DM_PRIVACY,
  DM_USE_CASES,
  DM_CTA,
  DM_WAITLIST,
} from '@/lib/daymesh/content';

const HOW_ICONS = [Activity, Images, Search, FlaskConical];

export default function DaymeshPage() {
  return (
    <>
      {/* 1 — Hero */}
      <DaymeshHero />

      {/* 2 — Problem */}
      <DaymeshSection id="problem" eyebrow={DM_PROBLEM.eyebrow} headline={DM_PROBLEM.headline} intro={DM_PROBLEM.body}>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {DM_PROBLEM.pains.map((pain, i) => (
            <DaymeshReveal key={pain.title} delay={i * 0.06}>
              <div className="dm-solid h-full rounded-[var(--dm-radius-lg)] p-6">
                <span className="font-display text-sm font-bold text-[var(--dm-clay)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold leading-snug text-[var(--dm-ink)]">
                  {pain.title}
                </h3>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--dm-muted)]">{pain.body}</p>
              </div>
            </DaymeshReveal>
          ))}
        </div>
      </DaymeshSection>

      {/* 3 — How it works */}
      <DaymeshSection id="how" eyebrow={DM_HOW.eyebrow} headline={DM_HOW.headline}>
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {DM_HOW.steps.map((step, i) => {
            const Icon = HOW_ICONS[i];
            return (
              <DaymeshReveal key={step.title} delay={i * 0.06} as="li">
                <div className="dm-glass h-full rounded-[var(--dm-radius-lg)] p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-[var(--dm-radius-sm)] bg-[var(--dm-surface)] text-[var(--dm-amber-deep)] shadow-[var(--dm-shadow-sm)]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-display text-sm font-bold text-[var(--dm-faint)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold text-[var(--dm-ink)]">{step.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--dm-muted)]">{step.body}</p>
                </div>
              </DaymeshReveal>
            );
          })}
        </ol>
      </DaymeshSection>

      {/* 4 — Interactive demo (the centerpiece) */}
      <DaymeshSection id="demo" eyebrow={DM_DEMO.eyebrow} headline={DM_DEMO.headline} intro={DM_DEMO.intro}>
        <DaymeshDemo />
      </DaymeshSection>

      {/* 5 — Privacy */}
      <DaymeshSection id="privacy" eyebrow={DM_PRIVACY.eyebrow} headline={DM_PRIVACY.headline} intro={DM_PRIVACY.intro}>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <div className="grid gap-4 sm:grid-cols-2">
            {DM_PRIVACY.points.map((p, i) => (
              <DaymeshReveal key={p.title} delay={i * 0.05}>
                <div className="dm-solid h-full rounded-[var(--dm-radius-lg)] p-6">
                  <h3 className="font-display text-lg font-bold text-[var(--dm-ink)]">{p.title}</h3>
                  <p className="mt-2 text-[0.92rem] leading-relaxed text-[var(--dm-muted)]">{p.body}</p>
                </div>
              </DaymeshReveal>
            ))}
          </div>
          <DaymeshReveal delay={0.1}>
            <DaymeshPrivacyVisual />
          </DaymeshReveal>
        </div>
      </DaymeshSection>

      {/* 6 — Use cases */}
      <DaymeshSection id="use-cases" eyebrow={DM_USE_CASES.eyebrow} headline={DM_USE_CASES.headline}>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DM_USE_CASES.cases.map((c, i) => (
            <DaymeshReveal key={c.title} delay={i * 0.04}>
              <div className="dm-glass h-full rounded-[var(--dm-radius-lg)] p-5">
                <h3 className="font-display text-base font-bold text-[var(--dm-ink)]">{c.title}</h3>
                <p className="mt-1.5 text-[0.88rem] leading-relaxed text-[var(--dm-muted)]">{c.body}</p>
              </div>
            </DaymeshReveal>
          ))}
        </div>
      </DaymeshSection>

      {/* 7 — Mid-page CTA band */}
      <section className="mx-auto w-full max-w-[var(--dm-content-max)] px-4 pb-[var(--dm-section-y)] sm:px-6">
        <DaymeshReveal>
          <div className="dm-glass-strong overflow-hidden rounded-[var(--dm-radius-xl)] p-8 text-center sm:p-12">
            <h2 className="mx-auto max-w-2xl font-display text-[length:var(--dm-text-h1)] font-extrabold leading-[1.08] tracking-tight text-[var(--dm-ink)]">
              {DM_CTA.headline}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[length:var(--dm-text-body)] leading-relaxed text-[var(--dm-muted)]">
              {DM_CTA.sub}
            </p>
            <div className="mt-7 flex justify-center">
              <DaymeshButton href="#waitlist" size="lg" variant="primary">
                {DM_CTA.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </DaymeshButton>
            </div>
          </div>
        </DaymeshReveal>
      </section>

      {/* 8 — Waitlist */}
      <DaymeshSection id="waitlist" eyebrow={DM_WAITLIST.eyebrow} headline={DM_WAITLIST.headline} intro={DM_WAITLIST.sub}>
        <div className="mt-8 max-w-xl">
          <DaymeshWaitlist />
        </div>
      </DaymeshSection>

      {/* 9 — Feedback */}
      <DaymeshFeedback />

      {/* 10 — Footer */}
      <DaymeshFooter />
    </>
  );
}
