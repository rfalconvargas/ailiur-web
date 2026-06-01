import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Connect",
  "title": "Partnerships",
  "description": "Plug into the Ailiur intelligence engine. Enterprise partners \u2014 clinics, universities, wealth firms, and media networks \u2014 can deploy services and access cross-pollinated insights with explicit user consent.",
  "cta": {
    "label": "Contact the team",
    "href": "/contact"
  }
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
