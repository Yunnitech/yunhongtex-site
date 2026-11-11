import { NextResponse, type NextRequest } from "next/server";

// Simple cookie-based admin auth. No database required.
// Set ADMIN_PASSWORD in your env (or .env) to enable it.

const ADMIN_COOKIE = "admin_auth";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAdminArea = path.startsWith("/admin");
  const isLoginPage = path === "/admin/login";
  const isAdminApi = path.startsWith("/api/admin");

  if (!isAdminArea && !isAdminApi) return NextResponse.next();

  const adminPassword =
    process.env.ADMIN_PASSWORD ?? "admin12345"; // fallback if not configured

  const cookie = request.cookies.get(ADMIN_COOKIE)?.value;
  const authenticated = cookie === adminPassword;

  // Login page — redirect to dashboard if already logged in
  if (isLoginPage && authenticated) {
    const next = request.nextUrl.clone();
    next.pathname = "/admin";
    return NextResponse.redirect(next);
  }

  // Admin area — redirect to login if not authenticated
  if (isAdminArea && !isLoginPage && !authenticated) {
    const login = request.nextUrl.clone();
    login.pathname = "/admin/login";
    login.searchParams.set("from", path);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
