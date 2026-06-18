import type { Metadata } from 'next';
import { DM_META } from './content';

export const DM_SEO_TITLE = 'Daymesh — See how your days shape your body | Ailiur';

export const DM_SEO_DESCRIPTION =
  'Daymesh connects your wearable biometrics with the hidden context in your camera roll — meals, screenshots, places, routines, and moments — to reveal what affects your sleep, recovery, energy, and focus. Local-first and private by default.';

export const DM_OG_TITLE = 'Daymesh — Your biometric camera roll';

export const DM_OG_DESCRIPTION =
  'Wearables show what happened to your body. Your camera roll holds why. Daymesh connects them — privately, on your device.';

const DEFAULT_SITE_ORIGIN = 'https://www.ailiur.com';
export const DM_SUBDOMAIN_HOST = 'daymesh.ailiur.com';
export const DM_SUBDOMAIN_ORIGIN = `https://${DM_SUBDOMAIN_HOST}`;

export type DmMetadataOptions = {
  /** When served from daymesh.ailiur.com */
  useSubdomainOrigin?: boolean;
};

/** Resolved origin for absolute canonical and OG URLs. */
export function getDmSiteOrigin(options?: DmMetadataOptions): URL {
  if (options?.useSubdomainOrigin) {
    return new URL(DM_SUBDOMAIN_ORIGIN);
  }
  const configured = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL;
  if (configured) {
    const href = configured.startsWith('http') ? configured : `https://${configured}`;
    return new URL(href);
  }
  return new URL(DEFAULT_SITE_ORIGIN);
}

/** Next.js metadata for the /daymesh route. */
export function makeDmMetadata(options?: DmMetadataOptions): Metadata {
  const onSubdomain = options?.useSubdomainOrigin === true;
  const origin = getDmSiteOrigin(options);
  const path = onSubdomain ? '/' : DM_META.route;

  return {
    title: DM_SEO_TITLE,
    description: DM_SEO_DESCRIPTION,
    metadataBase: origin,
    alternates: { canonical: path },
    openGraph: {
      title: DM_OG_TITLE,
      description: DM_OG_DESCRIPTION,
      type: 'website',
      url: path,
      siteName: 'Ailiur',
    },
    twitter: {
      card: 'summary_large_image',
      title: DM_OG_TITLE,
      description: DM_OG_DESCRIPTION,
    },
    robots: { index: true, follow: true },
  };
}
