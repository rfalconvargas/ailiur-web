import type { ReactNode } from 'react';
import './theme.css';
import { orCn } from './utils';

type OruvoShellProps = {
  children: ReactNode;
  className?: string;
  /** Skip top padding when a custom hero handles the nav offset. */
  noNavOffset?: boolean;
};

/**
 * Root themed canvas for the Oruvo microsite. Scopes all sub-brand tokens
 * under `.oruvo` so the global Ailiur yellow/glass pages stay untouched.
 */
export function OruvoShell({ children, className, noNavOffset }: OruvoShellProps) {
  return (
    <div
      className={orCn(
        'oruvo relative isolate min-h-screen w-full overflow-x-hidden',
        !noNavOffset && 'pt-24 sm:pt-28',
        className,
      )}
    >
      <main>{children}</main>
    </div>
  );
}
