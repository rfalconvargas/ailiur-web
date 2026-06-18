import {
  Layers,
  Boxes,
  Cpu,
  MousePointerClick,
  MessageSquareOff,
  Sparkles,
  Wind,
  ShieldCheck,
  Gauge,
  Workflow,
  Eye,
  Combine,
  ArrowRight,
} from 'lucide-react';
import {
  OlluneCommandHero,
  IntentSurfaceDemo,
  OlluneWaitlist,
  OlluneFeedback,
  OlluneSection,
  OlluneEyebrow,
  OlluneReveal,
} from '@/components/ollune';

/* ── Static content ──────────────────────────────────────────── */

const STACK = [
  { icon: Boxes, label: 'Apps', meta: 'Mytabolism · Enchiridion · Doblu · Moment', dim: true },
  { icon: Layers, label: 'Ollune', meta: 'The intent surface — forms and dissolves', accent: true },
  { icon: Cpu, label: 'Ailiur Core', meta: 'Context, memory, and execution', dim: true },
];

const FEATURES = [
  {
    icon: Wind,
    title: 'Ephemeral by design',
    desc: 'Interfaces assemble for the task at hand, then dissolve. Nothing lingers, nothing accumulates clutter.',
  },
  {
    icon: MousePointerClick,
    title: 'Intent in, interface out',
    desc: 'Say what you mean. Ollune composes the exact controls, data, and actions the moment needs.',
  },
  {
    icon: Combine,
    title: 'One surface, every app',
    desc: 'Your Ailiur apps stop being destinations. Their capabilities flow into a single calm canvas.',
  },
  {
    icon: Gauge,
    title: 'Context-aware',
    desc: 'It already knows your week, your data, and your history — so it forms around you, not a blank prompt.',
  },
  {
    icon: ShieldCheck,
    title: 'Calm and private',
    desc: 'No feed, no notifications competing for you. Execution happens, then the surface gets out of the way.',
  },
  {
    icon: Workflow,
    title: 'State, not screens',
    desc: 'Work is a continuous flow of states — not a maze of windows, tabs, and apps to switch between.',
  },
];

const USE_CASES = [
  {
    state: 'Planning',
    title: 'A day that forms around your energy',
    desc: 'Ask to shape your week. Ollune pulls your metabolic rhythm, commitments, and focus windows into one plan — then clears away.',
  },
  {
    state: 'Creating',
    title: 'Drafts that already sound like you',
    desc: 'Describe the reply, post, or note. The surface gathers the thread, your voice, and the facts, and hands you something ready.',
  },
  {
    state: 'Deciding',
    title: 'The whole picture, briefly',
    desc: 'Ask what changed. Ollune assembles signals across your apps into a single readable view, then lets it dissolve.',
  },
  {
    state: 'Remembering',
    title: 'Find the moment, not the file',
    desc: 'Describe the memory. The surface surfaces it from across Moment and your history — no folders, no hunting.',
  },
];

const ECOSYSTEM = [
  { name: 'Mytabolism', role: 'Your body’s rhythm and energy' },
  { name: 'Enchiridion', role: 'Knowledge, notes, and correspondence' },
  { name: 'Doblu', role: 'Projects and collaborative work' },
  { name: 'Moment', role: 'Memory and what mattered' },
  { name: 'Future apps', role: 'Everything Ailiur builds next' },
];

const FOOTER_LINKS = [
  { label: 'The layer', href: '#layer' },
  { label: 'Intent', href: '#intent' },
  { label: 'Demo', href: '#demo' },
  { label: 'Features', href: '#features' },
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'Early access', href: '#waitlist' },
];

/* ── Page ────────────────────────────────────────────────────── */

export default function OllunePage() {
  return (
    <>
      {/* ── 1. Hero ───────────────────────────────────────────── */}
      <OlluneCommandHero />

      {/* ── 2. Product explanation ────────────────────────────── */}
      <OlluneSection
        id="layer"
        eyebrow="What Ollune is"
        headline="Not another app. The layer beneath them."
        intro="Ollune is an intent-driven, zero-app operating surface. Instead of opening tools and hunting for the right screen, you describe what you are trying to do — and the interface forms around it, drawing on every Ailiur app at once."
        centered
      >
        <OlluneReveal delay={0.08} className="mx-auto mt-12 max-w-2xl">
          <div className="grid gap-3">
            {STACK.map((row) => (
              <div
                key={row.label}
                className={
                  row.accent
                    ? 'ol-glass-strong flex items-center gap-4 rounded-[var(--ol-radius-lg)] p-5 shadow-[var(--ol-glow-green)]'
                    : 'ol-glass flex items-center gap-4 rounded-[var(--ol-radius-lg)] p-5'
                }
              >
                <span
                  className={
                    row.accent
                      ? 'flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--ol-radius-md)] bg-[var(--ol-green)] text-[var(--ol-ink)]'
                      : 'flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--ol-radius-md)] bg-[rgba(255,255,255,0.05)] text-[var(--ol-silver)]'
                  }
                >
                  <row.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p
                    className={
                      row.accent
                        ? 'font-display text-lg font-bold text-[var(--ol-cream)]'
                        : 'font-display text-lg font-bold text-[var(--ol-cream-soft)]'
                    }
                  >
                    {row.label}
                  </p>
                  <p className="truncate text-sm text-[var(--ol-silver-dim)]">{row.meta}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-[var(--ol-silver-dim)]">
            The apps stay. The app-switching disappears.
          </p>
        </OlluneReveal>
      </OlluneSection>

      {/* ── 3. User problem ───────────────────────────────────── */}
      <OlluneSection
        id="intent"
        eyebrow="The problem"
        headline="Your tools know everything except what you mean."
        intro="You don’t want twelve apps. You want an outcome. Today, the work of translating intent into clicks, tabs, and context-switching falls entirely on you."
      >
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <OlluneReveal className="ol-glass rounded-[var(--ol-radius-xl)] p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ol-silver-dim)]">
              How it works now
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[var(--ol-cream)]">
              You adapt to the apps
            </h3>
            <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-[var(--ol-silver)]">
              {[
                'Open the right app, find the right screen.',
                'Copy context between tools by hand.',
                'Remember where everything lives.',
                'Switch, search, repeat — all day.',
              ].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ol-silver-dim)]" />
                  {t}
                </li>
              ))}
            </ul>
          </OlluneReveal>

          <OlluneReveal delay={0.08} className="ol-glass-strong rounded-[var(--ol-radius-xl)] p-7 shadow-[var(--ol-glow-green)]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ol-green)]">
              How Ollune works
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[var(--ol-cream)]">
              The surface adapts to you
            </h3>
            <ul className="mt-4 space-y-2.5 text-[15px] leading-relaxed text-[var(--ol-cream-soft)]">
              {[
                'Describe the outcome you want.',
                'Context is gathered for you, automatically.',
                'The exact interface forms around the task.',
                'It dissolves the moment you’re done.',
              ].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <span className="mt-1.5 text-[var(--ol-green)]">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </OlluneReveal>
        </div>
      </OlluneSection>

      {/* ── 4. Interactive demo — the centerpiece ─────────────── */}
      <OlluneSection
        id="demo"
        eyebrow="Try it live"
        headline="Watch an interface materialize."
        intro="Give Ollune an intent. It reads what you mean, gathers context from across your Ailiur apps, and forms a working surface around the task — then queues your first move."
        centered
      >
        <OlluneReveal delay={0.08} className="mt-12">
          <IntentSurfaceDemo />
        </OlluneReveal>
      </OlluneSection>

      {/* ── 5. Core features ──────────────────────────────────── */}
      <OlluneSection
        id="features"
        eyebrow="Core ideas"
        headline="Interfaces that exist only as long as they are useful."
        intro="No dashboards to maintain. No screens to memorize. Just the right surface, exactly when the work needs it."
        centered
      >
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <OlluneReveal
              key={f.title}
              delay={(i % 3) * 0.06}
              className="ol-glass group h-full rounded-[var(--ol-radius-lg)] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--ol-border-strong)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-[var(--ol-radius-md)] bg-[rgba(81,201,143,0.12)] text-[var(--ol-green)] transition-transform duration-200 group-hover:scale-105">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-[var(--ol-cream)]">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ol-silver)]">{f.desc}</p>
            </OlluneReveal>
          ))}
        </div>
      </OlluneSection>

      {/* ── 6. Use cases ──────────────────────────────────────── */}
      <OlluneSection
        eyebrow="In practice"
        headline="One surface. Many states of work."
        intro="The same calm canvas becomes whatever the moment requires — planning, creating, deciding, remembering."
      >
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {USE_CASES.map((u, i) => (
            <OlluneReveal
              key={u.title}
              delay={(i % 2) * 0.06}
              className="ol-glass group h-full rounded-[var(--ol-radius-xl)] p-7 transition-colors hover:border-[var(--ol-border-strong)]"
            >
              <span className="ol-glass inline-flex items-center gap-2 rounded-[var(--ol-radius-pill)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ol-green)]">
                {u.state}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-[var(--ol-cream)]">
                {u.title}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-[var(--ol-silver)]">{u.desc}</p>
            </OlluneReveal>
          ))}
        </div>
      </OlluneSection>

      {/* ── 7. Why different ──────────────────────────────────── */}
      <OlluneSection
        eyebrow="Why it’s different"
        headline="AI should not live in a chat box forever."
      >
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          <OlluneReveal className="ol-glass-strong rounded-[var(--ol-radius-xl)] p-8">
            <div className="flex items-center gap-3 text-[var(--ol-green)]">
              <Eye className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-[0.16em]">The shift</span>
            </div>
            <p className="mt-5 font-display text-[length:var(--ol-text-h2)] font-bold leading-[1.2] tracking-tight text-[var(--ol-cream)]">
              A text box can answer you. It can’t reshape itself into the tool you
              need.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-[var(--ol-silver)]">
              Ollune treats AI as the material an interface is made of — not a
              feature bolted onto an app. Controls, data, and actions are
              generated for the task and dissolved after, so the surface is always
              exactly as complex as the moment, and never more.
            </p>
          </OlluneReveal>

          <OlluneReveal delay={0.08} className="grid gap-4">
            <div className="ol-glass flex items-start gap-4 rounded-[var(--ol-radius-lg)] p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--ol-radius-md)] bg-[rgba(255,255,255,0.05)] text-[var(--ol-silver)]">
                <MessageSquareOff className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-bold text-[var(--ol-cream)]">
                  Beyond the chat box
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--ol-silver)]">
                  Real interfaces, not endless conversation. You get controls you
                  can see and trust.
                </p>
              </div>
            </div>
            <div className="ol-glass flex items-start gap-4 rounded-[var(--ol-radius-lg)] p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--ol-radius-md)] bg-[rgba(81,201,143,0.12)] text-[var(--ol-green)]">
                <Wind className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-bold text-[var(--ol-cream)]">
                  Beyond the app grid
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[var(--ol-silver)]">
                  No home screen of icons to manage. The right capability simply
                  appears when you need it.
                </p>
              </div>
            </div>
          </OlluneReveal>
        </div>
      </OlluneSection>

      {/* ── 8. Ailiur ecosystem connection ────────────────────── */}
      <OlluneSection
        id="ecosystem"
        eyebrow="Connected"
        headline="The nervous system of Ailiur."
        intro="Ollune doesn’t replace your Ailiur apps — it connects them. Each app contributes its signal; Ollune turns the whole into one calm execution surface."
        centered
      >
        <OlluneReveal delay={0.08} className="mt-12">
          <div className="ol-glass-strong mx-auto max-w-4xl rounded-[var(--ol-radius-xl)] p-6 sm:p-8">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {ECOSYSTEM.map((app) => (
                <div
                  key={app.name}
                  className="ol-glass group flex items-center gap-3 rounded-[var(--ol-radius-lg)] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--ol-border-strong)]"
                >
                  <span
                    aria-hidden
                    className="h-9 w-9 shrink-0 rounded-[var(--ol-radius-sm)] bg-[radial-gradient(circle_at_30%_30%,var(--ol-green-soft),var(--ol-green-deep)_75%)] opacity-90 transition-transform duration-200 group-hover:scale-105"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-base font-bold text-[var(--ol-cream)]">
                      {app.name}
                    </p>
                    <p className="truncate text-xs text-[var(--ol-silver-dim)]">{app.role}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-center rounded-[var(--ol-radius-lg)] border border-dashed border-[var(--ol-border-strong)] p-4 text-center">
                <p className="text-sm font-medium text-[var(--ol-silver)]">
                  One surface,
                  <br className="hidden lg:block" /> everything together
                </p>
              </div>
            </div>
          </div>
        </OlluneReveal>
      </OlluneSection>

      {/* ── 9. Waitlist CTA ───────────────────────────────────── */}
      <section id="waitlist" className="mx-auto w-full max-w-[var(--ol-content-max)] px-4 py-[var(--ol-section-y)]">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <OlluneReveal>
            <OlluneEyebrow>Early access</OlluneEyebrow>
            <h2 className="mt-5 font-display text-[length:var(--ol-text-h1)] font-extrabold leading-[1.08] tracking-tight text-[var(--ol-cream)]">
              Join the first people building beyond apps.
            </h2>
            <p className="mt-5 max-w-md text-[length:var(--ol-text-body)] leading-relaxed text-[var(--ol-silver)]">
              Ollune is opening gradually to people who want to work by intent, not
              by interface. Tell us where you’d point it first — we’ll save you a
              place as the AI OS layer of Ailiur comes online.
            </p>
          </OlluneReveal>
          <OlluneReveal delay={0.08}>
            <OlluneWaitlist />
          </OlluneReveal>
        </div>
      </section>

      {/* ── 10. Feedback CTA ──────────────────────────────────── */}
      <OlluneFeedback />

      {/* ── 11. Footer ────────────────────────────────────────── */}
      <footer className="mx-auto w-full max-w-[var(--ol-content-max)] px-4 pb-16">
        <div className="ol-glass rounded-[var(--ol-radius-xl)] px-6 py-9 sm:px-9">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="h-5 w-5 rounded-full bg-[radial-gradient(circle_at_30%_30%,var(--ol-green-soft),var(--ol-green-deep)_70%)] shadow-[0_0_16px_rgba(81,201,143,0.5)]"
                />
                <span className="font-display text-xl font-extrabold tracking-tight text-[var(--ol-cream)]">
                  Ollune
                </span>
                <span className="text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-[var(--ol-silver-dim)]">
                  by Ailiur
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ol-silver)]">
                The operating surface for human intent. The AI OS layer of the
                Ailiur ecosystem.
              </p>
            </div>

            <nav aria-label="Ollune sections" className="flex flex-wrap gap-x-8 gap-y-2">
              {FOOTER_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-[var(--ol-silver)] transition-colors hover:text-[var(--ol-cream)]"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-[var(--ol-border)] pt-6 sm:flex-row sm:items-center">
            <p className="text-xs text-[var(--ol-silver-dim)]">
              © {new Date().getFullYear()} Ailiur. Ollune is in early development.
            </p>
            <a
              href="#waitlist"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ol-green)] hover:text-[var(--ol-green-soft)]"
            >
              Request early access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
