import { NextResponse } from 'next/server';
import { getAccountOverview } from '@/lib/account/server';

/**
 * The canonical "who am I, across the Ailiur ecosystem" endpoint.
 *
 * Returns the signed-in user's Ailiur Account plus profile, connected login
 * providers, connected external data accounts, authorized apps, and granted
 * permissions. This is the read side of the Account Center and the contract
 * other Ailiur apps can call (with the shared session cookie) to learn about
 * the account.
 *
 * GET /api/account/me  ->  { authenticated: boolean, overview: AccountOverview | null }
 */
export async function GET() {
  const overview = await getAccountOverview();
  return NextResponse.json({
    authenticated: Boolean(overview),
    overview,
  });
}
