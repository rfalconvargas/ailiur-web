'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { TM_EASE_OUT, tmCn } from './utils';

const variants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: TM_EASE_OUT, delay },
  }),
};

const reducedVariants: Variants = {
  hidden: { opacity: 1, y: 0, filter: 'blur(0px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

type TellumetryRevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Viewport margin for earlier trigger. */
  margin?: string;
  as?: 'div' | 'section' | 'article' | 'li' | 'header';
};

/**
 * Scroll-in wrapper — fade + slide + blur reveal.
 * Respects prefers-reduced-motion by skipping the transform/blur.
 */
export function TellumetryReveal({
  children,
  className,
  delay = 0,
  margin = '-80px',
  as = 'div',
}: TellumetryRevealProps) {
  const prefersReduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={tmCn(className)}
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
