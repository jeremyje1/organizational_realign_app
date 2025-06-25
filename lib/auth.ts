// lib/auth.ts
import { getServerSession } from 'next-auth';

/** Get current user session (server only) */
export const auth = () => getServerSession();

/** compatibility for old code */
export const getSession = auth;