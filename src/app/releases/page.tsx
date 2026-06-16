import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import { SmartLink } from '@/components/ui/smart-link';

export const metadata: Metadata = {
  title: 'Product Releases — Ailiur',
  description:
    'Release Notes 1 (June 15, 2026): the Ailiur ecosystem comes together — Enchiridion, Qetos, Oruvo, Retellum, Tayzt, and Tellumetry, new pricing, and the Unified Context Mesh.',
};

type Tag = 'New' | 'Updated' | 'Changed' | 'Removed';

const TAG_STYLE: Record<Tag, string> = {
  New: 'bg-accent-green/15 text-accent-green',
  Updated: 'bg-ketofy/15 text-ketofy',
  Changed: 'bg-foreground/10 text-foreground/80',
  Removed: 'bg-accent-red/15 text-accent-red',
};

type Entry = {
  tag: Tag;
  title: string;
  items: string[];
  link?: { label: string; href: string };
};

const ENTRIES: Entry[] = [
  {
    tag: 'New',
    title: 'Six consumer products, one connected ecosystem',
    items: [
      'Ailiur is now presented as a connected system, not a single app — six focused consumer products that grow more useful together.',
      'Enchiridion — the AI learning engine that turns books, lectures, and research into structured knowledge graphs.',
      'Qetos — the AI health companion that makes complex protocols feel manageable day to day.',
      'Oruvo — the AI wealth and productivity hub connecting money, time, assets, and goals.',
      'Retellum — the AI media graph for logging, reviewing, and learning from what you consume.',
      'Tayzt — the AI creative engine that organizes taste, references, and creative direction.',
      'Tellumetry — the transparent AI workspace that makes AI-assisted building easy to inspect and control.',
    ],
    link: { label: 'Read “What is Ailiur?”', href: '/blog/what-is-ailiur' },
  },
  {
    tag: 'New',
    title: 'The Unified Context Mesh (UCM)',
    items: [
      'The UCM is now the connective layer at the center of the ecosystem — useful context from one product can improve another, with user control.',
      'Positioned as local-first by default, so the system stays private and fast while becoming more helpful over time.',
    ],
    link: { label: 'Explore the Mesh', href: '/platform/mesh' },
  },
  {
    tag: 'New',
    title: 'A clearer three-tier pricing system',
    items: [
      'Core — $15/mo: one focused product, local-first storage, basic UCM memory, standard AI usage, one workspace, and data export.',
      'Mesh — $50/mo (Most popular): all consumer products, cross-app UCM, higher AI usage limits, multi-device sync, automations, and connected insights.',
      'Operator — $150/mo: everything in Mesh plus highest consumer AI limits, advanced agents and workflows, advanced Tayzt and Tellumetry tools, model routing, and premium support.',
      'Enterprise — custom: admin controls, SSO, audit logs, and deployment support for organizations.',
      'Added an annual/monthly toggle (Annual −20%), a founding-member banner, and a “Which plan is right for me?” guide.',
    ],
    link: { label: 'Compare plans', href: '/pricing' },
  },
  {
    tag: 'New',
    title: 'Careers — building with Ailiur',
    items: [
      'Launched a dedicated Careers page centered on the one role open today: Technical Cofounder / Founding Software Engineer.',
      'Added a future-roles talent network across engineering, AI, design, media, education, growth, and advisors, plus the operating principles behind how the team works.',
    ],
    link: { label: 'View Careers', href: '/careers' },
  },
  {
    tag: 'New',
    title: 'Blog and the first post',
    items: [
      'Introduced the Ailiur blog with a clean index and individual article pages.',
      'Published the first post, “What is Ailiur?”, explaining the connected ecosystem and how the products fit together.',
    ],
    link: { label: 'Read the blog', href: '/blog' },
  },
  {
    tag: 'Updated',
    title: 'Homepage and app launch',
    items: [
      'The “Launch the apps” section now opens Enchiridion and Qetos with their current logos.',
      'Refreshed hero copy to reflect Qetos and Enchiridion connected by the Context Mesh.',
    ],
  },
  {
    tag: 'Updated',
    title: 'Help Center and FAQs',
    items: [
      'Rebuilt the Help Center with a search experience, getting-started cards, and seven topic categories spanning products, the UCM, pricing, privacy, the Enterprise Suite, and troubleshooting.',
      'Replaced the short FAQ list with a grouped, accordion-based FAQ across General, Products, Unified Context Mesh, Pricing, Privacy, and Enterprise.',
    ],
    link: { label: 'Open the Help Center', href: '/help' },
  },
  {
    tag: 'Changed',
    title: 'Consistent product naming',
    items: [
      'Standardized current product names across the site: Enchiridion, Qetos, Oruvo, Retellum, Tayzt, and Tellumetry.',
      'Defined the Enterprise Suite: Civis, Iris, Aptellum, Qetos Provider, Enchiridion Institution, Oruvo Advisors, and the Unified Context Mesh API.',
    ],
  },
  {
    tag: 'Removed',
    title: 'Retired the “Switch to Ailiur” section',
    items: [
      'Removed the “Switch to Ailiur” entry from the navigation, footer, and FAQ, along with its standalone route, to keep the experience focused.',
    ],
  },
];

export default function ReleasesPage() {
  return (
    <main className="relative mx-auto w-full max-w-4xl px-4 pb-24 pt-36 sm:pt-44">
      {/* Hero */}
      <header className="text-center">
        <span className="glass-strong inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/70">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
          Product Releases
        </span>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-[1.04] tracking-tight text-foreground">
          Release Notes
        </h1>
        <div className="mt-5 flex items-center justify-center gap-3 text-sm font-semibold text-foreground/60">
          <span className="rounded-full bg-accent-green/15 px-3 py-1 text-accent-green">Release 1</span>
          <span>June 15, 2026</span>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70">
          The ecosystem comes together. This release introduces Ailiur’s six consumer products, a
          clearer pricing system, and the Unified Context Mesh as the connective layer between them —
          along with a new blog, careers, and a fully rebuilt Help Center and FAQ.
        </p>
      </header>

      {/* Changelog entries */}
      <div className="mt-16 space-y-5">
        {ENTRIES.map((entry) => (
          <article key={entry.title} className="glass rounded-[var(--radius-card)] p-7 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${TAG_STYLE[entry.tag]}`}
              >
                {entry.tag}
              </span>
              <h2 className="font-display text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
                {entry.title}
              </h2>
            </div>
            <ul className="mt-5 space-y-2.5">
              {entry.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground/75">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-green" />
                  {item}
                </li>
              ))}
            </ul>
            {entry.link && (
              <SmartLink
                href={entry.link.href}
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground"
              >
                {entry.link.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </SmartLink>
            )}
          </article>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-12 text-center text-sm text-foreground/55">
        Questions about a change? Visit the{' '}
        <SmartLink href="/help" className="font-semibold text-foreground underline-offset-4 hover:underline">
          Help Center
        </SmartLink>{' '}
        or{' '}
        <SmartLink href="/contact" className="font-semibold text-foreground underline-offset-4 hover:underline">
          contact the team
        </SmartLink>
        .
      </p>
    </main>
  );
}
