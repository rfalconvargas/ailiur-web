'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Download, Loader2, Trash2 } from 'lucide-react';
import { deleteAllContext } from '@/lib/account/actions';

/**
 * Data import/export + delete controls for /account/context.
 * - Export is a PLACEHOLDER (no bundle builder yet).
 * - Delete is REAL: removes all of the account's context_records (RLS-scoped).
 */
export function ContextActions({ hasRecords }: { hasRecords: boolean }) {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function onDelete() {
    setError(null);
    startTransition(async () => {
      const res = await deleteAllContext();
      if (!res.ok) return setError(res.error);
      setConfirm(false);
      setDone(true);
      router.refresh();
    });
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-2xl border border-white/50 bg-white/30 p-5">
        <p className="text-sm font-semibold text-foreground">Export your context</p>
        <p className="mt-1 text-xs leading-relaxed text-foreground/60">
          Download everything Ailiur holds for you as a portable archive.
        </p>
        <button
          type="button"
          disabled
          title="Coming soon"
          className="mt-3 inline-flex cursor-not-allowed items-center gap-1.5 rounded-full border border-white/70 bg-white/40 px-4 py-2 text-xs font-semibold text-foreground/50"
        >
          <Download className="h-3.5 w-3.5" /> Export (coming soon)
        </button>
      </div>

      <div className="rounded-2xl border border-accent-red/30 bg-accent-red/[0.06] p-5">
        <p className="text-sm font-semibold text-accent-red">Delete all context</p>
        <p className="mt-1 text-xs leading-relaxed text-foreground/60">
          Clears every context record across your apps. Sources stay connected; records are erased.
        </p>
        {done ? (
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-accent-green">
            <Check className="h-3.5 w-3.5" strokeWidth={3} /> Context cleared
          </p>
        ) : confirm ? (
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={onDelete}
              disabled={pending}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent-red px-4 py-2 text-xs font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {pending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
              Confirm delete
            </button>
            <button type="button" onClick={() => setConfirm(false)} className="text-xs font-medium text-foreground/55 hover:text-foreground">
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirm(true)}
            disabled={!hasRecords}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-accent-red/40 px-4 py-2 text-xs font-semibold text-accent-red transition-colors hover:bg-accent-red/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 className="h-3.5 w-3.5" /> {hasRecords ? 'Delete all context' : 'No context to delete'}
          </button>
        )}
        {error && <p className="mt-2 text-xs font-medium text-accent-red">{error}</p>}
      </div>
    </div>
  );
}
