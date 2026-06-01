import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Products",
  "title": "The Operating System for Life",
  "description": "Ailiur is an AI-first master layer for human optimization \u2014 an interconnected software and hardware ecosystem that treats specialized apps as modular blocks, fusing health, learning, finance, and media into one cross-pollinating intelligence engine.",
  "bullets": [
    "Ketofy \u2014 the AI health concierge",
    "Enchiridion \u2014 the AI learning engine",
    "Doblu \u2014 the AI wealth & productivity hub",
    "Moment \u2014 the AI media graph"
  ],
  "cta": {
    "label": "Launch Enchiridion",
    "href": "https://www.enchiridion.ailiur.com"
  }
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
