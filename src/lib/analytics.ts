'use client';

/**
 * Thin, typed wrapper around Vercel Web Analytics custom events.
 *
 * `track` from `@vercel/analytics` is already safe to call when analytics is
 * not initialized (it no-ops outside production / when the script is blocked),
 * so this module just gives us a single typed surface and a stable event
 * vocabulary. Keep event names and prop shapes in sync with the report in
 * /outputs/ailiur_site_optimizer.
 */

import { track as vercelTrack } from '@vercel/analytics';

export type AnalyticsEvent =
  | { name: 'cta_click'; props: { id: string; location: string; label: string } }
  | { name: 'founder_tier_select'; props: { tier: string } }
  | { name: 'plan_select'; props: { plan: string; billing: 'monthly' | 'annual' } }
  | { name: 'ecosystem_product_click'; props: { slug: string; outcome: string } }
  | { name: 'launch_app'; props: { source: string } }
  | { name: 'faq_open'; props: { question: string } };

/** Fire a typed analytics event. Never throws; safe in any environment. */
export function track<E extends AnalyticsEvent>(name: E['name'], props: E['props']): void {
  try {
    vercelTrack(name, props);
  } catch {
    /* analytics must never break the UI */
  }
}
