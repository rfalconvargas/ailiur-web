import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { TellumetryNav, TellumetryShell } from '@/components/tellumetry';
import { TELLUMETRY_SUBDOMAIN_HOST, makeTellumetryMetadata } from '@/lib/tellumetry/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host')?.split(':')[0] ?? '';
  return makeTellumetryMetadata({
    useSubdomainOrigin: host === TELLUMETRY_SUBDOMAIN_HOST,
  });
}

export default function TellumetryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TellumetryShell>
      <TellumetryNav />
      {children}
    </TellumetryShell>
  );
}
