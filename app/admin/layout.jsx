import { redirect } from 'next/navigation'
import { Inter } from 'next/font/google'
import { getSession } from '@/lib/session'
import { logoutAction } from '@/actions/auth'
import AppLayoutClient from '@/components/admin/AppLayoutClient'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export default async function AdminLayout({ children }) {
  const session = await getSession()
  if (!session) {
    redirect('/login')
  }

  const userName = session.name ?? session.email

  return (
    <div className={inter.className} style={{ minHeight: '100vh' }}>
      <AppLayoutClient logoutAction={logoutAction} userName={userName}>
        {children}
      </AppLayoutClient>
    </div>
  )
}
