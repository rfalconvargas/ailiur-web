import {
  AudioLines,
  Film,
  Layers,
  Gauge,
  Sparkles,
  Fingerprint,
  type LucideIcon,
} from 'lucide-react';

/**
 * Tayzt sub-brand copy + structured page content.
 * Tayzt is an AI-native atmosphere engine for creators — a creative direction
 * layer that reads aesthetic identity and tunes footage to feeling.
 */

export const TAYZT_META = {
  name: 'Tayzt',
  route: '/tayzt',
  tagline: 'An AI-native atmosphere engine for creators.',
} as const;

export const TAYZT_NAV = [
  { label: 'How it works', href: '#explanation' },
  { label: 'Atmosphere Lab', href: '#atmosphere-lab' },
  { label: 'Features', href: '#features' },
  { label: 'Use cases', href: '#use-cases' },
  { label: 'Ecosystem', href: '#ecosystem' },
] as const;

export const TAYZT_NAV_CTA = { label: 'Join the waitlist', href: '#waitlist' } as const;

export const TAYZT_HERO = {
  eyebrow: 'Atmosphere engine',
  headline: 'Your taste, translated onto the timeline.',
  promise: 'Make your footage feel like you.',
  body: 'Tayzt is an atmosphere engine for creators. It reads your aesthetic identity and emotional direction, then turns raw footage into media tuned with sound, texture, overlays, and pacing.',
  primaryCta: { label: 'Join the Tayzt waitlist', href: '#waitlist' },
  secondaryCta: { label: 'Try the Atmosphere Lab', href: '#atmosphere-lab' },
} as const;

export const TAYZT_EXPLANATION = {
  eyebrow: 'What it is',
  headline: 'Not another prompt box. A creative direction layer.',
  body: 'You already know what your work should feel like. Tayzt holds that intent and applies it — sound, texture, overlays, pacing, atmosphere — across every clip, so your footage arrives already in the mood you were chasing.',
  points: [
    {
      title: 'Reads your aesthetic identity',
      body: 'Feed it references, past edits, or a few words. Tayzt learns the texture of your taste.',
    },
    {
      title: 'Tunes to emotional direction',
      body: 'Tell it the feeling — wistful, electric, still — and it shapes every layer toward it.',
    },
    {
      title: 'Works on raw footage',
      body: 'Drop in unedited clips. Tayzt returns media that already carries atmosphere and intent.',
    },
  ],
} as const;

export const TAYZT_PROBLEM = {
  eyebrow: 'The real problem',
  headline: 'The hardest part of editing is making it feel right.',
  body: 'Cutting clips together is the easy part. The hard part is the feeling — the sound that lands, the grain that warms the frame, the pacing that breathes, the overlays that say something. That work is invisible, slow, and almost impossible to describe. So most footage stays flat.',
  friction: [
    'You feel the mood in your head but can’t name the settings that get there.',
    'Generic presets flatten everything into the same look.',
    'Sound, color, and pacing each live in a different tool.',
    'By the time it feels right, the moment—and your energy—is gone.',
  ],
} as const;

export const TAYZT_DEMO = {
  eyebrow: 'Interactive demo',
  headline: 'Step into the Atmosphere Lab.',
  body: 'Pick a clip, choose a taste profile, and tune the feeling. Tayzt drafts a complete treatment — sound, overlays, texture, and pacing — in seconds. Mock data only; nothing is uploaded.',
} as const;

export type TayztFeature = {
  icon: LucideIcon;
  title: string;
  body: string;
  signal: 'gold' | 'green' | 'red' | 'amber';
};

export const TAYZT_FEATURES = {
  eyebrow: 'Core features',
  headline: 'Five layers, tuned to one feeling.',
  subhead:
    'Tayzt doesn’t add effects. It synchronizes every atmospheric layer to a single emotional direction.',
  items: [
    {
      icon: AudioLines,
      title: 'Adaptive sound',
      body: 'Score, sound design, and ambience tuned to your emotional direction and synced to motion.',
      signal: 'gold',
    },
    {
      icon: Film,
      title: 'Texture & grain',
      body: 'Film texture, grain, halation, and color atmosphere matched to your references.',
      signal: 'amber',
    },
    {
      icon: Layers,
      title: 'Abstract overlays',
      body: 'Generative overlay fragments and light leaks that move with the beat, never on top of it.',
      signal: 'green',
    },
    {
      icon: Gauge,
      title: 'Pacing intelligence',
      body: 'Cut rhythm and hold lengths shaped to the energy curve of the piece.',
      signal: 'red',
    },
    {
      icon: Sparkles,
      title: 'Atmosphere engine',
      body: 'A cohesive feeling applied across every clip, so the whole edit breathes as one.',
      signal: 'gold',
    },
    {
      icon: Fingerprint,
      title: 'Taste memory',
      body: 'Tayzt learns your aesthetic identity over time, so each project starts closer to you.',
      signal: 'green',
    },
  ] satisfies TayztFeature[],
} as const;

export type TayztUseCase = {
  kicker: string;
  title: string;
  body: string;
};

export const TAYZT_USE_CASES = {
  eyebrow: 'Example use cases',
  headline: 'Built for the work that lives or dies on feeling.',
  items: [
    {
      kicker: 'Short-form',
      title: 'Reels, Shorts & TikTok',
      body: 'Turn a phone roll into atmospheric, scroll-stopping short-form with a consistent signature.',
    },
    {
      kicker: 'Music',
      title: 'Artist & music visuals',
      body: 'Visuals that move with the track—overlays, grain, and pacing locked to the sound.',
    },
    {
      kicker: 'Brand',
      title: 'Brand & product films',
      body: 'A repeatable house mood across every cut, without rebuilding the look from scratch.',
    },
    {
      kicker: 'Story',
      title: 'Docs, vlogs & travel',
      body: 'Give raw, run-and-gun footage the warmth and pacing of something deliberate.',
    },
  ] satisfies TayztUseCase[],
} as const;

export const TAYZT_DIFFERENT = {
  eyebrow: 'Why this is different',
  headline: 'Tayzt does not replace your editor. It gives your editor taste.',
  body: 'Most AI video tools generate. Tayzt directs. It sits on top of the footage you shot and the cut you control, and adds the one thing presets never could: a point of view.',
  points: [
    {
      title: 'Direction, not generation',
      body: 'Your footage, your cut. Tayzt shapes the feeling around what you already made.',
    },
    {
      title: 'Your taste, not a template',
      body: 'It reads your references and history—never flattens you into a stock look.',
    },
    {
      title: 'Emotion-first',
      body: 'Every layer answers to a feeling, not a checkbox of effects.',
    },
    {
      title: 'Export-ready',
      body: 'Designed to sit alongside your editor and hand back media you can ship.',
    },
  ],
} as const;

export const TAYZT_ECOSYSTEM = {
  eyebrow: 'The Ailiur ecosystem',
  headline: 'Part of the Ailiur context ecosystem.',
  body: 'Tayzt shares the same idea as the rest of Ailiur: software that understands your context. Your taste graph, your references, and your creative history travel with you across the ecosystem.',
  links: [
    {
      name: 'Ailiur',
      desc: 'The context layer that carries who you are across every app.',
      href: 'https://ailiur.com',
    },
    {
      name: 'Retellum',
      desc: 'The taste graph of everything that shaped you — the source of your aesthetic identity.',
      href: 'https://retellum.ailiur.com',
    },
    {
      name: 'Aptellum',
      desc: 'The creative education layer that turns intent into shippable work.',
      href: 'https://aptellum.ailiur.com',
    },
  ],
} as const;

export const TAYZT_WAITLIST = {
  eyebrow: 'Early access',
  headline: 'Join the Tayzt waitlist.',
  body: 'Tayzt is in private development. Join the waitlist to help shape the atmosphere engine and get early access as cohorts open.',
} as const;

export const TAYZT_FOOTER = {
  tagline: 'An AI-native atmosphere engine for creators, built by Ailiur.',
  groups: [
    {
      title: 'Tayzt',
      links: [
        { label: 'How it works', href: '#explanation' },
        { label: 'Atmosphere Lab', href: '#atmosphere-lab' },
        { label: 'Features', href: '#features' },
        { label: 'Use cases', href: '#use-cases' },
      ],
    },
    {
      title: 'Ecosystem',
      links: [
        { label: 'Ailiur', href: 'https://ailiur.com' },
        { label: 'Retellum', href: 'https://retellum.ailiur.com' },
        { label: 'Aptellum', href: 'https://aptellum.ailiur.com' },
      ],
    },
  ],
} as const;
