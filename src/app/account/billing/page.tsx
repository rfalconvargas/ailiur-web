import type { Metadata } from 'next';
import { auth } from '@/auth';
import { SUPPORT_EMAIL } from '@/lib/site';
import { ManageBillingButton } from '@/components/account/manage-billing-button';
import { Card, PageHeader, Row } from '@/components/account/primitives';

export const metadata: Metadata = {
  title: 'Billing — Ailiur Account Center',
  robots: { index: false },
};

// Reads the session, so render at request time.
export const dynamic = 'force-dynamic';

/**
 * Billing lives inside the Account Center. (Originally the standalone /account
 * page; relocated here so /account can be the Account Center home.) The Stripe
 * Founder Access portal flow is preserved via ManageBillingButton.
 */
export default async function BillingPage() {
  const session = await auth();
  const user = session?.user ?? null;

  return (
    <>
      <PageHeader
        eyebrow="Billing"
        title="Billing & Founder Access"
        description="Ailiur is in early development. Founder Access reserves your plan and gives priority access as apps become available. Billing is handled securely by Stripe."
      />

      <Card title="Your plan">
        <div className="px-1">
          <Row label="Signed in as" value={user?.email ?? 'your account'} />
          <Row label="Billing provider" value="Stripe (secure portal)" />
        </div>
        <div className="mt-5">
          <ManageBillingButton />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-foreground/60">
          Open the secure Stripe portal to update your payment method, view invoices, or cancel.
          Questions about your reservation? Email{' '}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="font-semibold text-foreground underline-offset-2 hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </Card>
    </>
  );
}
