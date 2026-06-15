'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { TZ_EASE_OUT, tzCn } from './utils';

const variants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(8px)' },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: TZ_EASE_OUT, delay },
  }),
};

const reducedVariants: Variants = {
  hidden: { opacity: 1, y: 0, filter: 'blur(0px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

type TayztRevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Viewport margin for earlier trigger. */
  margin?: string;
  as?: 'div' | 'section' | 'article' | 'li' | 'header';
};

/**
 * Cinematic scroll-in wrapper — fade + slide + blur reveal.
 * Respects prefers-reduced-motion by skipping the transform/blur.
 */
export function TayztReveal({
  children,
  className,
  delay = 0,
  margin = '-80px',
  as = 'div',
}: TayztRevealProps) {
  const prefersReduced = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={tzCn(className)}
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
