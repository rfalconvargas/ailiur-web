import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Resources",
  "title": "Scientific Media",
  "description": "The Enchiridion YouTube Network \u2014 a powerhouse educational channel driven by rigorous, scientifically accurate documentaries.",
  "bullets": [
    "127K+ subscribers and 38M+ views",
    "Month-long scientific research pipeline",
    "Scientifically accurate paleontology & deep-time content"
  ]
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
