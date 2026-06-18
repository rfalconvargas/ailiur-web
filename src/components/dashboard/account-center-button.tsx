import { LayoutGrid } from 'lucide-react';
import { SmartLink } from '@/components/ui/smart-link';

/** Links to the Ailiur Account Center (/account). */
export function AccountCenterButton({ className = '' }: { className?: string }) {
  return (
    <SmartLink
      href="/account"
      className={
        className ||
        'inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-[#fffdf5] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground'
      }
    >
      <LayoutGrid className="h-4 w-4" />
      Open Account Center
    </SmartLink>
  );
}
