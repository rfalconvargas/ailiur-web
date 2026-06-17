'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, X, Tag, RefreshCw, CalendarClock, Link2 } from 'lucide-react';
import { OruvoSection, OruvoHint } from './section';
import { orCn, OR_EASE_OUT } from './utils';
import { ASSET_ZONES, ASSET_ITEMS, DEMO_NOTE, HINTS, type AssetItem } from '@/lib/oruvo/content';

/** Detail readout for a selected belonging (the required `AssetDetailPanel`). */
function AssetDetailPanel({ item, onClose }: { item: AssetItem; onClose: () => void }) {
  const Icon = item.icon;
  const rows = [
    { icon: CalendarClock, label: 'Purchased', value: item.purchased },
    { icon: Tag, label: 'Estimated value', value: item.value },
    { icon: RefreshCw, label: 'Replacement cost', value: item.replacement },
    { icon: CalendarClock, label: 'Resale window', value: item.resaleWindow },
    { icon: Link2, label: 'Linked goal', value: item.linkedGoal },
  ];

  return (
    <motion.aside
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: OR_EASE_OUT }}
      className="or-glass-strong relative flex flex-col rounded-[var(--or-radius-lg)] p-5"
      aria-live="polite"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close detail"
        className="absolute right-3 top-3 rounded-[var(--or-radius-sm)] p-1.5 text-[var(--or-slate)] hover:bg-[rgba(22,26,32,0.06)] hover:text-[var(--or-ink)]"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-[var(--or-radius-md)] bg-[var(--or-gold-tint)]">
          <Icon className="h-5 w-5 text-[var(--or-gold-deep)]" aria-hidden />
        </span>
        <div>
          <p className="font-display text-lg font-bold tracking-tight text-[var(--or-ink)]">
            {item.name}
          </p>
          <p className="text-xs text-[var(--or-slate-dim)]">{item.zone}</p>
        </div>
      </div>

      <span
        className={orCn(
          'mt-4 inline-flex w-fit items-center gap-1.5 rounded-[var(--or-radius-pill)] px-3 py-1 text-xs font-semibold',
          item.warrantyOk
            ? 'bg-[var(--or-green-tint)] text-[var(--or-green)]'
            : 'bg-[var(--or-red-tint)] text-[var(--or-red)]',
        )}
      >
        {item.warrantyOk ? <ShieldCheck className="h-3.5 w-3.5" /> : <ShieldAlert className="h-3.5 w-3.5" />}
        {item.warranty}
      </span>

      <dl className="mt-4 space-y-2.5 border-t border-[var(--or-border)] pt-4">
        {rows.map((r) => (
          <div key={r.label} className="flex items-start justify-between gap-4">
            <dt className="flex items-center gap-2 text-sm text-[var(--or-slate)]">
              <r.icon className="h-3.5 w-3.5 text-[var(--or-slate-dim)]" aria-hidden />
              {r.label}
            </dt>
            <dd className="or-num max-w-[55%] text-right text-sm font-semibold text-[var(--or-ink)]">
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
    </motion.aside>
  );
}

/** Section 3 — illustrative room/home/studio map with clickable items. */
export function AssetMap() {
  const [selected, setSelected] = useState<AssetItem | null>(ASSET_ITEMS[0]);

  return (
    <OruvoSection
      id="asset-map"
      eyebrow="Spatial asset map"
      headline="See what you own — and exactly where it lives."
      intro="Turn a pile of receipts into a visual, valued inventory. Place belongings across your space, then open any item for its warranty, resale window, and the goal it’s linked to."
    >
      <div className="mt-8">
        <OruvoHint>{HINTS.assetMap}</OruvoHint>
      </div>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        {/* Room grid */}
        <div className="or-card rounded-[var(--or-radius-xl)] p-4 sm:p-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ASSET_ZONES.map((zone) => {
              const items = ASSET_ITEMS.filter((it) => it.zone === zone);
              return (
                <div
                  key={zone}
                  className="flex min-h-[7.5rem] flex-col rounded-[var(--or-radius-md)] border border-dashed border-[var(--or-border-strong)] bg-[rgba(22,26,32,0.015)] p-3"
                >
                  <span className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[var(--or-slate-dim)]">
                    {zone}
                  </span>
                  <div className="flex flex-wrap content-start gap-2">
                    {items.length === 0 && (
                      <span className="text-[0.7rem] italic text-[var(--or-slate-dim)]">Empty</span>
                    )}
                    {items.map((it) => {
                      const Icon = it.icon;
                      const isActive = selected?.id === it.id;
                      return (
                        <button
                          key={it.id}
                          type="button"
                          onClick={() => setSelected(it)}
                          aria-pressed={isActive}
                          className={orCn(
                            'group inline-flex items-center gap-1.5 rounded-[var(--or-radius-pill)] px-2.5 py-1.5 text-xs font-medium transition-all',
                            isActive
                              ? 'bg-[var(--or-gold)] text-white shadow-[var(--or-glow-gold)]'
                              : 'or-glass text-[var(--or-ink)] hover:-translate-y-0.5 hover:border-[var(--or-border-strong)]',
                          )}
                        >
                          <Icon className="h-3.5 w-3.5" aria-hidden />
                          {it.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-[var(--or-slate-dim)]">
            {DEMO_NOTE}
          </p>
        </div>

        {/* Detail — keyed per item so it remounts (and replays the fade) on
            select; plain conditional, no AnimatePresence, so close is instant. */}
        <div className="lg:sticky lg:top-28">
          {selected ? (
            <AssetDetailPanel
              key={selected.id}
              item={selected}
              onClose={() => setSelected(null)}
            />
          ) : (
            <div className="or-glass flex min-h-[14rem] items-center justify-center rounded-[var(--or-radius-lg)] p-6 text-center text-sm text-[var(--or-slate-dim)]">
              Select an item from your space to see its details.
            </div>
          )}
        </div>
      </div>
    </OruvoSection>
  );
}
