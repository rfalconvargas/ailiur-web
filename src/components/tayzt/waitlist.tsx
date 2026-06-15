'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { TZ_EASE_OUT, tzCn } from './utils';

const FORMATS = [
  'Short-form (Reels / Shorts / TikTok)',
  'Music & artist visuals',
  'Brand & product films',
  'Docs / vlogs / travel',
  'Something else',
] as const;

/**
 * Tayzt waitlist — frontend-only. No backend: a successful submit logs to the
 * console and shows a confirmation state. Wire to a real endpoint later.
 */
export function TayztWaitlist() {
  const [email, setEmail] = useState('');
  const [format, setFormat] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const reduced = useReducedMotion();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Frontend-only mock — replace with a real waitlist endpoint later.
    console.log('[Tayzt waitlist] signup', { email, format });
    setSubmitted(true);
  }

  return (
    <div
      className={tzCn(
        'tz-glass-strong rounded-[var(--tz-radius-xl)] border border-[var(--tz-border-strong)] p-6 sm:p-10',
      )}
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: TZ_EASE_OUT }}
            className="flex flex-col items-center py-4 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--tz-cream)] text-[var(--tz-ink)]">
              <Check className="h-7 w-7" aria-hidden />
            </span>
            <h3 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-[var(--tz-cream)]">
              You&apos;re on the list.
            </h3>
            <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-[var(--tz-graphite)]">
              We&apos;ll reach out as cohorts open. In the meantime, start gathering the references
              that define your look — that&apos;s the seed of your aesthetic identity.
            </p>
            {format && (
              <p className="mt-4 rounded-[var(--tz-radius-pill)] border border-[var(--tz-border)] bg-[var(--tz-surface-muted)] px-4 py-1.5 text-sm font-medium text-[var(--tz-cream)]">
                {format}
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
                htmlFor="tz-email"
                className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--tz-graphite)]"
              >
                Email
              </label>
              <input
                id="tz-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@studio.com"
                className={tzCn(
                  'rounded-[var(--tz-radius-md)] border border-[var(--tz-border-strong)] bg-[var(--tz-surface-muted)]',
                  'px-4 py-3 text-[0.9375rem] text-[var(--tz-cream)] outline-none',
                  'placeholder:text-[var(--tz-graphite-dim)]',
                  'focus:border-[var(--tz-gold)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--tz-gold)_25%,transparent)]',
                )}
              />
            </div>

            <div className="grid gap-1.5">
              <label
                htmlFor="tz-format"
                className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--tz-graphite)]"
              >
                What do you make?
              </label>
              <select
                id="tz-format"
                required
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className={tzCn(
                  'rounded-[var(--tz-radius-md)] border border-[var(--tz-border-strong)] bg-[var(--tz-surface-muted)]',
                  'px-4 py-3 text-[0.9375rem] text-[var(--tz-cream)] outline-none',
                  'focus:border-[var(--tz-gold)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--tz-gold)_25%,transparent)]',
                )}
              >
                <option value="">Select a format…</option>
                {FORMATS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className={tzCn(
                'group mt-1 inline-flex items-center justify-center gap-2 rounded-[var(--tz-radius-pill)]',
                'bg-[var(--tz-cream)] px-6 py-3.5 text-sm font-semibold text-[var(--tz-ink)]',
                'transition-transform hover:-translate-y-px focus-visible:outline focus-visible:outline-2',
                'focus-visible:outline-offset-3 focus-visible:outline-[var(--tz-gold)]',
              )}
            >
              Join the Tayzt waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </button>
            <p className="text-center text-xs text-[var(--tz-graphite-dim)]">
              No spam — one note when your cohort opens.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
