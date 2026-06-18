import { LegalPage, makeLegalMetadata, type LegalContent } from '@/components/ui/legal-page';

const content: LegalContent = {
  title: 'Terms of Service',
  description: 'Plain-language terms for Ailiur Founder Access during early development.',
  updated: 'June 2026',
  intro:
    'These terms describe, in plain language, what you can expect when you use the Ailiur website and reserve Founder Access. Ailiur is currently in early development, and these terms will be updated as the product matures.',
  sections: [
    {
      heading: 'What Ailiur is today',
      body: [
        'Ailiur is being built as an AI-first operating system for human flourishing — covering areas like goals, health, learning, focus, and life context. The full application is still in development. Some features described on the website may not yet be available.',
      ],
    },
    {
      heading: 'Founder Access',
      body: [
        'Founder Access is an early-access reservation. It reserves your selected plan and supports the development of the Ailiur App. It gives you priority access as Ailiur becomes available. It is not a guarantee of any specific feature, outcome, or launch date.',
      ],
    },
    {
      heading: 'Payments and subscriptions',
      body: [
        'Payments and subscriptions are processed securely by Stripe. By reserving a plan, you authorize the recurring charge shown at checkout until you cancel. You can manage or cancel your subscription at any time through Stripe’s billing portal.',
      ],
    },
    {
      heading: 'Acceptable use',
      body: [
        'Please use the website lawfully and don’t attempt to disrupt, reverse-engineer, or misuse it. We may update or suspend access where necessary to protect the service or other users.',
      ],
    },
    {
      heading: 'No guarantees',
      body: [
        'Ailiur is provided “as is” during early development. We do not make medical, financial, therapeutic, or guaranteed-outcome claims. Information on the site is for general purposes and is not professional advice.',
      ],
    },
    {
      heading: 'Changes to these terms',
      body: [
        'We may update these terms as the product evolves. Material changes will be reflected here with an updated date. Continued use after changes means you accept the updated terms.',
      ],
    },
  ],
};

export const metadata = makeLegalMetadata(content);

export default function TermsPage() {
  return <LegalPage {...content} />;
}
