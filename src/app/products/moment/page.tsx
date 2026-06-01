import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Products",
  "title": "Moment",
  "description": "An all-in-one media logging, indexing, and review service powered by contextual AI. Moment captures and evaluates your interaction with books, games, film, and digital media, feeding your subjective taste back into the ecosystem."
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
