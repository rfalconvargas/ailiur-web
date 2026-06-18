'use client';

import { useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge, Drawer, ScreenHeader } from '@/components/app/app-ui';

// --- Data model ----------------------------------------------------------- //

export type AppStatus = 'live' | 'demo' | 'waitlist' | 'coming-soon';
export type AppPlan = 'core' | 'mesh' | 'operator' | 'enterprise';
export type AppCategory = 'consumer' | 'enterprise';

export interface AppEntry {
  id: string;
  name: string;
  category: AppCategory;
  description: string;
  status: AppStatus;
  plan: AppPlan;
  url?: string; // launch target; absent ⇒ not yet reachable
  waitlistUrl?: string;
}

const STATUS_LABEL: Record<AppStatus, string> = {
  live: 'Live',
  demo: 'Demo',
  waitlist: 'Waitlist',
  'coming-soon': 'Coming Soon',
};

const STATUS_TINT: Record<AppStatus, string> = {
  live: 'var(--accent-green)',
  demo: 'var(--ketofy)',
  waitlist: 'var(--enchiridion)',
  'coming-soon': 'var(--accent-red)',
};

const PLAN_LABEL: Record<AppPlan, string> = {
  core: 'Core',
  mesh: 'Mesh',
  operator: 'Operator',
  enterprise: 'Enterprise',
};

// Placeholder waitlist form — swap for the real Google Form URL later.
const WAITLIST_URL = 'https://forms.gle/ailiur-waitlist';

/** The full Ailiur app catalog. Product discovery lives here now, not on the homepage. */
export const APP_CATALOG: AppEntry[] = [
  // Consumer
  { id: 'qetos', name: 'Qetos', category: 'consumer', description: 'Metabolic & energy tracking that feeds your daily protocol.', status: 'live', plan: 'mesh', url: 'https://qetos.ailiur.com' },
  { id: 'enchiridion', name: 'Enchiridion', category: 'consumer', description: 'Guided learning that turns goals into mastered skills.', status: 'live', plan: 'mesh', url: 'https://enchiridion.ailiur.com' },
  { id: 'oruvo', name: 'Oruvo', category: 'consumer', description: 'Your life balance sheet — assets, time, and money in one view.', status: 'demo', plan: 'mesh', url: 'https://oruvo.ailiur.com' },
  { id: 'retellum', name: 'Retellum', category: 'consumer', description: 'A log-first memory for everything you read, watch, and play.', status: 'demo', plan: 'core', url: 'https://retellum.ailiur.com' },
  { id: 'tayzt', name: 'Tayzt', category: 'consumer', description: 'Atmosphere & taste — the spaces and flavors that set your mood.', status: 'waitlist', plan: 'core', url: 'https://tayzt.ailiur.com', waitlistUrl: WAITLIST_URL },
  { id: 'tellumetry', name: 'Tellumetry', category: 'consumer', description: 'An agent telemetry cockpit for your automated workflows.', status: 'demo', plan: 'operator', url: 'https://tellumetry.ailiur.com' },
  { id: 'daymesh', name: 'Daymesh', category: 'consumer', description: 'A biometric camera roll that turns your days into signal.', status: 'waitlist', plan: 'core', url: 'https://daymesh.ailiur.com', waitlistUrl: WAITLIST_URL },

  // Enterprise
  { id: 'civis', name: 'Civis', category: 'enterprise', description: 'Civic operations and community programs at scale.', status: 'coming-soon', plan: 'enterprise', waitlistUrl: WAITLIST_URL },
  { id: 'iris', name: 'Iris', category: 'enterprise', description: 'Population-level insight built on the Context Mesh.', status: 'coming-soon', plan: 'enterprise', waitlistUrl: WAITLIST_URL },
  { id: 'aptellum', name: 'Aptellum', category: 'enterprise', description: 'A co-op outreach studio for member organizations.', status: 'demo', plan: 'enterprise', url: 'https://aptellum.ailiur.com' },
  { id: 'qetos-provider', name: 'Qetos Provider', category: 'enterprise', description: 'Metabolic care tooling for clinics and providers.', status: 'waitlist', plan: 'enterprise', url: 'https://qetosclinics.ailiur.com', waitlistUrl: WAITLIST_URL },
  { id: 'enchiridion-institution', name: 'Enchiridion Institution', category: 'enterprise', description: 'Guided learning for schools, districts, and educators.', status: 'waitlist', plan: 'enterprise', url: 'https://enchiridionschools.ailiur.com', waitlistUrl: WAITLIST_URL },
  { id: 'oruvo-advisors', name: 'Oruvo Advisors', category: 'enterprise', description: 'Life balance sheets for financial advisors and their clients.', status: 'waitlist', plan: 'enterprise', waitlistUrl: WAITLIST_URL },
  { id: 'ucm-api', name: 'Unified Context Mesh API', category: 'enterprise', description: 'The shared context layer every Ailiur app is built on.', status: 'demo', plan: 'enterprise', url: 'https://ucm.ailiur.com' },
];

function openTab(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

// --- App card ------------------------------------------------------------- //

function AppCard({ app, onLearnMore }: { app: AppEntry; onLearnMore: () => void }) {
  return (
    <div className="glass flex flex-col rounded-[var(--radius-card)] p-5">
      <div className="flex items-start gap-3.5">
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-extrabold"
          style={{
            backgroundColor: `color-mix(in srgb, ${STATUS_TINT[app.status]} 18%, transparent)`,
            color: STATUS_TINT[app.status],
          }}
        >
          {app.name.charAt(0)}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-extrabold tracking-tight text-foreground">{app.name}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            <Badge tint={STATUS_TINT[app.status]}>{STATUS_LABEL[app.status]}</Badge>
            <Badge>{PLAN_LABEL[app.plan]}</Badge>
          </div>
        </div>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/65">{app.description}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/40 pt-4">
        <button
          type="button"
          onClick={() => app.url && openTab(app.url)}
          disabled={!app.url}
          className={cn(
            'inline-flex items-center gap-1 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
            app.url
              ? 'bg-accent-green text-[#fffdf5] hover:-translate-y-0.5'
              : 'cursor-not-allowed bg-white/40 text-foreground/40'
          )}
        >
          Launch <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={onLearnMore}
          className="rounded-full px-3 py-1.5 text-xs font-semibold text-foreground/70 transition-colors hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
        >
          Learn more
        </button>
        {(app.status === 'waitlist' || app.status === 'coming-soon') && (
          <button
            type="button"
            onClick={() => openTab(app.waitlistUrl ?? WAITLIST_URL)}
            className="rounded-full px-3 py-1.5 text-xs font-semibold text-accent-green transition-colors hover:bg-accent-green/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
          >
            Join waitlist
          </button>
        )}
      </div>
    </div>
  );
}

// --- Section -------------------------------------------------------------- //

export function WorkspaceScreen() {
  const [detail, setDetail] = useState<AppEntry | null>(null);
  const consumer = APP_CATALOG.filter((a) => a.category === 'consumer');
  const enterprise = APP_CATALOG.filter((a) => a.category === 'enterprise');

  return (
    <div className="mx-auto max-w-5xl">
      <ScreenHeader
        eyebrow="Workspace"
        title="Launch every Ailiur app from one place."
        body="Each app is a specialized surface of the same system. Your goals, routines, and context follow you in through the Context Mesh."
      />

      <section className="mt-8">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground/50">Consumer</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {consumer.map((a) => (
            <AppCard key={a.id} app={a} onLearnMore={() => setDetail(a)} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground/50">Enterprise</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {enterprise.map((a) => (
            <AppCard key={a.id} app={a} onLearnMore={() => setDetail(a)} />
          ))}
        </div>
      </section>

      {/* Learn-more detail panel */}
      <Drawer open={!!detail} onClose={() => setDetail(null)} title={detail?.name ?? 'App'}>
        {detail && (
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge tint={STATUS_TINT[detail.status]}>{STATUS_LABEL[detail.status]}</Badge>
              <Badge>{PLAN_LABEL[detail.plan]} plan</Badge>
              <Badge>{detail.category === 'consumer' ? 'Consumer' : 'Enterprise'}</Badge>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/75">{detail.description}</p>
            <p className="mt-3 text-xs text-foreground/50">
              {detail.url ? `Lives at ${detail.url.replace('https://', '')}` : 'Subdomain coming soon.'}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {detail.url && (
                <button
                  type="button"
                  onClick={() => openTab(detail.url!)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent-green px-5 py-2.5 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
                >
                  Launch app <ExternalLink className="h-4 w-4" />
                </button>
              )}
              {(detail.status === 'waitlist' || detail.status === 'coming-soon') && (
                <button
                  type="button"
                  onClick={() => openTab(detail.waitlistUrl ?? WAITLIST_URL)}
                  className="rounded-full bg-white/55 px-5 py-2.5 text-sm font-semibold text-foreground/80 transition-colors hover:bg-white/80"
                >
                  Join waitlist
                </button>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
