import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "About",
  "title": "Our Story",
  "description": "Ailiur is led by Raul Falcon, a RISD alumnus specializing in UX and product design for complex frontier technologies. We build with ruthless focus on velocity, a bias toward action, and deep personal integration of our own products.",
  "bullets": [
    "Action-oriented momentum over analysis paralysis",
    "Minimal-abstraction, deterministic engineering",
    "Local-first, sovereign by design"
  ]
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
