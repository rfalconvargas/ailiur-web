import type { Metadata } from 'next';
import { Faq } from '@/components/ui/faq';

export const metadata: Metadata = {
  title: 'FAQs — Ailiur',
  description: 'Answers about Ailiur, the Unified Context Mesh, privacy, and the apps.',
};

export default function FaqsPage() {
  return (
    <main className="relative pt-20">
      <Faq />
    </main>
  );
}
