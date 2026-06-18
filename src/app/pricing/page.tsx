import type { Metadata } from 'next';
import { FounderAccess } from '@/components/ui/founder-access';
import { Pricing } from '@/components/ui/pricing';

export const metadata: Metadata = {
  title: 'Pricing — Ailiur',
  description: 'Reserve Ailiur Founder Access and explore the Core, Mesh, and Operator plans plus Enterprise for the Ailiur ecosystem.',
};

export default function PricingPage() {
  return (
    <main className="relative pt-20">
      <FounderAccess />
      <Pricing />
    </main>
  );
}
