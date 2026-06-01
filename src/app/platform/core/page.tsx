import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Platform",
  "title": "Ailiur Core",
  "description": "The interconnected master layer. Ailiur Core binds specialized apps like modular blocks so the utility of the whole system compounds with every node added."
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
