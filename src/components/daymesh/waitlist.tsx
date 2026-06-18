'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { DM_WAITLIST } from '@/lib/daymesh/content';
import { DM_EASE_OUT } from './utils';

const GOALS = [
  'Better sleep',
  'Recovery & training',
  'Nutrition experiments',
  'Focus & attention',
  'Just curious',
];

export function DaymeshWaitlist() {
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend — move straight to the confirmed state (local mock only).
    setSubmitted(true);
  }

  return (
    <div className="dm-glass-strong rounded-[var(--dm-radius-xl)] p-6 sm:p-9">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: DM_EASE_OUT }}
            className="flex flex-col items-center py-6 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--dm-sage)] text-white shadow-[var(--dm-shadow-md)]">
              <Check className="h-7 w-7" strokeWidth={2.5} />
            </span>
            <h3 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-[var(--dm-ink)]">
              You&apos;re on the list.
            </h3>
            <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-[var(--dm-muted)]">
              We&apos;re opening Daymesh slowly and deliberately. We&apos;ll reach out as
              early access comes online{goal ? ' for your goal' : ''}.
            </p>
            {goal && (
              <p className="mt-4 rounded-[var(--dm-radius-pill)] bg-[var(--dm-bg)] px-4 py-1.5 text-sm font-medium text-[var(--dm-ink-soft)]">
                Focus: <span className="text-[var(--dm-ink)]">{goal}</span>
              </p>
            )}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid gap-4"
          >
            <div className="grid gap-1.5">
              <label
                htmlFor="dm-email"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--dm-muted)]"
              >
                Email
              </label>
              <input
                id="dm-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="rounded-[var(--dm-radius-md)] border border-[var(--dm-border)] bg-[var(--dm-surface)] px-4 py-3 text-[15px] text-[var(--dm-ink)] outline-none transition-all placeholder:text-[var(--dm-faint)] focus:border-[var(--dm-amber)]"
              />
            </div>

            <div className="grid gap-1.5">
              <label
                htmlFor="dm-goal"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--dm-muted)]"
              >
                What would you point it at first?{' '}
                <span className="text-[var(--dm-faint)]">(optional)</span>
              </label>
              <select
                id="dm-goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="appearance-none rounded-[var(--dm-radius-md)] border border-[var(--dm-border)] bg-[var(--dm-surface)] px-4 py-3 text-[15px] text-[var(--dm-ink)] outline-none transition-all focus:border-[var(--dm-amber)]"
              >
                <option value="">Choose one…</option>
                {GOALS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="group mt-1 inline-flex items-center justify-center gap-2 rounded-[var(--dm-radius-pill)] bg-[var(--dm-ink)] px-6 py-3.5 text-sm font-semibold text-[var(--dm-bg)] shadow-[var(--dm-shadow-sm)] transition-all hover:-translate-y-0.5 hover:bg-[var(--dm-amber-deep)]"
            >
              Join the Daymesh waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <p className="text-center text-xs text-[var(--dm-muted)]">{DM_WAITLIST.note}</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
