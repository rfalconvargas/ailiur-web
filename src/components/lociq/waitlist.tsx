'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { LQ_EASE_OUT, lqCn } from './utils';

const ROLES = [
  'Resident',
  'Community organizer',
  'Local official or staff',
  'Journalist',
  'Civic technologist',
  'Just curious',
] as const;

/**
 * Lociq waitlist — frontend-only. No backend: a successful submit logs to the
 * console and shows a confirmation state. Wire to a real endpoint later.
 */
export function LociqWaitlist() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const reduced = useReducedMotion();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Frontend-only mock — replace with a real waitlist endpoint later.
    console.log('[Lociq waitlist] signup', { email, role, neighborhood });
    setSubmitted(true);
  }

  return (
    <div
      className={lqCn(
        'lq-glass-strong rounded-[var(--lq-radius-xl)] border border-[var(--lq-border-strong)] p-6 sm:p-10',
      )}
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: LQ_EASE_OUT }}
            className="flex flex-col items-center py-4 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--lq-green)] text-white">
              <Check className="h-7 w-7" aria-hidden />
            </span>
            <h3 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-[var(--lq-ink)]">
              You&apos;re on the list.
            </h3>
            <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-[var(--lq-slate)]">
              We&apos;ll reach out as we open Lociq neighborhood by neighborhood. Until then —
              the next thing you walk past and think &ldquo;someone should fix that&rdquo;? That&apos;s the
              first issue worth reporting.
            </p>
            {neighborhood && (
              <p className="mt-4 rounded-[var(--lq-radius-pill)] border border-[var(--lq-border)] bg-[var(--lq-surface-muted)] px-4 py-1.5 text-sm font-medium text-[var(--lq-ink)]">
                {neighborhood}
              </p>
            )}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-4"
          >
            <div className="grid gap-1.5">
              <label
                htmlFor="lq-email"
                className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--lq-slate)]"
              >
                Email
              </label>
              <input
                id="lq-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@neighborhood.org"
                className={lqCn(
                  'rounded-[var(--lq-radius-md)] border border-[var(--lq-border-strong)] bg-[var(--lq-paper-raised)]',
                  'px-4 py-3 text-[0.9375rem] text-[var(--lq-ink)] outline-none',
                  'placeholder:text-[var(--lq-slate-dim)]',
                  'focus:border-[var(--lq-green)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--lq-green)_25%,transparent)]',
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <label
                  htmlFor="lq-role"
                  className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--lq-slate)]"
                >
                  I&apos;m a…
                </label>
                <select
                  id="lq-role"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={lqCn(
                    'rounded-[var(--lq-radius-md)] border border-[var(--lq-border-strong)] bg-[var(--lq-paper-raised)]',
                    'px-4 py-3 text-[0.9375rem] text-[var(--lq-ink)] outline-none',
                    'focus:border-[var(--lq-green)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--lq-green)_25%,transparent)]',
                  )}
                >
                  <option value="">Select your role…</option>
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-1.5">
                <label
                  htmlFor="lq-neighborhood"
                  className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--lq-slate)]"
                >
                  Neighborhood <span className="font-normal normal-case text-[var(--lq-slate-dim)]">(optional)</span>
                </label>
                <input
                  id="lq-neighborhood"
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="Riverside, Springfield"
                  className={lqCn(
                    'rounded-[var(--lq-radius-md)] border border-[var(--lq-border-strong)] bg-[var(--lq-paper-raised)]',
                    'px-4 py-3 text-[0.9375rem] text-[var(--lq-ink)] outline-none',
                    'placeholder:text-[var(--lq-slate-dim)]',
                    'focus:border-[var(--lq-green)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--lq-green)_25%,transparent)]',
                  )}
                />
              </div>
            </div>

            <button
              type="submit"
              className={lqCn(
                'group mt-1 inline-flex items-center justify-center gap-2 rounded-[var(--lq-radius-pill)]',
                'bg-[var(--lq-green)] px-6 py-3.5 text-sm font-semibold text-white',
                'transition-[transform,background-color] hover:-translate-y-px hover:bg-[var(--lq-green-deep)]',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--lq-green)]',
              )}
            >
              Join the Lociq waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </button>
            <p className="text-center text-xs text-[var(--lq-slate-dim)]">
              No spam, no selling your data — one note when your neighborhood opens.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
