import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authenticateUser, loginInputSchema } from "@/modules/progress";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const parsed = loginInputSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const result = await authenticateUser(parsed.data);
        if (!result.ok) return null;

        return result.value;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
});
