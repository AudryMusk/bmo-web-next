import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import type { NextRequest } from 'next/server'

const AUTH_PATHS = ['/login', '/register']
const ADMIN_PREFIX = '/admin'
const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'bmo-cms-secret-key-change-in-production'
)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('bmo_token')?.value
  let isAuthenticated = false
  if (token) {
    try { await jwtVerify(token, SECRET); isAuthenticated = true } catch {}
  }

  // Protect /admin/*
  if (pathname.startsWith(ADMIN_PREFIX)) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // If already authenticated and trying to access login/register → redirect to dashboard
  if (isAuthenticated && AUTH_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|bmo-icon\\.png|bmo-logo.*|uploads/.*).*)',],
}
