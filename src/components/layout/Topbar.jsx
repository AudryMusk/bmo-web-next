import { Bell, Search, Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const pageTitles = {
    '/dashboard':  'Tableau de bord',
    '/articles':   'Articles',
    '/categories': 'Catégories',
    '/analytics':  'Analytiques',
    '/settings':   'Paramètres',
    '/public':     'Vue publique',
}

export default function Topbar({ onMenuClick }) {
    const { pathname } = useLocation()

    return (
        <header className="h-16 bg-white border-b border-border flex items-center px-4 md:px-8 gap-3 shrink-0">

            {/* Hamburger — mobile only */}
            <button
                onClick={onMenuClick}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border text-text-600 hover:bg-bg transition-all cursor-pointer bg-white"
            >
                <Menu size={18} />
            </button>

            <h1 className="text-base md:text-xl font-bold text-text-900 flex-1 m-0">
                {pageTitles[pathname] ?? 'BESTCASH'}
            </h1>

            {/* Search — hidden on mobile */}
            <div className="relative hidden md:block">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-400" />
                <input
                    placeholder="Rechercher..."
                    className="w-65 h-10 bg-bg border border-border rounded-lg pl-9 pr-10 text-sm text-text-900 outline-none focus:border-primary"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-border rounded px-1.5 py-0.5 text-[11px] font-semibold text-text-600">
                    ⌘K
                </span>
            </div>

            <div className="relative">
                <button className="w-9 h-9 rounded-lg border border-border bg-white flex items-center justify-center cursor-pointer text-text-600 hover:bg-bg transition-all">
                    <Bell size={17} />
                </button>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#DC2626] rounded-full border-2 border-white" />
            </div>

            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center border-2 border-[#BFDBFE] cursor-pointer shrink-0">
                <span className="text-white font-bold text-sm">A</span>
            </div>

        </header>
    )
}
