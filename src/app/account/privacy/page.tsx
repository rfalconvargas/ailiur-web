import type { Metadata } from 'next';
import { ShieldCheck, Sparkles, Share2 } from 'lucide-react';
import { getAccountOverview } from '@/lib/account/server';
import { setAccountFlag, setAppPermission } from '@/lib/account/actions';
import { Card, EmptyState, PageHeader, ProvisionNotice } from '@/components/account/primitives';
import { ToggleControl } from '@/components/account/toggle-control';

export const metadata: Metadata = {
  title: 'Privacy & permissions — Account Center',
  robots: { index: false },
};

export const dynamic = 'force-dynamic';

// Named cross-app pairings (the product examples). Backed by privacy_metadata
// flags; the Context Mesh enforces them when cross-app reads happen.
const CROSS_APP = [
  {
    key: 'qetos_uses_daymesh',
    label: 'Allow Qetos to use Daymesh context',
    description: 'Let your metabolic tracking draw on your Daymesh life/photo signals.',
  },
  {
    key: 'enchiridion_cross_learning',
    label: 'Allow Enchiridion to use learning context across apps',
    description: 'Let learning adapt using signals from your other Ailiur apps.',
  },
  {
    key: 'oruvo_uses_tellumetry',
    label: 'Allow Oruvo to use Tellumetry project context',
    description: 'Let your life balance sheet reflect time invested in projects.',
  },
];

const APP_PERMS = [
  { perm: 'profile:read', label: 'Profile access', description: 'Read your name, avatar, and account basics.' },
  { perm: 'context:read', label: 'Read cross-app context', description: 'Use context from your other Ailiur apps.' },
  { perm: 'context:write', label: 'Contribute context', description: 'Add context other Ailiur apps can use, with consent.' },
];

export default async function PrivacyPage() {
  const overview = await getAccountOverview();
  const privacy = (overview?.profile?.privacy_metadata ?? {}) as Record<string, unknown>;
  const flag = (key: string) => privacy[key] === true;

  // Granted permissions set: `${app_id}:${permission}`.
  const granted = new Set(
    (overview?.permissions ?? [])
      .filter((p) => p.state === 'granted')
      .map((p) => `${p.app_id}:${p.permission}`)
  );

  const connectedApps = (overview?.apps ?? []).filter(
    (a) => a.access_status === 'active' && a.app
  );

  return (
    <>
      <PageHeader
        eyebrow="Privacy & permissions"
        title="You control your context"
        description="Ailiur is conservative by default: nothing is shared across apps until you turn it on. Everything here is transparent and reversible."
      />

      {!overview && <ProvisionNotice />}

      {/* Account-level personalization */}
      <Card icon={Sparkles} title="Personalization" description="How Ailiur uses your context" className="mb-6">
        <ToggleControl
          label="Allow cross-app personalization"
          description="Let your Ailiur apps improve each other using your shared, approved context. Off by default."
          defaultChecked={flag('cross_app_personalization')}
          action={setAccountFlag.bind(null, 'cross_app_personalization')}
        />
        <ToggleControl
          label="Use connected Google Calendar context"
          description="Let Ailiur use your connected Google Calendar to plan routines and time. Requires a Google connection."
          defaultChecked={flag('google_calendar_context')}
          action={setAccountFlag.bind(null, 'google_calendar_context')}
        />
        <ToggleControl
          label="Product improvement analytics"
          description="Share anonymized usage to help improve Ailiur. Never sells your data."
          defaultChecked={flag('product_analytics')}
          action={setAccountFlag.bind(null, 'product_analytics')}
        />
      </Card>

      {/* Named cross-app sharing */}
      <Card icon={Share2} title="Cross-app context sharing" description="Per-pair sharing (the ecosystem effect)" className="mb-6">
        {CROSS_APP.map((c) => (
          <ToggleControl
            key={c.key}
            label={c.label}
            description={c.description}
            defaultChecked={flag(c.key)}
            action={setAccountFlag.bind(null, c.key)}
          />
        ))}
      </Card>

      {/* Per-app permissions */}
      <Card icon={ShieldCheck} title="App permissions" description="What each connected app can access">
        {connectedApps.length === 0 ? (
          <EmptyState
            icon={ShieldCheck}
            title="No connected apps yet"
            body="Connect an Ailiur app to manage exactly what it can read or write. Until then, nothing has access to your context."
          />
        ) : (
          <div className="space-y-5">
            {connectedApps.map((a) => (
              <div key={a.id} className="rounded-2xl border border-white/50 bg-white/25 p-5">
                <h3 className="font-display text-sm font-extrabold tracking-tight text-foreground">
                  {a.app!.name}
                </h3>
                <div className="mt-1">
                  {APP_PERMS.map((p) => (
                    <ToggleControl
                      key={p.perm}
                      label={p.label}
                      description={p.description}
                      defaultChecked={granted.has(`${a.app_id}:${p.perm}`)}
                      action={setAppPermission.bind(null, a.app!.slug, p.perm)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}
