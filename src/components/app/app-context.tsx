'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { SectionId } from '@/components/app/sections';
import { DEFAULT_SECTION } from '@/components/app/sections';

/**
 * Global state for the fullscreen "Ailiur App" experience that lives inside the
 * marketing homepage. Any client component (the hero CTA, the nav, the embedded
 * launch section) can open or close the app through this context.
 *
 * State is intentionally local + lightweight:
 *  - open/close drives a single fullscreen overlay mounted once in Providers.
 *  - the open state is mirrored to the URL (`?app=open`) so it can be deep-linked
 *    and survives back/forward, without a full page navigation.
 *  - the active section is remembered in localStorage between visits.
 */

type AiliurAppContextValue = {
  open: boolean;
  section: SectionId;
  openApp: (section?: SectionId) => void;
  closeApp: () => void;
  setSection: (section: SectionId) => void;
};

const AiliurAppContext = createContext<AiliurAppContextValue | null>(null);

const URL_PARAM = 'app';
const URL_VALUE = 'open';
const SECTION_KEY = 'ailiur.app.section';

export function AiliurAppProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [section, setSectionState] = useState<SectionId>(DEFAULT_SECTION);

  // Hydrate from URL + localStorage once on mount. This must run after the
  // initial (server-matched) render to avoid a hydration mismatch, so the
  // synchronous setState here is intentional.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const saved = window.localStorage.getItem(SECTION_KEY) as SectionId | null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (params.get(URL_PARAM) === URL_VALUE) setOpen(true);
    if (saved) setSectionState(saved);
  }, []);

  // Keep the URL in sync with open state (no scroll, no reload).
  useEffect(() => {
    const url = new URL(window.location.href);
    const has = url.searchParams.get(URL_PARAM) === URL_VALUE;
    if (open && !has) {
      url.searchParams.set(URL_PARAM, URL_VALUE);
      window.history.pushState({ ailiurApp: true }, '', url);
    } else if (!open && has) {
      url.searchParams.delete(URL_PARAM);
      window.history.replaceState({}, '', url);
    }
  }, [open]);

  // Browser back/forward should close the app when the param disappears.
  useEffect(() => {
    const onPop = () => {
      const params = new URLSearchParams(window.location.search);
      setOpen(params.get(URL_PARAM) === URL_VALUE);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Lock background scroll while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Escape closes the app.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const setSection = useCallback((next: SectionId) => {
    setSectionState(next);
    try {
      window.localStorage.setItem(SECTION_KEY, next);
    } catch {
      /* storage may be unavailable (private mode) — non-fatal */
    }
  }, []);

  const openApp = useCallback(
    (next?: SectionId) => {
      if (next) setSection(next);
      setOpen(true);
    },
    [setSection]
  );

  const closeApp = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, section, openApp, closeApp, setSection }),
    [open, section, openApp, closeApp, setSection]
  );

  return <AiliurAppContext.Provider value={value}>{children}</AiliurAppContext.Provider>;
}

export function useAiliurApp() {
  const ctx = useContext(AiliurAppContext);
  if (!ctx) {
    throw new Error('useAiliurApp must be used within an <AiliurAppProvider>.');
  }
  return ctx;
}
