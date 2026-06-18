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
import {
  generateDailyProtocol,
  generateLifeMap,
  type CheckIn,
  type DailyProtocol,
  type GoalInterview,
  type Habit,
  type LifeMap,
  type ProtocolIntensity,
} from '@/components/app/life-os';

/**
 * Shared Life-OS state for the Goals and Today screens. Persisted to
 * localStorage so the demo survives refreshes. Today's protocol is *derived*
 * (deterministic) from the saved interview + intensity, so we only persist the
 * inputs and the user's day-level overlay (completions, added habits, check-in).
 */

// Bumped if the persisted shape changes, to avoid hydrating stale data.
const STORAGE_KEY = 'ailiur.lifeos.v1';

type PersistedState = {
  interview: GoalInterview | null;
  lifeMap: LifeMap | null;
  intensity: ProtocolIntensity;
  dayKey: string; // YYYY-MM-DD that the day-overlay belongs to
  completedHabitIds: string[];
  addedHabits: Habit[];
  checkIn: CheckIn | null;
};

function todayKey(): string {
  // Local-date key, e.g. "2026-06-18".
  return new Date().toLocaleDateString('en-CA');
}

function freshState(): PersistedState {
  return {
    interview: null,
    lifeMap: null,
    intensity: 'balanced',
    dayKey: todayKey(),
    completedHabitIds: [],
    addedHabits: [],
    checkIn: null,
  };
}

type LifeOsContextValue = {
  hydrated: boolean;
  interview: GoalInterview | null;
  lifeMap: LifeMap | null;
  intensity: ProtocolIntensity;
  protocol: DailyProtocol | null;
  addedHabits: Habit[];
  completedHabitIds: string[];
  checkIn: CheckIn | null;
  hasGoals: boolean;
  // mutations
  saveInterview: (interview: GoalInterview) => void;
  regenerate: () => void;
  setIntensity: (intensity: ProtocolIntensity) => void;
  toggleHabit: (id: string) => void;
  addHabit: (habit: Habit) => void;
  removeHabit: (id: string) => void;
  saveCheckIn: (check: CheckIn) => void;
  clearAll: () => void;
};

const LifeOsContext = createContext<LifeOsContextValue | null>(null);

export function LifeOsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(freshState);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate once on mount; reset the day-overlay if the date rolled over.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedState;
        if (parsed.dayKey !== todayKey()) {
          parsed.dayKey = todayKey();
          parsed.completedHabitIds = [];
          parsed.addedHabits = [];
          parsed.checkIn = null;
        }
        // One-time hydration from localStorage after the initial render
        // (must run post-mount to avoid an SSR/client hydration mismatch).
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState({ ...freshState(), ...parsed });
      }
    } catch {
      /* corrupt/unavailable storage — start fresh */
    }
    setHydrated(true);
  }, []);

  // Persist on every change (after hydration so we don't clobber stored data).
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable (private mode) — non-fatal */
    }
  }, [state, hydrated]);

  const saveInterview = useCallback((interview: GoalInterview) => {
    const lifeMap = generateLifeMap(interview);
    setState((s) => ({
      ...s,
      interview,
      lifeMap,
      intensity: interview.intensity,
      // A new map starts a clean day overlay.
      dayKey: todayKey(),
      completedHabitIds: [],
      addedHabits: [],
      checkIn: null,
    }));
  }, []);

  const regenerate = useCallback(() => {
    setState((s) =>
      s.interview
        ? { ...s, lifeMap: generateLifeMap({ ...s.interview, intensity: s.intensity }) }
        : s
    );
  }, []);

  const setIntensity = useCallback((intensity: ProtocolIntensity) => {
    setState((s) => ({
      ...s,
      intensity,
      interview: s.interview ? { ...s.interview, intensity } : s.interview,
      lifeMap: s.lifeMap ? { ...s.lifeMap, intensity } : s.lifeMap,
    }));
  }, []);

  const toggleHabit = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      completedHabitIds: s.completedHabitIds.includes(id)
        ? s.completedHabitIds.filter((h) => h !== id)
        : [...s.completedHabitIds, id],
    }));
  }, []);

  const addHabit = useCallback((habit: Habit) => {
    setState((s) =>
      s.addedHabits.some((h) => h.id === habit.id)
        ? s
        : { ...s, addedHabits: [...s.addedHabits, habit] }
    );
  }, []);

  const removeHabit = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      addedHabits: s.addedHabits.filter((h) => h.id !== id),
      completedHabitIds: s.completedHabitIds.filter((h) => h !== id),
    }));
  }, []);

  const saveCheckIn = useCallback((check: CheckIn) => {
    setState((s) => ({ ...s, checkIn: check }));
  }, []);

  const clearAll = useCallback(() => {
    setState(freshState());
  }, []);

  // Derived daily protocol = generated base + any library habits the user added.
  const protocol = useMemo<DailyProtocol | null>(() => {
    if (!state.lifeMap) return null;
    const base = generateDailyProtocol(state.lifeMap, state.intensity);
    const extra = state.addedHabits.filter(
      (h) => !base.habits.some((b) => b.id === h.id)
    );
    return { ...base, habits: [...base.habits, ...extra] };
  }, [state.lifeMap, state.intensity, state.addedHabits]);

  const value = useMemo<LifeOsContextValue>(
    () => ({
      hydrated,
      interview: state.interview,
      lifeMap: state.lifeMap,
      intensity: state.intensity,
      protocol,
      addedHabits: state.addedHabits,
      completedHabitIds: state.completedHabitIds,
      checkIn: state.checkIn,
      hasGoals: !!state.lifeMap,
      saveInterview,
      regenerate,
      setIntensity,
      toggleHabit,
      addHabit,
      removeHabit,
      saveCheckIn,
      clearAll,
    }),
    [
      hydrated,
      state,
      protocol,
      saveInterview,
      regenerate,
      setIntensity,
      toggleHabit,
      addHabit,
      removeHabit,
      saveCheckIn,
      clearAll,
    ]
  );

  return <LifeOsContext.Provider value={value}>{children}</LifeOsContext.Provider>;
}

export function useLifeOs() {
  const ctx = useContext(LifeOsContext);
  if (!ctx) throw new Error('useLifeOs must be used within a <LifeOsProvider>.');
  return ctx;
}
