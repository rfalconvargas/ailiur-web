'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { OruvoButton } from './button';
import { orCn } from './utils';
import { BRAND, NAV_LINKS, HERO } from '@/lib/oruvo/content';

/**
 * Oruvo sub-navigation — sits below the global Ailiur mega-nav.
 * Sticky, keyboard-accessible, mobile-friendly.
 */
export function OruvoNav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-[4.75rem] z-40 mx-auto w-full max-w-6xl px-4"
      aria-label={BRAND.name}
    >
      <nav
        className={orCn(
          'or-glass-strong flex items-center justify-between gap-3 rounded-[var(--or-radius-pill)]',
          'px-3 py-2 sm:px-4 sm:py-2.5',
        )}
      >
        {/* Wordmark */}
        <div className="flex min-w-0 items-center gap-2.5 pl-1">
          <span
            aria-hidden
            className="h-5 w-5 rounded-full bg-[radial-gradient(circle_at_30%_30%,var(--or-gold-soft),var(--or-gold-deep)_72%)] shadow-[0_0_14px_rgba(176,138,76,0.45)]"
          />
          <a
            href="#top"
            className="font-display text-lg font-extrabold tracking-tight text-[var(--or-ink)] sm:text-xl"
          >
            {BRAND.name}
          </a>
          <span className="hidden text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[var(--or-slate-dim)] sm:inline">
            by {BRAND.parent}
          </span>
        </div>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {NAV_LINKS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={orCn(
                  'rounded-[var(--or-radius-pill)] px-3 py-1.5 text-sm font-medium text-[var(--or-slate)]',
                  'transition-colors hover:bg-[rgba(22,26,32,0.05)] hover:text-[var(--or-ink)]',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <OruvoButton href="#waitlist" size="sm" variant="primary">
            {HERO.primaryCta}
          </OruvoButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-[var(--or-radius-sm)] p-2 text-[var(--or-ink)] lg:hidden"
          aria-expanded={open}
          aria-controls="oruvo-mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div
          id="oruvo-mobile-nav"
          className="or-glass-strong mt-2 rounded-[var(--or-radius-lg)] p-3 lg:hidden"
        >
          <ul className="space-y-1" role="list">
            {NAV_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-[var(--or-radius-sm)] px-3 py-2.5 text-sm font-medium text-[var(--or-ink)] hover:bg-[rgba(22,26,32,0.06)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-[var(--or-border)] pt-3">
            <OruvoButton href="#waitlist" size="md" variant="primary" className="w-full">
              {HERO.primaryCta}
            </OruvoButton>
          </div>
        </div>
      )}
    </header>
  );
}
