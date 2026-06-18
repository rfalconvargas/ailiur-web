import type { Metadata } from 'next';
import { Plug } from 'lucide-react';
import { getExternalIdentities, getConnectedAccounts } from '@/lib/account/server';
import { Card, EmptyState, PageHeader } from '@/components/account/primitives';
import { GoogleConnectionCard } from '@/components/account/connection-card';

export const metadata: Metadata = {
  title: 'Connections — Ailiur Account Center',
  robots: { index: false },
};

export const dynamic = 'force-dynamic';

const FUTURE_PROVIDERS = ['Apple', 'GitHub', 'Notion', 'Spotify'];

export default async function ConnectionsPage() {
  const [identities, connected] = await Promise.all([
    getExternalIdentities(),
    getConnectedAccounts(),
  ]);

  const google = identities.find((i) => i.provider === 'google');
  const googleStatus: 'connected' | 'revoked' | 'none' = google
    ? google.connection_status === 'connected'
      ? 'connected'
      : 'revoked'
    : 'none';

  const googleConn = connected.find((c) => c.provider.startsWith('google'));
  const grantedScopes = [...(google?.scopes ?? []), ...(googleConn?.scopes ?? [])];

  return (
    <>
      <PageHeader
        eyebrow="Connections"
        title="Connected accounts"
        description="Bring outside context into your Ailiur Account. These are data sources you connect — your Ailiur Account remains your identity."
      />

      <div className="space-y-5">
        <GoogleConnectionCard
          status={googleStatus}
          providerEmail={google?.provider_email ?? null}
          grantedScopes={grantedScopes}
          lastSync={googleConn?.last_synced_at ?? null}
        />

        <Card icon={Plug} title="More providers" description="Coming soon">
          <EmptyState
            icon={Plug}
            title="Apple, GitHub, Notion & more"
            body={`We're adding more connectable context sources: ${FUTURE_PROVIDERS.join(', ')}. Each will attach to your Ailiur Account just like Google.`}
          />
        </Card>
      </div>
    </>
  );
}
