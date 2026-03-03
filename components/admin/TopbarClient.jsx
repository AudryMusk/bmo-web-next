'use client'

import { usePathname } from 'next/navigation'
import { Bell, Search, Menu } from 'lucide-react'

const pageTitles = {
  '/admin/dashboard':             'Tableau de bord',
  '/admin/articles':              'Articles',
  '/admin/categories':            'Catégories',
  '/admin/edit':                  'Nouvel article',
  '/admin/services/particuliers': 'Services Particuliers',
  '/admin/services/business':     'Services Business',
  '/admin/tarifs':                'Grilles tarifaires',
  '/admin/reseau/microfinances':  'Microfinances',
  '/admin/reseau/distributeurs':  'Distributeurs',
  '/admin/reseau/gab':            'GAB UBA',
  '/admin/reseau/partenaires':    'Partenaires',
}

export default function TopbarClient({ onMenuClick }) {
  const pathname = usePathname()

  const title = Object.entries(pageTitles)
    .filter(([k]) => pathname === k || pathname.startsWith(k + '/'))
    .sort((a, b) => b[0].length - a[0].length)[0]?.[1] ?? 'B-MO'

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 md:px-8 gap-3 shrink-0">

      <button
        onClick={onMenuClick}
        className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all cursor-pointer bg-white shrink-0"
      >
        <Menu size={16} />
      </button>

      <h1 className="text-lg font-semibold text-slate-900 flex-1 m-0 truncate">
        {title}
      </h1>

      <div className="relative hidden md:block">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          placeholder="Rechercher..."
          className="w-64 h-9 bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-10 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
        />
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-slate-200 rounded px-1.5 py-0.5 text-[11px] font-semibold text-slate-500">
          ⌘K
        </span>
      </div>

      <div className="relative shrink-0">
        <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white flex items-center justify-center cursor-pointer text-slate-500 hover:bg-slate-50 transition-all">
          <Bell size={16} />
        </button>
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full border-2 border-white" />
      </div>

      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer shrink-0">
        <span className="text-white font-bold text-sm">A</span>
      </div>

    </header>
  )
}
