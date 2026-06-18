'use client';

import { useState, useTransition } from 'react';
import { ArrowUpRight, Check, Loader2, Plus, X } from 'lucide-react';
import { SmartLink } from '@/components/ui/smart-link';
import { requestAppAccess, setAppAccess } from '@/lib/account/actions';

type Access = 'active' | 'pending' | 'revoked' | 'none';

/**
 * Per-app actions in the Ailiur Apps page. "Connect"/"Disconnect" write
 * user_app_access; "Request access" records pending interest for coming-soon
 * apps. Launch opens the app URL when one exists.
 */
export function AppCardActions({
  slug,
  url,
  status, // app status from registry
  access, // user's access to this app
}: {
  slug: string;
  url: string | null;
  status: 'active' | 'coming_soon' | 'internal' | 'disabled';
  access: Access;
}) {
  const [current, setCurrent] = useState<Access>(access);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function run(fn: () => Promise<{ ok: boolean; error?: string }>, optimistic: Access) {
    const prev = current;
    setCurrent(optimistic);
    setError(null);
    startTransition(async () => {
      const res = await fn();
      if (!res.ok) {
        setCurrent(prev);
        setError(res.error ?? 'Something went wrong.');
      }
    });
  }

  const launch = url ? (
    <SmartLink
      href={url}
      className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
    >
      Open <ArrowUpRight className="h-3.5 w-3.5" />
    </SmartLink>
  ) : null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {status === 'coming_soon' || status === 'disabled' ? (
        current === 'pending' ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-green/15 px-4 py-2 text-xs font-semibold text-accent-green">
            <Check className="h-3.5 w-3.5" strokeWidth={3} /> On the list
          </span>
        ) : (
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => requestAppAccess(slug), 'pending')}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/40 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-white/70 disabled:opacity-60"
          >
            {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
            Request access
          </button>
        )
      ) : current === 'active' ? (
        <>
          {launch}
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => setAppAccess(slug, 'revoked'), 'revoked')}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/40 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-white/70 disabled:opacity-60"
          >
            {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <X className="h-3.5 w-3.5" />}
            Disconnect
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => setAppAccess(slug, 'active'), 'active')}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent-green px-4 py-2 text-xs font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
            Connect
          </button>
          {launch}
        </>
      )}
      {error && <span className="w-full text-xs font-medium text-accent-red">{error}</span>}
    </div>
  );
}
