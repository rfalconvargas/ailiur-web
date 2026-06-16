'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { OL_EASE_OUT } from './utils';

const ROLES = [
  'Builder / developer',
  'Designer',
  'Founder / operator',
  'Researcher',
  'Just curious',
];

export function OlluneWaitlist() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [intent, setIntent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend yet — move straight to the confirmed state.
    setSubmitted(true);
  }

  return (
    <div className="ol-glass-strong rounded-[var(--ol-radius-xl)] p-6 sm:p-9">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: OL_EASE_OUT }}
            className="flex flex-col items-center py-6 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--ol-green)] text-[var(--ol-ink)] shadow-[var(--ol-glow-green)]">
              <Check className="h-7 w-7" strokeWidth={2.5} />
            </span>
            <h3 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-[var(--ol-cream)]">
              You&apos;re on the list.
            </h3>
            <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-[var(--ol-silver)]">
              We&apos;re opening Ollune slowly and deliberately. We&apos;ll reach out
              as the surface comes online for your kind of work.
            </p>
            {intent && (
              <p className="mt-4 rounded-[var(--ol-radius-pill)] bg-[rgba(255,255,255,0.05)] px-4 py-1.5 text-sm font-medium text-[var(--ol-cream-soft)]">
                First intent to try: <span className="text-[var(--ol-cream)]">{intent}</span>
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
                htmlFor="ol-email"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ol-silver)]"
              >
                Email
              </label>
              <input
                id="ol-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="rounded-[var(--ol-radius-md)] border border-[var(--ol-border)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[15px] text-[var(--ol-cream)] outline-none transition-all placeholder:text-[var(--ol-silver-dim)] focus:border-[var(--ol-green)] focus:bg-[rgba(255,255,255,0.05)]"
              />
            </div>

            <div className="grid gap-1.5">
              <label
                htmlFor="ol-role"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ol-silver)]"
              >
                What describes you?
              </label>
              <select
                id="ol-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="appearance-none rounded-[var(--ol-radius-md)] border border-[var(--ol-border)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[15px] text-[var(--ol-cream)] outline-none transition-all focus:border-[var(--ol-green)]"
              >
                <option value="" className="bg-[var(--ol-graphite)]">
                  Choose one…
                </option>
                {ROLES.map((r) => (
                  <option key={r} value={r} className="bg-[var(--ol-graphite)]">
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-1.5">
              <label
                htmlFor="ol-intent"
                className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ol-silver)]"
              >
                What would you point it at first?{' '}
                <span className="text-[var(--ol-silver-dim)]">(optional)</span>
              </label>
              <textarea
                id="ol-intent"
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                rows={3}
                placeholder="A task you wish you could just describe and have happen…"
                className="resize-none rounded-[var(--ol-radius-md)] border border-[var(--ol-border)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-[15px] text-[var(--ol-cream)] outline-none transition-all placeholder:text-[var(--ol-silver-dim)] focus:border-[var(--ol-green)] focus:bg-[rgba(255,255,255,0.05)]"
              />
            </div>

            <button
              type="submit"
              className="group mt-1 inline-flex items-center justify-center gap-2 rounded-[var(--ol-radius-pill)] bg-[var(--ol-green)] px-6 py-3.5 text-sm font-semibold text-[var(--ol-ink)] shadow-[var(--ol-glow-green)] transition-transform hover:-translate-y-0.5"
            >
              Request early access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <p className="text-center text-xs text-[var(--ol-silver-dim)]">
              No spam — one note when your invitation is ready.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
