import type { Metadata } from 'next';
import { AiliurAuthForm } from '@/components/auth/ailiur-auth-form';

export const metadata: Metadata = {
  title: 'Sign in — Ailiur',
  description: 'Sign in to your Ailiur Account — one account for every Ailiur app.',
};

// searchParams is async in this Next version.
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const { callbackUrl, error } = await searchParams;

  return (
    <main className="relative mx-auto flex min-h-[80vh] w-full max-w-md flex-col items-center justify-center px-4 pb-24 pt-40 text-center">
      <span className="glass-strong mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/70">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
        Ailiur Account
      </span>

      <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-foreground">
        Sign in with Ailiur
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-foreground/70">
        One account for every Ailiur app. Your profile, context, and connected apps in one place.
      </p>

      {error && (
        <p
          role="alert"
          className="mt-6 w-full rounded-2xl border border-accent-red/30 bg-accent-red/10 px-4 py-3 text-sm font-medium text-accent-red"
        >
          That sign-in link didn’t work or has expired. Try again below.
        </p>
      )}

      <AiliurAuthForm mode="signin" callbackUrl={callbackUrl || '/dashboard'} />
    </main>
  );
}
