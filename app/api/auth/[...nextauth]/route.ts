// app/api/auth/[...nextauth]/route.ts
import NextAuth, { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * NextAuth configuration
 * – Prisma adapter for persistence
 * – GitHub provider (replace with others if needed)
 * – NEXTAUTH_SECRET loaded from env
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // optional: custom sign-in page
  },
};

const handler = NextAuth(authOptions);

/**
 * App Router requires the route to export GET and POST
 * so the same handler can serve both verbs.
 */
export const GET = handler;
export const POST = handler;