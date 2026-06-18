'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import { openBillingPortal } from '@/lib/billing/portal-client';

/**
 * The three success-page actions. "Manage billing" opens the Stripe Customer
 * Portal, resolving the customer from the just-completed checkout session id.
 */
export function SuccessActions({ sessionId }: { sessionId?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function manageBilling() {
    if (loading) return;
    setError(null);
    setLoading(true);
    const message = await openBillingPortal({ sessionId });
    if (message) {
      setError(message);
      setLoading(false);
    }
    // on success the browser navigates to Stripe — leave the spinner up
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        <Link
          href="/founder-onboarding"
          className="inline-flex items-center justify-center rounded-full bg-accent-green px-5 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
        >
          Continue to onboarding
        </Link>
        <button
          type="button"
          onClick={manageBilling}
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
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full border border-foreground/15 bg-[var(--glass-bg-strong)] px-5 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
        >
          Return home
        </Link>
      </div>

      {error && (
        <p role="alert" aria-live="polite" className="mt-4 text-sm text-[var(--accent-red)]">
          {error}
        </p>
      )}
    </div>
  );
}
