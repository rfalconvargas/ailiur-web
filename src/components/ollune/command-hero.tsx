'use client';

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUp, CornerDownLeft, Sparkles } from 'lucide-react';
import { OlluneButton } from './button';
import { OL_EASE_OUT } from './utils';

/** Intents the surface forms around — used as a rotating, typed placeholder. */
const INTENTS = [
  'Plan my week around my energy, not my inbox',
  'Summarize what changed in the Doblu project today',
  'Draft a reply that sounds like me',
  'Pull my metabolism trends into one view',
  'Find the moment I wrote that idea down',
];

/** Ephemeral interface fragments that "materialize" when an intent is sent. */
const MATERIALIZED = ['Surface formed', 'Context gathered', 'Tools assembled', 'Ready'];

function useTypedPlaceholder(active: boolean) {
  const [text, setText] = useState('');
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const animating = active && !reduce;

  useEffect(() => {
    // Only animate while the field is idle and motion is allowed. All state
    // updates happen inside async timers, never synchronously in the effect.
    if (!animating) return;
    const full = INTENTS[i % INTENTS.length];
    let char = 0;
    let hold: ReturnType<typeof setTimeout>;
    const type = setInterval(() => {
      char += 1;
      setText(full.slice(0, char));
      if (char >= full.length) {
        clearInterval(type);
        hold = setTimeout(() => setI((v) => v + 1), 2200);
      }
    }, 38);
    return () => {
      clearInterval(type);
      clearTimeout(hold);
    };
  }, [i, animating]);

  return animating ? text : INTENTS[0];
}

export function OlluneCommandHero() {
  const [value, setValue] = useState('');
  const [sent, setSent] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const placeholder = useTypedPlaceholder(value.length === 0 && sent === null);
  const reduce = useReducedMotion();

  const chips = useMemo(() => MATERIALIZED, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const intent = value.trim() || INTENTS[0];
    setSent(intent);
    // The surface "dissolves" back to its resting state, true to the product.
    window.setTimeout(() => {
      setSent(null);
      setValue('');
      inputRef.current?.focus();
    }, 3200);
  }

  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[88vh] w-full max-w-[var(--ol-content-max)] flex-col items-center justify-center px-4 pb-20 pt-16 text-center sm:pt-24"
    >
      {/* Soft spatial glow behind the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-0 h-[420px] w-[680px] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[90px]"
        style={{
          background:
            'radial-gradient(circle at 40% 40%, rgba(31,168,92,0.22), transparent 60%), radial-gradient(circle at 70% 60%, rgba(154,162,178,0.14), transparent 60%)',
        }}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: OL_EASE_OUT }}
        className="relative z-10 flex flex-col items-center"
      >
        <span className="ol-glass mb-7 inline-flex items-center gap-2 rounded-[var(--ol-radius-pill)] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--ol-silver)]">
          <Sparkles className="h-3.5 w-3.5 text-[var(--ol-green)]" />
          The AI OS layer of Ailiur
        </span>

        <h1 className="font-display text-[length:var(--ol-text-display)] font-extrabold leading-[1.02] tracking-tight text-[var(--ol-cream)]">
          The operating surface
          <br />
          for <span className="font-[200] italic text-[var(--ol-green-soft)]">human intent.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-[length:var(--ol-text-body)] leading-relaxed text-[var(--ol-silver)]">
          Ollune replaces app-switching with fluid AI interfaces that form around
          what you are trying to do — then disappear when the work is complete.
        </p>

        {/* Command-style input */}
        <form
          onSubmit={handleSubmit}
          className="mt-9 w-full max-w-xl"
          role="search"
          aria-label="Describe what you are trying to do"
        >
          <div className="ol-glass-strong group relative flex items-center gap-2 rounded-[var(--ol-radius-lg)] p-2 pl-5 transition-colors focus-within:border-[var(--ol-green)]">
            <span aria-hidden className="text-[var(--ol-green)]">
              <CornerDownLeft className="h-4 w-4" />
            </span>
            <label htmlFor="ollune-intent" className="sr-only">
              What are you trying to do?
            </label>
            <input
              id="ollune-intent"
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder ? `${placeholder}…` : 'What are you trying to do?'}
              autoComplete="off"
              className="min-w-0 flex-1 bg-transparent py-2.5 text-left text-[15px] text-[var(--ol-cream)] outline-none placeholder:text-[var(--ol-silver-dim)]"
            />
            <button
              type="submit"
              aria-label="Form an interface"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--ol-radius-md)] bg-[var(--ol-green)] text-[var(--ol-ink)] shadow-[var(--ol-glow-green)] transition-transform hover:-translate-y-0.5"
            >
              <ArrowUp className="h-4.5 w-4.5" strokeWidth={2.4} />
            </button>
          </div>

          {/* Materialized fragments — appear, then dissolve */}
          <div className="mt-3 flex min-h-[2rem] flex-wrap items-center justify-center gap-2">
            <AnimatePresence mode="popLayout">
              {sent &&
                chips.map((chip, idx) => (
                  <motion.span
                    key={chip}
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4, ease: OL_EASE_OUT, delay: idx * 0.12 }}
                    className="ol-glass inline-flex items-center gap-1.5 rounded-[var(--ol-radius-pill)] px-3 py-1 text-xs font-medium text-[var(--ol-cream-soft)]"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--ol-green)]" />
                    {chip}
                  </motion.span>
                ))}
            </AnimatePresence>
          </div>
        </form>

        <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <OlluneButton href="#demo" variant="primary" size="lg">
            Preview the demo
          </OlluneButton>
          <OlluneButton href="#waitlist" variant="glass" size="lg">
            Request early access
          </OlluneButton>
        </div>

        <a
          href="#demo"
          className="group mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[var(--ol-silver-dim)] transition-colors hover:text-[var(--ol-silver)]"
        >
          See a surface form from your intent
          <motion.span
            aria-hidden
            animate={reduce ? undefined : { y: [0, 4, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[var(--ol-green)]"
          >
            <ArrowDown className="h-3.5 w-3.5" />
          </motion.span>
        </a>
      </motion.div>
    </section>
  );
}
