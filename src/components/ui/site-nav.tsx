'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Home, Menu, X } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { SmartLink } from '@/components/ui/smart-link';
import { ENTERPRISE_APPS } from '@/lib/enterprise';

type SessionUser = { name?: string | null; email?: string | null; image?: string | null };

type NavLeaf = { label: string; href: string; desc?: string; logo?: string };
type NavGroup = { title?: string; href?: string; items?: NavLeaf[] };
type NavMenu = { label: string; groups: NavGroup[]; cta?: NavLeaf };

const MENUS: NavMenu[] = [
  {
    label: 'Products',
    groups: [
      {
        items: [
          {
            label: 'Enchiridion',
            href: 'https://www.enchiridion.ailiur.com',
            logo: '/enchiridion-logo-2024.jpg',
          },
          {
            label: 'Qetos',
            href: 'https://qetos.ailiur.com',
            logo: '/qetos-app-05-2026.png',
          },
          {
            label: 'Oruvo',
            href: 'https://oruvo.ailiur.com',
            logo: '/oruvo-logo-06-2026.png',
          },
          {
            label: 'Ollune',
            href: 'https://ollune.ailiur.com',
          },
          {
            label: 'Retellum',
            href: 'https://retellum.ailiur.com',
            logo: '/retellum-05-2026.png',
          },
          {
            label: 'Tayzt',
            href: 'https://tayzt.ailiur.com',
            logo: '/tayzt-05-2026.png',
          },
          {
            label: 'Tellumetry',
            href: 'https://tellumetry.ailiur.com',
            logo: '/tellumetry-05-2026.png',
          },
          {
            label: 'Lociq',
            href: 'https://lociq.ailiur.com',
          },
          {
            label: 'Unified Context Mesh',
            href: 'https://ucm.ailiur.com',
          },
          {
            label: 'Glyfra',
            href: 'https://glyfra.ailiur.com',
          },
          {
            label: 'Enterprise Suite',
            href: '/contact',
            logo: '/enterprise-suite.png',
          },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    groups: [
      {
        items: [{ label: 'Blog', href: '/blog' }],
      },
    ],
    cta: { label: 'Product Releases', href: '/releases' },
  },
  {
    label: 'About',
    groups: [
      { title: 'Our Story', href: '/about' },
      {
        title: 'Connect',
        items: [
          { label: 'Partnerships', href: '/partnerships' },
          { label: 'Careers', href: '/careers' },
        ],
      },
      {
        title: 'Support',
        items: [
          { label: 'Help Center', href: '/help' },
          { label: 'FAQs', href: '/faqs' },
        ],
      },
    ],
    cta: { label: 'Contact us', href: '/contact' },
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

function LetterChip({ label }: { label: string }) {
  return (
    <span
      aria-hidden
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-foreground text-sm font-semibold text-[#fffdf5]"
    >
      {label.charAt(0).toUpperCase()}
    </span>
  );
}

function Dropdown({
  menu,
  entOpen,
  onToggleEnt,
  onNavigate,
}: {
  menu: NavMenu;
  entOpen?: boolean;
  onToggleEnt?: () => void;
  onNavigate?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.18, ease: easeOut }}
      className="glass-solid absolute left-1/2 top-full z-50 mt-3 w-[300px] -translate-x-1/2 rounded-[var(--radius-card)] p-2"
    >
      {menu.groups.map((group, gi) => (
        <div key={gi} className={cn(gi > 0 && 'mt-1 border-t border-white/40 pt-1')}>
          {group.title && group.href ? (
            <SmartLink
              href={group.href}
              className="block rounded-2xl px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/50"
            >
              {group.title}
            </SmartLink>
          ) : (
            group.title && (
              <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-foreground/50">
                {group.title}
              </p>
            )
          )}
          {group.items?.map((item) =>
            item.label === 'Enterprise Suite' && onToggleEnt ? (
              <div key={item.label} className="relative">
                <button
                  type="button"
                  onClick={onToggleEnt}
                  aria-expanded={entOpen}
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left transition-colors hover:bg-white/50"
                >
                  {item.logo ? (
                    <Image
                      src={item.logo}
                      alt=""
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-xl object-cover"
                    />
                  ) : (
                    <LetterChip label={item.label} />
                  )}
                  <span className="flex-1">
                    <span className="block text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                  </span>
                  <ChevronRight
                    className={cn(
                      'h-4 w-4 shrink-0 text-foreground/50 transition-transform',
                      entOpen && 'rotate-90'
                    )}
                  />
                </button>
                <AnimatePresence>
                  {entOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -8, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -8, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: easeOut }}
                      className="glass-solid absolute bottom-0 left-full z-50 ml-2 max-h-[78vh] w-[280px] overflow-y-auto rounded-[var(--radius-card)] p-2"
                    >
                      <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-foreground/50">
                        Enterprise Suite
                      </p>
                      {ENTERPRISE_APPS.map((app) => (
                        <SmartLink
                          key={app.slug}
                          href={`https://${app.subdomain}`}
                          onClick={onNavigate}
                          className="flex items-center gap-3 rounded-2xl px-3 py-2 transition-colors hover:bg-white/50"
                        >
                          <LetterChip label={app.name} />
                          <span>
                            <span className="block text-sm font-medium text-foreground">
                              {app.name}
                            </span>
                            <span className="block text-xs text-foreground/55">
                              {app.audience}
                            </span>
                          </span>
                        </SmartLink>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <SmartLink
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-2xl px-3 py-2 transition-colors hover:bg-white/50"
              >
                {item.logo ? (
                  <Image
                    src={item.logo}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-xl object-cover"
                  />
                ) : (
                  <LetterChip label={item.label} />
                )}
                <span>
                  <span className="block text-sm font-medium text-foreground">{item.label}</span>
                  {item.desc && (
                    <span className="block text-xs text-foreground/55">{item.desc}</span>
                  )}
                </span>
              </SmartLink>
            )
          )}
        </div>
      ))}
      {menu.cta && (
        <SmartLink
          href={menu.cta.href}
          className="mt-1 block rounded-2xl bg-accent-green px-3 py-2.5 text-center text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
        >
          {menu.cta.label}
        </SmartLink>
      )}
    </motion.div>
  );
}

function AccountMenu({ user }: { user: SessionUser }) {
  const [open, setOpen] = useState(false);
  const label = user.name ?? user.email ?? 'Account';
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className="flex items-center rounded-full p-0.5 transition-transform hover:-translate-y-0.5"
        aria-label="Account menu"
        aria-expanded={open}
      >
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={label}
            referrerPolicy="no-referrer"
            className="h-9 w-9 rounded-full object-cover ring-2 ring-white/60"
          />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-sm font-semibold text-[#fffdf5]">
            {label.charAt(0).toUpperCase()}
          </span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: easeOut }}
            className="glass-solid absolute right-0 top-full z-50 mt-3 w-60 rounded-[var(--radius-card)] p-2"
          >
            <div className="px-3 py-2">
              <p className="truncate text-sm font-semibold text-foreground">{user.name ?? 'Signed in'}</p>
              {user.email && <p className="truncate text-xs text-foreground/55">{user.email}</p>}
            </div>
            <div className="my-1 border-t border-white/40" />
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="block w-full rounded-2xl px-3 py-2 text-left text-sm font-medium text-foreground transition-colors hover:bg-white/50"
            >
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function SiteNav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [entOpen, setEntOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className="glass-strong pointer-events-auto flex w-full max-w-6xl items-center justify-between rounded-full py-2.5 pl-3 pr-2.5"
      >
        {/* Brand */}
        <SmartLink href="/" className="flex items-center gap-2.5 pl-1">
          <Image
            src="/ailiur-logo.jpg"
            alt="Ailiur"
            width={36}
            height={36}
            className="h-9 w-9 rounded-xl object-cover"
            priority
          />
          <span className="font-display text-xl font-extrabold tracking-tight text-foreground">
            Ailiur
          </span>
        </SmartLink>

        {/* Desktop menu */}
        <div className="hidden items-center gap-1 lg:flex">
          <SmartLink
            href="/"
            className="flex items-center gap-1.5 rounded-full bg-foreground/[0.06] px-3.5 py-2 text-sm font-medium text-foreground ring-1 ring-foreground/10 transition-colors hover:bg-foreground/10"
          >
            <Home className="h-4 w-4" />
            Home
          </SmartLink>
          {MENUS.map((menu) => {
            const isProducts = menu.label === 'Products';
            return (
              <div
                key={menu.label}
                className="relative"
                onMouseEnter={() => {
                  setOpen(menu.label);
                  if (!isProducts) setEntOpen(false);
                }}
                onMouseLeave={() => {
                  // Keep Products open while the Enterprise Suite flyout is toggled.
                  if (!(isProducts && entOpen)) setOpen(null);
                }}
              >
                <button
                  className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                  aria-expanded={open === menu.label}
                >
                  {menu.label}
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 transition-transform',
                      open === menu.label && 'rotate-180'
                    )}
                  />
                </button>
                <AnimatePresence>
                  {open === menu.label && (
                    <Dropdown
                      menu={menu}
                      entOpen={isProducts ? entOpen : false}
                      onToggleEnt={isProducts ? () => setEntOpen((v) => !v) : undefined}
                      onNavigate={() => {
                        setEntOpen(false);
                        setOpen(null);
                      }}
                    />
                  )}
                </AnimatePresence>
              </div>
            );
          })}
          <SmartLink
            href="/pricing"
            className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Pricing
          </SmartLink>
        </div>

        {/* Right actions */}
        <div className="hidden items-center gap-2 lg:flex">
          {user ? (
            <AccountMenu user={user} />
          ) : (
            <>
              <SmartLink
                href="/login"
                className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              >
                Log In
              </SmartLink>
              <SmartLink
                href="/signup"
                className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5"
              >
                Create Account
              </SmartLink>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="rounded-full p-2 lg:hidden"
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: easeOut }}
            className="glass-solid pointer-events-auto absolute inset-x-4 top-20 max-h-[75vh] overflow-y-auto rounded-[var(--radius-card)] p-4 lg:hidden"
          >
            <SmartLink
              href="/"
              className="mb-1 flex items-center gap-2 rounded-xl bg-foreground/[0.06] px-2 py-2 text-sm font-medium text-foreground hover:bg-foreground/10"
            >
              <Home className="h-4 w-4" />
              Home
            </SmartLink>
            {MENUS.map((menu) => (
              <div key={menu.label} className="border-b border-white/40 py-2 last:border-0">
                <p className="px-1 py-1 text-xs font-semibold uppercase tracking-wider text-foreground/50">
                  {menu.label}
                </p>
                {menu.groups
                  .flatMap((g) => g.items ?? (g.href ? [{ label: g.title!, href: g.href }] : []))
                  .map((item) =>
                    item.label === 'Enterprise Suite' ? (
                      <div key={item.label} className="mt-1">
                        <p className="px-2 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-foreground/40">
                          Enterprise Suite
                        </p>
                        {ENTERPRISE_APPS.map((app) => (
                          <SmartLink
                            key={app.slug}
                            href={`https://${app.subdomain}`}
                            className="block rounded-xl px-2 py-2 text-sm font-medium text-foreground hover:bg-white/50"
                          >
                            {app.name}
                          </SmartLink>
                        ))}
                      </div>
                    ) : (
                      <SmartLink
                        key={item.label}
                        href={item.href}
                        className="block rounded-xl px-2 py-2 text-sm font-medium text-foreground hover:bg-white/50"
                      >
                        {item.label}
                      </SmartLink>
                    )
                  )}
                {menu.cta && (
                  <SmartLink
                    href={menu.cta.href}
                    className="mt-1 block rounded-xl px-2 py-2 text-sm font-semibold text-accent-green"
                  >
                    {menu.cta.label}
                  </SmartLink>
                )}
              </div>
            ))}
            <SmartLink
              href="/pricing"
              className="block rounded-xl px-2 py-3 text-sm font-medium text-foreground"
            >
              Pricing
            </SmartLink>
            {user ? (
              <div className="mt-2 flex items-center justify-between gap-3 rounded-xl px-2 py-2">
                <div className="flex min-w-0 items-center gap-2.5">
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt=""
                      referrerPolicy="no-referrer"
                      className="h-9 w-9 shrink-0 rounded-full object-cover"
                    />
                  ) : null}
                  <span className="truncate text-sm font-medium text-foreground">
                    {user.name ?? user.email}
                  </span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="shrink-0 rounded-full border border-white/60 px-4 py-2 text-sm font-medium"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="mt-2 flex gap-2">
                <SmartLink
                  href="/login"
                  className="flex-1 rounded-full border border-white/60 px-4 py-2.5 text-center text-sm font-medium"
                >
                  Log In
                </SmartLink>
                <SmartLink
                  href="/signup"
                  className="flex-1 rounded-full bg-foreground px-4 py-2.5 text-center text-sm font-semibold text-[#fffdf5]"
                >
                  Create Account
                </SmartLink>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
