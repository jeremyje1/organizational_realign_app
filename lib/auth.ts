import NextAuth from "next-auth/next";
import Github    from "next-auth/providers/github";
import { getServerSession, type NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    Github({
      clientId:     process.env.GITHUB_ID     ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);      // API-route handler
export default handler;

/** helper usable in Server Components */
export const auth = () => getServerSession(authOptions);
