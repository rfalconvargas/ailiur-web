import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { AptellumNav, AptellumShell } from '@/components/aptellum';
import {
  APTELLUM_SUBDOMAIN_HOST,
  makeAptellumMetadata,
} from '@/lib/aptellum/metadata';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get('host')?.split(':')[0] ?? '';
  return makeAptellumMetadata({
    useSubdomainOrigin: host === APTELLUM_SUBDOMAIN_HOST,
  });
}

export default function AptellumLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <AptellumShell>
      <AptellumNav />
      {children}
    </AptellumShell>
  );
}
