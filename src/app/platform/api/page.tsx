import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Platform",
  "title": "Ailiur Connect API",
  "description": "The enterprise master layer. With explicit user consent, institutional partners access cross-pollinated insights across health, learning, finance, and media \u2014 unprecedented alignment between services and human realities.",
  "bullets": [
    "Ketofy Provider \u2014 clinical & functional medicine",
    "Enchiridion Institution \u2014 universities & training",
    "Doblu Wealth \u2014 advisors & productivity",
    "Moment Publisher \u2014 streaming & publishing"
  ]
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
