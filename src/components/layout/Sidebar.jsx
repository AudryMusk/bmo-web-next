import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FileText, Tag, Globe, ChevronUp, User, Settings, LogOut } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuthStore from '@/auth/AuthStore'

const navItems = [
  {
    section: "PRINCIPAL",
    items: [
      { icon: LayoutDashboard, label: "Tableau de bord", to: "/dashboard" },
      { icon: FileText, label: "Articles", to: "/articles" },
    ],
  },
  {
    section: "CONTENU",
    items: [
      { icon: Tag, label: "Catégories", to: "/categories" },
    ],
  }
]

export default function Sidebar({ onNavigate }) {
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  return (
    <aside className="w-260px h-full bg-white border-r border-[#E8EEFF] flex flex-col shrink-0">

      {/* Logo */}
      <div className="px-6 py-5 border-b border-[#E8EEFF]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-primary rounded-[10px] flex items-center justify-center shrink-0">
            <span className="text-white font-extrabold text-base">B</span>
          </div>
          <span className="font-extrabold text-lg tracking-[0.08em] text-text-900">BESTCASH</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        {navItems.map((group) => (
          <div key={group.section} className="mb-6">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-text-400 px-3 mb-1">
              {group.section}
            </p>
            {group.items.map(({ icon: Icon, label, to }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `w-full flex items-center gap-2.5 h-11 px-3 rounded-lg text-sm font-medium transition-all duration-150 no-underline
                  ${isActive
                    ? 'bg-tint text-primary border-l-[3px] border-primary'
                    : 'text-[#64748B] border-l-[3px] border-transparent hover:bg-bg'
                  }`
                }
              >
                <Icon size={20} />
                {label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* Bas — Vue publique + Profil */}
      <div className="p-4 border-t border-[#E8EEFF]">
        <button
          onClick={() => navigate('/public')}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-white cursor-pointer mb-3 text-text-600 text-sm font-medium hover:bg-bg transition-all"
        >
          <Globe size={16} /> Vue publique
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2.5 cursor-pointer hover:bg-bg rounded-lg p-1 transition-all w-full">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center border-2 border-[#BFDBFE] shrink-0">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text-900">Audry</p>
                <p className="text-xs text-text-400">Admin</p>
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
            <DropdownMenuItem
              className="text-red-500 focus:text-red-500 cursor-pointer"
              onClick={() => { logout(); navigate('/login') }}
            >
              <LogOut size={14} /> Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </aside>
  )
}
