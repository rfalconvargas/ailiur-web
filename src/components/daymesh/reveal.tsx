'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { DM_EASE_OUT } from './utils';

const variants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: DM_EASE_OUT, delay },
  }),
};

/**
 * Calm scroll-in wrapper. Keeps surrounding sections server-rendered while
 * adding a single fade-up as content enters the viewport.
 */
export function DaymeshReveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li';
}) {
  const MotionTag = as === 'li' ? motion.li : motion.div;
  return (
    <MotionTag
      className={className}
      custom={delay}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </MotionTag>
  );
}
