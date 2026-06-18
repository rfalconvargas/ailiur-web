import type { Metadata } from 'next';
import { Blocks, Check } from 'lucide-react';
import { getAppRegistry, getAppPermissions, getAuthorizedApps } from '@/lib/account/server';
import { APP_CATALOG } from '@/lib/account/app-registry';
import type { AppCategory, AppStatus } from '@/lib/account/types';
import { Badge, Card, PageHeader } from '@/components/account/primitives';
import { AppCardActions } from '@/components/account/app-card-actions';

export const metadata: Metadata = {
  title: 'Ailiur apps — Account Center',
  robots: { index: false },
};

export const dynamic = 'force-dynamic';

type RegApp = {
  slug: string;
  name: string;
  description: string;
  category: AppCategory;
  status: AppStatus;
  url: string | null;
  brandColor: string;
};

type Access = 'active' | 'pending' | 'revoked' | 'none';

function statusBadge(status: AppStatus) {
  if (status === 'coming_soon') return <Badge tone="amber">Coming soon</Badge>;
  if (status === 'disabled') return <Badge tone="neutral">Unavailable</Badge>;
  return <Badge tone="green">Available</Badge>;
}

function AppCard({
  app,
  access,
  permCount,
}: {
  app: RegApp;
  access: Access;
  permCount: number;
}) {
  return (
    <div className="glass flex flex-col rounded-[var(--radius-card)] p-5">
      <div className="flex items-start gap-3">
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-extrabold"
          style={{
            backgroundColor: `color-mix(in srgb, ${app.brandColor} 18%, transparent)`,
            color: app.brandColor,
          }}
        >
          {app.name.charAt(0)}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-base font-extrabold tracking-tight text-foreground">{app.name}</h3>
            {statusBadge(app.status)}
            {access === 'active' && (
              <Badge tone="green">
                <Check className="h-3 w-3" strokeWidth={3} /> Connected
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-foreground/65">{app.description}</p>
          {permCount > 0 && (
            <p className="mt-1.5 text-xs text-foreground/50">{permCount} permission{permCount === 1 ? '' : 's'} granted</p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <AppCardActions slug={app.slug} url={app.url} status={app.status} access={access} />
      </div>
    </div>
  );
}

function Group({
  title,
  subtitle,
  apps,
  accessFor,
  permsFor,
}: {
  title: string;
  subtitle: string;
  apps: RegApp[];
  accessFor: (slug: string) => Access;
  permsFor: (slug: string) => number;
}) {
  if (apps.length === 0) return null;
  return (
    <section className="mb-8">
      <div className="mb-3">
        <h2 className="font-display text-lg font-extrabold tracking-tight text-foreground">{title}</h2>
        <p className="text-sm text-foreground/60">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {apps.map((app) => (
          <AppCard key={app.slug} app={app} access={accessFor(app.slug)} permCount={permsFor(app.slug)} />
        ))}
      </div>
    </section>
  );
}

export default async function AppsPage() {
  const [registry, authorized, perms] = await Promise.all([
    getAppRegistry(),
    getAuthorizedApps(),
    getAppPermissions(),
  ]);

  // Use the live DB registry when present; otherwise fall back to the TS catalog
  // so the page is always populated (e.g. before migrations are applied).
  const apps: RegApp[] =
    registry.length > 0
      ? registry.map((a) => ({
          slug: a.slug,
          name: a.name,
          description: a.description ?? '',
          category: a.category,
          status: a.status,
          url: a.url,
          brandColor: a.brand_color ?? 'var(--accent-green)',
        }))
      : APP_CATALOG.map((a) => ({
          slug: a.slug,
          name: a.name,
          description: a.description,
          category: a.category,
          status: a.status,
          url: a.url,
          brandColor: a.brandColor,
        }));

  // slug -> access status
  const accessBySlug = new Map<string, Access>();
  for (const row of authorized) {
    if (row.app?.slug) accessBySlug.set(row.app.slug, row.access_status as Access);
  }
  const accessFor = (slug: string): Access => accessBySlug.get(slug) ?? 'none';

  // slug -> granted-permission count (needs DB ids; 0 in fallback mode)
  const idToSlug = new Map(registry.map((a) => [a.id, a.slug]));
  const permCountBySlug = new Map<string, number>();
  for (const p of perms) {
    if (p.state !== 'granted') continue;
    const slug = idToSlug.get(p.app_id);
    if (slug) permCountBySlug.set(slug, (permCountBySlug.get(slug) ?? 0) + 1);
  }
  const permsFor = (slug: string) => permCountBySlug.get(slug) ?? 0;

  const isComingSoon = (a: RegApp) => a.status === 'coming_soon' || a.status === 'disabled';
  const live = apps.filter((a) => !isComingSoon(a));

  const consumer = live.filter((a) => a.category === 'consumer');
  const platform = live.filter((a) => a.category === 'enterprise' || a.category === 'internal');
  const providerInst = live.filter((a) => a.category === 'provider' || a.category === 'institution');
  const comingSoon = apps.filter(isComingSoon);

  return (
    <>
      <PageHeader
        eyebrow="Ailiur apps"
        title="Your ecosystem"
        description="Every Ailiur app shares one account. Connect the apps you use; each keeps its own data and can share context only when you allow it."
      />

      {apps.length === 0 && (
        <Card>
          <div className="flex items-center gap-3 text-sm text-foreground/60">
            <Blocks className="h-5 w-5" /> No apps in the registry yet.
          </div>
        </Card>
      )}

      <Group title="Consumer apps" subtitle="Personal apps across your ecosystem." apps={consumer} accessFor={accessFor} permsFor={permsFor} />
      <Group title="Platform & enterprise" subtitle="The context layer and organization-scale apps." apps={platform} accessFor={accessFor} permsFor={permsFor} />
      <Group title="Provider & institution" subtitle="For clinicians, schools, and advisors." apps={providerInst} accessFor={accessFor} permsFor={permsFor} />
      <Group title="Coming soon" subtitle="Not available yet — request access to be notified." apps={comingSoon} accessFor={accessFor} permsFor={permsFor} />
    </>
  );
}
