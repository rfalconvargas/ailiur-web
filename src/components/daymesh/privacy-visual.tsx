import { Smartphone, Activity, Images, MapPin, Check, Cloud } from 'lucide-react';

const SOURCES = [
  { icon: Activity, label: 'Wearable data' },
  { icon: Images, label: 'Camera-roll context' },
  { icon: MapPin, label: 'Places & routines' },
];

/**
 * Calm, device-centric privacy diagram: everything lives on the phone;
 * the cloud sits outside the line and is off by default.
 */
export function DaymeshPrivacyVisual() {
  return (
    <div className="dm-glass-strong rounded-[var(--dm-radius-xl)] p-6 sm:p-7">
      {/* Device */}
      <div className="rounded-[var(--dm-radius-lg)] border border-[var(--dm-border-strong)] bg-[var(--dm-surface)] p-5 shadow-[var(--dm-shadow-sm)]">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[rgba(93,138,107,0.14)] text-[var(--dm-sage-deep)]">
            <Smartphone className="h-4 w-4" />
          </span>
          <span className="font-display text-base font-bold text-[var(--dm-ink)]">Your device</span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-[var(--dm-radius-pill)] bg-[rgba(93,138,107,0.14)] px-2.5 py-0.5 text-[0.68rem] font-semibold text-[var(--dm-sage-deep)]">
            <Check className="h-3 w-3" /> Analysis runs here
          </span>
        </div>
        <ul className="mt-4 grid gap-2" role="list">
          {SOURCES.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 rounded-[var(--dm-radius-sm)] border border-[var(--dm-hairline)] bg-[var(--dm-bg)] px-3 py-2.5"
            >
              <Icon className="h-4 w-4 text-[var(--dm-ink-soft)]" />
              <span className="flex-1 text-[0.85rem] font-medium text-[var(--dm-ink)]">{label}</span>
              {/* "On" toggle */}
              <span
                className="flex h-5 w-9 items-center rounded-full bg-[var(--dm-sage)] p-0.5"
                role="img"
                aria-label="On"
              >
                <span className="ml-auto h-4 w-4 rounded-full bg-white shadow-sm" />
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Connector */}
      <div className="flex flex-col items-center py-1" aria-hidden>
        <span className="h-5 w-px bg-[var(--dm-border-strong)]" />
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[var(--dm-faint)]">
          off by default
        </span>
        <span className="h-5 w-px bg-[var(--dm-border-strong)]" />
      </div>

      {/* Cloud — outside the line, off */}
      <div className="flex items-center gap-3 rounded-[var(--dm-radius-lg)] border border-dashed border-[var(--dm-border-strong)] bg-[var(--dm-bg-soft)] px-4 py-3">
        <Cloud className="h-4 w-4 text-[var(--dm-faint)]" />
        <span className="flex-1 text-[0.85rem] font-medium text-[var(--dm-muted)]">Cloud sync</span>
        {/* "Off" toggle */}
        <span
          className="flex h-5 w-9 items-center rounded-full bg-[var(--dm-border-strong)] p-0.5"
          role="img"
          aria-label="Off"
        >
          <span className="h-4 w-4 rounded-full bg-white shadow-sm" />
        </span>
      </div>

      <p className="mt-4 text-center text-[0.72rem] text-[var(--dm-faint)]">
        Nothing leaves your device unless you turn it on.
      </p>
    </div>
  );
}
