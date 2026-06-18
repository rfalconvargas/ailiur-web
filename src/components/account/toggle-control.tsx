'use client';

import { useState, useTransition } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ActionResult = { ok: boolean; error?: string };

/**
 * A premium switch backed by a server action. The action is typically a bound
 * server action, e.g. setAccountFlag.bind(null, 'product_analytics') or
 * setAppPermission.bind(null, slug, 'context:read'). Optimistic with rollback
 * + inline error on failure.
 */
export function ToggleControl({
  label,
  description,
  defaultChecked,
  disabled,
  action,
}: {
  label: string;
  description?: string;
  defaultChecked: boolean;
  disabled?: boolean;
  action: (next: boolean) => Promise<ActionResult>;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function toggle() {
    if (disabled || pending) return;
    const next = !checked;
    setChecked(next); // optimistic
    setError(null);
    startTransition(async () => {
      const res = await action(next);
      if (!res.ok) {
        setChecked(!next); // rollback
        setError(res.error ?? 'Could not save. Try again.');
      }
    });
  }

  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/40 py-4 last:border-0">
      <div className="min-w-0">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {description && <p className="mt-0.5 text-xs leading-relaxed text-foreground/60">{description}</p>}
        {error && <p className="mt-1 text-xs font-medium text-accent-red">{error}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={toggle}
        disabled={disabled || pending}
        className={cn(
          'relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
          checked ? 'bg-accent-green' : 'bg-foreground/20',
          (disabled || pending) && 'opacity-60'
        )}
      >
        <span
          className={cn(
            'inline-flex h-5 w-5 items-center justify-center rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-[22px]' : 'translate-x-0.5'
          )}
        >
          {pending && <Loader2 className="h-3 w-3 animate-spin text-foreground/50" />}
        </span>
      </button>
    </div>
  );
}
