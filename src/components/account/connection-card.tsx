'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2, Unplug } from 'lucide-react';
import { GoogleButton } from '@/components/ui/google-button';
import { disconnectGoogle } from '@/lib/account/actions';

type Status = 'connected' | 'revoked' | 'none';

const GOOGLE_CONTEXT_SCOPES = [
  { scope: 'google_calendar:read', label: 'Calendar' },
  { scope: 'google_gmail:read', label: 'Gmail' },
  { scope: 'google_drive:read', label: 'Drive' },
];

/**
 * Google connection card for /account/connections. Google is framed as a
 * connected context source, not the primary identity.
 *
 * NOTE: actual Gmail/Calendar/Drive sync is NOT implemented. We track the
 * identity connection + requested scope metadata only. The buttons connect /
 * disconnect the identity; pulling data is a documented TODO (see
 * SIGN_IN_WITH_AILIUR_SPEC.md → "Connected data sync").
 */
export function GoogleConnectionCard({
  status,
  providerEmail,
  grantedScopes,
  lastSync,
}: {
  status: Status;
  providerEmail: string | null;
  grantedScopes: string[];
  lastSync: string | null;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onDisconnect() {
    setError(null);
    startTransition(async () => {
      const res = await disconnectGoogle();
      if (!res.ok) return setError(res.error);
      router.refresh();
    });
  }

  const connected = status === 'connected';

  return (
    <div className="glass rounded-[var(--radius-card)] p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70">
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
              <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
            </svg>
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display text-base font-extrabold tracking-tight text-foreground">Google</h3>
              {connected ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent-green/15 px-2 py-0.5 text-xs font-semibold text-accent-green">
                  <Check className="h-3 w-3" strokeWidth={3} /> Connected
                </span>
              ) : (
                <span className="rounded-full bg-foreground/[0.07] px-2 py-0.5 text-xs font-semibold text-foreground/55">
                  {status === 'revoked' ? 'Disconnected' : 'Not connected'}
                </span>
              )}
            </div>
            {connected && providerEmail && (
              <p className="text-sm text-foreground/60">{providerEmail}</p>
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-foreground/70">
        Bring calendar, email, Drive, and workspace context into your Ailiur Account — with your
        permission. Google is a connected context source; your Ailiur Account stays your identity.
      </p>

      {/* Requested scopes (metadata only — sync not yet implemented) */}
      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50">Requested context</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {GOOGLE_CONTEXT_SCOPES.map(({ scope, label }) => {
            const on = grantedScopes.includes(scope);
            return (
              <span
                key={scope}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  on ? 'bg-accent-green/15 text-accent-green' : 'bg-foreground/[0.06] text-foreground/55'
                }`}
              >
                {label}
              </span>
            );
          })}
        </div>
      </div>

      {connected && (
        <p className="mt-3 text-xs text-foreground/50">
          Last sync: {lastSync ? new Date(lastSync).toLocaleString() : 'never (sync not yet enabled)'}
        </p>
      )}

      {error && <p className="mt-3 text-sm font-medium text-accent-red">{error}</p>}

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {connected ? (
          <>
            <a
              href="https://myaccount.google.com/permissions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/40 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-white/70"
            >
              Manage permissions
            </a>
            <button
              type="button"
              onClick={onDisconnect}
              disabled={pending}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/40 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-white/70 disabled:opacity-60"
            >
              {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Unplug className="h-3.5 w-3.5" />}
              Disconnect
            </button>
          </>
        ) : (
          <div className="w-full max-w-xs">
            <GoogleButton callbackUrl="/account/connections" label={status === 'revoked' ? 'Reconnect Google' : 'Connect Google'} />
          </div>
        )}
      </div>
    </div>
  );
}
