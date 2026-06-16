import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser-side Supabase client for data access (Client Components).
 * Uses the publishable key — safe to expose. Runs under RLS as the anon role
 * unless a Supabase session/JWT is present.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
