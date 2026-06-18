import type { Metadata } from 'next';
import { ArrowRight, Database, Layers } from 'lucide-react';
import { getAccountOverview, getContextRecords, getContextSources } from '@/lib/account/server';
import { Badge, Card, EmptyState, PageHeader, ProvisionNotice } from '@/components/account/primitives';
import { ContextActions } from '@/components/account/context-actions';
import { SmartLink } from '@/components/ui/smart-link';

export const metadata: Metadata = {
  title: 'Context — Ailiur Account Center',
  robots: { index: false },
};

export const dynamic = 'force-dynamic';

type Kind = 'app' | 'provider';

const SOURCE_CATALOG: {
  key: string;
  name: string;
  type: string;
  kind: Kind;
  appSlug?: string;
  origin: string;
}[] = [
  { key: 'qetos', name: 'Qetos Health Context', type: 'health_context', kind: 'app', appSlug: 'qetos', origin: 'Qetos' },
  { key: 'enchiridion', name: 'Enchiridion Learning Context', type: 'learning_context', kind: 'app', appSlug: 'enchiridion', origin: 'Enchiridion' },
  { key: 'daymesh', name: 'Daymesh Life / Photo Context', type: 'health_context', kind: 'app', appSlug: 'daymesh', origin: 'Daymesh' },
  { key: 'oruvo', name: 'Oruvo Asset Context', type: 'finance_context', kind: 'app', appSlug: 'oruvo', origin: 'Oruvo' },
  { key: 'retellum', name: 'Retellum Media Context', type: 'media_context', kind: 'app', appSlug: 'retellum', origin: 'Retellum' },
  { key: 'tayzt', name: 'Tayzt Creative Context', type: 'creative_context', kind: 'app', appSlug: 'tayzt', origin: 'Tayzt' },
  { key: 'tellumetry', name: 'Tellumetry Project Context', type: 'project_context', kind: 'app', appSlug: 'tellumetry', origin: 'Tellumetry' },
  { key: 'gcal', name: 'Google Calendar Context', type: 'calendar_context', kind: 'provider', origin: 'Google Calendar' },
  { key: 'gmail', name: 'Gmail Context', type: 'communication_context', kind: 'provider', origin: 'Gmail' },
  { key: 'gdrive', name: 'Google Drive Context', type: 'document_context', kind: 'provider', origin: 'Google Drive' },
];

function StatusBadge({ status }: { status: string }) {
  if (status === 'active') return <Badge tone="green">Active</Badge>;
  if (status === 'connected') return <Badge tone="green">Connected</Badge>;
  if (status === 'empty') return <Badge tone="neutral">Empty</Badge>;
  if (status === 'coming_soon') return <Badge tone="amber">Sync coming soon</Badge>;
  return <Badge tone="neutral">Not connected</Badge>;
}

export default async function ContextPage() {
  const [overview, sources, records] = await Promise.all([
    getAccountOverview(),
    getContextSources(),
    getContextRecords(20),
  ]);

  const activeApps = new Set(
    (overview?.apps ?? []).filter((a) => a.access_status === 'active' && a.app).map((a) => a.app!.slug)
  );
  const googleConnected = (overview?.identities ?? []).some(
    (i) => i.provider === 'google' && i.connection_status === 'connected'
  );
  // DB sources by context_type → last_synced_at
  const dbByType = new Map(sources.map((s) => [s.context_type, s]));
  const recordCountByApp = new Map<string, number>();
  for (const r of records) {
    if (r.source_app) recordCountByApp.set(r.source_app, (recordCountByApp.get(r.source_app) ?? 0) + 1);
  }

  const cards = SOURCE_CATALOG.map((s) => {
    const db = dbByType.get(s.type);
    let status: string;
    if (s.kind === 'app') {
      const connected = activeApps.has(s.appSlug!);
      const hasRecords = (recordCountByApp.get(s.appSlug!) ?? 0) > 0;
      status = connected ? (hasRecords ? 'active' : 'empty') : 'not_connected';
    } else {
      // Provider (Google) sources: identity may be connected, but data sync is
      // not implemented yet — so the best we can truthfully show is connected
      // (sync coming) or not connected.
      status = googleConnected ? 'coming_soon' : 'not_connected';
    }
    return {
      ...s,
      status,
      lastUpdated: db?.last_synced_at ?? null,
    };
  });

  return (
    <>
      <PageHeader
        eyebrow="Context"
        title="Your Ailiur context"
        description="Context is what makes the ecosystem more than the sum of its apps. Each app keeps its own data; with your permission, the Context Mesh lets one app enrich another."
      />

      {!overview && <ProvisionNotice />}

      {/* Context sources */}
      <Card icon={Layers} title="Context sources" description="Where your context comes from" className="mb-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {cards.map((c) => (
            <div key={c.key} className="rounded-2xl border border-white/50 bg-white/25 p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{c.name}</p>
                  <p className="text-xs text-foreground/55">
                    {c.kind === 'app' ? 'Ailiur app' : 'External provider'} · {c.origin}
                  </p>
                </div>
                <StatusBadge status={c.status} />
              </div>
              <p className="mt-2 text-xs text-foreground/50">
                {c.lastUpdated ? `Updated ${new Date(c.lastUpdated).toLocaleDateString()}` : 'No data yet'}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent records */}
      <Card icon={Database} title="Recent context records" description="Normalized, never raw private payloads" className="mb-6">
        {records.length === 0 ? (
          <EmptyState
            icon={Database}
            title="No context recorded yet"
            body="As you use connected Ailiur apps, normalized context records appear here. Raw private data is never listed — only titles and summaries."
          />
        ) : (
          <div className="divide-y divide-white/40">
            {records.map((r) => (
              <div key={r.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">{r.title ?? r.context_type}</p>
                  {r.summary && <p className="truncate text-xs text-foreground/55">{r.summary}</p>}
                </div>
                <div className="shrink-0 text-right">
                  <Badge tone="neutral">{r.context_type}</Badge>
                  <p className="mt-1 text-xs text-foreground/45">
                    {new Date(r.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Cross-app permissions pointer */}
      <Card icon={Layers} title="Cross-app context permissions" className="mb-6">
        <p className="text-sm leading-relaxed text-foreground/70">
          Control which apps may read or write which categories of context in Privacy &amp;
          permissions. {overview?.permissions.length ?? 0} permission(s) currently set.
        </p>
        <SmartLink
          href="/account/privacy"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-green underline-offset-4 hover:underline"
        >
          Manage context permissions <ArrowRight className="h-4 w-4" />
        </SmartLink>
      </Card>

      {/* Import / export / delete */}
      <Card title="Your data">
        <ContextActions hasRecords={records.length > 0} />
      </Card>
    </>
  );
}
