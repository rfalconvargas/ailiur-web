import type { ReactNode } from 'react';
import { AptellumScrollReveal } from './scroll-reveal';

type AptellumToolsStudioProps = {
  briefGenerator: ReactNode;
  portfolioScore: ReactNode;
  outreachStudio: ReactNode;
};

/**
 * Groups interactive studio tools under one visual system.
 */
export function AptellumToolsStudio({
  briefGenerator,
  portfolioScore,
  outreachStudio,
}: AptellumToolsStudioProps) {
  const tools = [
    { id: 'prototype', node: briefGenerator },
    { id: 'readiness', node: portfolioScore },
    { id: 'outreach', node: outreachStudio },
  ] as const;

  return (
    <div className="space-y-16 sm:space-y-20">
      {tools.map(({ id, node }, i) => (
        <AptellumScrollReveal key={id} delay={i * 0.03}>
          <div id={id} className="scroll-mt-36">
            {i > 0 && (
              <div
                className="mb-16 border-t border-[var(--ap-border)] sm:mb-20"
                aria-hidden
              />
            )}
            {node}
          </div>
        </AptellumScrollReveal>
      ))}
    </div>
  );
}
