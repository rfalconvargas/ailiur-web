import type { Metadata } from 'next';
import {
  ArrowRight,
  Blocks,
  CreditCard,
  Database,
  Plug,
  ShieldCheck,
  Lock,
  UserRound,
} from 'lucide-react';
import { auth } from '@/auth';
import { getAccountOverview, getContextSources } from '@/lib/account/server';
import { Badge, Card, PageHeader, ProvisionNotice, Row, StatCard } from '@/components/account/primitives';
import { SmartLink } from '@/components/ui/smart-link';

export const metadata: Metadata = {
  title: 'Ailiur Account Center',
  robots: { index: false },
};

// Reads the session + per-user data, so render at request time.
export const dynamic = 'force-dynamic';

const QUICK_ACTIONS = [
  { href: '/account/profile', label: 'Edit profile', icon: UserRound },
  { href: '/account/apps', label: 'Manage apps', icon: Blocks },
  { href: '/account/connections', label: 'Connect Google', icon: Plug },
  { href: '/account/billing', label: 'Billing', icon: CreditCard },
];

export default async function AccountHome() {
  const session = await auth();
  const overview = await getAccountOverview();
  const sources = overview ? await getContextSources() : [];

  const name =
    overview?.account.display_name || overview?.profile?.full_name || session?.user?.name || 'there';
  const email = overview?.account.email ?? session?.user?.email ?? '';
  const avatar = overview?.account.avatar_url ?? session?.user?.image ?? null;

  const connectedApps = (overview?.apps ?? []).filter((a) => a.access_status === 'active').length;
  const externalConns = (overview?.identities ?? []).filter((i) => i.connection_status === 'connected').length;
  const sourceCount = sources.length;
  const crossApp =
    (overview?.profile?.privacy_metadata as { cross_app_personalization?: boolean } | undefined)
      ?.cross_app_personalization === true;
  const loginMethods = (overview?.identities ?? []).length || 1; // ≥ email magic link

  return (
    <>
      <PageHeader
        eyebrow="Ailiur Account Center"
        title={`Welcome back, ${name}`}
        description="One account for your Ailiur apps, connected context, and personal AI systems."
      />

      {!overview && <ProvisionNotice />}

      {/* Profile summary */}
      <Card className="mb-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            {avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatar} alt="" referrerPolicy="no-referrer" className="h-16 w-16 rounded-full object-cover ring-2 ring-white/60" />
            ) : (
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground font-display text-2xl font-extrabold text-[#fffdf5]">
                {name.charAt(0).toUpperCase()}
              </span>
            )}
            <div>
              <h2 className="font-display text-xl font-extrabold tracking-tight text-foreground">{name}</h2>
              <p className="text-sm text-foreground/60">{email || 'No email on file'}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge tone="green">{overview?.account.status ?? 'active'}</Badge>
                <Badge tone="neutral">
                  {(overview?.account.onboarding_status ?? 'completed').replace('_', ' ')}
                </Badge>
              </div>
            </div>
          </div>
          <SmartLink
            href="/account/profile"
            className="inline-flex items-center gap-1.5 self-start rounded-full border border-white/70 bg-white/40 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/70"
          >
            Edit profile <ArrowRight className="h-4 w-4" />
          </SmartLink>
        </div>
      </Card>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={Blocks} label="Connected apps" value={connectedApps} href="/account/apps" />
        <StatCard icon={Plug} label="External accounts" value={externalConns} href="/account/connections" />
        <StatCard icon={Database} label="Context sources" value={sourceCount} href="/account/context" />
        <StatCard icon={Lock} label="Login methods" value={loginMethods} href="/account/security" />
      </div>

      {/* Status */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card icon={ShieldCheck} title="Privacy status">
          <div className="px-1">
            <Row label="Cross-app personalization" value={crossApp ? 'On' : 'Off (default)'} />
            <Row label="Data posture" value="Local-first" />
            <Row label="Context permissions" value={`${overview?.permissions.length ?? 0} set`} />
          </div>
          <SmartLink href="/account/privacy" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-green underline-offset-4 hover:underline">
            Manage privacy <ArrowRight className="h-4 w-4" />
          </SmartLink>
        </Card>

        <Card icon={Lock} title="Security status">
          <div className="px-1">
            <Row label="Primary sign-in" value="Ailiur (email link)" />
            <Row label="Google" value={externalConns > 0 ? 'Connected' : 'Not connected'} />
            <Row label="Passkeys" value="Not set up" />
          </div>
          <SmartLink href="/account/security" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-green underline-offset-4 hover:underline">
            Review security <ArrowRight className="h-4 w-4" />
          </SmartLink>
        </Card>
      </div>

      {/* Quick actions */}
      <h2 className="mb-3 mt-8 text-xs font-semibold uppercase tracking-widest text-foreground/50">
        Quick actions
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {QUICK_ACTIONS.map(({ href, label, icon: Icon }) => (
          <SmartLink
            key={href}
            href={href}
            className="glass group flex items-center gap-3 rounded-[var(--radius-card)] p-4 transition-transform hover:-translate-y-0.5"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-foreground/[0.06] text-foreground/70">
              <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
            </span>
            <span className="text-sm font-semibold text-foreground">{label}</span>
          </SmartLink>
        ))}
      </div>
    </>
  );
}
