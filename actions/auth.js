'use server'

import { redirect } from 'next/navigation'
import { createSession, destroySession } from '@/lib/session'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { loginSchema, registerSchema, parseResult } from '@/lib/schemas'

export async function loginAction(_prevState, formData) {
  const raw = {
    email:    formData.get('email')?.trim(),
    password: formData.get('password'),
  }

  const parsed = loginSchema.safeParse(raw)
  const err    = parseResult(parsed)
  if (err) return err

  const { email, password } = parsed.data

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return { error: 'Identifiants incorrects.' }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return { error: 'Identifiants incorrects.' }

  await createSession({ userId: user.id, email: user.email, name: user.name ?? user.email })
  redirect('/admin/dashboard')
}

export async function registerAction(_prevState, formData) {
  const raw = {
    email:           formData.get('email')?.trim(),
    password:        formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
    name:            formData.get('name')?.trim() || undefined,
  }

  const parsed = registerSchema.safeParse(raw)
  const err    = parseResult(parsed)
  if (err) return err

  const { email, password, name } = parsed.data

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return { error: 'Un compte existe déjà avec cet email.', fieldErrors: { email: ['Un compte existe déjà avec cet email.'] } }

  const hashed = await bcrypt.hash(password, 12)
  const user   = await prisma.user.create({
    data: { email, password: hashed, name: name ?? null },
  })

  await createSession({ userId: user.id, email: user.email, name: user.name ?? user.email })
  redirect('/admin/dashboard')
}

export async function logoutAction() {
  await destroySession()
  redirect('/login')
}
