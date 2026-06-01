import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Solutions",
  "title": "Human-Computer Interaction",
  "description": "Frontier HCI and generative, ephemeral interfaces that bend technology to natural human thought \u2014 context-aware widgets that materialize on demand and dissolve the moment the work is done."
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
