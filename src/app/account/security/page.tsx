import type { Metadata } from 'next';
import { Check, Fingerprint, KeyRound, Mail, MonitorSmartphone } from 'lucide-react';
import { getAccountSessions, getExternalIdentities } from '@/lib/account/server';
import { Badge, Card, EmptyState, PageHeader, Row } from '@/components/account/primitives';
import { DangerZone } from '@/components/account/danger-zone';

export const metadata: Metadata = {
  title: 'Security — Ailiur Account Center',
  robots: { index: false },
};

export const dynamic = 'force-dynamic';

export default async function SecurityPage() {
  const [identities, sessions] = await Promise.all([
    getExternalIdentities(),
    getAccountSessions(),
  ]);

  const google = identities.find((i) => i.provider === 'google');
  const googleConnected = google?.connection_status === 'connected';

  return (
    <>
      <PageHeader
        eyebrow="Security"
        title="Sign-in & security"
        description="How you access your Ailiur Account, and the providers attached to it."
      />

      {/* Sign-in methods */}
      <Card icon={KeyRound} title="Sign-in methods" className="mb-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/50 bg-white/25 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-accent-green/15 text-accent-green">
                <Mail className="h-[18px] w-[18px]" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Email magic link</p>
                <p className="text-xs text-foreground/55">Your primary, passwordless Ailiur sign-in.</p>
              </div>
            </div>
            <Badge tone="green">
              <Check className="h-3 w-3" strokeWidth={3} /> Active
            </Badge>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/50 bg-white/25 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/70">
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
                  <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Google</p>
                <p className="text-xs text-foreground/55">
                  {googleConnected ? google?.provider_email ?? 'Connected provider' : 'Connect to sign in with Google'}
                </p>
              </div>
            </div>
            {googleConnected ? <Badge tone="green">Connected</Badge> : <Badge tone="neutral">Not connected</Badge>}
          </div>

          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/50 bg-white/25 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-foreground/[0.06] text-foreground/60">
                <Fingerprint className="h-[18px] w-[18px]" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Passkeys</p>
                <p className="text-xs text-foreground/55">Hardware-backed sign-in — planned.</p>
              </div>
            </div>
            <Badge tone="neutral">Coming soon</Badge>
          </div>
        </div>
      </Card>

      {/* Active sessions */}
      <Card icon={MonitorSmartphone} title="Active sessions" description="Where your account is signed in" className="mb-6">
        {sessions.length === 0 ? (
          <EmptyState
            icon={MonitorSmartphone}
            title="Session list not populated yet"
            body="Sessions are stateless (JWT) today, so the device ledger isn't recorded. Populating account_sessions on sign-in is a planned feature — see the security TODOs."
          />
        ) : (
          <div className="px-1">
            {sessions.map((s) => (
              <Row
                key={s.id}
                label={s.user_agent ?? 'Unknown device'}
                hint={s.ip_address ?? undefined}
                value={`Last seen ${new Date(s.last_seen_at).toLocaleString()}`}
              />
            ))}
          </div>
        )}
      </Card>

      {/* Danger zone */}
      <Card title="Account">
        <DangerZone />
      </Card>
    </>
  );
}
