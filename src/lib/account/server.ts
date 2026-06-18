import 'server-only';
import { auth } from '@/auth';
import { createAuthedClient } from '@/utils/supabase/authed';
import { createClient } from '@/utils/supabase/server';
import type {
  AccountOverview,
  AccountProfile,
  AccountSession,
  AiliurAccount,
  AppContextPermission,
  AppRegistryEntry,
  ConnectedAccount,
  ContextRecord,
  ContextSource,
  ExternalIdentity,
  UserAppAccess,
} from '@/lib/account/types';

/**
 * Server-side data layer for the Ailiur Account system.
 *
 * Reads run through the AUTHED Supabase client (Option B JWT), so Postgres RLS
 * scopes every query to the signed-in account automatically — these functions
 * never take an accountId, they always mean "the current user". The app
 * registry is a public catalog and uses the plain (anon) client.
 */

const IDENTITY_COLUMNS =
  'id, account_id, provider, provider_account_id, provider_email, scopes, connection_status, is_primary_login, expires_at, last_refreshed_at, created_at, updated_at';

/** The canonical Ailiur Account for the signed-in user (or null if signed out). */
export async function getAiliurAccount(): Promise<AiliurAccount | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  const supabase = await createAuthedClient();
  const { data } = await supabase
    .from('ailiur_accounts')
    .select('*')
    .eq('id', session.user.id)
    .maybeSingle();

  return (data as AiliurAccount) ?? null;
}

export async function getAccountProfile(): Promise<AccountProfile | null> {
  const supabase = await createAuthedClient();
  const { data } = await supabase.from('account_profiles').select('*').maybeSingle();
  return (data as AccountProfile) ?? null;
}

/** Connected login providers (Google/Apple/…). Tokens are never selected here. */
export async function getExternalIdentities(): Promise<ExternalIdentity[]> {
  const supabase = await createAuthedClient();
  const { data } = await supabase
    .from('external_identities')
    .select(IDENTITY_COLUMNS)
    .order('is_primary_login', { ascending: false });
  return (data as ExternalIdentity[]) ?? [];
}

/** External data connections (Google Calendar, Gmail, Notion…). */
export async function getConnectedAccounts(): Promise<ConnectedAccount[]> {
  const supabase = await createAuthedClient();
  const { data } = await supabase.from('connected_accounts').select('*');
  return (data as ConnectedAccount[]) ?? [];
}

/** The public app catalog (works signed-out). */
export async function getAppRegistry(): Promise<AppRegistryEntry[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('app_registry')
    .select('*')
    .order('category', { ascending: true })
    .order('name', { ascending: true });
  return (data as AppRegistryEntry[]) ?? [];
}

/** Apps the signed-in user has connected, joined to their registry entry. */
export async function getAuthorizedApps(): Promise<
  (UserAppAccess & { app: AppRegistryEntry | null })[]
> {
  const supabase = await createAuthedClient();
  const { data } = await supabase
    .from('user_app_access')
    .select('*, app:app_registry(*)');
  return (data as (UserAppAccess & { app: AppRegistryEntry | null })[]) ?? [];
}

export async function getAppPermissions(): Promise<AppContextPermission[]> {
  const supabase = await createAuthedClient();
  const { data } = await supabase.from('app_context_permissions').select('*');
  return (data as AppContextPermission[]) ?? [];
}

/** Registered context sources for the signed-in account. */
export async function getContextSources(): Promise<ContextSource[]> {
  const supabase = await createAuthedClient();
  const { data } = await supabase
    .from('context_sources')
    .select('*')
    .order('context_type', { ascending: true });
  return (data as ContextSource[]) ?? [];
}

/** Recent normalized context records (never selects raw private payloads in bulk). */
export async function getContextRecords(limit = 20): Promise<ContextRecord[]> {
  const supabase = await createAuthedClient();
  const { data } = await supabase
    .from('context_records')
    .select(
      'id, account_id, context_source_id, source_app, context_type, title, summary, privacy_level, occurred_at, created_at, updated_at'
    )
    .order('created_at', { ascending: false })
    .limit(limit);
  // raw_metadata / normalized_metadata are intentionally omitted from list reads.
  return (data as ContextRecord[]) ?? [];
}

/** Active (non-revoked) device/session ledger rows. */
export async function getAccountSessions(): Promise<AccountSession[]> {
  const supabase = await createAuthedClient();
  const { data } = await supabase
    .from('account_sessions')
    .select('*')
    .is('revoked_at', null)
    .order('last_seen_at', { ascending: false });
  return (data as AccountSession[]) ?? [];
}

/** Everything the Account Center needs in one shot. */
export async function getAccountOverview(): Promise<AccountOverview | null> {
  const account = await getAiliurAccount();
  if (!account) return null;

  const [profile, identities, connectedAccounts, apps, permissions] = await Promise.all([
    getAccountProfile(),
    getExternalIdentities(),
    getConnectedAccounts(),
    getAuthorizedApps(),
    getAppPermissions(),
  ]);

  return { account, profile, identities, connectedAccounts, apps, permissions };
}

// Re-exported for convenience; defined in a separate, @/auth-free module to
// avoid an import cycle when used inside the Auth.js config.
export { recordSignIn } from '@/lib/account/mutations';
