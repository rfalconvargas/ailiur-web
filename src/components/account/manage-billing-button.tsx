'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { openBillingPortal } from '@/lib/billing/portal-client';

/**
 * "Manage billing" button. With no sessionId it relies on the signed-in user's
 * resolved Stripe customer (server-side). Surfaces a helpful message if there's
 * nothing to manage rather than breaking.
 */
export function ManageBillingButton({ sessionId }: { sessionId?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onClick() {
    if (loading) return;
    setError(null);
    setLoading(true);
    const message = await openBillingPortal(sessionId ? { sessionId } : undefined);
    if (message) {
      setError(message);
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        aria-busy={loading}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} />
            Opening…
          </>
        ) : (
          'Manage billing'
        )}
      </button>
      {error && (
        <p role="alert" aria-live="polite" className="mt-3 max-w-md text-sm text-[var(--accent-red)]">
          {error}
        </p>
      )}
    </div>
  );
}
