import { ArrowRight } from 'lucide-react';
import {
  PAGE_FINAL_CTA,
  PAGE_LOOP,
  PAGE_PROBLEM,
  PAGE_TOOLS,
} from '@/lib/aptellum/page-content';
import {
  AptellumButton,
  AptellumBriefGenerator,
  AptellumPortfolioScore,
  AptellumOutreachStudio,
  AptellumFluencySection,
  AptellumCoopTracksSection,
  AptellumFeedback,
  AptellumPilotSection,
  AptellumCard,
  AptellumHeroSection,
  AptellumScrollReveal,
  AptellumSection,
  AptellumToolsStudio,
  AptellumTrustStrip,
  apCn,
} from '@/components/aptellum';

export default function AptellumPage() {
  return (
    <>
      <AptellumHeroSection />

      {/* ── Problem ──────────────────────────────────────────── */}
      <AptellumSection
        id="problem"
        eyebrow={PAGE_PROBLEM.eyebrow}
        headline={PAGE_PROBLEM.headline}
        centered
        divider
      >
        <AptellumScrollReveal className="mx-auto max-w-3xl text-center">
          <p className="text-[length:var(--ap-text-body)] leading-relaxed text-[var(--ap-graphite)]">
            {PAGE_PROBLEM.body}
          </p>
        </AptellumScrollReveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <AptellumScrollReveal>
            <ComparisonPath
              variant="before"
              label={PAGE_PROBLEM.before.label}
              steps={PAGE_PROBLEM.before.steps}
            />
          </AptellumScrollReveal>
          <AptellumScrollReveal delay={0.06}>
            <ComparisonPath
              variant="after"
              label={PAGE_PROBLEM.after.label}
              steps={PAGE_PROBLEM.after.steps}
            />
          </AptellumScrollReveal>
        </div>
      </AptellumSection>

      {/* ── Aptellum Loop ─────────────────────────────────────── */}
      <AptellumSection
        id="studio"
        eyebrow={PAGE_LOOP.eyebrow}
        headline={PAGE_LOOP.headline}
        subhead={PAGE_LOOP.subhead}
        centered
        badgeVariant="gold"
        divider
      >
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" role="list">
          {PAGE_LOOP.steps.map((step, i) => (
            <AptellumScrollReveal key={step.title} delay={i * 0.05} as="li">
              <LoopStepCard step={step} />
            </AptellumScrollReveal>
          ))}
        </ol>
      </AptellumSection>

      {/* ── Tools ──────────────────────────────────────────────── */}
      <AptellumSection
        id="tools"
        eyebrow={PAGE_TOOLS.eyebrow}
        headline={PAGE_TOOLS.headline}
        subhead={PAGE_TOOLS.subhead}
        centered
        divider
      >
        <ul className="grid gap-4 md:grid-cols-3" role="list">
          {PAGE_TOOLS.items.map((tool, i) => (
            <AptellumScrollReveal key={tool.title} delay={i * 0.04} as="li">
              <AptellumCard as="article" variant="elevated" padding="md" interactive className="h-full">
                <h3 className="font-display text-xl font-bold tracking-tight text-[var(--ap-ink)]">
                  {tool.title}
                </h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <ToolRow term="For" value={tool.forWhom} />
                  <ToolRow term="Produces" value={tool.produces} />
                  <ToolRow term="Why it matters" value={tool.whyItMatters} highlight />
                </dl>
              </AptellumCard>
            </AptellumScrollReveal>
          ))}
        </ul>

        <div className="mt-16 sm:mt-20">
          <AptellumScrollReveal>
            <p className="mx-auto mb-10 max-w-2xl text-center text-[0.9375rem] leading-relaxed text-[var(--ap-graphite)]">
              Three studio tools, one preparation layer. Generate a brief, score your portfolio, and draft outreach — all on-page, no account required.
            </p>
          </AptellumScrollReveal>
          <AptellumToolsStudio
            briefGenerator={<AptellumBriefGenerator />}
            portfolioScore={<AptellumPortfolioScore />}
            outreachStudio={<AptellumOutreachStudio />}
          />
        </div>
      </AptellumSection>

      {/* ── AI Fluency architecture ──────────────────────────── */}
      <AptellumFluencySection />

      {/* ── Creative Co-op Tracks ──────────────────────────────── */}
      <AptellumCoopTracksSection />

      {/* ── Pilot Program ──────────────────────────────────────── */}
      <AptellumPilotSection />

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <AptellumSection density="subdued" centered width="narrow" divider>
        <AptellumScrollReveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[var(--ap-text-h1)] font-extrabold leading-[1.08] tracking-tight text-[var(--ap-ink)]">
            {PAGE_FINAL_CTA.headline}
          </h2>
          <p className="mt-4 text-[length:var(--ap-text-body)] leading-relaxed text-[var(--ap-graphite)]">
            {PAGE_FINAL_CTA.body}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <AptellumButton href={PAGE_FINAL_CTA.primaryCta.href} size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              {PAGE_FINAL_CTA.primaryCta.label}
            </AptellumButton>
            <AptellumButton href={PAGE_FINAL_CTA.secondaryCta.href} variant="secondary" size="lg">
              {PAGE_FINAL_CTA.secondaryCta.label}
            </AptellumButton>
          </div>
        </AptellumScrollReveal>

        <AptellumTrustStrip className="mx-auto mt-12 max-w-2xl" variant="compact" />

        <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-relaxed text-[var(--ap-graphite)]">
          Aptellum is the creative education layer of Ailiur — a preparation studio, not a job board.
        </p>
      </AptellumSection>

      {/* ── Feedback ───────────────────────────────────────────── */}
      <AptellumFeedback />
    </>
  );
}

// ─── Local section helpers ─────────────────────────────────────────────────────

function ComparisonPath({
  variant,
  label,
  steps,
}: {
  variant: 'before' | 'after';
  label: string;
  steps: readonly string[];
}) {
  const isAfter = variant === 'after';

  return (
    <AptellumCard
      variant={isAfter ? 'editorial' : 'muted'}
      padding="lg"
      interactive={isAfter}
      className={apCn(isAfter && 'ring-1 ring-[color-mix(in_srgb,var(--ap-gold)_25%,transparent)]')}
    >
      <p
        className={apCn(
          'text-xs font-semibold uppercase tracking-[0.14em]',
          isAfter ? 'text-[var(--ap-gold)]' : 'text-[var(--ap-graphite)]',
        )}
      >
        {label}
      </p>
      <ol className="mt-6 space-y-0" role="list">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-3">
            <span
              className={apCn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                isAfter
                  ? 'bg-[var(--ap-ink)] text-[var(--ap-ivory)]'
                  : 'bg-[var(--ap-mist-soft)] text-[var(--ap-graphite)]',
              )}
              aria-hidden
            >
              {i + 1}
            </span>
            <span className="flex-1 py-3 text-[0.9375rem] font-medium text-[var(--ap-ink)]">{step}</span>
            {i < steps.length - 1 && (
              <span className="sr-only">, then</span>
            )}
          </li>
        ))}
      </ol>
    </AptellumCard>
  );
}

function LoopStepCard({
  step,
}: {
  step: (typeof PAGE_LOOP.steps)[number];
}) {
  const Icon = step.icon;

  return (
    <AptellumCard variant="default" padding="sm" interactive className="h-full text-center lg:text-left">
      <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-[var(--ap-radius-sm)] bg-[var(--ap-mist-soft)] text-[var(--ap-ink)] lg:mx-0">
        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </div>
      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--ap-graphite)]">
        Step {step.step}
      </span>
      <h3 className="mt-1 font-display text-lg font-bold text-[var(--ap-ink)]">{step.title}</h3>
      <p className="mt-2 text-[0.8125rem] leading-relaxed text-[var(--ap-graphite)]">{step.body}</p>
    </AptellumCard>
  );
}

function ToolRow({
  term,
  value,
  highlight,
}: {
  term: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <dt className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-[var(--ap-graphite)]">
        {term}
      </dt>
      <dd
        className={apCn(
          'mt-0.5 leading-relaxed text-[var(--ap-ink)]',
          highlight && 'font-medium',
        )}
      >
        {value}
      </dd>
    </div>
  );
}
