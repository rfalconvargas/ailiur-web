'use client';

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SmartLink } from '@/components/ui/smart-link';

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

type LaunchProps = {
  product: 'Enchiridion' | 'Ketofy';
  href: string;
  logo: string;
  accentVar: string; // CSS color var, e.g. var(--enchiridion)
};

function LaunchButton({ product, href, logo, accentVar }: LaunchProps) {
  return (
    <motion.a
      variants={rise}
      href={href}
      style={{ ['--accent' as string]: accentVar }}
      className={cn(
        'group glass-strong flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4',
        'transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5',
        'hover:border-[var(--accent)] hover:shadow-[0_10px_30px_rgba(80,60,0,0.18)]'
      )}
    >
      <Image
        src={logo}
        alt={`${product} logo`}
        width={32}
        height={32}
        className="h-8 w-8 rounded-lg object-cover"
      />
      <span className="flex items-center whitespace-nowrap text-sm font-semibold text-foreground">
        Launch
        <span className="ml-0 max-w-0 overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:ml-1 group-hover:max-w-[180px] group-hover:opacity-100 group-hover:[color:var(--accent)]">
          {product}&nbsp;App
        </span>
      </span>
    </motion.a>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 pb-20 pt-32">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="glass relative z-10 w-full max-w-3xl rounded-[var(--radius-panel)] px-6 py-12 text-center sm:px-12 sm:py-16"
      >
        {/* Eyebrow */}
        <motion.span
          variants={rise}
          className="glass-strong mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-foreground/70"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
          Operating System for Life
        </motion.span>

        {/* Headline */}
        <motion.h1
          variants={rise}
          className="font-display text-[clamp(2.75rem,7vw,5rem)] font-extrabold leading-[1.02] tracking-tight text-foreground"
        >
          The operating system
          <br />
          for a{' '}
          <span className="font-[200] italic">frictionless</span> life.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={rise}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground/70 sm:text-lg"
        >
          Ailiur unifies your health, learning, and focus into one local-first
          system. Ketofy and Enchiridion, connected by the Context Mesh — so
          every part of your life compounds.
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          variants={rise}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <SmartLink
            href="/signup"
            className="group inline-flex items-center gap-2 rounded-full bg-accent-green px-6 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
          >
            Create your account
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </SmartLink>
          <SmartLink
            href="/pricing"
            className="glass-strong inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
          >
            See pricing
          </SmartLink>
        </motion.div>

        {/* Product launch buttons */}
        <motion.div variants={rise} className="mt-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-foreground/50">
            Launch the apps
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <LaunchButton
              product="Enchiridion"
              href="https://www.enchiridion.ailiur.com"
              logo="/enchiridion-logo.jpg"
              accentVar="var(--enchiridion)"
            />
            <LaunchButton
              product="Ketofy"
              href="https://www.ketofy.ailiur.com"
              logo="/ketofy-logo.jpg"
              accentVar="var(--ketofy)"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
