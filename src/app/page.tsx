import { Hero } from '@/components/ui/hero';
import { Features } from '@/components/ui/features';
import { SocialProof } from '@/components/ui/social-proof';
import { Pricing } from '@/components/ui/pricing';
import { Faq } from '@/components/ui/faq';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Features />
      <SocialProof />
      <Pricing />
      <Faq />
    </main>
  );
}
