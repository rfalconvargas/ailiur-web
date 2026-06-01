import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Resources",
  "title": "3D Assets",
  "description": "The internet's premier database of scientifically accurate 3D prehistoric models, built alongside leading paleontologists."
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
