'use client';

import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  Boxes,
  GraduationCap,
  HeartPulse,
  TrendingUp,
  Clapperboard,
  Cpu,
  Check,
  X,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SmartLink } from '@/components/ui/smart-link';

const easeOut = [0.22, 1, 0.36, 1] as const;
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

/**
 * CTAs route to the existing contact pattern (mailto, mirroring /contact),
 * pre-filled to instruct applicants what to send. No application backend exists.
 */
const APPLY_MAILTO =
  'mailto:hello@ailiur.com?subject=Building%20with%20Ailiur&body=Please%20include%3A%0A-%20Portfolio%20%2F%20GitHub%20and%20shipped%20work%0A-%20What%20you%27ve%20built%20and%20want%20to%20build%20next%0A-%20Which%20part%20of%20the%20Ailiur%20ecosystem%20you%27d%20want%20to%20own%20first%0A-%20Why%20you%20want%20to%20build%20Ailiur';

// ---- Section 2 data: what we are building -------------------------------
type EcoCard = { icon: LucideIcon; name: string; body: string; tint: string };
const ECOSYSTEM: EcoCard[] = [
  {
    icon: Boxes,
    name: 'Ailiur Core / Unified Context Mesh',
    body: 'The intelligence layer that connects user context across every product — local-first, private, and shared securely.',
    tint: 'var(--accent-green)',
  },
  {
    icon: GraduationCap,
    name: 'Enchiridion',
    body: 'AI-native learning and scientific media — turning dense knowledge into something you actually retain.',
    tint: 'var(--enchiridion)',
  },
  {
    icon: HeartPulse,
    name: 'Qetos',
    body: 'Health behavior, protocols, adherence, and daily action — the loop between intention and what you actually do.',
    tint: 'var(--ketofy)',
  },
  {
    icon: TrendingUp,
    name: 'Oruvo',
    body: 'Wealth, productivity, assets, and life-ROI — your time and money treated as one compounding system.',
    tint: 'var(--accent-green)',
  },
  {
    icon: Clapperboard,
    name: 'Retellum',
    body: 'Media reflection, reviews, and a personal taste graph — learning from everything you read, watch, and listen to.',
    tint: 'var(--accent-red)',
  },
  {
    icon: Cpu,
    name: 'Future hardware layer',
    body: 'Paper-like computing, ambient input, audio, and local-first devices — interfaces that disappear into daily life.',
    tint: 'var(--foreground)',
  },
];

// ---- Section 3 data: open role ------------------------------------------
const RESPONSIBILITIES = [
  'Build and ship production-grade versions of the existing demos and landing pages.',
  'Own the web app architecture across Next.js, TypeScript, Tailwind, auth, database, analytics, and deployment.',
  'Help design the technical foundation for Ailiur Core / Unified Context Mesh.',
  'Integrate AI features responsibly — without fragile, expensive, or over-complicated infrastructure.',
  'Turn prototypes into usable products with clear onboarding, pricing, retention, and feedback loops.',
  'Work directly with the founder on product strategy, UX, technical tradeoffs, and shipping cadence.',
];
const IDEAL_PROFILE = [
  'Strong full-stack product engineer.',
  'Excellent taste in UI, interaction design, and performance.',
  'Comfortable with Next.js, TypeScript, React, Tailwind, databases, auth, APIs, and deployment.',
  'Drawn to AI-native software, local-first systems, HCI, education, health, media, and creator-led distribution.',
  'Wants founder-level ownership and can operate with ambiguity.',
  'Ships fast without making the codebase messy.',
  'Values design, writing, clarity, and long-term product architecture.',
];
const NICE_TO_HAVE = [
  'Supabase, Convex, Postgres, Better Auth, Vercel, Render, or Railway.',
  'AI APIs, embeddings, retrieval, vector search, agents, or local-first systems.',
  'Mobile apps — React Native, Swift, Kotlin, or PWA architecture.',
  '3D web, Three.js, motion design, or creative tools.',
  'Building products from zero to one.',
];

// ---- Section 4 data: evaluation -----------------------------------------
const PROCESS = [
  {
    title: 'Share your work',
    body: 'Send a portfolio, GitHub, shipped work, or products you have built.',
  },
  {
    title: 'Founder conversation',
    body: 'A short, candid talk about goals, expectations, and how you like to work.',
  },
  {
    title: 'Trial sprint',
    body: 'A small trial project or prototype sprint — real work, not a coding test.',
  },
  {
    title: 'Cofounder-fit',
    body: 'A deeper conversation on equity, responsibilities, time commitment, and long-term vision.',
  },
  {
    title: 'References',
    body: 'Reference calls — both directions — before any final commitment.',
  },
];

// ---- Section 5 data: future roles ---------------------------------------
type RoleGroup = { title: string; note: string; roles: string[] };
const FUTURE_ROLES: RoleGroup[] = [
  {
    title: 'Engineering & AI',
    note: 'The core builders.',
    roles: [
      'Founding Product Engineer',
      'AI Systems Engineer',
      'Mobile Engineer',
      'Infrastructure / Data Engineer',
      'Hardware / Embedded Prototyper',
    ],
  },
  {
    title: 'Design & Product',
    note: 'Taste and clarity.',
    roles: ['Design Engineer', 'Product Designer', 'Researcher / UX Strategist', 'Interaction Designer'],
  },
  {
    title: 'Media & Education',
    note: 'Distribution as product.',
    roles: [
      'Video Editor',
      'Motion Graphics Designer',
      '3D Artist',
      'Scientific Researcher / Fact Checker',
      'Producer',
      'YouTube Content Strategist',
    ],
  },
  {
    title: 'Growth & Operations',
    note: 'Reach and rhythm.',
    roles: ['Community Lead', 'Partnerships Lead', "Founder's Associate", 'Product Marketing / Launch Strategist'],
  },
  {
    title: 'Advisors',
    note: 'Collaborators & talent network.',
    roles: [
      'Functional medicine advisor',
      'Education advisor',
      'AI infrastructure advisor',
      'Hardware advisor',
      'Scientific media advisor',
    ],
  },
];

// ---- Section 6 data: principles -----------------------------------------
const PRINCIPLES = [
  'Everyone ships.',
  'Taste matters.',
  'Small teams should feel inevitable, not chaotic.',
  'Local-first when possible.',
  'Distribution is part of the product.',
  'The best interface is the one that disappears.',
  'Speed matters, but not at the cost of coherence.',
  'We build tools that compound across a person’s life.',
];

// ---- Section 7 data: fit ------------------------------------------------
const FIT = [
  'You build real things without needing permission.',
  'You care about product taste as much as technical correctness.',
  'You like ambitious, interdisciplinary systems.',
  'You can turn messy ideas into clean architecture.',
  'You want founder-level ownership.',
];
const NOT_FIT = [
  'You need a fully defined job description.',
  'You only want narrow engineering tasks.',
  'You dislike early-stage ambiguity.',
  'You want a large team with lots of management structure.',
  'You are not interested in product, design, or users.',
];

const PROOF_CHIPS = ['AI-native consumer software', 'Enchiridion content engine', 'Founder-led, extremely lean'];

// Reusable section heading
function SectionHead({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto max-w-2xl text-center"
    >
      <motion.span
        variants={rise}
        className="text-xs font-semibold uppercase tracking-widest text-foreground/50"
      >
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={rise}
        className="mt-3 font-display text-[clamp(1.85rem,4.2vw,3rem)] font-extrabold leading-[1.08] tracking-tight text-foreground"
      >
        {title}
      </motion.h2>
      {lead && (
        <motion.p variants={rise} className="mt-4 text-base text-foreground/65 sm:text-lg">
          {lead}
        </motion.p>
      )}
    </motion.div>
  );
}

export function Careers() {
  return (
    <>
      {/* 1 — Hero */}
      <section className="relative w-full px-4 pt-36 sm:pt-44">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={rise}
            className="glass-strong inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
            Careers
          </motion.span>
          <motion.h1
            variants={rise}
            className="mt-6 font-display text-[clamp(2.5rem,6.5vw,4.5rem)] font-extrabold leading-[1.03] tracking-tight text-foreground"
          >
            Build the operating system for human flourishing.
          </motion.h1>
          <motion.p
            variants={rise}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70"
          >
            Ailiur is looking for a technical cofounder / founding software engineer to help turn a
            growing ecosystem of AI-native tools, web demos, product prototypes, and media-driven
            distribution into real shipped software.
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <SmartLink
              href={APPLY_MAILTO}
              className="group inline-flex items-center gap-2 rounded-full bg-accent-green px-6 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
            >
              Apply to build with Ailiur
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </SmartLink>
            <SmartLink
              href="/products"
              className="glass-strong inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
            >
              Explore the ecosystem
            </SmartLink>
          </motion.div>

          <motion.ul variants={rise} className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
            {PROOF_CHIPS.map((chip) => (
              <li
                key={chip}
                className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/75"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent-red" />
                {chip}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </section>

      {/* 2 — What we are building */}
      <section className="relative w-full px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            eyebrow="What we are building"
            title="One ecosystem, many surfaces."
            lead="Every product is a different window into the same intelligence layer — quietly connected underneath."
          />
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {ECOSYSTEM.map(({ icon: Icon, name, body, tint }) => (
              <motion.div
                key={name}
                variants={rise}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="glass flex flex-col rounded-[var(--radius-card)] p-8"
              >
                <span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: `color-mix(in srgb, ${tint} 16%, transparent)`, color: tint }}
                >
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </span>
                <h3 className="mt-6 font-display text-xl font-extrabold tracking-tight text-foreground">
                  {name}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/70">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3 — Open now */}
      <section className="relative w-full px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHead eyebrow="Open now" title="The one role we’re hiring for today." />
          <motion.article
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="glass-strong mt-12 rounded-[var(--radius-panel)] p-8 ring-2 ring-accent-green sm:p-12"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-green px-3 py-1 text-xs font-semibold text-[#fffdf5]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#fffdf5]" />
              Open role
            </span>
            <h3 className="mt-5 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-extrabold leading-[1.1] tracking-tight text-foreground">
              Technical Cofounder / Founding Software Engineer
            </h3>
            <p className="mt-2 text-lg font-semibold text-foreground/85">
              For the builder who wants ownership, not a ticket queue.
            </p>
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-foreground/70">
              We are looking for a technical partner who can help ship the first real versions of
              Ailiur’s apps, harden the architecture, and turn product vision into working software.
              This is a founder-level role for someone who wants to help define the company — not
              simply implement assigned screens.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
                  What you’ll own
                </h4>
                <ul className="mt-4 space-y-3">
                  {RESPONSIBILITIES.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-[15px] text-foreground/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-green" strokeWidth={2.5} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
                  Ideal profile
                </h4>
                <ul className="mt-4 space-y-3">
                  {IDEAL_PROFILE.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[15px] text-foreground/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-green" strokeWidth={2.5} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded-[var(--radius-card)] border border-white/40 p-6">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
                Nice to have
              </h4>
              <ul className="mt-4 flex flex-wrap gap-2">
                {NICE_TO_HAVE.map((n) => (
                  <li
                    key={n}
                    className="rounded-full bg-white/45 px-3.5 py-1.5 text-[13px] font-medium text-foreground/75"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </div>

            <SmartLink
              href={APPLY_MAILTO}
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
            >
              Start the cofounder conversation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </SmartLink>
          </motion.article>
        </div>
      </section>

      {/* 4 — How we will evaluate fit */}
      <section className="relative w-full px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-5xl">
          <SectionHead
            eyebrow="How we’ll evaluate fit"
            title="A mutual evaluation, not a test."
            lead="We’re both deciding here. The process is built to respect your time and surface how we’d actually work together."
          />
          <motion.ol
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
          >
            {PROCESS.map((step, i) => (
              <motion.li
                key={step.title}
                variants={rise}
                className="glass flex flex-col rounded-[var(--radius-card)] p-6"
              >
                <span className="font-display text-2xl font-extrabold text-accent-green">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display text-lg font-extrabold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{step.body}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* 5 — Future roles */}
      <section className="relative w-full px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            eyebrow="Future roles / talent network"
            title="Not hiring yet — but building a bench."
            lead="These roles aren’t open today. If the mission resonates, reach out and we’ll keep you close as we grow."
          />
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {FUTURE_ROLES.map((group) => (
              <motion.div
                key={group.title}
                variants={rise}
                className="glass flex flex-col rounded-[var(--radius-card)] p-7"
              >
                <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground">
                  {group.title}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-foreground/45">
                  {group.note}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {group.roles.map((role) => (
                    <li key={role} className="flex items-center gap-2.5 text-[15px] text-foreground/75">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-green" />
                      {role}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
            <motion.div
              variants={rise}
              className="flex flex-col justify-center rounded-[var(--radius-card)] border border-dashed border-foreground/20 p-7"
            >
              <p className="text-[15px] leading-relaxed text-foreground/70">
                Don’t see your role? If you’re exceptional at something Ailiur will need, introduce
                yourself anyway.
              </p>
              <SmartLink
                href={APPLY_MAILTO}
                className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-green"
              >
                Join the talent network
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </SmartLink>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 6 — Operating principles */}
      <section className="relative w-full px-4 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHead eyebrow="Operating principles" title="How we actually work." />
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {PRINCIPLES.map((p, i) => (
              <motion.div
                key={p}
                variants={rise}
                className="glass flex flex-col gap-3 rounded-[var(--radius-card)] p-6"
              >
                <span className="font-display text-sm font-extrabold text-foreground/35">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-display text-lg font-extrabold leading-snug tracking-tight text-foreground">
                  {p}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7 — Who should reach out */}
      <section className="relative w-full px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <SectionHead eyebrow="Who should reach out" title="Be honest with yourself." />
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <motion.div variants={rise} className="glass rounded-[var(--radius-card)] p-8">
              <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground">
                You might be a fit if
              </h3>
              <ul className="mt-5 space-y-3.5">
                {FIT.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px] text-foreground/80">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-green/15 text-accent-green">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={rise} className="glass rounded-[var(--radius-card)] p-8">
              <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground">
                This is probably not a fit if
              </h3>
              <ul className="mt-5 space-y-3.5">
                {NOT_FIT.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px] text-foreground/70">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-red/15 text-accent-red">
                      <X className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 8 — Final CTA */}
      <section className="relative w-full px-4 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="glass-strong mx-auto max-w-3xl rounded-[var(--radius-panel)] px-8 py-14 text-center sm:px-14"
        >
          <h2 className="font-display text-[clamp(1.85rem,4.5vw,3rem)] font-extrabold leading-[1.08] tracking-tight text-foreground">
            Want to build the first real version of Ailiur?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">
            Send what you have built, what you want to build next, and which part of the ecosystem
            you would want to own first.
          </p>
          <SmartLink
            href={APPLY_MAILTO}
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-accent-green px-7 py-3.5 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
          >
            Apply to build with Ailiur
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </SmartLink>
        </motion.div>
      </section>
    </>
  );
}
