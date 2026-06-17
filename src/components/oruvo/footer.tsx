import { BRAND, ECOSYSTEM, DISCLAIMER } from '@/lib/oruvo/content';

/** In-page Oruvo footer with the Ailiur ecosystem note. */
export function OruvoFooter() {
  return (
    <footer className="mx-auto w-full max-w-[var(--or-content-max)] px-4 pb-16">
      <div className="or-glass rounded-[var(--or-radius-xl)] p-7 sm:p-9">
        <div className="flex flex-wrap items-center gap-2.5">
          <span
            aria-hidden
            className="h-5 w-5 rounded-full bg-[radial-gradient(circle_at_30%_30%,var(--or-gold-soft),var(--or-gold-deep)_72%)]"
          />
          <span className="font-display text-lg font-extrabold tracking-tight text-[var(--or-ink)]">
            {BRAND.name}
          </span>
          <span className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--or-slate-dim)]">
            by {BRAND.parent}
          </span>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[var(--or-slate)]">
          {ECOSYSTEM.note}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2" role="list">
          {ECOSYSTEM.siblings.map((s) => (
            <li
              key={s}
              className="rounded-[var(--or-radius-pill)] bg-[rgba(22,26,32,0.04)] px-3 py-1 text-xs font-medium text-[var(--or-slate)]"
            >
              {s}
            </li>
          ))}
        </ul>

        <p className="mt-6 border-t border-[var(--or-border)] pt-5 text-xs leading-relaxed text-[var(--or-slate)]">
          {DISCLAIMER}
        </p>
      </div>
    </footer>
  );
}
