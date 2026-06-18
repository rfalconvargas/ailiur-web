import type { ReactNode } from 'react';
import './theme.css';
import { dmCn } from './utils';

type DaymeshShellProps = {
  children: ReactNode;
  className?: string;
  /** Skip top padding when a custom hero handles the nav offset. */
  noNavOffset?: boolean;
};

/**
 * Root themed canvas for the Daymesh microsite. Scopes all sub-brand tokens
 * under `.daymesh` so the global Ailiur yellow/glass pages stay untouched.
 */
export function DaymeshShell({ children, className, noNavOffset }: DaymeshShellProps) {
  return (
    <div
      className={dmCn(
        'daymesh relative isolate min-h-screen w-full overflow-x-hidden',
        !noNavOffset && 'pt-24 sm:pt-28',
        className,
      )}
    >
      <main>{children}</main>
    </div>
  );
}
