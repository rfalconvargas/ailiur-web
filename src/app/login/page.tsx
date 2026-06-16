import type { Metadata } from 'next';
import { GoogleButton } from '@/components/ui/google-button';
import { SmartLink } from '@/components/ui/smart-link';

export const metadata: Metadata = {
  title: 'Log in — Ailiur',
  description: 'Welcome back to Ailiur. Sign in to your connected ecosystem.',
};

export default function LoginPage() {
  return (
    <main className="relative mx-auto flex min-h-[80vh] w-full max-w-md flex-col items-center justify-center px-4 pb-24 pt-40 text-center">
      <span className="glass-strong mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/70">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
        Account
      </span>

      <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-foreground">
        Log in
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-foreground/70">Welcome back to Ailiur.</p>

      <div className="glass mt-10 w-full rounded-[var(--radius-card)] p-7">
        <GoogleButton callbackUrl="/" />
        <p className="mt-5 text-xs leading-relaxed text-foreground/55">
          By continuing you agree to Ailiur’s{' '}
          <SmartLink href="/about" className="font-medium text-foreground underline-offset-4 hover:underline">
            Terms
          </SmartLink>{' '}
          and{' '}
          <SmartLink href="/platform/security" className="font-medium text-foreground underline-offset-4 hover:underline">
            Privacy
          </SmartLink>
          .
        </p>
      </div>

      <p className="mt-6 text-sm text-foreground/60">
        New to Ailiur?{' '}
        <SmartLink href="/signup" className="font-semibold text-foreground underline-offset-4 hover:underline">
          Create your account
        </SmartLink>
      </p>
    </main>
  );
}
