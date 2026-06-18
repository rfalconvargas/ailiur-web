import 'server-only';
import { createAdminClient } from '@/utils/supabase/admin';

/**
 * Founder onboarding persistence — the single seam between the survey API route
 * and the database. Swap the backing store by reimplementing these functions.
 *
 * Backed today by Supabase using the service-role admin client, writing
 * supabase/migrations/0006_founder_onboarding.sql.
 *
 * If Supabase isn't configured (no service-role key), saving no-ops and returns
 * `false` so the route can still show the thank-you state without persisting.
 */

export type FounderOnboardingInput = {
  email: string | null;
  improveFirst: string[];
  biggestFriction: string | null;
  mostInterested: string | null;
  describeSelf: string[];
  worthPaying: string | null;
  canContact: string | null;
};

export function isOnboardingStoreConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Persist a survey response. Returns true if stored, false if the store is
 * unconfigured. Throws only on an unexpected database error.
 */
export async function saveFounderOnboarding(input: FounderOnboardingInput): Promise<boolean> {
  if (!isOnboardingStoreConfigured()) return false;

  const { error } = await createAdminClient()
    .from('founder_onboarding')
    .insert({
      email: input.email,
      improve_first: input.improveFirst,
      biggest_friction: input.biggestFriction,
      most_interested: input.mostInterested,
      describe_self: input.describeSelf,
      worth_paying: input.worthPaying,
      can_contact: input.canContact,
      responses: input,
    });

  if (error) throw new Error(`saveFounderOnboarding failed: ${error.message}`);
  return true;
}
