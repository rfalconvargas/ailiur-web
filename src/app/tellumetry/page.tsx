import { ArrowUpRight } from 'lucide-react';
import {
  TELLUMETRY_DEMO,
  TELLUMETRY_DIFFERENT,
  TELLUMETRY_ECOSYSTEM,
  TELLUMETRY_EXPLANATION,
  TELLUMETRY_FEATURES,
  TELLUMETRY_PROBLEM,
  TELLUMETRY_USE_CASES,
  TELLUMETRY_WAITLIST,
  type TellumetryFeature,
  type TellumetryUseCase,
} from '@/lib/tellumetry/content';
import {
  AgentPreflightDemo,
  TellumetryCard,
  TellumetryFooter,
  TellumetryHeroSection,
  TellumetryReveal,
  TellumetrySection,
  TellumetryWaitlist,
  TellumetryFeedback,
  TM_SIGNAL,
  tmCn,
} from '@/components/tellumetry';
import { SmartLink } from '@/components/ui/smart-link';

export default function TellumetryPage() {
  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <TellumetryHeroSection />

      {/* ── 2. Short product explanation ────────────────────────── */}
      <TellumetrySection
        id="explanation"
        eyebrow={TELLUMETRY_EXPLANATION.eyebrow}
        headline={TELLUMETRY_EXPLANATION.headline}
        subhead={TELLUMETRY_EXPLANATION.body}
        centered
        divider
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TELLUMETRY_EXPLANATION.points.map((p, i) => (
            <TellumetryReveal key={p.title} delay={(i % 4) * 0.05} as="div">
              <TellumetryCard variant="glass" padding="md" interactive className="h-full">
                <span className="font-display text-sm font-bold text-[var(--tm-mint)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-[var(--tm-ivory)]">
                  {p.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--tm-slate)]">
                  {p.body}
                </p>
              </TellumetryCard>
            </TellumetryReveal>
          ))}
        </div>
      </TellumetrySection>

      {/* ── 3. User problem ─────────────────────────────────────── */}
      <TellumetrySection
        id="problem"
        eyebrow={TELLUMETRY_PROBLEM.eyebrow}
        headline={TELLUMETRY_PROBLEM.headline}
        divider
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <TellumetryReveal>
            <p className="text-[length:var(--tm-text-body)] leading-relaxed text-[var(--tm-slate)]">
              {TELLUMETRY_PROBLEM.body}
            </p>
          </TellumetryReveal>
          <TellumetryReveal delay={0.06}>
            <ul className="space-y-3" role="list">
              {TELLUMETRY_PROBLEM.friction.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 rounded-[var(--tm-radius-md)] border border-[var(--tm-hairline)] bg-[var(--tm-surface-muted)] px-4 py-3"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--tm-red)]" aria-hidden />
                  <span className="text-[0.9375rem] leading-relaxed text-[var(--tm-ivory-soft)]">{f}</span>
                </li>
              ))}
            </ul>
          </TellumetryReveal>
        </div>
      </TellumetrySection>

      {/* ── 4. Interactive demo ─────────────────────────────────── */}
      <TellumetrySection
        id="demo"
        eyebrow={TELLUMETRY_DEMO.eyebrow}
        headline={TELLUMETRY_DEMO.headline}
        subhead={TELLUMETRY_DEMO.body}
        centered
        width="wide"
        divider
      >
        <TellumetryReveal>
          <div className="relative">
            {/* Calm backdrop halo — sets the centerpiece apart without glow. */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-6 -top-10 bottom-0 -z-10 rounded-[var(--tm-radius-xl)] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,color-mix(in_srgb,var(--tm-cyan)_10%,transparent),transparent_70%)]"
            />
            <p className="mb-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[var(--tm-slate-dim)]">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--tm-mint)]" aria-hidden />
                Live preview
              </span>
              <span aria-hidden className="text-[var(--tm-hairline)]">·</span>
              <span>Runs in your browser</span>
              <span aria-hidden className="text-[var(--tm-hairline)]">·</span>
              <span>Mock data</span>
            </p>
            <AgentPreflightDemo />
          </div>
        </TellumetryReveal>
      </TellumetrySection>

      {/* ── 5. Core features ────────────────────────────────────── */}
      <TellumetrySection
        id="features"
        eyebrow={TELLUMETRY_FEATURES.eyebrow}
        headline={TELLUMETRY_FEATURES.headline}
        subhead={TELLUMETRY_FEATURES.subhead}
        centered
        divider
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {TELLUMETRY_FEATURES.items.map((feature, i) => (
            <TellumetryReveal key={feature.title} delay={(i % 3) * 0.05} as="li">
              <FeatureCard feature={feature} />
            </TellumetryReveal>
          ))}
        </ul>
      </TellumetrySection>

      {/* ── 6. Example use cases ────────────────────────────────── */}
      <TellumetrySection
        id="use-cases"
        eyebrow={TELLUMETRY_USE_CASES.eyebrow}
        headline={TELLUMETRY_USE_CASES.headline}
        centered
        divider
      >
        <ul className="grid gap-4 sm:grid-cols-2" role="list">
          {TELLUMETRY_USE_CASES.items.map((useCase, i) => (
            <TellumetryReveal key={useCase.title} delay={(i % 2) * 0.05} as="li">
              <UseCaseCard useCase={useCase} />
            </TellumetryReveal>
          ))}
        </ul>
      </TellumetrySection>

      {/* ── 7. Why this is different ────────────────────────────── */}
      <TellumetrySection
        id="different"
        eyebrow={TELLUMETRY_DIFFERENT.eyebrow}
        headline={TELLUMETRY_DIFFERENT.headline}
        subhead={TELLUMETRY_DIFFERENT.body}
        divider
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TELLUMETRY_DIFFERENT.points.map((p, i) => (
            <TellumetryReveal key={p.title} delay={(i % 4) * 0.05}>
              <TellumetryCard variant="outline" padding="md" className="h-full">
                <h3 className="font-display text-lg font-bold text-[var(--tm-ivory)]">{p.title}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-[var(--tm-slate)]">
                  {p.body}
                </p>
              </TellumetryCard>
            </TellumetryReveal>
          ))}
        </div>
      </TellumetrySection>

      {/* ── 8. Ailiur ecosystem connection ──────────────────────── */}
      <TellumetrySection
        id="ecosystem"
        eyebrow={TELLUMETRY_ECOSYSTEM.eyebrow}
        headline={TELLUMETRY_ECOSYSTEM.headline}
        subhead={TELLUMETRY_ECOSYSTEM.body}
        centered
        divider
      >
        <ul className="grid gap-4 md:grid-cols-3" role="list">
          {TELLUMETRY_ECOSYSTEM.links.map((link, i) => (
            <TellumetryReveal key={link.name} delay={i * 0.05} as="li">
              <SmartLink href={link.href} className="group block h-full">
                <TellumetryCard variant="glass" padding="md" interactive className="h-full">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-[var(--tm-ivory)]">
                      {link.name}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-[var(--tm-slate-dim)] transition-colors group-hover:text-[var(--tm-mint)]" />
                  </div>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-[var(--tm-slate)]">
                    {link.desc}
                  </p>
                </TellumetryCard>
              </SmartLink>
            </TellumetryReveal>
          ))}
        </ul>
      </TellumetrySection>

      {/* ── 9. Waitlist CTA ─────────────────────────────────────── */}
      <TellumetrySection
        id="waitlist"
        eyebrow={TELLUMETRY_WAITLIST.eyebrow}
        headline={TELLUMETRY_WAITLIST.headline}
        subhead={TELLUMETRY_WAITLIST.body}
        centered
        width="narrow"
        divider
      >
        <TellumetryReveal className="mx-auto max-w-xl">
          <TellumetryWaitlist />
        </TellumetryReveal>
      </TellumetrySection>

      {/* ── 10. Feedback CTA ────────────────────────────────────── */}
      <TellumetryFeedback />

      {/* ── 11. Footer ──────────────────────────────────────────── */}
      <TellumetryFooter />
    </>
  );
}

// ─── Local section helpers ─────────────────────────────────────────────────────

function FeatureCard({ feature }: { feature: TellumetryFeature }) {
  const Icon = feature.icon;
  const color = TM_SIGNAL[feature.signal];

  return (
    <TellumetryCard variant="glass" padding="md" interactive className="h-full">
      <span
        className="flex h-11 w-11 items-center justify-center rounded-[var(--tm-radius-sm)] border border-[var(--tm-hairline)] bg-[var(--tm-surface-muted)]"
        style={{ color }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </span>
      <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-[var(--tm-ivory)]">
        {feature.title}
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--tm-slate)]">
        {feature.body}
      </p>
    </TellumetryCard>
  );
}

function UseCaseCard({ useCase }: { useCase: TellumetryUseCase }) {
  return (
    <TellumetryCard variant="glassStrong" padding="lg" interactive className="h-full">
      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--tm-mint)]">
        {useCase.kicker}
      </span>
      <h3 className={tmCn('mt-3 font-display text-2xl font-bold tracking-tight text-[var(--tm-ivory)]')}>
        {useCase.title}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--tm-slate)]">
        {useCase.body}
      </p>
    </TellumetryCard>
  );
}
