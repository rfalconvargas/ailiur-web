import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Connect",
  "title": "Careers",
  "description": "We operate an uncomfortably lean, builder-first team. Everyone ships. If you bias toward action and want absolute ownership over real outcomes, we want to talk.",
  "bullets": [
    "Builder-operators: everyone ships working code",
    "DRIs: one person, one metric, total ownership",
    "Remote, high-velocity, minimal middleware"
  ],
  "cta": {
    "label": "Get in touch",
    "href": "/contact"
  }
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
