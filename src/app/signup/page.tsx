import type { Metadata } from 'next';
import { AiliurAuthForm } from '@/components/auth/ailiur-auth-form';

export const metadata: Metadata = {
  title: 'Create your Ailiur Account',
  description:
    'Create your Ailiur Account — one identity across every Ailiur app, with your profile, context, and connected apps in one place.',
};

// searchParams is async in this Next version.
export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <main className="relative mx-auto flex min-h-[80vh] w-full max-w-md flex-col items-center justify-center px-4 pb-24 pt-40 text-center">
      <span className="glass-strong mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/70">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
        Ailiur Account
      </span>

      <h1 className="font-display text-[clamp(2rem,5vw,3rem)] font-extrabold leading-[1.05] tracking-tight text-foreground">
        Create your Ailiur Account
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-foreground/70">
        One account for every Ailiur app. Connect Google later to bring in calendar, email, and
        workspace context — on your terms.
      </p>

      <AiliurAuthForm mode="signup" callbackUrl={callbackUrl || '/dashboard'} />
    </main>
  );
}
