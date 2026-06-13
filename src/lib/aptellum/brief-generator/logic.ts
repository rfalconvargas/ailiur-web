/**
 * Deterministic mock brief generation.
 *
 * Picks variants from seeded arrays based on normalized inputs — no LLM, no API.
 * Replace this module's `generateProjectBrief` with an async API client when ready.
 */

import {
  BRIEF_DISCLAIMER,
  type BriefGeneratorInput,
  type ProjectBrief,
  type SkillLevel,
  type TimeAvailable,
  type WeeklyPlanItem,
} from './types';

// ─── Seeded selection ────────────────────────────────────────────────────────

function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i);
  return Math.abs(h);
}

function pick<T>(arr: readonly T[], seed: string): T {
  return arr[hashString(seed) % arr.length];
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

function seedKey(input: BriefGeneratorInput): string {
  return [
    input.dreamCompany,
    input.targetRole,
    input.creativeInterests,
    input.timeAvailable,
    input.skillLevel,
  ]
    .map(normalize)
    .join('|');
}

// ─── Company & role profiles ───────────────────────────────────────────────────

type CompanyProfile = {
  domain: string;
  values: string[];
  productContext: string[];
};

const COMPANY_PROFILES: Record<string, CompanyProfile> = {
  apple: {
    domain: 'human-centered technology',
    values: ['craft at scale', 'accessibility as default', 'restraint in visual language'],
    productContext: ['creative productivity app', 'on-device creative tool', 'cross-platform studio experience'],
  },
  nike: {
    domain: 'athletic innovation and brand culture',
    values: ['performance storytelling', 'material innovation', 'inclusive athlete narratives'],
    productContext: ['training companion app', 'sustainable product line launch', 'community running experience'],
  },
  a24: {
    domain: 'independent film and cultural storytelling',
    values: ['distinctive authorship', 'audience trust', 'visual identity with editorial voice'],
    productContext: ['limited-series campaign', 'theatrical release experience', 'director-focused digital archive'],
  },
  ideo: {
    domain: 'design consulting and human-centered innovation',
    values: ['rapid prototyping', 'interdisciplinary synthesis', 'field research rigor'],
    productContext: ['service redesign sprint', 'future-of-work concept', 'civic experience prototype'],
  },
  disney: {
    domain: 'immersive entertainment and world-building',
    values: ['guest experience orchestration', 'character-driven narrative', 'multi-platform coherence'],
    productContext: ['park guest journey', 'streaming onboarding experience', 'franchise fan portal'],
  },
  mercury: {
    domain: 'financial clarity for ambitious teams',
    values: ['calm information design', 'trust through transparency', 'operational precision'],
    productContext: ['startup banking dashboard', 'treasury workflow', 'founder onboarding flow'],
  },
  colossal: {
    domain: 'art, science, and visual culture publishing',
    values: ['editorial depth', 'archival respect', 'curious public audience'],
    productContext: ['digital exhibition feature', 'artist studio series', 'long-form visual essay'],
  },
  figma: {
    domain: 'collaborative design infrastructure',
    values: ['multiplayer clarity', 'design-system thinking', 'community-driven craft'],
    productContext: ['design handoff workflow', 'plugin ecosystem concept', 'team onboarding experience'],
  },
  'the met': {
    domain: 'museum interpretation and public encounter with art',
    values: ['accessible scholarship', 'spatial storytelling', 'collection stewardship'],
    productContext: ['exhibition digital companion', 'wayfinding for special installations', 'youth education program'],
  },
  pixar: {
    domain: 'animation craft and emotional storytelling',
    values: ['process documentation', 'character authenticity', 'world-building discipline'],
    productContext: ['short film pitch package', 'behind-the-scenes interactive feature', 'animation pipeline tool concept'],
  },
};

const DEFAULT_COMPANY: CompanyProfile = {
  domain: 'design-led creative practice',
  values: ['clear authorship', 'audience empathy', 'iterative craft'],
  productContext: ['flagship digital experience', 'brand campaign system', 'public-facing product concept'],
};

type RoleProfile = {
  verb: string;
  artifact: string;
  deliverableSet: string[];
  skillSet: string[];
};

const ROLE_PROFILES: Record<string, RoleProfile> = {
  'product design intern': {
    verb: 'Design',
    artifact: 'end-to-end product flow',
    deliverableSet: [
      'Problem framing one-pager with user scenarios',
      'Low- and high-fidelity interactive prototype',
      'UI component samples with usage rationale',
      '5-minute walkthrough deck for design critique',
    ],
    skillSet: ['User research synthesis', 'Information architecture', 'Interface design', 'Prototyping', 'Design critique'],
  },
  'industrial design intern': {
    verb: 'Develop',
    artifact: 'physical product concept',
    deliverableSet: [
      'Field research and inspiration board',
      'Sketch exploration and form studies',
      'CAD model or foam prototype documentation',
      'Manufacturing-aware spec sheet',
    ],
    skillSet: ['Form development', 'Materials research', 'Sketch communication', '3D modeling', 'Design for production'],
  },
  'motion designer': {
    verb: 'Create',
    artifact: 'motion narrative piece',
    deliverableSet: [
      'Concept boards and motion references',
      'Storyboard and animatic',
      'Final motion piece (15–45 seconds)',
      'Process journal with timing rationale',
    ],
    skillSet: ['Motion design', 'Storyboarding', 'Typography in motion', 'Sound-aware pacing', 'Creative direction response'],
  },
  'ux designer': {
    verb: 'Map',
    artifact: 'validated user experience',
    deliverableSet: [
      'Research plan and interview synthesis',
      'Journey map with pain-point prioritization',
      'Wireframes and tested prototype',
      'Usability findings report',
    ],
    skillSet: ['User interviews', 'Journey mapping', 'Wireframing', 'Usability testing', 'Stakeholder communication'],
  },
  'editorial designer': {
    verb: 'Compose',
    artifact: 'editorial design system',
    deliverableSet: [
      'Content structure and typographic hierarchy study',
      'Layout templates across print and digital',
      'One fully art-directed feature spread',
      'Written rationale connecting form to audience',
    ],
    skillSet: ['Typographic systems', 'Grid design', 'Art direction', 'Visual narrative', 'Critical writing'],
  },
  'creative technologist': {
    verb: 'Build',
    artifact: 'interactive experience prototype',
    deliverableSet: [
      'Technical concept and experience principles',
      'Working interactive prototype',
      'Accessibility and performance notes',
      'README documenting stack and AI assistance',
    ],
    skillSet: ['Creative coding', 'Interaction design', 'Prototyping', 'Technical documentation', 'Systems thinking'],
  },
  'museum experience designer': {
    verb: 'Frame',
    artifact: 'visitor experience concept',
    deliverableSet: [
      'Audience research and interpretive strategy',
      'Spatial or digital experience flow',
      'Sample wall text and label system',
      'Presentation for curatorial review',
    ],
    skillSet: ['Interpretive planning', 'Spatial narrative', 'Exhibition design', 'Audience development', 'Cultural research'],
  },
};

const DEFAULT_ROLE: RoleProfile = {
  verb: 'Design',
  artifact: 'portfolio-ready creative project',
  deliverableSet: [
    'Research synthesis and creative brief',
    'Iterative work samples with documented decisions',
    'Final deliverable package',
    'Case study with process appendix',
  ],
  skillSet: ['Creative direction', 'Visual communication', 'Iterative refinement', 'Presentation', 'Critical reflection'],
};

// ─── Interest modifiers ────────────────────────────────────────────────────────

type InterestModifier = {
  adjective: string;
  challengeNoun: string;
  lens: string;
};

const INTEREST_MAP: Record<string, InterestModifier> = {
  accessibility: {
    adjective: 'accessibility-first',
    challengeNoun: 'onboarding flow',
    lens: 'WCAG-aware patterns and assistive-technology testing',
  },
  storytelling: {
    adjective: 'narrative-driven',
    challengeNoun: 'story-led experience arc',
    lens: 'character, pacing, and emotional clarity',
  },
  'interface design': {
    adjective: 'interface-refined',
    challengeNoun: 'core product interaction system',
    lens: 'information hierarchy and interaction states',
  },
  sustainability: {
    adjective: 'sustainability-minded',
    challengeNoun: 'low-impact product or service concept',
    lens: 'material honesty and lifecycle transparency',
  },
  animation: {
    adjective: 'motion-rich',
    challengeNoun: 'animated communication system',
    lens: 'timing, easing, and authorship in motion',
  },
  'physical products': {
    adjective: 'tactile',
    challengeNoun: 'physical-digital product touchpoint',
    lens: 'form, material, and manufacturing constraints',
  },
  education: {
    adjective: 'learning-centered',
    challengeNoun: 'educational tool experience',
    lens: 'scaffolding, feedback loops, and learner agency',
  },
  health: {
    adjective: 'wellness-oriented',
    challengeNoun: 'health-supporting daily ritual',
    lens: 'trust, calm, and behavior-change sensitivity',
  },
  finance: {
    adjective: 'clarity-focused',
    challengeNoun: 'financial decision-support interface',
    lens: 'transparency, anxiety reduction, and data legibility',
  },
  'visual culture': {
    adjective: 'critically engaged',
    challengeNoun: 'visual culture editorial feature',
    lens: 'reference, context, and public scholarship',
  },
};

function resolveInterest(raw: string): InterestModifier {
  const key = normalize(raw);
  if (INTEREST_MAP[key]) return INTEREST_MAP[key];

  // Partial match for free-text interests
  for (const [k, mod] of Object.entries(INTEREST_MAP)) {
    if (key.includes(k) || k.includes(key)) return mod;
  }

  return {
    adjective: `${raw.trim() || 'purpose-driven'}`,
    challengeNoun: 'creative brief response',
    lens: `a ${raw.trim() || 'student-defined'} creative lens`,
  };
}

function resolveCompany(name: string): CompanyProfile {
  const key = normalize(name);
  return COMPANY_PROFILES[key] ?? DEFAULT_COMPANY;
}

function resolveRole(role: string): RoleProfile {
  const key = normalize(role);
  return ROLE_PROFILES[key] ?? DEFAULT_ROLE;
}

// ─── Scope by skill & time ─────────────────────────────────────────────────────

const SKILL_SCOPE: Record<SkillLevel, { depth: string; outreach: string }> = {
  'early-student': {
    depth: 'Scope is intentionally focused — one hero flow or artifact family, with mentor-style checkpoints.',
    outreach:
      'Lead with curiosity and process transparency: you are showing how you learn, not claiming senior expertise.',
  },
  intermediate: {
    depth: 'Scope includes research, iteration, and one polished final artifact with documented tradeoffs.',
    outreach:
      'Lead with a specific problem you investigated and the decisions only you could have made.',
  },
  'graduating-student': {
    depth: 'Scope matches entry-level studio expectations — research, system thinking, stakeholder-ready delivery.',
    outreach:
      'Lead with outcomes and craft standards: position this as work you are ready to extend in a co-op or internship.',
  },
};

function buildWeeklyPlan(time: TimeAvailable, seed: string, role: RoleProfile): WeeklyPlanItem[] {
  const phases = [
    { focus: `Research ${role.artifact} context and define constraints` },
    { focus: 'Synthesize insights into a written creative brief' },
    { focus: 'Explore directions — sketches, wireframes, or motion tests' },
    { focus: 'Select direction and build the core artifact' },
    { focus: 'Pressure-test with feedback and revise' },
    { focus: 'Polish deliverables and document process' },
    { focus: 'Package case study and outreach materials' },
    { focus: 'Present work and map next pathway steps' },
  ];

  if (time === 'weekend-sprint') {
    return [
      { label: 'Saturday AM', focus: 'Research, brief, and direction selection' },
      { label: 'Saturday PM', focus: 'Build core artifact — first complete pass' },
      { label: 'Sunday AM', focus: 'Iterate, test, and refine' },
      { label: 'Sunday PM', focus: 'Finalize deliverables and draft case study outline' },
    ];
  }

  const weekCount = time === '2-weeks' ? 2 : time === '4-weeks' ? 4 : 8;
  const plan: WeeklyPlanItem[] = [];

  for (let w = 1; w <= weekCount; w++) {
    const phase = phases[(w - 1) % phases.length];
    const extra =
      w === weekCount
        ? ' — final presentation and portfolio packaging'
        : w === Math.ceil(weekCount / 2)
          ? ' — midpoint critique and scope check'
          : '';
    plan.push({
      label: `Week ${w}`,
      focus: phase.focus + extra,
    });
  }

  // Slight variation per seed
  if (weekCount >= 4) {
    plan[1] = {
      ...plan[1],
      focus: pick(
        [
          'Synthesize insights into a written creative brief',
          'Draft brief and delegation map for AI-assisted zones',
          'Frame problem statement and success metrics',
        ],
        seed + 'w2',
      ),
    };
  }

  return plan;
}

function buildAiFluency(
  input: BriefGeneratorInput,
  interest: InterestModifier,
  role: RoleProfile,
): ProjectBrief['aiFluency'] {
  const company = input.dreamCompany.trim() || 'your target company';

  return {
    delegation: `You own concept direction, taste calls, and final ${role.artifact} authorship. AI may assist with research summaries, layout variations, and first-draft copy — never with undisclosed final craft or critique.`,
    description: `Write a creative brief before production: audience, ${interest.lens}, constraints, and deliverables for ${company}. Vague prompts produce vague work.`,
    discernment: `Evaluate every AI suggestion against ${company}'s known standards and your ${input.targetRole || 'role'} expectations. Reject plausible-but-generic output.`,
    diligence: `Document where AI assisted, cite references, and include a process appendix suitable for portfolio and academic review.`,
  };
}

// ─── Public API ────────────────────────────────────────────────────────────────

export function canGenerateBrief(input: BriefGeneratorInput): boolean {
  return (
    input.dreamCompany.trim().length > 0 &&
    input.targetRole.trim().length > 0 &&
    input.creativeInterests.trim().length > 0
  );
}

export function generateProjectBrief(input: BriefGeneratorInput): ProjectBrief {
  const seed = seedKey(input);
  const company = resolveCompany(input.dreamCompany);
  const role = resolveRole(input.targetRole);
  const interest = resolveInterest(input.creativeInterests);
  const scope = SKILL_SCOPE[input.skillLevel];
  const productContext = pick(company.productContext, seed + 'ctx');
  const companyValue = pick(company.values, seed + 'val');

  const title = `${role.verb} an ${interest.adjective} ${interest.challengeNoun} for a ${productContext}`;

  const projectChallenge = [
    `${role.verb} an ${interest.adjective} ${interest.challengeNoun} for a ${productContext} — `,
    `as if responding to a ${input.targetRole || 'studio'} brief at ${input.dreamCompany.trim()}. `,
    `Center ${interest.lens}. ${scope.depth}`,
  ].join('');

  const whyThisFits = [
    `${input.dreamCompany.trim()} is known for ${company.domain} and ${companyValue}. `,
    `This brief practices the kind of ${role.artifact} their team would recognize — `,
    `grounded in ${interest.lens}, not a generic classroom exercise.`,
  ].join('');

  const deliverables = role.deliverableSet.map((d, i) => {
    if (i === 0 && input.skillLevel === 'graduating-student') {
      return d.replace('one-pager', 'strategic one-pager').replace('Research', 'Field research');
    }
    return d;
  });

  const portfolioStoryAngle = pick(
    [
      `How I approached ${interest.adjective} design for ${productContext} — with ${interest.lens} as my lens.`,
      `From research to delivery: a ${input.targetRole || 'creative'} case study in ${company.domain}.`,
      `What I would show ${input.dreamCompany.trim()}: process, constraints, and the decisions behind the final work.`,
    ],
    seed + 'port',
  );

  const outreachAngle = [
    `Open with the specific challenge — ${interest.challengeNoun} for ${productContext} — `,
    `not general admiration for ${input.dreamCompany.trim()}. `,
    scope.outreach,
  ].join('');

  return {
    title,
    whyThisFits,
    projectChallenge,
    deliverables,
    weeklyPlan: buildWeeklyPlan(input.timeAvailable, seed, role),
    skillsPracticed: role.skillSet,
    portfolioStoryAngle,
    outreachAngle,
    aiFluency: buildAiFluency(input, interest, role),
    disclaimer: BRIEF_DISCLAIMER,
  };
}

/** Plain-text export for clipboard. */
export function formatBriefAsText(brief: ProjectBrief, input: BriefGeneratorInput): string {
  const lines = [
    brief.title,
    '',
    brief.disclaimer,
    '',
    `Company: ${input.dreamCompany}`,
    `Role: ${input.targetRole}`,
    `Interests: ${input.creativeInterests}`,
    `Timeline: ${input.timeAvailable.replace(/-/g, ' ')}`,
    `Level: ${input.skillLevel.replace(/-/g, ' ')}`,
    '',
    'WHY THIS FITS THE COMPANY',
    brief.whyThisFits,
    '',
    'PROJECT CHALLENGE',
    brief.projectChallenge,
    '',
    'FINAL DELIVERABLES',
    ...brief.deliverables.map((d) => `• ${d}`),
    '',
    'WEEKLY PLAN',
    ...brief.weeklyPlan.map((w) => `${w.label}: ${w.focus}`),
    '',
    'SKILLS PRACTICED',
    brief.skillsPracticed.join(', '),
    '',
    'PORTFOLIO STORY ANGLE',
    brief.portfolioStoryAngle,
    '',
    'OUTREACH ANGLE',
    brief.outreachAngle,
    '',
    'AI FLUENCY GUIDANCE',
    `Delegation: ${brief.aiFluency.delegation}`,
    `Description: ${brief.aiFluency.description}`,
    `Discernment: ${brief.aiFluency.discernment}`,
    `Diligence: ${brief.aiFluency.diligence}`,
  ];
  return lines.join('\n');
}
