import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET!;

export function middleware(req: NextRequest) {
  const { cookies } = req;
  const token = cookies.get('jwt')?.value;
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.rewrite(url);
  }
  try {
  jwt.verify(token, secretKey);
  // Token is valid, continue to the requested page
  return NextResponse.next();
  } catch (err) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.rewrite(url);
  }
  }
  // Specify the paths where this middleware should run
  export const config = {
  matcher: ['/account/:path*', '/favRecipes/:path*'], // Protect all routes under
};