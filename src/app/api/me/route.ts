import { NextResponse } from 'next/server';
import { auth } from '@/auth';

// Quick way to confirm the Auth.js session works after signing in.
// Visit /api/me — returns your user when logged in, or {authenticated:false}.
export async function GET() {
  const session = await auth();
  return NextResponse.json({
    authenticated: Boolean(session),
    user: session?.user ?? null,
  });
}
