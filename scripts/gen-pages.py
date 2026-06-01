# Generates placeholder route pages for the Ailiur marketing site from a
# content map derived from the Ailiur Playbook v2. Re-runnable.
import json, os

APP = os.path.join(os.path.dirname(__file__), "..", "src", "app")
ENCH = "https://www.enchiridion.ailiur.com"

PAGES = {
    "products": {
        "eyebrow": "Products", "title": "The Operating System for Life",
        "description": "Ailiur is an AI-first master layer for human optimization — an interconnected software and hardware ecosystem that treats specialized apps as modular blocks, fusing health, learning, finance, and media into one cross-pollinating intelligence engine.",
        "bullets": ["Ketofy — the AI health concierge", "Enchiridion — the AI learning engine", "Doblu — the AI wealth & productivity hub", "Moment — the AI media graph"],
        "cta": {"label": "Launch Enchiridion", "href": ENCH},
    },
    "products/doblu": {
        "eyebrow": "Products", "title": "Doblu",
        "description": "A financially literate, AI-first wealth management and workflow companion for the modern execution-oriented professional. Doblu integrates task management with financial ledger intelligence, calculating the direct ROI of your time, career growth, and asset distribution.",
    },
    "products/moment": {
        "eyebrow": "Products", "title": "Moment",
        "description": "An all-in-one media logging, indexing, and review service powered by contextual AI. Moment captures and evaluates your interaction with books, games, film, and digital media, feeding your subjective taste back into the ecosystem.",
    },
    "solutions/education": {
        "eyebrow": "Solutions", "title": "Students & Teachers",
        "description": "Enchiridion Institution turns passive curriculum delivery into dynamic, data-driven cognitive acquisition. Instructors map curriculums into active knowledge graphs and see exactly which concepts need refinement.",
        "bullets": ["Map curriculums into active knowledge graphs", "Aggregate analytics on comprehension bottlenecks", "Quantify the ROI of upskilling"],
    },
    "solutions/keto-therapy": {
        "eyebrow": "Solutions", "title": "Ketogenic Therapy",
        "description": "Ketofy Provider is a tele-health and patient-management portal for functional medicine practitioners, health coaches, and clinical research organizations — bridging the gap between clinical appointments and daily patient reality.",
        "bullets": ["Deploy custom metabolic & behavioral protocols", "Aggregate continuous physiological & adherence data", "Prove clinical efficacy at scale"],
    },
    "solutions/functional-medicine": {
        "eyebrow": "Solutions", "title": "Functional Medicine",
        "description": "Grounded in the metabolic psychiatry frameworks of Dr. Georgia Ede and Dr. Chris Palmer, Ailiur translates scientific metabolic theory into reproducible, household-ready daily protocols.",
    },
    "solutions/hci": {
        "eyebrow": "Solutions", "title": "Human-Computer Interaction",
        "description": "Frontier HCI and generative, ephemeral interfaces that bend technology to natural human thought — context-aware widgets that materialize on demand and dissolve the moment the work is done.",
    },
    "solutions/mobile-first": {
        "eyebrow": "Solutions", "title": "Mobile-First Design",
        "description": "Intuitive, mobile-first human-computer interactions that translate multilayered technical systems into frictionless, beautiful experiences.",
    },
    "blog": {"eyebrow": "Resources", "title": "Blog",
        "description": "Field notes on human optimization, local-first AI, metabolic health, and building the Ailiur ecosystem.", "note": "First posts coming soon"},
    "perks": {"eyebrow": "Resources", "title": "Perks",
        "description": "Member perks across the Ailiur ecosystem — discounts, early hardware access, and partner benefits."},
    "tools": {"eyebrow": "Resources", "title": "Tools",
        "description": "Free utilities and calculators built on the Unified Context Mesh."},
    "releases": {"eyebrow": "Resources", "title": "Product Releases",
        "description": "Changelogs and launch notes across Ketofy, Enchiridion, Doblu, Moment, and the Ailiur hardware frontier."},
    "science": {"eyebrow": "Resources", "title": "Scientific Media",
        "description": "The Enchiridion YouTube Network — a powerhouse educational channel driven by rigorous, scientifically accurate documentaries.",
        "bullets": ["127K+ subscribers and 38M+ views", "Month-long scientific research pipeline", "Scientifically accurate paleontology & deep-time content"]},
    "assets-3d": {"eyebrow": "Resources", "title": "3D Assets",
        "description": "The internet's premier database of scientifically accurate 3D prehistoric models, built alongside leading paleontologists."},
    "about": {"eyebrow": "About", "title": "Our Story",
        "description": "Ailiur is led by Raul Falcon, a RISD alumnus specializing in UX and product design for complex frontier technologies. We build with ruthless focus on velocity, a bias toward action, and deep personal integration of our own products.",
        "bullets": ["Action-oriented momentum over analysis paralysis", "Minimal-abstraction, deterministic engineering", "Local-first, sovereign by design"]},
    "events": {"eyebrow": "Connect", "title": "Events",
        "description": "Talks, demos, and meetups across the Ailiur ecosystem."},
    "partnerships": {"eyebrow": "Connect", "title": "Partnerships",
        "description": "Plug into the Ailiur intelligence engine. Enterprise partners — clinics, universities, wealth firms, and media networks — can deploy services and access cross-pollinated insights with explicit user consent.",
        "cta": {"label": "Contact the team", "href": "/contact"}},
    "careers": {"eyebrow": "Connect", "title": "Careers",
        "description": "We operate an uncomfortably lean, builder-first team. Everyone ships. If you bias toward action and want absolute ownership over real outcomes, we want to talk.",
        "bullets": ["Builder-operators: everyone ships working code", "DRIs: one person, one metric, total ownership", "Remote, high-velocity, minimal middleware"],
        "cta": {"label": "Get in touch", "href": "/contact"}},
    "help": {"eyebrow": "Support", "title": "Help Center",
        "description": "Guides and answers for Ketofy, Enchiridion, and the Ailiur platform."},
    "switch": {"eyebrow": "Support", "title": "Switch to Ailiur",
        "description": "Import your existing data and protocols and move to Ailiur without losing history."},
    "contact": {"eyebrow": "Connect", "title": "Contact us",
        "description": "Questions, partnerships, or press? Reach the team directly.",
        "cta": {"label": "Email hello@ailiur.com", "href": "mailto:hello@ailiur.com"},
        "note": "Prefer DMs? Find us on X, YouTube, and Reddit."},
    "signup": {"eyebrow": "Account", "title": "Create your account",
        "description": "Join Ailiur and unify your health, learning, and focus on the local-first Context Mesh.",
        "cta": {"label": "Launch Enchiridion", "href": ENCH}, "note": "Authentication coming soon"},
    "login": {"eyebrow": "Account", "title": "Log in",
        "description": "Welcome back to Ailiur.", "note": "Authentication coming soon"},
    "platform/mesh": {"eyebrow": "Platform", "title": "Unified Context Mesh",
        "description": "A lean, decentralized data layer that solves context fragmentation. It aggregates your AI exports, strips conversational noise, embeds text into an in-memory Local Vector Matrix, and retrieves the most relevant context with sub-millisecond cosine similarity.",
        "bullets": ["Async-first, zero-dependency ingestion", "In-memory Local Vector Matrix (NumPy)", "Sub-millisecond dot-product retrieval", "Cross-pollinates Ketofy, Enchiridion, Doblu & Moment"]},
    "platform/core": {"eyebrow": "Platform", "title": "Ailiur Core",
        "description": "The interconnected master layer. Ailiur Core binds specialized apps like modular blocks so the utility of the whole system compounds with every node added."},
    "platform/api": {"eyebrow": "Platform", "title": "Ailiur Connect API",
        "description": "The enterprise master layer. With explicit user consent, institutional partners access cross-pollinated insights across health, learning, finance, and media — unprecedented alignment between services and human realities.",
        "bullets": ["Ketofy Provider — clinical & functional medicine", "Enchiridion Institution — universities & training", "Doblu Wealth — advisors & productivity", "Moment Publisher — streaming & publishing"]},
    "platform/security": {"eyebrow": "Platform", "title": "Security & Sovereignty",
        "description": "Local-first and deterministic by design. Your data lives on your device and never leaves unless you explicitly send it — no bloated cloud, no subscription lock-in, no API bill shock.",
        "bullets": ["On-device, local-first storage", "Deterministic execution with local circuit breakers", "You own your data — period"]},
}

TEMPLATE = '''import {{ PlaceholderPage, makeMetadata, type PlaceholderContent }} from '@/components/ui/placeholder-page';

const content: PlaceholderContent = {body};

export const metadata = makeMetadata(content);

export default function Page() {{
  return <PlaceholderPage {{...content}} />;
}}
'''

count = 0
for route, content in PAGES.items():
    body = json.dumps(content, ensure_ascii=True, indent=2)
    # indent nested object to look clean enough; json is valid TS here
    out_dir = os.path.join(APP, *route.split("/"))
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, "page.tsx"), "w", encoding="utf-8") as f:
        f.write(TEMPLATE.format(body=body))
    count += 1

print(f"generated {count} placeholder pages")
