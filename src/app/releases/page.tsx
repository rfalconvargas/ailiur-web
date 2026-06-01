import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Resources",
  "title": "Product Releases",
  "description": "Changelogs and launch notes across Ketofy, Enchiridion, Doblu, Moment, and the Ailiur hardware frontier."
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
