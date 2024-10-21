import { auth } from '@/auth'
import { NextResponse } from 'next/server';
 
export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (req.nextUrl.pathname === "/login" && req.auth) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }


  return NextResponse.next()
})
 
export const config = {
  matcher: ['/dashboard/:path*', '/dashboard', '/login'],
};