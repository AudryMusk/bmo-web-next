import { redirect } from 'next/navigation'
import RegisterForm from '@/components/admin/RegisterForm'
import { registerAction } from '@/actions/auth'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/session'

export const metadata = { title: 'Inscription — CMS B-MO' }

export default async function RegisterPage() {
  // Accessible seulement si : aucun compte existe (premier démarrage) OU admin déjà connecté
  const [userCount, session] = await Promise.all([
    prisma.user.count(),
    getSession(),
  ])

  if (userCount > 0 && !session) {
    redirect('/login')
  }

  return <RegisterForm registerAction={registerAction} />
}
