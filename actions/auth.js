'use server'

import { redirect } from 'next/navigation'
import { createSession, destroySession } from '@/lib/session'

const USER_MODULE_URL = process.env.USER_MODULE_API_URL ?? 'https://api.module-user.bestcash.me'
const APP_ID          = process.env.USER_MODULE_APP_ID  ?? ''

export async function loginAction(_prevState, formData) {
  const email = formData.get('email')?.trim()
  const pass  = formData.get('password')

  if (!email || !pass) return { error: 'Email et mot de passe requis.' }

  let data
  try {
    const res = await fetch(`${USER_MODULE_URL}/auth/login`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, pass, appId: APP_ID }),
      cache:   'no-store',
    })
    data = await res.json()
    if (!res.ok) {
      // On retourne le message du module user tel quel, fallback si absent
      return { error: data?.message ?? data?.error ?? 'Identifiants incorrects.' }
    }
  } catch {
    return { error: 'Le service d\'authentification est inaccessible. Réessayez plus tard.' }
  }

  // Stocker le token dans le cookie de session
  await createSession({ token: data.token, user: data.user })
  redirect('/admin/dashboard')
}

export async function logoutAction() {
  await destroySession()
  redirect('/login')
}
