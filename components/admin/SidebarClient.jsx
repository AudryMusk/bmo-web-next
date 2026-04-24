'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, FileText, Tag, Globe, ChevronUp, LogOut,
  Smartphone, Briefcase, ReceiptText, Landmark, Store, CreditCard, Handshake,
  PanelLeftClose, PanelLeftOpen,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import SubmitButton from './SubmitButton'

const navItems = [
  {
    section: 'PRINCIPAL',
    items: [
      { icon: LayoutDashboard, label: 'Tableau de bord', href: '/admin/dashboard' },
    ],
  },
  {
    section: 'BLOG',
    items: [
      { icon: FileText, label: 'Articles',   href: '/admin/articles' },
      { icon: Tag,      label: 'Catégories', href: '/admin/categories' },
    ],
  },
  {
    section: 'SERVICES',
    items: [
      { icon: Smartphone, label: 'Particuliers', href: '/admin/services/particuliers' },
      { icon: Briefcase,  label: 'Business',     href: '/admin/services/business' },
    ],
  },
  {
    section: 'TARIFS',
    items: [
      { icon: ReceiptText, label: 'Grilles tarifaires', href: '/admin/tarifs' },
    ],
  },
  {
    section: 'RÉSEAU',
    items: [
      { icon: Landmark,   label: 'Microfinances', href: '/admin/reseau/microfinances' },
      { icon: Store,      label: 'Marchands',     href: '/admin/reseau/distributeurs' },
      { icon: CreditCard, label: 'GAB UBA',       href: '/admin/reseau/gab' },
      { icon: Handshake,  label: 'Partenaires',   href: '/admin/reseau/partenaires' },
    ],
  },
]

export default function SidebarClient({ onNavigate, logoutAction, userName, collapsed = false, onToggle }) {
  const pathname = usePathname()
  const displayName = userName ?? 'Admin'
  const initials = displayName.charAt(0).toUpperCase()

  return (
    <aside className={`${collapsed ? 'w-14' : 'w-64'} h-full bg-white border-r border-slate-200 flex flex-col shrink-0 transition-all duration-200`}>

      {/* Logo + toggle */}
      <div className={`h-[57px] border-b border-slate-200 flex items-center shrink-0 ${collapsed ? 'justify-center px-0' : 'px-4 justify-between'}`}>
        {!collapsed && <img src="/bmo-logo.png" alt="B-MO" className="h-9 w-auto" />}
        <button
          onClick={onToggle}
          title={collapsed ? 'Agrandir' : 'Réduire'}
          className="h-7 w-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer border-none bg-transparent transition-colors shrink-0"
        >
          {collapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 py-3 overflow-y-auto ${collapsed ? 'px-1' : 'px-3'}`}>
        {navItems.map((group) => (
          <div key={group.section} className="mb-4">
            {!collapsed && (
              <p className="text-[10px] font-semibold tracking-[0.12em] text-slate-400 px-3 mb-1">
                {group.section}
              </p>
            )}
            {group.items.map(({ icon: Icon, label, href }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onNavigate}
                  title={collapsed ? label : undefined}
                  className={`w-full flex items-center h-9 rounded-lg text-sm font-medium transition-all duration-150 no-underline mb-0.5
                    ${collapsed ? 'justify-center px-0' : 'gap-2.5 px-3'}
                    ${isActive
                      ? 'bg-tint text-primary border-l-2 border-primary'
                      : 'text-slate-600 border-l-2 border-transparent hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <Icon size={16} />
                  {!collapsed && label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Bas — Site + Profil */}
      <div className={`border-t border-slate-200 ${collapsed ? 'p-2 flex flex-col items-center gap-2' : 'p-4'}`}>
        {!collapsed && (
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white cursor-pointer mb-3 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all no-underline"
          >
            <Globe size={15} /> Site B-MO
          </Link>
        )}
        {collapsed && (
          <Link href="/" target="_blank" rel="noopener noreferrer" title="Site B-MO"
            className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors no-underline"
          >
            <Globe size={15} />
          </Link>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {collapsed ? (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer shrink-0">
                <span className="text-white font-bold text-sm">{initials}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 cursor-pointer hover:bg-slate-50 rounded-lg p-1 transition-all w-full">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-sm">{initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">{displayName}</p>
                  <p className="text-xs text-slate-400">Admin</p>
                </div>
                <ChevronUp size={14} className="text-slate-400 shrink-0" />
              </div>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent side="top" align={collapsed ? 'center' : 'start'} className="w-52">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <form action={logoutAction}>
                <SubmitButton
                  loadingText="Déconnexion…"
                  className="w-full flex items-center gap-2 text-red-500 cursor-pointer bg-transparent border-none text-sm disabled:opacity-60"
                >
                  <LogOut size={14} /> Se déconnecter
                </SubmitButton>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </aside>
  )
}
