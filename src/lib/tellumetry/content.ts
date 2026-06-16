import {
  Coins,
  Workflow,
  ShieldAlert,
  BellRing,
  Activity,
  Layers,
  type LucideIcon,
} from 'lucide-react';

/**
 * Tellumetry sub-brand copy + structured page content.
 * Tellumetry is a design-forward AI coding cockpit — the transparency layer
 * around tools like Claude Code, Cursor, Warp, GitHub, and Vercel. It estimates
 * token cost, maps agent progress, previews risk, and notifies developers only
 * when their attention is actually needed.
 */

export const TELLUMETRY_META = {
  name: 'Tellumetry',
  route: '/tellumetry',
  tagline: 'The transparency layer around your AI coding agents.',
} as const;

export const TELLUMETRY_NAV = [
  { label: 'How it works', href: '#explanation' },
  { label: 'Simulate', href: '#demo' },
  { label: 'Features', href: '#features' },
  { label: 'Use cases', href: '#use-cases' },
  { label: 'Ecosystem', href: '#ecosystem' },
] as const;

export const TELLUMETRY_NAV_CTA = { label: 'Join the waitlist', href: '#waitlist' } as const;

export const TELLUMETRY_HERO = {
  eyebrow: 'AI coding cockpit',
  headline: 'Stop babysitting your AI coding agent.',
  promise: 'Not another AI IDE — the transparency layer around the tools you already use.',
  body: 'Tellumetry shows what your agent is doing, what it will cost, where it may fail, and when you actually need to come back.',
  primaryCta: { label: 'Simulate a task', href: '#demo' },
  secondaryCta: { label: 'Join the waitlist', href: '#waitlist' },
} as const;

export const TELLUMETRY_EXPLANATION = {
  eyebrow: 'What it is',
  headline: 'A calm command center for AI-assisted coding.',
  body: 'Tellumetry turns AI coding from a black-box terminal session into a transparent, ambient command center. It sits beside your agent and answers the four questions a scrolling terminal never will.',
  points: [
    {
      title: 'Estimate the cost',
      body: 'Know the token and dollar spend before a task runs — not after the bill arrives.',
    },
    {
      title: 'Map the progress',
      body: 'Watch the agent move through Repo Scan, Plan, Edit, Test, Deploy, and Review.',
    },
    {
      title: 'Preview the risk',
      body: 'See where a run is likely to stall, break, or touch something it shouldn’t.',
    },
    {
      title: 'Reclaim your attention',
      body: 'Step away. Tellumetry pings you only when a decision genuinely needs a human.',
    },
  ],
} as const;

export const TELLUMETRY_PROBLEM = {
  eyebrow: 'The real problem',
  headline: 'Agents work fast. Watching them is exhausting.',
  body: 'AI coding agents can run for minutes or hours, but you can’t look away. There’s no cost meter, no map of where they are, no warning before things go sideways. So you sit and watch a scrolling terminal — burning your attention to babysit a tool that was supposed to give it back.',
  friction: [
    'You watch a scrolling terminal because you don’t trust it to run unattended.',
    'You have no idea what a task will cost until the tokens are already spent.',
    'When a run goes wrong, you find out three steps too late.',
    'You can’t tell the difference between “thinking” and “stuck.”',
  ],
} as const;

export const TELLUMETRY_DEMO = {
  eyebrow: 'Interactive demo',
  headline: 'Run a preflight check before you hand off the task.',
  body: 'Configure a task, model intensity, risk tolerance, and how you want to be notified. The Agent Preflight Simulator estimates tokens, cost, risk, and files touched, then animates the agent pipeline end to end. Mock data only — nothing connects to your repo.',
} as const;

export type TellumetryFeature = {
  icon: LucideIcon;
  title: string;
  body: string;
  signal: 'mint' | 'cyan' | 'green' | 'amber' | 'red';
};

export const TELLUMETRY_FEATURES = {
  eyebrow: 'Core features',
  headline: 'Everything the terminal hides, on one calm surface.',
  subhead:
    'Tellumetry doesn’t run your code. It reads the run and translates it into cost, progress, risk, and attention.',
  items: [
    {
      icon: Coins,
      title: 'Cost estimation',
      body: 'Per-task token and dollar estimates before the agent starts spending — and a live tally as it goes.',
      signal: 'amber',
    },
    {
      icon: Workflow,
      title: 'Pipeline map',
      body: 'Repo Scan → Plan → Edit → Test → Deploy → Review, rendered live and legible instead of buried in logs.',
      signal: 'cyan',
    },
    {
      icon: ShieldAlert,
      title: 'Risk preview',
      body: 'Flags risky edits, missing tests, and likely failure points before the agent commits to them.',
      signal: 'red',
    },
    {
      icon: BellRing,
      title: 'Attention routing',
      body: 'Ambient notifications that fire only when a human decision is actually required — and stay quiet otherwise.',
      signal: 'green',
    },
    {
      icon: Activity,
      title: 'Token load',
      body: 'Real-time token burn and context pressure across the run, so you see the squeeze before it stalls.',
      signal: 'mint',
    },
    {
      icon: Layers,
      title: 'Tool-agnostic layer',
      body: 'Sits over Claude Code, Cursor, Warp, GitHub, and Vercel — a transparency layer, not a replacement.',
      signal: 'cyan',
    },
  ] satisfies TellumetryFeature[],
} as const;

export type TellumetryUseCase = {
  kicker: string;
  title: string;
  body: string;
};

export const TELLUMETRY_USE_CASES = {
  eyebrow: 'Example use cases',
  headline: 'For anyone who lets an agent off the leash.',
  items: [
    {
      kicker: 'Solo builders',
      title: 'Ship without hovering',
      body: 'Kick off a task and do real work. The cockpit watches the run and taps you only when it matters.',
    },
    {
      kicker: 'Teams',
      title: 'Shared visibility',
      body: 'Everyone sees the same cost, progress, and risk on one surface — no more “what is the agent doing?”',
    },
    {
      kicker: 'Agencies & freelancers',
      title: 'Predictable cost',
      body: 'Estimate token spend per task before you start, so quotes and budgets survive contact with reality.',
    },
    {
      kicker: 'Long migrations',
      title: 'Unattended runs',
      body: 'Start a big refactor or migration and trust the attention checks to bring you back at the right moments.',
    },
  ] satisfies TellumetryUseCase[],
} as const;

export const TELLUMETRY_DIFFERENT = {
  eyebrow: 'Why this is different',
  headline: 'Tellumetry doesn’t replace your agent. It makes it legible.',
  body: 'Most AI coding tools want to be the place you write code. Tellumetry wants to be the place you understand it — the instrument panel around whatever agent you already trust.',
  points: [
    {
      title: 'Not an IDE',
      body: 'We don’t replace your editor or your agent. We wrap them in a layer you can actually read.',
    },
    {
      title: 'Transparency, not autopilot',
      body: 'You stay in control. We just remove the blindfold and show you the run as it happens.',
    },
    {
      title: 'Cost-aware by default',
      body: 'Every task carries an estimate before it runs, so spend is a decision, not a surprise.',
    },
    {
      title: 'Attention is the product',
      body: 'The goal isn’t more dashboards to stare at. It’s giving your focus back until it’s needed.',
    },
  ],
} as const;

export const TELLUMETRY_ECOSYSTEM = {
  eyebrow: 'The Ailiur ecosystem',
  headline: 'Part of the Ailiur context ecosystem.',
  body: 'Tellumetry shares the same idea as the rest of Ailiur: software that understands your context. Your projects, your tools, and your working style travel with you across the ecosystem.',
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

export const TELLUMETRY_WAITLIST = {
  eyebrow: 'Early access',
  headline: 'Get Tellumetry before your next big run.',
  body: 'Tellumetry is in private development. Join the waitlist to help shape the cockpit and get early access as we open it up.',
} as const;

export const TELLUMETRY_FOOTER = {
  tagline:
    'The transparency layer around your AI coding agents — cost, progress, and risk on one calm surface. Built by Ailiur.',
  groups: [
    {
      title: 'Tellumetry',
      links: [
        { label: 'How it works', href: '#explanation' },
        { label: 'Simulate a task', href: '#demo' },
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

/* ── Shared cockpit data (hero panel + simulator) ──────────────────────────── */

export type StageId = 'scan' | 'plan' | 'edit' | 'test' | 'deploy' | 'review';

export const TELLUMETRY_STAGES: { id: StageId; label: string }[] = [
  { id: 'scan', label: 'Repo Scan' },
  { id: 'plan', label: 'Plan' },
  { id: 'edit', label: 'Edit' },
  { id: 'test', label: 'Test' },
  { id: 'deploy', label: 'Deploy' },
  { id: 'review', label: 'Review' },
];
