import { Hero } from '@/components/ui/hero';
import { Features } from '@/components/ui/features';
import { LaunchCta } from '@/components/ui/launch-cta';
import { SocialProof } from '@/components/ui/social-proof';
import { FounderAccess } from '@/components/ui/founder-access';
import { Pricing } from '@/components/ui/pricing';
import { Faq } from '@/components/ui/faq';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Features />
      {/* Single primary product CTA — opens the fullscreen Ailiur App. */}
      <LaunchCta />
      <SocialProof />
      <FounderAccess />
      <Pricing />
      <Faq />
    </main>
  );
}
