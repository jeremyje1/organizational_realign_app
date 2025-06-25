// lib/auth.ts
/**
 * Server‑side session helper used by API routes and RSCs.
 * Wraps `getServerSession` from Next‑Auth so callers can:
 *
 *   import { getSession } from '@/lib/auth'
 */

import { getServerSession } from 'next-auth';

/** Primary helper */
export const getSession = () => getServerSession();

/** Back‑compat alias */
export const auth = getSession;