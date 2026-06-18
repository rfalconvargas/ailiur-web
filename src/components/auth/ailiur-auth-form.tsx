'use client';

import { useState, type FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { ArrowRight, Loader2, MailCheck } from 'lucide-react';
import { GoogleButton } from '@/components/ui/google-button';
import { SmartLink } from '@/components/ui/smart-link';

/**
 * The "Sign in with Ailiur" form.
 *
 * Primary path: email magic link (Resend provider). Secondary: Continue with
 * Google, framed as a verification method that resolves to the SAME canonical
 * Ailiur Account. One component powers both /login and /signup; only the copy
 * differs.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Mode = 'signin' | 'signup';

const COPY: Record<Mode, { primary: string; switchPrompt: string; switchHref: string; switchCta: string }> = {
  signin: {
    primary: 'Sign in with Ailiur',
    switchPrompt: 'New to Ailiur?',
    switchHref: '/signup',
    switchCta: 'Create your Ailiur Account',
  },
  signup: {
    primary: 'Create your Ailiur Account',
    switchPrompt: 'Already have an account?',
    switchHref: '/login',
    switchCta: 'Sign in',
  },
};

export function AiliurAuthForm({
  mode,
  callbackUrl = '/dashboard',
}: {
  mode: Mode;
  callbackUrl?: string;
}) {
  const copy = COPY[mode];
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value)) {
      setError('Enter a valid email address.');
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const res = await signIn('resend', { email: value, redirect: false, callbackUrl });
      if (res?.error) {
        setError('We couldn’t send your sign-in link. Please try again.');
        setStatus('error');
        return;
      }
      setStatus('sent');
    } catch {
      setError('Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="glass mt-10 w-full rounded-[var(--radius-card)] p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-green/15 text-accent-green">
          <MailCheck className="h-6 w-6" />
        </span>
        <h2 className="mt-5 font-display text-xl font-extrabold tracking-tight text-foreground">
          Check your inbox
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground/70">
          We sent a secure sign-in link to <span className="font-semibold text-foreground">{email.trim().toLowerCase()}</span>.
          Open it on this device to continue to your Ailiur Account.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setError(null);
          }}
          className="mt-6 text-sm font-semibold text-accent-green underline-offset-4 hover:underline"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div className="glass mt-10 w-full rounded-[var(--radius-card)] p-7">
      {/* Primary: email magic link */}
      <form onSubmit={onSubmit} className="text-left">
        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-foreground/55">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') {
              setStatus('idle');
              setError(null);
            }
          }}
          aria-invalid={status === 'error'}
          className="mt-2 w-full rounded-2xl border border-white/70 bg-white/60 px-4 py-3 text-[15px] text-foreground placeholder:text-foreground/40 focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/30"
        />

        {error && (
          <p role="alert" className="mt-2 text-sm font-medium text-accent-red">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-green px-6 py-3.5 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {status === 'sending' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Sending link…
            </>
          ) : (
            <>
              {copy.primary}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>
        <p className="mt-2.5 text-center text-xs text-foreground/55">
          We’ll email you a secure link — no password to remember.
        </p>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-white/60" />
        <span className="text-xs font-medium uppercase tracking-widest text-foreground/45">or</span>
        <span className="h-px flex-1 bg-white/60" />
      </div>

      {/* Secondary: Google (reframed) */}
      <GoogleButton callbackUrl={callbackUrl} label="Continue with Google" />
      <p className="mt-2.5 text-center text-xs leading-relaxed text-foreground/55">
        {mode === 'signup'
          ? 'Creates or signs into your Ailiur Account using Google as a verification method. You can connect Google for calendar and email context later.'
          : 'Signs into your Ailiur Account using Google as a verification method.'}
      </p>

      {/* Terms */}
      <p className="mt-6 text-center text-xs leading-relaxed text-foreground/55">
        By continuing you agree to Ailiur’s{' '}
        <SmartLink href="/about" className="font-medium text-foreground underline-offset-4 hover:underline">
          Terms
        </SmartLink>{' '}
        and{' '}
        <SmartLink href="/platform/security" className="font-medium text-foreground underline-offset-4 hover:underline">
          Privacy
        </SmartLink>
        .
      </p>

      {/* Switch mode */}
      <p className="mt-5 text-center text-sm text-foreground/60">
        {copy.switchPrompt}{' '}
        <SmartLink href={copy.switchHref} className="font-semibold text-foreground underline-offset-4 hover:underline">
          {copy.switchCta}
        </SmartLink>
      </p>
    </div>
  );
}
