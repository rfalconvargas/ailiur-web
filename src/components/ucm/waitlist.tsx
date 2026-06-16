'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { UCM_EASE_OUT, ucmCn } from './utils';

const SOURCES = [
  'ChatGPT',
  'Claude',
  'Gemini',
  'All three',
  'Something else',
] as const;

/**
 * UCM waitlist — frontend-only. No backend: a successful submit logs to the
 * console and shows a local confirmation state. Wire to a real endpoint later.
 */
export function UcmWaitlist() {
  const [email, setEmail] = useState('');
  const [source, setSource] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const reduced = useReducedMotion();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Frontend-only mock — replace with a real waitlist endpoint later.
    console.log('[UCM waitlist] signup', { email, source });
    setSubmitted(true);
  }

  return (
    <div
      className={ucmCn(
        'ucm-glass-strong rounded-[var(--ucm-radius-xl)] border border-[var(--ucm-border-strong)] p-6 sm:p-10',
      )}
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: UCM_EASE_OUT }}
            className="flex flex-col items-center py-4 text-center"
            role="status"
            aria-live="polite"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--ucm-cream)] text-[var(--ucm-ink)]">
              <Check className="h-7 w-7" aria-hidden />
            </span>
            <h3 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-[var(--ucm-cream)]">
              You&apos;re on the list.
            </h3>
            <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-[var(--ucm-sand)]">
              We&apos;ll reach out as early-access cohorts open. Until then, every conversation you
              have is quietly becoming context worth keeping.
            </p>
            {source && (
              <p className="mt-4 rounded-[var(--ucm-radius-pill)] border border-[var(--ucm-border)] bg-[var(--ucm-surface-muted)] px-4 py-1.5 text-sm font-medium text-[var(--ucm-cream)]">
                {source}
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
                htmlFor="ucm-email"
                className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ucm-sand)]"
              >
                Email
              </label>
              <input
                id="ucm-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourdomain.com"
                className={ucmCn(
                  'rounded-[var(--ucm-radius-md)] border border-[var(--ucm-border-strong)] bg-[var(--ucm-surface-muted)]',
                  'px-4 py-3 text-[0.9375rem] text-[var(--ucm-cream)] outline-none',
                  'placeholder:text-[var(--ucm-sand-dim)]',
                  'focus:border-[var(--ucm-gold)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--ucm-gold)_25%,transparent)]',
                )}
              />
            </div>

            <div className="grid gap-1.5">
              <label
                htmlFor="ucm-source"
                className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ucm-sand)]"
              >
                Where does most of your context live?
              </label>
              <select
                id="ucm-source"
                required
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className={ucmCn(
                  'rounded-[var(--ucm-radius-md)] border border-[var(--ucm-border-strong)] bg-[var(--ucm-surface-muted)]',
                  'px-4 py-3 text-[0.9375rem] text-[var(--ucm-cream)] outline-none',
                  'focus:border-[var(--ucm-gold)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--ucm-gold)_25%,transparent)]',
                )}
              >
                <option value="">Select your main tool…</option>
                {SOURCES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className={ucmCn(
                'group mt-1 inline-flex items-center justify-center gap-2 rounded-[var(--ucm-radius-pill)]',
                'bg-[var(--ucm-cream)] px-6 py-3.5 text-sm font-semibold text-[var(--ucm-ink)]',
                'transition-transform hover:-translate-y-px focus-visible:outline focus-visible:outline-2',
                'focus-visible:outline-offset-3 focus-visible:outline-[var(--ucm-gold)]',
              )}
            >
              Join the waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </button>
            <p className="text-center text-xs text-[var(--ucm-sand-dim)]">
              No spam — one note when your cohort opens.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
