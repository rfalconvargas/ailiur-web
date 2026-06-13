'use client';

import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { MEDIA_TYPES } from './data';

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Waitlist() {
  const [email, setEmail] = useState('');
  const [logFirst, setLogFirst] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // No backend yet — move straight to the confirmed state.
    setSubmitted(true);
  }

  return (
    <div className="glass-strong rounded-[var(--radius-panel)] p-6 sm:p-10">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="flex flex-col items-center py-6 text-center"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-green text-[#fffdf5]">
              <Check className="h-7 w-7" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-foreground">
              You&apos;re on the list.
            </h3>
            <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-foreground/70">
              We&apos;ll reach out as Retellum opens. In the meantime, start
              noticing what stays with you — that&apos;s the first entry.
            </p>
            {logFirst && (
              <p className="mt-4 rounded-full bg-white/55 px-4 py-1.5 text-sm font-medium text-foreground/75">
                First up to log: <span className="text-foreground">{logFirst}</span>
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
                htmlFor="wl-email"
                className="text-xs font-semibold uppercase tracking-widest text-foreground/55"
              >
                Email
              </label>
              <input
                id="wl-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="rounded-2xl border border-white/65 bg-white/55 px-4 py-3 text-[15px] text-foreground outline-none transition-all placeholder:text-foreground/35 focus:border-accent-green focus:ring-2 focus:ring-accent-green/30"
              />
            </div>

            <div className="grid gap-1.5">
              <label
                htmlFor="wl-first"
                className="text-xs font-semibold uppercase tracking-widest text-foreground/55"
              >
                What do you want to log first?
              </label>
              <select
                id="wl-first"
                value={logFirst}
                onChange={(e) => setLogFirst(e.target.value)}
                className="appearance-none rounded-2xl border border-white/65 bg-white/55 px-4 py-3 text-[15px] text-foreground outline-none transition-all focus:border-accent-green focus:ring-2 focus:ring-accent-green/30"
              >
                <option value="">Choose a medium…</option>
                {MEDIA_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-1.5">
              <label
                htmlFor="wl-note"
                className="text-xs font-semibold uppercase tracking-widest text-foreground/55"
              >
                Note <span className="text-foreground/35">(optional)</span>
              </label>
              <textarea
                id="wl-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="A film, book, or idea that shaped you…"
                className="resize-none rounded-2xl border border-white/65 bg-white/55 px-4 py-3 text-[15px] text-foreground outline-none transition-all placeholder:text-foreground/35 focus:border-accent-green focus:ring-2 focus:ring-accent-green/30"
              />
            </div>

            <button
              type="submit"
              className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-accent-green px-6 py-3.5 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
            >
              Join the waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <p className="text-center text-xs text-foreground/45">
              No spam — one note when your invitation is ready.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
