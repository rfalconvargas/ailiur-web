'use client';

import { useState } from 'react';
import { sampleMediaItems, MEDIA_BY_ID } from './data';
import { MediaFootprintMap } from './media-footprint-map';
import { ReflectionPanel } from './reflection-panel';

/**
 * Stateful shell that links the constellation map to the reflection panel.
 * Selecting a node — or a "connected influence" inside the panel — drives both.
 */
export function MediaExplorer() {
  const [activeId, setActiveId] = useState(sampleMediaItems[0].id);
  const active = MEDIA_BY_ID[activeId] ?? sampleMediaItems[0];

  return (
    <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
      <div>
        <MediaFootprintMap
          items={sampleMediaItems}
          activeId={activeId}
          onSelect={setActiveId}
        />
        <p className="mt-4 text-center text-xs text-foreground/45">
          Tap any node to follow a thread — each one holds a memory, not a rating.
        </p>
      </div>
      <ReflectionPanel item={active} byId={MEDIA_BY_ID} onSelectConnected={setActiveId} />
    </div>
  );
}
