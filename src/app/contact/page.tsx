import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Connect",
  "title": "Contact us",
  "description": "Questions, partnerships, or press? Reach the team directly.",
  "cta": {
    "label": "Email hello@ailiur.com",
    "href": "mailto:hello@ailiur.com"
  },
  "note": "Prefer DMs? Find us on X, YouTube, and Reddit."
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
