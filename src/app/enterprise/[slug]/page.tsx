import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { SmartLink } from "@/components/ui/smart-link";
import {
  ENTERPRISE_APPS,
  getEnterpriseApp,
  ENTERPRISE_EMAIL,
} from "@/lib/enterprise";

export function generateStaticParams() {
  return ENTERPRISE_APPS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getEnterpriseApp(slug);
  if (!app) return { title: "Enterprise — Ailiur" };
  const title = `${app.name} — ${app.tagline}`;
  return {
    title,
    description: app.description,
    openGraph: { title, description: app.description, type: "website" },
  };
}

export default async function EnterprisePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getEnterpriseApp(slug);
  if (!app) notFound();

  return (
    <main className="relative mx-auto w-full max-w-5xl px-5 pb-24 pt-32 sm:pt-40">
      {/* Hero */}
      <section className="text-center">
        <span className="glass-strong mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/70">
          Enterprise Suite · {app.parent}
        </span>
        <h1 className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.5rem,6vw,4.25rem)] font-extrabold leading-[1.04] tracking-tight text-foreground">
          {app.name}
        </h1>
        <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-foreground/55">
          {app.audience}
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground/75">
          {app.tagline} {app.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${ENTERPRISE_EMAIL}?subject=${encodeURIComponent(
              app.name + " — enterprise enquiry"
            )}`}
            className="group inline-flex items-center gap-2 rounded-full bg-accent-green px-6 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
          >
            Talk to us · {ENTERPRISE_EMAIL}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <SmartLink
            href={app.parentHref}
            className="glass-strong inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
          >
            See {app.parent}
          </SmartLink>
        </div>
      </section>

      {/* Features */}
      <section className="mt-20 grid gap-5 sm:grid-cols-3">
        {app.features.map((f) => (
          <div
            key={f.title}
            className="glass rounded-[var(--radius-card)] p-6"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent-green/15 text-accent-green">
              <Check className="h-5 w-5" strokeWidth={2} />
            </span>
            <h3 className="mt-4 font-display text-xl font-extrabold tracking-tight text-foreground">
              {f.title}
            </h3>
            <p className="mt-2 text-[15px] leading-relaxed text-foreground/70">
              {f.body}
            </p>
          </div>
        ))}
      </section>

      {/* Built-on + CTA */}
      <section className="glass-strong mt-8 flex flex-col items-center gap-5 rounded-[var(--radius-panel)] px-6 py-12 text-center sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/50">
          Part of the Enterprise Suite
        </p>
        <h2 className="max-w-2xl font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-extrabold leading-tight tracking-tight text-foreground">
          {app.name} brings {app.parent} to your whole organization.
        </h2>
        <p className="max-w-xl text-sm leading-relaxed text-foreground/70">
          Built on {app.parent}, the same calm system extended with the
          controls, scale, and oversight teams need. This is an early preview —
          reach out and we&apos;ll shape it with you.
        </p>
        <a
          href={`mailto:${ENTERPRISE_EMAIL}?subject=${encodeURIComponent(
            app.name + " — enterprise enquiry"
          )}`}
          className="inline-flex items-center gap-2 rounded-full bg-accent-green px-6 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
        >
          Email {ENTERPRISE_EMAIL}
          <ArrowRight className="h-4 w-4" />
        </a>
      </section>
    </main>
  );
}
