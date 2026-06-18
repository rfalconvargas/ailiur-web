import type { Metadata } from 'next';
import { FounderOnboardingForm } from '@/components/onboarding/founder-onboarding-form';

export const metadata: Metadata = {
  title: 'Help shape your Ailiur experience — Ailiur',
  description:
    'Your answers help us prioritize the early-access experience as Ailiur is built.',
};

export default function FounderOnboardingPage() {
  return (
    <main className="relative px-4 pt-28 pb-24">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
          Founder onboarding
        </span>
        <h1 className="mt-3 font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.08] tracking-tight text-foreground">
          Help shape your Ailiur experience
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-foreground/65">
          Ailiur is being built as an AI-first operating system for human flourishing. Your answers
          help us prioritize the early-access experience.
        </p>
      </div>

      <FounderOnboardingForm />
    </main>
  );
}
