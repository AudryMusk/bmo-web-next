import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import type { NextRequest } from 'next/server'
import { ratelimit } from '@/lib/rate-limit'

const AUTH_PATHS = ['/login', '/register']
const ADMIN_PREFIX = '/admin'
const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'bmo-cms-secret-key-change-in-production'
)

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rate limiting sur /login — 5 tentatives / 60s via Upstash Redis
  if (pathname === '/login') {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
              ?? request.headers.get('x-real-ip')
              ?? 'unknown'
    const { success, reset } = await ratelimit.limit(ip)
    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000)
      return new NextResponse(`Trop de tentatives. Réessayez dans ${retryAfter}s.`, {
        status: 429,
        headers: { 'Retry-After': String(retryAfter) },
      })
    }
  }

  const token = request.cookies.get('bmo_token')?.value
  let isAuthenticated = false
  if (token) {
    try { await jwtVerify(token, SECRET); isAuthenticated = true } catch {}
  }

  if (pathname.startsWith(ADMIN_PREFIX) && !isAuthenticated)
    return NextResponse.redirect(new URL('/login', request.url))

  if (isAuthenticated && AUTH_PATHS.includes(pathname))
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|bmo-icon\\.png|bmo-logo.*|uploads/.*).*)',],
}

