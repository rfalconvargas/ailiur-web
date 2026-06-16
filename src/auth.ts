import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import authConfig from './auth.config';

/**
 * The full Auth.js instance for ailiur.com — the auth *origin* that runs the
 * Google OAuth flow and persists users/accounts into Supabase (next_auth schema).
 *
 * Subdomains that only need to read the session do NOT need the adapter or the
 * Google provider — they can call NextAuth(authConfig) with the shared
 * AUTH_SECRET and cookie settings from ./auth.config.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // Supabase service-role / secret key (server-only — never expose to client).
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
});
