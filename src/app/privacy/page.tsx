import { LegalPage, makeLegalMetadata, type LegalContent } from '@/components/ui/legal-page';

const content: LegalContent = {
  title: 'Privacy Policy',
  description: 'How Ailiur handles your information during early development.',
  updated: 'June 2026',
  intro:
    'This plain-language summary explains what information Ailiur collects and how it is used while the product is in early development. We aim to collect only what we need and to be transparent about it.',
  sections: [
    {
      heading: 'Information we collect',
      body: [
        'When you reserve Founder Access, our payment processor (Stripe) collects the billing details needed to process your subscription. We receive limited information from Stripe such as your email, the plan you selected, and your subscription status — not your full card details.',
        'If you complete the optional onboarding survey, we store the answers you choose to provide so we can prioritize the early-access experience.',
      ],
    },
    {
      heading: 'How we use it',
      body: [
        'We use this information to provide and improve Founder Access, to contact you about early-access updates if you’ve allowed it, and to understand what to build first. We do not sell your personal information.',
      ],
    },
    {
      heading: 'Payment data',
      body: [
        'Card and payment details are handled by Stripe under their own security and privacy practices. Ailiur never stores raw card numbers.',
      ],
    },
    {
      heading: 'Your choices',
      body: [
        'You can manage or cancel your subscription through Stripe’s billing portal at any time. To request access to or deletion of the information we hold about you, contact us using the email below.',
      ],
    },
    {
      heading: 'Changes to this policy',
      body: [
        'We may update this policy as Ailiur develops. Material changes will be reflected here with an updated date.',
      ],
    },
  ],
};

export const metadata = makeLegalMetadata(content);

export default function PrivacyPage() {
  return <LegalPage {...content} />;
}
