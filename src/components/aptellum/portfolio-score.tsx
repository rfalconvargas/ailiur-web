'use client';

import { useCallback, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BarChart3, Check, Copy, RotateCcw } from 'lucide-react';
import {
  assessPortfolioReadiness,
  canAssessPortfolio,
  formatCritiqueAsText,
  scoreLabel,
  scoreTone,
} from '@/lib/aptellum/portfolio-score/logic';
import {
  DEFAULT_SCORE_INPUT,
  SCORE_EMPTY_STATE,
  type PortfolioReadinessResult,
  type PortfolioScoreInput,
} from '@/lib/aptellum/portfolio-score/types';
import { COMPANY_SUGGESTIONS, ROLE_SUGGESTIONS } from '@/lib/aptellum/brief-generator/types';
import { AptellumBadge } from './badge';
import { AptellumButton } from './button';
import { AptellumPill } from './pill';
import {
  apFieldClass,
  apLabelClass,
  apToolGrid,
  apToolInputPanel,
  apToolOutputPanel,
} from './form-fields';
import { AP_EASE_OUT, apCn } from './utils';

const BAR_FILL: Record<ReturnType<typeof scoreTone>, string> = {
  muted: 'bg-[var(--ap-mist)]',
  warm: 'bg-[var(--ap-gold-soft)]',
  strong: 'bg-[var(--ap-gold)]',
  excellent: 'bg-[var(--ap-ink)]',
};

const RING_STROKE: Record<ReturnType<typeof scoreTone>, string> = {
  muted: 'stroke-[var(--ap-mist)]',
  warm: 'stroke-[var(--ap-gold-soft)]',
  strong: 'stroke-[var(--ap-gold)]',
  excellent: 'stroke-[var(--ap-ink)]',
};

export function AptellumPortfolioScore() {
  const reduced = useReducedMotion();
  const [input, setInput] = useState<PortfolioScoreInput>(DEFAULT_SCORE_INPUT);
  const [result, setResult] = useState<PortfolioReadinessResult | null>(null);
  const [copied, setCopied] = useState(false);

  const ready = canAssessPortfolio(input);

  const handleAssess = useCallback(() => {
    if (!ready) return;
    setResult(assessPortfolioReadiness(input));
    setCopied(false);
  }, [input, ready]);

  const handleReset = useCallback(() => {
    setInput(DEFAULT_SCORE_INPUT);
    setResult(null);
    setCopied(false);
  }, []);

  const handleCopy = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(formatCritiqueAsText(result, input));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [result, input]);

  function update<K extends keyof PortfolioScoreInput>(key: K, value: PortfolioScoreInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className={apToolGrid}>
      {/* Inputs */}
      <div className={apToolInputPanel}>
        <AptellumBadge variant="mist" dotColor="mist" className="mb-3">
          Studio critique
        </AptellumBadge>
        <h3 className="font-display text-2xl font-extrabold tracking-tight text-[var(--ap-ink)]">
          Portfolio Readiness Score
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--ap-graphite)]">
          Paste a project description and receive a constructive readiness assessment — supportive, not punitive.
        </p>

        <form
          className="mt-6 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleAssess();
          }}
        >
          <Field label="Project title" htmlFor="ps-title">
            <input
              id="ps-title"
              value={input.projectTitle}
              onChange={(e) => update('projectTitle', e.target.value)}
              placeholder="e.g. Accessibility onboarding redesign"
              className={apFieldClass}
              autoComplete="off"
            />
          </Field>

          <Field label="Target role" htmlFor="ps-role">
            <input
              id="ps-role"
              list="ps-role-suggestions"
              value={input.targetRole}
              onChange={(e) => update('targetRole', e.target.value)}
              placeholder="e.g. Product Design Intern"
              className={apFieldClass}
            />
            <datalist id="ps-role-suggestions">
              {ROLE_SUGGESTIONS.map((r) => (
                <option key={r} value={r} />
              ))}
            </datalist>
          </Field>

          <Field label="Target company" htmlFor="ps-company" optional>
            <input
              id="ps-company"
              list="ps-company-suggestions"
              value={input.targetCompany ?? ''}
              onChange={(e) => update('targetCompany', e.target.value)}
              placeholder="Optional — e.g. Figma"
              className={apFieldClass}
            />
            <datalist id="ps-company-suggestions">
              {COMPANY_SUGGESTIONS.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </Field>

          <Field label="Project description" htmlFor="ps-desc">
            <textarea
              id="ps-desc"
              value={input.projectDescription}
              onChange={(e) => update('projectDescription', e.target.value)}
              placeholder="Describe the problem, your process, what you made, and what changed…"
              rows={8}
              className={apCn(apFieldClass, 'resize-y min-h-[10rem]')}
            />
            <p className="text-xs text-[var(--ap-graphite-light)]">
              Tip: mention users, research, prototypes, iterations, outcomes, or constraints for a richer critique.
            </p>
          </Field>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <AptellumButton
              type="submit"
              size="lg"
              className="flex-1"
              icon={<BarChart3 className="h-4 w-4" />}
              iconPosition="start"
              disabled={!ready}
            >
              Assess readiness
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

      {/* Output */}
      <div className={apToolOutputPanel} aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="empty"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.3, ease: AP_EASE_OUT }}
              className="flex h-full min-h-[24rem] flex-col items-center justify-center px-4 text-center"
            >
              <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-[var(--ap-radius-lg)] bg-[var(--ap-mist-soft)] text-[var(--ap-graphite)]">
                <BarChart3 className="h-6 w-6" strokeWidth={1.5} aria-hidden />
              </span>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-[var(--ap-graphite)]">
                {SCORE_EMPTY_STATE}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`${result.overallScore}-${input.projectTitle}`}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: AP_EASE_OUT }}
            >
              <CritiquePreview result={result} copied={copied} onCopy={handleCopy} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  children,
  optional,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
  optional?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={htmlFor} className={apLabelClass}>
        {label}
        {optional && (
          <span className="ml-1 font-normal normal-case tracking-normal text-[var(--ap-graphite-light)]">
            (optional)
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const tone = scoreTone(score);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative mx-auto h-36 w-36" role="img" aria-label={`Overall readiness score ${score} out of 100`}>
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120" aria-hidden>
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="8"
          className="stroke-[var(--ap-mist-soft)]"
        />
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          className={RING_STROKE[tone]}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.9, ease: AP_EASE_OUT }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl font-extrabold tabular-nums text-[var(--ap-ink)]">{score}</span>
        <span className="text-xs font-medium text-[var(--ap-graphite)]">/ 100</span>
      </div>
    </div>
  );
}

function CategoryBar({
  label,
  score,
  note,
}: {
  label: string;
  score: number;
  note: string;
}) {
  const tone = scoreTone(score);

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2 text-sm">
        <span className="font-medium text-[var(--ap-ink)]">{label}</span>
        <span className="tabular-nums text-[var(--ap-graphite)]">{score}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[var(--ap-mist-soft)]">
        <motion.div
          className={apCn('h-full rounded-full', BAR_FILL[tone])}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.7, ease: AP_EASE_OUT }}
        />
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-[var(--ap-graphite-light)]">{note}</p>
    </div>
  );
}

function CritiquePreview({
  result,
  copied,
  onCopy,
}: {
  result: PortfolioReadinessResult;
  copied: boolean;
  onCopy: () => void;
}) {
  const tone = scoreTone(result.overallScore);

  return (
    <article className="space-y-6">
      <header className="border-b border-[var(--ap-border)] pb-6 text-center">
        <p className={apLabelClass}>Preparation signal</p>
        <div className="mt-4">
          <ScoreRing score={result.overallScore} />
        </div>
        <AptellumPill variant={tone === 'excellent' || tone === 'strong' ? 'gold' : 'mist'} size="md" className="mt-4">
          {scoreLabel(result.overallScore)}
        </AptellumPill>
        <p className="mt-4 text-xs italic text-[var(--ap-graphite)]">{result.disclaimer}</p>
      </header>

      <section>
        <h4 className={apLabelClass}>Category scores</h4>
        <div className="mt-4 space-y-4">
          {result.categories.map((c) => (
            <CategoryBar key={c.id} label={c.label} score={c.score} note={c.note} />
          ))}
        </div>
      </section>

      <InsightBlock title="Strongest signal" body={result.strongestSignal} variant="positive" />
      <InsightBlock title="Biggest missing piece" body={result.biggestMissingPiece} />
      <InsightBlock title="Recommended next revision" body={result.recommendedRevision} highlight />

      <section className="rounded-[var(--ap-radius-md)] border border-[var(--ap-border)] bg-[var(--ap-surface)] p-4">
        <h4 className={apLabelClass}>Suggested portfolio headline</h4>
        <p className="mt-2 font-display text-base font-bold leading-snug text-[var(--ap-ink)]">
          {result.suggestedHeadline}
        </p>
      </section>

      <section className="rounded-[var(--ap-radius-lg)] border border-[var(--ap-border)] bg-[var(--ap-surface)] p-5">
        <h4 className={apLabelClass}>AI fluency critique</h4>
        <dl className="mt-4 space-y-3">
          {(
            [
              ['Delegation', result.aiFluency.delegation],
              ['Description', result.aiFluency.description],
              ['Discernment', result.aiFluency.discernment],
              ['Diligence', result.aiFluency.diligence],
            ] as const
          ).map(([term, value]) => (
            <div key={term}>
              <dt className="text-sm font-semibold text-[var(--ap-ink)]">{term}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-[var(--ap-graphite)]">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <AptellumButton
        type="button"
        variant="primary"
        onClick={onCopy}
        icon={copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        iconPosition="start"
        className="w-full"
      >
        {copied ? 'Copied' : 'Copy critique'}
      </AptellumButton>
    </article>
  );
}

function InsightBlock({
  title,
  body,
  highlight,
  variant,
}: {
  title: string;
  body: string;
  highlight?: boolean;
  variant?: 'positive';
}) {
  return (
    <section
      className={apCn(
        'rounded-[var(--ap-radius-md)] border p-4',
        variant === 'positive' &&
          'border-[color-mix(in_srgb,var(--ap-gold)_25%,transparent)] bg-[color-mix(in_srgb,var(--ap-gold)_8%,var(--ap-surface))]',
        highlight &&
          'border-[var(--ap-border-strong)] bg-[var(--ap-surface-muted)]',
        !variant && !highlight && 'border-[var(--ap-border)] bg-[var(--ap-surface)]',
      )}
    >
      <h4 className={apLabelClass}>{title}</h4>
      <p className="mt-2 text-sm leading-relaxed text-[var(--ap-ink)]">{body}</p>
    </section>
  );
}
