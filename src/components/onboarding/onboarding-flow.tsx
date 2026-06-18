'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, Loader2, ShieldCheck } from 'lucide-react';
import { GoogleButton } from '@/components/ui/google-button';
import {
  completeOnboarding,
  saveAppInterests,
  saveProfileStep,
  savePrivacyConsent,
} from '@/lib/account/actions';

/**
 * 4-step Ailiur Account onboarding. Each step persists via a server action;
 * the wizard advances optimistically and surfaces inline errors. Because
 * "Connect Google" is a full-page OAuth redirect, the current step is mirrored
 * to the URL (?step=) so the flow resumes where it left off.
 */

const ONBOARDING_APPS: { slug: string; name: string; blurb: string }[] = [
  { slug: 'enchiridion', name: 'Enchiridion', blurb: 'Guided learning' },
  { slug: 'qetos', name: 'Qetos', blurb: 'Metabolic & energy' },
  { slug: 'daymesh', name: 'Daymesh', blurb: 'Biometric camera roll' },
  { slug: 'oruvo', name: 'Oruvo', blurb: 'Life balance sheet' },
  { slug: 'retellum', name: 'Retellum', blurb: 'Media memory' },
  { slug: 'tayzt', name: 'Tayzt', blurb: 'Atmosphere & taste' },
  { slug: 'tellumetry', name: 'Tellumetry', blurb: 'Project telemetry' },
  { slug: 'civis', name: 'Civis', blurb: 'Coming soon' },
  { slug: 'iris', name: 'Iris', blurb: 'Coming soon' },
  { slug: 'aptellum', name: 'Aptellum', blurb: 'Language fluency' },
  { slug: 'ucm', name: 'Unified Context Mesh', blurb: 'Your context layer' },
];

const TOTAL_STEPS = 4;

function StepShell({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-display text-[clamp(1.7rem,3.5vw,2.4rem)] font-extrabold leading-[1.1] tracking-tight text-foreground">
        {title}
      </h2>
      <p className="mt-3 text-[15px] leading-relaxed text-foreground/70">{body}</p>
      <div className="mt-7">{children}</div>
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  loading,
  type = 'button',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  type?: 'button' | 'submit';
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-green px-7 py-3.5 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {children}
      {!loading ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /> : null}
    </button>
  );
}

function ErrorNote({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <p role="alert" className="mt-3 text-sm font-medium text-accent-red">
      {message}
    </p>
  );
}

export function OnboardingFlow({
  initialStep = 1,
  initialDisplayName = '',
  initialFullName = '',
  initialAvatarUrl = '',
  googleConnected = false,
}: {
  initialStep?: number;
  initialDisplayName?: string;
  initialFullName?: string;
  initialAvatarUrl?: string;
  googleConnected?: boolean;
}) {
  const router = useRouter();
  const [step, setStep] = useState(Math.min(Math.max(initialStep, 1), TOTAL_STEPS));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Step 1
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [fullName, setFullName] = useState(initialFullName);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  // Step 2
  const [interests, setInterests] = useState<string[]>([]);
  // Step 4
  const [allowCrossApp, setAllowCrossApp] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  function goto(next: number) {
    setError(null);
    setStep(next);
    // Mirror to URL so an OAuth round-trip resumes here.
    const url = new URL(window.location.href);
    url.searchParams.set('step', String(next));
    window.history.replaceState({}, '', url);
  }

  async function submitProfile() {
    setBusy(true);
    setError(null);
    const res = await saveProfileStep({ displayName, fullName, avatarUrl });
    setBusy(false);
    if (!res.ok) return setError(res.error);
    goto(2);
  }

  async function submitInterests() {
    setBusy(true);
    setError(null);
    const res = await saveAppInterests(interests);
    setBusy(false);
    if (!res.ok) return setError(res.error);
    goto(3);
  }

  async function finish() {
    setBusy(true);
    setError(null);
    const consent = await savePrivacyConsent({ allowCrossAppContext: allowCrossApp, acceptedTerms });
    if (!consent.ok) {
      setBusy(false);
      return setError(consent.error);
    }
    await completeOnboarding();
    router.push('/dashboard');
    router.refresh();
  }

  function toggleInterest(slug: string) {
    setInterests((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  }

  return (
    <div className="glass w-full rounded-[var(--radius-panel)] p-7 sm:p-10">
      {/* Progress */}
      <div className="mb-8 flex items-center gap-2">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < step ? 'bg-accent-green' : 'bg-white/60'
            }`}
          />
        ))}
        <span className="ml-3 shrink-0 text-xs font-semibold text-foreground/55">
          {step} / {TOTAL_STEPS}
        </span>
      </div>

      {step === 1 && (
        <StepShell
          eyebrow="Step 1 · Profile"
          title="Create your Ailiur Account profile"
          body="This is the identity that follows you across every Ailiur app."
        >
          <div className="space-y-4 text-left">
            <div>
              <label htmlFor="displayName" className="block text-xs font-semibold uppercase tracking-widest text-foreground/55">
                Display name
              </label>
              <input
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="How Ailiur should address you"
                className="mt-2 w-full rounded-2xl border border-white/70 bg-white/60 px-4 py-3 text-[15px] text-foreground placeholder:text-foreground/40 focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/30"
              />
            </div>
            <div>
              <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-widest text-foreground/55">
                Full name <span className="font-normal normal-case text-foreground/40">(optional)</span>
              </label>
              <input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your legal/full name"
                className="mt-2 w-full rounded-2xl border border-white/70 bg-white/60 px-4 py-3 text-[15px] text-foreground placeholder:text-foreground/40 focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/30"
              />
            </div>
            <div>
              <label htmlFor="avatarUrl" className="block text-xs font-semibold uppercase tracking-widest text-foreground/55">
                Avatar URL <span className="font-normal normal-case text-foreground/40">(optional)</span>
              </label>
              <input
                id="avatarUrl"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://…"
                className="mt-2 w-full rounded-2xl border border-white/70 bg-white/60 px-4 py-3 text-[15px] text-foreground placeholder:text-foreground/40 focus:border-accent-green focus:outline-none focus:ring-2 focus:ring-accent-green/30"
              />
            </div>
          </div>
          <ErrorNote message={error} />
          <div className="mt-7">
            <PrimaryButton onClick={submitProfile} loading={busy}>
              Continue
            </PrimaryButton>
          </div>
        </StepShell>
      )}

      {step === 2 && (
        <StepShell
          eyebrow="Step 2 · Your apps"
          title="Which Ailiur apps are you interested in?"
          body="Pick any that appeal to you — you can add or remove apps anytime. This just personalizes your workspace."
        >
          <div className="grid grid-cols-1 gap-2.5 text-left sm:grid-cols-2">
            {ONBOARDING_APPS.map((app) => {
              const active = interests.includes(app.slug);
              return (
                <button
                  key={app.slug}
                  type="button"
                  onClick={() => toggleInterest(app.slug)}
                  aria-pressed={active}
                  className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${
                    active
                      ? 'border-accent-green bg-accent-green/10'
                      : 'border-white/70 bg-white/40 hover:bg-white/70'
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-foreground">{app.name}</span>
                    <span className="block truncate text-xs text-foreground/60">{app.blurb}</span>
                  </span>
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      active ? 'border-accent-green bg-accent-green text-[#fffdf5]' : 'border-foreground/25'
                    }`}
                  >
                    {active ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                  </span>
                </button>
              );
            })}
          </div>
          <ErrorNote message={error} />
          <div className="mt-7 flex items-center gap-3">
            <PrimaryButton onClick={submitInterests} loading={busy}>
              Continue
            </PrimaryButton>
            <button
              type="button"
              onClick={() => goto(3)}
              className="text-sm font-medium text-foreground/55 hover:text-foreground"
            >
              Skip for now
            </button>
          </div>
        </StepShell>
      )}

      {step === 3 && (
        <StepShell
          eyebrow="Step 3 · Connected context"
          title="Connect Google for calendar, email, and workspace context"
          body="If you grant permission, Ailiur can use your Google Calendar, Gmail, and Drive to enrich your context — always under your control, and never shared between apps without consent. This is optional."
        >
          {googleConnected ? (
            <div className="flex items-center gap-3 rounded-2xl border border-accent-green/30 bg-accent-green/10 px-4 py-3.5 text-left">
              <Check className="h-5 w-5 shrink-0 text-accent-green" strokeWidth={3} />
              <span className="text-sm font-medium text-foreground">
                Google is connected to your Ailiur Account.
              </span>
            </div>
          ) : (
            <GoogleButton callbackUrl="/onboarding?step=3" label="Connect Google" />
          )}
          <ErrorNote message={error} />
          <div className="mt-7 flex items-center gap-3">
            <PrimaryButton onClick={() => goto(4)}>Continue</PrimaryButton>
            {!googleConnected && (
              <button
                type="button"
                onClick={() => goto(4)}
                className="text-sm font-medium text-foreground/55 hover:text-foreground"
              >
                Skip — I’ll connect later
              </button>
            )}
          </div>
        </StepShell>
      )}

      {step === 4 && (
        <StepShell
          eyebrow="Step 4 · Privacy & consent"
          title="You control your context"
          body="Ailiur is local-first and conservative by default. Cross-app context — letting one app use another app’s data — stays OFF until you turn it on."
        >
          <div className="space-y-3 text-left">
            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/70 bg-white/40 px-4 py-3.5">
              <input
                type="checkbox"
                checked={allowCrossApp}
                onChange={(e) => setAllowCrossApp(e.target.checked)}
                className="mt-0.5 h-5 w-5 accent-[#1fa85c]"
              />
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  Allow cross-app context (recommended later, not now)
                </span>
                <span className="block text-xs leading-relaxed text-foreground/60">
                  Let your Ailiur apps improve each other using your shared context. You can change
                  this anytime in the Account Center. Default: off.
                </span>
              </span>
            </label>

            <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/70 bg-white/40 px-4 py-3.5">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 h-5 w-5 accent-[#1fa85c]"
              />
              <span className="text-sm leading-relaxed text-foreground/80">
                I agree to Ailiur’s Terms and Privacy Policy.
              </span>
            </label>
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-foreground/55">
            <ShieldCheck className="h-4 w-4 text-accent-green" />
            Your data stays on-device by default. Nothing is shared without your consent.
          </div>

          <ErrorNote message={error} />
          <div className="mt-7">
            <PrimaryButton onClick={finish} loading={busy}>
              Finish & open my account
            </PrimaryButton>
          </div>
        </StepShell>
      )}
    </div>
  );
}
