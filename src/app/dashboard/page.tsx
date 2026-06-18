import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ArrowUpRight, Boxes, Plug, ShieldCheck, Sparkles, UserRound } from 'lucide-react';
import { auth } from '@/auth';
import { getAccountOverview } from '@/lib/account/server';
import { APP_CATALOG } from '@/lib/account/app-registry';
import { AccountCenterButton } from '@/components/dashboard/account-center-button';
import { GoogleConnection } from '@/components/dashboard/google-connection';
import { SmartLink } from '@/components/ui/smart-link';

export const metadata: Metadata = {
  title: 'Your Ailiur Account',
  robots: { index: false },
};

function Card({
  icon: Icon,
  title,
  children,
  className = '',
}: {
  icon: typeof UserRound;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`glass rounded-[var(--radius-card)] p-6 ${className}`}>
      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-foreground/[0.06] text-foreground/70">
          <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
        </span>
        <h2 className="font-display text-base font-extrabold tracking-tight text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/40 py-2.5 last:border-0">
      <span className="text-sm text-foreground/55">{label}</span>
      <span className="text-right text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login?callbackUrl=/dashboard');
  }

  const overview = await getAccountOverview();

  // New users (or anyone mid-onboarding) go to onboarding first. We only gate
  // when the account row actually exists — if it's missing (e.g. migrations not
  // yet applied), we fall back to a session-based view instead of looping.
  if (overview && overview.account.onboarding_status !== 'completed') {
    redirect('/onboarding');
  }

  const name =
    overview?.account.display_name || overview?.profile?.full_name || session.user.name || 'there';
  const email = overview?.account.email ?? session.user.email ?? '';
  const avatar = overview?.account.avatar_url ?? session.user.image ?? null;

  const googleIdentity = overview?.identities.find((i) => i.provider === 'google');
  const googleStatus: 'connected' | 'revoked' | 'none' = googleIdentity
    ? googleIdentity.connection_status === 'connected'
      ? 'connected'
      : 'revoked'
    : 'none';

  const connectedApps = overview?.apps ?? [];
  const crossApp =
    (overview?.profile?.privacy_metadata as { cross_app_context?: string } | undefined)
      ?.cross_app_context === 'enabled';

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-24 pt-32">
      {/* Header */}
      <div className="glass-strong flex flex-col gap-5 rounded-[var(--radius-panel)] p-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar}
              alt=""
              referrerPolicy="no-referrer"
              className="h-16 w-16 rounded-full object-cover ring-2 ring-white/60"
            />
          ) : (
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground font-display text-2xl font-extrabold text-[#fffdf5]">
              {name.charAt(0).toUpperCase()}
            </span>
          )}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
              Ailiur Account
            </p>
            <h1 className="font-display text-[clamp(1.6rem,3.5vw,2.3rem)] font-extrabold leading-tight tracking-tight text-foreground">
              Welcome back, {name}
            </h1>
            {email && <p className="text-sm text-foreground/60">{email}</p>}
          </div>
        </div>
        <AccountCenterButton />
      </div>

      {!overview && (
        <div className="mt-5 rounded-[var(--radius-card)] border border-accent-red/30 bg-accent-red/10 px-5 py-4 text-sm text-foreground/80">
          You’re signed in, but your Ailiur Account record isn’t provisioned yet. Apply the database
          migrations (<span className="font-mono text-xs">supabase db push</span>) to unlock your
          full account profile, connected apps, and context.
        </div>
      )}

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Profile / status */}
        <Card icon={UserRound} title="Profile & status">
          <div className="px-1">
            <Row label="Display name" value={overview?.account.display_name || name} />
            <Row label="Account status" value={overview?.account.status ?? 'active'} />
            <Row
              label="Onboarding"
              value={(overview?.account.onboarding_status ?? 'completed').replace('_', ' ')}
            />
            <Row label="Handle" value={overview?.account.handle ? `@${overview.account.handle}` : '—'} />
            <Row
              label="Member since"
              value={
                overview?.account.created_at
                  ? new Date(overview.account.created_at).toLocaleDateString()
                  : '—'
              }
            />
          </div>
        </Card>

        {/* Connected providers / Google */}
        <Card icon={Plug} title="Connected providers">
          {overview && overview.identities.length > 0 ? (
            <div className="mb-4 px-1">
              {overview.identities.map((id) => (
                <Row
                  key={id.id}
                  label={id.provider.charAt(0).toUpperCase() + id.provider.slice(1)}
                  value={
                    (id.provider_email ?? id.connection_status) + (id.is_primary_login ? ' · primary' : '')
                  }
                />
              ))}
            </div>
          ) : (
            <p className="mb-4 px-1 text-sm text-foreground/55">
              Your Ailiur Account is your identity. Attach providers below.
            </p>
          )}
          <div className="rounded-2xl bg-white/30 p-4">
            <GoogleConnection status={googleStatus} />
          </div>
        </Card>

        {/* Connected apps */}
        <Card icon={Boxes} title="Connected apps">
          {connectedApps.length > 0 ? (
            <div className="px-1">
              {connectedApps.map((a) => (
                <Row key={a.id} label={a.app?.name ?? 'Unknown app'} value={a.access_status} />
              ))}
            </div>
          ) : (
            <p className="px-1 text-sm text-foreground/55">
              No apps connected yet. Explore available products below to get started.
            </p>
          )}
        </Card>

        {/* Privacy & context */}
        <Card icon={ShieldCheck} title="Privacy & context">
          <div className="px-1">
            <Row label="Cross-app context" value={crossApp ? 'Enabled' : 'Off (default)'} />
            <Row label="Storage" value="Local-first" />
            <Row label="Context permissions" value={`${overview?.permissions.length ?? 0} granted`} />
          </div>
          <p className="mt-4 px-1 text-xs leading-relaxed text-foreground/60">
            You control which apps can read or write which categories of context. Manage this in the
            Account Center.
          </p>
        </Card>
      </div>

      {/* Available products */}
      <section className="mt-8">
        <div className="mb-4 flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-foreground/[0.06] text-foreground/70">
            <Sparkles className="h-[18px] w-[18px]" strokeWidth={2} />
          </span>
          <h2 className="font-display text-base font-extrabold tracking-tight text-foreground">
            Available across the ecosystem
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {APP_CATALOG.filter((a) => a.category === 'consumer' || a.slug === 'ucm').map((app) => (
            <SmartLink
              key={app.slug}
              href={app.url}
              className="glass group flex items-center gap-4 rounded-[var(--radius-card)] p-5 transition-transform hover:-translate-y-0.5"
            >
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
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1 font-display text-sm font-extrabold tracking-tight text-foreground">
                  {app.name}
                  {app.status === 'coming_soon' && (
                    <span className="rounded-full bg-foreground/[0.07] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground/55">
                      Soon
                    </span>
                  )}
                </span>
                <span className="block truncate text-xs text-foreground/60">{app.description}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </SmartLink>
          ))}
        </div>
      </section>
    </main>
  );
}
