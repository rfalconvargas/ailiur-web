'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Loader2, Unplug } from 'lucide-react';
import { GoogleButton } from '@/components/ui/google-button';
import { disconnectGoogle } from '@/lib/account/actions';

type Status = 'connected' | 'revoked' | 'none';

/**
 * Dashboard Google connection control. Reframes Google as an *attachable*
 * provider on the Ailiur Account: connect, or disconnect (mark revoked).
 */
export function GoogleConnection({ status }: { status: Status }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onDisconnect() {
    setError(null);
    startTransition(async () => {
      const res = await disconnectGoogle();
      if (!res.ok) {
        setError(res.error);
        return;
      }
      router.refresh();
    });
  }

  if (status === 'connected') {
    return (
      <div>
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Check className="h-4 w-4 text-accent-green" strokeWidth={3} />
          Google connected
        </div>
        <p className="mt-1 text-xs leading-relaxed text-foreground/60">
          Attached to your Ailiur Account as a verification method and context source.
        </p>
        <button
          type="button"
          onClick={onDisconnect}
          disabled={pending}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/40 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-white/70 disabled:opacity-60"
        >
          {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Unplug className="h-3.5 w-3.5" />}
          Disconnect Google
        </button>
        {error && <p className="mt-2 text-xs font-medium text-accent-red">{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <p className="mb-3 text-xs leading-relaxed text-foreground/60">
        {status === 'revoked'
          ? 'Google was disconnected. Reconnect to bring back calendar, email, and workspace context.'
          : 'Connect Google to bring in calendar, email, and workspace context — on your terms.'}
      </p>
      <GoogleButton callbackUrl="/dashboard" label={status === 'revoked' ? 'Reconnect Google' : 'Connect Google'} />
    </div>
  );
}
