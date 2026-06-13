/**
 * Creative Co-op Tracks — editorial content for /aptellum#tracks.
 * Example targets are illustrative, not partnerships.
 */

export type CoopTrack = {
  id: string;
  title: string;
  description: string;
  /** Illustrative studios, museums, or practices — not partners. */
  exampleTargets: string[];
  exampleProject: string;
  skills: string[];
  artifact: string;
};

export const COOP_TRACKS_SECTION = {
  eyebrow: 'Creative co-op tracks',
  headline: 'Built for students who make things.',
  subhead:
    'Ten disciplines where portfolios, process, and taste are the credential. Each track scopes briefs toward example targets — inspired by real studios, never claimed as partnerships.',
  targetsDisclaimer: 'Example targets only — not affiliated partners.',
} as const;

export const COOP_TRACKS: CoopTrack[] = [
  {
    id: 'product-design',
    title: 'Product Design',
    description:
      'Design digital tools that clarify complex decisions and make everyday workflows feel calmer.',
    exampleTargets: ['Apple', 'Figma', 'Mercury', 'Notion', 'Adobe'],
    exampleProject:
      'Design an accessibility-first onboarding system for a creative productivity app.',
    skills: ['UX research', 'Interaction design', 'Prototyping', 'Design systems', 'Critique'],
    artifact: 'Portfolio case study + clickable prototype',
  },
  {
    id: 'industrial-design',
    title: 'Industrial Design',
    description:
      'Shape physical objects where form, material honesty, and manufacturing reality meet human need.',
    exampleTargets: ['IDEO', 'Nike', 'Teenage Engineering', 'Dyson', 'Herman Miller'],
    exampleProject:
      'Develop a compact consumer product concept with field research, form studies, and a production-aware spec.',
    skills: ['Form development', 'Materials research', 'Sketch communication', 'CAD', 'Design for production'],
    artifact: 'Process board + CAD model or foam prototype documentation',
  },
  {
    id: 'film-animation',
    title: 'Film / Animation',
    description:
      'Tell stories where pacing, authorship, and craft prove you can hold attention without spectacle alone.',
    exampleTargets: ['A24', 'Pixar', 'Studio Ghibli', 'Buck', 'Blink Industries'],
    exampleProject:
      'Create a 30-second title sequence or animated segment that establishes place, rhythm, and emotional tone.',
    skills: ['Storyboarding', 'Motion design', 'Edit & pacing', 'Sound-aware rhythm', 'Director\'s statement'],
    artifact: 'Animatic or final motion piece + process journal',
  },
  {
    id: 'illustration',
    title: 'Illustration',
    description:
      'Build a recognizable visual voice across editorial, character, and art-direction responses.',
    exampleTargets: ['The New York Times', 'Colossal', 'Penguin Random House', 'Apple', 'Hermès'],
    exampleProject:
      'Produce an editorial illustration series for a named publication brief — from pitch to final delivery.',
    skills: ['Visual narrative', 'Character development', 'Print & digital formats', 'Art direction response', 'Typography pairing'],
    artifact: 'Illustration series + pitch rationale',
  },
  {
    id: 'architecture',
    title: 'Architecture',
    description:
      'Show spatial thinking grounded in site, program, culture, and the public life of buildings.',
    exampleTargets: ['SOM', 'Studio Gang', 'Adjaye Associates', 'The Met', 'Heatherwick Studio'],
    exampleProject:
      'Propose a community cultural center with site analysis, parti development, and presentation boards.',
    skills: ['Site reading', 'Program development', 'Technical drawing', 'Model-making', 'Sustainability integration'],
    artifact: 'Drawing set + physical or digital model',
  },
  {
    id: 'game-design',
    title: 'Game Design',
    description:
      'Design experiences where mechanics, narrative, and feel converge — and the player\'s curiosity is the reward.',
    exampleTargets: ['Mobius Digital', 'Annapurna Interactive', 'Nintendo', 'thatgamecompany', 'Supergiant Games'],
    exampleProject:
      'Scope a short playable prototype that teaches one core mechanic through discovery, not tutorial text.',
    skills: ['Systems design', 'Level blocking', 'Playtesting', 'Narrative integration', 'Documentation'],
    artifact: 'Playable build or vertical slice + design doc',
  },
  {
    id: 'creative-technology',
    title: 'Creative Technology',
    description:
      'Where code, interaction, and culture meet — prototypes that prove you can ship ideas, not just slides.',
    exampleTargets: ['Google Creative Lab', 'Random International', 'Teamlab', 'MIT Media Lab', 'Rhizome'],
    exampleProject:
      'Build an interactive installation prototype with documented user flow, accessibility notes, and technical README.',
    skills: ['Creative coding', 'Interaction design', 'Physical computing', 'Technical documentation', 'User testing'],
    artifact: 'Working prototype + experience principles doc',
  },
  {
    id: 'museum-curatorial',
    title: 'Museum / Curatorial',
    description:
      'Demonstrate how you frame art for public encounter — research, interpretation, and spatial narrative.',
    exampleTargets: ['The Met', 'MoMA', 'Tate', 'SFMOMA', 'The Whitney'],
    exampleProject:
      'Design a six-room exhibition proposal with object list, wall texts, and audience development plan.',
    skills: ['Collection research', 'Interpretive writing', 'Exhibition concept', 'Spatial narrative', 'Public programming'],
    artifact: 'Exhibition brief + sample interpretive texts',
  },
  {
    id: 'brand-strategy',
    title: 'Brand / Strategy',
    description:
      'Connect visual systems to audience, positioning, and business context — strategy you can show, not just state.',
    exampleTargets: ['Pentagram', 'Collins', 'Instrument', 'Nike', 'Spotify'],
    exampleProject:
      'Develop a brand system for an early-stage product with audience research, positioning, and three applications.',
    skills: ['Audience research', 'Brand strategy', 'Visual identity', 'Cross-channel design', 'Written rationale'],
    artifact: 'Brand guidelines + applied touchpoints',
  },
  {
    id: 'writing-editorial',
    title: 'Writing / Editorial',
    description:
      'Make argument and voice visible in form — criticism, catalog copy, and long-form narrative with design intent.',
    exampleTargets: ['Colossal', 'The Atlantic', 'Artforum', 'Phaidon', 'Walker Art Center'],
    exampleProject:
      'Write and design a catalog essay or cultural criticism piece paired with layout for a museum exhibition brief.',
    skills: ['Critical writing', 'Editorial structure', 'Research', 'Layout collaboration', 'Voice development'],
    artifact: 'Long-form piece + designed spread samples',
  },
];

export const COOP_TRACK_IDS = COOP_TRACKS.map((t) => t.id);
