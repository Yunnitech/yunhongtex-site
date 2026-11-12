import { NextResponse, type NextRequest } from "next/server";

// Cookie-based admin auth. The cookie holds a SHA-256 hash of
// ADMIN_PASSWORD (never the password itself), and the admin area is locked
// down completely when ADMIN_PASSWORD is not configured — there is no
// fallback password.

const ADMIN_COOKIE = "admin_auth";

async function sha256(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAdminArea = path.startsWith("/admin");
  const isLoginPage = path === "/admin/login";
  const isAdminApi = path.startsWith("/api/admin");

  if (!isAdminArea && !isAdminApi) return NextResponse.next();

  const adminPassword = process.env.ADMIN_PASSWORD;
  // Fail closed: without ADMIN_PASSWORD the admin area stays locked.
  const expectedHash = adminPassword ? await sha256(adminPassword) : null;

  const cookie = request.cookies.get(ADMIN_COOKIE)?.value;
  const authenticated = expectedHash !== null && cookie === expectedHash;

  // Login page — redirect to dashboard if already logged in
  if (isLoginPage && authenticated) {
    const next = request.nextUrl.clone();
    next.pathname = "/admin";
    return NextResponse.redirect(next);
  }

  // Admin API — reject with 401 when not authenticated
  if (isAdminApi && !authenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
