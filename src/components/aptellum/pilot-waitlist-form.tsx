'use client';

import { useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import {
  PILOT_FIELD_OPTIONS,
  PILOT_PROGRAM,
  PILOT_ROLE_OPTIONS,
  type PilotRole,
} from '@/lib/aptellum/pilot-section';
import { AptellumButton } from './button';
import { apFieldClass, apLabelClass } from './form-fields';
import { AP_EASE_OUT, apCn } from './utils';

export type PilotWaitlistSubmission = {
  name: string;
  email: string;
  role: PilotRole;
  fieldOfInterest: string;
  message: string;
  submittedAt: string;
};

const pilotFieldClass = apCn(apFieldClass, 'bg-[var(--ap-surface-muted)]');

const DEFAULT_FORM = {
  name: '',
  email: '',
  role: 'student' as PilotRole,
  fieldOfInterest: '',
  message: '',
};

export function AptellumPilotWaitlistForm() {
  const reduced = useReducedMotion();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [submission, setSubmission] = useState<PilotWaitlistSubmission | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmission({
      ...form,
      submittedAt: new Date().toISOString(),
    });
  }

  function handleReset() {
    setForm(DEFAULT_FORM);
    setSubmission(null);
  }

  return (
    <div
      id="waitlist"
      className={apCn(
        'scroll-mt-36 rounded-[var(--ap-radius-xl)] border border-[var(--ap-border-strong)]',
        'bg-[var(--ap-surface)] p-6 shadow-[var(--ap-shadow-md)] sm:p-10',
      )}
    >
      <AnimatePresence mode="wait">
        {submission ? (
          <motion.div
            key="success"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: AP_EASE_OUT }}
            className="py-4 text-center"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--ap-ink)] text-[var(--ap-ivory)]">
              <Check className="h-7 w-7" aria-hidden />
            </span>
            <h3 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-[var(--ap-ink)]">
              Interest received.
            </h3>
            <p className="mx-auto mt-2 max-w-md text-[0.9375rem] leading-relaxed text-[var(--ap-graphite)]">
              Thank you, {submission.name.split(' ')[0] || 'there'}. Your pilot interest is saved for
              this session. We will follow up when the first cohort is scheduled — no spam, one note
              when timing is confirmed.
            </p>
            <div className="mx-auto mt-6 max-w-sm rounded-[var(--ap-radius-md)] border border-[var(--ap-border)] bg-[var(--ap-surface-muted)] p-4 text-left text-sm">
              <p className="text-[var(--ap-graphite)]">
                <span className="font-semibold text-[var(--ap-ink)]">Role:</span>{' '}
                {PILOT_ROLE_OPTIONS.find((r) => r.value === submission.role)?.label}
              </p>
              {submission.fieldOfInterest && (
                <p className="mt-2 text-[var(--ap-graphite)]">
                  <span className="font-semibold text-[var(--ap-ink)]">Field:</span>{' '}
                  {submission.fieldOfInterest}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={handleReset}
              className={apCn(
                'mt-6 text-sm font-medium text-[var(--ap-graphite)] underline-offset-2 hover:underline',
                'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ap-gold)]',
              )}
            >
              Submit another response
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-5"
          >
            <div className="border-b border-[var(--ap-border)] pb-5">
              <h3 className="font-display text-xl font-extrabold tracking-tight text-[var(--ap-ink)]">
                Join the pilot waitlist
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ap-graphite)]">
                {PILOT_PROGRAM.earlyNote}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" htmlFor="pl-name">
                <input
                  id="pl-name"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Your name"
                  className={pilotFieldClass}
                />
              </Field>
              <Field label="Email" htmlFor="pl-email">
                <input
                  id="pl-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="you@school.edu"
                  className={pilotFieldClass}
                />
              </Field>
            </div>

            <Field label="I am a" htmlFor="pl-role">
              <select
                id="pl-role"
                required
                value={form.role}
                onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as PilotRole }))}
                className={pilotFieldClass}
              >
                {PILOT_ROLE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Field of interest" htmlFor="pl-field">
              <select
                id="pl-field"
                required
                value={form.fieldOfInterest}
                onChange={(e) => setForm((f) => ({ ...f, fieldOfInterest: e.target.value }))}
                className={pilotFieldClass}
              >
                <option value="">Select a field…</option>
                {PILOT_FIELD_OPTIONS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Message" htmlFor="pl-message" optional>
              <textarea
                id="pl-message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Why you are interested, dream company, or how you would like to participate…"
                className={apCn(pilotFieldClass, 'resize-y min-h-[6rem]')}
              />
            </Field>

            <AptellumButton
              type="submit"
              size="lg"
              className="w-full sm:w-auto"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              {PILOT_PROGRAM.formCta}
            </AptellumButton>

            <p className="text-xs leading-relaxed text-[var(--ap-graphite-light)]">
              {PILOT_PROGRAM.formFootnote}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
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
