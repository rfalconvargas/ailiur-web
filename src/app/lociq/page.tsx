import { ArrowUpRight } from 'lucide-react';
import {
  LOCIQ_DEMO,
  LOCIQ_DIFFERENT,
  LOCIQ_ECOSYSTEM,
  LOCIQ_EXPLANATION,
  LOCIQ_FEATURES,
  LOCIQ_PROBLEM,
  LOCIQ_USE_CASES,
  LOCIQ_WAITLIST,
  type LociqFeature,
  type LociqUseCase,
} from '@/lib/lociq/content';
import {
  CivicActionSimulator,
  LociqCard,
  LociqFooter,
  LociqHeroSection,
  LociqReveal,
  LociqSection,
  LociqWaitlist,
  LQ_SIGNAL,
  lqCn,
} from '@/components/lociq';
import { SmartLink } from '@/components/ui/smart-link';

export default function LociqPage() {
  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <LociqHeroSection />

      {/* ── 2. Short product explanation ────────────────────────── */}
      <LociqSection
        id="explanation"
        eyebrow={LOCIQ_EXPLANATION.eyebrow}
        headline={LOCIQ_EXPLANATION.headline}
        subhead={LOCIQ_EXPLANATION.body}
        centered
        divider
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LOCIQ_EXPLANATION.points.map((p, i) => (
            <LociqReveal key={p.title} delay={(i % 4) * 0.05} as="div">
              <LociqCard variant="glass" padding="md" interactive className="h-full">
                <span className="font-display text-sm font-bold text-[var(--lq-green-deep)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-[var(--lq-ink)]">
                  {p.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--lq-slate)]">
                  {p.body}
                </p>
              </LociqCard>
            </LociqReveal>
          ))}
        </div>
      </LociqSection>

      {/* ── 3. User problem ─────────────────────────────────────── */}
      <LociqSection
        id="problem"
        eyebrow={LOCIQ_PROBLEM.eyebrow}
        headline={LOCIQ_PROBLEM.headline}
        divider
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <LociqReveal>
            <p className="text-[length:var(--lq-text-body)] leading-relaxed text-[var(--lq-slate)]">
              {LOCIQ_PROBLEM.body}
            </p>
          </LociqReveal>
          <LociqReveal delay={0.06}>
            <ul className="space-y-3" role="list">
              {LOCIQ_PROBLEM.friction.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 rounded-[var(--lq-radius-md)] border border-[var(--lq-hairline)] bg-[var(--lq-surface-muted)] px-4 py-3"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--lq-gold)]" aria-hidden />
                  <span className="text-[0.9375rem] leading-relaxed text-[var(--lq-charcoal)]">{f}</span>
                </li>
              ))}
            </ul>
          </LociqReveal>
        </div>
      </LociqSection>

      {/* ── 4. Interactive demo ─────────────────────────────────── */}
      <LociqSection
        id="demo"
        eyebrow={LOCIQ_DEMO.eyebrow}
        headline={LOCIQ_DEMO.headline}
        subhead={LOCIQ_DEMO.body}
        centered
        width="wide"
        divider
      >
        <LociqReveal>
          <CivicActionSimulator />
        </LociqReveal>
      </LociqSection>

      {/* ── 5. Core features ────────────────────────────────────── */}
      <LociqSection
        id="features"
        eyebrow={LOCIQ_FEATURES.eyebrow}
        headline={LOCIQ_FEATURES.headline}
        subhead={LOCIQ_FEATURES.subhead}
        centered
        divider
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {LOCIQ_FEATURES.items.map((feature, i) => (
            <LociqReveal key={feature.title} delay={(i % 3) * 0.05} as="li">
              <FeatureCard feature={feature} />
            </LociqReveal>
          ))}
        </ul>
      </LociqSection>

      {/* ── 6. Example use cases ────────────────────────────────── */}
      <LociqSection
        id="use-cases"
        eyebrow={LOCIQ_USE_CASES.eyebrow}
        headline={LOCIQ_USE_CASES.headline}
        centered
        divider
      >
        <ul className="grid gap-4 sm:grid-cols-2" role="list">
          {LOCIQ_USE_CASES.items.map((useCase, i) => (
            <LociqReveal key={useCase.title} delay={(i % 2) * 0.05} as="li">
              <UseCaseCard useCase={useCase} />
            </LociqReveal>
          ))}
        </ul>
      </LociqSection>

      {/* ── 7. Why this is different ────────────────────────────── */}
      <LociqSection
        id="different"
        eyebrow={LOCIQ_DIFFERENT.eyebrow}
        headline={LOCIQ_DIFFERENT.headline}
        subhead={LOCIQ_DIFFERENT.body}
        divider
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LOCIQ_DIFFERENT.points.map((p, i) => (
            <LociqReveal key={p.title} delay={(i % 4) * 0.05}>
              <LociqCard variant="outline" padding="md" className="h-full">
                <h3 className="font-display text-lg font-bold text-[var(--lq-ink)]">{p.title}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-[var(--lq-slate)]">
                  {p.body}
                </p>
              </LociqCard>
            </LociqReveal>
          ))}
        </div>
      </LociqSection>

      {/* ── 8. Ailiur ecosystem connection ──────────────────────── */}
      <LociqSection
        id="ecosystem"
        eyebrow={LOCIQ_ECOSYSTEM.eyebrow}
        headline={LOCIQ_ECOSYSTEM.headline}
        subhead={LOCIQ_ECOSYSTEM.body}
        centered
        divider
      >
        <ul className="grid gap-4 md:grid-cols-3" role="list">
          {LOCIQ_ECOSYSTEM.links.map((link, i) => (
            <LociqReveal key={link.name} delay={i * 0.05} as="li">
              <SmartLink href={link.href} className="group block h-full">
                <LociqCard variant="glass" padding="md" interactive className="h-full">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-[var(--lq-ink)]">
                      {link.name}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-[var(--lq-slate-dim)] transition-colors group-hover:text-[var(--lq-green)]" />
                  </div>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-[var(--lq-slate)]">
                    {link.desc}
                  </p>
                </LociqCard>
              </SmartLink>
            </LociqReveal>
          ))}
        </ul>
      </LociqSection>

      {/* ── 9. Waitlist CTA ─────────────────────────────────────── */}
      <LociqSection
        id="waitlist"
        eyebrow={LOCIQ_WAITLIST.eyebrow}
        headline={LOCIQ_WAITLIST.headline}
        subhead={LOCIQ_WAITLIST.body}
        centered
        width="narrow"
        divider
      >
        <LociqReveal className="mx-auto max-w-xl">
          <LociqWaitlist />
        </LociqReveal>
      </LociqSection>

      {/* ── 10. Footer ──────────────────────────────────────────── */}
      <LociqFooter />
    </>
  );
}

// ─── Local section helpers ─────────────────────────────────────────────────────

function FeatureCard({ feature }: { feature: LociqFeature }) {
  const Icon = feature.icon;
  const color = LQ_SIGNAL[feature.signal];

  return (
    <LociqCard variant="glass" padding="md" interactive className="h-full">
      <span
        className="flex h-11 w-11 items-center justify-center rounded-[var(--lq-radius-sm)] border border-[var(--lq-hairline)] bg-[var(--lq-surface-muted)]"
        style={{ color }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </span>
      <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-[var(--lq-ink)]">
        {feature.title}
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--lq-slate)]">
        {feature.body}
      </p>
    </LociqCard>
  );
}

function UseCaseCard({ useCase }: { useCase: LociqUseCase }) {
  return (
    <LociqCard variant="glassStrong" padding="lg" interactive className="h-full">
      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--lq-green-deep)]">
        {useCase.kicker}
      </span>
      <h3 className={lqCn('mt-3 font-display text-2xl font-bold tracking-tight text-[var(--lq-ink)]')}>
        {useCase.title}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--lq-slate)]">
        {useCase.body}
      </p>
    </LociqCard>
  );
}
