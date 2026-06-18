'use client';

import { useEffect, useState } from 'react';

/**
 * useState that transparently persists to localStorage. SSR-safe: the initial
 * value is used for the first (server-matched) render, then hydrated from
 * storage after mount. The third tuple element reports hydration so callers can
 * avoid flashing default content.
 */
export function useLocalState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw != null) setValue(JSON.parse(raw) as T);
    } catch {
      /* unavailable/corrupt storage — keep the initial value */
    }
    setHydrated(true);
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* non-fatal */
    }
  }, [key, value, hydrated]);

  return [value, setValue, hydrated] as const;
}
