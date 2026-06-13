/**
 * Aptellum microsite content system.
 *
 * Single source of truth for copy on /aptellum. Import sections individually
 * or use APTELLUM_CONTENT for the full page bundle.
 *
 * Route: /aptellum
 * Future: aptellum.ailiur.com
 */

// ─── Shared types ───────────────────────────────────────────────────────────

export type NavItem = {
  label: string;
  href: string;
};

export type CtaLink = {
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subhead: string;
  thesis: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
};

export type ProblemContent = {
  eyebrow: string;
  headline: string;
  body: string;
  tensions: { title: string; body: string }[];
  closing: string;
};

export type LoopStep = {
  step: number;
  title: string;
  body: string;
  outcome: string;
};

export type AptellumLoopContent = {
  eyebrow: string;
  headline: string;
  subhead: string;
  steps: LoopStep[];
  closing: string;
};

export type ToolItem = {
  title: string;
  body: string;
};

export type AudienceToolsContent = {
  eyebrow: string;
  headline: string;
  subhead: string;
  items: ToolItem[];
};

export type FluencyPillar = {
  id: 'delegation' | 'description' | 'discernment' | 'diligence';
  title: string;
  question: string;
  body: string;
  practice: string;
};

export type AiFluencyContent = {
  eyebrow: string;
  headline: string;
  subhead: string;
  pillars: FluencyPillar[];
  closing: string;
};

export type CreativeTrack = {
  id: string;
  discipline: string;
  tagline: string;
  focusAreas: string[];
  sampleOutcome: string;
};

export type SampleBrief = {
  id: string;
  title: string;
  discipline: string;
  companyArchetype: string;
  duration: string;
  prompt: string;
  deliverables: string[];
  skillsDemonstrated: string[];
};

export type ComparisonCard = {
  id: string;
  category: string;
  conventional: { label: string; body: string };
  aptellum: { label: string; body: string };
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type CtaContent = {
  eyebrow: string;
  headline: string;
  body: string;
  primaryCta: CtaLink;
  secondaryCta: CtaLink;
  footnote: string;
};

export type AptellumMetadata = {
  title: string;
  description: string;
  tagline: string;
  thesis: string;
  route: string;
  futureDomain: string;
};

export type AptellumContent = {
  meta: AptellumMetadata;
  navItems: NavItem[];
  hero: HeroContent;
  problem: ProblemContent;
  aptellumLoop: AptellumLoopContent;
  studentTools: AudienceToolsContent;
  universityTools: AudienceToolsContent;
  employerTools: AudienceToolsContent;
  aiFluencyLayer: AiFluencyContent;
  exampleTracks: { eyebrow: string; headline: string; subhead: string; tracks: CreativeTrack[] };
  sampleBriefs: { eyebrow: string; headline: string; subhead: string; briefs: SampleBrief[] };
  comparisonCards: { eyebrow: string; headline: string; subhead: string; cards: ComparisonCard[] };
  faq: { eyebrow: string; headline: string; items: FaqItem[] };
  cta: CtaContent;
};

// ─── Metadata ───────────────────────────────────────────────────────────────

export const APTELLUM_META: AptellumMetadata = {
  title: 'Aptellum — The AI Co-op Studio for Creative Education',
  description:
    'Aptellum helps students turn career goals into guided projects, portfolio evidence, outreach materials, and internship pathways.',
  tagline: 'The AI Co-op Studio for Creative Education',
  thesis: 'Every student should graduate with proof that they can work.',
  route: '/aptellum',
  futureDomain: 'aptellum.ailiur.com',
};

// ─── 1. Nav (in-page anchors) ───────────────────────────────────────────────

export const navItems: NavItem[] = [
  { label: 'The gap', href: '#problem' },
  { label: 'The loop', href: '#loop' },
  { label: 'For students', href: '#students' },
  { label: 'For universities', href: '#universities' },
  { label: 'For employers', href: '#employers' },
  { label: 'AI fluency', href: '#fluency' },
  { label: 'Tracks', href: '#tracks' },
  { label: 'FAQ', href: '#faq' },
];

// ─── 2. Hero ─────────────────────────────────────────────────────────────────

export const hero: HeroContent = {
  eyebrow: 'Aptellum · the creative education layer of Ailiur',
  headline: 'Turn uncertainty into',
  headlineAccent: 'work you can show.',
  subhead:
    'Aptellum helps students turn career uncertainty into guided projects, portfolio evidence, and internship pathways — before the job search begins.',
  thesis: 'Every student should graduate with proof that they can work.',
  primaryCta: { label: 'Join the studio waitlist', href: '#waitlist' },
  secondaryCta: { label: 'See how the co-op works', href: '#loop' },
};

// ─── 3. Problem ──────────────────────────────────────────────────────────────

export const problem: ProblemContent = {
  eyebrow: 'The preparation gap',
  headline: 'Job boards assume you are already ready.',
  body:
    'Most career infrastructure starts at the application. It presumes a finished portfolio, credible references, and clarity about what kind of work you want. Creative students often arrive with talent and coursework — but without the structured evidence employers and programs actually evaluate.',
  tensions: [
    {
      title: 'Classroom work rarely reads as professional work',
      body:
        'Assignments demonstrate comprehension. They rarely show how you think under constraint, collaborate across disciplines, or ship something a studio would recognize as yours.',
    },
    {
      title: 'Internships are scarce and unevenly distributed',
      body:
        'Co-op models work — Northeastern and Drexel proved that integrated work experience changes outcomes. But access is limited, competitive, and often disconnected from what a student is actually studying.',
    },
    {
      title: 'Career advice outpaces career artifacts',
      body:
        'Students receive guidance about industries, roles, and networking long before they have projects that make those conversations concrete. Confidence without evidence is fragile.',
    },
    {
      title: 'Creative fields demand a particular kind of proof',
      body:
        'Design, film, animation, architecture, and visual culture are evaluated through process, taste, and judgment — not transcripts alone. Generic career tools were not built for that standard.',
    },
  ],
  closing:
    'Aptellum is not a job board. It is the preparation layer that comes first: a project-generation, portfolio-readiness, and internship-pathway system for students who make things.',
};

// ─── 4. Aptellum loop ────────────────────────────────────────────────────────

export const aptellumLoop: AptellumLoopContent = {
  eyebrow: 'The Aptellum loop',
  headline: 'From interest to evidence — in one continuous studio.',
  subhead:
    'Inspired by co-op education, project-based learning, and work simulations — Aptellum turns scattered ambition into a repeatable cycle of briefs, builds, and pathways.',
  steps: [
    {
      step: 1,
      title: 'Orient',
      body:
        'Name the companies, disciplines, and kinds of work that pull you. Aptellum maps your interests against real creative fields — not generic career categories.',
      outcome: 'A clear direction, not a vague major.',
    },
    {
      step: 2,
      title: 'Brief',
      body:
        'Receive studio-grade project briefs shaped like Riipen engagements and Forage simulations: real constraints, real deliverables, real stakes — scaled to where you are now.',
      outcome: 'Work that feels like work, not homework.',
    },
    {
      step: 3,
      title: 'Build',
      body:
        'Make the project with AI as a co-op partner, not a shortcut. The studio tracks process, iterations, and decisions — the material reviewers actually want to see.',
      outcome: 'Portfolio pieces with documented thinking.',
    },
    {
      step: 4,
      title: 'Review',
      body:
        'Get structured feedback on craft, relevance, and presentation. Learn to evaluate your own work with the discernment creative industries require.',
      outcome: 'Standards you can apply without a mentor in the room.',
    },
    {
      step: 5,
      title: 'Publish',
      body:
        'Package the project as portfolio evidence: case study, process documentation, outreach materials, and a narrative an employer or admissions reader can follow in minutes.',
      outcome: 'Proof, not promises.',
    },
    {
      step: 6,
      title: 'Pathway',
      body:
        'Translate completed work into next steps — micro-internship formats inspired by Parker Dewey, university partner introductions in the Handshake spirit, and targeted outreach you can send with confidence.',
      outcome: 'A line from the classroom to the door you want to open.',
    },
  ],
  closing:
    'The loop does not end at graduation. Each project compounds taste, judgment, and a body of work that makes the next opportunity easier to earn.',
};

// ─── 5. Student tools ────────────────────────────────────────────────────────

export const studentTools: AudienceToolsContent = {
  eyebrow: 'For students',
  headline: 'A studio that meets you where you are.',
  subhead:
    'Built for creative students — in design, film, animation, illustration, architecture, creative technology, writing, and visual culture — who need work they can stand behind.',
  items: [
    {
      title: 'Dream-company project generator',
      body:
        'Turn a studio, museum, agency, or practice you admire into a scoped brief with deliverables, timelines, and evaluation criteria — so you are practicing toward a world you actually want to enter.',
    },
    {
      title: 'Portfolio case-study builder',
      body:
        'Structure process, decisions, and final work into the narrative format creative directors and admissions committees read. Your craft deserves more than a grid of images.',
    },
    {
      title: 'Internship pathway planner',
      body:
        'Map projects to roles, seasons, and application windows. See what evidence you still need before you apply — and what you already have.',
    },
    {
      title: 'Outreach material studio',
      body:
        'Draft cover letters, introduction emails, and project summaries calibrated to the work you have made — not templates filled with empty adjectives.',
    },
    {
      title: 'Work simulations',
      body:
        'Experience the rhythm of a creative role before you hold the title: client constraints, revision cycles, cross-functional feedback, and delivery deadlines — in formats inspired by job simulations, adapted for makers.',
    },
    {
      title: 'Career confidence ledger',
      body:
        'Track completed briefs, skills demonstrated, and feedback received. Watch uncertainty shrink as your record of work grows.',
    },
  ],
};

// ─── 6. University tools ─────────────────────────────────────────────────────

export const universityTools: AudienceToolsContent = {
  eyebrow: 'For universities',
  headline: 'Integrate work experience into the curriculum — at scale.',
  subhead:
    'Aptellum gives programs a shared trust network connecting students, faculty, and employers — the preparation infrastructure co-op models proved necessary, without requiring a full institutional rebuild.',
  items: [
    {
      title: 'Curriculum-aligned project library',
      body:
        'Deploy briefs that extend studio courses, capstones, and portfolio seminars — aligned to learning outcomes faculty already teach, expressed in the language of professional practice.',
    },
    {
      title: 'Cohort visibility dashboard',
      body:
        'See which students have active projects, portfolio gaps, and pathway momentum. Intervene early, before the job search panic.',
    },
    {
      title: 'Employer partner network',
      body:
        'Introduce vetted creative employers to student work through structured micro-projects and review cycles — a Handshake-grade trust layer focused on preparation, not just posting.',
    },
    {
      title: 'AI fluency rubrics',
      body:
        'Embed Delegation, Description, Discernment, and Diligence into how students are assessed — so AI use is taught as professional judgment, not treated as misconduct by default.',
    },
    {
      title: 'Accreditation-ready evidence',
      body:
        'Export documentation of work-integrated learning: project logs, mentor feedback, and outcome mapping for program review and grant reporting.',
    },
    {
      title: 'Equitable access to co-op outcomes',
      body:
        'Extend the Northeastern/Drexel co-op advantage to students who cannot rely on personal networks or unpaid internships to open the first door.',
    },
  ],
};

// ─── 7. Employer tools ─────────────────────────────────────────────────────

export const employerTools: AudienceToolsContent = {
  eyebrow: 'For employers',
  headline: 'Evaluate early talent on what they made — not what they claimed.',
  subhead:
    'Short, structured creative projects let you assess judgment, communication, and craft before a full hire — the Parker Dewey insight, built for design-led and culture-driven teams.',
  items: [
    {
      title: 'Micro-project templates',
      body:
        'Publish brief, scoped engagements — a two-week research sprint, a concept deck, a brand audit, an animation test — that reveal how a candidate thinks under real constraints.',
    },
    {
      title: 'Portfolio review at submission',
      body:
        'Receive work already framed as a case study: context, process, decisions, deliverables. Spend less time decoding student PDFs.',
    },
    {
      title: 'University pipeline access',
      body:
        'Connect with programs whose students have completed Aptellum briefs in your field — a warmer introduction than a cold job posting.',
    },
    {
      title: 'Early talent signals',
      body:
        'See demonstrated skills, feedback history, and project completion — signals that predict fit better than a résumé line about "passion for design."',
    },
    {
      title: 'Ethical AI transparency',
      body:
        'Understand how candidates used AI in their process — disclosed, reasoned, and bounded — so you hire for judgment, not just output.',
    },
    {
      title: 'Lower-risk hiring experiments',
      body:
        'Test working relationships through paid or credited micro-engagements before committing to a full internship or entry role.',
    },
  ],
};

// ─── 8. AI fluency layer ─────────────────────────────────────────────────────

export const aiFluencyLayer: AiFluencyContent = {
  eyebrow: 'The AI fluency layer',
  headline: 'AI belongs in the studio — with standards.',
  subhead:
    'Creative education cannot pretend AI does not exist, and cannot surrender judgment to it. Aptellum embeds four practices into every project — so students graduate fluent in collaboration, not dependent on automation.',
  pillars: [
    {
      id: 'delegation',
      title: 'Delegation',
      question: 'What should you do — and what should AI help with?',
      body:
        'Strong creative work still requires your eye, your taste, and your decisions. Aptellum marks which parts of a project benefit from AI assistance — research synthesis, variation exploration, first-draft structure — and which parts must remain yours: concept, critique, final craft, authorship.',
      practice:
        'Every brief includes a delegation map: student-owned, AI-assisted, and off-limits zones.',
    },
    {
      id: 'description',
      title: 'Description',
      question: 'Can you articulate what you are making — and for whom?',
      body:
        'The difference between useful AI output and generic noise is the quality of the brief you write. Students learn to describe goals, context, style, audience, constraints, and deliverables with the precision a creative director would expect.',
      practice:
        'Project kickoffs require a written creative brief — reviewed before any AI-assisted production begins.',
    },
    {
      id: 'discernment',
      title: 'Discernment',
      question: 'Can you tell strong work from plausible work?',
      body:
        'AI generates convincing mediocrity at scale. Aptellum trains students to evaluate suggestions, career advice, portfolio layouts, and project directions against field-specific standards — and to reject what merely sounds correct.',
      practice:
        'Review sessions score AI-assisted outputs on relevance, originality, and fit — not just polish.',
    },
    {
      id: 'diligence',
      title: 'Diligence',
      question: 'Are you using AI ethically, transparently, and responsibly?',
      body:
        'Creative industries are setting expectations for disclosure, attribution, and client trust. Students document how AI participated in their process, cite sources, and understand where institutional and employer policies apply.',
      practice:
        'Every published case study includes an AI disclosure statement and process appendix.',
    },
  ],
  closing:
    'Fluency is not a module bolted on at the end. It is how Aptellum treats AI throughout — as a tool that sharpens judgment when bounded by clear creative intent.',
};

// ─── 9. Example tracks ───────────────────────────────────────────────────────

export const exampleTracks = {
  eyebrow: 'Creative tracks',
  headline: 'Built for students who make things.',
  subhead:
    'Aptellum is designed especially for creative disciplines — where portfolios, process, and taste are the credential.',
  tracks: [
    {
      id: 'industrial-design',
      discipline: 'Industrial Design',
      tagline: 'From sketch to object — with manufacturing reality in the loop.',
      focusAreas: ['Form development', 'Materials research', 'User testing', 'Design for production'],
      sampleOutcome: 'A compact consumer product concept with CAD iterations, foam models, and a manufacturer-ready spec sheet.',
    },
    {
      id: 'film-animation',
      discipline: 'Film & Animation',
      tagline: 'Tell stories that demonstrate craft, pacing, and authorship.',
      focusAreas: ['Pre-production', 'Storyboarding', 'Motion & edit', 'Sound design'],
      sampleOutcome: 'A 90-second animated short or documentary segment with shot list, animatic, and director\'s statement.',
    },
    {
      id: 'illustration',
      discipline: 'Illustration',
      tagline: 'Build a voice employers can recognize in three images.',
      focusAreas: ['Editorial narrative', 'Character development', 'Print & digital formats', 'Art direction response'],
      sampleOutcome: 'An editorial illustration series for a named publication brief — from pitch to final delivery.',
    },
    {
      id: 'architecture',
      discipline: 'Architecture',
      tagline: 'Show spatial thinking grounded in site, program, and culture.',
      focusAreas: ['Site analysis', 'Program development', 'Model & drawing sets', 'Sustainability integration'],
      sampleOutcome: 'A community cultural center proposal with site research, parti diagrams, and presentation boards.',
    },
    {
      id: 'creative-technology',
      discipline: 'Creative Technology',
      tagline: 'Where code, interaction, and culture meet.',
      focusAreas: ['Interactive prototypes', 'Physical computing', 'Experience design', 'Technical documentation'],
      sampleOutcome: 'An interactive installation prototype with user flow, build log, and documented stack.',
    },
    {
      id: 'product-design',
      discipline: 'Product Design',
      tagline: 'Ship digital work that shows systems thinking.',
      focusAreas: ['Discovery research', 'Information architecture', 'Interface design', 'Usability validation'],
      sampleOutcome: 'An end-to-end app redesign case study — problem framing, wireframes, UI system, and test results.',
    },
    {
      id: 'writing',
      discipline: 'Writing & Visual Culture',
      tagline: 'Make argument and voice visible in form.',
      focusAreas: ['Critical writing', 'Exhibition texts', 'Long-form narrative', 'Editorial structure'],
      sampleOutcome: 'A catalog essay or cultural criticism piece paired with layout design for a museum exhibition brief.',
    },
    {
      id: 'curatorial',
      discipline: 'Museum & Curatorial Practice',
      tagline: 'Demonstrate how you frame art for public encounter.',
      focusAreas: ['Collection research', 'Exhibition concept', 'Interpretive strategy', 'Public programming'],
      sampleOutcome: 'A six-room exhibition proposal with object list, wall texts, and audience development plan.',
    },
  ] satisfies CreativeTrack[],
};

// ─── 10. Sample briefs ───────────────────────────────────────────────────────

export const sampleBriefs = {
  eyebrow: 'Sample briefs',
  headline: 'Work that reads like the field you are entering.',
  subhead:
    'Every Aptellum brief is scoped, timed, and deliverable-specific — modeled on the project formats students encounter in co-ops, Riipen partnerships, and studio internships.',
  briefs: [
    {
      id: 'wayfinding-audit',
      title: 'Transit Wayfinding Audit',
      discipline: 'Industrial Design',
      companyArchetype: 'Urban mobility studio',
      duration: '3 weeks',
      prompt:
        'A regional transit authority is updating station signage. Conduct a wayfinding audit at two stations, document pain points with photography and annotated diagrams, and propose a revised signage hierarchy for one interchange.',
      deliverables: [
        'Site documentation report with annotated photography',
        'Current-state journey map for a first-time rider',
        'Revised signage system proposal with typographic rationale',
        '10-minute presentation deck for agency stakeholders',
      ],
      skillsDemonstrated: ['Field research', 'Systems thinking', 'Visual communication', 'Stakeholder presentation'],
    },
    {
      id: 'title-sequence',
      title: 'Documentary Title Sequence',
      discipline: 'Film & Animation',
      companyArchetype: 'Independent documentary production',
      duration: '2 weeks',
      prompt:
        'A documentary about artisan food production needs an opening title sequence that establishes place, craft, and pace. Develop concept boards, a 30-second animatic, and a final motion piece using supplied footage and original typography.',
      deliverables: [
        'Mood board and motion reference study',
        'Storyboard and animatic with temp sound',
        'Final 30-second title sequence (1080p)',
        'Process journal documenting edit decisions',
      ],
      skillsDemonstrated: ['Motion design', 'Typographic sensibility', 'Pacing & rhythm', 'Collaborative feedback cycles'],
    },
    {
      id: 'exhibition-identity',
      title: 'Exhibition Identity System',
      discipline: 'Illustration',
      companyArchetype: 'Contemporary art museum',
      duration: '4 weeks',
      prompt:
        'A museum is mounting a group show on craft in the digital age. Design an exhibition identity — mark, typography, color, and three key applications — that holds across print, environmental graphics, and social assets.',
      deliverables: [
        'Identity concept presentation (3 directions)',
        'Final identity system with usage guidelines',
        'Applied mockups: poster, wall vinyl, invitation',
        'Written rationale connecting visual language to curatorial theme',
      ],
      skillsDemonstrated: ['Visual identity', 'Art direction', 'Application design', 'Written critical reasoning'],
    },
    {
      id: 'community-pavilion',
      title: 'Community Pavilion Concept',
      discipline: 'Architecture',
      companyArchetype: 'Civic architecture practice',
      duration: '5 weeks',
      prompt:
        'A waterfront neighborhood association needs a seasonal pavilion for markets, performances, and gathering. Respond to a specific site with climate analysis, program requirements, and a design that reflects local material culture.',
      deliverables: [
        'Site analysis boards (climate, circulation, context)',
        'Program diagram and spatial concept',
        'Plan, section, elevation drawing set',
        'Physical or digital model with scale figures',
      ],
      skillsDemonstrated: ['Site reading', 'Spatial design', 'Technical drawing', 'Cultural contextualization'],
    },
    {
      id: 'interactive-archive',
      title: 'Interactive Oral History Archive',
      discipline: 'Creative Technology',
      companyArchetype: 'Cultural heritage nonprofit',
      duration: '4 weeks',
      prompt:
        'A nonprofit preserving neighborhood oral histories needs a web-based listening experience — not a database. Prototype an interface that lets visitors explore stories by place, theme, and voice, with attention to accessibility.',
      deliverables: [
        'Research summary and experience principles',
        'Low- and high-fidelity interactive prototype',
        'Accessibility audit against WCAG 2.1 AA',
        'Technical README documenting architecture and AI assistance',
      ],
      skillsDemonstrated: ['Interaction design', 'Prototyping', 'Accessibility', 'Technical documentation'],
    },
    {
      id: 'brand-system',
      title: 'Early-Stage Brand System',
      discipline: 'Product Design',
      companyArchetype: 'Design-led consumer startup',
      duration: '3 weeks',
      prompt:
        'A startup launching a sustainable home-goods line has a product but no coherent brand. Develop a brand system and apply it across packaging, a landing page, and one social campaign — with rationale tied to audience research.',
      deliverables: [
        'Audience research synthesis (8–12 interviews or equivalent)',
        'Brand strategy one-pager: positioning, voice, visual direction',
        'Applied system across three touchpoints',
        'Case study documenting iteration from feedback',
      ],
      skillsDemonstrated: ['User research', 'Brand strategy', 'Cross-channel design', 'Iterative refinement'],
    },
  ] satisfies SampleBrief[],
};

// ─── 11. Comparison cards ────────────────────────────────────────────────────

export const comparisonCards = {
  eyebrow: 'What Aptellum is — and is not',
  headline: 'The preparation layer job boards skip.',
  subhead:
    'Aptellum sits upstream of applications, interviews, and postings. It helps students arrive with work worth evaluating.',
  cards: [
    {
      id: 'vs-job-boards',
      category: 'Job boards',
      conventional: {
        label: 'List openings. Filter résumés.',
        body:
          'Handshake, LinkedIn, and similar platforms connect applicants to opportunities — assuming the student already has portfolio evidence, clarity, and credibility.',
      },
      aptellum: {
        label: 'Generate the work that makes applications credible.',
        body:
          'Aptellum builds the projects, case studies, and outreach materials students need before they ever click Apply.',
      },
    },
    {
      id: 'vs-coursework',
      category: 'Coursework alone',
      conventional: {
        label: 'Prove you completed the curriculum.',
        body:
          'Assignments show you met academic requirements. They rarely demonstrate how you handle ambiguity, client feedback, or field-specific craft standards.',
      },
      aptellum: {
        label: 'Prove you can work in the field.',
        body:
          'Briefs mirror studio and co-op formats — scoped engagements with deliverables employers and admissions readers recognize.',
      },
    },
    {
      id: 'vs-portfolio-builders',
      category: 'Portfolio builders',
      conventional: {
        label: 'Help you display what you already have.',
        body:
          'Template-driven portfolio sites organize existing work. They do not help you decide what to make, how to scope it, or why it matters to your trajectory.',
      },
      aptellum: {
        label: 'Help you make what is worth displaying.',
        body:
          'The studio generates briefs, guides process, structures case studies, and connects finished work to pathways — not just pixels on a page.',
      },
    },
    {
      id: 'vs-simulations',
      category: 'Job simulations',
      conventional: {
        label: 'Let you sample a role from the outside.',
        body:
          'Forage-style simulations are valuable introductions — but they are standardized, closed experiences with limited portfolio carryover.',
      },
      aptellum: {
        label: 'Let you produce original work in the simulation\'s shape.',
        body:
          'Aptellum adopts the simulation\'s clarity — realistic constraints, role rhythm, employer context — and outputs bespoke portfolio evidence you authored.',
      },
    },
    {
      id: 'vs-micro-internships',
      category: 'Micro-internships',
      conventional: {
        label: 'Offer short tasks after you are already in the pipeline.',
        body:
          'Parker Dewey-style engagements are excellent evaluation tools — but they typically require an employer posting and a student who already knows how to compete for it.',
      },
      aptellum: {
        label: 'Prepare students to succeed in micro-internships — then connect them.',
        body:
          'Students arrive with completed briefs, disclosed process, and case-study fluency — so short employer projects evaluate craft, not basic readiness.',
      },
    },
    {
      id: 'vs-ai-tools',
      category: 'Unguided AI tools',
      conventional: {
        label: 'Generate output on demand.',
        body:
          'General AI can draft, render, and suggest — without teaching a student what to own, how to brief, or whether the result meets creative standards.',
      },
      aptellum: {
        label: 'Embed AI inside a studio with judgment standards.',
        body:
          'Delegation, Description, Discernment, and Diligence are built into every project — AI as co-op partner, not replacement for authorship.',
      },
    },
  ] satisfies ComparisonCard[],
};

// ─── 12. FAQ ─────────────────────────────────────────────────────────────────

export const faq = {
  eyebrow: 'Questions',
  headline: 'Straight answers.',
  items: [
    {
      question: 'Is Aptellum a job board?',
      answer:
        'No. Aptellum is a preparation layer — a co-op studio that helps students create portfolio-ready projects and internship pathways before they apply anywhere. Job boards assume you are already prepared. Aptellum helps you become prepared.',
    },
    {
      question: 'Who is Aptellum for?',
      answer:
        'Creative students in design, industrial design, film, animation, illustration, architecture, creative technology, product design, writing, museum and curatorial practice, and visual culture — plus the universities and employers who evaluate their work.',
    },
    {
      question: 'How is this different from a class assignment?',
      answer:
        'Aptellum briefs are modeled on professional engagements: scoped deliverables, stakeholder presentation, field-specific evaluation, and case-study documentation. The output is meant to be shown to employers and admissions readers — not just graded by an instructor.',
    },
    {
      question: 'Does Aptellum replace internships or co-op programs?',
      answer:
        'It extends them. Aptellum brings co-op principles — integrated work experience, employer trust networks, structured reflection — to students who lack access to formal co-op placements. It prepares students to compete for internships and perform once they arrive.',
    },
    {
      question: 'How does AI fit in?',
      answer:
        'AI is a co-op partner inside the studio, bounded by four practices: Delegation (what you own vs. what AI assists), Description (how you brief work), Discernment (how you evaluate output), and Diligence (how you disclose and attribute). Every published project includes transparent AI process documentation.',
    },
    {
      question: 'Can universities use Aptellum with existing curriculum?',
      answer:
        'Yes. Briefs align to studio courses, capstones, and portfolio seminars. Faculty keep their learning outcomes; Aptellum supplies the professional framing, employer connections, and portfolio structure students need after the semester ends.',
    },
    {
      question: 'What do employers get?',
      answer:
        'A way to evaluate early talent through structured micro-projects and pre-formatted case studies — without wading through inconsistent student portfolios. You see craft, process, and judgment before committing to a full internship or hire.',
    },
    {
      question: 'When does Aptellum launch?',
      answer:
        'Aptellum is opening gradually. Join the waitlist to receive early access, sample briefs for your discipline, and an invitation when the studio opens for your cohort.',
    },
  ] satisfies FaqItem[],
};

// ─── 13. CTA ─────────────────────────────────────────────────────────────────

export const cta: CtaContent = {
  eyebrow: 'Early access',
  headline: 'Graduate with proof.',
  body:
    'Join the Aptellum waitlist and tell us your discipline, dream studios, and where you want your first project to take you. We are opening the co-op studio cohort by cohort — starting with students who are ready to make work they can stand behind.',
  primaryCta: { label: 'Join the studio waitlist', href: '#waitlist' },
  secondaryCta: { label: 'Explore sample briefs', href: '#briefs' },
  footnote:
    'Aptellum is part of the Ailiur ecosystem — local-first, sovereign by design. No spam: one note when your cohort opens.',
};

// ─── Full bundle ─────────────────────────────────────────────────────────────

export const APTELLUM_CONTENT: AptellumContent = {
  meta: APTELLUM_META,
  navItems,
  hero,
  problem,
  aptellumLoop,
  studentTools,
  universityTools,
  employerTools,
  aiFluencyLayer,
  exampleTracks,
  sampleBriefs,
  comparisonCards,
  faq,
  cta,
};
