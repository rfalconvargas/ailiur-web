/** Static copy for the Daymesh landing page. */

export const DM_META = {
  name: 'Daymesh',
  route: '/daymesh',
  by: 'by Ailiur',
};

export const DM_NAV_LINKS = [
  { label: 'How it works', href: '#how' },
  { label: 'Demo', href: '#demo' },
  { label: 'Privacy', href: '#privacy' },
  { label: 'Waitlist', href: '#waitlist' },
];

export const DM_HERO = {
  eyebrow: 'The biometric camera roll',
  h1: 'See how your days shape your body.',
  kicker: 'Wearables show the signal. Daymesh shows the story.',
  sub: 'Daymesh links your wearable data to the hidden context in your camera roll — meals, places, screens, people, and routines — to reveal what’s really moving your sleep, recovery, energy, and focus.',
  primaryCta: 'Try the demo',
  secondaryCta: 'Join waitlist',
  trust: 'Private by default · Local-first by design · Not medical advice',
};

export const DM_PROBLEM = {
  eyebrow: 'The gap',
  headline: 'Your wearable shows what happened. Not why.',
  body: 'Your camera roll is the missing context layer for your health. You already carry two records of every day — biometrics in your wearable, and the life behind them in your photos. They’ve never been in the same place.',
  pains: [
    {
      title: 'Recovery drops — and you’re guessing why',
      body: 'A red morning with no explanation. The cause is usually in yesterday, just out of view.',
    },
    {
      title: 'Your real context is scattered',
      body: 'Meals, screens, places, and routines sit in thousands of photos no health app ever reads.',
    },
    {
      title: 'Numbers without a story',
      body: 'Scores alone can’t tell you what to change. The context is the missing half.',
    },
  ],
};

export const DM_HOW = {
  eyebrow: 'How it works',
  headline: 'Four quiet steps. All on your device.',
  steps: [
    {
      title: 'Connect biometrics',
      body: 'Link your wearable — sleep, recovery, HRV, resting heart rate, strain, and energy flow in automatically.',
    },
    {
      title: 'Read your context',
      body: 'Daymesh derives context from your photos on-device — a late meal, time outdoors, a packed day — never the images themselves.',
    },
    {
      title: 'Find patterns',
      body: 'It lines up your days against your nights and surfaces the correlations that keep repeating.',
    },
    {
      title: 'Gentle experiments',
      body: 'Each pattern becomes one small, optional thing to try tomorrow. No plan to follow, no pressure.',
    },
  ],
};

export const DM_DEMO = {
  eyebrow: 'Live demo',
  headline: 'A week, connected.',
  intro: 'Illustrative data for one person. Tap any day to see the body and the life behind it — or press play and watch the week unfold. Then filter the context and watch a pattern surface.',
};

export const DM_PRIVACY = {
  eyebrow: 'Privacy',
  headline: 'Private by default. Local-first by design.',
  intro: 'A product that reads your camera roll has to earn trust at the architecture level — not with a promise.',
  points: [
    {
      title: 'Local-first by default',
      body: 'Analysis runs on your device. Nothing is uploaded unless you explicitly turn it on.',
    },
    {
      title: 'Photos are context, not content',
      body: 'Daymesh keeps the signal — “late meal,” “outdoor light” — and never needs to keep the photo.',
    },
    {
      title: 'No diagnosis. No shame. Just patterns.',
      body: 'It points at correlations, calmly. The interpreting, and the deciding, stay with you.',
    },
    {
      title: 'You control what’s analyzed',
      body: 'Turn any source on or off, exclude anything, and delete everything in a single tap.',
    },
  ],
};

export const DM_USE_CASES = {
  eyebrow: 'Who it’s for',
  headline: 'For people who want the why.',
  cases: [
    { title: 'Optimizers', body: 'Close the loop between daily choices and morning numbers.' },
    { title: 'Athletes', body: 'See what truly drives recovery between hard sessions.' },
    { title: 'Founders & builders', body: 'Catch the late nights and stress patterns before they catch you.' },
    { title: 'Better sleep', body: 'Find the small evening habits quietly costing you rest.' },
    { title: 'Nutrition experiments', body: 'Connect meals and timing to energy and HRV — without a food log.' },
    { title: 'Attention & stress', body: 'Notice how screens, places, and people shape your focus.' },
  ],
};

export const DM_CTA = {
  headline: 'Turn your life into gentle experiments.',
  sub: 'Daymesh is opening early access slowly and deliberately. Be among the first to see your own week, connected.',
  cta: 'Join the waitlist',
};

export const DM_WAITLIST = {
  eyebrow: 'Early access',
  headline: 'Join the Daymesh waitlist.',
  sub: 'For people who want to understand the relationship between their life and their body.',
  note: 'No spam — one note when your invitation is ready. Daymesh is not medical advice.',
};

export const DM_FOOTER = {
  tagline: 'See how your days shape your body.',
  columns: [
    {
      title: 'Daymesh',
      links: [
        { label: 'How it works', href: '#how' },
        { label: 'Demo', href: '#demo' },
        { label: 'Privacy', href: '#privacy' },
        { label: 'Waitlist', href: '#waitlist' },
      ],
    },
    {
      title: 'Ailiur',
      links: [
        { label: 'Ailiur', href: 'https://ailiur.com' },
        { label: 'Privacy', href: 'https://ailiur.com/privacy' },
        { label: 'Contact', href: 'mailto:hello@ailiur.com' },
      ],
    },
  ],
  disclaimer: 'Daymesh by Ailiur. Not medical advice. Daymesh helps you notice correlations between your life and your biometrics — it does not diagnose, treat, or replace medical care.',
};
