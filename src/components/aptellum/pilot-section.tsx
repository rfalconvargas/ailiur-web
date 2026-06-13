import { PILOT_PROGRAM } from '@/lib/aptellum/pilot-section';
import { AptellumBadge } from './badge';
import { AptellumCard } from './card';
import { AptellumMetric } from './metric';
import { AptellumPilotWaitlistForm } from './pilot-waitlist-form';
import { AptellumPill } from './pill';
import { AptellumScrollReveal } from './scroll-reveal';
import { AptellumSection } from './section';
import { apCn } from './utils';

/**
 * Pilot Program — structure, participants, outcomes, and waitlist.
 * Actionable early-pilot framing without overpromising.
 */
export function AptellumPilotSection() {
  const { eyebrow, headline, body, weeks, participants, outcomes } = PILOT_PROGRAM;

  return (
    <AptellumSection id="pilot" eyebrow={eyebrow} headline={headline} badgeVariant="gold" width="wide" divider>
      <AptellumScrollReveal className="mx-auto max-w-3xl">
        <p className="text-center text-[length:var(--ap-text-body)] leading-relaxed text-[var(--ap-graphite)]">
          {body}
        </p>
      </AptellumScrollReveal>

      <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
        {/* 4-week structure */}
        <AptellumScrollReveal className="lg:col-span-5">
          <AptellumCard variant="editorial" padding="lg" className="h-full">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ap-graphite)]">
              Pilot structure
            </p>
            <ol className="relative mt-6 space-y-0" role="list">
              {weeks.map((w, i) => (
                <li key={w.week} className="relative flex gap-4 pb-8 last:pb-0">
                  {i < weeks.length - 1 && (
                    <span
                      className="absolute left-[1.125rem] top-10 bottom-0 w-px bg-[var(--ap-border-strong)]"
                      aria-hidden
                    />
                  )}
                  <span
                    className={apCn(
                      'relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full',
                      'border border-[var(--ap-border-strong)] bg-[var(--ap-surface)]',
                      'font-mono text-xs font-semibold tabular-nums text-[var(--ap-ink)]',
                    )}
                  >
                    {w.week}
                  </span>
                  <div className="pt-1.5">
                    <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--ap-graphite-light)]">
                      Week {w.week}
                    </p>
                    <p className="mt-1 text-[0.9375rem] font-medium leading-snug text-[var(--ap-ink)]">
                      {w.title}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </AptellumCard>
        </AptellumScrollReveal>

        {/* Participants + outcomes */}
        <div className="grid gap-6 lg:col-span-7">
          <AptellumScrollReveal delay={0.05}>
            <AptellumCard variant="default" padding="md">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ap-graphite)]">
                Pilot participants
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {participants.map((p) => (
                  <AptellumMetric
                    key={p.label}
                    value={p.count}
                    label={p.label}
                    accent="gold"
                  />
                ))}
              </div>
            </AptellumCard>
          </AptellumScrollReveal>

          <AptellumScrollReveal delay={0.08}>
            <AptellumCard variant="muted" padding="md">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ap-graphite)]">
                Intended outcomes
              </p>
              <p className="mt-2 text-sm text-[var(--ap-graphite)]">
                What students work toward — not guaranteed results, but the studio&apos;s design target.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2" role="list">
                {outcomes.map((o) => (
                  <li key={o}>
                    <AptellumPill variant="gold" size="md">
                      {o}
                    </AptellumPill>
                  </li>
                ))}
              </ul>
            </AptellumCard>
          </AptellumScrollReveal>
        </div>
      </div>

      {/* Waitlist */}
      <AptellumScrollReveal className="mt-14">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 flex justify-center">
            <AptellumBadge variant="mist" dotColor="mist">
              Pilot waitlist
            </AptellumBadge>
          </div>
          <AptellumPilotWaitlistForm />
        </div>
      </AptellumScrollReveal>
    </AptellumSection>
  );
}
