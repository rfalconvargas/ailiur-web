import { SmartLink } from '@/components/ui/smart-link';
import { DM_FOOTER } from '@/lib/daymesh/content';

export function DaymeshFooter() {
  return (
    <footer className="mx-auto w-full max-w-[var(--dm-content-max)] px-4 pb-12 pt-4 sm:px-6">
      <div className="dm-glass rounded-[var(--dm-radius-xl)] p-7 sm:p-10">
        <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="h-5 w-5 rounded-[7px] bg-[linear-gradient(135deg,var(--dm-amber-soft),var(--dm-amber-deep))]"
              />
              <span className="font-display text-lg font-extrabold tracking-tight text-[var(--dm-ink)]">
                Daymesh
              </span>
              <span className="text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[var(--dm-muted)]">
                by Ailiur
              </span>
            </div>
            <p className="mt-3 max-w-xs text-[length:var(--dm-text-small)] leading-relaxed text-[var(--dm-muted)]">
              {DM_FOOTER.tagline}
            </p>
          </div>

          {/* Link columns */}
          {DM_FOOTER.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--dm-ink-soft)]">
                {col.title}
              </h4>
              <ul className="mt-3 space-y-2" role="list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <SmartLink
                      href={link.href}
                      className="text-[0.9rem] text-[var(--dm-muted)] transition-colors hover:text-[var(--dm-ink)]"
                    >
                      {link.label}
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-9 border-t border-[var(--dm-hairline)] pt-5">
          <p className="text-[0.72rem] leading-relaxed text-[var(--dm-faint)]">{DM_FOOTER.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
