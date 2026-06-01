import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Account",
  "title": "Create your account",
  "description": "Join Ailiur and unify your health, learning, and focus on the local-first Context Mesh.",
  "cta": {
    "label": "Launch Enchiridion",
    "href": "https://www.enchiridion.ailiur.com"
  },
  "note": "Authentication coming soon"
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
