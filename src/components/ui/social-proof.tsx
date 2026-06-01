'use client';

import { motion, type Variants } from 'framer-motion';
import { Quote } from 'lucide-react';

const easeOut = [0.22, 1, 0.36, 1] as const;
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const STATS = [
  { value: '86%', label: 'peak learning efficiency in Enchiridion' },
  { value: '<1ms', label: 'context retrieval through the Mesh' },
  { value: '100%', label: 'on-device, local-first by default' },
];

// Illustrative testimonials — replace with real customer quotes before launch.
const QUOTES = [
  {
    quote:
      'Ketofy and Enchiridion finally feel like one product. My energy data shows up in how I study — it just compounds.',
    name: 'Dr. Lena Ortiz',
    role: 'Metabolic researcher',
  },
  {
    quote:
      'The closed-loop tuning is the magic. I set a target once and the system quietly keeps me on it.',
    name: 'Marcus Bell',
    role: 'Founder, builder-operator',
  },
];

export function SocialProof() {
  return (
    <section id="proof" className="relative w-full px-4 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
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
            Proof
          </motion.span>
          <motion.h2
            variants={rise}
            className="mt-3 font-display text-[clamp(2rem,4.5vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight text-foreground"
          >
            Built for people who optimize everything.
          </motion.h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="glass mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-8 rounded-[var(--radius-card)] p-8 sm:grid-cols-3 sm:p-10"
        >
          {STATS.map((s) => (
            <motion.div key={s.value} variants={rise} className="text-center">
              <div className="font-display text-5xl font-extrabold tracking-tight text-accent-green">
                {s.value}
              </div>
              <p className="mt-2 text-sm text-foreground/65">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Quotes */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {QUOTES.map((q) => (
            <motion.figure
              key={q.name}
              variants={rise}
              className="glass rounded-[var(--radius-card)] p-8"
            >
              <Quote className="h-7 w-7 text-accent-red" strokeWidth={2} />
              <blockquote className="mt-4 text-lg leading-relaxed text-foreground/85">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm">
                <span className="font-semibold text-foreground">{q.name}</span>
                <span className="text-foreground/55"> · {q.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
