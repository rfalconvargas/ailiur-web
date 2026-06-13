/**
 * AI Fluency architecture section — product-layer copy for /aptellum#fluency.
 */

export type FluencyPillarCard = {
  id: 'delegation' | 'description' | 'discernment' | 'diligence';
  title: string;
  question: string;
  productBehavior: string;
};

export type InteractionModeRow = {
  id: 'automation' | 'augmentation' | 'agency';
  title: string;
  body: string;
};

export const FLUENCY_ARCHITECTURE = {
  eyebrow: 'Product architecture',
  headline: 'A co-op system built on AI fluency.',
  subhead:
    'Aptellum does not ask students to outsource their careers to AI. It teaches them how to work with AI while keeping judgment, authorship, and responsibility.',
  pillars: [
    {
      id: 'delegation',
      title: 'Delegation',
      question: 'What should I do myself, and what can AI help me do faster?',
      productBehavior:
        'Aptellum separates student-owned work from AI-supported drafting, mapping, and iteration.',
    },
    {
      id: 'description',
      title: 'Description',
      question: 'How do I explain my goal clearly enough to get useful help?',
      productBehavior:
        'Aptellum turns vague ambition into structured project briefs, role constraints, deliverables, and review criteria.',
    },
    {
      id: 'discernment',
      title: 'Discernment',
      question: 'How do I know whether this suggestion is actually good?',
      productBehavior:
        'Aptellum teaches students to evaluate fit, accuracy, evidence, quality, and audience alignment.',
    },
    {
      id: 'diligence',
      title: 'Diligence',
      question: 'How do I use AI transparently and responsibly?',
      productBehavior:
        'Aptellum prompts students to disclose AI assistance, verify claims, protect privacy, and take ownership of the final work.',
    },
  ] satisfies FluencyPillarCard[],
  interactionModes: [
    {
      id: 'automation',
      title: 'Automation',
      body: 'Repetitive formatting, summaries, checklist generation.',
    },
    {
      id: 'augmentation',
      title: 'Augmentation',
      body: 'Project ideation, critique, outreach drafting.',
    },
    {
      id: 'agency',
      title: 'Agency',
      body: 'Future guided workflows that act on a student’s behalf with permission.',
    },
  ] satisfies InteractionModeRow[],
  diligenceLabel: 'Aptellum Diligence Statement',
  diligenceSample:
    'In creating this project, I used AI to assist with research organization, drafting, and critique. I reviewed, revised, and verified the final work, and I remain responsible for its accuracy, authorship, and presentation.',
} as const;
