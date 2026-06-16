'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { LQ_EASE_OUT, lqCn } from './utils';

type ConsensusRingProps = {
  /** Consensus percentage, 0–100. */
  percent: number;
  /** Pixel diameter. */
  size?: number;
  /** Stroke color token. Defaults to civic green. */
  color?: string;
  /** Big label under the percentage (e.g. "consensus"). */
  label?: string;
  /** Secondary line (e.g. neighbor count). */
  sublabel?: string;
  className?: string;
};

/**
 * Consensus ring — a Lociq signature motif. A thin progress ring whose arc
 * fills to the share of neighbors backing a solution, with the figure centered.
 * Animates on mount; respects reduced motion.
 */
export function ConsensusRing({
  percent,
  size = 168,
  color = 'var(--lq-green)',
  label = 'consensus',
  sublabel,
  className,
}: ConsensusRingProps) {
  const reduced = useReducedMotion();
  const clamped = Math.max(0, Math.min(100, percent));
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - clamped / 100);

  return (
    <div
      className={lqCn('relative inline-grid place-items-center', className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="color-mix(in srgb, var(--lq-ink) 10%, transparent)"
          strokeWidth={stroke}
        />
        {/* Soft glow underlay */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          opacity={0.18}
          style={{ filter: 'blur(5px)' }}
        />
        {/* Animated arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={reduced ? { strokeDashoffset: offset } : { strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: reduced ? 0 : 1, ease: LQ_EASE_OUT }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span
          className="font-display text-4xl font-extrabold leading-none tracking-tight"
          style={{ color }}
        >
          {Math.round(clamped)}
          <span className="align-top text-xl">%</span>
        </span>
        {label && (
          <span className="mt-1 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[var(--lq-slate-dim)]">
            {label}
          </span>
        )}
        {sublabel && (
          <span className="mt-0.5 text-[0.75rem] font-medium text-[var(--lq-slate)]">{sublabel}</span>
        )}
      </div>
    </div>
  );
}
