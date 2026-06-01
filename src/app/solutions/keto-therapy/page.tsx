import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Solutions",
  "title": "Ketogenic Therapy",
  "description": "Ketofy Provider is a tele-health and patient-management portal for functional medicine practitioners, health coaches, and clinical research organizations \u2014 bridging the gap between clinical appointments and daily patient reality.",
  "bullets": [
    "Deploy custom metabolic & behavioral protocols",
    "Aggregate continuous physiological & adherence data",
    "Prove clinical efficacy at scale"
  ]
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
