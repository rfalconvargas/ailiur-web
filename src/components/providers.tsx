'use client';

import { SessionProvider } from 'next-auth/react';
import { AiliurAppProvider } from '@/components/app/app-context';
import { AiliurAppShell } from '@/components/app/ailiur-app-shell';
import { LifeOsProvider } from '@/components/app/life-os-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AiliurAppProvider>
        {/* Life-OS state (goals, Life Map, daily protocol) shared across the app. */}
        <LifeOsProvider>
          {children}
          {/* Fullscreen "Ailiur App" overlay — mounted once, opens on demand. */}
          <AiliurAppShell />
        </LifeOsProvider>
      </AiliurAppProvider>
    </SessionProvider>
  );
}
