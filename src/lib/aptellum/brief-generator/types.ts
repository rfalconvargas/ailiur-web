/**
 * Types for the Dream Company Project Generator.
 * Swap `generateProjectBrief` implementation for an API call later —
 * keep this contract stable.
 */

export const TIME_OPTIONS = [
  { value: 'weekend-sprint', label: 'Weekend sprint' },
  { value: '2-weeks', label: '2 weeks' },
  { value: '4-weeks', label: '4 weeks' },
  { value: '8-weeks', label: '8 weeks' },
] as const;

export const SKILL_OPTIONS = [
  { value: 'early-student', label: 'Early student' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'graduating-student', label: 'Graduating student' },
] as const;

export type TimeAvailable = (typeof TIME_OPTIONS)[number]['value'];
export type SkillLevel = (typeof SKILL_OPTIONS)[number]['value'];

export type BriefGeneratorInput = {
  dreamCompany: string;
  targetRole: string;
  creativeInterests: string;
  timeAvailable: TimeAvailable;
  skillLevel: SkillLevel;
};

export type WeeklyPlanItem = {
  label: string;
  focus: string;
};

export type AiFluencyGuidance = {
  delegation: string;
  description: string;
  discernment: string;
  diligence: string;
};

export type ProjectBrief = {
  title: string;
  whyThisFits: string;
  projectChallenge: string;
  deliverables: string[];
  weeklyPlan: WeeklyPlanItem[];
  skillsPracticed: string[];
  portfolioStoryAngle: string;
  outreachAngle: string;
  aiFluency: AiFluencyGuidance;
  disclaimer: string;
};

export const BRIEF_DISCLAIMER =
  'Inspired brief. Not an official company assignment.';

export const BRIEF_EMPTY_STATE =
  'Choose a company and role. Aptellum will suggest a scoped project brief you can revise and make your own.';

export const COMPANY_SUGGESTIONS = [
  'Apple',
  'Nike',
  'A24',
  'IDEO',
  'Disney',
  'Mercury',
  'Colossal',
  'Figma',
  'The Met',
  'Pixar',
] as const;

export const ROLE_SUGGESTIONS = [
  'Product Design Intern',
  'Industrial Design Intern',
  'Motion Designer',
  'UX Designer',
  'Editorial Designer',
  'Creative Technologist',
  'Museum Experience Designer',
] as const;

export const INTEREST_SUGGESTIONS = [
  'accessibility',
  'storytelling',
  'interface design',
  'sustainability',
  'animation',
  'physical products',
  'education',
  'health',
  'finance',
  'visual culture',
] as const;

export const DEFAULT_BRIEF_INPUT: BriefGeneratorInput = {
  dreamCompany: '',
  targetRole: '',
  creativeInterests: '',
  timeAvailable: '4-weeks',
  skillLevel: 'intermediate',
};
