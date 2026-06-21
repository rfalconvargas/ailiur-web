/**
 * The Ailiur ecosystem, organized as five outcome domains.
 *
 * This is the homepage's organizing frame: rather than a flat list of ~14 apps,
 * the company is presented as AI-first *outcome engines* across Learning,
 * Health, Creativity, Personal Intelligence, and Work — with the Unified
 * Context Mesh as the connective layer beneath all of them.
 *
 * Product facts (name / description / status / brand color / subdomain) come
 * from the single source of truth, `APP_CATALOG` in
 * `@/lib/account/app-registry`. This file only adds the editorial grouping and
 * the on-site marketing route (when one exists) — it never re-states product
 * data that already lives in the registry.
 */

import { APP_CATALOG, getAppBySlug, type AppCatalogEntry } from '@/lib/account/app-registry';

/** On-site marketing routes that exist under src/app. When absent we fall back
 *  to the product's subdomain from the registry (e.g. Qetos / Enchiridion). */
const ONSITE_ROUTE: Record<string, string> = {
  ucm: '/ucm',
  oruvo: '/oruvo',
  tayzt: '/tayzt',
  tellumetry: '/tellumetry',
  retellum: '/retellum',
  daymesh: '/daymesh',
  aptellum: '/aptellum',
  ollune: '/ollune',
  lociq: '/lociq',
};

export interface EcosystemProduct {
  slug: string;
  name: string;
  description: string;
  status: AppCatalogEntry['status'];
  brandColor: string;
  /** Where a card should link — on-site page if we have one, else subdomain.
   *  `null` for products that aren't live yet (status === 'coming_soon'). */
  href: string | null;
}

export interface Outcome {
  id: string;
  /** One-word domain shown as the eyebrow on a card. */
  domain: string;
  /** The outcome the engine produces — the card headline. */
  headline: string;
  /** Plain-language promise for the domain. */
  description: string;
  /** Registry slugs: first is the lead product, rest are supporting. */
  productSlugs: string[];
}

/** Five outcome domains covering the 8 core products. */
export const OUTCOMES: Outcome[] = [
  {
    id: 'learning',
    domain: 'Learning',
    headline: 'Learn faster, remember longer.',
    description:
      'Guided learning that adapts to how you actually learn — then turns real-world practice into fluency.',
    productSlugs: ['enchiridion', 'aptellum'],
  },
  {
    id: 'health',
    domain: 'Health',
    headline: 'Understand your body’s signals.',
    description:
      'Educational metabolic and energy tracking that turns wearable noise into a story you can act on.',
    productSlugs: ['qetos', 'daymesh'],
  },
  {
    id: 'creativity',
    domain: 'Creativity',
    headline: 'Turn taste into output.',
    description:
      'An atmosphere engine for creators, plus a reflective media graph that maps what shaped you.',
    productSlugs: ['tayzt', 'retellum'],
  },
  {
    id: 'personal-intelligence',
    domain: 'Personal intelligence',
    headline: 'See your whole life clearly.',
    description:
      'Your life balance sheet — assets, goals, and time ROI — with a personal intelligence layer on top.',
    productSlugs: ['oruvo', 'iris'],
  },
  {
    id: 'work',
    domain: 'Work',
    headline: 'Ship with calm telemetry.',
    description:
      'Quiet, trustworthy telemetry around your AI agents and projects — so you steer instead of babysit.',
    productSlugs: ['tellumetry', 'civis'],
  },
];

/** The connective layer — featured on its own, not as a sixth column. */
export const CONTEXT_MESH = getAppBySlug('ucm')!;

/** The 8 core products this site explains, in canonical order. */
export const CORE_SLUGS = [
  'qetos',
  'enchiridion',
  'oruvo',
  'tayzt',
  'tellumetry',
  'iris',
  'civis',
  'ucm',
] as const;

/** Resolve a registry slug into a homepage-ready product object. */
export function resolveProduct(slug: string): EcosystemProduct | null {
  const app = getAppBySlug(slug);
  if (!app) return null;
  const live = app.status !== 'coming_soon';
  return {
    slug: app.slug,
    name: app.name,
    description: app.description,
    status: app.status,
    brandColor: app.brandColor,
    href: live ? ONSITE_ROUTE[slug] ?? app.url : null,
  };
}

/** Outcomes with their products fully resolved — convenient for rendering. */
export function getOutcomesWithProducts() {
  return OUTCOMES.map((o) => ({
    ...o,
    products: o.productSlugs
      .map(resolveProduct)
      .filter((p): p is EcosystemProduct => p !== null),
  }));
}

/** Every consumer app, grouped lead-first — used by the full /products index. */
export function getAllConsumerProducts(): EcosystemProduct[] {
  return APP_CATALOG.filter((a) => a.category === 'consumer')
    .map((a) => resolveProduct(a.slug))
    .filter((p): p is EcosystemProduct => p !== null);
}
