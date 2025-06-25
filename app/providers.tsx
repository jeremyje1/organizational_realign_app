/* -----------------------------------------------------------
   app/providers.tsx
   Wraps the client side in a Next-Auth <SessionProvider>.
------------------------------------------------------------ */
"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode }  from "react";

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Global client-side providers
 * (Add other context providers here if the app grows.)
 */
export default function Providers({ children }: ProvidersProps) {
  return <SessionProvider>{children}</SessionProvider>;
}