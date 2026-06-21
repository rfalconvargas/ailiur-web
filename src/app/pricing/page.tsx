import type { Metadata } from 'next';
import { Pricing } from '@/components/ui/pricing';

export const metadata: Metadata = {
  title: 'Pricing — Ailiur',
  description: 'Explore the Core, Mesh, and Operator plans plus Enterprise for the Ailiur ecosystem.',
};

export default function PricingPage() {
  return (
    <main className="relative pt-20">
      <Pricing />
    </main>
  );
}
