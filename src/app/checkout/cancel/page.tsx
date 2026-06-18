import type { Metadata } from 'next';
import Link from 'next/link';
import { XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Checkout canceled — Ailiur',
  description: 'No payment was completed. Choose an Ailiur Founder Access plan whenever you’re ready.',
};

export default function CheckoutCancelPage() {
  return (
    <main className="relative flex min-h-[70vh] items-center justify-center px-4 pt-20 pb-24">
      <div className="glass-strong mx-auto w-full max-w-lg rounded-[var(--radius-panel)] p-8 text-center sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--glass-bg-strong)]">
          <XCircle className="h-8 w-8 text-foreground/55" strokeWidth={2.25} />
        </div>

        <h1 className="mt-6 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-foreground">
          Checkout was canceled.
        </h1>

        <p className="mt-4 text-[15px] leading-relaxed text-foreground/70">
          No payment was completed. You can return to Ailiur and choose a plan whenever you&rsquo;re
          ready.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/pricing#founder-access"
            className="inline-flex w-full items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            View Founder Access plans
          </Link>
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-full border border-foreground/15 bg-[var(--glass-bg-strong)] px-5 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5 sm:w-auto"
          >
            Return home
          </Link>
        </div>
      </div>
    </main>
  );
}
