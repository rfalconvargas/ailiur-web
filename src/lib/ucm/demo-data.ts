/**
 * Mock data + retrieval logic for the Context Packet Builder demo.
 *
 * Everything here is hardcoded and runs client-side — no backend, no API, no
 * vector database. The "semantic" retrieval is deliberately simple keyword/tag
 * overlap scoring so the behaviour is easy to read and easy to modify.
 *
 * To add a memory, append to UCM_MEMORIES. To change result counts, edit
 * DEPTH_LIMIT. To change matching, edit `scoreMemory`.
 */

export type UcmSource = 'ChatGPT' | 'Claude' | 'Gemini';

export type UcmProjectKey =
  | 'Qetos'
  | 'Enchiridion'
  | 'Doblu'
  | 'Tayzt'
  | 'Tellumetry'
  | 'Custom';

/** Projects a memory can actually belong to (Custom is a UI-only selection). */
export type UcmMemoryProject =
  | 'Qetos'
  | 'Enchiridion'
  | 'Doblu'
  | 'Tayzt'
  | 'Tellumetry'
  | 'Ailiur';

export type UcmPillar =
  | 'Health'
  | 'Learning'
  | 'Wealth'
  | 'Media'
  | 'Creativity'
  | 'Productivity'
  | 'AI OS';

export type UcmDepth = 'Light' | 'Balanced' | 'Deep';

export type UcmMemory = {
  id: string;
  source: UcmSource;
  project: UcmMemoryProject;
  pillar: UcmPillar;
  summary: string;
  tags: string[];
  /** 0–1 model confidence in the memory. */
  confidence: number;
  /** Stored, human-readable reason this memory tends to be relevant. */
  whyMatched: string;
};

export const UCM_PROJECTS: UcmProjectKey[] = [
  'Qetos',
  'Enchiridion',
  'Doblu',
  'Tayzt',
  'Tellumetry',
  'Custom',
];

export const UCM_SOURCES: UcmSource[] = ['ChatGPT', 'Claude', 'Gemini'];

export const UCM_DEPTHS: UcmDepth[] = ['Light', 'Balanced', 'Deep'];

export const UCM_EXAMPLE_QUERIES = [
  'What should this app remember about my design style?',
  'What decisions have I already made?',
  'What user problem am I solving?',
  'What context should the next Ailiur app receive?',
];

export const DEPTH_LIMIT: Record<UcmDepth, number> = {
  Light: 3,
  Balanced: 5,
  Deep: 8,
};

/* ── Mock memory corpus ─────────────────────────────────────────────────────── */

export const UCM_MEMORIES: UcmMemory[] = [
  {
    id: 'q-tone',
    source: 'Claude',
    project: 'Qetos',
    pillar: 'Health',
    summary: 'Qetos should feel calm, friendly, and clinically trustworthy — reassurance over alarm.',
    tags: ['design', 'style', 'tone', 'calm', 'friendly', 'trust', 'clinical', 'health', 'brand', 'voice'],
    confidence: 0.95,
    whyMatched: 'Defines the emotional tone and visual feel for the Qetos health experience.',
  },
  {
    id: 'q-color',
    source: 'ChatGPT',
    project: 'Qetos',
    pillar: 'Health',
    summary: 'Avoid dark themes for Qetos; prefer warm, health-oriented colors that read as safe and human.',
    tags: ['design', 'style', 'color', 'theme', 'warm', 'light', 'palette', 'health', 'visual'],
    confidence: 0.92,
    whyMatched: 'A concrete visual-design decision about color and theme for Qetos.',
  },
  {
    id: 'q-onboarding',
    source: 'Gemini',
    project: 'Qetos',
    pillar: 'Health',
    summary: 'Qetos onboarding must reduce anxiety: plain language, one step at a time, no jargon.',
    tags: ['onboarding', 'ux', 'problem', 'user', 'anxiety', 'health', 'decision', 'plain-language'],
    confidence: 0.86,
    whyMatched: 'Captures the core user problem Qetos onboarding is solving.',
  },
  {
    id: 'q-privacy',
    source: 'Claude',
    project: 'Qetos',
    pillar: 'Health',
    summary: 'Health data in Qetos stays local-first with explicit user consent before anything syncs.',
    tags: ['privacy', 'health', 'data', 'local-first', 'consent', 'decision', 'trust', 'security'],
    confidence: 0.9,
    whyMatched: 'A privacy decision that shapes how Qetos handles sensitive health data.',
  },
  {
    id: 'e-engine',
    source: 'ChatGPT',
    project: 'Enchiridion',
    pillar: 'Learning',
    summary: 'Enchiridion is the learning and content engine for Ailiur.',
    tags: ['learning', 'content', 'engine', 'enchiridion', 'education', 'context', 'ecosystem'],
    confidence: 0.94,
    whyMatched: 'Defines what Enchiridion is within the Ailiur ecosystem.',
  },
  {
    id: 'e-spaced',
    source: 'Gemini',
    project: 'Enchiridion',
    pillar: 'Learning',
    summary: 'Enchiridion uses spaced repetition and adaptive difficulty to fit each learner.',
    tags: ['learning', 'spaced-repetition', 'adaptive', 'difficulty', 'decision', 'education', 'personalization'],
    confidence: 0.83,
    whyMatched: 'A pedagogical decision about how Enchiridion teaches.',
  },
  {
    id: 'e-tone',
    source: 'Claude',
    project: 'Enchiridion',
    pillar: 'Learning',
    summary: "Enchiridion's voice is an encouraging mentor — never condescending, never robotic.",
    tags: ['tone', 'voice', 'style', 'learning', 'mentor', 'brand', 'design'],
    confidence: 0.81,
    whyMatched: 'Sets the content tone and personality for Enchiridion.',
  },
  {
    id: 'a-premium',
    source: 'ChatGPT',
    project: 'Ailiur',
    pillar: 'AI OS',
    summary: 'Ailiur products should feel premium, minimal, and emotionally intelligent.',
    tags: ['design', 'style', 'premium', 'minimal', 'brand', 'aesthetic', 'emotional', 'ecosystem', 'context'],
    confidence: 0.96,
    whyMatched: 'A global brand principle every Ailiur app should inherit.',
  },
  {
    id: 'a-brand',
    source: 'Claude',
    project: 'Ailiur',
    pillar: 'Creativity',
    summary: 'Ailiur brand system: PP Editorial New for titles, SF Pro Rounded for body, warm yellow-glass surfaces.',
    tags: ['design', 'style', 'brand', 'typography', 'font', 'color', 'glass', 'visual', 'aesthetic'],
    confidence: 0.89,
    whyMatched: 'The concrete brand and visual system shared across Ailiur apps.',
  },
  {
    id: 'a-ucm',
    source: 'Claude',
    project: 'Ailiur',
    pillar: 'AI OS',
    summary: 'UCM is the cross-platform context layer beneath the Ailiur ecosystem.',
    tags: ['ucm', 'context', 'layer', 'ecosystem', 'cross-platform', 'memory', 'handoff', 'ai-os'],
    confidence: 0.97,
    whyMatched: "Explains UCM's role as the shared context layer for every app.",
  },
  {
    id: 'a-ucm-flow',
    source: 'ChatGPT',
    project: 'Ailiur',
    pillar: 'AI OS',
    summary: 'UCM works import → embed → retrieve, local-first, with source provenance on every memory.',
    tags: ['ucm', 'context', 'import', 'embed', 'retrieve', 'local-first', 'provenance', 'packet', 'decision'],
    confidence: 0.88,
    whyMatched: 'Describes how UCM turns exports into a usable context packet.',
  },
  {
    id: 'a-problem',
    source: 'ChatGPT',
    project: 'Ailiur',
    pillar: 'AI OS',
    summary: 'Core user problem: people re-explain who they are across AI tools, paying for cold starts every time.',
    tags: ['problem', 'user', 'context', 'cold-start', 're-explaining', 'friction', 'pain', 'ecosystem'],
    confidence: 0.91,
    whyMatched: 'States the user problem the Ailiur ecosystem is solving.',
  },
  {
    id: 'a-antiblue',
    source: 'Claude',
    project: 'Ailiur',
    pillar: 'Creativity',
    summary: 'Avoid the generic blue SaaS aesthetic; infrastructure products use warm neutrals with muted gold.',
    tags: ['design', 'style', 'color', 'aesthetic', 'decision', 'brand', 'visual', 'infrastructure'],
    confidence: 0.84,
    whyMatched: 'A visual-direction decision distinguishing Ailiur from typical SaaS.',
  },
  {
    id: 't-transparency',
    source: 'Claude',
    project: 'Tellumetry',
    pillar: 'AI OS',
    summary: 'Tellumetry should provide token/cost transparency and real-time agent progress.',
    tags: ['tellumetry', 'transparency', 'cost', 'token', 'progress', 'agent', 'decision', 'ai-os'],
    confidence: 0.93,
    whyMatched: "Defines Tellumetry's core promise around cost and progress.",
  },
  {
    id: 't-calm',
    source: 'ChatGPT',
    project: 'Tellumetry',
    pillar: 'Productivity',
    summary: 'Tellumetry is a calm cockpit: notify the human only when a decision actually needs them.',
    tags: ['tellumetry', 'calm', 'attention', 'notification', 'productivity', 'design', 'decision'],
    confidence: 0.85,
    whyMatched: "Sets Tellumetry's attention model and product feel.",
  },
  {
    id: 'ty-biometric',
    source: 'Gemini',
    project: 'Tayzt',
    pillar: 'Creativity',
    summary: 'Tayzt should translate biometric and taste context into creative direction.',
    tags: ['tayzt', 'biometric', 'taste', 'creative', 'direction', 'context', 'decision', 'creativity'],
    confidence: 0.87,
    whyMatched: 'Defines how Tayzt converts personal signals into creative output.',
  },
  {
    id: 'ty-taste',
    source: 'Claude',
    project: 'Tayzt',
    pillar: 'Media',
    summary: 'Tayzt keeps a taste graph of the aesthetic references a user keeps returning to.',
    tags: ['tayzt', 'taste', 'aesthetic', 'references', 'style', 'design', 'media', 'creative'],
    confidence: 0.82,
    whyMatched: "Describes the taste graph that powers Tayzt's recommendations.",
  },
  {
    id: 'd-finance',
    source: 'ChatGPT',
    project: 'Doblu',
    pillar: 'Wealth',
    summary: 'Doblu connects financial intelligence with productivity and asset ownership.',
    tags: ['doblu', 'finance', 'wealth', 'productivity', 'assets', 'ownership', 'decision'],
    confidence: 0.9,
    whyMatched: "Defines Doblu's intersection of money, work, and assets.",
  },
  {
    id: 'd-workflow',
    source: 'Gemini',
    project: 'Doblu',
    pillar: 'Productivity',
    summary: 'Doblu remembers goals, assets, and workflow so your portfolio behaves like a living system.',
    tags: ['doblu', 'goals', 'assets', 'workflow', 'productivity', 'memory', 'context'],
    confidence: 0.8,
    whyMatched: 'Captures the goals, assets, and workflow memory Doblu carries.',
  },
  {
    id: 'a-subdomains',
    source: 'Gemini',
    project: 'Ailiur',
    pillar: 'Productivity',
    summary: 'Decision: ship each Ailiur product as its own subdomain microsite sharing one design-token system.',
    tags: ['decision', 'architecture', 'subdomain', 'microsite', 'design', 'tokens', 'ecosystem', 'productivity'],
    confidence: 0.78,
    whyMatched: 'An architecture decision already made for shipping Ailiur apps.',
  },
  {
    id: 'a-handoff',
    source: 'Gemini',
    project: 'Ailiur',
    pillar: 'AI OS',
    summary:
      'The next Ailiur app should receive a compact context packet — goals, taste, decisions, constraints — not raw chat logs.',
    tags: ['context', 'packet', 'handoff', 'next', 'app', 'decision', 'goals', 'taste', 'ecosystem', 'receive'],
    confidence: 0.86,
    whyMatched: 'Specifies what context the next Ailiur app should receive.',
  },
  {
    id: 'ty-motion',
    source: 'Gemini',
    project: 'Tayzt',
    pillar: 'Creativity',
    summary: 'Tayzt feels expressive but disciplined — motion stays subtle and never decorative.',
    tags: ['tayzt', 'motion', 'design', 'style', 'creative', 'discipline', 'aesthetic'],
    confidence: 0.76,
    whyMatched: 'A creative-direction decision about motion and restraint in Tayzt.',
  },
];

/* ── Retrieval ──────────────────────────────────────────────────────────────── */

const STOPWORDS = new Set([
  'what', 'should', 'this', 'about', 'have', 'already', 'made', 'next', 'and', 'for',
  'are', 'you', 'your', 'that', 'with', 'will', 'can', 'from', 'into', 'the', 'app',
  'does', 'did', 'was', 'were', 'has', 'how', 'why', 'who', 'when', 'where',
]);

function tokenize(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !STOPWORDS.has(w));
}

export type ScoredMemory = UcmMemory & {
  score: number;
  matchedTerms: string[];
};

/** Score a single memory against the query terms (tag + summary overlap). */
function scoreMemory(memory: UcmMemory, terms: string[]): { score: number; matchedTerms: string[] } {
  let score = 0;
  const matched = new Set<string>();
  const summary = memory.summary.toLowerCase();

  for (const term of terms) {
    let hit = false;
    for (const rawTag of memory.tags) {
      const tag = rawTag.toLowerCase();
      if (tag === term) {
        score += 3;
        hit = true;
      } else if (term.length >= 4 && (tag.includes(term) || term.includes(tag))) {
        score += 2;
        hit = true;
      }
    }
    if (term.length >= 4 && summary.includes(term)) {
      score += 1;
      hit = true;
    }
    if (hit) matched.add(term);
  }

  return { score, matchedTerms: [...matched] };
}

export type RetrievalInput = {
  project: UcmProjectKey;
  sources: UcmSource[];
  query: string;
  depth: UcmDepth;
};

export type RetrievalResult = {
  results: ScoredMemory[];
  /** True when no query/project matches existed and we fell back to best globals. */
  usedFallback: boolean;
  /** Distinct sources actually represented in the returned packet. */
  sourcesUsed: UcmSource[];
};

/**
 * Pure retrieval: filter by source + (project | Ailiur global), score by query
 * overlap, sort by score then confidence, and trim to the depth limit. When no
 * memory scores, fall back to the strongest available global memories.
 */
export function retrieveContext({ project, sources, query, depth }: RetrievalInput): RetrievalResult {
  const limit = DEPTH_LIMIT[depth];
  const sourceSet = new Set(sources);
  const terms = tokenize(query);

  // Source filter first, then project scope (selected project OR global Ailiur).
  const scoped = UCM_MEMORIES.filter(
    (m) => sourceSet.has(m.source) && (m.project === project || m.project === 'Ailiur'),
  );

  const scored: ScoredMemory[] = scoped.map((m) => {
    const { score, matchedTerms } = scoreMemory(m, terms);
    // Small bonus for an exact project match so app-specific context ranks up.
    const projectBonus = m.project === project ? 2 : 0;
    return { ...m, score: score + projectBonus, matchedTerms };
  });

  const byScoreThenConfidence = (a: ScoredMemory, b: ScoredMemory) =>
    b.score - a.score || b.confidence - a.confidence;

  const strong = scored.filter((m) => m.score > 0).sort(byScoreThenConfidence);

  let results: ScoredMemory[];
  let usedFallback = false;

  if (strong.length >= limit) {
    results = strong.slice(0, limit);
  } else if (strong.length > 0) {
    // Top up with the next-best available memories by confidence.
    const used = new Set(strong.map((m) => m.id));
    const filler = scored
      .filter((m) => !used.has(m.id))
      .sort((a, b) => b.confidence - a.confidence);
    results = [...strong, ...filler].slice(0, limit);
  } else {
    // No matches at all → strongest available global/scoped memories.
    usedFallback = true;
    results = [...scored].sort((a, b) => b.confidence - a.confidence).slice(0, limit);
  }

  const sourcesUsed = [...new Set(results.map((m) => m.source))];
  return { results, usedFallback, sourcesUsed };
}
