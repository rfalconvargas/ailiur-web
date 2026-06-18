import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import authConfig from './auth.config';
import { recordSignIn } from '@/lib/account/mutations';
import { sendAiliurMagicLink } from '@/lib/auth/email';

/**
 * The full Auth.js instance for ailiur.com — the auth *origin*.
 *
 * Identity model ("Sign in with Ailiur"):
 *  • PRIMARY  — email magic link (Resend provider). Creates/resolves the
 *    canonical Ailiur Account. The user's identity IS their Ailiur Account.
 *  • SECONDARY — "Continue with Google" (kept because the original system was
 *    Google-only). Google is now an *attached* external identity, not the
 *    account. `allowDangerousEmailAccountLinking` lets a Google sign-in attach
 *    to an existing Ailiur Account with the same (Google-verified) email, so a
 *    user who signed up by email can later connect Google to the SAME account.
 *
 * Both providers persist into next_auth.* via the Supabase adapter; DB triggers
 * (migration 0002) mirror those into ailiur_accounts / external_identities.
 *
 * Subdomains that only need to read the session do NOT need the adapter or
 * these providers — they call NextAuth(authConfig) with the shared AUTH_SECRET.
 */
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // Supabase service-role / secret key (server-only — never expose to client).
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  // Magic-link emails route through Auth.js's verifyRequest/error pages.
  pages: { signIn: '/login', verifyRequest: '/verify-request', error: '/login' },
  providers: [
    Resend({
      // apiKey may be undefined in local dev — sendAiliurMagicLink falls back to
      // logging the link to the server console so the flow stays testable.
      apiKey: process.env.AUTH_RESEND_KEY,
      from: process.env.AUTH_EMAIL_FROM || 'Ailiur <onboarding@resend.dev>',
      sendVerificationRequest: sendAiliurMagicLink,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      // Google verifies email ownership, so attaching Google to an existing
      // same-email Ailiur Account is safe and is exactly the desired behavior.
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  events: {
    // After a successful sign-in, stamp last_login_at on the Ailiur Account.
    // The adapter has already written next_auth.users/accounts (which our DB
    // triggers mirror into ailiur_accounts/external_identities); this just
    // records the login time. Best-effort — never blocks auth.
    async signIn({ user }) {
      if (user?.id) await recordSignIn(user.id);
    },
  },
});
