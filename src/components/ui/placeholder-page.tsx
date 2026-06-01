import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { SmartLink } from '@/components/ui/smart-link';

export type PlaceholderContent = {
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
  cta?: { label: string; href: string };
  note?: string;
};

export function makeMetadata(c: PlaceholderContent): Metadata {
  return {
    title: `${c.title} — Ailiur`,
    description: c.description,
  };
}

/**
 * Shared scaffold for the marketing site's stub routes. Static (server)
 * component for performance — the global nav/footer come from the layout.
 */
export function PlaceholderPage({ eyebrow, title, description, bullets, cta, note }: PlaceholderContent) {
  return (
    <main className="relative mx-auto flex min-h-[80vh] w-full max-w-4xl flex-col items-center px-4 pb-24 pt-40 text-center">
      <span className="glass-strong mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/70">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
        {eyebrow}
      </span>

      <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.04] tracking-tight text-foreground">
        {title}
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70">{description}</p>

      {bullets && bullets.length > 0 && (
        <ul className="glass mt-10 w-full max-w-2xl space-y-3 rounded-[var(--radius-card)] p-8 text-left">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-[15px] text-foreground/80">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-red" />
              {b}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <SmartLink
          href={cta?.href ?? '/'}
          className="group inline-flex items-center gap-2 rounded-full bg-accent-green px-6 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
        >
          {cta?.label ?? 'Back to home'}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </SmartLink>
        <SmartLink
          href="/"
          className="glass-strong inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
        >
          Explore the ecosystem
        </SmartLink>
      </div>

      <p className="mt-10 text-xs uppercase tracking-widest text-foreground/45">
        {note ?? 'Page in progress — full experience coming soon'}
      </p>
    </main>
  );
}
