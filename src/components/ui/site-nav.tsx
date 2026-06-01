'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SmartLink } from '@/components/ui/smart-link';

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
            label: 'Ketofy App',
            href: 'https://www.ketofy.ailiur.com',
            desc: 'Functional metabolic concierge',
            logo: '/ketofy-logo.jpg',
          },
          {
            label: 'Enchiridion App',
            href: 'https://www.enchiridion.ailiur.com',
            desc: 'Cognitive acquisition engine',
            logo: '/enchiridion-logo.jpg',
          },
        ],
      },
    ],
    cta: { label: 'Operating System for Life', href: '/products' },
  },
  {
    label: 'Solutions',
    groups: [
      {
        items: [
          { label: 'Students & Teachers', href: '/solutions/education', desc: 'Learn and teach faster' },
          { label: 'Ketogenic Therapy', href: '/solutions/keto-therapy', desc: 'Clinical metabolic protocols' },
        ],
      },
    ],
  },
  {
    label: 'Resources',
    groups: [
      {
        items: [
          { label: 'Blog', href: '/blog' },
          { label: 'Perks', href: '/perks' },
          { label: 'Tools', href: '/tools' },
        ],
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
          { label: 'Events', href: '/events' },
          { label: 'Partnerships', href: '/partnerships' },
          { label: 'Careers', href: '/careers' },
        ],
      },
      {
        title: 'Support',
        items: [
          { label: 'Help Center', href: '/help' },
          { label: 'FAQs', href: '/faqs' },
          { label: 'Switch to Ailiur', href: '/switch' },
        ],
      },
    ],
    cta: { label: 'Contact us', href: '/contact' },
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

function Dropdown({ menu }: { menu: NavMenu }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.18, ease: easeOut }}
      className="glass-strong absolute left-1/2 top-full z-50 mt-3 w-[300px] -translate-x-1/2 rounded-[var(--radius-card)] p-2"
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
          {group.items?.map((item) => (
            <SmartLink
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl px-3 py-2 transition-colors hover:bg-white/50"
            >
              {item.logo && (
                <Image
                  src={item.logo}
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 rounded-xl object-cover"
                />
              )}
              <span>
                <span className="block text-sm font-medium text-foreground">{item.label}</span>
                {item.desc && (
                  <span className="block text-xs text-foreground/55">{item.desc}</span>
                )}
              </span>
            </SmartLink>
          ))}
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

export function SiteNav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

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
          {MENUS.map((menu) => (
            <div
              key={menu.label}
              className="relative"
              onMouseEnter={() => setOpen(menu.label)}
              onMouseLeave={() => setOpen(null)}
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
              <AnimatePresence>{open === menu.label && <Dropdown menu={menu} />}</AnimatePresence>
            </div>
          ))}
          <SmartLink
            href="/pricing"
            className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
          >
            Pricing
          </SmartLink>
        </div>

        {/* Right actions */}
        <div className="hidden items-center gap-2 lg:flex">
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
            className="glass-strong pointer-events-auto absolute inset-x-4 top-20 max-h-[75vh] overflow-y-auto rounded-[var(--radius-card)] p-4 lg:hidden"
          >
            {MENUS.map((menu) => (
              <div key={menu.label} className="border-b border-white/40 py-2 last:border-0">
                <p className="px-1 py-1 text-xs font-semibold uppercase tracking-wider text-foreground/50">
                  {menu.label}
                </p>
                {menu.groups
                  .flatMap((g) => g.items ?? (g.href ? [{ label: g.title!, href: g.href }] : []))
                  .map((item) => (
                    <SmartLink
                      key={item.label}
                      href={item.href}
                      className="block rounded-xl px-2 py-2 text-sm font-medium text-foreground hover:bg-white/50"
                    >
                      {item.label}
                    </SmartLink>
                  ))}
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
