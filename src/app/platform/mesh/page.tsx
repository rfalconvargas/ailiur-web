import { PlaceholderPage, makeMetadata, type PlaceholderContent } from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {
  "eyebrow": "Platform",
  "title": "Unified Context Mesh",
  "description": "A lean, decentralized data layer that solves context fragmentation. It aggregates your AI exports, strips conversational noise, embeds text into an in-memory Local Vector Matrix, and retrieves the most relevant context with sub-millisecond cosine similarity.",
  "bullets": [
    "Async-first, zero-dependency ingestion",
    "In-memory Local Vector Matrix (NumPy)",
    "Sub-millisecond dot-product retrieval",
    "Cross-pollinates Ketofy, Enchiridion, Doblu & Moment"
  ]
};

export const metadata = makeMetadata(content);

export default function Page() {
  return <PlaceholderPage {...content} />;
}
