import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Solutions",
  "title": "Mobile-First Design",
  "description": "Intuitive, mobile-first human-computer interactions that translate multilayered technical systems into frictionless, beautiful experiences."
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
