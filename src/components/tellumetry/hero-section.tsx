import { ArrowRight, Play } from 'lucide-react';
import { TELLUMETRY_HERO } from '@/lib/tellumetry/content';
import { TellumetryButton } from './button';
import { TellumetryReveal } from './scroll-reveal';
import { CockpitPanel } from './cockpit-panel';
import { tmCn } from './utils';

const TOOLS = ['Claude Code', 'Cursor', 'Warp', 'GitHub', 'Vercel'] as const;

/**
 * Premium hero — editorial type on cool ink, the Agent Cockpit panel, and the
 * two primary calls to action.
 */
export function TellumetryHeroSection() {
  return (
    <section
      aria-labelledby="tellumetry-hero-heading"
      className={tmCn('relative w-full px-4', 'pb-20 pt-10 sm:pb-28 sm:pt-14')}
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
        <TellumetryReveal className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-[var(--tm-radius-pill)] border border-[var(--tm-border)] bg-[var(--tm-glass-bg)] px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[var(--tm-mint)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--tm-mint)]" aria-hidden />
            {TELLUMETRY_HERO.eyebrow}
          </span>
          <h1
            id="tellumetry-hero-heading"
            className="mt-6 font-display text-[var(--tm-text-display)] font-extrabold leading-[1.02] tracking-tight text-[var(--tm-ivory)]"
          >
            {TELLUMETRY_HERO.headline}
          </h1>
          <p className="mt-5 max-w-lg font-display text-xl font-semibold leading-snug text-[var(--tm-ivory-soft)] sm:text-2xl">
            {TELLUMETRY_HERO.promise}
          </p>
          <p className="mt-4 max-w-lg text-[length:var(--tm-text-body)] leading-relaxed text-[var(--tm-slate)]">
            {TELLUMETRY_HERO.body}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TellumetryButton
              href={TELLUMETRY_HERO.primaryCta.href}
              size="lg"
              icon={<Play className="h-4 w-4" />}
              iconPosition="start"
              className="w-full sm:w-auto"
            >
              {TELLUMETRY_HERO.primaryCta.label}
            </TellumetryButton>
            <TellumetryButton
              href={TELLUMETRY_HERO.secondaryCta.href}
              size="lg"
              variant="secondary"
              icon={<ArrowRight className="h-4 w-4" />}
              className="w-full sm:w-auto"
            >
              {TELLUMETRY_HERO.secondaryCta.label}
            </TellumetryButton>
          </div>

          {/* Tool strip — the layer Tellumetry sits around */}
          <div className="mt-10">
            <p className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[var(--tm-slate-dim)]">
              Sits around the tools you already use
            </p>
            <ul className="mt-3 flex flex-wrap gap-2" role="list">
              {TOOLS.map((tool) => (
                <li
                  key={tool}
                  className="rounded-[var(--tm-radius-pill)] border border-[var(--tm-border)] bg-[var(--tm-glass-bg)] px-3 py-1 text-[0.75rem] font-medium text-[var(--tm-slate)]"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        </TellumetryReveal>

        <TellumetryReveal delay={0.08} className="w-full lg:max-w-none">
          <CockpitPanel />
        </TellumetryReveal>
      </div>
    </section>
  );
}
