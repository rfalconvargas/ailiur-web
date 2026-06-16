import { SmartLink } from '@/components/ui/smart-link';
import { LOCIQ_FOOTER } from '@/lib/lociq/content';
import { lqCn } from './utils';

/**
 * Lociq sub-brand footer — closes the microsite with wordmark, ecosystem
 * links, and the civic accent dots.
 */
export function LociqFooter() {
  return (
    <footer className="relative w-full border-t border-[var(--lq-hairline)] px-4 pb-16 pt-16">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-extrabold tracking-tight text-[var(--lq-ink)]">
              Lociq
            </span>
            <span className="flex items-center gap-1" aria-hidden>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lq-green)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lq-gold)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lq-blue)]" />
            </span>
          </div>
          <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-[var(--lq-slate)]">
            {LOCIQ_FOOTER.tagline}
          </p>
        </div>

        {LOCIQ_FOOTER.groups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--lq-slate-dim)]">
              {group.title}
            </p>
            <ul className="mt-4 space-y-2.5" role="list">
              {group.links.map((link) => (
                <li key={link.label}>
                  <SmartLink
                    href={link.href}
                    className={lqCn(
                      'text-[0.9375rem] text-[var(--lq-slate)] transition-colors hover:text-[var(--lq-ink)]',
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

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-start justify-between gap-3 border-t border-[var(--lq-hairline)] pt-6 text-[0.8125rem] text-[var(--lq-slate-dim)] sm:flex-row sm:items-center">
        <p>© {2026} Ailiur. All rights reserved.</p>
        <p>Lociq is the civic layer of the Ailiur ecosystem.</p>
      </div>
    </footer>
  );
}
