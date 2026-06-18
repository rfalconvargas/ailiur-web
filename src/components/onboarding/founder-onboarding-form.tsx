'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SUPPORT_EMAIL } from '@/lib/site';
import {
  CAN_CONTACT_OPTIONS,
  DESCRIBE_SELF_OPTIONS,
  IMPROVE_FIRST_OPTIONS,
  MOST_INTERESTED_OPTIONS,
} from '@/lib/onboarding/questions';

const easeOut = [0.22, 1, 0.36, 1] as const;

/** A labelled question block. */
function Field({
  index,
  label,
  hint,
  children,
}: {
  index: number;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass rounded-[var(--radius-card)] p-6 sm:p-7">
      <div className="flex items-baseline gap-2">
        <span className="font-display text-sm font-extrabold text-accent-green">{index}</span>
        <h2 className="font-display text-lg font-extrabold leading-snug tracking-tight text-foreground">
          {label}
        </h2>
      </div>
      {hint && <p className="mt-1 text-sm text-foreground/55">{hint}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

/** Pill toggle used for both checkbox (multi) and radio (single) groups. */
function Pill({
  selected,
  multi,
  onClick,
  children,
}: {
  selected: boolean;
  multi?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role={multi ? 'checkbox' : 'radio'}
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
        selected
          ? 'border-accent-green bg-accent-green text-[#fffdf5]'
          : 'border-foreground/15 bg-[var(--glass-bg-strong)] text-foreground/75 hover:text-foreground'
      )}
    >
      {selected && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      {children}
    </button>
  );
}

export function FounderOnboardingForm() {
  const [improveFirst, setImproveFirst] = useState<string[]>([]);
  const [biggestFriction, setBiggestFriction] = useState('');
  const [mostInterested, setMostInterested] = useState<string | null>(null);
  const [describeSelf, setDescribeSelf] = useState<string[]>([]);
  const [worthPaying, setWorthPaying] = useState('');
  const [canContact, setCanContact] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');
  const [error, setError] = useState<string | null>(null);

  function toggle(list: string[], value: string, set: (v: string[]) => void) {
    set(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'submitting') return;
    setError(null);
    setStatus('submitting');
    try {
      const res = await fetch('/api/founder-onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          improveFirst,
          biggestFriction,
          mostInterested,
          describeSelf,
          worthPaying,
          canContact,
          email,
        }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        setError(data?.error || 'Something went wrong. Please try again.');
        setStatus('idle');
        return;
      }
      setStatus('done');
    } catch {
      setError('Network error. Please check your connection and try again.');
      setStatus('idle');
    }
  }

  if (status === 'done') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="glass-strong mx-auto max-w-lg rounded-[var(--radius-panel)] p-8 text-center sm:p-10"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-green/15">
          <CheckCircle2 className="h-8 w-8 text-accent-green" strokeWidth={2.25} />
        </div>
        <h2 className="mt-6 font-display text-[clamp(1.5rem,3.5vw,2rem)] font-extrabold tracking-tight text-foreground">
          Thank you — this really helps.
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-foreground/70">
          Your answers will help us prioritize the early-access experience. We&rsquo;ll keep you
          posted as Ailiur takes shape.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            Return home
          </Link>
          <Link
            href="/account"
            className="inline-flex w-full items-center justify-center rounded-full border border-foreground/15 bg-[var(--glass-bg-strong)] px-5 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            Account &amp; billing
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-2xl space-y-5">
      <Field
        index={1}
        label="What do you most want Ailiur to help you improve first?"
        hint="Choose any that apply."
      >
        <div className="flex flex-wrap gap-2">
          {IMPROVE_FIRST_OPTIONS.map((o) => (
            <Pill
              key={o}
              multi
              selected={improveFirst.includes(o)}
              onClick={() => toggle(improveFirst, o, setImproveFirst)}
            >
              {o}
            </Pill>
          ))}
        </div>
      </Field>

      <Field index={2} label="What is your biggest current friction in daily life?">
        <textarea
          value={biggestFriction}
          onChange={(e) => setBiggestFriction(e.target.value)}
          rows={3}
          maxLength={2000}
          placeholder="A sentence or two is plenty."
          className="w-full resize-y rounded-[var(--radius-card)] border border-foreground/15 bg-[var(--glass-bg-strong)] px-4 py-3 text-sm text-foreground outline-none placeholder:text-foreground/40 focus:border-accent-green"
        />
      </Field>

      <Field index={3} label="Which Ailiur experience are you most interested in?" hint="Pick one.">
        <div className="flex flex-wrap gap-2">
          {MOST_INTERESTED_OPTIONS.map((o) => (
            <Pill key={o} selected={mostInterested === o} onClick={() => setMostInterested(o)}>
              {o}
            </Pill>
          ))}
        </div>
      </Field>

      <Field index={4} label="How would you describe yourself?" hint="Choose any that apply.">
        <div className="flex flex-wrap gap-2">
          {DESCRIBE_SELF_OPTIONS.map((o) => (
            <Pill
              key={o}
              multi
              selected={describeSelf.includes(o)}
              onClick={() => toggle(describeSelf, o, setDescribeSelf)}
            >
              {o}
            </Pill>
          ))}
        </div>
      </Field>

      <Field index={5} label="What would make Ailiur worth paying for?">
        <textarea
          value={worthPaying}
          onChange={(e) => setWorthPaying(e.target.value)}
          rows={3}
          maxLength={2000}
          placeholder="What would make this genuinely valuable to you?"
          className="w-full resize-y rounded-[var(--radius-card)] border border-foreground/15 bg-[var(--glass-bg-strong)] px-4 py-3 text-sm text-foreground outline-none placeholder:text-foreground/40 focus:border-accent-green"
        />
      </Field>

      <Field index={6} label="Can we contact you for early-access feedback?" hint="Pick one.">
        <div className="flex flex-wrap gap-2">
          {CAN_CONTACT_OPTIONS.map((o) => (
            <Pill key={o} selected={canContact === o} onClick={() => setCanContact(o)}>
              {o}
            </Pill>
          ))}
        </div>
      </Field>

      <Field index={7} label="Email" hint="Optional — only if you'd like us to follow up.">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          className="w-full rounded-[var(--radius-card)] border border-foreground/15 bg-[var(--glass-bg-strong)] px-4 py-3 text-sm text-foreground outline-none placeholder:text-foreground/40 focus:border-accent-green"
        />
      </Field>

      {error && (
        <div
          role="alert"
          aria-live="polite"
          className="flex items-start gap-2.5 rounded-[var(--radius-card)] border border-[var(--accent-red)]/30 bg-[var(--accent-red)]/8 px-4 py-3 text-sm text-foreground/85"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-red)]" strokeWidth={2.5} />
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col items-center gap-3 pt-1 sm:flex-row sm:justify-between">
        <p className="text-xs text-foreground/50">
          Takes about 3–5 minutes. Every field is optional.
        </p>
        <button
          type="submit"
          disabled={status === 'submitting'}
          aria-busy={status === 'submitting'}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-green px-6 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
              Submitting…
            </>
          ) : (
            'Submit'
          )}
        </button>
      </div>

      <p className="pt-2 text-center text-xs text-foreground/45">
        Questions? Email{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="font-semibold text-foreground/70 hover:underline">
          {SUPPORT_EMAIL}
        </a>
        .
      </p>
    </form>
  );
}
