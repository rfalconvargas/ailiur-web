/**
 * Lociq Civic Action Simulator — mock data.
 *
 * Everything the landing-page demo needs lives here so it stays easy to edit.
 * All outputs are DETERMINISTIC functions of (issue, neighborhood, solution):
 * no backend, no API, no AI, no map. The figures are illustrative, never real.
 */

export type Tier = 'Low' | 'Medium' | 'High';
export type Difficulty = 'Easy' | 'Moderate' | 'Hard';

export type Solution = {
  id: string;
  title: string;
  summary: string;
  cost: Tier;
  impact: Tier;
  difficulty: Difficulty;
  /** Deterministic share of neighbor support, 0–1. Per issue, shares sum to ~1. */
  share: number;
};

export type CivicPlan = {
  /** Civic issue category. */
  category: string;
  /** Plain-English explanation of what kind of issue this is. */
  explanation: string;
  /** Likely responsible body. */
  responsibleBody: string;
  /** Exactly three proposed fixes. */
  solutions: [Solution, Solution, Solution];
  /** Suggested next action. */
  nextAction: string;
  /** Base neighbor pool before the neighborhood adjustment. */
  basePool: number;
};

export const PRESET_ISSUES = [
  'Cars speeding near a school',
  'Broken sidewalk near a bus stop',
  'Empty lot could become a community garden',
  'Confusing local housing ordinance',
  'Poor lighting near a train station',
] as const;

export const DEMO_NEIGHBORHOODS = [
  'Santurce',
  'Cambridge',
  'Brooklyn',
  'Barcelona',
  'Demo City',
] as const;

export type DemoNeighborhood = (typeof DEMO_NEIGHBORHOODS)[number];

/** Deterministic neighbor-pool bump per demo neighborhood. */
const NEIGHBORHOOD_OFFSET: Record<DemoNeighborhood, number> = {
  Santurce: 22,
  Cambridge: 38,
  Brooklyn: 75,
  Barcelona: 49,
  'Demo City': 15,
};

/** The five preset plans, keyed by the issue label. */
const PRESET_PLANS: Record<string, CivicPlan> = {
  'Cars speeding near a school': {
    category: 'School-zone traffic calming',
    explanation:
      'This is a local safety issue involving street design, school access, and transportation enforcement.',
    responsibleBody: 'Transportation department + school administration',
    nextAction: 'Collect 50 resident signals and request a traffic study.',
    basePool: 96,
    solutions: [
      {
        id: 'raised-crosswalk',
        title: 'Raised crosswalk',
        summary: 'A built-up crossing that forces cars to slow exactly where kids cross.',
        cost: 'Medium',
        impact: 'High',
        difficulty: 'Moderate',
        share: 0.46,
      },
      {
        id: 'cone-pilot',
        title: 'Temporary cone pilot',
        summary: 'A low-cost trial with cones and signage to prove the fix before it’s permanent.',
        cost: 'Low',
        impact: 'Medium',
        difficulty: 'Easy',
        share: 0.33,
      },
      {
        id: 'speed-table',
        title: 'Speed table request',
        summary: 'A longer raised section engineered for sustained slow speeds along the block.',
        cost: 'High',
        impact: 'High',
        difficulty: 'Hard',
        share: 0.21,
      },
    ],
  },

  'Broken sidewalk near a bus stop': {
    category: 'Pedestrian access & ADA repair',
    explanation:
      'This is an accessibility and public-works issue where a damaged walkway blocks safe access to transit.',
    responsibleBody: 'Public Works department + transit authority',
    nextAction: 'Document the hazard with photos and file a public-works repair request.',
    basePool: 72,
    solutions: [
      {
        id: 'patch',
        title: 'Temporary patch & hazard marking',
        summary: 'Fill and flag the worst sections fast so no one trips while a real fix is scheduled.',
        cost: 'Low',
        impact: 'Medium',
        difficulty: 'Easy',
        share: 0.3,
      },
      {
        id: 'panel-replacement',
        title: 'Full sidewalk panel replacement',
        summary: 'Replace the broken slabs with even, durable panels that meet accessibility standards.',
        cost: 'Medium',
        impact: 'High',
        difficulty: 'Moderate',
        share: 0.48,
      },
      {
        id: 'curb-ramp',
        title: 'Curb ramp + bus pad rebuild',
        summary: 'Rebuild the ramp and boarding pad so wheelchairs and strollers reach the bus cleanly.',
        cost: 'High',
        impact: 'High',
        difficulty: 'Hard',
        share: 0.22,
      },
    ],
  },

  'Empty lot could become a community garden': {
    category: 'Vacant land & community use',
    explanation:
      'This is a land-use and zoning question about turning an unused parcel into shared neighborhood green space.',
    responsibleBody: 'City planning / land bank + parks department',
    nextAction: 'Survey neighbor interest and request the parcel’s ownership and zoning status.',
    basePool: 84,
    solutions: [
      {
        id: 'popup-permit',
        title: 'Temporary pop-up garden permit',
        summary: 'A short-term permit to start planting now and show the space works before committing.',
        cost: 'Low',
        impact: 'Medium',
        difficulty: 'Easy',
        share: 0.38,
      },
      {
        id: 'land-use-agreement',
        title: 'Community land-use agreement',
        summary: 'A managed agreement with the owner or city for ongoing neighbor stewardship.',
        cost: 'Medium',
        impact: 'High',
        difficulty: 'Moderate',
        share: 0.4,
      },
      {
        id: 'rezone',
        title: 'Permanent rezoning to green space',
        summary: 'Protect the lot for good by rezoning it as community open space.',
        cost: 'High',
        impact: 'High',
        difficulty: 'Hard',
        share: 0.22,
      },
    ],
  },

  'Confusing local housing ordinance': {
    category: 'Housing policy & civic clarity',
    explanation:
      'This is a policy-comprehension issue where an unclear rule makes it hard for residents to know their rights and obligations.',
    responsibleBody: 'City council + housing / legal-aid office',
    nextAction: 'Gather resident questions and request a plain-language summary from the housing office.',
    basePool: 60,
    solutions: [
      {
        id: 'explainer',
        title: 'Plain-language explainer & FAQ',
        summary: 'A clear, neighbor-readable summary of what the ordinance actually requires.',
        cost: 'Low',
        impact: 'Medium',
        difficulty: 'Easy',
        share: 0.44,
      },
      {
        id: 'info-session',
        title: 'Public info session',
        summary: 'A live Q&A with the housing office so residents can ask real questions directly.',
        cost: 'Medium',
        impact: 'Medium',
        difficulty: 'Moderate',
        share: 0.34,
      },
      {
        id: 'amendment',
        title: 'Formal ordinance amendment',
        summary: 'Rewrite the confusing language through the council’s amendment process.',
        cost: 'High',
        impact: 'High',
        difficulty: 'Hard',
        share: 0.22,
      },
    ],
  },

  'Poor lighting near a train station': {
    category: 'Public safety & street lighting',
    explanation:
      'This is a safety-and-infrastructure issue where inadequate lighting around transit makes the area feel unsafe after dark.',
    responsibleBody: 'Public Works + transit authority',
    nextAction: 'Map the dark spots after sunset and submit a lighting assessment request.',
    basePool: 110,
    solutions: [
      {
        id: 'relamp',
        title: 'Repair & re-lamp existing fixtures',
        summary: 'Fix the dead and dim lights already installed — the fastest visible win.',
        cost: 'Low',
        impact: 'Medium',
        difficulty: 'Easy',
        share: 0.34,
      },
      {
        id: 'pedestrian-lighting',
        title: 'Add pedestrian-scale lighting',
        summary: 'Lower, evenly spaced lights sized for people on foot, not just the road.',
        cost: 'Medium',
        impact: 'High',
        difficulty: 'Moderate',
        share: 0.45,
      },
      {
        id: 'cpted',
        title: 'Full lighting & safety redesign',
        summary: 'Rework lighting, sightlines, and landscaping around the station for safety.',
        cost: 'High',
        impact: 'High',
        difficulty: 'Hard',
        share: 0.21,
      },
    ],
  },
};

/** Generic fallback plan for a custom issue that matches no keyword. */
const GENERIC_PLAN: CivicPlan = {
  category: 'Neighborhood quality of life',
  explanation:
    'This is a local issue that needs the right civic owner, a practical fix, and enough neighbor support to move forward.',
  responsibleBody: 'Your local council or the relevant city department',
  nextAction: 'Describe the issue clearly, find who owns it, and gather neighbor support.',
  basePool: 68,
  solutions: [
    {
      id: 'pilot',
      title: 'Quick low-cost pilot',
      summary: 'A small, reversible trial that proves the idea before anyone commits real budget.',
      cost: 'Low',
      impact: 'Medium',
      difficulty: 'Easy',
      share: 0.4,
    },
    {
      id: 'permanent-fix',
      title: 'Permanent practical fix',
      summary: 'The durable version of the fix, scoped to the responsible department.',
      cost: 'Medium',
      impact: 'High',
      difficulty: 'Moderate',
      share: 0.38,
    },
    {
      id: 'policy-change',
      title: 'Policy or budget change',
      summary: 'Change the rule or budget line so the problem stops recurring for good.',
      cost: 'High',
      impact: 'High',
      difficulty: 'Hard',
      share: 0.22,
    },
  ],
};

/** Keyword → preset routing for custom issues. First match wins. */
const KEYWORD_ROUTES: { test: RegExp; issue: keyof typeof PRESET_PLANS }[] = [
  { test: /\b(speed|speeding|car|cars|traffic|school[- ]?zone|crosswalk|reckless)\b/i, issue: 'Cars speeding near a school' },
  { test: /\b(sidewalk|curb|pavement|wheelchair|accessib|ada|trip|bus stop)\b/i, issue: 'Broken sidewalk near a bus stop' },
  { test: /\b(lot|vacant|garden|green space|empty|park|planting|community space)\b/i, issue: 'Empty lot could become a community garden' },
  { test: /\b(ordinance|housing|rent|tenant|zoning|permit|rule|law|policy|regulation)\b/i, issue: 'Confusing local housing ordinance' },
  { test: /\b(light|lighting|dark|lamp|station|night|unsafe|visibility)\b/i, issue: 'Poor lighting near a train station' },
];

/**
 * Build a deterministic civic plan for any issue text. Preset labels return
 * their authored plan; custom text is keyword-routed, falling back to a
 * generic plan.
 */
export function buildPlan(issue: string): CivicPlan {
  const trimmed = issue.trim();
  if (PRESET_PLANS[trimmed]) return PRESET_PLANS[trimmed];

  const route = KEYWORD_ROUTES.find((r) => r.test.test(trimmed));
  if (route) return PRESET_PLANS[route.issue];

  return GENERIC_PLAN;
}

export type SupportResult = {
  /** Total engaged neighbors in this demo neighborhood. */
  pool: number;
  /** Neighbors backing the selected solution. */
  backers: number;
  /** Consensus for the selected solution, as a percentage. */
  consensus: number;
};

/** Deterministic support + consensus for a chosen solution in a neighborhood. */
export function resolveSupport(
  plan: CivicPlan,
  neighborhood: DemoNeighborhood,
  solutionId: string,
): SupportResult {
  const pool = plan.basePool + (NEIGHBORHOOD_OFFSET[neighborhood] ?? 20);
  const solution = plan.solutions.find((s) => s.id === solutionId) ?? plan.solutions[0];
  const backers = Math.round(pool * solution.share);
  const consensus = Math.round(solution.share * 100);
  return { pool, backers, consensus };
}
