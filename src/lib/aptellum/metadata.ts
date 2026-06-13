import type { Metadata } from 'next';
import { APTELLUM_META } from './content';

/** Document title for search results and browser tabs. */
export const APTELLUM_SEO_TITLE =
  'Aptellum — The AI Co-op Studio for Creative Education';

/** Meta description for search snippets. */
export const APTELLUM_SEO_DESCRIPTION =
  'Aptellum helps students turn career goals into guided projects, portfolio evidence, outreach materials, and internship pathways.';

/** Open Graph / social preview title. */
export const APTELLUM_OG_TITLE = 'Aptellum — Build the work that gets you hired';

/** Open Graph / social preview description. */
export const APTELLUM_OG_DESCRIPTION =
  'An AI co-op studio for creative education, built by Ailiur.';

const DEFAULT_SITE_ORIGIN = 'https://www.ailiur.com';
export const APTELLUM_SUBDOMAIN_HOST = 'aptellum.ailiur.com';
export const APTELLUM_SUBDOMAIN_ORIGIN = `https://${APTELLUM_SUBDOMAIN_HOST}`;

export type AptellumMetadataOptions = {
  /** When served from aptellum.ailiur.com */
  useSubdomainOrigin?: boolean;
};

/**
 * Resolved origin for absolute canonical and OG URLs.
 * Override with NEXT_PUBLIC_SITE_URL in production when known.
 */
export function getAptellumSiteOrigin(options?: AptellumMetadataOptions): URL {
  if (options?.useSubdomainOrigin) {
    return new URL(APTELLUM_SUBDOMAIN_ORIGIN);
  }
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL;
  if (configured) {
    const href = configured.startsWith('http') ? configured : `https://${configured}`;
    return new URL(href);
  }
  return new URL(DEFAULT_SITE_ORIGIN);
}

/** Next.js metadata for the /aptellum route. */
export function makeAptellumMetadata(options?: AptellumMetadataOptions): Metadata {
  const onSubdomain = options?.useSubdomainOrigin === true;
  const origin = getAptellumSiteOrigin(options);
  const path = onSubdomain ? '/' : APTELLUM_META.route;

  return {
    title: APTELLUM_SEO_TITLE,
    description: APTELLUM_SEO_DESCRIPTION,
    metadataBase: origin,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: APTELLUM_OG_TITLE,
      description: APTELLUM_OG_DESCRIPTION,
      type: 'website',
      url: path,
      siteName: 'Ailiur',
    },
    twitter: {
      card: 'summary_large_image',
      title: APTELLUM_OG_TITLE,
      description: APTELLUM_OG_DESCRIPTION,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
