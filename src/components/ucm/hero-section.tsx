import { ArrowRight, Play } from 'lucide-react';
import { UCM_HERO } from '@/lib/ucm/content';
import { UcmButton } from './button';
import { UcmReveal } from './scroll-reveal';
import { MeshVisual } from './mesh-visual';
import { ucmCn } from './utils';

/**
 * Premium hero — editorial type on warm ink, the converging mesh visual, and
 * the two primary calls to action.
 */
export function UcmHeroSection() {
  return (
    <section
      aria-labelledby="ucm-hero-heading"
      className={ucmCn('relative w-full overflow-hidden px-4', 'pb-20 pt-10 sm:pb-28 sm:pt-14')}
    >
      <HeroMeshBackdrop />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
        <UcmReveal className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-[var(--ucm-radius-pill)] border border-[var(--ucm-border)] bg-[var(--ucm-glass-bg)] px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-[var(--ucm-gold)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--ucm-gold)]" aria-hidden />
            {UCM_HERO.eyebrow}
          </span>
          <p className="mt-6 font-display text-lg font-bold tracking-tight text-[var(--ucm-gold-soft)] sm:text-xl">
            {UCM_HERO.lead}
          </p>
          <h1
            id="ucm-hero-heading"
            className="mt-2 font-display text-[var(--ucm-text-display)] font-extrabold leading-[1.02] tracking-tight text-[var(--ucm-cream)]"
          >
            {UCM_HERO.headline}
          </h1>
          <p className="mt-5 max-w-lg text-[length:var(--ucm-text-body)] leading-relaxed text-[var(--ucm-cream-soft)]">
            {UCM_HERO.body}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <UcmButton
              href={UCM_HERO.primaryCta.href}
              size="lg"
              icon={<Play className="h-4 w-4" />}
              iconPosition="start"
            >
              {UCM_HERO.primaryCta.label}
            </UcmButton>
            <UcmButton
              href={UCM_HERO.secondaryCta.href}
              size="lg"
              variant="secondary"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              {UCM_HERO.secondaryCta.label}
            </UcmButton>
          </div>

          {/* Source strip — the histories UCM unifies */}
          <div className="mt-10">
            <p className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[var(--ucm-sand-dim)]">
              Unifies the histories you already have
            </p>
            <ul className="mt-3 flex flex-wrap gap-2" role="list">
              {UCM_HERO.sources.map((source) => (
                <li
                  key={source}
                  className="rounded-[var(--ucm-radius-pill)] border border-[var(--ucm-border)] bg-[var(--ucm-glass-bg)] px-3 py-1 text-[0.75rem] font-medium text-[var(--ucm-sand)]"
                >
                  {source}
                </li>
              ))}
            </ul>
          </div>
        </UcmReveal>

        <UcmReveal delay={0.08} className="w-full lg:max-w-none">
          <MeshVisual />
        </UcmReveal>
      </div>
    </section>
  );
}

/**
 * Decorative vector-mesh backdrop — a faint constellation of nodes and links
 * that hints at the semantic graph beneath UCM. Pure inline SVG (no assets),
 * masked to fade out so it never competes with the copy.
 */
function HeroMeshBackdrop() {
  const nodes = [
    [60, 70], [180, 40], [150, 150], [280, 110], [40, 200],
    [330, 210], [240, 250], [120, 280], [360, 80], [300, 320],
  ];
  const links: [number, number][] = [
    [0, 1], [0, 2], [1, 3], [2, 3], [2, 7], [3, 6], [4, 2],
    [6, 5], [6, 9], [3, 8], [7, 4], [6, 7],
  ];

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_30%,black,transparent_75%)]"
      aria-hidden
    >
      <svg
        className="absolute right-[-4%] top-[-6%] h-[120%] w-[70%] opacity-[0.5]"
        viewBox="0 0 400 360"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <g stroke="var(--ucm-gold)" strokeOpacity="0.18" strokeWidth="1">
          {links.map(([a, b], i) => (
            <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
          ))}
        </g>
        <g fill="var(--ucm-gold)">
          {nodes.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.6 : 1.6} fillOpacity={i % 3 === 0 ? 0.55 : 0.3} />
          ))}
        </g>
      </svg>
    </div>
  );
}
