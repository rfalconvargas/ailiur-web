import { handlers } from '@/auth';

// Mounts /api/auth/* — including /api/auth/callback/google (the OAuth redirect
// URI) and /api/auth/signin/google. Auth.js owns the OAuth token exchange.
export const { GET, POST } = handlers;
