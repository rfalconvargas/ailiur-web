'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { TM_EASE_OUT, tmCn } from './utils';

const TOOLS = [
  'Claude Code',
  'Cursor',
  'Warp',
  'GitHub Copilot',
  'Several agents',
  'Something else',
] as const;

/**
 * Tellumetry waitlist — frontend-only. No backend: a successful submit logs to
 * the console and shows a confirmation state. Wire to a real endpoint later.
 */
export function TellumetryWaitlist() {
  const [email, setEmail] = useState('');
  const [tool, setTool] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const reduced = useReducedMotion();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Frontend-only mock — replace with a real waitlist endpoint later.
    console.log('[Tellumetry waitlist] signup', { email, tool });
    setSubmitted(true);
  }

  return (
    <div
      className={tmCn(
        'tm-glass-strong rounded-[var(--tm-radius-xl)] border border-[var(--tm-border-strong)] p-6 sm:p-10',
      )}
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: TM_EASE_OUT }}
            className="flex flex-col items-center py-4 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--tm-ivory)] text-[var(--tm-ink)]">
              <Check className="h-7 w-7" aria-hidden />
            </span>
            <h3 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-[var(--tm-ivory)]">
              You&apos;re on the list.
            </h3>
            <p className="mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-[var(--tm-slate)]">
              We&apos;ll reach out as early-access cohorts open. Until then, the next time you kick
              off an agent run — notice how much of your attention it quietly takes.
            </p>
            {tool && (
              <p className="mt-4 rounded-[var(--tm-radius-pill)] border border-[var(--tm-border)] bg-[var(--tm-surface-muted)] px-4 py-1.5 text-sm font-medium text-[var(--tm-ivory)]">
                {tool}
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
                htmlFor="tm-email"
                className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--tm-slate)]"
              >
                Email
              </label>
              <input
                id="tm-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className={tmCn(
                  'rounded-[var(--tm-radius-md)] border border-[var(--tm-border-strong)] bg-[var(--tm-surface-muted)]',
                  'px-4 py-3 text-[0.9375rem] text-[var(--tm-ivory)] outline-none',
                  'placeholder:text-[var(--tm-slate-dim)]',
                  'focus:border-[var(--tm-mint)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--tm-mint)_25%,transparent)]',
                )}
              />
            </div>

            <div className="grid gap-1.5">
              <label
                htmlFor="tm-tool"
                className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--tm-slate)]"
              >
                What do you code with?
              </label>
              <select
                id="tm-tool"
                required
                value={tool}
                onChange={(e) => setTool(e.target.value)}
                className={tmCn(
                  'rounded-[var(--tm-radius-md)] border border-[var(--tm-border-strong)] bg-[var(--tm-surface-muted)]',
                  'px-4 py-3 text-[0.9375rem] text-[var(--tm-ivory)] outline-none',
                  'focus:border-[var(--tm-mint)] focus:ring-2 focus:ring-[color-mix(in_srgb,var(--tm-mint)_25%,transparent)]',
                )}
              >
                <option value="">Select your main agent…</option>
                {TOOLS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className={tmCn(
                'group mt-1 inline-flex items-center justify-center gap-2 rounded-[var(--tm-radius-pill)]',
                'bg-[var(--tm-ivory)] px-6 py-3.5 text-sm font-semibold text-[var(--tm-ink)]',
                'transition-transform hover:-translate-y-px focus-visible:outline focus-visible:outline-2',
                'focus-visible:outline-offset-3 focus-visible:outline-[var(--tm-mint)]',
              )}
            >
              Join the Tellumetry waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </button>
            <p className="text-center text-xs text-[var(--tm-slate-dim)]">
              No spam — one note when your cohort opens.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
