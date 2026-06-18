/**
 * Canonical TypeScript types for the Ailiur Account system.
 *
 * These mirror the `public` tables created in
 * supabase/migrations/0002_ailiur_account_system.sql. Keep them in sync with
 * the schema (or generate from it later with `supabase gen types typescript`).
 */

export type AccountStatus = 'active' | 'pending' | 'suspended' | 'deleted';
export type OnboardingStatus = 'not_started' | 'in_progress' | 'completed';
export type AppCategory = 'consumer' | 'enterprise' | 'provider' | 'institution' | 'internal';
export type AppStatus = 'active' | 'coming_soon' | 'internal' | 'disabled';
export type ConnectionStatus = 'connected' | 'expired' | 'revoked' | 'error' | 'disconnected';
export type PermissionState = 'granted' | 'denied' | 'revoked' | 'pending';
export type AccessStatus = 'active' | 'invited' | 'pending' | 'revoked';
export type PrivacyLevel = 'local' | 'account' | 'cross_app' | 'shared' | 'public';

/** The canonical identity object — one per person, across every Ailiur app. */
export interface AiliurAccount {
  id: string;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
  handle: string | null;
  status: AccountStatus;
  onboarding_status: OnboardingStatus;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AccountProfile {
  account_id: string;
  full_name: string | null;
  pronouns: string | null;
  bio: string | null;
  locale: string | null;
  timezone: string | null;
  profile_metadata: Record<string, unknown>;
  privacy_metadata: Record<string, unknown>;
  consent_metadata: Record<string, unknown>;
  workspace_metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/** A login provider (Google/Apple/GitHub) attached to an account. */
export interface ExternalIdentity {
  id: string;
  account_id: string;
  provider: string;
  provider_account_id: string;
  provider_email: string | null;
  scopes: string[];
  connection_status: ConnectionStatus;
  is_primary_login: boolean;
  expires_at: string | null;
  last_refreshed_at: string | null;
  created_at: string;
  updated_at: string;
  // NOTE: access_token / refresh_token are intentionally omitted here — never
  // ship tokens to the client. Read them server-side only when needed.
}

/** An external DATA source (Google Calendar, Gmail, Notion…), not login. */
export interface ConnectedAccount {
  id: string;
  account_id: string;
  identity_id: string | null;
  provider: string;
  external_account_label: string | null;
  scopes: string[];
  connection_status: ConnectionStatus;
  metadata: Record<string, unknown>;
  last_synced_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AppRegistryEntry {
  id: string;
  slug: string;
  name: string;
  category: AppCategory;
  url: string | null;
  status: AppStatus;
  description: string | null;
  icon: string | null;
  brand_color: string | null;
  is_first_party: boolean;
  required_permissions: string[];
  optional_permissions: string[];
  context_types: string[];
  created_at: string;
  updated_at: string;
}

export interface UserAppAccess {
  id: string;
  account_id: string;
  app_id: string;
  access_status: AccessStatus;
  roles: string[];
  first_authorized_at: string;
  last_accessed_at: string | null;
}

export interface AppContextPermission {
  id: string;
  account_id: string;
  app_id: string;
  permission: string;
  state: PermissionState;
  granted_at: string | null;
  revoked_at: string | null;
  source: string | null;
}

export interface ContextSource {
  id: string;
  account_id: string;
  source_kind: 'app' | 'provider';
  app_id: string | null;
  connected_account_id: string | null;
  context_type: string;
  display_name: string | null;
  status: ConnectionStatus;
  last_synced_at: string | null;
}

export interface ContextRecord {
  id: string;
  account_id: string;
  context_source_id: string | null;
  source_app: string | null;
  context_type: string;
  title: string | null;
  summary: string | null;
  raw_metadata: Record<string, unknown>;
  normalized_metadata: Record<string, unknown>;
  privacy_level: PrivacyLevel;
  occurred_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AccountSession {
  id: string;
  account_id: string;
  user_agent: string | null;
  ip_address: string | null;
  origin_app_id: string | null;
  created_at: string;
  last_seen_at: string;
  expires_at: string | null;
  revoked_at: string | null;
}

/** Aggregated view returned by /api/account/me. */
export interface AccountOverview {
  account: AiliurAccount;
  profile: AccountProfile | null;
  identities: ExternalIdentity[];
  connectedAccounts: ConnectedAccount[];
  apps: (UserAppAccess & { app: AppRegistryEntry | null })[];
  permissions: AppContextPermission[];
}
