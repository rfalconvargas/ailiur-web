import {
  Upload,
  Filter,
  Search,
  Tags,
  ShieldCheck,
  HardDrive,
  Package,
  type LucideIcon,
} from 'lucide-react';

/**
 * Unified Context Mesh sub-brand copy + structured page content.
 *
 * UCM is the private semantic memory layer of the Ailiur ecosystem. It turns
 * scattered ChatGPT, Claude, and Gemini exports into a fast, searchable context
 * system that every Ailiur app can draw from — so you never re-explain who you
 * are or what you are building.
 */

export const UCM_META = {
  name: 'Unified Context Mesh',
  short: 'UCM',
  route: '/ucm',
  domain: 'ucm.ailiur.com',
  tagline: 'The private semantic memory layer beneath every Ailiur app.',
} as const;

export const UCM_NAV = [
  { label: 'How it works', href: '#explanation' },
  { label: 'The problem', href: '#problem' },
  { label: 'Demo', href: '#demo' },
  { label: 'Features', href: '#features' },
  { label: 'Ecosystem', href: '#ecosystem' },
] as const;

export const UCM_NAV_CTA = { label: 'Join the waitlist', href: '#waitlist' } as const;

export const UCM_HERO = {
  eyebrow: 'A private memory layer for the Ailiur ecosystem',
  lead: 'Stop re-explaining yourself.',
  headline: 'Your AI history, unified into one private context layer.',
  body:
    'Unified Context Mesh turns exported ChatGPT, Claude, and Gemini history into app-ready context for every Ailiur app — so you never restate who you are, what you are building, or the decisions you already made.',
  primaryCta: { label: 'Try the demo', href: '#demo' },
  secondaryCta: { label: 'Join the waitlist', href: '#waitlist' },
  sources: ['ChatGPT', 'Claude', 'Gemini'] as const,
} as const;

export type UcmStep = {
  step: string;
  title: string;
  body: string;
  signal: 'chatgpt' | 'gold' | 'green';
};

export const UCM_EXPLANATION = {
  eyebrow: 'How it works',
  headline: 'A memory engine for people who live across AI tools.',
  body:
    'Three quiet steps turn months of scattered conversations into context your tools can actually use. Nothing leaves your control along the way.',
  steps: [
    {
      step: 'Import',
      title: 'Import',
      body:
        'Bring your own ChatGPT, Claude, and Gemini exports. UCM ingests them privately — no scraping, no re-typing, no copy-paste.',
      signal: 'chatgpt',
    },
    {
      step: 'Embed',
      title: 'Embed',
      body:
        'Conversations are cleaned of noise and turned into semantic vectors, then tagged to the Ailiur pillars they belong to.',
      signal: 'gold',
    },
    {
      step: 'Retrieve',
      title: 'Retrieve',
      body:
        'Every Ailiur app queries the mesh and gets back a tight context packet — the right decisions, preferences, and history, on demand.',
      signal: 'green',
    },
  ] satisfies UcmStep[],
} as const;

export type UcmSilo = {
  name: string;
  blurb: string;
  signal: 'chatgpt' | 'claude' | 'gemini';
};

export const UCM_PROBLEM = {
  eyebrow: 'The problem',
  headline: 'Your best context is trapped in the wrong place.',
  body:
    'You have already explained yourself a hundred times — your goals, your stack, your taste, the decisions you have already made. But it lives in three separate chat histories that cannot talk to each other, and none of your tools can reach it.',
  silos: [
    {
      name: 'ChatGPT',
      blurb: 'Strategy threads, drafts, and half-finished plans.',
      signal: 'chatgpt',
    },
    {
      name: 'Claude',
      blurb: 'Deep reasoning, codebase decisions, and long context.',
      signal: 'claude',
    },
    {
      name: 'Gemini',
      blurb: 'Research, summaries, and scattered exploration.',
      signal: 'gemini',
    },
  ] satisfies UcmSilo[],
  pains: [
    'Cold starts — every new chat begins from zero.',
    'Endless copy-paste between tools and tabs.',
    'Decisions you already made, lost in old threads.',
    'Re-explaining the same context again and again.',
    'Prompt bloat from pasting your whole life into the box.',
  ],
} as const;

export const UCM_DEMO = {
  eyebrow: 'Interactive demo',
  headline: 'Ask your past work what your next app should know.',
  body:
    'Type a question, and the Context Packet Builder assembles the relevant decisions, preferences, and history from across your AI exports — the same packet an Ailiur app would receive. Mock data only; nothing here touches a real account.',
} as const;

export type UcmFeature = {
  icon: LucideIcon;
  title: string;
  body: string;
  signal: 'gold' | 'green' | 'amber' | 'red' | 'chatgpt' | 'claude' | 'gemini';
};

export const UCM_FEATURES = {
  eyebrow: 'Core features',
  headline: 'Infrastructure for context, not another notes app.',
  subhead:
    'UCM does one thing well: it makes the context you already created instantly useful to the tools you already use.',
  items: [
    {
      icon: Upload,
      title: 'Private export ingestion',
      body: 'Bring your own ChatGPT, Claude, and Gemini exports. UCM reads them on your terms — never the other way around.',
      signal: 'gold',
    },
    {
      icon: Filter,
      title: 'Noise stripping',
      body: 'Boilerplate, dead ends, and filler are filtered out so only the signal — decisions, preferences, facts — survives.',
      signal: 'amber',
    },
    {
      icon: Search,
      title: 'Semantic vector search',
      body: 'Retrieval by meaning, not keywords. Ask in plain language and get back what you actually meant.',
      signal: 'green',
    },
    {
      icon: Tags,
      title: 'Ailiur pillar tagging',
      body: 'Every memory is tagged to the Ailiur pillars it belongs to, so the right app gets the right slice of you.',
      signal: 'gold',
    },
    {
      icon: ShieldCheck,
      title: 'Source provenance',
      body: 'Every retrieved fact carries its origin — which tool, which conversation — so you can always trace it back.',
      signal: 'claude',
    },
    {
      icon: HardDrive,
      title: 'Local-first architecture',
      body: 'Your mesh lives close to you, not in someone else’s walled garden. Portable by design, private by default.',
      signal: 'gemini',
    },
    {
      icon: Package,
      title: 'Instant context packets',
      body: 'Apps request a packet and get back a compact, ready-to-use brief — no prompt bloat, no re-explaining.',
      signal: 'green',
    },
  ] satisfies UcmFeature[],
} as const;

export type UcmUseCase = {
  name: string;
  kicker: string;
  body: string;
};

export const UCM_USE_CASES = {
  eyebrow: 'Across the ecosystem',
  headline: 'One mesh, every Ailiur app.',
  body:
    'The same context layer feeds each app a different view of you — the slice that makes that app feel like it already knows you.',
  items: [
    {
      name: 'Qetos',
      kicker: 'Health behavior context',
      body: 'Surfaces the routines, constraints, and goals you have already described, so health guidance starts where you are.',
    },
    {
      name: 'Enchiridion',
      kicker: 'Learning history',
      body: 'Remembers what you have studied and struggled with, so new material builds on what you already know.',
    },
    {
      name: 'Doblu',
      kicker: 'Goals, assets & workflow memory',
      body: 'Carries your objectives, assets, and the way you actually work into every plan and handoff.',
    },
    {
      name: 'Tayzt',
      kicker: 'Creative taste graph',
      body: 'Holds the aesthetic decisions and references you keep returning to, so creative output matches your taste.',
    },
    {
      name: 'Tellumetry',
      kicker: 'Codebase decisions & AI IDE context',
      body: 'Recalls architectural decisions and coding context, so your agents start informed instead of guessing.',
    },
  ] satisfies UcmUseCase[],
} as const;

export type UcmComparisonRow = {
  label: string;
  /** [Manual notes, Platform memory, Unified Context Mesh] */
  values: [string, string, string];
};

export const UCM_DIFFERENT = {
  eyebrow: 'Why this is different',
  headline: 'Not another notes app. Not another chatbot.',
  body:
    'UCM is a portable context layer that sits beneath your tools — it does not ask you to write more, and it does not lock your memory inside one vendor.',
  columns: ['Manual notes', 'Platform memory', 'Unified Context Mesh'] as const,
  highlightIndex: 2,
  rows: [
    {
      label: 'Where it lives',
      values: ['Scattered files & docs', 'Locked inside one vendor', 'A portable layer you own'],
    },
    {
      label: 'Across AI tools',
      values: ['Manual copy-paste', 'Only that platform’s chats', 'ChatGPT, Claude & Gemini together'],
    },
    {
      label: 'How it finds things',
      values: ['You search from memory', 'Keyword history search', 'Semantic vector retrieval'],
    },
    {
      label: 'Knows your projects',
      values: ['Only if you wrote it down', 'Generic, not Ailiur-aware', 'Tagged to Ailiur pillars'],
    },
    {
      label: 'Portability',
      values: ['Yours, but inert', 'Leaves when you leave', 'Yours, and instantly usable'],
    },
    {
      label: 'Feels like',
      values: ['A second job', 'A walled garden', 'Quiet infrastructure'],
    },
  ] satisfies UcmComparisonRow[],
} as const;

export const UCM_ECOSYSTEM = {
  eyebrow: 'The Ailiur ecosystem',
  headline: 'The hidden layer beneath Ailiur.',
  body:
    'Ailiur apps should not feel like isolated products. They should feel like rooms in the same intelligent house. UCM is the hallway between them.',
  links: [
    {
      name: 'Ailiur',
      desc: 'The operating system for human flourishing — the house every app is a room in.',
      href: 'https://ailiur.com',
    },
    {
      name: 'Tellumetry',
      desc: 'The transparency layer around your AI coding agents.',
      href: 'https://tellumetry.ailiur.com',
    },
    {
      name: 'Tayzt',
      desc: 'The creative taste layer that turns intent into shippable work.',
      href: 'https://tayzt.ailiur.com',
    },
  ],
} as const;

export const UCM_WAITLIST = {
  eyebrow: 'Early access',
  headline: 'Bring your context home.',
  body:
    'Unified Context Mesh is in private development. Join the waitlist to help shape the mesh and get early access as we open it up.',
} as const;

export const UCM_FOOTER = {
  tagline: 'The private semantic memory layer beneath the Ailiur ecosystem.',
  domain: 'ucm.ailiur.com',
  privacy: 'Demo uses mock data. Real UCM would use user-authorized exports.',
  groups: [
    {
      title: 'Unified Context Mesh',
      links: [
        { label: 'How it works', href: '#explanation' },
        { label: 'The problem', href: '#problem' },
        { label: 'Demo', href: '#demo' },
        { label: 'Features', href: '#features' },
      ],
    },
    {
      title: 'Ecosystem',
      links: [
        { label: 'Ailiur', href: 'https://ailiur.com' },
        { label: 'Tellumetry', href: 'https://tellumetry.ailiur.com' },
        { label: 'Tayzt', href: 'https://tayzt.ailiur.com' },
      ],
    },
  ],
} as const;
