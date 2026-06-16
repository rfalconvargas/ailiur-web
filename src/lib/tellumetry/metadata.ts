import type { Metadata } from 'next';
import { TELLUMETRY_META } from './content';

/** Document title for search results and browser tabs. */
export const TELLUMETRY_SEO_TITLE = 'Tellumetry — AI Coding Agent Transparency';

/** Meta description for search snippets. */
export const TELLUMETRY_SEO_DESCRIPTION =
  'Tellumetry is an AI coding cockpit that estimates token cost, maps agent progress, previews risk, and notifies developers when their attention is needed.';

/** Open Graph / social preview title. */
export const TELLUMETRY_OG_TITLE = 'Tellumetry — AI Coding Agent Transparency';

/** Open Graph / social preview description. */
export const TELLUMETRY_OG_DESCRIPTION =
  'An AI coding cockpit that estimates token cost, maps agent progress, previews risk, and notifies developers when their attention is needed.';

const DEFAULT_SITE_ORIGIN = 'https://www.ailiur.com';
export const TELLUMETRY_SUBDOMAIN_HOST = 'tellumetry.ailiur.com';
export const TELLUMETRY_SUBDOMAIN_ORIGIN = `https://${TELLUMETRY_SUBDOMAIN_HOST}`;

export type TellumetryMetadataOptions = {
  /** When served from tellumetry.ailiur.com */
  useSubdomainOrigin?: boolean;
};

/**
 * Resolved origin for absolute canonical and OG URLs.
 * Override with NEXT_PUBLIC_SITE_URL in production when known.
 */
export function getTellumetrySiteOrigin(options?: TellumetryMetadataOptions): URL {
  if (options?.useSubdomainOrigin) {
    return new URL(TELLUMETRY_SUBDOMAIN_ORIGIN);
  }
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL;
  if (configured) {
    const href = configured.startsWith('http') ? configured : `https://${configured}`;
    return new URL(href);
  }
  return new URL(DEFAULT_SITE_ORIGIN);
}

/** Next.js metadata for the /tellumetry route. */
export function makeTellumetryMetadata(options?: TellumetryMetadataOptions): Metadata {
  const onSubdomain = options?.useSubdomainOrigin === true;
  const origin = getTellumetrySiteOrigin(options);
  const path = onSubdomain ? '/' : TELLUMETRY_META.route;

  return {
    title: TELLUMETRY_SEO_TITLE,
    description: TELLUMETRY_SEO_DESCRIPTION,
    metadataBase: origin,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: TELLUMETRY_OG_TITLE,
      description: TELLUMETRY_OG_DESCRIPTION,
      type: 'website',
      url: path,
      siteName: 'Ailiur',
    },
    twitter: {
      card: 'summary_large_image',
      title: TELLUMETRY_OG_TITLE,
      description: TELLUMETRY_OG_DESCRIPTION,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
