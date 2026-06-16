import type { Metadata } from 'next';
import { Plus } from 'lucide-react';
import { SmartLink } from '@/components/ui/smart-link';

export const metadata: Metadata = {
  title: 'Ailiur FAQs',
  description:
    'Answers about Ailiur, Enchiridion, Qetos, Oruvo, Retellum, Tayzt, Tellumetry, pricing, privacy, and enterprise.',
};

type QA = { q: string; a: string };
type Group = { id: string; title: string; items: QA[] };

const GROUPS: Group[] = [
  {
    id: 'general',
    title: 'General',
    items: [
      {
        q: 'What is Ailiur?',
        a: 'Ailiur is an AI-first ecosystem of connected tools for learning, health, wealth/productivity, media reflection, creative work, and AI-assisted building. Instead of keeping every part of your life in separate apps, Ailiur connects focused products through the Unified Context Mesh so your tools can become more useful together.',
      },
      {
        q: 'Is Ailiur one app or many apps?',
        a: 'Ailiur is a connected ecosystem. You can start with one product, such as Enchiridion or Qetos, but the full value comes from connecting multiple products through the Unified Context Mesh.',
      },
      {
        q: 'Who is Ailiur for?',
        a: 'Ailiur is for students, creators, founders, designers, researchers, health optimizers, builders, and teams who want their tools to understand more context and reduce the friction of managing life across disconnected apps.',
      },
    ],
  },
  {
    id: 'products',
    title: 'Products',
    items: [
      {
        q: 'What is Enchiridion?',
        a: 'Enchiridion is Ailiur’s learning engine. It helps turn books, videos, lectures, notes, research, and complex subjects into structured knowledge graphs.',
      },
      {
        q: 'What is Qetos?',
        a: 'Qetos is Ailiur’s health companion. It helps translate complex health protocols into manageable daily actions, logs, symptoms, readings, wins, and recovery moments. Qetos is a supportive tool, not a medical device, and does not replace advice from your clinician.',
      },
      {
        q: 'What is Oruvo?',
        a: 'Oruvo is Ailiur’s wealth and productivity hub. It helps connect tasks, time, assets, belongings, goals, and financial decisions into one clearer system.',
      },
      {
        q: 'What is Retellum?',
        a: 'Retellum is Ailiur’s media graph. It helps you log, review, remember, and learn from books, films, videos, games, podcasts, and other media.',
      },
      {
        q: 'What is Tayzt?',
        a: 'Tayzt is Ailiur’s creative engine. It helps creators organize taste, references, atmosphere, pacing, visual texture, and emotional direction for media work.',
      },
      {
        q: 'What is Tellumetry?',
        a: 'Tellumetry is Ailiur’s transparent AI workspace for builders. It helps make AI-assisted coding and product work easier to inspect, guide, pause, and control.',
      },
    ],
  },
  {
    id: 'unified-context-mesh',
    title: 'Unified Context Mesh',
    items: [
      {
        q: 'What is the Unified Context Mesh?',
        a: 'The Unified Context Mesh, or UCM, is the connective layer between Ailiur products. It allows useful context from one product to improve another, with user control.',
      },
      {
        q: 'Do I need all Ailiur products for UCM to be useful?',
        a: 'No. You can begin with one product. UCM becomes more powerful as you connect more products, but the system should still be useful from the first app.',
      },
      {
        q: 'Can I export my data?',
        a: 'Yes. Ailiur should make user export a core trust feature. Users should be able to take their data with them instead of feeling locked into the ecosystem.',
      },
      {
        q: 'Can I turn off cross-app context?',
        a: 'Yes. The product should support controls for limiting or disabling connected context between products. This is important for privacy, trust, and user agency.',
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing',
    items: [
      {
        q: 'What is included in Core?',
        a: 'Core is $15/month and is for people who want one focused Ailiur product. It includes one consumer product, personal local-first storage, basic UCM memory, standard AI usage, one workspace, and data export.',
      },
      {
        q: 'What is included in Mesh?',
        a: 'Mesh is $50/month and is for people who want the full connected personal ecosystem. It includes all consumer products, cross-app Unified Context Mesh, higher AI usage limits, multi-device sync, automations, priority product updates, and connected insights.',
      },
      {
        q: 'What is included in Operator?',
        a: 'Operator is $150/month and is for serious builders and power users. It includes everything in Mesh plus highest consumer AI limits, advanced agents, advanced Tayzt and Tellumetry tools, unlimited projects and knowledge graphs, model routing and cost controls, API/export tools, early access to Iris-style interfaces, and premium support.',
      },
      {
        q: 'How does Enterprise pricing work?',
        a: 'Enterprise pricing is custom because organizations need different combinations of products, controls, integrations, support, and deployment requirements.',
      },
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy',
    items: [
      {
        q: 'Is my data private?',
        a: 'Ailiur should be designed around user control, local-first storage where possible, transparent data handling, and clear export/deletion options.',
      },
      {
        q: 'Does Ailiur use my data to train AI models?',
        a: 'Our goal is to make consent and user control central to how Ailiur handles data. Ailiur should not train models on personal user data without explicit consent.',
      },
      {
        q: 'What does local-first mean?',
        a: 'Local-first means the product prioritizes storing and processing user data close to the user whenever practical, instead of relying on heavy cloud infrastructure by default.',
      },
    ],
  },
  {
    id: 'enterprise',
    title: 'Enterprise',
    items: [
      {
        q: 'What is Qetos Provider?',
        a: 'Qetos Provider is the enterprise layer for practitioners, health coaches, and clinical teams that want to deploy protocols and understand adherence between appointments.',
      },
      {
        q: 'What is Enchiridion Institution?',
        a: 'Enchiridion Institution helps schools, universities, course creators, and training teams map curriculum into active knowledge structures and understand learning bottlenecks.',
      },
      {
        q: 'What is Oruvo Advisors?',
        a: 'Oruvo Advisors is for financial advisors and organizations that want to connect financial planning with client goals, work, assets, and real-life context.',
      },
      {
        q: 'What is Aptellum?',
        a: 'Aptellum is Ailiur’s education and career infrastructure layer for creative schools, portfolios, critiques, student projects, and professional pathways.',
      },
      {
        q: 'What is Civis?',
        a: 'Civis is Ailiur’s civic layer for helping communities understand issues, report problems, and participate in local decision-making.',
      },
      {
        q: 'What is Iris?',
        a: 'Iris is Ailiur’s intent-driven operating system concept. It imagines a future where interfaces appear around what the user is trying to do, instead of forcing people through static apps.',
      },
      {
        q: 'What is the UCM API?',
        a: 'The UCM API is the enterprise infrastructure layer for connecting approved applications and organizational systems to the Unified Context Mesh with explicit user consent.',
      },
    ],
  },
];

// FAQPage structured data (JSON-LD). Static JSON in a script tag — no hydration.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: GROUPS.flatMap((g) =>
    g.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    }))
  ),
};

function FaqRow({ item }: { item: QA }) {
  return (
    <details className="group glass overflow-hidden rounded-[var(--radius-card)]">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
        <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
          {item.q}
        </span>
        <Plus className="h-5 w-5 shrink-0 text-foreground/60 transition-transform duration-300 group-open:rotate-45" />
      </summary>
      <p className="px-6 pb-5 text-[15px] leading-relaxed text-foreground/70">{item.a}</p>
    </details>
  );
}

export default function FaqsPage() {
  return (
    <main className="relative mx-auto w-full max-w-3xl px-4 pb-24 pt-36 sm:pt-44">
      {/* FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="text-center">
        <span className="glass-strong inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/70">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
          FAQs
        </span>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-[1.04] tracking-tight text-foreground">
          Questions, answered.
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-foreground/70">
          Clear answers about Ailiur products, pricing, privacy, and the Unified Context Mesh.
        </p>
      </header>

      {/* Sticky category navigation */}
      <nav
        aria-label="FAQ categories"
        className="sticky top-20 z-30 mt-10 -mx-4 px-4"
      >
        <div className="glass-strong flex gap-1.5 overflow-x-auto rounded-full p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {GROUPS.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium text-foreground/70 transition-colors hover:bg-white/55 hover:text-foreground"
            >
              {g.title}
            </a>
          ))}
        </div>
      </nav>

      <div className="mt-10 space-y-12">
        {GROUPS.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-36">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground/50">
              {group.title}
            </h2>
            <div className="space-y-3">
              {group.items.map((item) => (
                <FaqRow key={item.q} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Final CTA */}
      <section className="glass-strong mt-16 flex flex-col items-center gap-4 rounded-[var(--radius-panel)] px-8 py-10 text-center">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
          Can’t find your answer?
        </h2>
        <p className="max-w-md text-[15px] leading-relaxed text-foreground/70">
          Send us your product, plan, and what you are trying to accomplish.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <SmartLink
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-accent-green px-6 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
          >
            Contact support
          </SmartLink>
          <SmartLink
            href="/help"
            className="glass inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
          >
            Explore Help Center
          </SmartLink>
        </div>
      </section>
    </main>
  );
}
