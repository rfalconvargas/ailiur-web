import type { ReactNode } from 'react';
import './theme.css';
import { tmCn } from './utils';

type TellumetryShellProps = {
  children: ReactNode;
  className?: string;
  /** Skip top padding when a custom hero handles nav offset. */
  noNavOffset?: boolean;
};

/**
 * Root themed canvas for the Tellumetry microsite. Scopes all sub-brand tokens
 * under `.tellumetry` so the global Ailiur yellow/glass pages stay untouched.
 */
export function TellumetryShell({ children, className, noNavOffset }: TellumetryShellProps) {
  return (
    <div
      className={tmCn(
        'tellumetry relative isolate min-h-screen w-full overflow-x-hidden',
        !noNavOffset && 'pt-24 sm:pt-28',
        className,
      )}
    >
      <main>{children}</main>
    </div>
  );
}
