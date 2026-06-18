import 'server-only';
import { createAdminClient } from '@/utils/supabase/admin';

/**
 * Trusted, service-role account mutations. Kept in a module that does NOT
 * import `@/auth` so it can be used from inside the Auth.js config (auth.ts)
 * without creating an import cycle.
 */

/**
 * Bump last_login_at and defensively touch the Ailiur Account on sign-in.
 * Called from the Auth.js `signIn` event. Best-effort — a failure here must
 * never block authentication.
 */
export async function recordSignIn(userId: string): Promise<void> {
  try {
    const admin = createAdminClient();
    const { error } = await admin
      .from('ailiur_accounts')
      .update({ last_login_at: new Date().toISOString() })
      .eq('id', userId);
    // If the row doesn't exist yet, this affects 0 rows; the next_auth.users
    // trigger creates it. We avoid an upsert to keep next_auth as the source
    // of truth for identity.
    if (error) console.warn('[recordSignIn] could not update last_login_at:', error.message);
  } catch (err) {
    console.warn('[recordSignIn] skipped:', (err as Error).message);
  }
}
