import NextAuth from "next-auth";
import { authConfig } from "@/shared/auth/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  if (!req.auth) {
    const loginUrl = new URL("/login", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ["/builds/:path*", "/checklists/:path*", "/account/:path*"],
};
