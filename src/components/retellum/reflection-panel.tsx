'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Quote } from 'lucide-react';
import { TYPE_META, type MediaItem } from './data';

const easeOut = [0.22, 1, 0.36, 1] as const;

export function ReflectionPanel({
  item,
  byId,
  onSelectConnected,
}: {
  item: MediaItem;
  byId: Record<string, MediaItem>;
  onSelectConnected: (id: string) => void;
}) {
  const meta = TYPE_META[item.type];
  const connected = item.connectedTo.map((id) => byId[id]).filter(Boolean);

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={item.id}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: easeOut }}
        className="glass-strong rounded-[var(--radius-panel)] p-6 sm:p-8"
      >
        <div className="flex items-center justify-between gap-3">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: `${meta.accent}1f`, color: meta.accent }}
          >
            <meta.icon className="h-3.5 w-3.5" />
            {item.type}
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-foreground/40">
            {item.year}
          </span>
        </div>

        <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-tight text-foreground sm:text-3xl">
          {item.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-foreground/55">{item.creator}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/55 px-2.5 py-1 text-xs font-medium text-foreground/70"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-foreground/45">
            My reflection
          </p>
          <div className="mt-2 flex gap-3 rounded-[var(--radius-card)] bg-white/40 p-4">
            <Quote className="h-4 w-4 shrink-0 text-foreground/35" />
            <p className="text-[15px] leading-relaxed text-foreground/80">{item.reflection}</p>
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-green">
            What this taught me
          </p>
          <p className="mt-1.5 flex items-start gap-2 text-[15px] leading-relaxed text-foreground">
            <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-accent-green" />
            {item.lesson}
          </p>
        </div>

        {connected.length > 0 && (
          <div className="mt-6 border-t border-white/45 pt-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/45">
              Connected influences
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {connected.map((c) => {
                const cMeta = TYPE_META[c.type];
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => onSelectConnected(c.id)}
                    className="group inline-flex items-center gap-2 rounded-full bg-white/55 py-1.5 pl-2 pr-3 text-left transition-all hover:-translate-y-0.5 hover:bg-white/75"
                  >
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${cMeta.accent}1f`, color: cMeta.accent }}
                    >
                      <cMeta.icon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-xs font-medium text-foreground">{c.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </motion.article>
    </AnimatePresence>
  );
}
