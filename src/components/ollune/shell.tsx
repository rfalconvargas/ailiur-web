import type { ReactNode } from 'react';
import './theme.css';
import { olCn } from './utils';

type OlluneShellProps = {
  children: ReactNode;
  className?: string;
  /** Skip top padding when a custom hero handles the nav offset. */
  noNavOffset?: boolean;
};

/**
 * Root themed canvas for the Ollune microsite. Scopes all sub-brand tokens
 * under `.ollune` so the global Ailiur yellow/glass pages stay untouched.
 */
export function OlluneShell({ children, className, noNavOffset }: OlluneShellProps) {
  return (
    <div
      className={olCn(
        'ollune relative isolate min-h-screen w-full overflow-x-hidden',
        !noNavOffset && 'pt-24 sm:pt-28',
        className,
      )}
    >
      <main>{children}</main>
    </div>
  );
}
