import type { Metadata } from 'next';
import { OruvoShell, OruvoNav } from '@/components/oruvo';
import { BRAND } from '@/lib/oruvo/content';

const TITLE = `${BRAND.full} — ${BRAND.tagline}`;
const DESCRIPTION =
  'Oruvo by Ailiur is a wealth-intelligence companion that maps what you own, what you owe, what you want, and what your time is worth — one life balance sheet for transparent scenario planning. Join the early-access waitlist. Not investment advice.';

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: BRAND.full,
  authors: [{ name: BRAND.parent, url: 'https://ailiur.com' }],
  creator: BRAND.parent,
  category: 'finance',
  keywords: [
    BRAND.name,
    BRAND.parent,
    'wealth intelligence',
    'life balance sheet',
    'net worth tracker',
    'asset ledger',
    'personal finance',
    'subscription tracker',
    'scenario planning',
    'home inventory',
  ],
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: BRAND.url,
    siteName: BRAND.full,
    locale: 'en_US',
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Structured data — keeps claims conservative (Organization + WebSite only).
const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: BRAND.parent,
      url: 'https://ailiur.com',
      brand: { '@type': 'Brand', name: BRAND.name },
    },
    {
      '@type': 'WebSite',
      name: BRAND.full,
      url: BRAND.url,
      description: DESCRIPTION,
      inLanguage: 'en',
      publisher: { '@type': 'Organization', name: BRAND.parent, url: 'https://ailiur.com' },
    },
  ],
};

export default function OruvoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <OruvoShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <OruvoNav />
      {children}
    </OruvoShell>
  );
}
