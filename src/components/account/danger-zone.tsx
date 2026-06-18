'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import { LogOut, Trash2 } from 'lucide-react';

/**
 * Security danger zone.
 *
 * - "Sign out" ends the current session (real). Because sessions are stateless
 *   JWTs, true "sign out everywhere" requires server-side revocation (rotating
 *   AUTH_SECRET or a session-version claim) — documented TODO.
 * - "Delete account" is intentionally a guarded PLACEHOLDER: account deletion
 *   must cascade across next_auth + the Ailiur layer and is not wired yet.
 */
export function DangerZone() {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-white/50 bg-white/30 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">Sign out of this device</p>
          <p className="text-xs leading-relaxed text-foreground/60">
            Ends your current session. Signing out of every device is a planned feature.
          </p>
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: '/' })}
          className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-white/70 bg-white/50 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/80"
        >
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </div>

      <div className="rounded-2xl border border-accent-red/30 bg-accent-red/[0.06] p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-accent-red">Delete your Ailiur Account</p>
            <p className="text-xs leading-relaxed text-foreground/60">
              Permanently removes your account, profile, connected apps, and context. This can’t be undone.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setConfirmDelete((v) => !v)}
            className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-accent-red/40 px-5 py-2.5 text-sm font-semibold text-accent-red transition-colors hover:bg-accent-red/10"
          >
            <Trash2 className="h-4 w-4" /> Delete account
          </button>
        </div>
        {confirmDelete && (
          <div className="mt-4 rounded-xl border border-accent-red/30 bg-white/40 p-4 text-sm text-foreground/75">
            Account deletion isn’t enabled yet — it needs to safely cascade across the auth and
            Ailiur data layers. For now, contact{' '}
            <a href="mailto:support@ailiur.com" className="font-semibold text-foreground underline-offset-4 hover:underline">
              support@ailiur.com
            </a>{' '}
            to request deletion. (Tracked as a launch-blocking TODO.)
          </div>
        )}
      </div>
    </div>
  );
}
