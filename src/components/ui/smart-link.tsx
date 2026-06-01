import Link from 'next/link';
import type { ComponentProps } from 'react';

type SmartLinkProps = Omit<ComponentProps<'a'>, 'ref'> & { href: string };

/**
 * Renders a Next.js <Link> for internal routes (client-side nav, no full
 * reload) and a plain <a> for external URLs and mailto/tel links.
 */
export function SmartLink({ href, children, ...props }: SmartLinkProps) {
  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
