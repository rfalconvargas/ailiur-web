'use client';

/**
 * Open the Stripe Customer Portal from a client component.
 *
 * Calls the server route, which resolves the Stripe customer from the signed-in
 * session or from a just-completed Checkout `sessionId`, then redirects the
 * browser to the returned portal URL.
 *
 * Returns an error message string on failure (so the caller can display it), or
 * null on success (the browser is navigating away).
 */
export async function openBillingPortal(opts?: { sessionId?: string }): Promise<string | null> {
  try {
    const res = await fetch('/api/create-customer-portal-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(opts?.sessionId ? { session_id: opts.sessionId } : {}),
    });

    const data = (await res.json().catch(() => null)) as { url?: string; error?: string } | null;

    if (!res.ok || !data?.url) {
      return data?.error || 'Could not open the billing portal. Please try again.';
    }

    window.location.assign(data.url);
    return null;
  } catch {
    return 'Network error. Please check your connection and try again.';
  }
}
