'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { OlluneButton } from './button';
import { olCn } from './utils';

const LINKS = [
  { label: 'The layer', href: '#layer' },
  { label: 'Intent', href: '#intent' },
  { label: 'Demo', href: '#demo' },
  { label: 'Features', href: '#features' },
  { label: 'Ecosystem', href: '#ecosystem' },
];

/**
 * Ollune sub-navigation — sits below the global Ailiur mega-nav.
 * Sticky, keyboard-accessible, mobile-friendly.
 */
export function OlluneNav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-[4.75rem] z-40 mx-auto w-full max-w-6xl px-4"
      aria-label="Ollune"
    >
      <nav
        className={olCn(
          'ol-glass-strong flex items-center justify-between gap-3 rounded-[var(--ol-radius-pill)]',
          'px-3 py-2 sm:px-4 sm:py-2.5',
        )}
      >
        {/* Wordmark */}
        <div className="flex min-w-0 items-center gap-2.5 pl-1">
          <span
            aria-hidden
            className="h-5 w-5 rounded-full bg-[radial-gradient(circle_at_30%_30%,var(--ol-green-soft),var(--ol-green-deep)_70%)] shadow-[0_0_16px_rgba(81,201,143,0.5)]"
          />
          <a
            href="#top"
            className="font-display text-lg font-extrabold tracking-tight text-[var(--ol-cream)] sm:text-xl"
          >
            Ollune
          </a>
          <span className="hidden text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[var(--ol-silver-dim)] sm:inline">
            by Ailiur
          </span>
        </div>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {LINKS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={olCn(
                  'rounded-[var(--ol-radius-pill)] px-3 py-1.5 text-sm font-medium text-[var(--ol-silver)]',
                  'transition-colors hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--ol-cream)]',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <OlluneButton href="#waitlist" size="sm" variant="primary">
            Request early access
          </OlluneButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="rounded-[var(--ol-radius-sm)] p-2 text-[var(--ol-cream)] lg:hidden"
          aria-expanded={open}
          aria-controls="ollune-mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div
          id="ollune-mobile-nav"
          className={olCn(
            'ol-glass-strong mt-2 rounded-[var(--ol-radius-lg)] p-3 lg:hidden',
          )}
        >
          <ul className="space-y-1" role="list">
            {LINKS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-[var(--ol-radius-sm)] px-3 py-2.5 text-sm font-medium text-[var(--ol-cream)] hover:bg-[rgba(255,255,255,0.06)]"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 border-t border-[var(--ol-border)] pt-3">
            <OlluneButton
              href="#waitlist"
              size="md"
              variant="primary"
              className="w-full"
            >
              Request early access
            </OlluneButton>
          </div>
        </div>
      )}
    </header>
  );
}
