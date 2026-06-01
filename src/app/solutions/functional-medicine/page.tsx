import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Solutions",
  "title": "Functional Medicine",
  "description": "Grounded in the metabolic psychiatry frameworks of Dr. Georgia Ede and Dr. Chris Palmer, Ailiur translates scientific metabolic theory into reproducible, household-ready daily protocols."
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
