'use client';

import { SessionProvider } from 'next-auth/react';
import { MotionConfig } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { AiliurAppProvider } from '@/components/app/app-context';
import { AppShellMount } from '@/components/app/app-shell-mount';
import { LifeOsProvider } from '@/components/app/life-os-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/* Honor the OS "reduce motion" setting across every Framer Motion
          animation site-wide — accessibility win, no effect for other users. */}
      <MotionConfig reducedMotion="user">
        <AiliurAppProvider>
          {/* Life-OS state (goals, Life Map, daily protocol) shared across the app. */}
          <LifeOsProvider>
            {children}
            {/* Fullscreen "Ailiur App" overlay — lazy-loaded on first open so its
                workspace JS stays out of the shared first-load bundle. */}
            <AppShellMount />
          </LifeOsProvider>
        </AiliurAppProvider>
      </MotionConfig>
      {/* Vercel Web Analytics — pageviews + custom events (see lib/analytics). */}
      <Analytics />
    </SessionProvider>
  );
}
