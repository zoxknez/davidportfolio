import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/lib/navigation";

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing);

// Routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/checkout",
];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = [
  "/auth/login",
  "/auth/register",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get locale from pathname or default
  const pathnameHasLocale = routing.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // Extract the actual path without locale
  const actualPath = pathnameHasLocale 
    ? pathname.replace(/^\/(en|sr|ar)/, "") || "/"
    : pathname;

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  // Check if it's a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    actualPath.startsWith(route)
  );

  // Check if it's an auth route
  const isAuthRoute = authRoutes.some(route => 
    actualPath.startsWith(route)
  );

  // Redirect to login if accessing protected route without auth
  if (isProtectedRoute && !token) {
    const locale = pathnameHasLocale ? pathname.split("/")[1] : "en";
    const loginUrl = new URL(`/${locale}/auth/login`, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if accessing auth routes while logged in
  if (isAuthRoute && token) {
    const locale = pathnameHasLocale ? pathname.split("/")[1] : "en";
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  // Handle internationalization
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)",
  ],
};
