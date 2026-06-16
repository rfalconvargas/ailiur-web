import type { ReactNode } from 'react';
import { OlluneReveal } from './reveal';
import { olCn } from './utils';

export function OlluneEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="ol-glass inline-flex items-center gap-2 rounded-[var(--ol-radius-pill)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ol-silver)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--ol-green)] shadow-[0_0_8px_var(--ol-green)]" />
      {children}
    </span>
  );
}

type OlluneSectionProps = {
  id?: string;
  eyebrow?: string;
  headline: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  centered?: boolean;
  className?: string;
};

/** Consistent section scaffold: eyebrow, display headline, optional intro. */
export function OlluneSection({
  id,
  eyebrow,
  headline,
  intro,
  children,
  centered,
  className,
}: OlluneSectionProps) {
  return (
    <section
      id={id}
      className={olCn(
        'mx-auto w-full max-w-[var(--ol-content-max)] px-4 py-[var(--ol-section-y)]',
        className,
      )}
    >
      <OlluneReveal
        className={olCn('max-w-2xl', centered && 'mx-auto text-center')}
      >
        {eyebrow && <OlluneEyebrow>{eyebrow}</OlluneEyebrow>}
        <h2 className="mt-5 font-display text-[length:var(--ol-text-h1)] font-extrabold leading-[1.08] tracking-tight text-[var(--ol-cream)]">
          {headline}
        </h2>
        {intro && (
          <p className="mt-5 text-[length:var(--ol-text-body)] leading-relaxed text-[var(--ol-silver)]">
            {intro}
          </p>
        )}
      </OlluneReveal>
      {children}
    </section>
  );
}
