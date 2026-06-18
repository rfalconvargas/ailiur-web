import { ArrowUpRight, Check } from 'lucide-react';
import {
  UCM_DEMO,
  UCM_DIFFERENT,
  UCM_ECOSYSTEM,
  UCM_EXPLANATION,
  UCM_FEATURES,
  UCM_PROBLEM,
  UCM_USE_CASES,
  UCM_WAITLIST,
  type UcmFeature,
  type UcmUseCase,
} from '@/lib/ucm/content';
import {
  ContextPacketBuilder,
  UcmCard,
  UcmFooter,
  UcmHeroSection,
  UcmReveal,
  UcmSection,
  UcmWaitlist,
  UcmFeedback,
  UCM_SIGNAL,
  ucmCn,
} from '@/components/ucm';
import { SmartLink } from '@/components/ui/smart-link';

export default function UcmPage() {
  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <UcmHeroSection />

      {/* ── 2. Short explanation: Import → Embed → Retrieve ─────── */}
      <UcmSection
        id="explanation"
        eyebrow={UCM_EXPLANATION.eyebrow}
        headline={UCM_EXPLANATION.headline}
        subhead={UCM_EXPLANATION.body}
        centered
        divider
      >
        <ol className="grid gap-4 md:grid-cols-3" role="list">
          {UCM_EXPLANATION.steps.map((step, i) => (
            <UcmReveal key={step.title} delay={i * 0.06} as="li">
              <UcmCard variant="glass" padding="md" interactive className="h-full">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold text-[var(--ucm-gold)]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: UCM_SIGNAL[step.signal] }}
                    aria-hidden
                  />
                </div>
                <h3 className="mt-3 font-display text-xl font-bold text-[var(--ucm-cream)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--ucm-sand)]">
                  {step.body}
                </p>
              </UcmCard>
            </UcmReveal>
          ))}
        </ol>
      </UcmSection>

      {/* ── 3. Problem: trapped context ─────────────────────────── */}
      <UcmSection
        id="problem"
        eyebrow={UCM_PROBLEM.eyebrow}
        headline={UCM_PROBLEM.headline}
        divider
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <UcmReveal>
            <p className="text-[length:var(--ucm-text-body)] leading-relaxed text-[var(--ucm-sand)]">
              {UCM_PROBLEM.body}
            </p>
            {/* Three silos */}
            <ul className="mt-7 grid gap-3 sm:grid-cols-3" role="list">
              {UCM_PROBLEM.silos.map((silo) => (
                <li
                  key={silo.name}
                  className="rounded-[var(--ucm-radius-md)] border border-[var(--ucm-hairline)] bg-[var(--ucm-surface-muted)] p-4"
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: UCM_SIGNAL[silo.signal] }}
                      aria-hidden
                    />
                    <span className="text-[0.9375rem] font-semibold text-[var(--ucm-cream)]">
                      {silo.name}
                    </span>
                  </span>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-[var(--ucm-sand)]">
                    {silo.blurb}
                  </p>
                </li>
              ))}
            </ul>
          </UcmReveal>

          {/* Pains */}
          <UcmReveal delay={0.06}>
            <ul className="space-y-3" role="list">
              {UCM_PROBLEM.pains.map((pain) => (
                <li
                  key={pain}
                  className="flex items-start gap-3 rounded-[var(--ucm-radius-md)] border border-[var(--ucm-hairline)] bg-[var(--ucm-surface-muted)] px-4 py-3"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ucm-red)]"
                    aria-hidden
                  />
                  <span className="text-[0.9375rem] leading-relaxed text-[var(--ucm-cream-soft)]">
                    {pain}
                  </span>
                </li>
              ))}
            </ul>
          </UcmReveal>
        </div>
      </UcmSection>

      {/* ── 4. Interactive demo: Context Packet Builder ─────────── */}
      <UcmSection
        id="demo"
        eyebrow={UCM_DEMO.eyebrow}
        headline={UCM_DEMO.headline}
        subhead={UCM_DEMO.body}
        centered
        width="wide"
        divider
      >
        <UcmReveal>
          <ContextPacketBuilder />
        </UcmReveal>
      </UcmSection>

      {/* ── 5. Core features ────────────────────────────────────── */}
      <UcmSection
        id="features"
        eyebrow={UCM_FEATURES.eyebrow}
        headline={UCM_FEATURES.headline}
        subhead={UCM_FEATURES.subhead}
        centered
        divider
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {UCM_FEATURES.items.map((feature, i) => (
            <UcmReveal key={feature.title} delay={(i % 3) * 0.05} as="li">
              <FeatureCard feature={feature} />
            </UcmReveal>
          ))}
        </ul>
      </UcmSection>

      {/* ── 6. Use cases across the ecosystem ───────────────────── */}
      <UcmSection
        id="use-cases"
        eyebrow={UCM_USE_CASES.eyebrow}
        headline={UCM_USE_CASES.headline}
        subhead={UCM_USE_CASES.body}
        centered
        divider
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
          {UCM_USE_CASES.items.map((useCase, i) => (
            <UcmReveal key={useCase.name} delay={(i % 3) * 0.05} as="li">
              <UseCaseCard useCase={useCase} />
            </UcmReveal>
          ))}
        </ul>
      </UcmSection>

      {/* ── 7. Why this is different — comparison table ─────────── */}
      <UcmSection
        id="different"
        eyebrow={UCM_DIFFERENT.eyebrow}
        headline={UCM_DIFFERENT.headline}
        subhead={UCM_DIFFERENT.body}
        centered
        divider
      >
        <UcmReveal>
          <ComparisonTable />
        </UcmReveal>
      </UcmSection>

      {/* ── 8. Ailiur ecosystem connection ──────────────────────── */}
      <UcmSection
        id="ecosystem"
        eyebrow={UCM_ECOSYSTEM.eyebrow}
        headline={UCM_ECOSYSTEM.headline}
        subhead={UCM_ECOSYSTEM.body}
        centered
        divider
      >
        <ul className="grid gap-4 md:grid-cols-3" role="list">
          {UCM_ECOSYSTEM.links.map((link, i) => (
            <UcmReveal key={link.name} delay={i * 0.05} as="li">
              <SmartLink href={link.href} className="group block h-full">
                <UcmCard variant="glass" padding="md" interactive className="h-full">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-[var(--ucm-cream)]">
                      {link.name}
                    </h3>
                    <ArrowUpRight className="h-4 w-4 text-[var(--ucm-sand-dim)] transition-colors group-hover:text-[var(--ucm-gold)]" />
                  </div>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-[var(--ucm-sand)]">
                    {link.desc}
                  </p>
                </UcmCard>
              </SmartLink>
            </UcmReveal>
          ))}
        </ul>
      </UcmSection>

      {/* ── 9. Waitlist CTA ─────────────────────────────────────── */}
      <UcmSection
        id="waitlist"
        eyebrow={UCM_WAITLIST.eyebrow}
        headline={UCM_WAITLIST.headline}
        subhead={UCM_WAITLIST.body}
        centered
        width="narrow"
        divider
      >
        <UcmReveal className="mx-auto max-w-xl">
          <UcmWaitlist />
        </UcmReveal>
      </UcmSection>

      {/* ── 10. Feedback CTA ────────────────────────────────────── */}
      <UcmFeedback />

      {/* ── 11. Footer ──────────────────────────────────────────── */}
      <UcmFooter />
    </>
  );
}

// ─── Local section helpers ─────────────────────────────────────────────────────

function FeatureCard({ feature }: { feature: UcmFeature }) {
  const Icon = feature.icon;
  const color = UCM_SIGNAL[feature.signal];

  return (
    <UcmCard variant="glass" padding="md" interactive className="h-full">
      <span
        className="flex h-11 w-11 items-center justify-center rounded-[var(--ucm-radius-sm)] border border-[var(--ucm-hairline)] bg-[var(--ucm-surface-muted)]"
        style={{ color }}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </span>
      <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-[var(--ucm-cream)]">
        {feature.title}
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-[var(--ucm-sand)]">
        {feature.body}
      </p>
    </UcmCard>
  );
}

function UseCaseCard({ useCase }: { useCase: UcmUseCase }) {
  return (
    <UcmCard variant="glassStrong" padding="lg" interactive className="h-full">
      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--ucm-gold)]">
        {useCase.kicker}
      </span>
      <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[var(--ucm-cream)]">
        {useCase.name}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--ucm-sand)]">
        {useCase.body}
      </p>
    </UcmCard>
  );
}

function ComparisonTable() {
  const { columns, rows, highlightIndex } = UCM_DIFFERENT;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[40rem] border-separate border-spacing-0 text-left">
        <caption className="sr-only">
          Comparison of manual notes, platform memory, and Unified Context Mesh
        </caption>
        <thead>
          <tr>
            <th scope="col" className="w-[22%] px-4 py-4" />
            {columns.map((col, i) => {
              const highlight = i === highlightIndex;
              return (
                <th
                  key={col}
                  scope="col"
                  className={ucmCn(
                    'px-4 py-4 align-bottom',
                    highlight
                      ? 'rounded-t-[var(--ucm-radius-md)] border-x border-t border-[color-mix(in_srgb,var(--ucm-gold)_40%,var(--ucm-border))] bg-[color-mix(in_srgb,var(--ucm-gold)_8%,transparent)]'
                      : '',
                  )}
                >
                  <span
                    className={ucmCn(
                      'font-display text-base font-bold tracking-tight',
                      highlight ? 'text-[var(--ucm-gold)]' : 'text-[var(--ucm-cream-soft)]',
                    )}
                  >
                    {col}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => {
            const isLast = r === rows.length - 1;
            return (
              <tr key={row.label}>
                <th
                  scope="row"
                  className="border-t border-[var(--ucm-hairline)] px-4 py-4 text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-[var(--ucm-sand-dim)]"
                >
                  {row.label}
                </th>
                {row.values.map((value, c) => {
                  const highlight = c === highlightIndex;
                  return (
                    <td
                      key={`${row.label}-${c}`}
                      className={ucmCn(
                        'border-t border-[var(--ucm-hairline)] px-4 py-4 text-[0.9375rem] leading-relaxed',
                        highlight
                          ? 'border-x border-[color-mix(in_srgb,var(--ucm-gold)_40%,var(--ucm-border))] bg-[color-mix(in_srgb,var(--ucm-gold)_8%,transparent)] font-medium text-[var(--ucm-cream)]'
                          : 'text-[var(--ucm-sand)]',
                        highlight && isLast && 'rounded-b-[var(--ucm-radius-md)] border-b',
                      )}
                    >
                      <span className="flex items-start gap-2">
                        {highlight && (
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--ucm-gold)]"
                            aria-hidden
                          />
                        )}
                        <span>{value}</span>
                      </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
