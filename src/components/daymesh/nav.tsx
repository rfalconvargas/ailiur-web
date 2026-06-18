'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { DaymeshButton } from './button';
import { DM_NAV_LINKS } from '@/lib/daymesh/content';
import { dmCn } from './utils';

/**
 * Daymesh sub-navigation — sits below the global Ailiur mega-nav.
 * Sticky, keyboard-accessible, mobile-friendly.
 */
export function DaymeshNav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-[4.75rem] z-40 mx-auto w-full max-w-6xl px-4"
      aria-label="Daymesh"
      id="top"
    >
      <nav
        className={dmCn(
          'dm-glass-strong flex items-center justify-between gap-3 rounded-[var(--dm-radius-pill)]',
          'px-3 py-2 sm:px-4 sm:py-2.5',
        )}
      >
        {/* Wordmark */}
        <div className="flex min-w-0 items-center gap-2.5 pl-1">
          <span
            aria-hidden
            className="h-5 w-5 rounded-[7px] bg-[linear-gradient(135deg,var(--dm-amber-soft),var(--dm-amber-deep))] shadow-[0_0_14px_rgba(207,138,51,0.45)]"
          />
          <a
            href="#top"
            className="font-display text-lg font-extrabold tracking-tight text-[var(--dm-ink)] sm:text-xl"
          >
            Daymesh
          </a>
          <span className="hidden text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[var(--dm-muted)] sm:inline">
            by Ailiur
          </span>
        </div>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {DM_NAV_LINKS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={dmCn(
                  'rounded-[var(--dm-radius-pill)] px-3 py-1.5 text-sm font-medium text-[var(--dm-ink-soft)]',
                  'transition-colors hover:bg-[rgba(34,31,26,0.05)] hover:text-[var(--dm-ink)]',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <DaymeshButton href="#waitlist" size="sm" variant="primary">
            Join waitlist
          </DaymeshButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-[var(--dm-radius-sm)] p-2 text-[var(--dm-ink)] lg:hidden"
          aria-expanded={open}
          aria-controls="daymesh-mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div
          id="daymesh-mobile-nav"
          className="dm-glass-strong mt-2 rounded-[var(--dm-radius-lg)] p-3 lg:hidden"
        >
          <ul className="space-y-1" role="list">
            {DM_NAV_LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-[var(--dm-radius-sm)] px-3 py-2.5 text-sm font-medium text-[var(--dm-ink)] hover:bg-[rgba(34,31,26,0.06)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-[var(--dm-border)] pt-3">
            <DaymeshButton href="#waitlist" size="md" variant="primary" className="w-full">
              Join waitlist
            </DaymeshButton>
          </div>
        </div>
      )}
    </header>
  );
}
