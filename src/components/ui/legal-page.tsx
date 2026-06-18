import type { Metadata } from 'next';
import { SUPPORT_EMAIL } from '@/lib/site';
import { SmartLink } from '@/components/ui/smart-link';

export type LegalSection = { heading: string; body: string[] };

export type LegalContent = {
  title: string;
  description: string;
  updated: string; // human-readable date, e.g. "June 2026"
  intro: string;
  sections: LegalSection[];
};

export function makeLegalMetadata(c: LegalContent): Metadata {
  return { title: `${c.title} — Ailiur`, description: c.description };
}

/**
 * Shared layout for the simple, plain-language policy pages (Terms, Privacy,
 * Refund). These are clear, honest placeholders — NOT legal advice — meant to
 * be replaced with lawyer-reviewed versions before scaling.
 */
export function LegalPage({ title, updated, intro, sections }: LegalContent) {
  return (
    <main className="relative mx-auto w-full max-w-3xl px-4 pt-28 pb-24">
      <span className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
        Legal
      </span>
      <h1 className="mt-3 font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.08] tracking-tight text-foreground">
        {title}
      </h1>
      <p className="mt-2 text-sm text-foreground/45">Last updated: {updated}</p>

      <div className="glass-strong mt-8 rounded-[var(--radius-panel)] p-7 sm:p-9">
        <p className="text-[15px] leading-relaxed text-foreground/75">{intro}</p>

        {sections.map((s) => (
          <section key={s.heading} className="mt-7">
            <h2 className="font-display text-lg font-extrabold tracking-tight text-foreground">
              {s.heading}
            </h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-2 text-[15px] leading-relaxed text-foreground/70">
                {p}
              </p>
            ))}
          </section>
        ))}

        <p className="mt-8 rounded-[var(--radius-card)] border border-foreground/10 bg-[var(--glass-bg-strong)] px-4 py-3 text-sm text-foreground/60">
          This is a plain-language summary provided for transparency during early development and is
          not legal advice. Questions? Email{' '}
          <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-foreground/80 hover:underline">
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-foreground/55">
        <SmartLink href="/terms" className="hover:text-foreground">Terms</SmartLink>
        <SmartLink href="/privacy" className="hover:text-foreground">Privacy</SmartLink>
        <SmartLink href="/refund" className="hover:text-foreground">Refund Policy</SmartLink>
        <SmartLink href="/contact" className="hover:text-foreground">Contact</SmartLink>
      </div>
    </main>
  );
}
