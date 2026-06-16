import {
  MapPin,
  Landmark,
  Vote,
  Route,
  Users,
  Activity,
  type LucideIcon,
} from 'lucide-react';

/**
 * Lociq sub-brand copy + structured page content.
 * Lociq is the civic layer of the Ailiur stack — a digital town hall that turns
 * local frustration into civic action. Residents report neighborhood problems,
 * understand civic options, vote on practical solutions, and organize visible
 * next steps, without getting lost in bureaucracy.
 */

export const LOCIQ_META = {
  name: 'Lociq',
  route: '/lociq',
  tagline: 'A digital town hall that actually does something.',
} as const;

export const LOCIQ_NAV = [
  { label: 'How it works', href: '#explanation' },
  { label: 'Demo', href: '#demo' },
  { label: 'Features', href: '#features' },
  { label: 'Use cases', href: '#use-cases' },
  { label: 'Ecosystem', href: '#ecosystem' },
] as const;

export const LOCIQ_NAV_CTA = { label: 'Join the waitlist', href: '#waitlist' } as const;

export const LOCIQ_HERO = {
  eyebrow: 'Civic intelligence',
  headline: 'Turn local frustration into civic action.',
  promise: 'A digital town hall that actually does something.',
  body: 'Lociq helps residents report neighborhood problems, understand civic options, vote on practical solutions, and organize visible next steps — without getting lost in bureaucracy.',
  primaryCta: { label: 'See how it works', href: '#demo' },
  secondaryCta: { label: 'Join the waitlist', href: '#waitlist' },
} as const;

export const LOCIQ_EXPLANATION = {
  eyebrow: 'What it is',
  headline: 'From complaint to coordinated action.',
  body: 'Lociq turns the things you walk past every day into a clear, shared path forward. Four steps take a neighborhood problem from “someone should fix this” to a fix that people can actually see happening.',
  points: [
    {
      title: 'Report the problem',
      body: 'Pin a neighborhood issue in seconds — a dangerous crossing, a dead streetlight, an illegal dump.',
    },
    {
      title: 'Understand the options',
      body: 'See who actually decides, what can realistically be done, and how a fix usually gets made.',
    },
    {
      title: 'Vote on solutions',
      body: 'Neighbors back practical solutions, not slogans — consensus forms around what to actually do.',
    },
    {
      title: 'Organize next steps',
      body: 'Turn agreement into visible, coordinated action with a clear timeline anyone can follow.',
    },
  ],
} as const;

export const LOCIQ_PROBLEM = {
  eyebrow: 'The real problem',
  headline: 'Frustration is everywhere. A path to action isn’t.',
  body: 'You see it daily: the crosswalk where cars never stop, the corner that floods, the trash that keeps coming back. Caring is easy. Knowing what to do — who decides, what’s realistic, how to bring neighbors along — is where it dies. So problems linger, and the energy to fix them leaks away into petitions, forms, and feeds that lead nowhere.',
  friction: [
    'You report a problem and never hear what happened to it.',
    'You don’t know who actually decides — or how to reach them.',
    'Neighbors care about the same things but never coordinate.',
    'Petitions and posts generate noise, not fixes.',
  ],
} as const;

export const LOCIQ_DEMO = {
  eyebrow: 'Interactive demo',
  headline: 'Turn one complaint into a civic action plan.',
  body: 'Pick a neighborhood issue and generate the civic path: the category, who’s responsible, three practical fixes with cost, impact, and difficulty, and how neighbors reach consensus. Back a fix and create a shareable action card. A working simulation with sample data; nothing is sent anywhere.',
} as const;

export type LociqFeature = {
  icon: LucideIcon;
  title: string;
  body: string;
  signal: 'green' | 'gold' | 'blue' | 'charcoal';
};

export const LOCIQ_FEATURES = {
  eyebrow: 'Core features',
  headline: 'Everything between “this is broken” and “this got fixed.”',
  subhead:
    'Lociq doesn’t run your city. It gives residents the missing layer: a way to report, understand, decide, and coordinate — together and in the open.',
  items: [
    {
      icon: MapPin,
      title: 'Issue reporting',
      body: 'Drop a pin on a real neighborhood problem and describe it once. No accounts to chase, no forms that vanish.',
      signal: 'green',
    },
    {
      icon: Landmark,
      title: 'Civic options',
      body: 'See who actually has authority — the department, board, or office — and what kinds of fixes are realistic.',
      signal: 'blue',
    },
    {
      icon: Vote,
      title: 'Consensus voting',
      body: 'Neighbors rank practical solutions. A consensus ring shows what people actually agree to do, not just complain about.',
      signal: 'gold',
    },
    {
      icon: Route,
      title: 'Action timeline',
      body: 'Turn agreement into ordered next steps — who, what, and when — with a route anyone can follow and join.',
      signal: 'green',
    },
    {
      icon: Activity,
      title: 'Visible status',
      body: 'Every issue stays on the map with a live status, so progress (or stalling) is transparent instead of buried.',
      signal: 'blue',
    },
    {
      icon: Users,
      title: 'Neighborhood coordination',
      body: 'Find the people who care about the same block and organize, so momentum builds instead of leaking away.',
      signal: 'gold',
    },
  ] satisfies LociqFeature[],
} as const;

export type LociqUseCase = {
  kicker: string;
  title: string;
  body: string;
};

export const LOCIQ_USE_CASES = {
  eyebrow: 'Example use cases',
  headline: 'For the problems everyone sees and no one can move.',
  items: [
    {
      kicker: 'Street safety',
      title: 'The dangerous intersection',
      body: 'A crossing where cars never yield. Neighbors back a signal over a sign, route it to the transportation office, and track it to install.',
    },
    {
      kicker: 'Public space',
      title: 'The neglected park',
      body: 'Broken lights and overgrown paths. Residents agree on priorities, organize a cleanup, and push the rest to parks & rec.',
    },
    {
      kicker: 'Housing & safety',
      title: 'The unsafe building',
      body: 'Repeated hazards in a rental. Tenants document the pattern, find each other, and escalate to code enforcement together.',
    },
    {
      kicker: 'Transit',
      title: 'The missing bus stop',
      body: 'A transit gap that strands a block. Riders show the demand, rank options, and bring a clear case to the transit authority.',
    },
  ] satisfies LociqUseCase[],
} as const;

export const LOCIQ_DIFFERENT = {
  eyebrow: 'Why this is different',
  headline: 'Not a petition. Not a complaint box. Not another political feed.',
  body: 'Most civic tools collect frustration and stop there. Lociq is built to move it forward — calmly, practically, and in the open — and is deliberately non-partisan.',
  points: [
    {
      title: 'Not a petition',
      body: 'Signatures pile up and then nothing happens. Lociq routes agreement into the next concrete step.',
    },
    {
      title: 'Not a complaint box',
      body: 'Forms disappear into a void. Here every issue stays visible, tracked, and tied to who can act.',
    },
    {
      title: 'Not a political feed',
      body: 'No outrage loop, no partisanship. Just practical, local action on things everyone can see.',
    },
    {
      title: 'Action, not opinion',
      body: 'Success is measured in fixes shipped and steps taken — not posts made or hot takes earned.',
    },
  ],
} as const;

export const LOCIQ_ECOSYSTEM = {
  eyebrow: 'The Ailiur ecosystem',
  headline: 'The civic layer of the Ailiur stack.',
  body: 'Lociq shares the same idea as the rest of Ailiur: software that understands your context. Where you live, what you care about, and the people around you travel with you across the ecosystem.',
  links: [
    {
      name: 'Ailiur',
      desc: 'The context layer that carries who you are across every app.',
      href: 'https://ailiur.com',
    },
    {
      name: 'Retellum',
      desc: 'The memory graph of everything that shaped your work and decisions.',
      href: 'https://retellum.ailiur.com',
    },
    {
      name: 'Aptellum',
      desc: 'The creative & education layer that turns intent into shippable work.',
      href: 'https://aptellum.ailiur.com',
    },
  ],
} as const;

export const LOCIQ_WAITLIST = {
  eyebrow: 'Early access',
  headline: 'Bring Lociq to your neighborhood.',
  body: 'Lociq is in private development. Join the waitlist to help shape the civic layer and get early access as we open it up, neighborhood by neighborhood.',
} as const;

export const LOCIQ_FOOTER = {
  tagline: 'A digital town hall that actually does something — built by Ailiur.',
  groups: [
    {
      title: 'Lociq',
      links: [
        { label: 'How it works', href: '#explanation' },
        { label: 'Try the demo', href: '#demo' },
        { label: 'Features', href: '#features' },
        { label: 'Use cases', href: '#use-cases' },
      ],
    },
    {
      title: 'Ecosystem',
      links: [
        { label: 'Ailiur', href: 'https://ailiur.com' },
        { label: 'Retellum', href: 'https://retellum.ailiur.com' },
        { label: 'Aptellum', href: 'https://aptellum.ailiur.com' },
      ],
    },
  ],
} as const;

/* ── Shared civic data (hero panel + demo) ─────────────────────────────────── */

export type StageId = 'report' | 'understand' | 'vote' | 'organize';

export const LOCIQ_STAGES: { id: StageId; label: string }[] = [
  { id: 'report', label: 'Report' },
  { id: 'understand', label: 'Understand' },
  { id: 'vote', label: 'Vote' },
  { id: 'organize', label: 'Organize' },
];
