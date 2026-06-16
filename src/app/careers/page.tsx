import type { Metadata } from 'next';
import { Careers } from '@/components/ui/careers';

export const metadata: Metadata = {
  title: 'Careers — Ailiur',
  description:
    'Help build the operating system for human flourishing. Ailiur is hiring a technical cofounder / founding software engineer, and building a talent network for future roles.',
};

export default function CareersPage() {
  return (
    <main className="relative">
      <Careers />
    </main>
  );
}
