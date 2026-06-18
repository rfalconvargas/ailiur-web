import type { Metadata } from 'next';
import {
  ArrowRight,
  Sparkles,
  BadgeCheck,
  ShieldCheck,
  HeartHandshake,
  Link2,
  Users,
  Brain,
  Layers,
  TrendingUp,
  Quote,
} from 'lucide-react';
import { Reveal } from '@/components/retellum/reveal';
import { MediaExplorer } from '@/components/retellum/media-explorer';
import { LogFirstMediaDemo } from '@/components/retellum/log-first-media-demo';
import { Waitlist } from '@/components/retellum/waitlist';
import { RetellumFeedback } from '@/components/retellum/feedback';
import { PRODUCT_FEEDBACK_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Retellum — Your media becomes memory',
  description:
    'Retellum is a reflective media graph for logging what you watch, read, play, hear, study, and admire — then turning it into a map of what shaped you.',
};

const VALUES = [
  { icon: Brain, label: 'Reflection', desc: 'Capture what a work did to you, not just a star rating.' },
  { icon: Sparkles, label: 'Memory', desc: 'Entries become a searchable record of your own thinking.' },
  { icon: Layers, label: 'Taste', desc: 'See the threads that quietly connect everything you love.' },
  { icon: TrendingUp, label: 'Learning', desc: 'Turn scattered consumption into a deliberate map of growth.' },
];

const RESPECT = [
  { icon: BadgeCheck, title: 'Attribution', desc: 'Every entry credits its makers by name. The work and its authorship stay inseparable.' },
  { icon: ShieldCheck, title: 'Permission', desc: 'You log your reflections and links — never the media itself. Retellum hosts no copyrighted files.' },
  { icon: HeartHandshake, title: 'Support', desc: 'Surfaces the official ways to buy, rent, borrow, or back the creators who moved you.' },
  { icon: Link2, title: 'References', desc: 'Each node points outward to the source, so your map deepens the work instead of replacing it.' },
  { icon: Users, title: 'Collaboration', desc: 'Share a map or a single reflection — invite others into the conversation a work started.' },
];

const THEMES = [
  { label: 'Attention & perception', value: 92 },
  { label: 'Time & mortality', value: 78 },
  { label: 'Craft & restraint', value: 71 },
  { label: 'Curiosity & discovery', value: 64 },
  { label: 'Stewardship', value: 49 },
];

const TOP_CREATORS = [
  { name: 'Hayao Miyazaki', count: '14 works' },
  { name: 'Carlo Rovelli', count: '9 works' },
  { name: 'Radiohead', count: '8 works' },
  { name: 'Tom Stoppard', count: '6 works' },
];

const MEDIA_MIX = [
  { label: 'Film', value: 28 },
  { label: 'Books', value: 24 },
  { label: 'YouTube', value: 18 },
  { label: 'Albums', value: 14 },
  { label: 'Games', value: 9 },
  { label: 'Other', value: 7 },
];

const INFLUENCES = ['This Is Water', 'Outer Wilds', 'The Order of Time', 'In Rainbows'];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="glass-strong inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/70">
      <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
      {children}
    </span>
  );
}

export default function RetellumPage() {
  return (
    <main className="relative w-full overflow-hidden pb-24">
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center justify-center px-4 pb-16 pt-32">
        <Reveal className="glass relative z-10 w-full max-w-3xl rounded-[var(--radius-panel)] px-6 py-14 text-center sm:px-12 sm:py-20">
          <Eyebrow>Retellum · the media layer of Ailiur</Eyebrow>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,5rem)] font-extrabold leading-[1.02] tracking-tight text-foreground">
            Your media
            <br />
            becomes <span className="font-[200] italic">memory.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg">
            Retellum is a reflective media graph for logging what you watch,
            read, play, hear, study, and admire — then turning it into a map of
            what shaped you.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#waitlist"
              className="group inline-flex items-center gap-2 rounded-full bg-accent-green px-6 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
            >
              Join the waitlist
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#footprint"
              className="glass-strong inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
            >
              Explore the demo
            </a>
            <a
              href={PRODUCT_FEEDBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-foreground/70 transition-colors hover:text-foreground"
            >
              Feedback Form
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── 2 + 3. Interactive Media Footprint & Reflection ─── */}
      <section id="footprint" className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-28">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <Eyebrow>Your media footprint</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-foreground">
            One graph. Everything that shaped you.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/65">
            Films, talks, books, games, essays, albums, plays, creators, and
            projects — drawn together by what they share. Select a node to follow
            its threads and revisit the reflection it holds.
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <MediaExplorer />
        </Reveal>
      </section>

      {/* ── 3b. Log your first entry (prototype) ────────────── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-28">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <Eyebrow>Try it — log your first entry</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-foreground">
            Turn one memory into a node.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/65">
            A taste of the real thing. Log something that stayed with you — it
            saves to your browser and appears on your own footprint.
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <LogFirstMediaDemo />
        </Reveal>
      </section>

      {/* ── 4. Why It Exists ────────────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Why Retellum exists</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-foreground">
            Most platforms optimize consumption.
            <br />
            Retellum optimizes what it leaves behind.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal className="glass rounded-[var(--radius-panel)] p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/45">
              The feed
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground">
              Built to keep you watching
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/70">
              Streaming services and algorithms measure success in hours and
              autoplays. The next thing always matters more than the last. What
              you actually felt, learned, or carried forward evaporates.
            </p>
          </Reveal>
          <Reveal delay={0.05} className="glass-strong rounded-[var(--radius-panel)] p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-green">
              Retellum
            </p>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground">
              Built to keep what mattered
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-foreground/70">
              Retellum is not a streaming platform, and not “YouTube for
              reviews.” It is a reflective media memory system — a place where
              the things you finish become part of how you think.
            </p>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.label} delay={i * 0.05} className="glass h-full rounded-[var(--radius-card)] p-6">
              <v.icon className="h-5 w-5 text-accent-green" />
              <h4 className="mt-3 font-display text-lg font-bold text-foreground">{v.label}</h4>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/65">{v.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 5. Creator Respect Layer ────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>The creator respect layer</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-foreground">
            Reflection that honors its sources.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground/65">
            A memory of a work should send people toward it. Retellum is built
            so that logging what moved you also credits and supports whoever made
            it.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {RESPECT.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.04} className="glass h-full rounded-[var(--radius-card)] p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/55 text-accent-green">
                <r.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-foreground">
                {r.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-foreground/65">{r.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 6. Personal Cultural Map ────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>Your personal cultural map</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-foreground">
            Patterns you could never see one title at a time.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {/* Recurring themes */}
          <Reveal className="glass-strong rounded-[var(--radius-panel)] p-7 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/45">
              Recurring themes
            </p>
            <div className="mt-5 space-y-4">
              {THEMES.map((t) => (
                <div key={t.label}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{t.label}</span>
                    <span className="text-foreground/45">{t.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/45">
                    <div
                      className="h-full rounded-full bg-accent-green"
                      style={{ width: `${t.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Top creators */}
          <Reveal delay={0.05} className="glass rounded-[var(--radius-panel)] p-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/45">
              Top creators
            </p>
            <ul className="mt-5 space-y-3">
              {TOP_CREATORS.map((c, i) => (
                <li key={c.name} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/55 font-display text-sm font-bold text-foreground/70">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm font-medium text-foreground">{c.name}</span>
                  <span className="text-xs text-foreground/45">{c.count}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Media mix */}
          <Reveal className="glass rounded-[var(--radius-panel)] p-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/45">
              Media types
            </p>
            <div className="mt-5 space-y-3">
              {MEDIA_MIX.map((m) => (
                <div key={m.label} className="flex items-center gap-3">
                  <span className="w-16 shrink-0 text-sm font-medium text-foreground">{m.label}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/45">
                    <div
                      className="h-full rounded-full bg-foreground/55"
                      style={{ width: `${m.value * 3}%` }}
                    />
                  </div>
                  <span className="w-8 shrink-0 text-right text-xs text-foreground/45">{m.value}%</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Strongest influences */}
          <Reveal delay={0.05} className="glass-strong rounded-[var(--radius-panel)] p-7 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/45">
              Strongest influences
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {INFLUENCES.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-2 rounded-full bg-white/55 px-4 py-2 text-sm font-medium text-foreground"
                >
                  <Quote className="h-3.5 w-3.5 text-accent-green" />
                  {name}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-foreground/60">
              The works your reflections keep circling back to — the quiet
              center of gravity in your taste.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 7. Waitlist ─────────────────────────────────────── */}
      <section id="waitlist" className="mx-auto w-full max-w-6xl px-4 py-20 sm:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>Early access</Eyebrow>
            <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-tight text-foreground">
              Start the map of what shaped you.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-foreground/65">
              Retellum is opening gradually. Join the waitlist and tell us where
              you&apos;d begin — we&apos;ll save you a place as the media layer of
              Ailiur comes online.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <Waitlist />
          </Reveal>
        </div>
      </section>

      {/* ── 8. Feedback ─────────────────────────────────────── */}
      <RetellumFeedback />

      {/* ── 9. Footer note ──────────────────────────────────── */}
      <div className="mx-auto max-w-2xl px-4 text-center">
        <p className="text-xs leading-relaxed text-foreground/45">
          Retellum is for reflection, attribution, and learning. It does not host
          copyrighted media.
        </p>
      </div>
    </main>
  );
}
