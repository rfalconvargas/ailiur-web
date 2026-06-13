/**
 * Types for the Portfolio Readiness Score tool.
 */

export const SCORE_DISCLAIMER =
  'This is a preparation signal, not a hiring verdict.';

export const SCORE_EMPTY_STATE =
  'Describe a project you are proud of — or one in progress. Aptellum will offer a supportive studio critique.';

export type PortfolioScoreInput = {
  projectTitle: string;
  targetRole: string;
  projectDescription: string;
  targetCompany?: string;
};

export const DEFAULT_SCORE_INPUT: PortfolioScoreInput = {
  projectTitle: '',
  targetRole: '',
  projectDescription: '',
  targetCompany: '',
};

export type ScoreCategoryId =
  | 'problem-clarity'
  | 'role-alignment'
  | 'process-evidence'
  | 'outcome-evidence'
  | 'visual-story'
  | 'internship-relevance'
  | 'next-step-clarity';

export type CategoryScore = {
  id: ScoreCategoryId;
  label: string;
  score: number;
  /** Warm, constructive note for this dimension. */
  note: string;
};

export type AiFluencyCritique = {
  delegation: string;
  description: string;
  discernment: string;
  diligence: string;
};

export type PortfolioReadinessResult = {
  overallScore: number;
  categories: CategoryScore[];
  strongestSignal: string;
  biggestMissingPiece: string;
  recommendedRevision: string;
  suggestedHeadline: string;
  aiFluency: AiFluencyCritique;
  disclaimer: string;
};

export const CATEGORY_LABELS: Record<ScoreCategoryId, string> = {
  'problem-clarity': 'Problem clarity',
  'role-alignment': 'Role alignment',
  'process-evidence': 'Process evidence',
  'outcome-evidence': 'Outcome evidence',
  'visual-story': 'Visual / story strength',
  'internship-relevance': 'Internship relevance',
  'next-step-clarity': 'Next-step clarity',
};
