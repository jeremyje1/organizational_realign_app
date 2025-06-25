import { getServerSession } from 'next-auth'
import { authOptions } from '../../app/api/auth/[...nextauth]/authOptions'

/** Wrapper used across server components / API routes */
export const getSession = () => getServerSession(authOptions)

/** Alias for pages that import `{ auth } from '@/lib/auth'` */
export const auth = getSession