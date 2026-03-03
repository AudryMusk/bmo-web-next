'use server'

import { redirect } from 'next/navigation'
import { createSession, destroySession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function loginAction(_prevState, formData) {
  const email    = formData.get('email')?.trim()
  const password = formData.get('password')

  if (!email || !password) {
    return { error: 'Email et mot de passe requis.' }
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return { error: 'Identifiants incorrects.' }
  }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) {
    return { error: 'Identifiants incorrects.' }
  }

  await createSession({ userId: user.id, email: user.email, name: user.name ?? user.email })
  redirect('/admin/dashboard')
}

export async function registerAction(_prevState, formData) {
  const email    = formData.get('email')?.trim()
  const password = formData.get('password')
  const confirm  = formData.get('confirmPassword')
  const name     = formData.get('name')?.trim() || null

  if (!email || !password) {
    return { error: 'Tous les champs sont requis.' }
  }
  if (password !== confirm) {
    return { error: 'Les mots de passe ne correspondent pas.' }
  }
  if (password.length < 6) {
    return { error: 'Le mot de passe doit contenir au moins 6 caractères.' }
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { error: 'Un compte existe déjà avec cet email.' }
  }

  const hashed = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: { email, password: hashed, name },
  })

  await createSession({ userId: user.id, email: user.email, name: user.name ?? user.email })
  redirect('/admin/dashboard')
}

export async function logoutAction() {
  await destroySession()
  redirect('/login')
}
