'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, FileText, Tag, Globe, ChevronUp, User, Settings, LogOut,
  Smartphone, Briefcase, ReceiptText, Landmark, Store, CreditCard, Handshake,
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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
      { icon: Store,      label: 'Distributeurs', href: '/admin/reseau/distributeurs' },
      { icon: CreditCard, label: 'GAB UBA',       href: '/admin/reseau/gab' },
      { icon: Handshake,  label: 'Partenaires',   href: '/admin/reseau/partenaires' },
    ],
  },
]

export default function SidebarClient({ onNavigate, logoutAction, userName }) {
  const pathname = usePathname()
  const displayName = userName ?? 'Admin'
  const initials = displayName.charAt(0).toUpperCase()

  return (
    <aside className="w-64 h-full bg-white border-r border-slate-200 flex flex-col shrink-0">

      {/* Logo */}
      <div className="px-6 py-4 border-b border-slate-200 flex items-center">
        <img src="/bmo-logo.png" alt="B-MO" className="h-9 w-auto" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {navItems.map((group) => (
          <div key={group.section} className="mb-6">
            <p className="text-[10px] font-semibold tracking-[0.12em] text-slate-400 px-3 mb-1">
              {group.section}
            </p>
            {group.items.map(({ icon: Icon, label, href }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onNavigate}
                  className={`w-full flex items-center gap-2.5 h-9 px-3 rounded-lg text-sm font-medium transition-all duration-150 no-underline
                    ${isActive
                      ? 'bg-tint text-primary border-l-2 border-primary'
                      : 'text-slate-600 border-l-2 border-transparent hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Bas — Site + Profil */}
      <div className="p-4 border-t border-slate-200">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white cursor-pointer mb-3 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-all no-underline"
        >
          <Globe size={15} /> Site B-MO
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
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
          </DropdownMenuTrigger>

          <DropdownMenuContent side="top" align="start" className="w-52">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User size={14} /> Profil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings size={14} /> Paramètres
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="w-full flex items-center gap-2 text-red-500 cursor-pointer bg-transparent border-none text-sm"
                >
                  <LogOut size={14} /> Se déconnecter
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </aside>
  )
}
