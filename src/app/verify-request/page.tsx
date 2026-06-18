import type { Metadata } from 'next';
import { MailCheck } from 'lucide-react';
import { SmartLink } from '@/components/ui/smart-link';

export const metadata: Metadata = {
  title: 'Check your email — Ailiur',
  robots: { index: false },
};

/**
 * Auth.js `verifyRequest` page. Shown after a magic link is requested via a
 * full-page redirect (the inline form on /login shows its own "check inbox"
 * state, so this is the fallback for non-JS / direct flows).
 */
export default function VerifyRequestPage() {
  return (
    <main className="relative mx-auto flex min-h-[80vh] w-full max-w-md flex-col items-center justify-center px-4 pb-24 pt-40 text-center">
      <span className="glass-strong mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/70">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
        Ailiur Account
      </span>

      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent-green/15 text-accent-green">
        <MailCheck className="h-7 w-7" />
      </span>

      <h1 className="mt-6 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold leading-[1.08] tracking-tight text-foreground">
        Check your email
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-foreground/70">
        A secure sign-in link is on its way to your inbox. Open it on this device to continue to
        your Ailiur Account. The link expires shortly and can only be used once.
      </p>

      <SmartLink
        href="/login"
        className="mt-8 text-sm font-semibold text-accent-green underline-offset-4 hover:underline"
      >
        Back to sign in
      </SmartLink>
    </main>
  );
}
