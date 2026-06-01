import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Solutions",
  "title": "Students & Teachers",
  "description": "Enchiridion Institution turns passive curriculum delivery into dynamic, data-driven cognitive acquisition. Instructors map curriculums into active knowledge graphs and see exactly which concepts need refinement.",
  "bullets": [
    "Map curriculums into active knowledge graphs",
    "Aggregate analytics on comprehension bottlenecks",
    "Quantify the ROI of upskilling"
  ]
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
