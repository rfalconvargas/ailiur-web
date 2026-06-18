import { NextResponse, type NextRequest } from 'next/server';
import { saveFounderOnboarding } from '@/lib/onboarding/store';
import {
  CAN_CONTACT_OPTIONS,
  DESCRIBE_SELF_OPTIONS,
  IMPROVE_FIRST_OPTIONS,
  MOST_INTERESTED_OPTIONS,
  TEXT_MAX,
} from '@/lib/onboarding/questions';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Keep only the submitted values that are in the allowed set (dedup, cap). */
function sanitizeMulti(value: unknown, allowed: readonly string[]): string[] {
  if (!Array.isArray(value)) return [];
  const set = new Set(allowed);
  return [...new Set(value.filter((v): v is string => typeof v === 'string' && set.has(v)))];
}

function sanitizeSingle(value: unknown, allowed: readonly string[]): string | null {
  return typeof value === 'string' && (allowed as readonly string[]).includes(value) ? value : null;
}

function sanitizeText(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim().slice(0, TEXT_MAX);
  return trimmed.length ? trimmed : null;
}

function sanitizeEmail(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const email = value.trim().toLowerCase();
  if (!email) return null;
  // Light format check — Stripe/Resend remain the real validators downstream.
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email.slice(0, 320) : null;
}

/**
 * POST /api/founder-onboarding
 *
 * Stores a founder onboarding survey response. All fields are optional; we
 * validate every value against the allowed option sets so nothing arbitrary is
 * persisted. The thank-you UX is shown regardless of whether a DB is wired up.
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  // Reject submissions where the user provided an email in an invalid format,
  // so we don't silently drop a contact they intended to give us.
  if (typeof body.email === 'string' && body.email.trim() && sanitizeEmail(body.email) === null) {
    return NextResponse.json({ error: 'Please enter a valid email, or leave it blank.' }, { status: 400 });
  }

  const input = {
    email: sanitizeEmail(body.email),
    improveFirst: sanitizeMulti(body.improveFirst, IMPROVE_FIRST_OPTIONS),
    biggestFriction: sanitizeText(body.biggestFriction),
    mostInterested: sanitizeSingle(body.mostInterested, MOST_INTERESTED_OPTIONS),
    describeSelf: sanitizeMulti(body.describeSelf, DESCRIBE_SELF_OPTIONS),
    worthPaying: sanitizeText(body.worthPaying),
    canContact: sanitizeSingle(body.canContact, CAN_CONTACT_OPTIONS),
  };

  try {
    const stored = await saveFounderOnboarding(input);
    return NextResponse.json({ ok: true, stored });
  } catch (err) {
    // Never block the user on a survey write — log and still return success so
    // the thank-you state shows. (Persistence is best-effort, non-critical.)
    console.error('[founder-onboarding] store error:', (err as Error).message);
    return NextResponse.json({ ok: true, stored: false });
  }
}
