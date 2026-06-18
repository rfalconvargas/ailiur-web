import { LegalPage, makeLegalMetadata, type LegalContent } from '@/components/ui/legal-page';

const content: LegalContent = {
  title: 'Refund Policy',
  description: 'How refunds and cancellations work for Ailiur Founder Access.',
  updated: 'June 2026',
  intro:
    'This plain-language summary explains how cancellations and refunds work for Founder Access while Ailiur is in early development.',
  sections: [
    {
      heading: 'Cancellations',
      body: [
        'You can cancel your Founder Access subscription at any time through Stripe’s billing portal. When you cancel, your plan stops renewing and you won’t be charged for future billing periods.',
      ],
    },
    {
      heading: 'Refunds',
      body: [
        'Because Founder Access supports active, early-stage development, charges are generally non-refundable except where required by law. If something went wrong — a duplicate charge, a billing error, or a charge you didn’t intend — contact us and we’ll review it in good faith.',
      ],
    },
    {
      heading: 'How to request help',
      body: [
        'Email us using the address below with the email you used at checkout and a short description of the issue. We’ll get back to you and help resolve it.',
      ],
    },
    {
      heading: 'Changes to this policy',
      body: [
        'We may refine this policy as Ailiur matures. Material changes will be reflected here with an updated date.',
      ],
    },
  ],
};

export const metadata = makeLegalMetadata(content);

export default function RefundPage() {
  return <LegalPage {...content} />;
}
