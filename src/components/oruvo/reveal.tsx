'use client';

import { motion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { OR_EASE_OUT } from './utils';

const variants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: OR_EASE_OUT, delay },
  }),
};

/**
 * Calm scroll-in wrapper. Keeps surrounding sections server-rendered while
 * adding a single fade-up as content enters the viewport.
 */
export function OruvoReveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      custom={delay}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}
