import type { ReactNode } from 'react';
import './theme.css';
import { tzCn } from './utils';

type TayztShellProps = {
  children: ReactNode;
  className?: string;
  /** Skip top padding when a custom hero handles nav offset. */
  noNavOffset?: boolean;
};

/**
 * Root themed canvas for the Tayzt microsite. Scopes all sub-brand tokens
 * under `.tayzt` so the global Ailiur yellow/glass pages stay untouched.
 */
export function TayztShell({ children, className, noNavOffset }: TayztShellProps) {
  return (
    <div
      className={tzCn(
        'tayzt relative isolate min-h-screen w-full overflow-x-hidden',
        !noNavOffset && 'pt-24 sm:pt-28',
        className,
      )}
    >
      <main>{children}</main>
    </div>
  );
}
