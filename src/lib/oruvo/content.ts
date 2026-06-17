/**
 * Oruvo by Ailiur — all marketing copy, the single naming constant, and the
 * illustrative demo data live here so the page can be re-skinned or renamed
 * from one file. To rebrand away from "Oruvo", edit BRAND only.
 *
 * ⚠️  Every number below is SAMPLE / ILLUSTRATIVE data for an MVP preview.
 *     Nothing here is real account data, advice, or a forecast.
 */

import type { LucideIcon } from 'lucide-react';
import {
  Wallet,
  LineChart,
  CreditCard,
  Repeat,
  Boxes,
  Sparkles,
  TrendingDown,
  Clock,
  Laptop,
  Camera,
  Shirt,
  Car,
  BookOpen,
  Armchair,
  Home,
  Briefcase,
  Send,
  Hammer,
  Film,
} from 'lucide-react';

/* ── Naming — change these to rebrand the whole site ──────────── */
export const BRAND = {
  name: 'Oruvo',
  parent: 'Ailiur',
  full: 'Oruvo by Ailiur',
  tagline: 'Your life balance sheet.',
  host: 'oruvo.ailiur.com',
  url: 'https://oruvo.ailiur.com',
} as const;

export const DEMO_NOTE = 'Illustrative sample data — not your accounts, not advice.';

/** Exact legal disclaimer shown in the footer. */
export const DISCLAIMER =
  'Oruvo by Ailiur is an early product concept and waitlist preview. It does not provide financial, investment, tax, or legal advice. Demo data is illustrative.';

/** Tiny affordance labels that make each interactive demo discoverable. */
export const HINTS = {
  heroTabs: 'Tap a tab to switch the view',
  assetMap: 'Click an item to inspect it',
  planner: 'Adjust the sliders to move the timeline',
  subscriptions: 'Toggle keep / review / cancel',
  scenarios: 'Pick a question to see the working',
} as const;

/* ── Navigation ───────────────────────────────────────────────── */
export const NAV_LINKS = [
  { label: 'Balance sheet', href: '#balance-sheet' },
  { label: 'Why Oruvo', href: '#why' },
  { label: 'Asset map', href: '#asset-map' },
  { label: 'Plan ahead', href: '#planner' },
  { label: 'Scenarios', href: '#scenarios' },
  { label: 'Trust', href: '#trust' },
] as const;

/* ── 1 · Hero ─────────────────────────────────────────────────── */
export const HERO = {
  eyebrow: 'A wealth intelligence companion · Early access',
  headline: 'Your life, translated into assets, goals, and next moves.',
  subhead:
    'Oruvo by Ailiur maps what you own, what you owe, what you want, and what your time is worth — so the next move with your money is clear, not a guess.',
  primaryCta: 'Join the waitlist',
  secondaryCta: 'Explore the demo',
  microtrust: ['Read-only by design', 'You own your data', 'Not investment advice'],
} as const;

export type HeroTabKey = 'assets' | 'goals' | 'time' | 'home';
export type HeroTab = {
  key: HeroTabKey;
  label: string;
  icon: LucideIcon;
  headline: string;
  rows: { label: string; value: string; tone?: 'pos' | 'neg' | 'gold' }[];
};

export const HERO_TABS: HeroTab[] = [
  {
    key: 'assets',
    label: 'Assets',
    icon: Boxes,
    headline: 'Net worth',
    rows: [
      { label: 'Cash & savings', value: '$18,420' },
      { label: 'Investments', value: '$41,260', tone: 'pos' },
      { label: 'Belongings (resale)', value: '$22,150', tone: 'gold' },
      { label: 'Debt', value: '−$9,800', tone: 'neg' },
    ],
  },
  {
    key: 'goals',
    label: 'Goals',
    icon: Sparkles,
    headline: 'On the wishlist',
    rows: [
      { label: 'Studio upgrade', value: '7 mo away' },
      { label: 'Emergency fund', value: '74% funded', tone: 'pos' },
      { label: 'Camera lens', value: '2 mo away', tone: 'gold' },
    ],
  },
  {
    key: 'time',
    label: 'Time ROI',
    icon: Clock,
    headline: 'Where your hours point',
    rows: [
      { label: 'Day job', value: 'Anchor income' },
      { label: 'Freelance project', value: '+$1,400 / mo', tone: 'pos' },
      { label: 'Portfolio sprint', value: 'Compounding', tone: 'gold' },
    ],
  },
  {
    key: 'home',
    label: 'Home Map',
    icon: Home,
    headline: 'Where it all lives',
    rows: [
      { label: 'Desk', value: '4 items' },
      { label: 'Garage', value: 'Tesla Model X', tone: 'gold' },
      { label: 'Future room', value: 'Planned', tone: 'pos' },
    ],
  },
];

/* ── 2 · Interactive Life Balance Sheet ───────────────────────── */
export type MetricDatum = {
  key: string;
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: string;
  tone: 'neutral' | 'pos' | 'neg' | 'gold';
  note: string;
};

export const BALANCE_SHEET: MetricDatum[] = [
  { key: 'cash', icon: Wallet, label: 'Cash', value: '$18,420', delta: '+$540 this mo', tone: 'pos', note: 'Across 2 checking, 1 savings' },
  { key: 'investments', icon: LineChart, label: 'Investments', value: '$41,260', delta: '+2.1%', tone: 'pos', note: 'Brokerage + retirement' },
  { key: 'credit', icon: CreditCard, label: 'Credit cards', value: '$2,310', delta: 'Due in 9 days', tone: 'neutral', note: 'Statement balance, 2 cards' },
  { key: 'subscriptions', icon: Repeat, label: 'Subscriptions', value: '$214 / mo', delta: '11 active', tone: 'neutral', note: '2 flagged to review' },
  { key: 'assets', icon: Boxes, label: 'Physical assets', value: '$22,150', delta: '38 logged', tone: 'gold', note: 'Estimated resale value' },
  { key: 'wishlist', icon: Sparkles, label: 'Wishlist', value: '$9,800', delta: '6 goals', tone: 'gold', note: 'Planned, not purchased' },
  { key: 'debt', icon: TrendingDown, label: 'Debt', value: '$9,800', delta: '−$300 / mo', tone: 'neg', note: 'Auto loan + card balance' },
  { key: 'career', icon: Clock, label: 'Career ROI', value: '+$1,400 / mo', delta: 'Scenario', tone: 'pos', note: 'Freelance upside, illustrative' },
];

export const BALANCE_NET_WORTH = '$69,720';

/* ── Differentiation ──────────────────────────────────────────── */
export type Differentiator = { tool: string; slice: string; oruvo: string };

export const DIFFERENTIATION = {
  eyebrow: 'Why Oruvo',
  headline: 'Other tools track a slice. Oruvo maps the whole sheet.',
  intro:
    'Budgeting, inventory, and net-worth apps each own one column of your financial life. Oruvo is designed to hold all of them in one place — money, belongings, goals, and time.',
  rows: [
    { tool: 'Monarch · Copilot', slice: 'Budgets and bank balances', oruvo: 'Plus belongings, goals, and time on one sheet' },
    { tool: 'Rocket Money', slice: 'Cancels subscriptions', oruvo: 'Subscriptions as one signal in the full picture' },
    { tool: 'Empower', slice: 'Investments and net worth', oruvo: 'Net worth that also counts what you physically own' },
    { tool: 'Sortly · home inventory', slice: 'A list of your stuff', oruvo: 'Belongings valued and linked to goals and resale' },
    { tool: 'Amazon order history', slice: 'What you bought there', oruvo: 'What you own anywhere — value, warranty, resale window' },
  ] as Differentiator[],
  footnote:
    'Comparisons describe each product’s focus, not feature parity. Oruvo is an early MVP preview; several capabilities above are designed, not yet shipped.',
} as const;

/* ── 3 · Spatial Asset Map ────────────────────────────────────── */
export type AssetItem = {
  id: string;
  name: string;
  icon: LucideIcon;
  zone: string;
  purchased: string;
  value: string;
  replacement: string;
  warranty: string;
  warrantyOk: boolean;
  resaleWindow: string;
  linkedGoal: string;
};

export const ASSET_ZONES = ['Desk', 'Wardrobe', 'Garage', 'Kitchen', 'Studio', 'Future Room'] as const;

export const ASSET_ITEMS: AssetItem[] = [
  {
    id: 'laptop',
    name: 'Laptop',
    icon: Laptop,
    zone: 'Desk',
    purchased: 'Mar 2023',
    value: '$1,150',
    replacement: '$2,200',
    warranty: 'Expires Mar 2026',
    warrantyOk: true,
    resaleWindow: 'Best resold before next chip cycle',
    linkedGoal: 'Studio upgrade',
  },
  {
    id: 'camera',
    name: 'Camera',
    icon: Camera,
    zone: 'Studio',
    purchased: 'Nov 2022',
    value: '$890',
    replacement: '$1,600',
    warranty: 'Expired',
    warrantyOk: false,
    resaleWindow: 'Holds value — resale strong now',
    linkedGoal: 'Camera lens',
  },
  {
    id: 'jacket',
    name: 'Jacket',
    icon: Shirt,
    zone: 'Wardrobe',
    purchased: 'Jan 2024',
    value: '$240',
    replacement: '$420',
    warranty: 'N/A',
    warrantyOk: true,
    resaleWindow: 'Seasonal — list in autumn',
    linkedGoal: 'Wardrobe refresh',
  },
  {
    id: 'tesla',
    name: 'Tesla Model X',
    icon: Car,
    zone: 'Garage',
    purchased: 'Jun 2021',
    value: '$48,500',
    replacement: '$79,000',
    warranty: 'Battery covered to 2029',
    warrantyOk: true,
    resaleWindow: 'Depreciation slowing — hold',
    linkedGoal: 'Emergency fund',
  },
  {
    id: 'bookshelf',
    name: 'Bookshelf',
    icon: BookOpen,
    zone: 'Future Room',
    purchased: 'Aug 2023',
    value: '$180',
    replacement: '$320',
    warranty: 'N/A',
    warrantyOk: true,
    resaleWindow: 'Low resale — keep',
    linkedGoal: 'Future studio',
  },
  {
    id: 'chair',
    name: 'Desk Chair',
    icon: Armchair,
    zone: 'Desk',
    purchased: 'Feb 2023',
    value: '$430',
    replacement: '$760',
    warranty: 'Expires Feb 2028',
    warrantyOk: true,
    resaleWindow: 'Premium brand — resells well',
    linkedGoal: 'Studio upgrade',
  },
];

/* ── 4 · Future Studio / House Planner ─────────────────────────── */
export type WishItem = { id: string; name: string; icon: LucideIcon; price: number };

export const WISH_ITEMS: WishItem[] = [
  { id: 'apartment', name: 'Apartment deposit', icon: Home, price: 6000 },
  { id: 'desk', name: 'Studio desk', icon: Boxes, price: 900 },
  { id: 'lens', name: 'Camera lens', icon: Camera, price: 1300 },
  { id: 'car', name: 'Car upgrade', icon: Car, price: 12000 },
  { id: 'wardrobe', name: 'Wardrobe refresh', icon: Shirt, price: 1500 },
  { id: 'fund', name: 'Emergency fund', icon: Wallet, price: 9000 },
];

export const PLANNER_DEFAULTS = { monthlySavings: 600, currentFunds: 2400 };

/* ── 5 · Subscription & price/value tracker ───────────────────── */
export type SubStatus = 'keep' | 'review' | 'cancel';
export type Subscription = {
  id: string;
  name: string;
  category: string;
  icon: LucideIcon;
  cost: number;
  value: 1 | 2 | 3 | 4 | 5; // value-for-money rating
  defaultStatus: SubStatus;
};

export const SUBSCRIPTIONS: Subscription[] = [
  { id: 'design', name: 'Design tools', category: 'Work', icon: Sparkles, cost: 55, value: 5, defaultStatus: 'keep' },
  { id: 'streaming', name: 'Streaming', category: 'Lifestyle', icon: Film, cost: 23, value: 2, defaultStatus: 'review' },
  { id: 'gym', name: 'Gym', category: 'Health', icon: TrendingDown, cost: 39, value: 3, defaultStatus: 'review' },
  { id: 'cloud', name: 'Cloud storage', category: 'Work', icon: Boxes, cost: 12, value: 4, defaultStatus: 'keep' },
  { id: 'ai', name: 'AI tools', category: 'Work', icon: Sparkles, cost: 40, value: 5, defaultStatus: 'keep' },
];

/* ── 6 · Career & Time ROI ────────────────────────────────────── */
export type TimeRoi = {
  id: string;
  title: string;
  icon: LucideIcon;
  hours: string;
  upside: string;
  confidence: 'Low' | 'Medium' | 'High';
};

export const TIME_ROI: TimeRoi[] = [
  { id: 'job', title: 'Current job', icon: Briefcase, hours: '160 hrs / mo', upside: 'Anchor income', confidence: 'High' },
  { id: 'freelance', title: 'Freelance project', icon: Hammer, hours: '24 hrs / mo', upside: 'Up to +$1,400', confidence: 'Medium' },
  { id: 'portfolio', title: 'Portfolio sprint', icon: Sparkles, hours: '16 hrs / mo', upside: 'Compounding reach', confidence: 'Low' },
  { id: 'network', title: 'Networking message', icon: Send, hours: '1 hr / mo', upside: 'Optionality', confidence: 'Low' },
  { id: 'research', title: 'YouTube research', icon: Film, hours: '8 hrs / mo', upside: 'Skill + audience', confidence: 'Medium' },
];

/* ── 7 · AI Scenario Planner ──────────────────────────────────── */
export type Scenario = {
  prompt: string;
  assumptions: string[];
  calculation: string;
  answer: string;
  caution: string;
};

export const SCENARIOS: Scenario[] = [
  {
    prompt: 'Can I afford a studio upgrade by September?',
    assumptions: ['$600/mo set aside', '$2,400 available now', 'Studio target ≈ $6,000'],
    calculation: '($6,000 − $2,400) ÷ $600 ≈ 6 months',
    answer: 'Reachable around September if savings hold — about 6 months out.',
    caution: 'Assumes no large unplanned expenses. Adjust the inputs to see it move.',
  },
  {
    prompt: 'Which subscription should I review first?',
    assumptions: ['Streaming flagged low value (2/5)', 'Used twice this month'],
    calculation: '$23/mo × 12 = $276 / yr at low utilisation',
    answer: 'Streaming — lowest value-for-money and lightly used. Reviewing it frees ~$276/yr.',
    caution: 'Value ratings are illustrative — only you know what you actually use.',
  },
  {
    prompt: 'What purchase would most improve my workflow?',
    assumptions: ['Camera lens linked to active studio goal', 'Strong resale on current gear'],
    calculation: 'Lens $1,300 − partial resale of old gear ≈ net $900',
    answer: 'The camera lens — it links to an active goal and your current gear resells well.',
    caution: 'A workflow guess, not a recommendation to buy. Timing is yours.',
  },
  {
    prompt: 'How does this job change my 12-month runway?',
    assumptions: ['Anchor income steady', 'Freelance adds up to $1,400/mo, variable'],
    calculation: 'Runway = savings ÷ monthly burn, re-projected with new income',
    answer: 'A steady anchor plus variable freelance extends your projected runway materially.',
    caution: 'Freelance income is variable — runway shown is a scenario, not a forecast.',
  },
];

/* ── 8 · Privacy / Trust / Compliance ─────────────────────────── */
export const TRUST = {
  headline: 'Your money data should explain itself.',
  lines: [
    'Built for transparent scenarios, not black-box promises.',
    'Oruvo is not a bank, broker, or a registered investment, tax, or legal adviser in this MVP.',
    'No guaranteed returns. No stock-picking promises. No hidden magic.',
  ],
  badges: ['Read-only by design', 'You own your data', 'Exportable & deletable', 'Not investment advice'],
  futureNote:
    'Secure account connections (e.g. Plaid), bank/brokerage sync, and encryption hardening are designed for a later release — none are part of this MVP preview, which runs on illustrative demo data only.',
} as const;

/* ── 9 · Waitlist ─────────────────────────────────────────────── */
export const WAITLIST = {
  eyebrow: 'Early access',
  headline: 'Be early to your life balance sheet.',
  intro:
    'We are opening Oruvo to a small first group. It is an MVP — it will grow with you. Tell us what you want it to make visible first.',
  helpOptions: [
    'Belongings',
    'Budget',
    'Investments',
    'Subscriptions',
    'Future home/studio',
    'Career ROI',
    'All of it',
  ],
  cta: 'Request my invite',
  busyCta: 'Adding you…',
  privacy: 'No spam, ever. One email when your invite is ready, and you can leave anytime.',
  success: {
    title: "You're on the list.",
    body: 'You’re among the first to shape Oruvo. We’ll send a single email the moment your seat opens — nothing else.',
  },
} as const;

/* ── Footer ───────────────────────────────────────────────────── */
export const ECOSYSTEM = {
  note: 'Oruvo is part of the Ailiur ecosystem — an AI-first family of products for health, learning, media, and wealth.',
  siblings: ['Qetos', 'Enchiridion', 'Moment', 'Ollune'],
} as const;
