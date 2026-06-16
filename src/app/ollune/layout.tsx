import type { Metadata } from 'next';
import { OlluneShell, OlluneNav } from '@/components/ollune';

const TITLE = 'Ollune — The Operating Surface for Human Intent';
const DESCRIPTION =
  'Ollune is Ailiur’s intent-driven AI OS layer, replacing app-switching with fluid interfaces that form around what you are trying to do.';
const SITE_URL = 'https://ollune.ailiur.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'Ollune',
    'Ailiur',
    'AI operating system',
    'intent-driven interface',
    'zero-app',
    'AI OS layer',
    'agentic interface',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Ollune by Ailiur',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function OlluneLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <OlluneShell>
      <OlluneNav />
      {children}
    </OlluneShell>
  );
}
