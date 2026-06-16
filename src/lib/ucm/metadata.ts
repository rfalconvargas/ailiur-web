import type { Metadata } from 'next';
import { UCM_META } from './content';

/** Document title for search results and browser tabs. */
export const UCM_SEO_TITLE = 'Unified Context Mesh — Ailiur';

/** Meta description for search snippets. */
export const UCM_SEO_DESCRIPTION =
  'A private semantic memory layer that turns scattered AI exports into app-ready context across the Ailiur ecosystem.';

/** Open Graph / social preview title. */
export const UCM_OG_TITLE = 'Unified Context Mesh — The Hidden Layer Beneath Ailiur';

/** Open Graph / social preview description. */
export const UCM_OG_DESCRIPTION =
  'Import → Embed → Retrieve. A private, local-first context layer that makes the work you have already done instantly useful to every Ailiur app.';

const DEFAULT_SITE_ORIGIN = 'https://www.ailiur.com';
export const UCM_SUBDOMAIN_HOST = 'ucm.ailiur.com';
export const UCM_SUBDOMAIN_ORIGIN = `https://${UCM_SUBDOMAIN_HOST}`;

export type UcmMetadataOptions = {
  /** When served from ucm.ailiur.com */
  useSubdomainOrigin?: boolean;
};

/**
 * Resolved origin for absolute canonical and OG URLs.
 * Override with NEXT_PUBLIC_SITE_URL in production when known.
 */
export function getUcmSiteOrigin(options?: UcmMetadataOptions): URL {
  if (options?.useSubdomainOrigin) {
    return new URL(UCM_SUBDOMAIN_ORIGIN);
  }
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL;
  if (configured) {
    const href = configured.startsWith('http') ? configured : `https://${configured}`;
    return new URL(href);
  }
  return new URL(DEFAULT_SITE_ORIGIN);
}

/** Next.js metadata for the /ucm route. */
export function makeUcmMetadata(options?: UcmMetadataOptions): Metadata {
  const onSubdomain = options?.useSubdomainOrigin === true;
  const origin = getUcmSiteOrigin(options);
  const path = onSubdomain ? '/' : UCM_META.route;

  return {
    title: UCM_SEO_TITLE,
    description: UCM_SEO_DESCRIPTION,
    metadataBase: origin,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: UCM_OG_TITLE,
      description: UCM_OG_DESCRIPTION,
      type: 'website',
      url: path,
      siteName: 'Ailiur',
    },
    twitter: {
      card: 'summary_large_image',
      title: UCM_OG_TITLE,
      description: UCM_OG_DESCRIPTION,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
