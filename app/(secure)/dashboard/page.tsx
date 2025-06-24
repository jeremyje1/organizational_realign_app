// app/api/auth/[...nextauth]/route.ts
import NextAuth, {
  type NextAuthOptions,
  getServerSession,   // helper for server components / RSCs
} from "next-auth";

import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  session: {
    // _Must_ be the literal string so TS infers `'database'`
    strategy: "database" as const,
  },
};

// ---- Route handlers (required in the App Router) ----
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// ---- Convenience helper for server components ----
export const auth = () => getServerSession(authOptions);