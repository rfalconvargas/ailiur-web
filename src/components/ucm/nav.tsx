'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SmartLink } from '@/components/ui/smart-link';
import { UcmButton } from './button';
import { UCM_NAV, UCM_NAV_CTA } from '@/lib/ucm/content';
import { ucmCn } from './utils';

/**
 * Unified Context Mesh sub-navigation — sits below the global Ailiur mega-nav.
 * Sticky, keyboard-accessible, mobile-friendly.
 */
export function UcmNav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-[4.75rem] z-40 mx-auto w-full max-w-6xl px-4"
      aria-label="Unified Context Mesh"
    >
      <nav
        className={ucmCn(
          'ucm-glass-strong flex items-center justify-between gap-3 rounded-[var(--ucm-radius-pill)]',
          'border border-[var(--ucm-border)] px-3 py-2 sm:px-4 sm:py-2.5',
        )}
      >
        {/* Wordmark */}
        <div className="flex min-w-0 items-center gap-2 pl-1">
          <SmartLink
            href="/ucm"
            className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-[var(--ucm-cream)] sm:text-xl"
          >
            <span className="flex items-center gap-1" aria-hidden>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--ucm-green)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--ucm-amber)]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--ucm-red)]" />
            </span>
            <span className="whitespace-nowrap">
              UCM
              <span className="ml-1.5 hidden font-sans text-sm font-medium text-[var(--ucm-sand)] sm:inline">
                Unified Context Mesh
              </span>
            </span>
          </SmartLink>
          <span className="hidden text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[var(--ucm-sand-dim)] lg:inline">
            by Ailiur
          </span>
        </div>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {UCM_NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={ucmCn(
                  'rounded-[var(--ucm-radius-pill)] px-3 py-1.5 text-sm font-medium text-[var(--ucm-sand)]',
                  'transition-colors hover:bg-[color-mix(in_srgb,var(--ucm-cream)_8%,transparent)] hover:text-[var(--ucm-cream)]',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <UcmButton href={UCM_NAV_CTA.href} size="sm" variant="primary">
            {UCM_NAV_CTA.label}
          </UcmButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-[var(--ucm-radius-sm)] p-2 text-[var(--ucm-cream)] lg:hidden"
          aria-expanded={open}
          aria-controls="ucm-mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div
          id="ucm-mobile-nav"
          className={ucmCn(
            'ucm-glass-strong mt-2 rounded-[var(--ucm-radius-lg)] border border-[var(--ucm-border)] p-3 lg:hidden',
          )}
        >
          <ul className="space-y-1" role="list">
            {UCM_NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-[var(--ucm-radius-sm)] px-3 py-2.5 text-sm font-medium text-[var(--ucm-cream)] hover:bg-[color-mix(in_srgb,var(--ucm-cream)_8%,transparent)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-[var(--ucm-border)] pt-3">
            <UcmButton href={UCM_NAV_CTA.href} size="md" variant="primary" className="w-full">
              {UCM_NAV_CTA.label}
            </UcmButton>
          </div>
        </div>
      )}
    </header>
  );
}
