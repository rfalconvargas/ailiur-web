import type { AppCategory, AppStatus } from '@/lib/account/types';

/**
 * TypeScript mirror of the seeded `public.app_registry` rows
 * (supabase/migrations/0003_seed_app_registry.sql).
 *
 * This is a build-time catalog for the UI (e.g. the Workspace launcher and
 * marketing surfaces) so we don't need a DB round-trip to list apps. The
 * database table remains the source of truth at runtime — keep this in sync
 * when you add/seed an app.
 */

export interface AppCatalogEntry {
  slug: string;
  name: string;
  category: AppCategory;
  url: string;
  status: AppStatus;
  description: string;
  brandColor: string;
  contextTypes: string[];
}

export const APP_CATALOG: AppCatalogEntry[] = [
  { slug: 'ailiur', name: 'Ailiur', category: 'internal', url: 'https://www.ailiur.com', status: 'active', description: 'The Ailiur main site and Account Center.', brandColor: 'var(--ailiur-yellow)', contextTypes: ['profile'] },
  { slug: 'ucm', name: 'Unified Context Mesh', category: 'internal', url: 'https://ucm.ailiur.com', status: 'active', description: 'The context layer that lets one Ailiur app improve another, with consent.', brandColor: 'var(--accent-green)', contextTypes: ['profile', 'health_context', 'learning_context', 'finance_context', 'calendar_context'] },
  { slug: 'qetos', name: 'Qetos', category: 'consumer', url: 'https://qetos.ailiur.com', status: 'active', description: 'Metabolic & energy tracking — educational, never diagnostic.', brandColor: 'var(--ketofy)', contextTypes: ['health_context', 'app_data'] },
  { slug: 'enchiridion', name: 'Enchiridion', category: 'consumer', url: 'https://www.enchiridion.ailiur.com', status: 'active', description: 'Guided learning that adapts to how you actually learn.', brandColor: 'var(--enchiridion)', contextTypes: ['learning_context', 'app_data'] },
  { slug: 'oruvo', name: 'Oruvo', category: 'consumer', url: 'https://oruvo.ailiur.com', status: 'active', description: 'Your life balance sheet — assets, goals, and time ROI.', brandColor: 'var(--accent-green)', contextTypes: ['finance_context', 'app_data'] },
  { slug: 'retellum', name: 'Retellum', category: 'consumer', url: 'https://retellum.ailiur.com', status: 'active', description: 'Log-first media memory.', brandColor: 'var(--accent-red)', contextTypes: ['media_context', 'app_data'] },
  { slug: 'tayzt', name: 'Tayzt', category: 'consumer', url: 'https://tayzt.ailiur.com', status: 'active', description: 'Atmosphere & taste.', brandColor: 'var(--ketofy)', contextTypes: ['creative_context', 'app_data'] },
  { slug: 'daymesh', name: 'Daymesh', category: 'consumer', url: 'https://daymesh.ailiur.com', status: 'active', description: 'A biometric camera roll.', brandColor: 'var(--accent-green)', contextTypes: ['health_context', 'media_context', 'app_data'] },
  { slug: 'tellumetry', name: 'Tellumetry', category: 'consumer', url: 'https://tellumetry.ailiur.com', status: 'active', description: 'Calm agent & project telemetry.', brandColor: 'var(--accent-green)', contextTypes: ['project_context', 'app_data'] },
  { slug: 'ollune', name: 'Ollune', category: 'consumer', url: 'https://ollune.ailiur.com', status: 'active', description: 'The quiet AI OS layer.', brandColor: '#2b2b2b', contextTypes: ['profile', 'app_data'] },
  { slug: 'aptellum', name: 'Aptellum', category: 'consumer', url: 'https://aptellum.ailiur.com', status: 'active', description: 'Language fluency through real-world outreach.', brandColor: 'var(--accent-green)', contextTypes: ['learning_context', 'app_data'] },
  { slug: 'glyfra', name: 'Glyfra', category: 'consumer', url: 'https://glyfra.ailiur.com', status: 'active', description: 'Write ugly, ship organized — the paper computer.', brandColor: '#1a1a1a', contextTypes: ['creative_context', 'app_data'] },
  { slug: 'iris', name: 'Iris', category: 'consumer', url: 'https://iris.ailiur.com', status: 'coming_soon', description: 'Coming soon.', brandColor: 'var(--accent-green)', contextTypes: ['profile'] },
  { slug: 'civis', name: 'Civis', category: 'consumer', url: 'https://civis.ailiur.com', status: 'coming_soon', description: 'Coming soon.', brandColor: 'var(--accent-green)', contextTypes: ['profile'] },
  { slug: 'lociq', name: 'Lociq', category: 'consumer', url: 'https://lociq.ailiur.com', status: 'coming_soon', description: 'Civic intelligence for where you live.', brandColor: 'var(--accent-green)', contextTypes: ['profile'] },
  { slug: 'qetos-provider', name: 'Qetos Clinics', category: 'provider', url: 'https://qetosclinics.ailiur.com', status: 'active', description: 'Qetos for clinicians and care teams.', brandColor: 'var(--ketofy)', contextTypes: ['health_context'] },
  { slug: 'enchiridion-institution', name: 'Enchiridion Schools', category: 'institution', url: 'https://enchiridionschools.ailiur.com', status: 'active', description: 'Enchiridion for schools and districts.', brandColor: 'var(--enchiridion)', contextTypes: ['learning_context'] },
  { slug: 'oruvo-advisors', name: 'Oruvo Advisors', category: 'enterprise', url: 'https://oruvoadvisors.ailiur.com', status: 'active', description: 'A read-only client view for advisors.', brandColor: 'var(--accent-green)', contextTypes: ['finance_context'] },
];

export function getAppBySlug(slug: string): AppCatalogEntry | undefined {
  return APP_CATALOG.find((a) => a.slug === slug);
}
