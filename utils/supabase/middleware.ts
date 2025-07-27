import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

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
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();

    // If there's an error getting user or no user, handle unauthenticated access
    if (userError || !authUser) {
      // Only redirect if trying to access protected routes
      if (request.nextUrl.pathname.startsWith("/home")) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
      // For other routes, just continue without redirects
      return response;
    }

    // Only fetch profile data if we have a valid user
    let userRole = null;
    try {
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", authUser.id);

      if (!profileError && profiles && profiles.length > 0) {
        userRole = profiles[0].role;
      }
    } catch (profileError) {
      // If profile fetch fails, just continue without role
      console.warn("Failed to fetch user profile:", profileError);
    }

    console.log("userRole is: ", userRole);

    // Handle authenticated user redirects
    if (request.nextUrl.pathname === "/") {
      if (!userRole) {
        // No role set, redirect to onboarding
        return NextResponse.redirect(new URL("/onboarding", request.url));
      } else {
        // Role exists, redirect to home
        return NextResponse.redirect(new URL("/home", request.url));
      }
    }
    
    // Protect home route - redirect to onboarding if no role
    if (request.nextUrl.pathname.startsWith("/home") && !userRole) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    return response;
  } catch (e) {
    // If you are here, a Supabase client could not be created!
    // This is likely because you have not set up environment variables.
    // Check out http://localhost:3000 for Next Steps.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
