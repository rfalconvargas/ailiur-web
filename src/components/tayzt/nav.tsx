'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SmartLink } from '@/components/ui/smart-link';
import { TayztButton } from './button';
import { TAYZT_NAV, TAYZT_NAV_CTA } from '@/lib/tayzt/content';
import { tzCn } from './utils';

/**
 * Tayzt sub-navigation — sits below the global Ailiur mega-nav.
 * Sticky, keyboard-accessible, mobile-friendly.
 */
export function TayztNav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-[4.75rem] z-40 mx-auto w-full max-w-6xl px-4"
      aria-label="Tayzt"
    >
      <nav
        className={tzCn(
          'tz-glass-strong flex items-center justify-between gap-3 rounded-[var(--tz-radius-pill)]',
          'border border-[var(--tz-border)] px-3 py-2 sm:px-4 sm:py-2.5',
        )}
      >
        {/* Wordmark */}
        <div className="flex min-w-0 items-center gap-2 pl-1">
          <SmartLink
            href="/tayzt"
            className="font-display text-lg font-extrabold tracking-tight text-[var(--tz-cream)] sm:text-xl"
          >
            Tayzt
          </SmartLink>
          <span className="hidden text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[var(--tz-graphite-dim)] sm:inline">
            by Ailiur
          </span>
        </div>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {TAYZT_NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={tzCn(
                  'rounded-[var(--tz-radius-pill)] px-3 py-1.5 text-sm font-medium text-[var(--tz-graphite)]',
                  'transition-colors hover:bg-[color-mix(in_srgb,var(--tz-cream)_8%,transparent)] hover:text-[var(--tz-cream)]',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <TayztButton href={TAYZT_NAV_CTA.href} size="sm" variant="primary">
            {TAYZT_NAV_CTA.label}
          </TayztButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-[var(--tz-radius-sm)] p-2 text-[var(--tz-cream)] lg:hidden"
          aria-expanded={open}
          aria-controls="tayzt-mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div
          id="tayzt-mobile-nav"
          className={tzCn(
            'tz-glass-strong mt-2 rounded-[var(--tz-radius-lg)] border border-[var(--tz-border)] p-3 lg:hidden',
          )}
        >
          <ul className="space-y-1" role="list">
            {TAYZT_NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-[var(--tz-radius-sm)] px-3 py-2.5 text-sm font-medium text-[var(--tz-cream)] hover:bg-[color-mix(in_srgb,var(--tz-cream)_8%,transparent)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-[var(--tz-border)] pt-3">
            <TayztButton href={TAYZT_NAV_CTA.href} size="md" variant="primary" className="w-full">
              {TAYZT_NAV_CTA.label}
            </TayztButton>
          </div>
        </div>
      )}
    </header>
  );
}
