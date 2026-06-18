import { ArrowRight } from 'lucide-react';
import { PRODUCT_FEEDBACK_URL } from '@/lib/site';
import { AptellumBadge } from './badge';
import { AptellumButton } from './button';
import { AptellumCard } from './card';
import { AptellumScrollReveal } from './scroll-reveal';
import { AptellumSection } from './section';

/**
 * Centered feedback CTA — invites early users to send honest feedback via the
 * shared Ailiur product feedback form. Mirrors the cross-product pattern,
 * re-themed to Aptellum's light editorial tokens.
 */
export function AptellumFeedback() {
  return (
    <AptellumSection id="feedback" density="subdued" centered width="narrow" divider className="scroll-mt-36">
      <AptellumScrollReveal>
        <AptellumCard variant="editorial" padding="lg" className="mx-auto max-w-2xl text-center">
          <AptellumBadge variant="gold" className="mb-5">
            Feedback
          </AptellumBadge>
          <h2 className="font-display text-[var(--ap-text-h1)] font-extrabold leading-[1.08] tracking-tight text-[var(--ap-ink)]">
            Give us your honest feedback.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[length:var(--ap-text-body)] leading-relaxed text-[var(--ap-graphite)]">
            Aptellum is early, and it&apos;s shaped by the people who use it. Tell us what&apos;s
            working, what&apos;s missing, and what we should build next — it goes straight to the team.
          </p>
          <div className="mt-8 flex justify-center">
            <AptellumButton
              href={PRODUCT_FEEDBACK_URL}
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Ailiur Feedback Form
            </AptellumButton>
          </div>
        </AptellumCard>
      </AptellumScrollReveal>
    </AptellumSection>
  );
}
