/**
 * Page-specific content for /aptellum — supplements @/lib/aptellum/content.ts
 * with landing-page structure, nav anchors, and tool-card metadata.
 */

import type { LucideIcon } from 'lucide-react';
import {
  Compass,
  Map,
  PenLine,
  Sparkles,
  Send,
} from 'lucide-react';

// ─── Navigation ──────────────────────────────────────────────────────────────

export const PAGE_NAV = [
  { label: 'Problem', href: '#problem' },
  { label: 'Studio', href: '#studio' },
  { label: 'Tools', href: '#tools' },
  { label: 'AI Fluency', href: '#fluency' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'Pilot', href: '#pilot' },
] as const;

export const PAGE_NAV_CTA = {
  label: 'Generate a Brief',
  href: '#prototype',
} as const;

// ─── Hero ────────────────────────────────────────────────────────────────────

export const PAGE_HERO = {
  eyebrow: 'The AI Co-op Studio for Creative Education',
  headline: 'Build the work that gets you hired.',
  subhead:
    'Aptellum is an AI co-op studio for creative education — turning career goals into guided projects, portfolio evidence, and internship pathways.',
  primaryCta: { label: 'Generate your first co-op brief', href: '#prototype' },
  secondaryCta: { label: 'Explore the studio', href: '#studio' },
} as const;

export const HERO_MOCK = {
  dreamCompany: 'Apple',
  role: 'Product Design Intern',
  project: 'Accessibility-first creative tool onboarding',
  status: 'Brief generated',
  nextStep: 'Build portfolio evidence',
} as const;

// ─── Problem ─────────────────────────────────────────────────────────────────

export const PAGE_PROBLEM = {
  eyebrow: 'The preparation gap',
  headline: 'Talent is not the problem. Translation is.',
  body:
    'Many creative students leave school with skill, taste, and ambition — but without enough professional translation. They need to know what companies fit them, what work to make, how to present it, and how to turn school into real-world opportunity.',
  before: {
    label: 'Before Aptellum',
    steps: [
      'Class project',
      'portfolio confusion',
      'random applications',
      'silence',
    ],
  },
  after: {
    label: 'With Aptellum',
    steps: [
      'Career target',
      'project brief',
      'proof-of-work',
      'feedback',
      'internship pathway',
    ],
  },
} as const;

// ─── Loop (5 steps) ────────────────────────────────────────────────────────────

export type LoopStepItem = {
  step: number;
  title: string;
  body: string;
  icon: LucideIcon;
};

export const PAGE_LOOP = {
  eyebrow: 'The Aptellum loop',
  headline: 'From interest to internship.',
  subhead:
    'A repeatable studio cycle — inspired by co-op education and project-based learning — that turns scattered ambition into evidence employers can evaluate.',
  steps: [
    {
      step: 1,
      title: 'Discover',
      body: 'Name the companies, roles, and kinds of work that pull you — mapped to real creative fields, not generic career categories.',
      icon: Compass,
    },
    {
      step: 2,
      title: 'Map',
      body: 'Translate interests into a scoped co-op brief with deliverables, constraints, and evaluation criteria scaled to where you are now.',
      icon: Map,
    },
    {
      step: 3,
      title: 'Make',
      body: 'Build the project with AI as studio partner — tracking process, iterations, and decisions reviewers actually want to see.',
      icon: PenLine,
    },
    {
      step: 4,
      title: 'Refine',
      body: 'Pressure-test craft, relevance, and presentation through structured feedback — developing discernment you can apply without a mentor in the room.',
      icon: Sparkles,
    },
    {
      step: 5,
      title: 'Apply',
      body: 'Package proof-of-work into portfolio case studies, outreach materials, and internship pathways you can send with confidence.',
      icon: Send,
    },
  ] satisfies LoopStepItem[],
} as const;

// ─── Tools preview ───────────────────────────────────────────────────────────

export type ToolPreviewCard = {
  title: string;
  forWhom: string;
  produces: string;
  whyItMatters: string;
};

export const PAGE_TOOLS = {
  eyebrow: 'Studio tools',
  headline: 'Everything you need before the application.',
  subhead:
    'Three on-page studio tools that turn career uncertainty into guided work — each producing artifacts you can revise, show, and stand behind.',
  items: [
    {
      title: 'Dream Company Project Generator',
      forWhom: 'Students with a target studio, museum, or practice in mind',
      produces: 'A scoped brief with deliverables, timeline, and evaluation criteria modeled on that company\'s real work',
      whyItMatters: 'You practice toward a world you want to enter — not a hypothetical assignment',
    },
    {
      title: 'Portfolio Readiness Score',
      forWhom: 'Students preparing applications or reviews',
      produces: 'A supportive studio critique of case-study completeness, process documentation, and presentation quality',
      whyItMatters: 'You know what to strengthen before a recruiter sees your work — framed as preparation, not verdict',
    },
    {
      title: 'Outreach Draft Studio',
      forWhom: 'Students ready to introduce their work to employers or programs',
      produces: 'Cover letters, introduction emails, and project summaries calibrated to work you have actually made',
      whyItMatters: 'Outreach reads as specific and credible — not a template filled with empty adjectives',
    },
  ] satisfies ToolPreviewCard[],
} as const;

// ─── AI interaction modes ──────────────────────────────────────────────────────

export const INTERACTION_MODES = [
  {
    id: 'automation',
    title: 'Automation',
    body: 'AI handles repetitive scaffolding — research synthesis, format templates, schedule drafts — so you spend time on judgment, not busywork.',
  },
  {
    id: 'augmentation',
    title: 'Augmentation',
    body: 'AI expands your range — variation exploration, reference gathering, first-draft structure — while you set direction and own the final call.',
  },
  {
    id: 'agency',
    title: 'Agency',
    body: 'You remain the author. Concept, critique, craft, and disclosure stay student-owned — with AI participation documented transparently.',
  },
] as const;

export const PAGE_FLUENCY = {
  eyebrow: 'AI fluency layer',
  headline: 'AI fluency built into the workflow.',
  subhead:
    'Four operating principles embedded in every project — so students graduate fluent in collaboration, not dependent on automation.',
  pillarSummaries: {
    delegation: 'Decide what the student owns and what AI supports.',
    description: 'Turn vague goals into clear project instructions.',
    discernment: 'Evaluate whether suggestions are useful, accurate, and aligned.',
    diligence: 'Make AI-assisted work transparent, responsible, and student-owned.',
  },
} as const;

// ─── Creative tracks (landing page set) ───────────────────────────────────────

export const PAGE_TRACKS = [
  { discipline: 'Product Design', tagline: 'Ship digital work that shows systems thinking.' },
  { discipline: 'Industrial Design', tagline: 'From sketch to object — with manufacturing reality in the loop.' },
  { discipline: 'Film / Animation', tagline: 'Tell stories that demonstrate craft, pacing, and authorship.' },
  { discipline: 'Illustration', tagline: 'Build a voice employers can recognize in three images.' },
  { discipline: 'Architecture', tagline: 'Show spatial thinking grounded in site, program, and culture.' },
  { discipline: 'Game Design', tagline: 'Design experiences where mechanics, narrative, and feel converge.' },
  { discipline: 'Creative Technology', tagline: 'Where code, interaction, and culture meet.' },
  { discipline: 'Museum / Curatorial', tagline: 'Demonstrate how you frame art for public encounter.' },
  { discipline: 'Brand / Strategy', tagline: 'Connect visual systems to audience, positioning, and business context.' },
  { discipline: 'Writing / Editorial', tagline: 'Make argument and voice visible in form.' },
] as const;

// ─── Pilot ───────────────────────────────────────────────────────────────────

export const PAGE_PILOT = {
  eyebrow: 'Creative co-op pilot',
  headline: 'Start as a creative co-op pilot.',
  body:
    'The first version does not need a full job marketplace. It starts with guided project briefs, portfolio readiness, outreach support, and alumni/employer review loops — the preparation layer that makes every later application more credible.',
  bullets: [
    'Studio-grade briefs scoped to your discipline and dream companies',
    'Portfolio case studies with process documentation and AI disclosure',
    'Outreach drafts calibrated to work you have actually made',
    'Review loops with alumni practitioners and employer partners',
  ],
  cta: { label: 'Join the pilot waitlist', href: '#waitlist' },
} as const;

// ─── Final CTA ───────────────────────────────────────────────────────────────

export const PAGE_FINAL_CTA = {
  headline: 'Every student should graduate with proof that they can work.',
  body:
    'Join the Aptellum pilot and generate your first co-op brief — built for creative students who are ready to make work they can stand behind.',
  primaryCta: { label: 'Start the Aptellum pilot', href: '#waitlist' },
  secondaryCta: { label: 'Generate a brief', href: '#prototype' },
} as const;
