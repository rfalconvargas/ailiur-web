/**
 * Deterministic outreach draft generation.
 * Replace `generateOutreachDrafts` with an API client when ready.
 */

import {
  OUTREACH_DISCLAIMER,
  OUTREACH_NOTE,
  RECIPIENT_LABELS,
  type AiFluencyCoaching,
  type OutreachDrafts,
  type OutreachInput,
  type OutreachTone,
  type RecipientType,
  type ShortEmail,
} from './types';

// ─── Text helpers ──────────────────────────────────────────────────────────────

function trim(s: string): string {
  return s.trim();
}

function firstSentence(text: string, maxLen = 140): string {
  const clean = trim(text).replace(/\s+/g, ' ');
  const match = clean.match(/^[^.!?]+[.!?]?/);
  const sentence = match ? trim(match[0]) : clean;
  if (sentence.length <= maxLen) return sentence;
  return sentence.slice(0, maxLen - 1).trimEnd() + '…';
}

function projectHook(summary: string): string {
  const s = firstSentence(summary, 100);
  return s.endsWith('.') ? s.slice(0, -1) : s;
}

function companyRef(company: string): string {
  const c = trim(company);
  return c ? c : 'your organization';
}

function roleRef(role: string): string {
  const r = trim(role);
  return r ? r : 'a creative role';
}

function truncateLinkedIn(text: string, max = 300): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + '…';
}

function hasKeyword(text: string, words: readonly string[]): boolean {
  const lower = text.toLowerCase();
  return words.some((w) => lower.includes(w));
}

// ─── Tone modifiers ────────────────────────────────────────────────────────────

type ToneStyle = {
  opener: string;
  ask: string;
  close: string;
  voice: string;
};

const TONE_STYLES: Record<OutreachTone, ToneStyle> = {
  'warm-concise': {
    opener: 'I hope this finds you well.',
    ask: 'If you have a few minutes, I would genuinely value your perspective.',
    close: 'Thank you for considering — no pressure at all.',
    voice: 'warm and brief',
  },
  'polished-professional': {
    opener: 'I am reaching out respectfully regarding a project aligned with your work.',
    ask: 'I would welcome any guidance you might offer at your convenience.',
    close: 'Thank you for your time and consideration.',
    voice: 'polished and professional',
  },
  'curious-humble': {
    opener: 'I am still learning, and your work has been a clear reference point for me.',
    ask: 'If you are open to it, I would appreciate brief feedback on whether my approach reads credibly.',
    close: 'Grateful for anything you are willing to share.',
    voice: 'curious and humble',
  },
  'direct-ambitious': {
    opener: 'I am pursuing opportunities where craft and judgment matter — your work is directly relevant.',
    ask: 'I would like to share the project and hear whether it signals readiness for the next step.',
    close: 'Happy to send materials in whatever format is easiest to review.',
    voice: 'direct and clear',
  },
};

// ─── Recipient framing ─────────────────────────────────────────────────────────

type RecipientFrame = {
  linkedInOpener: (input: OutreachInput, hook: string) => string;
  emailGreeting: string;
  emailAsk: (input: OutreachInput) => string;
  followUpOpener: string;
  portfolioFrame: (input: OutreachInput, hook: string) => string;
};

function recipientFrame(type: RecipientType): RecipientFrame {
  const frames: Record<RecipientType, RecipientFrame> = {
    'alumni-mentor': {
      linkedInOpener: (i, hook) =>
        `Hi — I'm exploring ${roleRef(i.targetRole)} and noticed your path${trim(i.targetCompany) ? ` through ${companyRef(i.targetCompany)}` : ''}. I recently worked on ${hook.toLowerCase()}.`,
      emailGreeting: 'Dear [Name],',
      emailAsk: () =>
        'As someone who has navigated this field, would you be open to a brief conversation or async feedback on the project?',
      followUpOpener: 'Following up on my note about the project below — still grateful for any time you have.',
      portfolioFrame: (i, hook) =>
        `A ${roleRef(i.targetRole)} case study${trim(i.targetCompany) ? ` inspired by ${companyRef(i.targetCompany)}` : ''}: ${hook}.`,
    },
    recruiter: {
      linkedInOpener: (i, hook) =>
        `Hi — I'm interested in ${roleRef(i.targetRole)}${trim(i.targetCompany) ? ` at ${companyRef(i.targetCompany)}` : ''}. Recent work: ${hook.toLowerCase()}. Happy to share a concise case study.`,
      emailGreeting: 'Hello [Name],',
      emailAsk: (i) =>
        `I would appreciate guidance on whether my portfolio aligns with ${trim(i.targetCompany) ? `${companyRef(i.targetCompany)} ` : ''}${roleRef(i.targetRole)} opportunities.`,
      followUpOpener: 'Wanted to circle back on my application outreach — the case study is ready to share.',
      portfolioFrame: (i, hook) =>
        `Portfolio piece for ${roleRef(i.targetRole)}: ${hook}${trim(i.targetCompany) ? ` — scoped toward ${companyRef(i.targetCompany)}` : ''}.`,
    },
    'creative-director': {
      linkedInOpener: (i, hook) =>
        `Hi — I admire the craft at ${companyRef(i.targetCompany)}. I'm building toward ${roleRef(i.targetRole)} and recently completed ${hook.toLowerCase()}. Would value your eye if you're open.`,
      emailGreeting: 'Dear [Name],',
      emailAsk: () =>
        'If you have a moment, I would welcome critique on process, presentation, and whether the work reads at a professional standard.',
      followUpOpener: 'Sharing again in case helpful — one case study, documented process, easy to skim.',
      portfolioFrame: (i, hook) =>
        `${hook} — a process-led case study for ${roleRef(i.targetRole)}${trim(i.targetCompany) ? `, informed by ${companyRef(i.targetCompany)}` : ''}.`,
    },
    professor: {
      linkedInOpener: (i, hook) =>
        `Hi Professor [Name] — I'm developing ${roleRef(i.targetRole)} work and recently finished ${hook.toLowerCase()}. Would appreciate your feedback before I send it outward.`,
      emailGreeting: 'Dear Professor [Name],',
      emailAsk: () =>
        'Could we review whether the project meets the bar for external outreach — and what I should strengthen first?',
      followUpOpener: 'Following up on my request for feedback on the project described below.',
      portfolioFrame: (i, hook) =>
        `Course-adjacent ${roleRef(i.targetRole)} project: ${hook}. Seeking critique before portfolio publication.`,
    },
    'studio-founder': {
      linkedInOpener: (i, hook) =>
        `Hi — I respect what ${companyRef(i.targetCompany)} stands for. I'm pursuing ${roleRef(i.targetRole)} and built ${hook.toLowerCase()}. Open to feedback or the right introduction.`,
      emailGreeting: 'Dear [Name],',
      emailAsk: (i) =>
        `I would welcome a short review — or direction on who at ${companyRef(i.targetCompany)} might find the work relevant.`,
      followUpOpener: 'Brief follow-up — project link and case study are ready if useful.',
      portfolioFrame: (i, hook) =>
        `${hook} — independent studio project aimed at ${roleRef(i.targetRole)}${trim(i.targetCompany) ? ` and the standards of ${companyRef(i.targetCompany)}` : ''}.`,
    },
  };
  return frames[type];
}

// ─── Draft builders ────────────────────────────────────────────────────────────

function buildLinkedIn(input: OutreachInput, hook: string, tone: ToneStyle, frame: RecipientFrame): string {
  const opener = frame.linkedInOpener(input, hook);
  const ask =
    input.tone === 'warm-concise'
      ? ' Open to a quick note back?'
      : input.tone === 'direct-ambitious'
        ? ' Worth a look?'
        : ' Would appreciate your perspective.';
  const note = truncateLinkedIn(`${opener}${ask}`);
  return note;
}

function buildEmail(input: OutreachInput, hook: string, tone: ToneStyle, frame: RecipientFrame): ShortEmail {
  const company = trim(input.targetCompany);
  const role = roleRef(input.targetRole);
  const subject = company
    ? `${role} portfolio piece — feedback request (${company})`
    : `${role} project — brief feedback request`;

  const body = [
    frame.emailGreeting,
    '',
    tone.opener,
    '',
    `I am writing as a student pursuing ${role}${company ? ` with deep interest in ${company}` : ''}.`,
    '',
    `Recent work: ${hook}.`,
    '',
    trim(input.projectSummary).length > 0
      ? `Context: ${firstSentence(input.projectSummary, 220)}`
      : 'I have documented the process and outcomes in a short case study.',
    '',
    frame.emailAsk(input),
    '',
    tone.close,
    '',
    'Best,',
    '[Your name]',
    '[Portfolio link]',
  ].join('\n');

  return { subject, body };
}

function buildFollowUp(input: OutreachInput, hook: string, tone: ToneStyle, frame: RecipientFrame): string {
  return [
    `Hi [Name] —`,
    '',
    frame.followUpOpener,
    '',
    `Project: ${hook}.`,
    '',
    tone.ask,
    '',
    tone.close,
    '',
    '[Your name]',
  ].join('\n');
}

function buildPortfolioIntro(input: OutreachInput, hook: string, frame: RecipientFrame): string {
  return frame.portfolioFrame(input, hook);
}

function buildAiFluency(input: OutreachInput): AiFluencyCoaching {
  const summary = input.projectSummary;
  const inspired = hasKeyword(summary, ['inspired', 'simulated', 'spec', 'concept', 'redesign']);
  const aiMention = hasKeyword(summary, ['ai', 'chatgpt', 'copilot', 'generated', 'assisted']);
  const vague = hasKeyword(summary, ['passionate', 'innovative', 'intuitive', 'excited', 'love']);
  const specific = hasKeyword(summary, ['research', 'prototype', 'user', 'tested', 'iteration', 'delivered']);

  return {
    delegation:
      'Use these drafts as a starting point — personalize names, dates, and links. AI should refine your voice, not invent projects or relationships you do not have.',
    description: specific
      ? 'Your summary has real project context — keep that specificity in the final send. Link to one clear case study, not a sprawling folder.'
      : 'Add one concrete detail before sending: who the work was for, what you shipped, and what you would change next.',
    discernment: vague
      ? 'Remove generic praise words (“passionate,” “innovative”) and replace them with observable decisions from your project.'
      : 'Read once for claims that sound impressive but lack evidence — swap each for a decision, constraint, or outcome.',
    diligence: inspired
      ? 'If the project is inspired-by or simulated, say so plainly — honesty builds trust with mentors and recruiters.'
      : aiMention
        ? 'Disclose any AI assistance in the case study and outreach — reviewers respect transparency.'
        : 'Only attach work you can stand behind. Label coursework, spec projects, and client work accurately.',
  };
}

// ─── Public API ────────────────────────────────────────────────────────────────

export function canGenerateOutreach(input: OutreachInput): boolean {
  return (
    trim(input.targetRole).length > 0 &&
    trim(input.projectSummary).length >= 30
  );
}

export function generateOutreachDrafts(input: OutreachInput): OutreachDrafts {
  const hook = projectHook(input.projectSummary);
  const tone = TONE_STYLES[input.tone];
  const frame = recipientFrame(input.recipientType);

  return {
    linkedInNote: buildLinkedIn(input, hook, tone, frame),
    shortEmail: buildEmail(input, hook, tone, frame),
    followUpMessage: buildFollowUp(input, hook, tone, frame),
    portfolioIntro: buildPortfolioIntro(input, hook, frame),
    aiFluency: buildAiFluency(input),
    note: OUTREACH_NOTE,
    disclaimer: OUTREACH_DISCLAIMER,
  };
}

export function formatOutreachAsText(drafts: OutreachDrafts, input: OutreachInput): string {
  return [
    'OUTREACH DRAFTS',
    '',
    drafts.disclaimer,
    '',
    drafts.note,
    '',
    `Recipient: ${RECIPIENT_LABELS[input.recipientType]}`,
    `Company: ${trim(input.targetCompany) || '—'}`,
    `Role: ${input.targetRole}`,
    `Tone: ${input.tone.replace(/-/g, ' ')}`,
    '',
    'LINKEDIN CONNECTION NOTE',
    `(${drafts.linkedInNote.length} characters)`,
    drafts.linkedInNote,
    '',
    'SHORT EMAIL',
    `Subject: ${drafts.shortEmail.subject}`,
    '',
    drafts.shortEmail.body,
    '',
    'FOLLOW-UP MESSAGE',
    drafts.followUpMessage,
    '',
    'PORTFOLIO INTRO SENTENCE',
    drafts.portfolioIntro,
    '',
    'AI FLUENCY COACHING',
    `Delegation: ${drafts.aiFluency.delegation}`,
    `Description: ${drafts.aiFluency.description}`,
    `Discernment: ${drafts.aiFluency.discernment}`,
    `Diligence: ${drafts.aiFluency.diligence}`,
  ].join('\n');
}

export function formatOutputBlock(title: string, content: string): string {
  return `${title}\n\n${content}`;
}
