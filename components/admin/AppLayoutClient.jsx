'use client'

import { useState } from 'react'
import SidebarClient from './SidebarClient'
import TopbarClient from './TopbarClient'

export default function AppLayoutClient({ children, logoutAction, userName }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-screen bg-slate-50">

      {/* Sidebar desktop */}
      <div className="hidden md:flex h-screen shrink-0">
        <SidebarClient logoutAction={logoutAction} userName={userName} collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />
      </div>

      {/* Sheet mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-64 bg-white border-r border-slate-200 shadow-xl">
            <SidebarClient
              logoutAction={logoutAction}
              userName={userName}
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopbarClient onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>

    </div>
  )
}
