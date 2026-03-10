import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getRequiredPermission, APP_PERMISSIONS } from '@/lib/permissions'

const AUTH_PATHS      = ['/login', '/register']
const ADMIN_PREFIX    = '/admin'
const USER_MODULE_URL = process.env.USER_MODULE_API_URL ?? 'https://api.module-user.bestcash.me'
const APP_ID          = process.env.USER_MODULE_APP_ID  ?? ''

// Toutes les clés de permissions disponibles dans l'app (fallback "not-done-yet")
const ALL_PERMISSION_KEYS = APP_PERMISSIONS.map(p => p.slug)

/**
 * Appelle GET /auth/me/:appId sur le module user avec le token Bearer.
 * Retourne les permissions ou null si le token est invalide.
 *
 * Réponse : { user: {...}, role: { permissions: string[] | "not-done-yet" } }
 * Si role.permissions n'est pas encore un tableau → tous les accès sont accordés.
 */
async function fetchUserPermissions(token: string): Promise<string[] | null> {
  try {
    const res = await fetch(`${USER_MODULE_URL}/auth/me/${APP_ID}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = await res.json()

    const perms = data?.role?.permissions
    if (!Array.isArray(perms)) return ALL_PERMISSION_KEYS
    return perms
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Récupère le token : header Authorization en priorité, sinon cookie legacy
  const authHeader = request.headers.get('authorization')
  const token =
    authHeader?.startsWith('Bearer ') ? authHeader.slice(7)
    : request.cookies.get('bmo_token')?.value
    ?? null

  // ── Routes /admin/* ────────────────────────────────────────────────────────
  if (pathname.startsWith(ADMIN_PREFIX)) {
    if (!token)
      return NextResponse.redirect(new URL('/login', request.url))

    const permissions = await fetchUserPermissions(token)

    if (!permissions) {
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('bmo_token')
      return response
    }

    // Vérifie que l'user possède la permission requise pour cette route
    const required = getRequiredPermission(pathname)
    if (required && !permissions.includes(required)) {
      return new NextResponse(
        JSON.stringify({ error: 'Accès refusé — permission manquante', required }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Autorisé — on transmet les permissions dans un header pour usage serveur
    const next = NextResponse.next()
    next.headers.set('x-user-permissions', JSON.stringify(permissions))
    return next
  }

  // ── Pages login/register : redirige si déjà connecté ──────────────────────
  if (AUTH_PATHS.includes(pathname) && token) {
    const permissions = await fetchUserPermissions(token)
    if (permissions)
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|bmo-icon\\.png|bmo-logo.*|uploads/.*|api/permissions).*)',
  ],
}

