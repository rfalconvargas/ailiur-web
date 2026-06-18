import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Server-ONLY Supabase client using the service-role key. Bypasses RLS.
 *
 * Use this for trusted, account-management writes that must run regardless of
 * the caller's session — e.g. bumping last_login_at on sign-in, or
 * provisioning rows in the Ailiur Account layer. NEVER import this into a
 * Client Component; the service-role key must never reach the browser.
 */
let cached: SupabaseClient | null = null;

export function createAdminClient(): SupabaseClient {
  if (cached) return cached;
  cached = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false },
    }
  );
  return cached;
}
