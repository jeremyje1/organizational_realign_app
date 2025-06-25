// app/api/auth/[...nextauth]/authOptions.ts
import type { NextAuthOptions } from 'next-auth'
import GoogleProvider            from 'next-auth/providers/google'
import { PrismaAdapter }         from '@auth/prisma-adapter'
import { prisma }                from '@/lib/prisma'

/* -------------------------------------------------------------------------- */
/*  1.  MAIN CONFIGURATION                                                    */
/* -------------------------------------------------------------------------- */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],

  session: { strategy: 'jwt' },

  callbacks: {
    /* attach the user's DB id to the JWT once, at sign-in */
    async jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },

    /* expose that id in every `session` object you get on the client */
    async session({ session, token }) {
      if (session.user && token.id) {
        // cast just once – the type will be augmented below
        (session.user as typeof session.user & { id: string }).id = token.id as string
      }
      return session
    }
  },

  /* optional – point to custom pages if you have them */
  pages: {
    signIn: '/login',
    error : '/login?error'
  },

  secret: process.env.NEXTAUTH_SECRET
}

/* -------------------------------------------------------------------------- */
/*  2.  DEFAULT EXPORT FOR THE /api/auth/[...nextauth] ROUTE                  */
/* -------------------------------------------------------------------------- */
export default authOptions