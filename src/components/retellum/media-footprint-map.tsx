'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TYPE_META, type MediaItem } from './data';

const easeOut = [0.22, 1, 0.36, 1] as const;

/**
 * Hand-tuned constellation coordinates (normalized 0–100). Placed by feel so
 * the map reads as organic rather than a rigid ring, while keeping the most
 * connected items toward the gravitational center.
 */
const POSITIONS: Record<string, { x: number; y: number }> = {
  'space-odyssey': { x: 50, y: 13 },
  'how-to-speak': { x: 25, y: 26 },
  'miyazaki': { x: 79, y: 28 },
  'order-of-time': { x: 21, y: 52 },
  'thinking-fast': { x: 61, y: 49 },
  'in-rainbows': { x: 85, y: 58 },
  'long-now': { x: 13, y: 78 },
  'this-is-water': { x: 45, y: 73 },
  'outer-wilds': { x: 70, y: 83 },
  'rosencrantz': { x: 38, y: 92 },
};

export function MediaFootprintMap({
  items,
  activeId,
  onSelect,
}: {
  items: MediaItem[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const active = items.find((i) => i.id === activeId);
  const connectedSet = useMemo(
    () => new Set(active?.connectedTo ?? []),
    [active],
  );

  // Build a de-duplicated edge list from connectedTo (a–b == b–a).
  const edges = useMemo(() => {
    const seen = new Set<string>();
    const out: { a: string; b: string }[] = [];
    for (const item of items) {
      for (const to of item.connectedTo) {
        if (!POSITIONS[item.id] || !POSITIONS[to]) continue;
        const key = [item.id, to].sort().join('|');
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ a: item.id, b: to });
      }
    }
    return out;
  }, [items]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem] select-none">
      {/* Edges */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {edges.map(({ a, b }) => {
          const pa = POSITIONS[a];
          const pb = POSITIONS[b];
          const lit = a === activeId || b === activeId;
          const accent = active ? TYPE_META[active.type].accent : '#1c1606';
          return (
            <line
              key={`${a}|${b}`}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              stroke={lit ? accent : '#1c1606'}
              strokeOpacity={lit ? 0.5 : 0.1}
              strokeWidth={lit ? 0.65 : 0.35}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {items.map((item) => {
        const pos = POSITIONS[item.id];
        if (!pos) return null;
        const meta = TYPE_META[item.type];
        const Icon = meta.icon;
        const isActive = item.id === activeId;
        const isConnected = connectedSet.has(item.id);
        const dimmed = !isActive && !isConnected;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            aria-pressed={isActive}
            aria-label={`${item.type}: ${item.title}`}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            className={cn(
              'absolute -translate-x-1/2 -translate-y-1/2 outline-none focus-visible:z-30',
              isActive ? 'z-30' : isConnected ? 'z-20' : 'z-10',
            )}
          >
            <motion.span
              whileHover={{ scale: 1.06, opacity: 1 }}
              whileTap={{ scale: 0.97 }}
              animate={{
                scale: isActive ? 1.14 : 1,
                opacity: dimmed ? 0.5 : 1,
              }}
              transition={{ duration: 0.3, ease: easeOut }}
              style={
                isActive
                  ? { boxShadow: `0 0 0 2px ${meta.accent}80, 0 10px 30px ${meta.accent}45` }
                  : isConnected
                    ? { boxShadow: `0 0 0 1.5px ${meta.accent}55` }
                    : undefined
              }
              className={cn(
                'flex w-[88px] flex-col items-center gap-1 rounded-2xl px-2 py-2 text-center transition-colors sm:w-[104px]',
                isActive ? 'glass-strong' : 'glass hover:bg-white/60',
              )}
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-xl sm:h-9 sm:w-9"
                style={{ backgroundColor: `${meta.accent}1f`, color: meta.accent }}
              >
                <Icon className="h-[17px] w-[17px]" strokeWidth={2} />
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-foreground/55">
                {item.type}
              </span>
              <span className="line-clamp-2 text-[11px] font-medium leading-tight text-foreground">
                {item.title}
              </span>
            </motion.span>
          </button>
        );
      })}
    </div>
  );
}
