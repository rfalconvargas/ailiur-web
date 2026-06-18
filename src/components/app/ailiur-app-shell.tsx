'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Menu, Settings, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAiliurApp } from '@/components/app/app-context';
import { APP_SECTIONS, SectionScreen, type SectionId } from '@/components/app/sections';
import { ProfileScreen, SettingsScreen } from '@/components/app/profile-settings';
import { ContextMeshBar } from '@/components/app/context-mesh-bar';

const easeOut = [0.22, 1, 0.36, 1] as const;

// A "view" is either one of the main sections or one of the bottom areas.
type View = SectionId | 'profile' | 'settings';

const BOTTOM_ITEMS: { id: 'profile' | 'settings'; label: string; icon: typeof User }[] = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];

function NavButton({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon: typeof User;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex w-full items-center gap-3 rounded-2xl px-3.5 py-2.5 text-left text-sm font-medium transition-colors',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
        active
          ? 'bg-foreground/[0.07] text-foreground ring-1 ring-foreground/10'
          : 'text-foreground/65 hover:bg-white/50 hover:text-foreground'
      )}
    >
      <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
      {label}
    </button>
  );
}

/** Sidebar contents, reused by the desktop rail and the mobile drawer. */
function SidebarBody({
  view,
  onSelect,
}: {
  view: View;
  onSelect: (v: View) => void;
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-2 pb-5">
        <Image
          src="/ailiur-logo.jpg"
          alt="Ailiur"
          width={32}
          height={32}
          className="h-8 w-8 rounded-lg object-cover"
        />
        <span className="font-display text-lg font-extrabold tracking-tight text-foreground">
          Ailiur
        </span>
      </div>

      {/* Main sections */}
      <nav aria-label="App sections" className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {APP_SECTIONS.map((s) => (
          <NavButton
            key={s.id}
            label={s.label}
            icon={s.icon}
            active={view === s.id}
            onClick={() => onSelect(s.id)}
          />
        ))}
      </nav>

      {/* Bottom: profile + settings */}
      <div className="mt-2 flex flex-col gap-1 border-t border-white/40 pt-3">
        {BOTTOM_ITEMS.map((item) => (
          <NavButton
            key={item.id}
            label={item.label}
            icon={item.icon}
            active={view === item.id}
            onClick={() => onSelect(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ActiveView({ view }: { view: View }) {
  if (view === 'profile') return <ProfileScreen />;
  if (view === 'settings') return <SettingsScreen />;
  return <SectionScreen id={view} />;
}

export function AiliurAppShell() {
  const { open, section, setSection, closeApp } = useAiliurApp();
  const [bottomView, setBottomView] = useState<'profile' | 'settings' | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // The active view is a bottom area if one is selected, otherwise the section.
  const view: View = bottomView ?? section;

  const select = (next: View) => {
    if (next === 'profile' || next === 'settings') {
      setBottomView(next);
    } else {
      setBottomView(null);
      setSection(next);
    }
    setDrawerOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="ailiur-app"
          role="dialog"
          aria-modal="true"
          aria-label="Ailiur App"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: easeOut }}
          className="fixed inset-0 z-[100] overflow-hidden"
        >
          {/* Warm app backdrop, distinct from the marketing page but on-brand. */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: 'var(--ailiur-yellow)',
              backgroundImage:
                'radial-gradient(120% 70% at 50% -10%, var(--ailiur-yellow-light) 0%, var(--ailiur-yellow) 45%, var(--ailiur-yellow-deep) 100%)',
            }}
          />

          <div className="absolute inset-0 flex flex-col lg:flex-row">
            {/* Mobile top bar */}
            <div className="flex items-center justify-between gap-2 px-4 py-3 lg:hidden">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open app menu"
                className="glass-strong flex h-10 w-10 items-center justify-center rounded-full text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
              >
                <Menu className="h-5 w-5" />
              </button>
              <span className="font-display text-base font-extrabold tracking-tight text-foreground">
                Ailiur
              </span>
              <button
                type="button"
                onClick={closeApp}
                aria-label="Back to homepage"
                className="glass-strong flex h-10 w-10 items-center justify-center rounded-full text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Desktop sidebar */}
            <aside className="hidden shrink-0 p-4 lg:flex lg:w-[264px]">
              <div className="glass-strong flex w-full flex-col rounded-[var(--radius-card)] p-4">
                <SidebarBody view={view} onSelect={select} />
              </div>
            </aside>

            {/* Mobile Context Mesh indicator */}
            <div className="px-4 pb-2 lg:hidden">
              <ContextMeshBar view={view} />
            </div>

            {/* Main content */}
            <main className="flex min-h-0 flex-1 flex-col p-4 lg:py-6 lg:pr-6">
              {/* Desktop header: Context Mesh indicator + Back to homepage */}
              <div className="mb-4 hidden items-center gap-3 lg:flex">
                <div className="min-w-0 flex-1">
                  <ContextMeshBar view={view} />
                </div>
                <button
                  type="button"
                  onClick={closeApp}
                  className="glass-strong inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to homepage
                </button>
              </div>

              <div className="glass min-h-0 flex-1 overflow-y-auto rounded-[var(--radius-panel)] p-6 sm:p-10">
                <ActiveView view={view} />
              </div>
            </main>
          </div>

          {/* Mobile drawer */}
          <AnimatePresence>
            {drawerOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setDrawerOpen(false)}
                  className="absolute inset-0 z-10 bg-foreground/20 lg:hidden"
                />
                <motion.aside
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.25, ease: easeOut }}
                  className="absolute inset-y-0 left-0 z-20 w-[80%] max-w-[300px] p-3 lg:hidden"
                >
                  <div className="glass-solid flex h-full flex-col rounded-[var(--radius-card)] p-4">
                    <div className="mb-2 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setDrawerOpen(false)}
                        aria-label="Close app menu"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-foreground hover:bg-white/50"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <SidebarBody view={view} onSelect={select} />
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
