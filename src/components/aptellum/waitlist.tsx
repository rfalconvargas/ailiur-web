'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { PAGE_TRACKS } from '@/lib/aptellum/page-content';
import { AP_EASE_OUT, apCn } from './utils';

export function AptellumWaitlist() {
  const [email, setEmail] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const reduced = useReducedMotion();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      className={apCn(
        'rounded-[var(--ap-radius-xl)] border border-[var(--ap-border-strong)]',
        'bg-[var(--ap-surface)] p-6 shadow-[var(--ap-shadow-md)] sm:p-10',
      )}
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: AP_EASE_OUT }}
            className="flex flex-col items-center py-4 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--ap-ink)] text-[var(--ap-ivory)]">
              <Check className="h-7 w-7" aria-hidden />
            </span>
            <h3 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-[var(--ap-ink)]">
              You&apos;re on the pilot list.
            </h3>
            <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-[var(--ap-graphite)]">
              We&apos;ll reach out as your cohort opens. In the meantime, start naming the
              companies and kinds of work that pull you — that&apos;s the first brief.
            </p>
            {discipline && (
              <p className="mt-4 rounded-[var(--ap-radius-pill)] bg-[var(--ap-mist-soft)] px-4 py-1.5 text-sm font-medium text-[var(--ap-ink)]">
                Track: {discipline}
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
              <label htmlFor="ap-email" className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ap-graphite)]">
                Email
              </label>
              <input
                id="ap-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@school.edu"
                className={apCn(
                  'rounded-[var(--ap-radius-md)] border border-[var(--ap-border-strong)] bg-[var(--ap-surface-muted)]',
                  'px-4 py-3 text-[0.9375rem] text-[var(--ap-ink)] outline-none',
                  'placeholder:text-[var(--ap-graphite-light)]',
                  'focus:border-[var(--ap-gold)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--ap-gold)_25%,transparent)]',
                )}
              />
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="ap-discipline" className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ap-graphite)]">
                Creative track
              </label>
              <select
                id="ap-discipline"
                required
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
                className={apCn(
                  'rounded-[var(--ap-radius-md)] border border-[var(--ap-border-strong)] bg-[var(--ap-surface-muted)]',
                  'px-4 py-3 text-[0.9375rem] text-[var(--ap-ink)] outline-none',
                  'focus:border-[var(--ap-gold)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--ap-gold)_25%,transparent)]',
                )}
              >
                <option value="">Select your discipline…</option>
                {PAGE_TRACKS.map((t) => (
                  <option key={t.discipline} value={t.discipline}>
                    {t.discipline}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-1.5">
              <label htmlFor="ap-note" className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ap-graphite)]">
                Dream company or studio <span className="text-[var(--ap-graphite-light)]">(optional)</span>
              </label>
              <textarea
                id="ap-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="A studio, museum, or practice you admire…"
                className={apCn(
                  'resize-none rounded-[var(--ap-radius-md)] border border-[var(--ap-border-strong)] bg-[var(--ap-surface-muted)]',
                  'px-4 py-3 text-[0.9375rem] text-[var(--ap-ink)] outline-none',
                  'placeholder:text-[var(--ap-graphite-light)]',
                  'focus:border-[var(--ap-gold)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--ap-gold)_25%,transparent)]',
                )}
              />
            </div>

            <button
              type="submit"
              className={apCn(
                'group mt-1 inline-flex items-center justify-center gap-2 rounded-[var(--ap-radius-pill)]',
                'bg-[var(--ap-ink)] px-6 py-3.5 text-sm font-semibold text-[var(--ap-ivory)]',
                'transition-transform hover:-translate-y-px focus-visible:outline focus-visible:outline-2',
                'focus-visible:outline-offset-3 focus-visible:outline-[var(--ap-gold)]',
              )}
            >
              Start the Aptellum pilot
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </button>
            <p className="text-center text-xs text-[var(--ap-graphite-light)]">
              No spam — one note when your cohort opens.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
