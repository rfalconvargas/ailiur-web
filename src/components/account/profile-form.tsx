'use client';

import { useState, type FormEvent } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { updateProfile } from '@/lib/account/actions';

type Initial = {
  displayName: string;
  fullName: string;
  handle: string;
  avatarUrl: string;
  pronouns: string;
  bio: string;
  locale: string;
  timezone: string;
};

function Field({
  id,
  label,
  optional,
  ...props
}: { id: string; label: string; optional?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-widest text-foreground/55">
        {label} {optional && <span className="font-normal normal-case text-foreground/40">(optional)</span>}
      </label>
      <input
        id={id}
        {...props}
        className="mt-2 w-full rounded-2xl border border-white/70 bg-white/60 px-4 py-3 text-[15px] text-foreground placeholder:text-foreground/40 focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/30"
      />
    </div>
  );
}

export function ProfileForm({ initial, email }: { initial: Initial; email: string }) {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof Initial>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (status !== 'idle') {
      setStatus('idle');
      setError(null);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('saving');
    setError(null);
    const res = await updateProfile({
      displayName: form.displayName,
      fullName: form.fullName,
      handle: form.handle,
      avatarUrl: form.avatarUrl,
      pronouns: form.pronouns,
      bio: form.bio,
      locale: form.locale,
      timezone: form.timezone,
    });
    if (res.ok) {
      setStatus('saved');
    } else {
      setStatus('error');
      setError(res.error);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="displayName" label="Display name" value={form.displayName} onChange={(e) => set('displayName', e.target.value)} placeholder="How Ailiur addresses you" />
        <Field id="fullName" label="Full name" optional value={form.fullName} onChange={(e) => set('fullName', e.target.value)} placeholder="Your full name" />
        <Field id="handle" label="Handle" optional value={form.handle} onChange={(e) => set('handle', e.target.value)} placeholder="username" autoComplete="off" />
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-foreground/55">Email</label>
          <div className="mt-2 flex items-center rounded-2xl border border-white/50 bg-white/30 px-4 py-3 text-[15px] text-foreground/60">
            {email || '—'}
          </div>
          <p className="mt-1 text-xs text-foreground/45">Managed by your sign-in method.</p>
        </div>
        <Field id="pronouns" label="Pronouns" optional value={form.pronouns} onChange={(e) => set('pronouns', e.target.value)} placeholder="they/them" />
        <Field id="avatarUrl" label="Avatar URL" optional value={form.avatarUrl} onChange={(e) => set('avatarUrl', e.target.value)} placeholder="https://…" />
        <Field id="locale" label="Locale" optional value={form.locale} onChange={(e) => set('locale', e.target.value)} placeholder="en-US" />
        <Field id="timezone" label="Timezone" optional value={form.timezone} onChange={(e) => set('timezone', e.target.value)} placeholder="UTC" />
      </div>

      <div>
        <label htmlFor="bio" className="block text-xs font-semibold uppercase tracking-widest text-foreground/55">
          Bio <span className="font-normal normal-case text-foreground/40">(optional)</span>
        </label>
        <textarea
          id="bio"
          value={form.bio}
          onChange={(e) => set('bio', e.target.value)}
          rows={3}
          placeholder="A short line about you."
          className="mt-2 w-full resize-none rounded-2xl border border-white/70 bg-white/60 px-4 py-3 text-[15px] text-foreground placeholder:text-foreground/40 focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/30"
        />
      </div>

      {error && <p role="alert" className="text-sm font-medium text-accent-red">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={status === 'saving'}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-green px-7 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {status === 'saving' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Save changes
        </button>
        {status === 'saved' && (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-green">
            <Check className="h-4 w-4" strokeWidth={3} /> Saved
          </span>
        )}
      </div>
    </form>
  );
}
