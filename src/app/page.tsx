import { Hero } from '@/components/ui/hero';
import { Ecosystem } from '@/components/ui/ecosystem';
import { Features } from '@/components/ui/features';
import { SocialProof } from '@/components/ui/social-proof';
import { Pricing } from '@/components/ui/pricing';
import { Faq } from '@/components/ui/faq';
import { CORE_SLUGS } from '@/lib/ecosystem';
import { getAppBySlug } from '@/lib/account/app-registry';

const SITE = 'https://www.ailiur.com';

// Organization + WebSite + ItemList(8 core products) so search and AI crawlers
// understand Ailiur as one company with a coherent product ecosystem.
const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE}/#organization`,
      name: 'Ailiur',
      url: SITE,
      description:
        'Ailiur builds AI-first outcome engines for learning, health, creativity, personal intelligence, and work, connected by the Unified Context Mesh.',
      slogan: 'AI-first outcome engines for a better human life.',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      name: 'Ailiur',
      url: SITE,
      publisher: { '@id': `${SITE}/#organization` },
      inLanguage: 'en',
    },
    {
      '@type': 'ItemList',
      name: 'Ailiur products',
      itemListElement: CORE_SLUGS.map((slug, i) => {
        const app = getAppBySlug(slug);
        return {
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'SoftwareApplication',
            name: app?.name ?? slug,
            applicationCategory: 'ProductivityApplication',
            url: app?.url,
            description: app?.description,
            offers: { '@type': 'Offer', category: app?.status === 'coming_soon' ? 'ComingSoon' : 'Subscription' },
          },
        };
      }),
    },
  ],
};

export default function Home() {
  return (
    <main className="relative">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <Hero />
      {/* The organizing frame: 5 outcome domains + the Context Mesh. */}
      <Ecosystem />
      {/* Why the engines compound — the Context Mesh explainer. */}
      <Features />
      <SocialProof />
      {/* Primary conversion — pricing plans. */}
      <Pricing />
      <Faq />
    </main>
  );
}
