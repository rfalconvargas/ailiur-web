import { redirect } from 'next/navigation';

// Moment is now Retellum — the reflective media graph and media layer of
// Ailiur. Preserve the old route by sending visitors to the new page.
export default function Page() {
  redirect('/retellum');
}
