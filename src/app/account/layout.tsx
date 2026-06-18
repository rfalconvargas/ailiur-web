import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { AccountNav } from '@/components/account/account-nav';

/**
 * Account Center shell: auth-gated, with a sticky sidebar on desktop and a
 * horizontally-scrolling nav on mobile. Every /account/* page renders inside.
 */
export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/login?callbackUrl=/account');
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-28 sm:pt-32">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        {/* Sidebar */}
        <aside className="lg:w-60 lg:shrink-0">
          <div className="glass-strong rounded-[var(--radius-card)] p-3 lg:sticky lg:top-28">
            <div className="px-2 pb-3 pt-1">
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground/50">
                Ailiur
              </p>
              <p className="font-display text-lg font-extrabold tracking-tight text-foreground">
                Account Center
              </p>
            </div>
            <AccountNav />
          </div>
        </aside>

        {/* Content */}
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </main>
  );
}
