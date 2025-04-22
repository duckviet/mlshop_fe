import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Retrieve the token from the request
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token) {
    // If a token exists, continue with the request
    return NextResponse.next();
  }

  // If no token exists, redirect to the homepage or another route
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/profile", "/cart", "/wishlist"], // The routes you want to protect with this middleware
};
