'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SmartLink } from '@/components/ui/smart-link';
import { TellumetryButton } from './button';
import { TELLUMETRY_NAV, TELLUMETRY_NAV_CTA } from '@/lib/tellumetry/content';
import { tmCn } from './utils';

/**
 * Tellumetry sub-navigation — sits below the global Ailiur mega-nav.
 * Sticky, keyboard-accessible, mobile-friendly.
 */
export function TellumetryNav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-[4.75rem] z-40 mx-auto w-full max-w-6xl px-4"
      aria-label="Tellumetry"
    >
      <nav
        className={tmCn(
          'tm-glass-strong flex items-center justify-between gap-3 rounded-[var(--tm-radius-pill)]',
          'border border-[var(--tm-border)] px-3 py-2 sm:px-4 sm:py-2.5',
        )}
      >
        {/* Wordmark */}
        <div className="flex min-w-0 items-center gap-2 pl-1">
          <SmartLink
            href="/tellumetry"
            className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-[var(--tm-ivory)] sm:text-xl"
          >
            <span className="flex items-center gap-1" aria-hidden>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--tm-green)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--tm-amber)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--tm-red)]" />
            </span>
            Tellumetry
          </SmartLink>
          <span className="hidden text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[var(--tm-slate-dim)] sm:inline">
            by Ailiur
          </span>
        </div>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {TELLUMETRY_NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={tmCn(
                  'rounded-[var(--tm-radius-pill)] px-3 py-1.5 text-sm font-medium text-[var(--tm-slate)]',
                  'transition-colors hover:bg-[color-mix(in_srgb,var(--tm-ivory)_8%,transparent)] hover:text-[var(--tm-ivory)]',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <TellumetryButton href={TELLUMETRY_NAV_CTA.href} size="sm" variant="primary">
            {TELLUMETRY_NAV_CTA.label}
          </TellumetryButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-[var(--tm-radius-sm)] p-2 text-[var(--tm-ivory)] lg:hidden"
          aria-expanded={open}
          aria-controls="tellumetry-mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div
          id="tellumetry-mobile-nav"
          className={tmCn(
            'tm-glass-strong mt-2 rounded-[var(--tm-radius-lg)] border border-[var(--tm-border)] p-3 lg:hidden',
          )}
        >
          <ul className="space-y-1" role="list">
            {TELLUMETRY_NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-[var(--tm-radius-sm)] px-3 py-2.5 text-sm font-medium text-[var(--tm-ivory)] hover:bg-[color-mix(in_srgb,var(--tm-ivory)_8%,transparent)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-[var(--tm-border)] pt-3">
            <TellumetryButton href={TELLUMETRY_NAV_CTA.href} size="md" variant="primary" className="w-full">
              {TELLUMETRY_NAV_CTA.label}
            </TellumetryButton>
          </div>
        </div>
      )}
    </header>
  );
}
