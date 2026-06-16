import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { UcmNav, UcmShell } from '@/components/ucm';
import { UCM_SUBDOMAIN_HOST, makeUcmMetadata } from '@/lib/ucm/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host')?.split(':')[0] ?? '';
  return makeUcmMetadata({
    useSubdomainOrigin: host === UCM_SUBDOMAIN_HOST,
  });
}

export default function UcmLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <UcmShell>
      <UcmNav />
      {children}
    </UcmShell>
  );
}
