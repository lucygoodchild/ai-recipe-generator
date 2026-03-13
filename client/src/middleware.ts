import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/home", "/login", "/forgotPassword", "/register"];
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get("jwt");
  const jwtSecret = process.env.JWT_SECRET;

  // Add auth status to response headers for client-side checking
  const response = NextResponse.next();

  if (!token || !jwtSecret) {
    response.cookies.delete("jwt");
    return response;
  }

  try {
    await jwtVerify(token.value, new TextEncoder().encode(jwtSecret));
    return response;
  } catch (err) {
    response.cookies.delete("jwt");
    return response;
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
