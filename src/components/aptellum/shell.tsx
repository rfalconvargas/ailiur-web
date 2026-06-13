import type { ReactNode } from 'react';
import './theme.css';
import { apCn } from './utils';

type AptellumShellProps = {
  children: ReactNode;
  className?: string;
  /** Skip top padding when a custom hero handles nav offset. */
  noNavOffset?: boolean;
};

/**
 * Root themed canvas for the Aptellum microsite. Scopes all sub-brand tokens
 * under `.aptellum` so global Ailiur yellow/glass pages stay untouched.
 */
export function AptellumShell({ children, className, noNavOffset }: AptellumShellProps) {
  return (
    <div
      className={apCn(
        'aptellum relative isolate min-h-screen w-full overflow-x-hidden',
        !noNavOffset && 'pt-24 sm:pt-28',
        className,
      )}
    >
      <main>{children}</main>
    </div>
  );
}
