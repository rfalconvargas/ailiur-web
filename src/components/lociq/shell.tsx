import type { ReactNode } from 'react';
import './theme.css';
import { lqCn } from './utils';

type LociqShellProps = {
  children: ReactNode;
  className?: string;
  /** Skip top padding when a custom hero handles nav offset. */
  noNavOffset?: boolean;
};

/**
 * Root themed canvas for the Lociq microsite. Scopes all sub-brand tokens
 * under `.lociq` so the global Ailiur yellow/glass pages stay untouched.
 */
export function LociqShell({ children, className, noNavOffset }: LociqShellProps) {
  return (
    <div
      className={lqCn(
        'lociq relative isolate min-h-screen w-full overflow-x-hidden',
        !noNavOffset && 'pt-24 sm:pt-28',
        className,
      )}
    >
      <main>{children}</main>
    </div>
  );
}
