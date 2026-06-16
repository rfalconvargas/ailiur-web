import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    // Short-lived Supabase JWT minted from the Auth.js session (option B bridge)
    // so Postgres RLS sees auth.uid() = the user's id.
    supabaseAccessToken?: string;
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
  }
}
