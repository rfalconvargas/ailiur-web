/**
 * The Ailiur permission & context-type catalog.
 *
 * Permissions are simple `<domain>:<action>` scope strings stored as text in
 * app_context_permissions.permission and app_registry.{required,optional}_permissions.
 * Keeping them as strings (not an enum) is deliberate: new products can
 * introduce domains without a schema migration. This file is the canonical
 * registry of the well-known ones.
 */

export const PERMISSION_SCOPES = [
  // Profile
  'profile:read',
  'profile:write',
  // Cross-app context (the moat: one app reading another's context)
  'context:read',
  'context:write',
  // Domain-specific context
  'health_context:read',
  'learning_context:read',
  'finance_context:read',
  'calendar_context:read',
  'media_context:read',
  'creative_context:read',
  'project_context:read',
  // External connected data (via connected_accounts)
  'google_calendar:read',
  'google_gmail:read',
  'google_drive:read',
  // App-local data
  'app_data:read',
  'app_data:write',
] as const;

export type PermissionScope = (typeof PERMISSION_SCOPES)[number];

/** Well-known context types a source can read/write. Free-form by design. */
export const CONTEXT_TYPES = [
  'profile',
  'health_context',
  'learning_context',
  'finance_context',
  'calendar_context',
  'media_context',
  'creative_context',
  'project_context',
  'app_data',
] as const;

export type ContextType = (typeof CONTEXT_TYPES)[number];

/** Human-readable labels for the permission consent UI. */
export const PERMISSION_LABELS: Record<string, { title: string; blurb: string }> = {
  'profile:read': { title: 'Read your profile', blurb: 'Name, avatar, and basic account info.' },
  'profile:write': { title: 'Update your profile', blurb: 'Change name, avatar, or preferences.' },
  'context:read': { title: 'Read cross-app context', blurb: 'Use context from your other Ailiur apps.' },
  'context:write': { title: 'Contribute context', blurb: 'Add context other Ailiur apps can use.' },
  'health_context:read': { title: 'Read health context', blurb: 'Metabolic, energy, and biometric signals.' },
  'learning_context:read': { title: 'Read learning context', blurb: 'What you are studying and how you learn.' },
  'finance_context:read': { title: 'Read finance context', blurb: 'Your life balance sheet and goals.' },
  'calendar_context:read': { title: 'Read calendar context', blurb: 'Your routines and planned time.' },
  'media_context:read': { title: 'Read media context', blurb: 'What you watch, read, and listen to.' },
  'creative_context:read': { title: 'Read creative context', blurb: 'Your creative projects and treatments.' },
  'project_context:read': { title: 'Read project context', blurb: 'Your coding and project activity.' },
  'google_calendar:read': { title: 'Read Google Calendar', blurb: 'Events from your connected Google account.' },
  'google_gmail:read': { title: 'Read Gmail', blurb: 'Messages from your connected Google account.' },
  'google_drive:read': { title: 'Read Google Drive', blurb: 'Files from your connected Google account.' },
  'app_data:read': { title: 'Read app data', blurb: 'Data this app stores for you.' },
  'app_data:write': { title: 'Write app data', blurb: 'Save data inside this app.' },
};

export function permissionLabel(scope: string): { title: string; blurb: string } {
  return PERMISSION_LABELS[scope] ?? { title: scope, blurb: '' };
}
