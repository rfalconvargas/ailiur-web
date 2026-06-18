'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';
import { createAuthedClient } from '@/utils/supabase/authed';

/**
 * Server actions for the Ailiur Account: onboarding, profile, app access,
 * permissions, privacy, and connection management. All run as the signed-in
 * user through the authed Supabase client, so RLS scopes every write to that
 * account (account_id = next_auth.uid()).
 *
 * Each returns { ok: true } | { ok: false; error: string } so the UI can show
 * inline error states without throwing.
 */

type Result = { ok: true } | { ok: false; error: string };

const HANDLE_RE = /^[a-z0-9_]{3,30}$/;

async function requireAccountId(): Promise<string> {
  const session = await auth();
  const id = session?.user?.id;
  if (!id) throw new Error('Not authenticated');
  return id;
}

/** Resolve an app_registry id from a slug (authed read; registry is public). */
async function appIdForSlug(
  supabase: Awaited<ReturnType<typeof createAuthedClient>>,
  slug: string
): Promise<string | null> {
  const { data } = await supabase.from('app_registry').select('id').eq('slug', slug).maybeSingle();
  return (data as { id: string } | null)?.id ?? null;
}

/** Step 1 — profile basics. Marks onboarding in_progress. */
export async function saveProfileStep(input: {
  displayName: string;
  fullName?: string;
  avatarUrl?: string;
}): Promise<Result> {
  try {
    const accountId = await requireAccountId();
    const displayName = input.displayName.trim();
    if (!displayName) return { ok: false, error: 'Display name is required.' };

    const supabase = await createAuthedClient();

    const { error: accErr } = await supabase
      .from('ailiur_accounts')
      .update({
        display_name: displayName,
        avatar_url: input.avatarUrl?.trim() || null,
        onboarding_status: 'in_progress',
      })
      .eq('id', accountId);
    if (accErr) return { ok: false, error: accErr.message };

    const { error: profErr } = await supabase
      .from('account_profiles')
      .upsert(
        { account_id: accountId, full_name: input.fullName?.trim() || displayName },
        { onConflict: 'account_id' }
      );
    if (profErr) return { ok: false, error: profErr.message };

    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

/** Step 2 — which Ailiur apps the user is interested in. */
export async function saveAppInterests(slugs: string[]): Promise<Result> {
  try {
    const accountId = await requireAccountId();
    const supabase = await createAuthedClient();

    if (slugs.length === 0) return { ok: true };

    const { data: apps, error: regErr } = await supabase
      .from('app_registry')
      .select('id, slug')
      .in('slug', slugs);
    if (regErr) return { ok: false, error: regErr.message };

    const rows = (apps ?? []).map((a: { id: string }) => ({
      account_id: accountId,
      app_id: a.id,
      access_status: 'active' as const,
    }));
    if (rows.length === 0) return { ok: true };

    const { error } = await supabase
      .from('user_app_access')
      .upsert(rows, { onConflict: 'account_id,app_id' });
    if (error) return { ok: false, error: error.message };

    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

/**
 * Step 4 — privacy & consent. Defaults are intentionally CONSERVATIVE:
 * cross-app context sharing is OFF until the user explicitly turns it on.
 */
export async function savePrivacyConsent(input: {
  allowCrossAppContext: boolean;
  acceptedTerms: boolean;
}): Promise<Result> {
  try {
    const accountId = await requireAccountId();
    if (!input.acceptedTerms) return { ok: false, error: 'Please accept the terms to continue.' };

    const supabase = await createAuthedClient();
    const now = new Date().toISOString();

    const { error } = await supabase
      .from('account_profiles')
      .upsert(
        {
          account_id: accountId,
          privacy_metadata: {
            cross_app_context: input.allowCrossAppContext ? 'enabled' : 'disabled',
            default_privacy_level: 'account',
            local_first: true,
          },
          consent_metadata: {
            terms_accepted_at: now,
            cross_app_context_consent: input.allowCrossAppContext,
            marketing: false,
            research: false,
          },
        },
        { onConflict: 'account_id' }
      );
    if (error) return { ok: false, error: error.message };

    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

/** Final — mark onboarding complete. */
export async function completeOnboarding(): Promise<Result> {
  try {
    const accountId = await requireAccountId();
    const supabase = await createAuthedClient();
    const { error } = await supabase
      .from('ailiur_accounts')
      .update({ onboarding_status: 'completed' })
      .eq('id', accountId);
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

/**
 * Account Center — full profile edit. (Onboarding's saveProfileStep is the
 * minimal version; this is the richer settings form.)
 */
export async function updateProfile(input: {
  displayName: string;
  fullName?: string;
  handle?: string;
  avatarUrl?: string;
  pronouns?: string;
  bio?: string;
  locale?: string;
  timezone?: string;
}): Promise<Result> {
  try {
    const accountId = await requireAccountId();
    const displayName = input.displayName.trim();
    if (!displayName) return { ok: false, error: 'Display name is required.' };

    const handle = input.handle?.trim().toLowerCase() || undefined;
    if (handle && !HANDLE_RE.test(handle)) {
      return { ok: false, error: 'Handle must be 3–30 chars: lowercase letters, numbers, or _.' };
    }

    const supabase = await createAuthedClient();

    const { error: accErr } = await supabase
      .from('ailiur_accounts')
      .update({
        display_name: displayName,
        avatar_url: input.avatarUrl?.trim() || null,
        handle: handle ?? null,
      })
      .eq('id', accountId);
    if (accErr) {
      // 23505 = unique_violation (handle already taken).
      if ((accErr as { code?: string }).code === '23505') {
        return { ok: false, error: 'That handle is already taken.' };
      }
      return { ok: false, error: accErr.message };
    }

    const { error: profErr } = await supabase.from('account_profiles').upsert(
      {
        account_id: accountId,
        full_name: input.fullName?.trim() || displayName,
        pronouns: input.pronouns?.trim() || null,
        bio: input.bio?.trim() || null,
        locale: input.locale?.trim() || 'en-US',
        timezone: input.timezone?.trim() || 'UTC',
      },
      { onConflict: 'account_id' }
    );
    if (profErr) return { ok: false, error: profErr.message };

    revalidatePath('/account');
    revalidatePath('/account/profile');
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

/** Connect (or re-activate) an Ailiur app to the account. */
export async function setAppAccess(slug: string, status: 'active' | 'revoked'): Promise<Result> {
  try {
    const accountId = await requireAccountId();
    const supabase = await createAuthedClient();
    const appId = await appIdForSlug(supabase, slug);
    if (!appId) return { ok: false, error: 'Unknown app.' };

    const { error } = await supabase.from('user_app_access').upsert(
      {
        account_id: accountId,
        app_id: appId,
        access_status: status,
      },
      { onConflict: 'account_id,app_id' }
    );
    if (error) return { ok: false, error: error.message };

    revalidatePath('/account/apps');
    revalidatePath('/account');
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

/** Record interest in a not-yet-available app (waitlist/coming-soon). */
export async function requestAppAccess(slug: string): Promise<Result> {
  try {
    const accountId = await requireAccountId();
    const supabase = await createAuthedClient();
    const appId = await appIdForSlug(supabase, slug);
    if (!appId) return { ok: false, error: 'Unknown app.' };

    const { error } = await supabase.from('user_app_access').upsert(
      { account_id: accountId, app_id: appId, access_status: 'pending' },
      { onConflict: 'account_id,app_id' }
    );
    if (error) return { ok: false, error: error.message };

    revalidatePath('/account/apps');
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

/**
 * Grant or revoke a single permission scope for an app (the consent layer).
 * Backed by app_context_permissions (unique on account_id, app_id, permission).
 */
export async function setAppPermission(
  slug: string,
  permission: string,
  granted: boolean
): Promise<Result> {
  try {
    const accountId = await requireAccountId();
    const supabase = await createAuthedClient();
    const appId = await appIdForSlug(supabase, slug);
    if (!appId) return { ok: false, error: 'Unknown app.' };

    const now = new Date().toISOString();
    const { error } = await supabase.from('app_context_permissions').upsert(
      {
        account_id: accountId,
        app_id: appId,
        permission,
        state: granted ? 'granted' : 'revoked',
        granted_at: granted ? now : null,
        revoked_at: granted ? null : now,
        source: 'account_center',
      },
      { onConflict: 'account_id,app_id,permission' }
    );
    if (error) return { ok: false, error: error.message };

    revalidatePath('/account/privacy');
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

/**
 * Account-level privacy/consent flags stored in account_profiles JSON bags.
 * Keys: 'cross_app_personalization', 'product_analytics',
 * 'google_calendar_context', plus named cross-app pairings (e.g.
 * 'qetos_uses_daymesh'). Conservative-by-default lives in the UI; this just
 * persists the user's explicit choice.
 */
export async function setAccountFlag(key: string, value: boolean): Promise<Result> {
  try {
    const accountId = await requireAccountId();
    const supabase = await createAuthedClient();

    // Read current privacy_metadata, merge, write back (JSON bag).
    const { data: prof } = await supabase
      .from('account_profiles')
      .select('privacy_metadata')
      .maybeSingle();
    const current = ((prof as { privacy_metadata?: Record<string, unknown> } | null)
      ?.privacy_metadata ?? {}) as Record<string, unknown>;

    const next = { ...current, [key]: value };
    const { error } = await supabase
      .from('account_profiles')
      .upsert({ account_id: accountId, privacy_metadata: next }, { onConflict: 'account_id' });
    if (error) return { ok: false, error: error.message };

    revalidatePath('/account/privacy');
    revalidatePath('/account');
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

/**
 * Delete all of the account's context records (the user owns their context).
 * Real, RLS-scoped delete. Context SOURCES (the registry) are kept; only the
 * records are cleared. Returns ok even if there were none.
 */
export async function deleteAllContext(): Promise<Result> {
  try {
    const accountId = await requireAccountId();
    const supabase = await createAuthedClient();
    const { error } = await supabase.from('context_records').delete().eq('account_id', accountId);
    if (error) return { ok: false, error: error.message };
    revalidatePath('/account/context');
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

/**
 * Disconnect Google: mark the external identity revoked and drop any Google
 * data connections. Does NOT delete the next_auth.accounts row (the adapter
 * owns it) — this is the Ailiur-layer view of the connection. Handles the
 * "revoked Google connection" requirement.
 */
export async function disconnectGoogle(): Promise<Result> {
  try {
    const accountId = await requireAccountId();
    const supabase = await createAuthedClient();

    const { error } = await supabase
      .from('external_identities')
      .update({ connection_status: 'revoked' })
      .eq('account_id', accountId)
      .eq('provider', 'google');
    if (error) return { ok: false, error: error.message };

    await supabase
      .from('connected_accounts')
      .update({ connection_status: 'revoked' })
      .eq('account_id', accountId)
      .like('provider', 'google%');

    revalidatePath('/account/connections');
    revalidatePath('/account');
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}
