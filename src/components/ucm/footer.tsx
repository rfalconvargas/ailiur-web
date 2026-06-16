import { SmartLink } from '@/components/ui/smart-link';
import { UCM_FOOTER } from '@/lib/ucm/content';
import { ucmCn } from './utils';

/**
 * UCM sub-brand footer — closes the microsite with wordmark, ecosystem links,
 * the live domain, and the demo privacy note.
 */
export function UcmFooter() {
  return (
    <footer className="relative w-full border-t border-[var(--ucm-hairline)] px-4 pb-16 pt-16">
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-extrabold tracking-tight text-[var(--ucm-cream)]">
              Unified Context Mesh
            </span>
            <span className="flex items-center gap-1" aria-hidden>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--ucm-green)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--ucm-amber)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--ucm-red)]" />
            </span>
          </div>
          <p className="mt-3 max-w-xs text-[0.9375rem] leading-relaxed text-[var(--ucm-sand)]">
            {UCM_FOOTER.tagline}
          </p>
          <p className="mt-4 font-mono text-[0.8125rem] text-[var(--ucm-gold)]">
            {UCM_FOOTER.domain}
          </p>
        </div>

        {UCM_FOOTER.groups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--ucm-sand-dim)]">
              {group.title}
            </p>
            <ul className="mt-4 space-y-2.5" role="list">
              {group.links.map((link) => (
                <li key={link.label}>
                  <SmartLink
                    href={link.href}
                    className={ucmCn(
                      'text-[0.9375rem] text-[var(--ucm-sand)] transition-colors hover:text-[var(--ucm-cream)]',
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

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-start justify-between gap-3 border-t border-[var(--ucm-hairline)] pt-6 text-[0.8125rem] text-[var(--ucm-sand-dim)] sm:flex-row sm:items-center">
        <p>© {2026} Ailiur. All rights reserved.</p>
        <p>{UCM_FOOTER.privacy}</p>
      </div>
    </footer>
  );
}
