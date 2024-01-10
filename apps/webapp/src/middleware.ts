import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/experience/view(.*)",
    "/home",
    "/about",
    "/host",
    "/landing",
    "/privacy",
    "/blog",
    "/textlist(.*)",
    "/api(.*)",
    "/sitemap(.*)",
    "/ideas(.*)",
    "/account/signup(.*)",
    "/account/signin(.*)",
    "/sso-callback(.*)"
  ],
});

// Stop Middleware running on static files
export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
