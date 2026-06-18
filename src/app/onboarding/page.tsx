import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { getAccountOverview } from '@/lib/account/server';
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow';

export const metadata: Metadata = {
  title: 'Welcome to Ailiur',
  robots: { index: false },
};

// searchParams is async in this Next version.
export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ step?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login?callbackUrl=/onboarding');
  }

  const { step } = await searchParams;
  const overview = await getAccountOverview();

  // Already onboarded? Send them to the dashboard.
  if (overview?.account.onboarding_status === 'completed') {
    redirect('/dashboard');
  }

  const googleConnected =
    overview?.identities.some((i) => i.provider === 'google' && i.connection_status === 'connected') ??
    false;

  const initialStep = step ? parseInt(step, 10) || 1 : 1;

  return (
    <main className="relative mx-auto flex min-h-[90vh] w-full max-w-xl flex-col justify-center px-4 pb-24 pt-36">
      <div className="mb-8 text-center">
        <span className="glass-strong mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/70">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
          Welcome to Ailiur
        </span>
        <h1 className="font-display text-[clamp(1.9rem,4.5vw,2.8rem)] font-extrabold leading-[1.06] tracking-tight text-foreground">
          Let’s set up your Ailiur Account
        </h1>
      </div>

      <OnboardingFlow
        initialStep={initialStep}
        initialDisplayName={overview?.account.display_name ?? session.user.name ?? ''}
        initialFullName={overview?.profile?.full_name ?? session.user.name ?? ''}
        initialAvatarUrl={overview?.account.avatar_url ?? session.user.image ?? ''}
        googleConnected={googleConnected}
      />
    </main>
  );
}
