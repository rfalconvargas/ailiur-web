'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SmartLink } from '@/components/ui/smart-link';
import { AptellumButton } from './button';
import { PAGE_NAV, PAGE_NAV_CTA } from '@/lib/aptellum/page-content';
import { apCn } from './utils';

/**
 * Aptellum sub-navigation — sits below the global Ailiur mega-nav.
 * Sticky, keyboard-accessible, mobile-friendly.
 */
export function AptellumNav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-[4.75rem] z-40 mx-auto w-full max-w-6xl px-4"
      aria-label="Aptellum"
    >
      <nav
        className={apCn(
          'ap-glass-strong flex items-center justify-between gap-3 rounded-[var(--ap-radius-pill)]',
          'border border-[var(--ap-border)] px-3 py-2 shadow-[var(--ap-shadow-sm)] sm:px-4 sm:py-2.5',
        )}
      >
        {/* Wordmark */}
        <div className="flex min-w-0 items-center gap-2 pl-1">
          <SmartLink
            href="/aptellum"
            className="font-display text-lg font-extrabold tracking-tight text-[var(--ap-ink)] sm:text-xl"
          >
            Aptellum
          </SmartLink>
          <span className="hidden text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[var(--ap-graphite-light)] sm:inline">
            by Ailiur
          </span>
        </div>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {PAGE_NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={apCn(
                  'rounded-[var(--ap-radius-pill)] px-3 py-1.5 text-sm font-medium text-[var(--ap-graphite)]',
                  'transition-colors hover:bg-[color-mix(in_srgb,var(--ap-ink)_5%,transparent)] hover:text-[var(--ap-ink)]',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <AptellumButton href={PAGE_NAV_CTA.href} size="sm" variant="primary">
            {PAGE_NAV_CTA.label}
          </AptellumButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-[var(--ap-radius-sm)] p-2 text-[var(--ap-ink)] lg:hidden"
          aria-expanded={open}
          aria-controls="aptellum-mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div
          id="aptellum-mobile-nav"
          className={apCn(
            'ap-glass-strong mt-2 rounded-[var(--ap-radius-lg)] border border-[var(--ap-border)]',
            'p-3 shadow-[var(--ap-shadow-md)] lg:hidden',
          )}
        >
          <ul className="space-y-1" role="list">
            {PAGE_NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-[var(--ap-radius-sm)] px-3 py-2.5 text-sm font-medium text-[var(--ap-ink)] hover:bg-[var(--ap-mist-soft)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-[var(--ap-border)] pt-3">
            <AptellumButton
              href={PAGE_NAV_CTA.href}
              size="md"
              variant="primary"
              className="w-full"
            >
              {PAGE_NAV_CTA.label}
            </AptellumButton>
          </div>
        </div>
      )}
    </header>
  );
}
