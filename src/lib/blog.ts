// Blog content lives here as a typed array — no MDX/CMS in this project.
// Each post body is a list of blocks the detail route renders into editorial prose.

export type Block =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'callout'; text: string };

export type Post = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  author: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  readingTime: string;
  seo: { title: string; description: string };
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: 'what-is-ailiur',
    title: 'What is Ailiur?',
    category: 'Company',
    excerpt:
      'Ailiur is an AI-first ecosystem that connects learning, health, wealth, media, creativity, and AI workflows into one unified personal intelligence layer.',
    author: 'Ailiur',
    date: '2026-06-15',
    readingTime: '7 min read',
    seo: {
      title:
        'What is Ailiur? The AI-First Ecosystem for Learning, Health, Wealth, Media, and Creativity',
      description:
        'Ailiur is an AI-first software ecosystem that connects Enchiridion, Qetos, Oruvo, Retellum, Tayzt, and Tellumetry through the Unified Context Mesh.',
    },
    body: [
      {
        type: 'p',
        text: 'Ailiur is an AI-first software ecosystem designed to help people build better lives with less friction.',
      },
      {
        type: 'p',
        text: 'Most AI tools today are useful, but isolated. You might use one app to learn, another app to track your health, another to manage money, another to organize media, another to write, another to code, and another to remember everything you forgot to save. Each tool can help in one moment, but none of them truly understand the larger shape of your life.',
      },
      {
        type: 'p',
        text: 'Ailiur is built around a different idea: your tools should connect.',
      },
      {
        type: 'p',
        text: 'Your learning should understand your goals. Your health system should understand your schedule. Your financial planning should understand your work. Your creative tools should understand your taste. Your media library should help you think, not just entertain you. Instead of living inside disconnected apps, Ailiur gives you a connected personal intelligence layer: a system that helps you learn, act, reflect, create, and improve with more continuity.',
      },
      {
        type: 'p',
        text: 'At the center of Ailiur is the Unified Context Mesh, or UCM. The UCM is the connective tissue between the different Ailiur products. It allows the ecosystem to remember useful context across domains and turn your daily actions into a more intelligent personal operating system. Ailiur is not just a collection of apps. It is a set of focused tools that become more valuable when they work together.',
      },
      { type: 'callout', text: 'Ailiur is not one app. It is a connected system.' },

      { type: 'h2', text: 'The problem Ailiur solves' },
      {
        type: 'p',
        text: 'Modern life produces too much information and too little integration.',
      },
      {
        type: 'p',
        text: 'You can watch a documentary, save a quote, track a workout, write a note, open a budgeting spreadsheet, record a symptom, start a course, and brainstorm a business idea all in the same day. But most of that information disappears into separate silos. Your health data does not understand your workload. Your learning app does not understand your creative projects. Your financial tools do not understand how your time is being spent. Your notes do not automatically become action.',
      },
      {
        type: 'p',
        text: 'This creates a quiet kind of exhaustion. You are surrounded by tools, but still forced to manually connect everything in your head.',
      },
      {
        type: 'p',
        text: 'Ailiur is designed to reduce that burden. Its goal is to help technology become less like a set of separate dashboards and more like a calm, intelligent layer that supports your actual life.',
      },

      { type: 'h2', text: 'The Ailiur consumer products' },
      {
        type: 'p',
        text: 'Ailiur begins with six consumer products: Enchiridion, Qetos, Oruvo, Retellum, Tayzt, and Tellumetry. Each product solves a focused problem, but each one also feeds into the larger intelligence layer.',
      },

      { type: 'h2', text: 'Enchiridion: learning that becomes structure' },
      { type: 'p', text: 'Enchiridion is the Ailiur learning engine.' },
      {
        type: 'p',
        text: 'It is designed for people who want to understand difficult subjects deeply, not just collect more information. Instead of treating learning as passive consumption, Enchiridion helps turn books, videos, lectures, papers, notes, and research into active knowledge structures.',
      },
      {
        type: 'p',
        text: 'Imagine studying paleontology, metabolic health, product design, cinematography, AI, or history. A normal learning app might store your notes. Enchiridion would help map the subject, identify the core ideas, connect them to what you already know, and turn them into a living knowledge graph.',
      },
      {
        type: 'p',
        text: 'For a student, this could mean less confusion and more clarity. For a creator, it could mean faster research for videos, essays, or documentaries. For a professional, it could mean turning a messy field of information into something they can actually use.',
      },

      { type: 'h2', text: 'Qetos: health protocols made manageable' },
      { type: 'p', text: 'Qetos is the Ailiur health companion.' },
      {
        type: 'p',
        text: 'Health advice often fails because it is too complex, too abstract, or too punishing. A person may receive a plan from a doctor, nutritionist, coach, or functional medicine practitioner, but then they have to translate that plan into daily behavior. What do I do today? What matters right now? What happens if I miss something? How do I recover without feeling like I failed?',
      },
      {
        type: 'p',
        text: 'Qetos is designed to make complex health behavior feel emotionally manageable.',
      },
      {
        type: 'p',
        text: 'It can help users follow nutrition protocols, log meals, track symptoms, record ketone readings, notice patterns, and build consistency through small wins. Instead of simply displaying data, Qetos acts like a calm guide that helps the user understand the next best action.',
      },

      { type: 'h2', text: 'Oruvo: money, time, and ownership' },
      { type: 'p', text: 'Oruvo is the Ailiur wealth and productivity hub.' },
      {
        type: 'p',
        text: 'Most financial tools focus on accounts, budgets, or investments. Oruvo goes further by asking a more personal question: how does your time become value?',
      },
      {
        type: 'p',
        text: 'Oruvo helps users think about money, work, assets, tasks, belongings, goals, and future plans in one place. It can help you understand what you own, what you want to build, what your time is being spent on, and how your daily actions connect to long-term financial outcomes.',
      },
      {
        type: 'p',
        text: 'For a founder, freelancer, student, designer, or creator, this matters because money is not just a number in a bank account. It is connected to work, attention, energy, opportunity, and risk. Oruvo is designed to help people make better decisions about their resources.',
      },

      { type: 'h2', text: 'Retellum: your media life as a memory graph' },
      { type: 'p', text: 'Retellum is the Ailiur media graph.' },
      {
        type: 'p',
        text: 'People watch films, read books, play games, listen to podcasts, save videos, and experience culture constantly. But most media platforms are built around consumption, not reflection. They help you watch more, not understand more.',
      },
      {
        type: 'p',
        text: 'Retellum is designed to help users log, review, remember, and learn from the media they consume.',
      },
      {
        type: 'p',
        text: 'It can become a personal map of your movies, books, games, videos, essays, music, and references. Instead of asking only “Did you like this?” Retellum can help ask: What did this teach you? What did it remind you of? How did it shape your taste? What ideas should you revisit later?',
      },

      { type: 'h2', text: 'Tayzt: creative direction powered by taste' },
      { type: 'p', text: 'Tayzt is the Ailiur creative engine.' },
      {
        type: 'p',
        text: 'A lot of AI creative tools start with a prompt box. Tayzt starts with taste.',
      },
      {
        type: 'p',
        text: 'It is designed for creators who care about atmosphere, rhythm, feeling, texture, references, and emotional precision. Instead of producing generic outputs, Tayzt helps translate a creator’s personal aesthetic into media direction.',
      },
      {
        type: 'p',
        text: 'Tayzt is not just about generating content. It is about helping creators understand and apply their own taste more deliberately.',
      },

      { type: 'h2', text: 'Tellumetry: transparent AI work for builders' },
      { type: 'p', text: 'Tellumetry is the Ailiur workspace for AI-assisted building.' },
      {
        type: 'p',
        text: 'As AI coding tools become more powerful, they also become harder to understand. A builder may ask an AI agent to make changes, but then lose track of what the agent is doing, how much it costs, where it is stuck, or whether it is about to break something.',
      },
      { type: 'p', text: 'Tellumetry is designed to make AI work visible.' },
      {
        type: 'p',
        text: 'It can show workflows, progress, costs, agent behavior, and project state in a clearer way. For builders, this matters because AI should not feel like a black box. It should feel like a collaborator whose actions can be inspected, guided, paused, and improved.',
      },

      { type: 'h2', text: 'How Ailiur pricing works' },
      {
        type: 'p',
        text: 'Ailiur’s pricing reflects the way people adopt the ecosystem.',
      },
      { type: 'callout', text: 'The $15 Core tier starts with one focused product.' },
      {
        type: 'p',
        text: 'The $15/month Core tier is for someone who wants one focused Ailiur product. Maybe they only need Enchiridion for learning. Maybe they only need Qetos for health. Maybe they only need Tayzt for creative work. Core is the starting point: one product, personal local-first storage, basic UCM memory, standard AI usage, one workspace, and the ability to export your data.',
      },
      { type: 'callout', text: 'The $50 Mesh tier is where the ecosystem becomes connected.' },
      {
        type: 'p',
        text: 'The $50/month Mesh tier is where Ailiur becomes a full personal ecosystem. This tier includes all consumer products, cross-app Unified Context Mesh, higher AI usage limits, multi-device sync, personal automations between apps, priority product updates, and connected insights across learning, health, media, money, and creation. This is the tier for someone who does not just want an app. They want their life systems to connect.',
      },
      { type: 'callout', text: 'The $150 Operator tier is for serious builders and power users.' },
      {
        type: 'p',
        text: 'The $150/month Operator tier is for serious builders and power users. It includes everything in Mesh, plus the highest consumer AI limits, advanced agents and workflows, advanced Tayzt and Tellumetry tools, unlimited projects and knowledge graphs, model routing and cost controls, API/export tools, early access to Iris-style interfaces, and premium support. Operator is for people who want to use Ailiur as a daily operating system for research, creation, execution, and personal optimization.',
      },
      {
        type: 'p',
        text: 'Above that is Enterprise: custom pricing for institutions, providers, advisors, and teams. The Enterprise Suite includes Civis, Iris, Aptellum, Qetos Provider, Enchiridion Institution, Oruvo Advisors, and the Unified Context Mesh API. This layer is for organizations that need admin controls, SSO, audit logs, compliance, deployment support, and custom integrations.',
      },

      { type: 'h2', text: 'How Ailiur could improve people’s lives' },
      { type: 'p', text: 'Ailiur could help people feel less fragmented.' },
      {
        type: 'p',
        text: 'A student could use Enchiridion to finally understand difficult subjects and turn scattered research into a clear map. A person trying to improve their health could use Qetos to make daily behavior feel less overwhelming. A creator could use Retellum and Tayzt to understand their influences and make better work. A founder could use Oruvo and Tellumetry to connect their tasks, finances, software projects, and creative output. A school, clinic, or advisor could use the enterprise tools to support people with more context and less guesswork.',
      },
      {
        type: 'p',
        text: 'The deeper promise is not that AI will do everything for you.',
      },
      {
        type: 'p',
        text: 'The promise is that your tools can become more aware of your life, your goals, your constraints, and your patterns. Ailiur is built around the belief that software should help people become more capable, not more distracted. It should reduce the effort required to make good decisions. It should make complex systems easier to act on. It should help people move from passive consumption to active growth.',
      },
      {
        type: 'p',
        text: 'Ailiur is for people who want their technology to become a thoughtful extension of their mind, body, work, and creativity.',
      },
      {
        type: 'p',
        text: 'It is a learning engine, a health companion, a wealth and productivity hub, a media graph, a creative director, an AI workspace, and a unified context layer.',
      },
      { type: 'p', text: 'But most simply:' },
      {
        type: 'p',
        text: 'Ailiur is one connected system for becoming more intentional with your life.',
      },
    ],
  },
];

export function getAllPosts(): Post[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** "2026-06-15" -> "June 15, 2026" */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-').map(Number);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}
