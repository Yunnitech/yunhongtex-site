import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let response = NextResponse.next({ request });

  // Not configured yet — let the admin routes render their own "not set up" state.
  if (!url || !anonKey) return response;

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isAdminArea = path.startsWith("/admin");
  const isLoginPage = path === "/admin/login";

  if (isAdminArea && !isLoginPage && !user) {
    const login = request.nextUrl.clone();
    login.pathname = "/admin/login";
    return NextResponse.redirect(login);
  }

  if (isLoginPage && user) {
    const home = request.nextUrl.clone();
    home.pathname = "/admin";
    return NextResponse.redirect(home);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
