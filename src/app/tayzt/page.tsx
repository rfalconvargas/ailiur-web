import { ArrowUpRight } from 'lucide-react';
import {
  TAYZT_DEMO,
  TAYZT_DIFFERENT,
  TAYZT_ECOSYSTEM,
  TAYZT_EXPLANATION,
  TAYZT_FEATURES,
  TAYZT_PROBLEM,
  TAYZT_USE_CASES,
  TAYZT_WAITLIST,
  type TayztFeature,
  type TayztUseCase,
} from '@/lib/tayzt/content';
import {
  TayztAtmosphereLab,
  TayztButton,
  TayztCard,
  TayztFooter,
  TayztHeroSection,
  TayztReveal,
  TayztSection,
  TayztWaitlist,
  TZ_SIGNAL,
  tzCn,
} from '@/components/tayzt';
import { SmartLink } from '@/components/ui/smart-link';

export default function TayztPage() {
  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <TayztHeroSection />

      {/* ── 2. Short product explanation ────────────────────────── */}
      <TayztSection
        id="explanation"
        eyebrow={TAYZT_EXPLANATION.eyebrow}
        headline={TAYZT_EXPLANATION.headline}
        subhead={TAYZT_EXPLANATION.body}
        centered
        divider
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {TAYZT_EXPLANATION.points.map((p, i) => (
            <TayztReveal key={p.title} delay={i * 0.05} as="div">
              <TayztCard variant="glass" padding="md" interactive className="h-full">
                <span className="font-display text-sm font-bold text-[var(--tz-gold)]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-[var(--tz-cream)]">
                  {p.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--tz-graphite)]">
                  {p.body}
                </p>
              </TayztCard>
            </TayztReveal>
          ))}
        </div>
      </TayztSection>

      {/* ── 3. User problem ─────────────────────────────────────── */}
      <TayztSection
        id="problem"
        eyebrow={TAYZT_PROBLEM.eyebrow}
        headline={TAYZT_PROBLEM.headline}
        divider
      >
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <TayztReveal>
            <p className="text-[length:var(--tz-text-body)] leading-relaxed text-[var(--tz-graphite)]">
              {TAYZT_PROBLEM.body}
            </p>
          </TayztReveal>
          <TayztReveal delay={0.06}>
            <ul className="space-y-3" role="list">
              {TAYZT_PROBLEM.friction.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-3 rounded-[var(--tz-radius-md)] border border-[var(--tz-hairline)] bg-[var(--tz-surface-muted)] px-4 py-3"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--tz-red)]" aria-hidden />
                  <span className="text-[0.9375rem] leading-relaxed text-[var(--tz-cream-soft)]">{f}</span>
                </li>
              ))}
            </ul>
          </TayztReveal>
        </div>
      </TayztSection>

      {/* ── 4. Interactive demo placeholder ─────────────────────── */}
      <TayztSection
        id="atmosphere-lab"
        eyebrow={TAYZT_DEMO.eyebrow}
        headline={TAYZT_DEMO.headline}
        subhead={TAYZT_DEMO.body}
        centered
        width="wide"
        divider
      >
        <TayztReveal>
          <TayztAtmosphereLab />
        </TayztReveal>
      </TayztSection>

      {/* ── 5. Core features ────────────────────────────────────── */}
      <TayztSection
        id="features"
        eyebrow={TAYZT_FEATURES.eyebrow}
        headline={TAYZT_FEATURES.headline}
        subhead={TAYZT_FEATURES.subhead}
        centered
        divider
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {TAYZT_FEATURES.items.map((feature, i) => (
            <TayztReveal key={feature.title} delay={(i % 3) * 0.05} as="li">
              <FeatureCard feature={feature} />
            </TayztReveal>
          ))}
        </ul>
      </TayztSection>

      {/* ── 6. Example use cases ────────────────────────────────── */}
      <TayztSection
        id="use-cases"
        eyebrow={TAYZT_USE_CASES.eyebrow}
        headline={TAYZT_USE_CASES.headline}
        centered
        divider
      >
        <ul className="grid gap-4 sm:grid-cols-2" role="list">
          {TAYZT_USE_CASES.items.map((useCase, i) => (
            <TayztReveal key={useCase.title} delay={(i % 2) * 0.05} as="li">
              <UseCaseCard useCase={useCase} />
            </TayztReveal>
          ))}
        </ul>
      </TayztSection>

      {/* ── 7. Why this is different ────────────────────────────── */}
      <TayztSection
        id="different"
        eyebrow={TAYZT_DIFFERENT.eyebrow}
        headline={TAYZT_DIFFERENT.headline}
        subhead={TAYZT_DIFFERENT.body}
        divider
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TAYZT_DIFFERENT.points.map((p, i) => (
            <TayztReveal key={p.title} delay={(i % 4) * 0.05}>
              <TayztCard variant="outline" padding="md" className="h-full">
                <h3 className="font-display text-lg font-bold text-[var(--tz-cream)]">{p.title}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-[var(--tz-graphite)]">
                  {p.body}
                </p>
              </TayztCard>
            </TayztReveal>
          ))}
        </div>
      </TayztSection>

      {/* ── 8. Ailiur ecosystem connection ──────────────────────── */}
      <TayztSection
        id="ecosystem"
        eyebrow={TAYZT_ECOSYSTEM.eyebrow}
        headline={TAYZT_ECOSYSTEM.headline}
        subhead={TAYZT_ECOSYSTEM.body}
        centered
        divider
      >
        <ul className="grid gap-4 md:grid-cols-3" role="list">
          {TAYZT_ECOSYSTEM.links.map((link, i) => (
            <TayztReveal key={link.name} delay={i * 0.05} as="li">
              <SmartLink href={link.href} className="group block h-full">
                <TayztCard variant="glass" padding="md" interactive className="h-full">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-[var(--tz-cream)]">
                      {link.name}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-[var(--tz-graphite-dim)] transition-colors group-hover:text-[var(--tz-gold)]" />
                  </div>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-[var(--tz-graphite)]">
                    {link.desc}
                  </p>
                </TayztCard>
              </SmartLink>
            </TayztReveal>
          ))}
        </ul>
      </TayztSection>

      {/* ── 9. Waitlist CTA ─────────────────────────────────────── */}
      <TayztSection
        id="waitlist"
        eyebrow={TAYZT_WAITLIST.eyebrow}
        headline={TAYZT_WAITLIST.headline}
        subhead={TAYZT_WAITLIST.body}
        centered
        width="narrow"
        divider
      >
        <TayztReveal className="mx-auto max-w-xl">
          <TayztWaitlist />
        </TayztReveal>
      </TayztSection>

      {/* ── 10. Footer ──────────────────────────────────────────── */}
      <TayztFooter />
    </>
  );
}

// ─── Local section helpers ─────────────────────────────────────────────────────

function FeatureCard({ feature }: { feature: TayztFeature }) {
  const Icon = feature.icon;
  const color = TZ_SIGNAL[feature.signal];

  return (
    <TayztCard variant="glass" padding="md" interactive className="h-full">
      <span
        className="flex h-11 w-11 items-center justify-center rounded-[var(--tz-radius-sm)] border border-[var(--tz-hairline)] bg-[var(--tz-surface-muted)]"
        style={{ color }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </span>
      <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-[var(--tz-cream)]">
        {feature.title}
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--tz-graphite)]">
        {feature.body}
      </p>
    </TayztCard>
  );
}

function UseCaseCard({ useCase }: { useCase: TayztUseCase }) {
  return (
    <TayztCard variant="glassStrong" padding="lg" interactive className="h-full">
      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--tz-gold)]">
        {useCase.kicker}
      </span>
      <h3 className={tzCn('mt-3 font-display text-2xl font-bold tracking-tight text-[var(--tz-cream)]')}>
        {useCase.title}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--tz-graphite)]">
        {useCase.body}
      </p>
    </TayztCard>
  );
}
