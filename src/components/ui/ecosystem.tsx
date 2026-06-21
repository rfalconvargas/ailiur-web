'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { SmartLink } from '@/components/ui/smart-link';
import { track } from '@/lib/analytics';
import { getOutcomesWithProducts } from '@/lib/ecosystem';

const easeOut = [0.22, 1, 0.36, 1] as const;
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const OUTCOMES = getOutcomesWithProducts();

/**
 * The organizing frame for the whole company: five outcome domains, each led by
 * a flagship product. Fixes "too many products too soon" — visitors see five
 * clear outcomes, not fourteen app names. Long-tail apps live on /products.
 */
export function Ecosystem() {
  return (
    <section id="ecosystem" className="relative w-full scroll-mt-24 px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={rise}
            className="text-xs font-semibold uppercase tracking-widest text-foreground/50"
          >
            The ecosystem
          </motion.span>
          <motion.h2
            variants={rise}
            className="mt-3 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight text-foreground"
          >
            Five outcomes. One intelligence.
          </motion.h2>
          <motion.p variants={rise} className="mt-4 text-base text-foreground/65 sm:text-lg">
            Each Ailiur app is an engine for a specific outcome. Use one, or connect them all —
            the Context Mesh makes every app you add sharpen the rest.
          </motion.p>
        </motion.div>

        {/* Outcome cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {OUTCOMES.map((outcome) => (
            <motion.div
              key={outcome.id}
              variants={rise}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              className="flex flex-col rounded-[var(--radius-card)] glass p-7"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-foreground/45">
                {outcome.domain}
              </span>
              <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-foreground">
                {outcome.headline}
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-foreground/70">
                {outcome.description}
              </p>

              {/* Products in this domain */}
              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {outcome.products.map((p) => {
                  const inner = (
                    <span className="flex items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: p.brandColor }}
                      />
                      <span className="flex-1">
                        <span className="text-[15px] font-semibold text-foreground">{p.name}</span>
                        {p.status === 'coming_soon' && (
                          <span className="ml-2 rounded-full bg-foreground/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground/55">
                            Soon
                          </span>
                        )}
                        <span className="block text-[13px] leading-snug text-foreground/55">
                          {p.description}
                        </span>
                      </span>
                      {p.href && (
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground/35" />
                      )}
                    </span>
                  );
                  return (
                    <li key={p.slug}>
                      {p.href ? (
                        <SmartLink
                          href={p.href}
                          onClick={() =>
                            track('ecosystem_product_click', {
                              slug: p.slug,
                              outcome: outcome.id,
                            })
                          }
                          className="group block rounded-2xl px-3 py-2 transition-colors hover:bg-white/50"
                        >
                          {inner}
                        </SmartLink>
                      ) : (
                        <div className="block rounded-2xl px-3 py-2 opacity-80">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}

          {/* The Context Mesh — the layer beneath, given its own card. */}
          <motion.div
            variants={rise}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="flex flex-col justify-between rounded-[var(--radius-card)] bg-[var(--color-deep-contrast)] p-7 text-[#fffdf5]"
          >
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#fffdf5]/55">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-green)]" />
                The layer beneath
              </span>
              <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight">
                Unified Context Mesh
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-[#fffdf5]/75">
                One private, local-first context layer connects every engine — so an insight in your
                health app can sharpen how you learn, create, and work. With consent, sub-millisecond,
                on your device.
              </p>
            </div>
            <SmartLink
              href="/ucm"
              onClick={() => track('cta_click', { id: 'mesh_learn_more', location: 'ecosystem', label: 'How the Mesh works' })}
              className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#fffdf5]"
            >
              How the Mesh works
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </SmartLink>
          </motion.div>
        </motion.div>

        {/* Full ecosystem link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="mt-10 text-center"
        >
          <SmartLink
            href="/products"
            onClick={() => track('cta_click', { id: 'see_full_ecosystem', location: 'ecosystem', label: 'See the full ecosystem' })}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-foreground"
          >
            See the full ecosystem
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </SmartLink>
        </motion.div>
      </div>
    </section>
  );
}
