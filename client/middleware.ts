import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  try {
    const response = await fetch(`${req.nextUrl.origin}/api/v1/users/check-auth`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      return NextResponse.next(); // User is authenticated
    } else {
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.rewrite(url); // Redirect to login
    }
  } catch (err) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.rewrite(url); // Redirect to login on error
  }
}

export const config = {
  matcher: ['/account/:path*', '/favRecipes/:path*'], // Protect specific routes
};