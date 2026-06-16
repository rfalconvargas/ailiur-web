import type { Metadata } from 'next';
import { Search, ArrowRight, ArrowUpRight } from 'lucide-react';
import { SmartLink } from '@/components/ui/smart-link';

export const metadata: Metadata = {
  title: 'Ailiur Help Center',
  description:
    'Guides and answers for Ailiur products, pricing, data controls, privacy, and the Unified Context Mesh.',
};

const QUICK_LINKS = [
  { label: 'Getting started', href: '#getting-started' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Data & privacy', href: '#privacy' },
  { label: 'Contact support', href: '/contact' },
];

const POPULAR: { label: string; href: string; tag: string }[] = [
  { label: 'What is Ailiur?', href: '/blog/what-is-ailiur', tag: 'Beginner' },
  { label: 'What is the Unified Context Mesh?', href: '/platform/mesh', tag: 'Product guide' },
  { label: 'Core vs Mesh vs Operator', href: '/pricing', tag: 'Pricing' },
  { label: 'Is my data private?', href: '/platform/security', tag: 'Privacy' },
  { label: 'Export your data', href: '/platform/security', tag: 'Privacy' },
];

type Step = { label: string; href: string };
const PATHS: { audience: string; blurb: string; steps: Step[] }[] = [
  {
    audience: 'New to Ailiur',
    blurb: 'Understand the system, then pick where to start.',
    steps: [
      { label: 'What is Ailiur?', href: '/blog/what-is-ailiur' },
      { label: 'Choose your first product', href: '/products' },
      { label: 'Plans and pricing', href: '/pricing' },
    ],
  },
  {
    audience: 'Comparing plans',
    blurb: 'Find the tier that fits how you’ll use Ailiur.',
    steps: [
      { label: 'Core vs Mesh vs Operator', href: '/pricing' },
      { label: 'Pricing FAQ', href: '/faqs#pricing' },
      { label: 'Contact support', href: '/contact' },
    ],
  },
  {
    audience: 'Enterprise buyer',
    blurb: 'Evaluate Ailiur for an organization.',
    steps: [
      { label: 'Enterprise Suite', href: '#enterprise-suite' },
      { label: 'UCM API', href: '/platform/api' },
      { label: 'Contact sales', href: '/contact' },
    ],
  },
];

type Article = { label: string; href: string };
type Category = { id: string; title: string; tag: string; articles: Article[] };

const CATEGORIES: Category[] = [
  {
    id: 'getting-started',
    title: 'Getting started',
    tag: 'Beginner',
    articles: [
      { label: 'What is Ailiur?', href: '/blog/what-is-ailiur' },
      { label: 'Create your Ailiur account', href: '/signup' },
      { label: 'Choose your first product', href: '/products' },
      { label: 'Core vs Mesh vs Operator', href: '/pricing' },
      { label: 'How the ecosystem becomes more useful over time', href: '/platform/mesh' },
    ],
  },
  {
    id: 'products',
    title: 'Products',
    tag: 'Product guide',
    articles: [
      { label: 'Enchiridion: learning that becomes structure', href: 'https://enchiridion.ailiur.com' },
      { label: 'Qetos: health protocols made manageable', href: 'https://qetos.ailiur.com' },
      { label: 'Oruvo: money, time, and ownership', href: 'https://oruvo.ailiur.com' },
      { label: 'Retellum: your media life as a memory graph', href: 'https://retellum.ailiur.com' },
      { label: 'Tayzt: creative direction powered by taste', href: 'https://tayzt.ailiur.com' },
      { label: 'Tellumetry: transparent AI work for builders', href: 'https://tellumetry.ailiur.com' },
    ],
  },
  {
    id: 'unified-context-mesh',
    title: 'Unified Context Mesh',
    tag: 'Product guide',
    articles: [
      { label: 'What is the Unified Context Mesh?', href: '/platform/mesh' },
      { label: 'How cross-app context works', href: '/platform/mesh' },
      { label: 'Turn off or limit connected context', href: '/platform/security' },
      { label: 'Export your data', href: '/platform/security' },
      { label: 'Local-first storage and sync', href: '/platform/mesh' },
    ],
  },
  {
    id: 'pricing-and-billing',
    title: 'Pricing and billing',
    tag: 'Pricing',
    articles: [
      { label: 'What is included in Core?', href: '/pricing' },
      { label: 'What is included in Mesh?', href: '/pricing' },
      { label: 'What is included in Operator?', href: '/pricing' },
      { label: 'How Enterprise pricing works', href: '/contact' },
      { label: 'Annual billing and plan changes', href: '/pricing' },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy, data, and security',
    tag: 'Privacy',
    articles: [
      { label: 'Is my data private?', href: '/platform/security' },
      { label: 'How Ailiur handles health and financial data', href: '/platform/security' },
      { label: 'Does Ailiur train models on my data?', href: '/faqs#privacy' },
      { label: 'Data export and deletion', href: '/platform/security' },
      { label: 'Security and sovereignty basics', href: '/platform/security' },
    ],
  },
  {
    id: 'enterprise-suite',
    title: 'Enterprise Suite',
    tag: 'Enterprise',
    articles: [
      { label: 'Qetos Provider', href: '/contact' },
      { label: 'Enchiridion Institution', href: '/contact' },
      { label: 'Oruvo Advisors', href: '/contact' },
      { label: 'Aptellum', href: '/aptellum' },
      { label: 'Civis', href: '/contact' },
      { label: 'Iris', href: '/contact' },
      { label: 'Unified Context Mesh API', href: '/platform/api' },
    ],
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    tag: 'Troubleshooting',
    articles: [
      { label: 'I cannot log in', href: '/login' },
      { label: 'I cannot access my plan', href: '/pricing' },
      { label: 'My context is not syncing', href: '/platform/mesh' },
      { label: 'I want to change products', href: '/products' },
      { label: 'I want to contact support', href: '/contact' },
    ],
  },
];

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/55 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/60 ring-1 ring-black/[0.04]">
      {children}
    </span>
  );
}

function ArticleRow({ article }: { article: Article }) {
  const external = /^https?:/.test(article.href);
  return (
    <li>
      <SmartLink
        href={article.href}
        className="group flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-[15px] text-foreground/75 transition-colors hover:bg-white/50 hover:text-foreground"
      >
        <span>{article.label}</span>
        {external ? (
          <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground/35 transition-colors group-hover:text-foreground" />
        ) : (
          <ArrowRight className="h-4 w-4 shrink-0 text-foreground/35 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
        )}
      </SmartLink>
    </li>
  );
}

export default function HelpPage() {
  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-24 pt-36 sm:pt-44">
      {/* Hero */}
      <section className="mx-auto max-w-2xl text-center">
        <span className="glass-strong inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/70">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
          Help Center
        </span>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-[1.04] tracking-tight text-foreground">
          How can we help?
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-foreground/70">
          Guides and answers for Ailiur’s connected AI ecosystem.
        </p>

        {/* Prominent visual search (decorative for now) */}
        <div className="glass-strong mx-auto mt-9 flex w-full max-w-2xl items-center gap-3 rounded-full px-6 py-4 shadow-[0_12px_40px_rgba(80,60,0,0.14)] ring-1 ring-black/[0.04] focus-within:ring-2 focus-within:ring-accent-green">
          <Search className="h-5 w-5 shrink-0 text-foreground/45" />
          <input
            type="text"
            aria-label="Search the Help Center"
            placeholder="Search products, pricing, data, or setup…"
            className="w-full bg-transparent text-base text-foreground placeholder:text-foreground/45 focus:outline-none"
          />
          <span className="hidden shrink-0 rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-[#fffdf5] sm:inline-flex">
            Search
          </span>
        </div>

        {/* Quick links */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          {QUICK_LINKS.map((q) => (
            <SmartLink
              key={q.label}
              href={q.href}
              className="glass inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-foreground"
            >
              {q.label}
            </SmartLink>
          ))}
        </div>
      </section>

      {/* Popular articles */}
      <section className="mt-20">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
          Popular articles
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR.map((a) => (
            <SmartLink
              key={a.label}
              href={a.href}
              className="group glass flex items-center justify-between gap-3 rounded-[var(--radius-card)] p-5 transition-transform hover:-translate-y-1"
            >
              <span className="flex flex-col gap-2">
                <span className="font-display text-[17px] font-extrabold leading-snug tracking-tight text-foreground">
                  {a.label}
                </span>
                <Tag>{a.tag}</Tag>
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-foreground/35 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
            </SmartLink>
          ))}
        </div>
      </section>

      {/* Recommended paths */}
      <section className="mt-20">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
          Recommended path
        </h2>
        <p className="mt-2 text-[15px] text-foreground/60">
          Not sure where to begin? Follow the path that matches you.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {PATHS.map((path) => (
            <div key={path.audience} className="glass flex flex-col rounded-[var(--radius-card)] p-7">
              <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground">
                {path.audience}
              </h3>
              <p className="mt-1.5 text-sm text-foreground/60">{path.blurb}</p>
              <ol className="mt-5 space-y-2.5">
                {path.steps.map((step, i) => (
                  <li key={step.label}>
                    <SmartLink
                      href={step.href}
                      className="group flex items-center gap-3 rounded-2xl px-2 py-1.5 transition-colors hover:bg-white/50"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-green/15 text-xs font-bold text-accent-green">
                        {i + 1}
                      </span>
                      <span className="flex-1 text-[15px] font-medium text-foreground/80 group-hover:text-foreground">
                        {step.label}
                      </span>
                      <ArrowRight className="h-4 w-4 shrink-0 text-foreground/30 transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
                    </SmartLink>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mt-20">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
          Browse by topic
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              id={cat.id}
              className="glass flex flex-col rounded-[var(--radius-card)] p-6 scroll-mt-28"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground">
                  {cat.title}
                </h3>
                <Tag>{cat.tag}</Tag>
              </div>
              <ul className="mt-4 space-y-1">
                {cat.articles.map((a) => (
                  <ArticleRow key={a.label} article={a} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Support CTA */}
      <section className="glass-strong mt-20 flex flex-col items-center gap-4 rounded-[var(--radius-panel)] px-8 py-12 text-center">
        <h2 className="font-display text-[clamp(1.6rem,3.5vw,2.25rem)] font-extrabold tracking-tight text-foreground">
          Still need help?
        </h2>
        <p className="max-w-xl text-[15px] leading-relaxed text-foreground/70 sm:text-base">
          Tell us what you are trying to do, what product you are using, and what happened. We will
          use that context to help you faster.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <SmartLink
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-accent-green px-6 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
          >
            Contact support
          </SmartLink>
          <SmartLink
            href="/faqs"
            className="glass inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
          >
            View FAQs
          </SmartLink>
        </div>
      </section>
    </main>
  );
}
