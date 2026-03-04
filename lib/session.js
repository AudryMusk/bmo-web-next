/**
 * lib/session.js — Gestion du token JWT via cookies (jose)
 */
import { cookies } from 'next/headers'
import { jwtVerify, SignJWT } from 'jose'

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'bmo-cms-secret-key-change-in-production'
)

const COOKIE_NAME = 'bmo_token'
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true ,
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7 jours
}

export async function createSession(payload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET)

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, COOKIE_OPTIONS)
  return token
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return payload
  } catch {
    return null
  }
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
