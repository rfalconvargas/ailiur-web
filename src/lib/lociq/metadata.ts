import type { Metadata } from 'next';
import { LOCIQ_META } from './content';

/** Document title for search results and browser tabs. */
export const LOCIQ_SEO_TITLE = 'Lociq — Turn Local Frustration Into Civic Action';

/** Meta description for search snippets. */
export const LOCIQ_SEO_DESCRIPTION =
  'Lociq is the civic layer of the Ailiur stack — a digital town hall that helps residents report neighborhood problems, understand civic options, vote on practical solutions, and organize visible next steps.';

/** Open Graph / social preview title. */
export const LOCIQ_OG_TITLE = 'Lociq — A Digital Town Hall That Actually Does Something';

/** Open Graph / social preview description. */
export const LOCIQ_OG_DESCRIPTION =
  'From complaint to coordinated action. Report, understand, vote, and organize — non-partisan civic intelligence for your neighborhood, by Ailiur.';

const DEFAULT_SITE_ORIGIN = 'https://www.ailiur.com';
export const LOCIQ_SUBDOMAIN_HOST = 'lociq.ailiur.com';
export const LOCIQ_SUBDOMAIN_ORIGIN = `https://${LOCIQ_SUBDOMAIN_HOST}`;

export type LociqMetadataOptions = {
  /** When served from lociq.ailiur.com */
  useSubdomainOrigin?: boolean;
};

/**
 * Resolved origin for absolute canonical and OG URLs.
 * Override with NEXT_PUBLIC_SITE_URL in production when known.
 */
export function getLociqSiteOrigin(options?: LociqMetadataOptions): URL {
  if (options?.useSubdomainOrigin) {
    return new URL(LOCIQ_SUBDOMAIN_ORIGIN);
  }
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL;
  if (configured) {
    const href = configured.startsWith('http') ? configured : `https://${configured}`;
    return new URL(href);
  }
  return new URL(DEFAULT_SITE_ORIGIN);
}

/** Next.js metadata for the /lociq route. */
export function makeLociqMetadata(options?: LociqMetadataOptions): Metadata {
  const onSubdomain = options?.useSubdomainOrigin === true;
  const origin = getLociqSiteOrigin(options);
  const path = onSubdomain ? '/' : LOCIQ_META.route;

  return {
    title: LOCIQ_SEO_TITLE,
    description: LOCIQ_SEO_DESCRIPTION,
    metadataBase: origin,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: LOCIQ_OG_TITLE,
      description: LOCIQ_OG_DESCRIPTION,
      type: 'website',
      url: path,
      siteName: 'Ailiur',
    },
    twitter: {
      card: 'summary_large_image',
      title: LOCIQ_OG_TITLE,
      description: LOCIQ_OG_DESCRIPTION,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
