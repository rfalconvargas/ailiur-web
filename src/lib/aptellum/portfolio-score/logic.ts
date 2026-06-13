/**
 * Deterministic portfolio readiness heuristics.
 * Replace `assessPortfolioReadiness` with an API call when ready.
 */

import {
  CATEGORY_LABELS,
  SCORE_DISCLAIMER,
  type AiFluencyCritique,
  type CategoryScore,
  type PortfolioReadinessResult,
  type PortfolioScoreInput,
  type ScoreCategoryId,
} from './types';

// ─── Text helpers ──────────────────────────────────────────────────────────────

function normalize(text: string): string {
  return text.trim().toLowerCase();
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function countKeywords(text: string, keywords: readonly string[]): number {
  const lower = normalize(text);
  return keywords.filter((k) => lower.includes(k)).length;
}

function clamp(n: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, Math.round(n)));
}

function lengthAdjustment(words: number): number {
  if (words < 25) return -22;
  if (words < 45) return -12;
  if (words < 70) return -4;
  if (words >= 120) return 6;
  return 0;
}

// ─── Keyword sets ────────────────────────────────────────────────────────────────

const SIGNAL_WORDS = [
  'problem',
  'user',
  'research',
  'prototype',
  'tested',
  'outcome',
  'metric',
  'constraint',
  'iteration',
] as const;

const CATEGORY_KEYWORDS: Record<ScoreCategoryId, readonly string[]> = {
  'problem-clarity': [
    'problem',
    'challenge',
    'need',
    'why',
    'user',
    'audience',
    'goal',
    'framing',
    'context',
  ],
  'role-alignment': [
    'design',
    'ux',
    'product',
    'motion',
    'illustration',
    'architecture',
    'creative',
    'intern',
    'studio',
    'craft',
  ],
  'process-evidence': [
    'research',
    'sketch',
    'wireframe',
    'prototype',
    'iteration',
    'feedback',
    'critique',
    'explore',
    'tested',
    'usability',
    'process',
  ],
  'outcome-evidence': [
    'outcome',
    'result',
    'impact',
    'metric',
    'delivered',
    'shipped',
    'final',
    'completed',
    'improved',
    'measure',
  ],
  'visual-story': [
    'case study',
    'narrative',
    'story',
    'visual',
    'typography',
    'layout',
    'presentation',
    'deck',
    'screens',
    'documentation',
  ],
  'internship-relevance': [
    'constraint',
    'stakeholder',
    'client',
    'brief',
    'deadline',
    'professional',
    'industry',
    'studio',
    'deliverable',
    'presentation',
  ],
  'next-step-clarity': [
    'next',
    'learn',
    'improve',
    'would',
    'future',
    'continue',
    'extend',
    'roadmap',
    'plan',
    'reflect',
  ],
};

// ─── Per-category scoring ────────────────────────────────────────────────────────

type ScoreResult = { score: number; note: string };

function baseKeywordScore(
  description: string,
  id: ScoreCategoryId,
  base = 38,
  pointsPerHit = 7,
  maxHits = 5,
): ScoreResult {
  const hits = countKeywords(description, CATEGORY_KEYWORDS[id]);
  const words = wordCount(description);
  let score = base + Math.min(hits, maxHits) * pointsPerHit + lengthAdjustment(words);

  // Global signal words give a small cross-category boost
  const signalHits = countKeywords(description, SIGNAL_WORDS);
  score += Math.min(signalHits, 4) * 2;

  score = clamp(score);

  const note =
    hits >= 3
      ? `Strong signals here — your description names ${hits} relevant cues for ${CATEGORY_LABELS[id].toLowerCase()}.`
      : hits >= 1
        ? `Some grounding present. One or two more specific details would strengthen ${CATEGORY_LABELS[id].toLowerCase()}.`
        : `This dimension could use clearer language — reviewers look for explicit evidence of ${CATEGORY_LABELS[id].toLowerCase()}.`;

  return { score, note };
}

function scoreRoleAlignment(description: string, role: string): ScoreResult {
  const desc = normalize(description);
  const roleNorm = normalize(role);
  const roleTokens = roleNorm.split(/[\s,/]+/).filter((t) => t.length > 3);

  let score = 35;
  const matched = roleTokens.filter((t) => desc.includes(t));
  score += matched.length * 12;

  if (roleNorm.length > 0 && desc.includes(roleNorm)) score += 15;

  const roleKeywordHits = countKeywords(description, CATEGORY_KEYWORDS['role-alignment']);
  score += Math.min(roleKeywordHits, 3) * 5;
  score += lengthAdjustment(wordCount(description));
  score = clamp(score);

  const note =
    matched.length >= 2 || desc.includes(roleNorm)
      ? 'Your description speaks to the target role — keep tying decisions back to that lens.'
      : role.trim()
        ? `Try naming how this project demonstrates ${role.trim()} skills in plain language.`
        : 'Add a target role so Aptellum can check alignment with your trajectory.';

  return { score, note };
}

function scoreProblemClarity(description: string): ScoreResult {
  const r = baseKeywordScore(description, 'problem-clarity', 40, 8, 4);
  const hasProblem = normalize(description).includes('problem');
  const hasUser = normalize(description).includes('user');
  if (hasProblem && hasUser) {
    return {
      score: clamp(r.score + 8),
      note: 'You frame a user and a problem — a solid foundation for a case study opening.',
    };
  }
  return r;
}

function scoreOutcomeEvidence(description: string): ScoreResult {
  const r = baseKeywordScore(description, 'outcome-evidence', 32, 9, 5);
  const hasOutcome = countKeywords(description, ['outcome', 'result', 'delivered', 'shipped', 'metric']);
  if (hasOutcome === 0) {
    return {
      score: clamp(r.score - 8),
      note: 'Consider naming what shipped or changed — even a modest outcome helps reviewers trust the work.',
    };
  }
  return r;
}

function scoreAllCategories(input: PortfolioScoreInput): CategoryScore[] {
  const { projectDescription, targetRole } = input;
  const desc = projectDescription;

  const scorers: Record<ScoreCategoryId, () => ScoreResult> = {
    'problem-clarity': () => scoreProblemClarity(desc),
    'role-alignment': () => scoreRoleAlignment(desc, targetRole),
    'process-evidence': () => baseKeywordScore(desc, 'process-evidence', 36, 7, 5),
    'outcome-evidence': () => scoreOutcomeEvidence(desc),
    'visual-story': () => baseKeywordScore(desc, 'visual-story', 34, 7, 5),
    'internship-relevance': () => baseKeywordScore(desc, 'internship-relevance', 35, 7, 4),
    'next-step-clarity': () => baseKeywordScore(desc, 'next-step-clarity', 33, 7, 4),
  };

  return (Object.keys(scorers) as ScoreCategoryId[]).map((id) => {
    const { score, note } = scorers[id]();
    return { id, label: CATEGORY_LABELS[id], score, note };
  });
}

// ─── Narrative outputs ─────────────────────────────────────────────────────────

const MISSING_PIECE_ADVICE: Record<ScoreCategoryId, string> = {
  'problem-clarity':
    'Open with one sentence on whose problem you addressed and why it mattered — before showing any screens or artifacts.',
  'role-alignment':
    'Name the target role explicitly and tie at least two decisions to skills that role requires.',
  'process-evidence':
    'Add a short process section: research, exploration, iteration, or testing — not just the final artifact.',
  'outcome-evidence':
    'State what you delivered and what changed — a metric, a learning, or a concrete result counts.',
  'visual-story':
    'Structure the project as a case study: context, process, outcome — with visuals or story beats called out.',
  'internship-relevance':
    'Frame constraints, stakeholders, or deliverables the way a studio brief would — professional, scoped, dated.',
  'next-step-clarity':
    'Close with what you would do next — a revision, a test, or how this project opens an internship pathway.',
};

const STRONG_SIGNAL_PHRASES: Record<ScoreCategoryId, string> = {
  'problem-clarity': 'You articulate the problem space with clarity — reviewers will know why this work exists.',
  'role-alignment': 'The project reads as aligned with your target role — keep making that connection explicit.',
  'process-evidence': 'Process is visible in your description — that is what separates portfolio decoration from proof-of-work.',
  'outcome-evidence': 'Outcomes are present — you show that the work landed somewhere, not just on a slide.',
  'visual-story': 'Story and presentation come through — you are thinking about how a reader moves through the work.',
  'internship-relevance': 'Professional framing is emerging — this sounds closer to studio work than coursework alone.',
  'next-step-clarity': 'You signal where the work goes next — that maturity reads well in outreach and interviews.',
};

function buildSuggestedHeadline(input: PortfolioScoreInput, strongest: CategoryScore): string {
  const title = input.projectTitle.trim() || 'Untitled project';
  const company = input.targetCompany?.trim();
  const role = input.targetRole.trim();

  const templates: Record<ScoreCategoryId, string> = {
    'problem-clarity': `${title}: solving a real user problem${company ? ` — inspired by ${company}` : ''}`,
    'role-alignment': `${title}: a ${role || 'portfolio'} case study in craft and judgment`,
    'process-evidence': `${title}: from research to delivery — documented process`,
    'outcome-evidence': `${title}: what changed and what we measured`,
    'visual-story': `${title}: a visual case study in narrative and form`,
    'internship-relevance': `${title}: studio-scoped work${company ? ` toward ${company}` : ''}`,
    'next-step-clarity': `${title}: proof-of-work with a clear path forward`,
  };

  return templates[strongest.id] ?? `${title}: portfolio case study`;
}

function buildAiFluencyCritique(
  input: PortfolioScoreInput,
  categories: CategoryScore[],
): AiFluencyCritique {
  const desc = input.projectDescription;
  const words = wordCount(desc);
  const lowest = [...categories].sort((a, b) => a.score - b.score)[0];
  const hasAiMention = countKeywords(desc, ['ai', 'chatgpt', 'generated', 'copilot', 'assistant']) > 0;
  const hasMetric = countKeywords(desc, ['metric', 'tested', 'measure', 'data']) > 0;

  return {
    delegation: hasAiMention
      ? 'Clarify which parts you authored versus where AI assisted — reviewers increasingly expect that map.'
      : 'If AI helped anywhere, say so explicitly. Delegation clarity is part of professional readiness.',
    description:
      words < 45
        ? 'Expand context: audience, constraints, timeline, and deliverables. A studio critique needs enough material to respond to.'
        : lowest.id === 'problem-clarity'
          ? 'Add a tighter problem statement at the top — who, what pain, and what success looks like.'
          : 'Your description has room to grow — add one paragraph on constraints and one on decisions only you made.',
    discernment: hasMetric
      ? 'Claims with metrics or test results read as discernment — keep tying judgments to evidence.'
      : 'Replace broad claims (“intuitive,” “innovative”) with observable decisions and what you would change on a second pass.',
    diligence: hasAiMention
      ? 'Include an AI disclosure in the case study — tools used, prompts bounded, and what you verified manually.'
      : 'Document sources, collaborators, and any tools — transparency builds trust in creative and academic review.',
  };
}

function buildRecommendedRevision(categories: CategoryScore[]): string {
  const sorted = [...categories].sort((a, b) => a.score - b.score);
  const weakest = sorted[0];
  const second = sorted[1];

  if (weakest.score < 45 && second.score < 50) {
    return `${MISSING_PIECE_ADVICE[weakest.id]} Then, ${MISSING_PIECE_ADVICE[second.id].charAt(0).toLowerCase()}${MISSING_PIECE_ADVICE[second.id].slice(1)}`;
  }
  return MISSING_PIECE_ADVICE[weakest.id];
}

// ─── Public API ────────────────────────────────────────────────────────────────

export function canAssessPortfolio(input: PortfolioScoreInput): boolean {
  return (
    input.projectTitle.trim().length > 0 &&
    input.targetRole.trim().length > 0 &&
    input.projectDescription.trim().length >= 20
  );
}

export function assessPortfolioReadiness(input: PortfolioScoreInput): PortfolioReadinessResult {
  const categories = scoreAllCategories(input);
  const overallScore = clamp(
    categories.reduce((sum, c) => sum + c.score, 0) / categories.length,
  );

  const sorted = [...categories].sort((a, b) => b.score - a.score);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  return {
    overallScore,
    categories,
    strongestSignal: STRONG_SIGNAL_PHRASES[strongest.id],
    biggestMissingPiece: MISSING_PIECE_ADVICE[weakest.id],
    recommendedRevision: buildRecommendedRevision(categories),
    suggestedHeadline: buildSuggestedHeadline(input, strongest),
    aiFluency: buildAiFluencyCritique(input, categories),
    disclaimer: SCORE_DISCLAIMER,
  };
}

export function formatCritiqueAsText(
  result: PortfolioReadinessResult,
  input: PortfolioScoreInput,
): string {
  const lines = [
    `Portfolio Readiness — ${input.projectTitle}`,
    '',
    result.disclaimer,
    '',
    `Overall readiness: ${result.overallScore} / 100`,
    '',
    'CATEGORY SCORES',
    ...result.categories.map((c) => `${c.label}: ${c.score}/100 — ${c.note}`),
    '',
    'STRONGEST SIGNAL',
    result.strongestSignal,
    '',
    'BIGGEST MISSING PIECE',
    result.biggestMissingPiece,
    '',
    'RECOMMENDED NEXT REVISION',
    result.recommendedRevision,
    '',
    'SUGGESTED PORTFOLIO HEADLINE',
    result.suggestedHeadline,
    '',
    'AI FLUENCY CRITIQUE',
    `Delegation: ${result.aiFluency.delegation}`,
    `Description: ${result.aiFluency.description}`,
    `Discernment: ${result.aiFluency.discernment}`,
    `Diligence: ${result.aiFluency.diligence}`,
  ];

  if (input.targetCompany?.trim()) {
    lines.splice(4, 0, `Target company: ${input.targetCompany}`);
  }
  lines.splice(5, 0, `Target role: ${input.targetRole}`);

  return lines.join('\n');
}

/** Warm bar color token class suffix — no harsh failure reds. */
export function scoreTone(score: number): 'muted' | 'warm' | 'strong' | 'excellent' {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'strong';
  if (score >= 40) return 'warm';
  return 'muted';
}

export function scoreLabel(score: number): string {
  if (score >= 80) return 'Strong readiness';
  if (score >= 60) return 'Building momentum';
  if (score >= 40) return 'Room to strengthen';
  return 'Early stage — keep going';
}
