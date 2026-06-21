import Image from 'next/image';
import { SmartLink } from '@/components/ui/smart-link';

type Link = { label: string; href: string };

const COLUMNS: { title: string; links: Link[] }[] = [
  {
    title: 'Products',
    links: [
      { label: 'Enchiridion App', href: 'https://www.enchiridion.ailiur.com' },
      { label: 'Qetos App', href: 'https://qetos.ailiur.com' },
      { label: 'Oruvo App', href: 'https://oruvo.ailiur.com' },
      { label: 'Ollune', href: 'https://ollune.ailiur.com' },
      { label: 'Retellum App', href: 'https://retellum.ailiur.com' },
      { label: 'Tayzt App', href: 'https://tayzt.ailiur.com' },
      { label: 'Tellumetry App', href: 'https://tellumetry.ailiur.com' },
      { label: 'Operating System for Life', href: '/products' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Students & Teachers', href: '/solutions/education' },
      { label: 'Ketogenic Therapy', href: '/solutions/keto-therapy' },
      { label: 'Functional Medicine', href: '/solutions/functional-medicine' },
      { label: 'Human-Computer Interaction', href: '/solutions/hci' },
      { label: 'Mobile-First Design', href: '/solutions/mobile-first' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Perks', href: '/perks' },
      { label: 'Tools', href: '/tools' },
      { label: 'Product Releases', href: '/releases' },
      { label: 'Scientific Media', href: '/science' },
      { label: '3D Assets', href: '/assets-3d' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Create Account', href: '/signup' },
      { label: 'Log In', href: '/login' },
      { label: 'iOS', href: 'https://apps.apple.com' },
      { label: 'Android', href: 'https://play.google.com' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'Unified Context Mesh', href: '/platform/mesh' },
      { label: 'Ailiur Core', href: '/platform/core' },
      { label: 'API', href: '/platform/api' },
      { label: 'Security & Sovereignty', href: '/platform/security' },
    ],
  },
];

// About has nested sub-groups (Connect, Support).
const ABOUT = {
  story: { label: 'Our Story', href: '/about' },
  groups: [
    {
      title: 'Connect',
      links: [
        { label: 'Events', href: '/events' },
        { label: 'Partnerships', href: '/partnerships' },
        { label: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'FAQs', href: '/faqs' },
      ],
    },
  ],
  contact: { label: 'Contact us', href: '/contact' },
};

const LEGAL: Link[] = [
  { label: 'Terms', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Refund Policy', href: '/refund' },
  { label: 'Contact', href: '/contact' },
];

const SOCIAL: Link[] = [
  { label: 'YouTube', href: 'https://youtube.com/@ailiur' },
  { label: 'X', href: 'https://x.com/ailiur' },
  { label: 'Instagram', href: 'https://instagram.com/ailiur' },
  { label: 'TikTok', href: 'https://tiktok.com/@ailiur' },
  { label: 'Reddit', href: 'https://reddit.com/r/ailiur' },
];

const linkClass =
  'block py-1.5 text-sm text-foreground/65 transition-colors hover:text-foreground';

export function SiteFooter() {
  return (
    <footer className="relative mt-10 w-full px-4 pb-10">
      <div className="glass-strong mx-auto max-w-6xl rounded-[var(--radius-panel)] px-6 py-12 sm:px-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {COLUMNS.slice(0, 3).map((col) => (
            <div key={col.title}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground/45">
                {col.title}
              </h3>
              {col.links.map((l) => (
                <SmartLink key={l.label} href={l.href} className={linkClass}>
                  {l.label}
                </SmartLink>
              ))}
            </div>
          ))}

          {/* About with nested groups */}
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground/45">
              About
            </h3>
            <SmartLink href={ABOUT.story.href} className={linkClass}>
              {ABOUT.story.label}
            </SmartLink>
            {ABOUT.groups.map((g) => (
              <div key={g.title} className="mt-3">
                <p className="text-xs font-semibold text-foreground/70">{g.title}</p>
                {g.links.map((l) => (
                  <SmartLink key={l.label} href={l.href} className={linkClass}>
                    {l.label}
                  </SmartLink>
                ))}
              </div>
            ))}
            <SmartLink href={ABOUT.contact.href} className={`${linkClass} mt-3 font-medium text-foreground`}>
              {ABOUT.contact.label}
            </SmartLink>
          </div>

          {COLUMNS.slice(3).map((col) => (
            <div key={col.title}>
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-foreground/45">
                {col.title}
              </h3>
              {col.links.map((l) => (
                <SmartLink key={l.label} href={l.href} className={linkClass}>
                  {l.label}
                </SmartLink>
              ))}
            </div>
          ))}
        </div>

        {/* Legal row */}
        <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--color-border)]/70 pt-8">
          {LEGAL.map((l) => (
            <SmartLink
              key={l.label}
              href={l.href}
              className="text-sm text-foreground/55 transition-colors hover:text-foreground"
            >
              {l.label}
            </SmartLink>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Image
              src="/ailiur-logo.jpg"
              alt="Ailiur"
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span className="text-sm text-foreground/60">
              © {new Date().getFullYear()} Ailiur. AI-first outcome engines for a better human life.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground/45">
              Follow
            </span>
            {SOCIAL.map((s) => (
              <SmartLink
                key={s.label}
                href={s.href}
                className="text-sm text-foreground/65 transition-colors hover:text-foreground"
              >
                {s.label}
              </SmartLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
