'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Plus, X, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Calm screen header reused across the built-out sections. */
export function ScreenHeader({
  eyebrow,
  title,
  body,
  right,
}: {
  eyebrow: string;
  title: string;
  body?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
          {eyebrow}
        </span>
        <h2 className="mt-2 font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-extrabold leading-[1.08] tracking-tight text-foreground">
          {title}
        </h2>
        {body && <p className="mt-3 text-sm leading-relaxed text-foreground/65 sm:text-base">{body}</p>}
      </div>
      {right && <div className="flex shrink-0 flex-wrap items-center gap-2">{right}</div>}
    </div>
  );
}

/** Small soft pill / badge. Pass a CSS color var via `tint` for an accent chip. */
export function Badge({
  children,
  tint,
  className,
}: {
  children: React.ReactNode;
  tint?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
        className
      )}
      style={
        tint
          ? { backgroundColor: `color-mix(in srgb, ${tint} 16%, transparent)`, color: tint }
          : undefined
      }
    >
      {children}
    </span>
  );
}

/** Segmented control for view toggles and filters. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (id: T) => void;
  ariaLabel?: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="inline-flex rounded-full bg-white/45 p-1"
    >
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.id)}
            className={cn(
              'rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
              active ? 'bg-accent-green text-[#fffdf5]' : 'text-foreground/65 hover:text-foreground'
            )}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/**
 * A small "Add to X" button that flips to a confirmed state on click. Mock-only:
 * the action is local feedback, ready to be wired to a real mutation later.
 */
export function AddButton({
  label,
  addedLabel,
  icon: Icon = Plus,
  onAdd,
  className,
}: {
  label: string;
  addedLabel: string;
  icon?: LucideIcon;
  onAdd?: () => void;
  className?: string;
}) {
  const [added, setAdded] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        if (added) return;
        setAdded(true);
        onAdd?.();
      }}
      aria-pressed={added}
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
        added
          ? 'cursor-default bg-accent-green/15 text-accent-green'
          : 'bg-white/55 text-foreground/75 hover:bg-white/80',
        className
      )}
    >
      {added ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
      {added ? addedLabel : label}
    </button>
  );
}

/** Right-side slide-over panel for detail views (routine detail, app detail). */
export function Drawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[120]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-foreground/25"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: easeOut }}
            className="absolute inset-y-0 right-0 w-full max-w-[460px] p-3"
          >
            <div className="glass-solid flex h-full flex-col rounded-[var(--radius-card)]">
              <div className="flex items-center justify-between gap-3 border-b border-white/40 p-5">
                <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground">
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close panel"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-white/60"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">{children}</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/** Disclaimer line used wherever the app interprets personal input. */
export function SoftDisclaimer({ children }: { children: React.ReactNode }) {
  return <p className="mt-6 text-xs leading-relaxed text-foreground/45">{children}</p>;
}
