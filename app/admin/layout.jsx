import { redirect } from 'next/navigation'
import { Inter } from 'next/font/google'
import { getSession } from '@/lib/session'
import { logoutAction } from '@/actions/auth'
import AppLayoutClient from '@/components/admin/AppLayoutClient'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export default async function AdminLayout({ children }) {
  const token = await getSession()
  if (!token) {
    redirect('/login')
  }

  // Le nom de l'user sera affiché via le header x-user-permissions côté client
  // Pour l'instant on laisse un placeholder — à enrichir quand /auth/me sera appelé ici
  const userName = 'Admin'

  return (
    <div className={inter.className} style={{ minHeight: '100vh' }}>
      <AppLayoutClient logoutAction={logoutAction} userName={userName}>
        {children}
      </AppLayoutClient>
    </div>
  )
}
