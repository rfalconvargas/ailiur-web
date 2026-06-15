import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { TayztNav, TayztShell } from '@/components/tayzt';
import { TAYZT_SUBDOMAIN_HOST, makeTayztMetadata } from '@/lib/tayzt/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host')?.split(':')[0] ?? '';
  return makeTayztMetadata({
    useSubdomainOrigin: host === TAYZT_SUBDOMAIN_HOST,
  });
}

export default function TayztLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TayztShell>
      <TayztNav />
      {children}
    </TayztShell>
  );
}
