import { Search, Sparkles } from 'lucide-react';
import { ucmCn } from './utils';

const EXAMPLE_QUERIES = [
  'What did I decide about my auth stack?',
  'Summarize my health goals for Qetos.',
  'What’s my visual taste for a landing page?',
];

/**
 * Placeholder for the interactive Context Packet Builder.
 *
 * This renders a calm, on-brand empty state that *feels* like the real tool —
 * a query bar and example prompts — with a clear "coming soon" signal. The live
 * Context Packet Builder component is slotted in here in a later step; keep this
 * container's outer shape (id + glass panel) stable so the swap is clean.
 */
export function UcmDemoPlaceholder() {
  return (
    <div
      className="ucm-glass-strong relative overflow-hidden rounded-[var(--ucm-radius-xl)] border border-[var(--ucm-border-strong)] p-6 sm:p-10"
      data-ucm-slot="context-packet-builder"
    >
      {/* Top sheen rail hinting at the live pipeline */}
      <span className="ucm-shimmer absolute inset-x-0 top-0 h-px" aria-hidden />

      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-[var(--ucm-radius-pill)] border border-[color-mix(in_srgb,var(--ucm-gold)_35%,var(--ucm-border))] bg-[color-mix(in_srgb,var(--ucm-gold)_10%,transparent)] px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[var(--ucm-gold)]">
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Context Packet Builder — interactive demo arriving soon
        </span>

        {/* Mock query bar */}
        <div className="mt-7 flex items-center gap-3 rounded-[var(--ucm-radius-pill)] border border-[var(--ucm-border-strong)] bg-[var(--ucm-surface-muted)] px-4 py-3 text-left">
          <Search className="h-4 w-4 shrink-0 text-[var(--ucm-sand-dim)]" aria-hidden />
          <span className="truncate text-[0.9375rem] text-[var(--ucm-sand-dim)]">
            Ask your past work what your next app should know…
          </span>
        </div>

        {/* Example prompts */}
        <ul className="mt-5 flex flex-wrap justify-center gap-2" role="list">
          {EXAMPLE_QUERIES.map((q) => (
            <li
              key={q}
              className={ucmCn(
                'rounded-[var(--ucm-radius-pill)] border border-[var(--ucm-border)] bg-[var(--ucm-glass-bg)]',
                'px-3 py-1.5 text-[0.8125rem] text-[var(--ucm-cream-soft)]',
              )}
            >
              {q}
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-7 max-w-md text-[0.8125rem] leading-relaxed text-[var(--ucm-sand)]">
          The full builder will assemble a live context packet from mock ChatGPT, Claude, and Gemini
          exports — showing exactly what an Ailiur app would receive.
        </p>
      </div>
    </div>
  );
}
