import { ShieldCheck, Lock, Download, Scale } from 'lucide-react';
import { OruvoSection } from './section';
import { TRUST } from '@/lib/oruvo/content';

const BADGE_ICONS = [ShieldCheck, Lock, Download, Scale];

/** Section 8 — privacy / trust / compliance (the required `TrustStrip`). */
export function TrustStrip() {
  return (
    <OruvoSection id="trust" eyebrow="Trust & transparency" headline={TRUST.headline}>
      <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        <ul className="space-y-3" role="list">
          {TRUST.lines.map((line) => (
            <li
              key={line}
              className="or-card flex items-start gap-3 rounded-[var(--or-radius-lg)] p-4 text-sm text-[var(--or-ink)]"
            >
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[var(--or-green)]" aria-hidden />
              {line}
            </li>
          ))}
        </ul>

        <div className="or-glass-strong flex flex-col gap-5 rounded-[var(--or-radius-xl)] p-6">
          <div className="grid grid-cols-2 gap-3">
            {TRUST.badges.map((badge, i) => {
              const Icon = BADGE_ICONS[i % BADGE_ICONS.length];
              return (
                <div
                  key={badge}
                  className="flex items-center gap-2 rounded-[var(--or-radius-md)] bg-[rgba(22,26,32,0.03)] px-3 py-2.5"
                >
                  <Icon className="h-4 w-4 shrink-0 text-[var(--or-gold-deep)]" aria-hidden />
                  <span className="text-xs font-semibold text-[var(--or-ink)]">{badge}</span>
                </div>
              );
            })}
          </div>
          <p className="border-t border-[var(--or-border)] pt-4 text-xs leading-relaxed text-[var(--or-slate)]">
            {TRUST.futureNote}
          </p>
        </div>
      </div>
    </OruvoSection>
  );
}
