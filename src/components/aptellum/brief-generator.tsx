'use client';

import { useCallback, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Copy, Check, RotateCcw, Sparkles } from 'lucide-react';
import {
  canGenerateBrief,
  formatBriefAsText,
  generateProjectBrief,
} from '@/lib/aptellum/brief-generator/logic';
import {
  BRIEF_EMPTY_STATE,
  COMPANY_SUGGESTIONS,
  DEFAULT_BRIEF_INPUT,
  INTEREST_SUGGESTIONS,
  ROLE_SUGGESTIONS,
  SKILL_OPTIONS,
  TIME_OPTIONS,
  type BriefGeneratorInput,
  type ProjectBrief,
} from '@/lib/aptellum/brief-generator/types';
import { AptellumButton } from './button';
import { AptellumBadge } from './badge';
import { AptellumPill } from './pill';
import {
  apFieldClass,
  apLabelClass,
  apToolGrid,
  apToolInputPanel,
  apToolOutputPanel,
} from './form-fields';
import { AP_EASE_OUT, apCn } from './utils';

export function AptellumBriefGenerator() {
  const reduced = useReducedMotion();
  const [input, setInput] = useState<BriefGeneratorInput>(DEFAULT_BRIEF_INPUT);
  const [brief, setBrief] = useState<ProjectBrief | null>(null);
  const [copied, setCopied] = useState(false);

  const ready = canGenerateBrief(input);

  const handleGenerate = useCallback(() => {
    if (!ready) return;
    setBrief(generateProjectBrief(input));
    setCopied(false);
  }, [input, ready]);

  const handleReset = useCallback(() => {
    setInput(DEFAULT_BRIEF_INPUT);
    setBrief(null);
    setCopied(false);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!brief) return;
    try {
      await navigator.clipboard.writeText(formatBriefAsText(brief, input));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [brief, input]);

  function update<K extends keyof BriefGeneratorInput>(key: K, value: BriefGeneratorInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className={apToolGrid}>
      {/* ── Inputs ─────────────────────────────────────────── */}
      <div className={apToolInputPanel}>
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <AptellumBadge variant="gold" dotColor="gold" className="mb-3">
              Studio tool
            </AptellumBadge>
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-[var(--ap-ink)]">
              Dream Company Project Generator
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ap-graphite)]">
              Turn a target company and role into a scoped co-op brief — portfolio evidence included.
            </p>
          </div>
        </div>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate();
          }}
        >
          <Field label="Dream company" htmlFor="ap-company">
            <input
              id="ap-company"
              list="ap-company-suggestions"
              value={input.dreamCompany}
              onChange={(e) => update('dreamCompany', e.target.value)}
              placeholder="e.g. Apple"
              className={apFieldClass}
              autoComplete="organization"
            />
            <datalist id="ap-company-suggestions">
              {COMPANY_SUGGESTIONS.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            <SuggestionRow
              items={COMPANY_SUGGESTIONS}
              onSelect={(v) => update('dreamCompany', v)}
              active={input.dreamCompany}
            />
          </Field>

          <Field label="Target role" htmlFor="ap-role">
            <input
              id="ap-role"
              list="ap-role-suggestions"
              value={input.targetRole}
              onChange={(e) => update('targetRole', e.target.value)}
              placeholder="e.g. Product Design Intern"
              className={apFieldClass}
              autoComplete="off"
            />
            <datalist id="ap-role-suggestions">
              {ROLE_SUGGESTIONS.map((r) => (
                <option key={r} value={r} />
              ))}
            </datalist>
            <SuggestionRow
              items={ROLE_SUGGESTIONS}
              onSelect={(v) => update('targetRole', v)}
              active={input.targetRole}
            />
          </Field>

          <Field label="Creative interests" htmlFor="ap-interests">
            <input
              id="ap-interests"
              list="ap-interest-suggestions"
              value={input.creativeInterests}
              onChange={(e) => update('creativeInterests', e.target.value)}
              placeholder="e.g. accessibility"
              className={apFieldClass}
              autoComplete="off"
            />
            <datalist id="ap-interest-suggestions">
              {INTEREST_SUGGESTIONS.map((i) => (
                <option key={i} value={i} />
              ))}
            </datalist>
            <SuggestionRow
              items={INTEREST_SUGGESTIONS}
              onSelect={(v) => update('creativeInterests', v)}
              active={input.creativeInterests}
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Time available" htmlFor="ap-time">
              <select
                id="ap-time"
                value={input.timeAvailable}
                onChange={(e) =>
                  update('timeAvailable', e.target.value as BriefGeneratorInput['timeAvailable'])
                }
                className={apFieldClass}
              >
                {TIME_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Skill level" htmlFor="ap-skill">
              <select
                id="ap-skill"
                value={input.skillLevel}
                onChange={(e) =>
                  update('skillLevel', e.target.value as BriefGeneratorInput['skillLevel'])
                }
                className={apFieldClass}
              >
                {SKILL_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <AptellumButton
              type="submit"
              size="lg"
              className="flex-1"
              icon={<Sparkles className="h-4 w-4" />}
              iconPosition="start"
              disabled={!ready}
            >
              Generate brief
            </AptellumButton>
            <AptellumButton
              type="button"
              variant="secondary"
              size="lg"
              onClick={handleReset}
              icon={<RotateCcw className="h-4 w-4" />}
              iconPosition="start"
            >
              Reset
            </AptellumButton>
          </div>
        </form>
      </div>

      {/* ── Output ─────────────────────────────────────────── */}
      <div className={apToolOutputPanel} aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait">
          {!brief ? (
            <motion.div
              key="empty"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.3, ease: AP_EASE_OUT }}
              className="flex h-full min-h-[24rem] flex-col items-center justify-center px-4 text-center"
            >
              <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-[var(--ap-radius-lg)] bg-[var(--ap-mist-soft)] text-[var(--ap-graphite)]">
                <Sparkles className="h-6 w-6" strokeWidth={1.5} aria-hidden />
              </span>
              <p className="max-w-xs text-[0.9375rem] leading-relaxed text-[var(--ap-graphite)]">
                {BRIEF_EMPTY_STATE}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={seedKey(brief, input)}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: AP_EASE_OUT }}
            >
              <BriefPreview
                brief={brief}
                input={input}
                copied={copied}
                onCopy={handleCopy}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function seedKey(brief: ProjectBrief, input: BriefGeneratorInput): string {
  return `${brief.title}-${input.dreamCompany}-${input.targetRole}`;
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={htmlFor} className={apLabelClass}>
        {label}
      </label>
      {children}
    </div>
  );
}

function SuggestionRow<T extends string>({
  items,
  onSelect,
  active,
}: {
  items: readonly T[];
  onSelect: (value: T) => void;
  active: string;
}) {
  const visible = items.slice(0, 4);
  return (
    <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label={`Suggested ${active ? 'alternatives' : 'options'}`}>
      {visible.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onSelect(item)}
          className={apCn(
            'rounded-[var(--ap-radius-pill)] px-2.5 py-1 text-xs font-medium transition-colors',
            normalize(active) === normalize(item)
              ? 'bg-[var(--ap-ink)] text-[var(--ap-ivory)]'
              : 'bg-[var(--ap-mist-soft)] text-[var(--ap-graphite)] hover:bg-[var(--ap-mist)] hover:text-[var(--ap-ink)]',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ap-gold)]',
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function BriefPreview({
  brief,
  input,
  copied,
  onCopy,
}: {
  brief: ProjectBrief;
  input: BriefGeneratorInput;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <article className="space-y-6">
      <header className="border-b border-[var(--ap-border)] pb-5">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--ap-graphite)]">
          Suggested co-op brief
        </p>
        <h4 className="mt-2 font-display text-[clamp(1.25rem,3vw,1.75rem)] font-extrabold leading-snug tracking-tight text-[var(--ap-ink)]">
          {brief.title}
        </h4>
        <div className="mt-3 flex flex-wrap gap-2">
          <AptellumPill variant="mist" size="sm">
            {input.dreamCompany}
          </AptellumPill>
          <AptellumPill variant="outline" size="sm">
            {input.targetRole}
          </AptellumPill>
        </div>
        <p className="mt-4 text-xs italic text-[var(--ap-graphite)]">{brief.disclaimer}</p>
      </header>

      <BriefBlock title="Why this fits the company" body={brief.whyThisFits} />
      <BriefBlock title="Project challenge" body={brief.projectChallenge} highlight />

      <section>
        <h5 className={apLabelClass}>Final deliverables</h5>
        <ul className="mt-3 space-y-2" role="list">
          {brief.deliverables.map((d) => (
            <li key={d} className="flex items-start gap-2.5 text-sm text-[var(--ap-ink)]">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--ap-gold)]" aria-hidden />
              {d}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h5 className={apLabelClass}>Weekly plan</h5>
        <ol className="mt-3 space-y-2" role="list">
          {brief.weeklyPlan.map((w) => (
            <li
              key={w.label}
              className="rounded-[var(--ap-radius-sm)] border border-[var(--ap-border)] bg-[var(--ap-surface)] px-3 py-2.5 text-sm"
            >
              <span className="font-semibold text-[var(--ap-ink)]">{w.label}</span>
              <span className="text-[var(--ap-graphite)]"> — {w.focus}</span>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h5 className={apLabelClass}>Skills practiced</h5>
        <div className="mt-3 flex flex-wrap gap-2">
          {brief.skillsPracticed.map((s) => (
            <AptellumPill key={s} variant="gold" size="sm">
              {s}
            </AptellumPill>
          ))}
        </div>
      </section>

      <BriefBlock title="Portfolio story angle" body={brief.portfolioStoryAngle} />
      <BriefBlock title="Outreach angle" body={brief.outreachAngle} />

      <section className="rounded-[var(--ap-radius-lg)] border border-[var(--ap-border)] bg-[var(--ap-surface)] p-5">
        <h5 className={apLabelClass}>AI fluency guidance</h5>
        <dl className="mt-4 space-y-3">
          {(
            [
              ['Delegation', brief.aiFluency.delegation],
              ['Description', brief.aiFluency.description],
              ['Discernment', brief.aiFluency.discernment],
              ['Diligence', brief.aiFluency.diligence],
            ] as const
          ).map(([term, value]) => (
            <div key={term}>
              <dt className="text-sm font-semibold text-[var(--ap-ink)]">{term}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-[var(--ap-graphite)]">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="flex flex-col gap-3 border-t border-[var(--ap-border)] pt-5 sm:flex-row">
        <AptellumButton
          type="button"
          variant="primary"
          onClick={onCopy}
          icon={copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          iconPosition="start"
          className="flex-1"
        >
          {copied ? 'Copied' : 'Copy brief'}
        </AptellumButton>
      </div>
    </article>
  );
}

function BriefBlock({
  title,
  body,
  highlight,
}: {
  title: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <section
      className={apCn(
        highlight &&
          'rounded-[var(--ap-radius-md)] border border-[color-mix(in_srgb,var(--ap-gold)_28%,transparent)] bg-[color-mix(in_srgb,var(--ap-gold)_6%,var(--ap-surface))] p-4',
      )}
    >
      <h5 className={apLabelClass}>{title}</h5>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ap-ink)]">{body}</p>
    </section>
  );
}
