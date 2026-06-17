'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Lock } from 'lucide-react';
import { OruvoReveal } from './reveal';
import { OR_EASE_OUT } from './utils';
import { WAITLIST } from '@/lib/oruvo/content';

const ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT;
const STORAGE_KEY = 'oruvo:waitlist';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Submission = { email: string; help: string; note: string; at: string };

/** Section 9 — waitlist form. Posts to NEXT_PUBLIC_WAITLIST_ENDPOINT if set,
 *  otherwise records the submission in localStorage for MVP testing. */
export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [help, setHelp] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setBusy(true);

    const payload: Submission = { email, help, note, at: new Date().toISOString() };

    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error('Request failed');
      } else {
        // MVP fallback — persist locally so the form is testable without a backend.
        const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Submission[];
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...prev, payload]));
      }
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      id="waitlist"
      className="mx-auto w-full max-w-[var(--or-content-max)] scroll-mt-28 px-4 py-[var(--or-section-y)]"
    >
      <div className="grid items-center gap-9 lg:grid-cols-[1fr_1fr]">
        <OruvoReveal>
          <span className="or-glass inline-flex items-center gap-2 rounded-[var(--or-radius-pill)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--or-slate)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--or-gold)]" />
            {WAITLIST.eyebrow}
          </span>
          <h2 className="mt-5 font-display text-[length:var(--or-text-h1)] font-extrabold leading-[1.08] tracking-tight text-[var(--or-ink)]">
            {WAITLIST.headline}
          </h2>
          <p className="mt-5 max-w-md text-[length:var(--or-text-body)] leading-relaxed text-[var(--or-slate)]">
            {WAITLIST.intro}
          </p>
        </OruvoReveal>

        <OruvoReveal delay={0.1}>
          <div className="or-glass-strong rounded-[var(--or-radius-xl)] p-6 sm:p-8">
            {/* Plain conditional (no AnimatePresence `mode="wait"`, which can
                stall the form→success swap); success animates in on mount. */}
            {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: OR_EASE_OUT }}
                  className="flex flex-col items-center py-6 text-center"
                >
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--or-green)] text-white shadow-[var(--or-glow-gold)]">
                    <Check className="h-7 w-7" strokeWidth={2.5} />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-[var(--or-ink)]">
                    {WAITLIST.success.title}
                  </h3>
                  <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-[var(--or-slate)]">
                    {WAITLIST.success.body}
                  </p>
                  {help && (
                    <p className="mt-4 rounded-[var(--or-radius-pill)] bg-[var(--or-gold-tint)] px-4 py-1.5 text-sm font-medium text-[var(--or-gold-deep)]">
                      First focus: <span className="font-semibold">{help}</span>
                    </p>
                  )}
                  {!ENDPOINT && (
                    <p className="mt-4 text-xs text-[var(--or-slate-dim)]">
                      Saved locally for this MVP preview.
                    </p>
                  )}
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="grid gap-4"
                  noValidate
                >
                  <Field label="Email" htmlFor="or-email">
                    <input
                      id="or-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={!!error}
                      placeholder="you@domain.com"
                      className="w-full rounded-[var(--or-radius-md)] border border-[var(--or-border)] bg-[var(--or-cloud)] px-4 py-3 text-[15px] text-[var(--or-ink)] outline-none transition-all placeholder:text-[var(--or-slate-dim)] focus:border-[var(--or-gold)]"
                    />
                  </Field>

                  <Field label="What do you want Oruvo to help with?" htmlFor="or-help">
                    <div className="relative">
                      <select
                        id="or-help"
                        value={help}
                        onChange={(e) => setHelp(e.target.value)}
                        className="w-full appearance-none rounded-[var(--or-radius-md)] border border-[var(--or-border)] bg-[var(--or-cloud)] px-4 py-3 text-[15px] text-[var(--or-ink)] outline-none transition-all focus:border-[var(--or-gold)]"
                      >
                        <option value="">Choose one…</option>
                        {WAITLIST.helpOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </Field>

                  <Field label="Anything you'd add? (optional)" htmlFor="or-note">
                    <textarea
                      id="or-note"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      rows={3}
                      placeholder="The one thing no app tracks for you today…"
                      className="w-full resize-none rounded-[var(--or-radius-md)] border border-[var(--or-border)] bg-[var(--or-cloud)] px-4 py-3 text-[15px] text-[var(--or-ink)] outline-none transition-all placeholder:text-[var(--or-slate-dim)] focus:border-[var(--or-gold)]"
                    />
                  </Field>

                  {error && (
                    <p role="alert" className="text-sm font-medium text-[var(--or-red)]">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={busy}
                    className="group mt-1 inline-flex items-center justify-center gap-2 rounded-[var(--or-radius-pill)] bg-[var(--or-gold)] px-6 py-3.5 text-sm font-semibold text-white shadow-[var(--or-glow-gold)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {busy ? WAITLIST.busyCta : WAITLIST.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                  <p className="flex items-center justify-center gap-1.5 text-center text-xs text-[var(--or-slate)]">
                    <Lock className="h-3 w-3 shrink-0 text-[var(--or-green)]" aria-hidden />
                    {WAITLIST.privacy}
                  </p>
                </motion.form>
              )}
          </div>
        </OruvoReveal>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--or-slate)]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
