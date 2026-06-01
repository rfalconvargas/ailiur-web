import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Resources",
  "title": "Tools",
  "description": "Free utilities and calculators built on the Unified Context Mesh."
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
