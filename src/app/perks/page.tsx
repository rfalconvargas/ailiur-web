import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Resources",
  "title": "Perks",
  "description": "Member perks across the Ailiur ecosystem \u2014 discounts, early hardware access, and partner benefits."
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
