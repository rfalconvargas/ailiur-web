import type { Metadata } from 'next';
import { auth } from '@/auth';
import { getAccountOverview } from '@/lib/account/server';
import { Card, PageHeader, ProvisionNotice } from '@/components/account/primitives';
import { ProfileForm } from '@/components/account/profile-form';

export const metadata: Metadata = {
  title: 'Profile — Ailiur Account Center',
  robots: { index: false },
};

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await auth();
  const overview = await getAccountOverview();

  const initial = {
    displayName: overview?.account.display_name ?? session?.user?.name ?? '',
    fullName: overview?.profile?.full_name ?? session?.user?.name ?? '',
    handle: overview?.account.handle ?? '',
    avatarUrl: overview?.account.avatar_url ?? session?.user?.image ?? '',
    pronouns: overview?.profile?.pronouns ?? '',
    bio: overview?.profile?.bio ?? '',
    locale: overview?.profile?.locale ?? 'en-US',
    timezone: overview?.profile?.timezone ?? 'UTC',
  };
  const email = overview?.account.email ?? session?.user?.email ?? '';

  return (
    <>
      <PageHeader
        eyebrow="Profile"
        title="Your Ailiur profile"
        description="This identity follows you across every Ailiur app. Your email is managed by your sign-in method."
      />

      {!overview && <ProvisionNotice />}

      <Card>
        <ProfileForm initial={initial} email={email} />
      </Card>
    </>
  );
}
