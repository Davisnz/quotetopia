import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  // Get the user's session token
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    // If no valid session, redirect to login page
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If user is authenticated, proceed to the page
  return NextResponse.next();
}

export const config = {
  matcher: ['/create-prompt/', '/update-prompt/', '/profile/'], // Apply this middleware to create-prompt and update-prompt pages
};