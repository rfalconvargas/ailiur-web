'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Sparkles } from 'lucide-react';
import { TYPE_META, MEDIA_TYPES, type MediaType } from './data';

const STORAGE_KEY = 'retellum:my-entries';

type LoggedEntry = {
  id: string;
  title: string;
  type: MediaType;
  creator: string;
  reflection: string;
  tags: string[];
};

function loadEntries(): LoggedEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as LoggedEntry[]) : [];
  } catch {
    return [];
  }
}

const easeOut = [0.22, 1, 0.36, 1] as const;

export function LogFirstMediaDemo() {
  const [entries, setEntries] = useState<LoggedEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const [title, setTitle] = useState('');
  const [type, setType] = useState<MediaType>('Film');
  const [creator, setCreator] = useState('');
  const [reflection, setReflection] = useState('');
  const [tags, setTags] = useState('');

  // Load any previously saved entries once, on the client only. The synchronous
  // setState here is intentional one-time hydration, not a render loop.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEntries(loadEntries());
    setHydrated(true);
  }, []);

  // Persist whenever the list changes (after the initial load).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      /* storage unavailable — prototype, fail silently */
    }
  }, [entries, hydrated]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!title.trim()) return;
    const entry: LoggedEntry = {
      id:
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : String(Date.now()),
      title: title.trim(),
      type,
      creator: creator.trim(),
      reflection: reflection.trim(),
      tags: tags
        .split(',')
        .map((t) => t.trim().replace(/^#/, ''))
        .filter(Boolean),
    };
    setEntries((prev) => [entry, ...prev]);
    setTitle('');
    setCreator('');
    setReflection('');
    setTags('');
  }

  function remove(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }

  const inputCls =
    'w-full rounded-2xl border border-white/65 bg-white/55 px-4 py-3 text-[15px] text-foreground outline-none transition-all placeholder:text-foreground/35 focus:border-accent-green focus:ring-2 focus:ring-accent-green/30';

  return (
    <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
      {/* Form */}
      <form onSubmit={handleSubmit} className="glass-strong grid gap-4 rounded-[var(--radius-panel)] p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-1.5">
            <label htmlFor="lf-title" className="text-xs font-semibold uppercase tracking-widest text-foreground/55">
              Title
            </label>
            <input
              id="lf-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="What did you take in?"
              className={inputCls}
            />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor="lf-type" className="text-xs font-semibold uppercase tracking-widest text-foreground/55">
              Type
            </label>
            <select
              id="lf-type"
              value={type}
              onChange={(e) => setType(e.target.value as MediaType)}
              className={`${inputCls} appearance-none`}
            >
              {MEDIA_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="lf-creator" className="text-xs font-semibold uppercase tracking-widest text-foreground/55">
            Creator
          </label>
          <input
            id="lf-creator"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            placeholder="Who made it?"
            className={inputCls}
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="lf-reflection" className="text-xs font-semibold uppercase tracking-widest text-foreground/55">
            Reflection
          </label>
          <textarea
            id="lf-reflection"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            rows={3}
            placeholder="What did it do to you?"
            className={`${inputCls} resize-none`}
          />
        </div>

        <div className="grid gap-1.5">
          <label htmlFor="lf-tags" className="text-xs font-semibold uppercase tracking-widest text-foreground/55">
            Tags <span className="text-foreground/35">(comma separated)</span>
          </label>
          <input
            id="lf-tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="attention, craft, time"
            className={inputCls}
          />
        </div>

        <button
          type="submit"
          className="group mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-accent-green px-6 py-3.5 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          Add to my footprint
        </button>
        <p className="text-center text-xs text-foreground/45">
          Saved locally in your browser — a prototype, no account needed.
        </p>
      </form>

      {/* Saved entries */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/55">
            Your entries
          </p>
          {hydrated && entries.length > 0 && (
            <span className="text-xs text-foreground/45">{entries.length} logged</span>
          )}
        </div>

        {hydrated && entries.length === 0 && (
          <div className="glass flex flex-col items-center rounded-[var(--radius-panel)] px-6 py-12 text-center">
            <Sparkles className="h-5 w-5 text-accent-green" />
            <p className="mt-3 text-sm leading-relaxed text-foreground/60">
              Nothing here yet. Log the last thing that stayed with you — it
              becomes the first node on your map.
            </p>
          </div>
        )}

        <div className="grid gap-3">
          <AnimatePresence initial={false}>
            {entries.map((entry) => {
              const meta = TYPE_META[entry.type];
              return (
                <motion.article
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className="glass rounded-[var(--radius-card)] p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
                      style={{ backgroundColor: `${meta.accent}1f`, color: meta.accent }}
                    >
                      <meta.icon className="h-3.5 w-3.5" />
                      {entry.type}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(entry.id)}
                      aria-label={`Remove ${entry.title}`}
                      className="rounded-full p-1.5 text-foreground/35 transition-colors hover:bg-white/55 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <h4 className="mt-3 font-display text-lg font-bold leading-tight tracking-tight text-foreground">
                    {entry.title}
                  </h4>
                  {entry.creator && (
                    <p className="mt-0.5 text-sm font-medium text-foreground/55">{entry.creator}</p>
                  )}
                  {entry.reflection && (
                    <p className="mt-2 text-sm leading-relaxed text-foreground/75">{entry.reflection}</p>
                  )}
                  {entry.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/55 px-2 py-0.5 text-xs font-medium text-foreground/70"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
