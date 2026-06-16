import { SmartLink } from '@/components/ui/smart-link';
import { TELLUMETRY_FOOTER } from '@/lib/tellumetry/content';
import { tmCn } from './utils';

/**
 * Tellumetry sub-brand footer — closes the microsite with wordmark, ecosystem
 * links, and the Ailiur signal accents.
 */
export function TellumetryFooter() {
  return (
    <footer className="relative w-full border-t border-[var(--tm-hairline)] px-4 pb-16 pt-16">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-extrabold tracking-tight text-[var(--tm-ivory)]">
              Tellumetry
            </span>
            <span className="flex items-center gap-1" aria-hidden>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--tm-green)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--tm-amber)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--tm-red)]" />
            </span>
          </div>
          <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-[var(--tm-slate)]">
            {TELLUMETRY_FOOTER.tagline}
          </p>
        </div>

        {TELLUMETRY_FOOTER.groups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--tm-slate-dim)]">
              {group.title}
            </p>
            <ul className="mt-4 space-y-2.5" role="list">
              {group.links.map((link) => (
                <li key={link.label}>
                  <SmartLink
                    href={link.href}
                    className={tmCn(
                      'text-[0.9375rem] text-[var(--tm-slate)] transition-colors hover:text-[var(--tm-ivory)]',
                    )}
                  >
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-start justify-between gap-3 border-t border-[var(--tm-hairline)] pt-6 text-[0.8125rem] text-[var(--tm-slate-dim)] sm:flex-row sm:items-center">
        <p>© {2026} Ailiur. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-[var(--tm-radius-pill)] border border-[var(--tm-hairline)] px-2.5 py-0.5 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[var(--tm-mint)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--tm-mint)]" aria-hidden />
            Private preview
          </span>
          <span>Part of the Ailiur ecosystem.</span>
        </p>
      </div>
    </footer>
  );
}
