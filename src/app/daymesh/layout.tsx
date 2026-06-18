import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { DaymeshShell, DaymeshNav } from '@/components/daymesh';
import { DM_SUBDOMAIN_HOST, makeDmMetadata } from '@/lib/daymesh/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host')?.split(':')[0] ?? '';
  return makeDmMetadata({
    useSubdomainOrigin: host === DM_SUBDOMAIN_HOST,
  });
}

export default function DaymeshLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <DaymeshShell>
      <DaymeshNav />
      {children}
    </DaymeshShell>
  );
}
