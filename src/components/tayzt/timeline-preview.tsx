'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AudioLines, Film, Layers, Gauge } from 'lucide-react';
import { TZ_EASE_OUT, tzCn } from './utils';

/** Deterministic pseudo-waveform heights — no Math.random (SSR-safe). */
const WAVE = Array.from({ length: 48 }, (_, i) => {
  const a = Math.sin(i * 0.55) * 0.5 + 0.5;
  const b = Math.sin(i * 0.21 + 1.3) * 0.5 + 0.5;
  return 0.18 + (a * 0.6 + b * 0.4) * 0.82;
});

const TRACKS = [
  { icon: AudioLines, label: 'Sound', color: 'var(--tz-gold)' },
  { icon: Film, label: 'Texture', color: 'var(--tz-amber)' },
  { icon: Layers, label: 'Overlays', color: 'var(--tz-green)' },
  { icon: Gauge, label: 'Pacing', color: 'var(--tz-red)' },
] as const;

/**
 * Cinematic timeline preview — a stylized editor surface with a gold waveform
 * ribbon, abstract overlay fragments, and four atmospheric tracks. Decorative.
 */
export function TimelinePreview({
  className,
  animated = false,
}: {
  className?: string;
  /** Enable the slow looping playhead sweep (hero only). */
  animated?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <div
      className={tzCn(
        'tz-glass-strong relative overflow-hidden rounded-[var(--tz-radius-xl)] p-5 sm:p-7',
        className,
      )}
      aria-hidden
    >
      {/* Abstract overlay fragments */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--tz-amber)_40%,transparent),transparent_70%)] blur-2xl" />
        <div className="absolute -bottom-16 left-8 h-44 w-44 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--tz-teal)_70%,transparent),transparent_70%)] blur-2xl" />
      </div>

      {/* Slow playhead sweep — a single transform-animated line; cheap and looping. */}
      {animated && !reduced && (
        <motion.span
          className="pointer-events-none absolute bottom-6 top-[4.5rem] w-px bg-[linear-gradient(180deg,transparent,var(--tz-gold),transparent)]"
          style={{ boxShadow: '0 0 14px color-mix(in srgb, var(--tz-gold) 55%, transparent)' }}
          initial={{ left: '8%', opacity: 0 }}
          animate={{ left: ['8%', '94%'], opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: 6, ease: 'linear', repeat: Infinity, repeatDelay: 0.6 }}
        />
      )}

      {/* Top bar — mood readout */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--tz-red)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--tz-amber)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--tz-green)]" />
        </div>
        <span className="rounded-[var(--tz-radius-pill)] border border-[var(--tz-border)] px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[var(--tz-gold)]">
          Mood · Wistful / Warm
        </span>
      </div>

      {/* Waveform ribbon */}
      <div className="relative mt-6 flex h-24 items-center gap-[3px] sm:h-28">
        {WAVE.map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-full"
            style={{
              background:
                'linear-gradient(180deg, var(--tz-gold), color-mix(in srgb, var(--tz-amber) 70%, transparent))',
            }}
            initial={reduced ? false : { scaleY: 0.25, opacity: 0.4 }}
            whileInView={{ scaleY: h, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: TZ_EASE_OUT, delay: reduced ? 0 : i * 0.012 }}
          />
        ))}
      </div>

      {/* Atmospheric tracks */}
      <div className="relative mt-6 space-y-2.5">
        {TRACKS.map((t, i) => {
          const Icon = t.icon;
          return (
            <div key={t.label} className="flex items-center gap-3">
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--tz-radius-sm)] border border-[var(--tz-hairline)] bg-[var(--tz-surface-muted)]"
                style={{ color: t.color }}
              >
                <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              </span>
              <span className="w-16 shrink-0 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[var(--tz-graphite)]">
                {t.label}
              </span>
              <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-[var(--tz-surface-muted)]">
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: t.color, opacity: 0.85 }}
                  initial={reduced ? false : { width: 0 }}
                  whileInView={{ width: `${62 + i * 9}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: TZ_EASE_OUT, delay: reduced ? 0 : 0.2 + i * 0.1 }}
                />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
