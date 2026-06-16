import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { auth } from '@/auth';

/**
 * Server Supabase client that acts AS the signed-in Auth.js user (option B).
 *
 * It attaches the session's Supabase JWT, so Postgres RLS policies evaluate
 * auth.uid() = the user's id. Requires SUPABASE_JWT_SECRET to be set (the
 * session callback only mints the token when it is). Falls back to the anon
 * role if there's no session/token.
 *
 * Use this (instead of ./server) whenever you read/write per-user data.
 */
export async function createAuthedClient() {
  const session = await auth();
  const token = session?.supabaseAccessToken;
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // no-op in Server Components
          }
        },
      },
      global: token ? { headers: { Authorization: `Bearer ${token}` } } : undefined,
    }
  );
}
