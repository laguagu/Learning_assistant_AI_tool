import { NextRequest, NextResponse } from "next/server";

// Define type for user data structure with index signature
interface UserData {
  password: string;
  role: string;
  name: string;
}

interface UserDatabase {
  [key: string]: UserData; // Add index signature to allow string indexing
}

// Simple user database - in production, this would come from an environment variable or a real database
const USERS: UserDatabase = {
  admin: {
    password: "adminpass",
    role: "admin",
    name: "Administrator",
  },
  "anil.tampere@example.com": {
    password: "password1",
    role: "user",
    name: "Anil",
  },
  "maria.helsinki@example.com": {
    password: "password2",
    role: "user",
    name: "Maria",
  },
  "john.espoo@example.com": {
    password: "password3",
    role: "user",
    name: "John",
  },
  // Add new users from the list
  "sara.espoo@example.com": {
    password: "password4",
    role: "user",
    name: "Sara",
  },
  "oksana.tallinn@example.com": {
    password: "password5",
    role: "user",
    name: "Oksana",
  },
  "ivan.tartu@example.com": {
    password: "password6",
    role: "user",
    name: "Ivan",
  },
  "sophia.helsinki@example.com": {
    password: "password7",
    role: "user",
    name: "Sophia",
  },
  "miguel.turku@example.com": {
    password: "password8",
    role: "user",
    name: "Miguel",
  },
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Skip auth for login and public assets
  if (
    url.pathname === "/login" ||
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/public") ||
    url.pathname === "/"
  ) {
    return NextResponse.next();
  }

  // Get Basic auth credentials
  const basicAuth = request.headers.get("authorization");
  let isAuthenticated = false;
  let authenticatedUser = "";
  let userRole = "";

  if (basicAuth) {
    const authValue = basicAuth.split(" ")[1];
    const [user, pwd] = atob(authValue).split(":");

    // Check if user exists and password matches
    if (USERS[user] && USERS[user].password === pwd) {
      isAuthenticated = true;
      authenticatedUser = user;
      userRole = USERS[user].role;
    }
  }

  // If not authenticated, require authentication
  if (!isAuthenticated) {
    return new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="UPBEAT Learning Assistant"',
      },
    });
  }

  // Check access rights for user profiles
  if (url.pathname.startsWith("/users/")) {
    const requestedUser = decodeURIComponent(url.pathname.split("/")[2]);

    // If not admin and trying to access another user's profile, redirect to own profile
    if (userRole !== "admin" && requestedUser !== authenticatedUser) {
      return NextResponse.redirect(
        new URL(`/users/${authenticatedUser}`, request.url)
      );
    }
  }

  // Add user info to request headers for downstream use
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-email", authenticatedUser);
  requestHeaders.set("x-user-role", userRole);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
