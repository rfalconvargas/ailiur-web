/**
 * Pilot Program section content for /aptellum#pilot.
 */

export const PILOT_ROLE_OPTIONS = [
  { value: 'student', label: 'Student' },
  { value: 'educator', label: 'Educator' },
  { value: 'employer', label: 'Employer' },
  { value: 'alumni-mentor', label: 'Alumni mentor' },
  { value: 'founder', label: 'Founder' },
] as const;

export type PilotRole = (typeof PILOT_ROLE_OPTIONS)[number]['value'];

export const PILOT_PROGRAM = {
  eyebrow: 'Early pilot',
  headline: 'The first pilot can start with 20 students.',
  body:
    'Aptellum does not need a full employer marketplace on day one. The first pilot can run as a guided creative co-op studio: students generate a career map, build one target-company project, receive structured critique, and leave with portfolio-ready evidence plus outreach materials.',
  earlyNote:
    'This is an early pilot concept — cohort size, reviewers, and timing will be confirmed with participating schools and partners.',
  weeks: [
    { week: 1, title: 'Career direction and dream-company map' },
    { week: 2, title: 'Project brief and research sprint' },
    { week: 3, title: 'Prototype, artifact, or creative output' },
    { week: 4, title: 'Portfolio story, critique, and outreach package' },
  ],
  participants: [
    { count: '20', label: 'students' },
    { count: '2', label: 'faculty reviewers' },
    { count: '5', label: 'alumni mentors' },
    { count: '3', label: 'employer or studio reviewers' },
    { count: '1', label: 'project showcase' },
  ],
  outcomes: [
    'Portfolio-ready project',
    'Role-specific project narrative',
    'Outreach package',
    'Skills map',
    'Preparation confidence',
    'Internship application plan',
  ],
  formCta: 'Start the Aptellum pilot',
  formFootnote:
    'Submissions are not yet sent to a server — we will add secure intake as the pilot opens. One note when your cohort is scheduled.',
} as const;

export const PILOT_FIELD_OPTIONS = [
  'Product Design',
  'Industrial Design',
  'Film / Animation',
  'Illustration',
  'Architecture',
  'Game Design',
  'Creative Technology',
  'Museum / Curatorial',
  'Brand / Strategy',
  'Writing / Editorial',
  'Other',
] as const;
