import type { NextAuthConfig } from 'next-auth';
import { SignJWT } from 'jose';

/**
 * Shared, provider-less Auth.js config.
 *
 * This file is the "shared auth service" contract: every *.ailiur.com app
 * (Enchiridion, Qetos, Oruvo, …) should import this same config and the same
 * AUTH_SECRET so they can all read the JWT session from the cookie below.
 *
 * Keep this file free of Node-only deps (no DB adapter) so it stays usable in
 * the Edge runtime (e.g. middleware) on every subdomain.
 */

const useSecureCookies = process.env.NODE_ENV === 'production';

// In production set AUTH_COOKIE_DOMAIN=".ailiur.com" so the session cookie is
// shared across every subdomain. In local dev leave it unset (cookies on
// localhost cannot use a parent domain).
const cookieDomain = process.env.AUTH_COOKIE_DOMAIN || undefined;

export const authConfig = {
  trustHost: true,
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  // Real providers are added in auth.ts. Kept empty here so this config stays
  // edge-safe and shareable across subdomains that only need to *read* sessions.
  providers: [],
  cookies: {
    sessionToken: {
      // The cookie name must be identical across all subdomains.
      name: useSecureCookies ? '__Secure-authjs.session-token' : 'authjs.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        domain: cookieDomain,
      },
    },
  },
  callbacks: {
    // Put the DB user id on the token so every subdomain can identify the user.
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token?.id && session.user) session.user.id = token.id as string;

      // Option B: mint a Supabase-compatible JWT so RLS sees auth.uid() = user id.
      // Only runs if SUPABASE_JWT_SECRET is set; otherwise data clients stay anon.
      const jwtSecret = process.env.SUPABASE_JWT_SECRET;
      if (jwtSecret && session.user?.id) {
        session.supabaseAccessToken = await new SignJWT({
          sub: session.user.id,
          email: session.user.email ?? undefined,
          role: 'authenticated',
        })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('1h')
          .setAudience('authenticated')
          .sign(new TextEncoder().encode(jwtSecret));
      }
      return session;
    },
    // Allow post-login redirects to (a) the same origin — so relative targets
    // like "/dashboard" work in every environment including localhost — and
    // (b) any *.ailiur.com subdomain, so a subdomain can send users to
    // ailiur.com/login?callbackUrl=https://qetos.ailiur.com/…
    async redirect({ url, baseUrl }) {
      try {
        const target = new URL(url, baseUrl);
        const sameOrigin = target.origin === new URL(baseUrl).origin;
        const isAiliur =
          target.hostname === 'ailiur.com' || target.hostname.endsWith('.ailiur.com');
        if (sameOrigin || isAiliur) {
          return target.toString();
        }
      } catch {
        // fall through
      }
      return baseUrl;
    },
  },
} satisfies NextAuthConfig;

export default authConfig;
