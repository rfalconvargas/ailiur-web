// Enterprise Suite — the B2B / organizational counterpart to each consumer
// Ailiur app. Each entry powers a basic landing page (served at its own
// subdomain) and the Enterprise Suite flyout in the site nav.

export type EnterpriseFeature = { title: string; body: string };

export type EnterpriseApp = {
  slug: string; // route under /enterprise/<slug>
  subdomain: string; // <sub>.ailiur.com
  name: string; // "Enchiridion Schools"
  parent: string; // consumer app it extends
  parentHref: string; // consumer app URL
  audience: string; // "For schools & districts"
  tagline: string;
  description: string;
  features: EnterpriseFeature[];
};

export const ENTERPRISE_APPS: EnterpriseApp[] = [
  {
    slug: "enchiridion-schools",
    subdomain: "enchiridionschools.ailiur.com",
    name: "Enchiridion Schools",
    parent: "Enchiridion",
    parentHref: "https://www.enchiridion.ailiur.com",
    audience: "For schools, districts & educators",
    tagline: "Enchiridion's guided learning, for whole classrooms.",
    description:
      "Bring Enchiridion to every student, with the rosters, dashboards, and oversight schools need to run it at scale.",
    features: [
      { title: "Classes & rosters", body: "Provision students, group by class, and manage access from one admin console." },
      { title: "Teacher dashboards", body: "See progress, gaps, and momentum across every learner at a glance." },
      { title: "School-grade privacy", body: "SSO, role-based access, and privacy-minded data handling built for education." },
    ],
  },
  {
    slug: "qetos-clinics",
    subdomain: "qetosclinics.ailiur.com",
    name: "Qetos Clinics",
    parent: "Qetos",
    parentHref: "https://qetos.ailiur.com",
    audience: "For clinics & care teams",
    tagline: "Qetos, extended to the people who guide care.",
    description:
      "Give clinicians the adherence trends, symptom correlations, and biometric context behind each person's daily Qetos actions.",
    features: [
      { title: "Adherence & trends", body: "Follow protocol follow-through over time — patterns, not snapshots." },
      { title: "Shared care context", body: "A consented, shared view between a person and their care team." },
      { title: "Educational, not diagnostic", body: "Decision support and reflection — never medical advice or diagnosis." },
    ],
  },
  {
    slug: "oruvo-advisors",
    subdomain: "oruvoadvisors.ailiur.com",
    name: "Oruvo Advisors",
    parent: "Oruvo",
    parentHref: "https://oruvo.ailiur.com",
    audience: "For wealth advisors & firms",
    tagline: "Your clients' life balance sheet, inside your practice.",
    description:
      "A calm, read-only view of a client's whole picture — assets, goals, and time ROI — to ground better conversations.",
    features: [
      { title: "Client portfolios", body: "A unified life balance sheet per client, organized for review." },
      { title: "Read-only by design", body: "You see context; clients keep ownership and control of their data." },
      { title: "Not investment advice", body: "A planning and reflection tool — not a recommendation engine." },
    ],
  },
  {
    slug: "ollune-enterprise",
    subdomain: "olluneenterprise.ailiur.com",
    name: "Ollune Enterprise",
    parent: "Ollune",
    parentHref: "https://ollune.ailiur.com",
    audience: "For teams & organizations",
    tagline: "The Ollune AI OS layer, deployed across your org.",
    description:
      "Bring Ollune's quiet AI operating layer to every workspace, with the controls and scale teams need.",
    features: [
      { title: "Org-wide rollout", body: "Deploy Ollune to teams with central configuration and policy." },
      { title: "Admin & access", body: "SSO, roles, and governance from a single console." },
      { title: "Local-first & sovereign", body: "Your data stays yours — private by design, at any scale." },
    ],
  },
  {
    slug: "retellum-studios",
    subdomain: "retellumstudios.ailiur.com",
    name: "Retellum Studios",
    parent: "Retellum",
    parentHref: "https://retellum.ailiur.com",
    audience: "For media organizations & studios",
    tagline: "Retellum's media-footprint intelligence, for teams.",
    description:
      "Map how audiences and creators move through media, and turn reflection into shared, exportable insight.",
    features: [
      { title: "Shared footprint maps", body: "Team-wide constellations of media and influence." },
      { title: "Collaborative reflection", body: "Lessons and connections, captured across your group." },
      { title: "Exportable insight", body: "Bring the picture into the tools your team already runs on." },
    ],
  },
  {
    slug: "tayzt-studios",
    subdomain: "tayztstudios.ailiur.com",
    name: "Tayzt Studios",
    parent: "Tayzt",
    parentHref: "https://tayzt.ailiur.com",
    audience: "For production studios & agencies",
    tagline: "Taste-aware media treatments, at studio scale.",
    description:
      "Tayzt's atmosphere engine for teams turning raw footage into on-brand, taste-aware treatments — fast.",
    features: [
      { title: "Brand-aware presets", body: "Encode your house style as reusable atmospheres." },
      { title: "Team libraries", body: "Shared treatments and assets across every project." },
      { title: "Pipeline-ready", body: "Slots into your existing post-production workflow." },
    ],
  },
  {
    slug: "tellumetry-enterprise",
    subdomain: "tellumetryenterprise.ailiur.com",
    name: "Tellumetry Enterprise",
    parent: "Tellumetry",
    parentHref: "https://tellumetry.ailiur.com",
    audience: "For teams & operators",
    tagline: "Tellumetry's signal, across your whole organization.",
    description:
      "The calm measurement and insight layer, scaled to teams — turn org-wide signal into clear decisions.",
    features: [
      { title: "Org-wide dashboards", body: "One calm view of the signals that matter across teams." },
      { title: "Roles & access", body: "Central control over who sees what." },
      { title: "Export & integrate", body: "Pipe insight into the systems you already use." },
    ],
  },
  {
    slug: "lociq-cities",
    subdomain: "lociqcities.ailiur.com",
    name: "Lociq Cities",
    parent: "Lociq",
    parentHref: "https://lociq.ailiur.com",
    audience: "For cities & public agencies",
    tagline: "Civic intelligence for the people who run cities.",
    description:
      "Lociq's civic-intelligence, scaled to municipal teams — turn local signal into better public decisions.",
    features: [
      { title: "Civic dashboards", body: "Neighborhood-level signal in one shared view." },
      { title: "Cross-agency collaboration", body: "Shared context across departments and teams." },
      { title: "Responsible by design", body: "Privacy-minded, transparent, and accountable." },
    ],
  },
  {
    slug: "ucm-enterprise",
    subdomain: "ucmenterprise.ailiur.com",
    name: "UCM Enterprise",
    parent: "Unified Context Mesh",
    parentHref: "https://ucm.ailiur.com",
    audience: "For organizations",
    tagline: "One context layer across every tool your org uses.",
    description:
      "Unified Context Mesh for the enterprise — connect context across apps, teams, and systems, under your control.",
    features: [
      { title: "Cross-tool context", body: "Unify context from the tools your teams already use." },
      { title: "Governance & audit", body: "Central policy, roles, and a clear audit trail." },
      { title: "Local-first & sovereign", body: "Context stays under your organization's control." },
    ],
  },
  {
    slug: "glyfra-teams",
    subdomain: "glyfrateams.ailiur.com",
    name: "Glyfra Teams",
    parent: "Glyfra",
    parentHref: "https://glyfra.ailiur.com",
    audience: "For teams & studios",
    tagline: "Write ugly, ship organized — together.",
    description:
      "Glyfra for teams: turn everyone's handwritten chaos into shared, organized execution.",
    features: [
      { title: "Shared workspaces", body: "Organized pages flow straight into team projects." },
      { title: "Team exports", body: "Push to the tools your team runs on." },
      { title: "Admin & seats", body: "Manage members and access centrally." },
    ],
  },
];

export function getEnterpriseApp(slug: string): EnterpriseApp | undefined {
  return ENTERPRISE_APPS.find((a) => a.slug === slug);
}

export const ENTERPRISE_EMAIL = "raul@rfalcon.com";
