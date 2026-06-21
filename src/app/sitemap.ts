import type { MetadataRoute } from 'next';
import { APP_CATALOG } from '@/lib/account/app-registry';

const BASE = 'https://www.ailiur.com';

/**
 * Sitemap for the Ailiur parent site. Covers the public marketing routes plus
 * the live product pages/subdomains drawn from the app registry so search and
 * AI crawlers can discover the whole ecosystem from one place.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  // Core public marketing routes that live on the parent domain.
  const routes = [
    '',
    '/products',
    '/pricing',
    '/about',
    '/careers',
    '/partnerships',
    '/blog',
    '/faqs',
    '/help',
    '/contact',
    '/releases',
    '/platform/mesh',
    '/platform/core',
    '/platform/api',
    '/platform/security',
    '/terms',
    '/privacy',
    '/refund',
    // On-site product pages.
    '/ucm',
    '/oruvo',
    '/tayzt',
    '/tellumetry',
    '/retellum',
    '/daymesh',
    '/aptellum',
    '/ollune',
    '/lociq',
  ].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));

  // Live product subdomains (Qetos, Enchiridion, etc.) — first-party, indexable.
  const subdomains = APP_CATALOG.filter(
    (a) => a.category === 'consumer' && a.status === 'active',
  ).map((a) => ({
    url: a.url,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...routes, ...subdomains];
}
