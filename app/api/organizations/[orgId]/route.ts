// lib/auth.ts
import { getServerSession } from 'next-auth';

/**
 * Server‑side helper that returns the current session.
 * Wraps `getServerSession` so you can import a stable
 * function from '@/lib/auth' in API routes and RSCs.
 */
export const auth = () => getServerSession();

/** Legacy alias for older routes */
export const getSession = auth;