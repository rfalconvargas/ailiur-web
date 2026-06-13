'use client';

import { useCallback, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Copy, Mail, RotateCcw, Send } from 'lucide-react';
import {
  canGenerateOutreach,
  formatOutreachAsText,
  generateOutreachDrafts,
} from '@/lib/aptellum/outreach-studio/logic';
import {
  DEFAULT_OUTREACH_INPUT,
  OUTREACH_EMPTY_STATE,
  RECIPIENT_OPTIONS,
  TONE_OPTIONS,
  type OutreachDrafts,
  type OutreachInput,
} from '@/lib/aptellum/outreach-studio/types';
import { COMPANY_SUGGESTIONS, ROLE_SUGGESTIONS } from '@/lib/aptellum/brief-generator/types';
import { AptellumBadge } from './badge';
import { AptellumButton } from './button';
import {
  apFieldClass,
  apLabelClass,
  apToolGrid,
  apToolInputPanel,
  apToolOutputPanel,
} from './form-fields';
import { AP_EASE_OUT, apCn } from './utils';

type CopyKey = 'linkedin' | 'email' | 'followup' | 'portfolio' | 'all';

export function AptellumOutreachStudio() {
  const reduced = useReducedMotion();
  const [input, setInput] = useState<OutreachInput>(DEFAULT_OUTREACH_INPUT);
  const [drafts, setDrafts] = useState<OutreachDrafts | null>(null);
  const [copied, setCopied] = useState<CopyKey | null>(null);

  const ready = canGenerateOutreach(input);

  const handleGenerate = useCallback(() => {
    if (!ready) return;
    setDrafts(generateOutreachDrafts(input));
    setCopied(null);
  }, [input, ready]);

  const handleReset = useCallback(() => {
    setInput(DEFAULT_OUTREACH_INPUT);
    setDrafts(null);
    setCopied(null);
  }, []);

  const copyText = useCallback(async (key: CopyKey, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, []);

  function update<K extends keyof OutreachInput>(key: K, value: OutreachInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className={apToolGrid}>
      {/* Inputs */}
      <div className={apToolInputPanel}>
        <AptellumBadge variant="gold" dotColor="gold" className="mb-3">
          Studio tool
        </AptellumBadge>
        <h3 className="font-display text-2xl font-extrabold tracking-tight text-[var(--ap-ink)]">
          Outreach Draft Studio
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--ap-graphite)]">
          Turn a project into outreach for mentors, recruiters, and creative leaders — specific, calm, and easy to review.
        </p>

        <form
          className="mt-6 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleGenerate();
          }}
        >
          <Field label="Recipient type" htmlFor="or-recipient">
            <select
              id="or-recipient"
              value={input.recipientType}
              onChange={(e) =>
                update('recipientType', e.target.value as OutreachInput['recipientType'])
              }
              className={apFieldClass}
            >
              {RECIPIENT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Target company or organization" htmlFor="or-company">
            <input
              id="or-company"
              list="or-company-suggestions"
              value={input.targetCompany}
              onChange={(e) => update('targetCompany', e.target.value)}
              placeholder="e.g. IDEO"
              className={apFieldClass}
            />
            <datalist id="or-company-suggestions">
              {COMPANY_SUGGESTIONS.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </Field>

          <Field label="Target role or opportunity" htmlFor="or-role">
            <input
              id="or-role"
              list="or-role-suggestions"
              value={input.targetRole}
              onChange={(e) => update('targetRole', e.target.value)}
              placeholder="e.g. Product Design Intern"
              className={apFieldClass}
            />
            <datalist id="or-role-suggestions">
              {ROLE_SUGGESTIONS.map((r) => (
                <option key={r} value={r} />
              ))}
            </datalist>
          </Field>

          <Field label="Student project summary" htmlFor="or-summary">
            <textarea
              id="or-summary"
              value={input.projectSummary}
              onChange={(e) => update('projectSummary', e.target.value)}
              placeholder="What you made, for whom, what changed — real context helps the draft stay credible."
              rows={6}
              className={apCn(apFieldClass, 'min-h-[8rem] resize-y')}
            />
          </Field>

          <Field label="Tone" htmlFor="or-tone">
            <select
              id="or-tone"
              value={input.tone}
              onChange={(e) => update('tone', e.target.value as OutreachInput['tone'])}
              className={apFieldClass}
            >
              {TONE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <AptellumButton
              type="submit"
              size="lg"
              className="flex-1"
              icon={<Send className="h-4 w-4" />}
              iconPosition="start"
              disabled={!ready}
            >
              Draft outreach
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

      {/* Outputs */}
      <div className={apToolOutputPanel} aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait">
          {!drafts ? (
            <motion.div
              key="empty"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduced ? undefined : { opacity: 0 }}
              transition={{ duration: 0.3, ease: AP_EASE_OUT }}
              className="flex h-full min-h-[24rem] flex-col items-center justify-center px-4 text-center"
            >
              <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-[var(--ap-radius-lg)] bg-[var(--ap-mist-soft)] text-[var(--ap-graphite)]">
                <Mail className="h-6 w-6" strokeWidth={1.5} aria-hidden />
              </span>
              <p className="max-w-sm text-[0.9375rem] leading-relaxed text-[var(--ap-graphite)]">
                {OUTREACH_EMPTY_STATE}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={`${input.recipientType}-${input.tone}-${input.targetRole}`}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: AP_EASE_OUT }}
              className="space-y-5"
            >
              <header className="border-b border-[var(--ap-border)] pb-4">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--ap-graphite)]">
                  Suggested outreach drafts
                </p>
                <p className="mt-2 text-xs italic text-[var(--ap-graphite)]">{drafts.disclaimer}</p>
              </header>

              <p className="text-sm leading-relaxed text-[var(--ap-graphite)]">{drafts.note}</p>

              <OutputBlock
                title="LinkedIn connection note"
                meta={`${drafts.linkedInNote.length} / 300 characters`}
                content={drafts.linkedInNote}
                copied={copied === 'linkedin'}
                onCopy={() => copyText('linkedin', drafts.linkedInNote)}
              />

              <OutputBlock
                title="Short email"
                meta={`Subject: ${drafts.shortEmail.subject}`}
                content={drafts.shortEmail.body}
                copied={copied === 'email'}
                onCopy={() =>
                  copyText(
                    'email',
                    `Subject: ${drafts.shortEmail.subject}\n\n${drafts.shortEmail.body}`,
                  )
                }
                preformatted
              />

              <OutputBlock
                title="Follow-up message"
                content={drafts.followUpMessage}
                copied={copied === 'followup'}
                onCopy={() => copyText('followup', drafts.followUpMessage)}
                preformatted
              />

              <OutputBlock
                title="Portfolio intro sentence"
                content={drafts.portfolioIntro}
                copied={copied === 'portfolio'}
                onCopy={() => copyText('portfolio', drafts.portfolioIntro)}
                highlight
              />

              <section className="rounded-[var(--ap-radius-lg)] border border-[var(--ap-border)] bg-[var(--ap-surface)] p-5">
                <h4 className={apLabelClass}>AI fluency coaching</h4>
                <dl className="mt-4 space-y-3">
                  {(
                    [
                      ['Delegation', drafts.aiFluency.delegation],
                      ['Description', drafts.aiFluency.description],
                      ['Discernment', drafts.aiFluency.discernment],
                      ['Diligence', drafts.aiFluency.diligence],
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
                variant="outline"
                size="md"
                className="w-full"
                icon={copied === 'all' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                iconPosition="start"
                onClick={() => drafts && copyText('all', formatOutreachAsText(drafts, input))}
              >
                {copied === 'all' ? 'Copied all' : 'Copy all drafts'}
              </AptellumButton>
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

function OutputBlock({
  title,
  meta,
  content,
  copied,
  onCopy,
  preformatted,
  highlight,
}: {
  title: string;
  meta?: string;
  content: string;
  copied: boolean;
  onCopy: () => void;
  preformatted?: boolean;
  highlight?: boolean;
}) {
  return (
    <section
      className={apCn(
        'rounded-[var(--ap-radius-md)] border p-4',
        highlight
          ? 'border-[color-mix(in_srgb,var(--ap-gold)_28%,transparent)] bg-[color-mix(in_srgb,var(--ap-gold)_6%,var(--ap-surface))]'
          : 'border-[var(--ap-border)] bg-[var(--ap-surface)]',
      )}
    >
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h4 className="text-sm font-semibold text-[var(--ap-ink)]">{title}</h4>
          {meta && (
            <p className="mt-0.5 text-xs text-[var(--ap-graphite-light)]">{meta}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onCopy}
          className={apCn(
            'inline-flex items-center gap-1.5 rounded-[var(--ap-radius-pill)] px-3 py-1.5',
            'text-xs font-semibold text-[var(--ap-ink)]',
            'border border-[var(--ap-border)] bg-[var(--ap-surface-muted)]',
            'transition-colors hover:border-[var(--ap-gold-soft)] hover:bg-[var(--ap-mist-soft)]',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ap-gold)]',
          )}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" aria-hidden />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden />
              Copy
            </>
          )}
        </button>
      </div>
      {preformatted ? (
        <pre className="whitespace-pre-wrap font-[family-name:var(--font-sans)] text-sm leading-relaxed text-[var(--ap-graphite)]">
          {content}
        </pre>
      ) : (
        <p className="text-sm leading-relaxed text-[var(--ap-graphite)]">{content}</p>
      )}
    </section>
  );
}
