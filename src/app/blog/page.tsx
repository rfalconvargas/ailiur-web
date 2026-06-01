import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Resources",
  "title": "Blog",
  "description": "Field notes on human optimization, local-first AI, metabolic health, and building the Ailiur ecosystem.",
  "note": "First posts coming soon"
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
