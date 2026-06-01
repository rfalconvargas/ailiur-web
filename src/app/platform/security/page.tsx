import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Platform",
  "title": "Security & Sovereignty",
  "description": "Local-first and deterministic by design. Your data lives on your device and never leaves unless you explicitly send it \u2014 no bloated cloud, no subscription lock-in, no API bill shock.",
  "bullets": [
    "On-device, local-first storage",
    "Deterministic execution with local circuit breakers",
    "You own your data \u2014 period"
  ]
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
