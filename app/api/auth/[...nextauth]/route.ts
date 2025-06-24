import NextAuth from "next-auth/next";
import Github from "next-auth/providers/github";
import { getServerSession, type NextAuthOptions } from "next-auth";

const authConfig: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  session: { strategy: "jwt" },
};

const handler = NextAuth(authConfig);
export { handler as GET, handler as POST };

// helper for Server Components / RSC pages
export const auth = () => getServerSession(authConfig);