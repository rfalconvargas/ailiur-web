import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Products",
  "title": "Doblu",
  "description": "A financially literate, AI-first wealth management and workflow companion for the modern execution-oriented professional. Doblu integrates task management with financial ledger intelligence, calculating the direct ROI of your time, career growth, and asset distribution."
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
