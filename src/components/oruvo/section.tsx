import type { ReactNode } from 'react';
import { MousePointerClick } from 'lucide-react';
import { OruvoReveal } from './reveal';
import { orCn } from './utils';

export function OruvoEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="or-glass inline-flex items-center gap-2 rounded-[var(--or-radius-pill)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--or-slate)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--or-gold)] shadow-[0_0_8px_var(--or-gold-soft)]" />
      {children}
    </span>
  );
}

/** Small "this is interactive" affordance pill — used near each live demo. */
export function OruvoHint({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-[var(--or-radius-pill)] bg-[var(--or-gold-tint)] px-3 py-1.5 text-xs font-semibold text-[var(--or-gold-deep)]">
      <MousePointerClick className="h-3.5 w-3.5" aria-hidden />
      {children}
    </span>
  );
}

type OruvoSectionProps = {
  id?: string;
  eyebrow?: string;
  headline: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  centered?: boolean;
  className?: string;
};

/**
 * Consistent section scaffold: eyebrow, display headline, optional intro.
 * Reused by every Oruvo section (the required `Section` component).
 */
export function OruvoSection({
  id,
  eyebrow,
  headline,
  intro,
  children,
  centered,
  className,
}: OruvoSectionProps) {
  return (
    <section
      id={id}
      className={orCn(
        'mx-auto w-full max-w-[var(--or-content-max)] scroll-mt-28 px-4 py-[var(--or-section-y)]',
        className,
      )}
    >
      <OruvoReveal className={orCn('max-w-2xl', centered && 'mx-auto text-center')}>
        {eyebrow && <OruvoEyebrow>{eyebrow}</OruvoEyebrow>}
        <h2 className="mt-5 font-display text-[length:var(--or-text-h1)] font-extrabold leading-[1.08] tracking-tight text-[var(--or-ink)]">
          {headline}
        </h2>
        {intro && (
          <p className="mt-5 text-[length:var(--or-text-body)] leading-relaxed text-[var(--or-slate)]">
            {intro}
          </p>
        )}
      </OruvoReveal>
      {children}
    </section>
  );
}
