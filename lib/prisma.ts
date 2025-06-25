// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
declare global {
  // `var` allows re‑assignment by TypeScript in dev mode
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}
// eslint-disable-next-line no-unused-vars
export const prisma = global.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;