import { SmartLink } from '@/components/ui/smart-link';
import { TAYZT_FOOTER } from '@/lib/tayzt/content';
import { tzCn } from './utils';

/**
 * Tayzt sub-brand footer — closes the microsite with wordmark, ecosystem
 * links, and the Ailiur signal accents.
 */
export function TayztFooter() {
  return (
    <footer className="relative w-full border-t border-[var(--tz-hairline)] px-4 pb-16 pt-16">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-extrabold tracking-tight text-[var(--tz-cream)]">
              Tayzt
            </span>
            <span className="flex items-center gap-1" aria-hidden>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--tz-gold)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--tz-green)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--tz-red)]" />
            </span>
          </div>
          <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-[var(--tz-graphite)]">
            {TAYZT_FOOTER.tagline}
          </p>
        </div>

        {TAYZT_FOOTER.groups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--tz-graphite-dim)]">
              {group.title}
            </p>
            <ul className="mt-4 space-y-2.5" role="list">
              {group.links.map((link) => (
                <li key={link.label}>
                  <SmartLink
                    href={link.href}
                    className={tzCn(
                      'text-[0.9375rem] text-[var(--tz-graphite)] transition-colors hover:text-[var(--tz-cream)]',
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

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-start justify-between gap-3 border-t border-[var(--tz-hairline)] pt-6 text-[0.8125rem] text-[var(--tz-graphite-dim)] sm:flex-row sm:items-center">
        <p>© {2026} Ailiur. All rights reserved.</p>
        <p>Tayzt is part of the Ailiur context ecosystem.</p>
      </div>
    </footer>
  );
}
