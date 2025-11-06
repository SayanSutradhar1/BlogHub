import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth'

// Define the protected routes
const protectedRoutes = ['/dashboard', '/edit', '/create', '/blog']

const authRoutes = ['/login', '/signup']

export  default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Check if the request path starts with any protected route
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

  const isAuth = authRoutes.some((route) => pathname.startsWith(route))

  // Get user session (assuming stored in cookies or headers)
  // Example: token stored in cookies
  const session = await auth()

  // If route is protected and no token, redirect to login
  if (isProtected && !session?.user) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  if(isAuth && session?.user){
    const dashboardUrl = new URL('/dashboard', req.url)
    return NextResponse.redirect(dashboardUrl)
  }


  // Otherwise, continue request
  return NextResponse.next()
}

// Apply middleware only to specific routes
export const config = {
  matcher: ['/dashboard/:path*', '/edit/:path*', '/create/:path*', '/blog/:path*', '/login', '/signup'],
}
