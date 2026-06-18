'use client';

import { useEffect, useState } from 'react';
import {
  Bell,
  CalendarSync,
  ChevronRight,
  CreditCard,
  Download,
  MessageCircle,
  Palette,
  Pencil,
  Plug,
  ShieldCheck,
  Trash2,
  User,
  type LucideIcon,
} from 'lucide-react';
import type { AccountOverview } from '@/lib/account/types';
import { cn } from '@/lib/utils';
import { useLifeOs } from '@/components/app/life-os-context';
import { useAiliurApp } from '@/components/app/app-context';
import { useLocalState } from '@/components/app/use-local-state';
import { Badge } from '@/components/app/app-ui';
import { COACHING_STYLES, INTENSITIES, domainLabel } from '@/components/app/life-os';

/**
 * Bottom-of-sidebar areas: Profile and Settings.
 *
 * The Profile screen is now backed by the real Ailiur Account: it fetches
 * /api/account/me and shows the canonical identity, connected login providers
 * (Google as an *attached* identity — not the account itself), and connected
 * Ailiur apps. Falls back to a calm signed-out prompt.
 */

// --- Profile -------------------------------------------------------------- //

function ProfileRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/40 py-3.5 last:border-0">
      <span className="text-sm text-foreground/55">{label}</span>
      <span className="text-right text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

function initialOf(name: string | null | undefined): string {
  return (name?.trim()?.charAt(0) || 'A').toUpperCase();
}

const AGE_RANGES = ['Prefer not to say', '18–24', '25–34', '35–44', '45–54', '55–64', '65+'];

/**
 * Life-OS profile: the goal/intensity/coaching/domain fields derived from the
 * goal interview, plus an optional age range (never date of birth). Rendered
 * for signed-in and signed-out users alike.
 */
function LifeProfilePanel() {
  const { interview, lifeMap } = useLifeOs();
  const { setSection } = useAiliurApp();
  const [ageRange, setAgeRange] = useLocalState('ailiur.profile.ageRange', 'Prefer not to say');

  const intensityLabel = INTENSITIES.find((i) => i.id === interview?.intensity)?.label ?? 'Not set';
  const coachingLabel = COACHING_STYLES.find((c) => c.id === interview?.coachingStyle)?.label ?? 'Not set';
  const primaryGoal = lifeMap?.ninetyDayNorthStar ?? 'Complete the goal interview to set this';
  const domains = lifeMap?.priorityDomains ?? [];
  let timezone = 'UTC';
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    /* non-fatal */
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
          Life profile
        </h3>
        <button
          type="button"
          onClick={() => setSection('goals')}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/55 px-3.5 py-1.5 text-xs font-semibold text-foreground/75 transition-colors hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
        >
          <Pencil className="h-3.5 w-3.5" /> Edit profile
        </button>
      </div>

      <div className="glass mt-3 rounded-[var(--radius-card)] px-6 py-2">
        <ProfileRow label="Primary goal" value={primaryGoal} />
        <ProfileRow label="Protocol intensity" value={intensityLabel} />
        <ProfileRow label="Coaching style" value={coachingLabel} />
        <ProfileRow label="Current plan" value="Ailiur Core" />
        <ProfileRow label="Timezone" value={timezone} />
        <div className="flex items-center justify-between gap-4 border-b border-white/40 py-3 last:border-0">
          <span className="text-sm text-foreground/55">Age range (optional)</span>
          <select
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
            className="rounded-xl border border-white/60 bg-white/50 px-3 py-1.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-accent-green"
          >
            {AGE_RANGES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Linked domains */}
      <h4 className="mt-6 text-xs font-semibold uppercase tracking-widest text-foreground/50">
        Linked domains
      </h4>
      <div className="mt-3 flex flex-wrap gap-2">
        {domains.length ? (
          domains.map((d) => (
            <Badge key={d.id} tint="var(--accent-green)">
              {domainLabel(d.id)}
            </Badge>
          ))
        ) : (
          <p className="text-sm text-foreground/55">No domains yet — set them in your goals.</p>
        )}
      </div>
    </div>
  );
}

export function ProfileScreen() {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<AccountOverview | null>(null);

  useEffect(() => {
    let active = true;
    fetch('/api/account/me', { credentials: 'include' })
      .then((r) => r.json())
      .then((d: { authenticated: boolean; overview: AccountOverview | null }) => {
        if (active) setOverview(d.overview);
      })
      .catch(() => {
        /* signed-out / offline — show the fallback */
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="max-w-xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
          Profile
        </span>
        <div className="mt-6 h-24 animate-pulse rounded-[var(--radius-card)] bg-white/40" />
      </div>
    );
  }

  if (!overview) {
    return (
      <div className="max-w-xl">
        <span className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
          Profile
        </span>
        <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-foreground">
          Sign in to your Ailiur Account
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-foreground/70">
          One identity across every Ailiur app. Your account is the canonical
          you — Google and other providers attach to it.
        </p>
        <a
          href="/login"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-green px-6 py-3 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
        >
          Sign in with Ailiur
        </a>

        <div className="mt-10">
          <LifeProfilePanel />
        </div>
      </div>
    );
  }

  const { account, profile, identities, apps } = overview;
  const name = account.display_name || profile?.full_name || 'Your name';

  return (
    <div className="max-w-xl">
      <span className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
        Ailiur Account
      </span>
      <div className="mt-5 flex items-center gap-4">
        {account.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={account.avatar_url}
            alt=""
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground font-display text-2xl font-extrabold text-[#fffdf5]"
          >
            {initialOf(name)}
          </span>
        )}
        <div>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-foreground">
            {name}
          </h2>
          <p className="text-sm text-foreground/60">{account.email ?? 'No email on file'}</p>
        </div>
      </div>

      <div className="glass mt-8 rounded-[var(--radius-card)] px-6 py-2">
        <ProfileRow label="Account ID" value={account.id.slice(0, 8) + '…'} />
        <ProfileRow label="Status" value={account.status} />
        <ProfileRow label="Onboarding" value={account.onboarding_status.replace('_', ' ')} />
        <ProfileRow label="Timezone" value={profile?.timezone ?? 'UTC'} />
        <ProfileRow
          label="Last login"
          value={account.last_login_at ? new Date(account.last_login_at).toLocaleString() : '—'}
        />
      </div>

      {/* Connected login providers — Google attaches HERE, not as the account. */}
      <h3 className="mt-8 text-xs font-semibold uppercase tracking-widest text-foreground/50">
        Connected identities
      </h3>
      <div className="glass mt-3 rounded-[var(--radius-card)] px-6 py-2">
        {identities.length === 0 ? (
          <p className="py-3.5 text-sm text-foreground/55">No connected providers.</p>
        ) : (
          identities.map((id) => (
            <ProfileRow
              key={id.id}
              label={id.provider.charAt(0).toUpperCase() + id.provider.slice(1)}
              value={
                (id.provider_email ?? id.connection_status) +
                (id.is_primary_login ? ' · primary' : '')
              }
            />
          ))
        )}
      </div>

      {/* Connected Ailiur apps */}
      <h3 className="mt-8 text-xs font-semibold uppercase tracking-widest text-foreground/50">
        Connected apps
      </h3>
      <div className="glass mt-3 rounded-[var(--radius-card)] px-6 py-2">
        {apps.length === 0 ? (
          <p className="py-3.5 text-sm text-foreground/55">No apps connected yet.</p>
        ) : (
          apps.map((a) => (
            <ProfileRow
              key={a.id}
              label={a.app?.name ?? 'Unknown app'}
              value={a.access_status}
            />
          ))
        )}
      </div>

      <div className="mt-10">
        <LifeProfilePanel />
      </div>
    </div>
  );
}

// --- Settings ------------------------------------------------------------- //

type SettingCategory = { icon: LucideIcon; title: string; blurb: string };

// Account + everyday preferences (Privacy gets its own prominent card above).
const SETTINGS: SettingCategory[] = [
  { icon: User, title: 'Account', blurb: 'Identity, email, and connected providers.' },
  { icon: Plug, title: 'Integrations', blurb: 'Connect the tools you already use.' },
  { icon: CalendarSync, title: 'Calendar sync', blurb: 'Mirror routines to Google or Notion Calendar.' },
  { icon: MessageCircle, title: 'Coaching style', blurb: 'How direct or gentle Ailiur should be with you.' },
  { icon: Bell, title: 'Notifications', blurb: 'Choose what is worth interrupting you.' },
  { icon: Palette, title: 'Appearance', blurb: 'Theme and density of the app.' },
  { icon: CreditCard, title: 'Billing', blurb: 'Plan, invoices, and payment method.' },
];

function Toggle({ on, onToggle, label }: { on: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onToggle}
      className={cn(
        'relative h-7 w-12 shrink-0 rounded-full transition-colors',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
        on ? 'bg-accent-green' : 'bg-foreground/20'
      )}
    >
      <span
        className={cn(
          'absolute top-1 h-5 w-5 rounded-full bg-white transition-transform',
          on ? 'translate-x-6' : 'translate-x-1'
        )}
      />
    </button>
  );
}

function SettingRow({ icon: Icon, title, blurb }: SettingCategory) {
  return (
    <button
      type="button"
      className="glass group flex items-center gap-4 rounded-[var(--radius-card)] p-5 text-left transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-foreground/[0.06] text-foreground/70">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-foreground">{title}</span>
        <span className="block text-xs text-foreground/60">{blurb}</span>
      </span>
      <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-foreground/40" />
    </button>
  );
}

export function SettingsScreen() {
  const [localFirst, setLocalFirst] = useLocalState('ailiur.settings.localFirst', true);

  return (
    <div className="max-w-3xl">
      <span className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
        Settings
      </span>
      <h2 className="mt-3 font-display text-[clamp(1.9rem,3.5vw,3rem)] font-extrabold tracking-tight text-foreground">
        Tune how Ailiur works for you.
      </h2>

      {/* Prominent privacy / local-first control */}
      <div className="glass mt-8 rounded-[var(--radius-card)] border-l-4 border-l-accent-green p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-green/15 text-accent-green">
            <ShieldCheck className="h-6 w-6" strokeWidth={2} />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg font-extrabold tracking-tight text-foreground">
              Privacy &amp; local-first data
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-foreground/70">
              Keep personal context local by default. Only sync or send data when I explicitly
              choose.
            </p>
          </div>
          <Toggle on={localFirst} onToggle={() => setLocalFirst((v) => !v)} label="Local-first data" />
        </div>
        <p className="mt-3 text-xs text-foreground/50">
          {localFirst
            ? 'On — your goals, check-ins, and routines stay on this device until you sync.'
            : 'Off — Ailiur may sync your context to connected services.'}
        </p>
      </div>

      {/* Everyday categories */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {SETTINGS.map((s) => (
          <SettingRow key={s.title} {...s} />
        ))}
      </div>

      {/* Data controls */}
      <h3 className="mt-8 text-xs font-semibold uppercase tracking-widest text-foreground/50">
        Your data
      </h3>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <SettingRow icon={Download} title="Data export" blurb="Download everything Ailiur holds for you." />
        <button
          type="button"
          className="group flex items-center gap-4 rounded-[var(--radius-card)] border border-accent-red/30 bg-accent-red/[0.06] p-5 text-left transition-colors hover:bg-accent-red/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-red"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-accent-red/15 text-accent-red">
            <Trash2 className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-semibold text-accent-red">Delete account</span>
            <span className="block text-xs text-foreground/55">
              Permanently remove your account and data.
            </span>
          </span>
          <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-accent-red/50" />
        </button>
      </div>
    </div>
  );
}
