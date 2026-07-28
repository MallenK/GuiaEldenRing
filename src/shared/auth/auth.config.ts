import type { NextAuthConfig } from "next-auth";

// Edge-safe config: no providers here, since the Credentials provider's
// `authorize()` needs Prisma/bcrypt (Node-only). This is imported by
// src/proxy.ts, which runs in the Edge Runtime and only needs to check
// whether a session cookie/JWT is present — auth.ts (Node runtime) adds
// the actual provider on top of this shared config.
export const authConfig = {
  pages: { signIn: "/login" },
  providers: [],
  callbacks: {
    authorized({ auth: session }) {
      return !!session?.user;
    },
  },
} satisfies NextAuthConfig;
