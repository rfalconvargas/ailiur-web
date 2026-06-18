/**
 * Founder onboarding questions — the single source of truth shared by the form
 * (rendering) and the API route (server-side validation). Option values are the
 * human-readable labels so stored data is self-describing.
 */

export const IMPROVE_FIRST_OPTIONS = [
  'Health',
  'Learning',
  'Focus',
  'Career',
  'Wealth',
  'Relationships',
  'Creative work',
  'Daily planning',
  'Personal memory/context',
  'Other',
] as const;

export const MOST_INTERESTED_OPTIONS = [
  'Goals and life planning',
  'Health and metabolism support',
  'Learning and research',
  'Focus and productivity',
  'Wealth/assets/workflows',
  'Creative operating system',
  'Not sure yet',
] as const;

export const DESCRIBE_SELF_OPTIONS = [
  'Student',
  'Creator',
  'Founder',
  'Designer',
  'Developer',
  'Researcher',
  'Health-focused user',
  'Professional/knowledge worker',
  'Other',
  'Prefer not to say',
] as const;

export const CAN_CONTACT_OPTIONS = ['Yes', 'Maybe', 'No'] as const;

/** Max characters accepted for free-text answers (server-enforced). */
export const TEXT_MAX = 2000;
