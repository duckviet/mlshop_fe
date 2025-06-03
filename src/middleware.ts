import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the session ID from cookies
  let sessionId = request.cookies.get("session_id")?.value;

  // If no session ID exists, create a new one
  if (!sessionId) {
    sessionId = Date.now().toString();
  }

  // Create response
  const response = NextResponse.next();

  // Set the session ID cookie
  response.cookies.set({
    name: "session_id",
    value: sessionId,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
