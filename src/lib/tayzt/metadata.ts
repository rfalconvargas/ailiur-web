import type { Metadata } from 'next';
import { TAYZT_META } from './content';

/** Document title for search results and browser tabs. */
export const TAYZT_SEO_TITLE =
  'Tayzt — Your Taste, Translated Onto the Timeline';

/** Meta description for search snippets. */
export const TAYZT_SEO_DESCRIPTION =
  'Tayzt is an AI-native atmosphere engine by Ailiur that turns raw creator footage into emotionally tuned, taste-aware media treatments.';

/** Open Graph / social preview title. */
export const TAYZT_OG_TITLE = 'Tayzt — Your Taste, Translated Onto the Timeline';

/** Open Graph / social preview description. */
export const TAYZT_OG_DESCRIPTION =
  'An AI-native atmosphere engine by Ailiur that turns raw creator footage into emotionally tuned, taste-aware media treatments.';

const DEFAULT_SITE_ORIGIN = 'https://www.ailiur.com';
export const TAYZT_SUBDOMAIN_HOST = 'tayzt.ailiur.com';
export const TAYZT_SUBDOMAIN_ORIGIN = `https://${TAYZT_SUBDOMAIN_HOST}`;

export type TayztMetadataOptions = {
  /** When served from tayzt.ailiur.com */
  useSubdomainOrigin?: boolean;
};

/**
 * Resolved origin for absolute canonical and OG URLs.
 * Override with NEXT_PUBLIC_SITE_URL in production when known.
 */
export function getTayztSiteOrigin(options?: TayztMetadataOptions): URL {
  if (options?.useSubdomainOrigin) {
    return new URL(TAYZT_SUBDOMAIN_ORIGIN);
  }
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL;
  if (configured) {
    const href = configured.startsWith('http') ? configured : `https://${configured}`;
    return new URL(href);
  }
  return new URL(DEFAULT_SITE_ORIGIN);
}

/** Next.js metadata for the /tayzt route. */
export function makeTayztMetadata(options?: TayztMetadataOptions): Metadata {
  const onSubdomain = options?.useSubdomainOrigin === true;
  const origin = getTayztSiteOrigin(options);
  const path = onSubdomain ? '/' : TAYZT_META.route;

  return {
    title: TAYZT_SEO_TITLE,
    description: TAYZT_SEO_DESCRIPTION,
    metadataBase: origin,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: TAYZT_OG_TITLE,
      description: TAYZT_OG_DESCRIPTION,
      type: 'website',
      url: path,
      siteName: 'Ailiur',
    },
    twitter: {
      card: 'summary_large_image',
      title: TAYZT_OG_TITLE,
      description: TAYZT_OG_DESCRIPTION,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
