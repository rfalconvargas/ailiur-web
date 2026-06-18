'use client';

import { usePathname } from 'next/navigation';
import {
  Blocks,
  CreditCard,
  Database,
  Home,
  Plug,
  ShieldCheck,
  UserRound,
  Lock,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SmartLink } from '@/components/ui/smart-link';

const ITEMS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/account', label: 'Overview', icon: Home },
  { href: '/account/profile', label: 'Profile', icon: UserRound },
  { href: '/account/apps', label: 'Ailiur apps', icon: Blocks },
  { href: '/account/connections', label: 'Connections', icon: Plug },
  { href: '/account/privacy', label: 'Privacy & permissions', icon: ShieldCheck },
  { href: '/account/context', label: 'Context', icon: Database },
  { href: '/account/security', label: 'Security', icon: Lock },
  { href: '/account/billing', label: 'Billing', icon: CreditCard },
];

export function AccountNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Account Center" className="flex flex-col gap-1">
      {ITEMS.map(({ href, label, icon: Icon }) => {
        const active = href === '/account' ? pathname === '/account' : pathname.startsWith(href);
        return (
          <SmartLink
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-medium transition-colors',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-green',
              active
                ? 'bg-foreground/[0.07] text-foreground ring-1 ring-foreground/10'
                : 'text-foreground/65 hover:bg-white/50 hover:text-foreground'
            )}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
            {label}
          </SmartLink>
        );
      })}
    </nav>
  );
}
