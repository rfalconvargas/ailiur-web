'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { AP_EASE_OUT, apCn } from './utils';

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: AP_EASE_OUT, delay },
  }),
};

const reducedVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0 },
};

type AptellumScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Viewport margin for earlier trigger. */
  margin?: string;
  as?: 'div' | 'section' | 'article' | 'li';
};

/**
 * Calm scroll-in wrapper. Respects prefers-reduced-motion by skipping
 * transform animation when the user requests reduced motion.
 */
export function AptellumScrollReveal({
  children,
  className,
  delay = 0,
  margin = '-80px',
  as = 'div',
}: AptellumScrollRevealProps) {
  const prefersReduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={apCn(className)}
      custom={delay}
      variants={prefersReduced ? reducedVariants : variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin }}
    >
      {children}
    </Component>
  );
}
