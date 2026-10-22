import { NextRequest, NextResponse } from "next/server";
import { privateRoutes, publicRoutes } from "./routes";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("token")?.value;
  if (pathname === "/") {
    return NextResponse.next();
  }

  const isPrivateRoute = privateRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isPublicRoute && token && pathname !== "/access-denied") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  //   if (isPublicRoute && token) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/access-denied",
    "/privacy-policy",
    "/terms",
    "/dashboard/:path*",
    "/users/:path*",
    "/settings/:path*",
    "/profile/:path*",
  ],
};
