'use client';

import dynamic from 'next/dynamic';

// The fullscreen "Ailiur App" workspace (sidebar + every section screen) is a
// large client bundle. It used to be imported eagerly, so its JS shipped inside
// the shared first-load chunk on every route. We now load it via a dynamic
// import (no SSR) so the workspace is code-split into its own chunk, off the
// initial/critical bundle — it's fetched after hydration instead of blocking it.
//
// We render it unconditionally (rather than gating on an "opened" flag) so the
// shell's internal <AnimatePresence> mounts empty at load and correctly runs
// both the open and the close/exit animations of the overlay.
const AiliurAppShell = dynamic(
  () => import('@/components/app/ailiur-app-shell').then((m) => m.AiliurAppShell),
  { ssr: false },
);

export function AppShellMount() {
  return <AiliurAppShell />;
}
