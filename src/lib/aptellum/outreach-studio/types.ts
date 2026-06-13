/**
 * Types for the Outreach Draft Studio.
 */

export const OUTREACH_DISCLAIMER =
  'Suggested drafts — personalize before sending. Not affiliated with any company named.';

export const OUTREACH_NOTE =
  'Outreach works best when the project is real, specific, and easy to review.';

export const OUTREACH_EMPTY_STATE =
  'Describe your project and who you are reaching out to. Aptellum will draft messages you can personalize — specific, calm, never desperate.';

export const RECIPIENT_OPTIONS = [
  { value: 'alumni-mentor', label: 'Alumni mentor' },
  { value: 'recruiter', label: 'Recruiter' },
  { value: 'creative-director', label: 'Creative director' },
  { value: 'professor', label: 'Professor' },
  { value: 'studio-founder', label: 'Studio founder' },
] as const;

export const TONE_OPTIONS = [
  { value: 'warm-concise', label: 'Warm and concise' },
  { value: 'polished-professional', label: 'Polished and professional' },
  { value: 'curious-humble', label: 'Curious and humble' },
  { value: 'direct-ambitious', label: 'Direct and ambitious' },
] as const;

export type RecipientType = (typeof RECIPIENT_OPTIONS)[number]['value'];
export type OutreachTone = (typeof TONE_OPTIONS)[number]['value'];

export type OutreachInput = {
  recipientType: RecipientType;
  targetCompany: string;
  targetRole: string;
  projectSummary: string;
  tone: OutreachTone;
};

export const DEFAULT_OUTREACH_INPUT: OutreachInput = {
  recipientType: 'alumni-mentor',
  targetCompany: '',
  targetRole: '',
  projectSummary: '',
  tone: 'warm-concise',
};

export type AiFluencyCoaching = {
  delegation: string;
  description: string;
  discernment: string;
  diligence: string;
};

export type ShortEmail = {
  subject: string;
  body: string;
};

export type OutreachDrafts = {
  linkedInNote: string;
  shortEmail: ShortEmail;
  followUpMessage: string;
  portfolioIntro: string;
  aiFluency: AiFluencyCoaching;
  note: string;
  disclaimer: string;
};

export const RECIPIENT_LABELS: Record<RecipientType, string> = {
  'alumni-mentor': 'alumni mentor',
  recruiter: 'recruiter',
  'creative-director': 'creative director',
  professor: 'professor',
  'studio-founder': 'studio founder',
};
