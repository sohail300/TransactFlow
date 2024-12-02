import { NextRequest, NextResponse } from "next/server";
import { decode } from "next-auth/jwt";

// Define protected routes
const restrictedRoutes = {
  "/admin": ["Admin"],
  "/manager": ["Manager"],
  "/employee": ["Employee"],
};

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token"); // Token stored in cookies
  console.log(token);

  // Check if the page is restricted
  const { pathname } = req.nextUrl;
  console.log(pathname);
  const routeKeys = Object.keys(restrictedRoutes) as Array<
    keyof typeof restrictedRoutes
  >;

  let allowedRoles = null;

  for (const key of routeKeys) {
    if (pathname.startsWith(key)) {
      allowedRoles = restrictedRoutes[key];
      break;
    }
  }

  console.log(allowedRoles);

  // If no restriction, continue
  if (!allowedRoles) {
    return NextResponse.next();
  }

  console.log("between 1");

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("between 2");

  try {
    // Verify JWT
    const payload = await decode({
      token: token.value,
      secret: process.env.JWT_SECRET!,
    });

    if (!payload) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    console.log("between 3");

    console.log(payload);
    const userRole = payload.role as string;

    // Check if user's role is allowed
    if (allowedRoles.includes(userRole)) {
      return NextResponse.next(); // Allow access
    } else {
      return NextResponse.redirect(new URL("/not-authorized", req.url)); // Redirect to not authorized page
    }
  } catch (err) {
    console.log(err);
    // If token is invalid, redirect to login
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/manager/:path*", "/employee/:path*"], // Protect these routes
};
