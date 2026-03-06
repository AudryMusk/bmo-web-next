/**
 * lib/session.js — Stockage du token du module user dans un cookie HTTP-only
 */
import { cookies } from 'next/headers'

const COOKIE_NAME    = 'bmo_token'
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure:   process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  path:     '/',
  maxAge:   60 * 60 * 24 * 7, // 7 jours
}

/**
 * Stocke le token reçu du module user dans le cookie de session.
 * @param {{ token: string, user: object }} payload
 */
export async function createSession({ token }) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, COOKIE_OPTIONS)
}

/**
 * Retourne le token brut depuis le cookie, ou null s'il n'existe pas.
 */
export async function getSession() {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value ?? null
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
