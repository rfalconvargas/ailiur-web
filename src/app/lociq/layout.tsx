import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { LociqNav, LociqShell } from '@/components/lociq';
import { LOCIQ_SUBDOMAIN_HOST, makeLociqMetadata } from '@/lib/lociq/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host')?.split(':')[0] ?? '';
  return makeLociqMetadata({
    useSubdomainOrigin: host === LOCIQ_SUBDOMAIN_HOST,
  });
}

export default function LociqLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <LociqShell>
      <LociqNav />
      {children}
    </LociqShell>
  );
}
