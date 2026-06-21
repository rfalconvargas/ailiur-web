import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { SmartLink } from '@/components/ui/smart-link';
import {
  OUTCOMES,
  resolveProduct,
  getAllConsumerProducts,
  CONTEXT_MESH,
  type EcosystemProduct,
} from '@/lib/ecosystem';

export const metadata: Metadata = {
  title: 'The ecosystem',
  description:
    'Every Ailiur app, organized by outcome — learning, health, creativity, personal intelligence, and work — all connected by the Unified Context Mesh.',
  alternates: { canonical: '/products' },
};

// Slugs already featured inside an outcome domain, so the "Also in the
// ecosystem" rail only shows the long-tail apps that aren't mapped above.
const FEATURED = new Set(OUTCOMES.flatMap((o) => o.productSlugs));

function ProductRow({ p }: { p: EcosystemProduct }) {
  const inner = (
    <span className="flex items-center gap-3">
      <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: p.brandColor }} />
      <span className="flex-1">
        <span className="text-[15px] font-semibold text-foreground">{p.name}</span>
        {p.status === 'coming_soon' && (
          <span className="ml-2 rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground/55">
            Soon
          </span>
        )}
        <span className="block text-[13px] leading-snug text-foreground/55">{p.description}</span>
      </span>
      {p.href && <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground/35" />}
    </span>
  );
  return p.href ? (
    <SmartLink href={p.href} className="block rounded-2xl px-3 py-2 transition-colors hover:bg-white/50">
      {inner}
    </SmartLink>
  ) : (
    <div className="block rounded-2xl px-3 py-2 opacity-80">{inner}</div>
  );
}

export default function ProductsPage() {
  const longTail = getAllConsumerProducts().filter((p) => !FEATURED.has(p.slug));

  return (
    <main className="relative mx-auto w-full max-w-6xl px-4 pb-28 pt-40">
      {/* Header */}
      <header className="mx-auto max-w-3xl text-center">
        <span className="glass-strong inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-foreground/70">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
          The ecosystem
        </span>
        <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.04] tracking-tight text-foreground">
          AI-first outcome engines.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-foreground/70">
          Every Ailiur app is an engine for a specific outcome — across learning, health, creativity,
          personal intelligence, and work. Each works on its own; the Unified Context Mesh connects
          them so the value compounds.
        </p>
      </header>

      {/* Outcome domains */}
      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {OUTCOMES.map((outcome) => {
          const products = outcome.productSlugs
            .map(resolveProduct)
            .filter((p): p is EcosystemProduct => p !== null);
          return (
            <section key={outcome.id} className="flex flex-col rounded-[var(--radius-card)] glass p-7">
              <span className="text-xs font-semibold uppercase tracking-widest text-foreground/45">
                {outcome.domain}
              </span>
              <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-foreground">
                {outcome.headline}
              </h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-foreground/70">
                {outcome.description}
              </p>
              <ul className="mt-6 flex flex-col gap-2.5">
                {products.map((p) => (
                  <li key={p.slug}>
                    <ProductRow p={p} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        {/* The Context Mesh */}
        <section className="flex flex-col justify-between rounded-[var(--radius-card)] bg-foreground p-7 text-[#fffdf5]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#fffdf5]/55">
              The layer beneath
            </span>
            <h2 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight">
              {CONTEXT_MESH.name}
            </h2>
            <p className="mt-2.5 text-[15px] leading-relaxed text-[#fffdf5]/75">
              {CONTEXT_MESH.description} Private, local-first, and on your device by default.
            </p>
          </div>
          <SmartLink
            href="/ucm"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#fffdf5]"
          >
            How the Mesh works
            <ArrowUpRight className="h-4 w-4" />
          </SmartLink>
        </section>
      </div>

      {/* Long-tail apps */}
      {longTail.length > 0 && (
        <section className="mt-16">
          <h2 className="text-center font-display text-xl font-extrabold tracking-tight text-foreground">
            Also in the ecosystem
          </h2>
          <div className="mx-auto mt-6 grid max-w-4xl grid-cols-1 gap-2.5 sm:grid-cols-2">
            {longTail.map((p) => (
              <div key={p.slug} className="glass rounded-[var(--radius-card)]">
                <ProductRow p={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="mt-16 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <SmartLink
          href="/signup"
          className="inline-flex items-center gap-2 rounded-full bg-accent-green px-6 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
        >
          Get started
        </SmartLink>
        <SmartLink
          href="/pricing"
          className="glass-strong inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
        >
          See pricing
        </SmartLink>
      </div>
    </main>
  );
}
