import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  const url = request.nextUrl.clone();
  let supabaseResponse = NextResponse.next({ request });

  // Create Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Define public routes - expand this list for Learning Assistant
  const publicRoutes = ["/login"];

  const isPublicRoute = publicRoutes.some(
    (route) => url.pathname === route || url.pathname.startsWith(`${route}/`),
  );

  // If user is not logged in and trying to access protected route, redirect to login
  if (!isPublicRoute && !user) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // User-specific route handling for authenticated users
  if (user) {
    // Check if user is admin (simple email check)
    const isAdmin = user.email === "admin@upbeat.com";

    // Redirect /users to the authenticated user's profile
    if (url.pathname === "/users") {
      url.pathname = `/users/${user.email}`;
      return NextResponse.redirect(url);
    }

    // Check access rights for user profiles
    if (url.pathname.startsWith("/users/")) {
      const requestedUser = decodeURIComponent(url.pathname.split("/")[2]);

      // If not admin and trying to access another user's profile, redirect to own profile
      if (!isAdmin && requestedUser !== user.email) {
        url.pathname = `/users/${user.email}`;
        return NextResponse.redirect(url);
      }
    }

    // Add user info to request headers for downstream use
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-email", user.email || "");
    requestHeaders.set("x-user-id", user.id);
    requestHeaders.set("x-user-role", isAdmin ? "admin" : "user");

    supabaseResponse = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return supabaseResponse;
}
