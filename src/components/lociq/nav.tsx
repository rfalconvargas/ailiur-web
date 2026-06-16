'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SmartLink } from '@/components/ui/smart-link';
import { LociqButton } from './button';
import { LOCIQ_NAV, LOCIQ_NAV_CTA } from '@/lib/lociq/content';
import { lqCn } from './utils';

/**
 * Lociq sub-navigation — sits below the global Ailiur mega-nav.
 * Sticky, keyboard-accessible, mobile-friendly.
 */
export function LociqNav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-[4.75rem] z-40 mx-auto w-full max-w-6xl px-4"
      aria-label="Lociq"
    >
      <nav
        className={lqCn(
          'lq-glass-strong flex items-center justify-between gap-3 rounded-[var(--lq-radius-pill)]',
          'border border-[var(--lq-border)] px-3 py-2 sm:px-4 sm:py-2.5',
        )}
      >
        {/* Wordmark */}
        <div className="flex min-w-0 items-center gap-2 pl-1">
          <SmartLink
            href="/lociq"
            className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-[var(--lq-ink)] sm:text-xl"
          >
            <span className="flex items-center gap-1" aria-hidden>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lq-green)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lq-gold)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--lq-blue)]" />
            </span>
            Lociq
          </SmartLink>
          <span className="hidden text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[var(--lq-slate-dim)] sm:inline">
            by Ailiur
          </span>
        </div>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {LOCIQ_NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={lqCn(
                  'rounded-[var(--lq-radius-pill)] px-3 py-1.5 text-sm font-medium text-[var(--lq-slate)]',
                  'transition-colors hover:bg-[color-mix(in_srgb,var(--lq-ink)_6%,transparent)] hover:text-[var(--lq-ink)]',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <LociqButton href={LOCIQ_NAV_CTA.href} size="sm" variant="primary">
            {LOCIQ_NAV_CTA.label}
          </LociqButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-[var(--lq-radius-sm)] p-2 text-[var(--lq-ink)] lg:hidden"
          aria-expanded={open}
          aria-controls="lociq-mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div
          id="lociq-mobile-nav"
          className={lqCn(
            'lq-glass-strong mt-2 rounded-[var(--lq-radius-lg)] border border-[var(--lq-border)] p-3 lg:hidden',
          )}
        >
          <ul className="space-y-1" role="list">
            {LOCIQ_NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-[var(--lq-radius-sm)] px-3 py-2.5 text-sm font-medium text-[var(--lq-ink)] hover:bg-[color-mix(in_srgb,var(--lq-ink)_6%,transparent)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-[var(--lq-border)] pt-3">
            <LociqButton href={LOCIQ_NAV_CTA.href} size="md" variant="primary" className="w-full">
              {LOCIQ_NAV_CTA.label}
            </LociqButton>
          </div>
        </div>
      )}
    </header>
  );
}
