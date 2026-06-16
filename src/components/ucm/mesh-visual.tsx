import { UCM_SIGNAL } from './utils';

const SOURCES = [
  { label: 'ChatGPT', signal: 'chatgpt' as const, lines: 1284 },
  { label: 'Claude', signal: 'claude' as const, lines: 2061 },
  { label: 'Gemini', signal: 'gemini' as const, lines: 947 },
];

const PACKET_TAGS = ['Goals', 'Stack', 'Taste', 'Decisions'];

/**
 * Static hero visual — the three AI sources on the left, converging through the
 * mesh into a single unified context packet on the right. Decorative; the live
 * Context Packet Builder ships into the demo section in a later step.
 */
export function MeshVisual() {
  return (
    <div
      className="ucm-glass-strong rounded-[var(--ucm-radius-xl)] border border-[var(--ucm-border-strong)] p-5 sm:p-7"
      aria-hidden
    >
      {/* Panel header */}
      <div className="flex items-center justify-between">
        <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-[var(--ucm-sand-dim)]">
          Context mesh
        </span>
        <span className="flex items-center gap-1.5 rounded-[var(--ucm-radius-pill)] border border-[var(--ucm-border)] bg-[var(--ucm-surface-muted)] px-2.5 py-1 text-[0.625rem] font-medium text-[var(--ucm-gold)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--ucm-gold)]" />
          Indexed
        </span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
        {/* Sources */}
        <ul className="space-y-2.5" role="list">
          {SOURCES.map((s) => (
            <li
              key={s.label}
              className="flex items-center gap-3 rounded-[var(--ucm-radius-md)] border border-[var(--ucm-hairline)] bg-[var(--ucm-surface-muted)] px-3 py-2.5"
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: UCM_SIGNAL[s.signal] }}
              />
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-[0.8125rem] font-semibold text-[var(--ucm-cream)]">
                  {s.label}
                </span>
                <span className="text-[0.6875rem] text-[var(--ucm-sand-dim)]">
                  {s.lines.toLocaleString()} entries
                </span>
              </span>
            </li>
          ))}
        </ul>

        {/* Converging shimmer rail */}
        <div className="hidden h-full items-center justify-center sm:flex">
          <div className="relative h-24 w-px overflow-hidden bg-[var(--ucm-border)]">
            <span className="ucm-shimmer absolute inset-x-[-3px] inset-y-0" />
          </div>
        </div>

        {/* Unified packet */}
        <div className="rounded-[var(--ucm-radius-md)] border border-[color-mix(in_srgb,var(--ucm-gold)_35%,var(--ucm-border))] bg-[color-mix(in_srgb,var(--ucm-gold)_8%,var(--ucm-surface-muted))] p-4">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--ucm-gold)]">
            Context packet
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5" role="list">
            {PACKET_TAGS.map((tag) => (
              <li
                key={tag}
                className="rounded-[var(--ucm-radius-pill)] border border-[var(--ucm-border)] bg-[var(--ucm-surface)] px-2.5 py-1 text-[0.6875rem] font-medium text-[var(--ucm-cream-soft)]"
              >
                {tag}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[0.75rem] leading-relaxed text-[var(--ucm-sand)]">
            Retrieved and ready for any Ailiur app — no re-explaining.
          </p>
        </div>
      </div>
    </div>
  );
}
