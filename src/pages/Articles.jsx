import { useState } from 'react'
import { Search, Plus, MoreHorizontal, Pencil, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useNavigate } from 'react-router-dom'

const statusConfig = {
  publié:    { label: 'Publié',    className: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50' },
  brouillon: { label: 'Brouillon', className: 'bg-slate-100 text-slate-500  border-slate-200  hover:bg-slate-100' },
  planifié:  { label: 'Planifié',  className: 'bg-amber-50  text-amber-700  border-amber-200  hover:bg-amber-50' },
}

const categoryColors = {
  Ingénierie: 'bg-blue-50   text-blue-700   border-blue-200',
  Design:     'bg-purple-50 text-purple-700 border-purple-200',
  Produit:    'bg-amber-50  text-amber-700  border-amber-200',
  Marketing:  'bg-green-50  text-green-700  border-green-200',
}

const quickFilters = [
  { label: 'Tous',       filter: () => true },
  { label: 'Publiés',    filter: (a) => a.status === 'publié' },
  { label: 'Brouillons', filter: (a) => a.status === 'brouillon' },
  { label: 'Planifiés',  filter: (a) => a.status === 'planifié' },
]

export default function Articles({ articles, deleteArticle }) {
  const navigate = useNavigate()
  const [deleteTarget, setDeleteTarget] = useState(null)

  function handleDelete() {
    deleteArticle(deleteTarget.id)
    setDeleteTarget(null)
  }

  return (
    <div className="flex flex-col gap-6">

      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Articles</h1>
          <p className="text-sm text-slate-400 mt-0.5">{articles.length} articles au total</p>
        </div>
        <Button size="sm" onClick={() => navigate('/edit')} className="cursor-pointer gap-1.5">
          <Plus size={14} />
          Nouvel article
        </Button>
      </div>

      {/* ── Quick filters (statut) ───────────────────────────────────── */}
      <div className="flex gap-2">
        {quickFilters.map(({ label, filter }, i) => (
          <button
            key={label}
            className={`text-sm font-medium px-3 py-1.5 rounded-lg border transition-all cursor-pointer
              ${i === 0
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'
              }`}
          >
            {label}
            <span className="ml-1.5 text-[11px] font-bold opacity-70">
              {articles.filter(filter).length}
            </span>
          </button>
        ))}
      </div>

      {/* ── Barre de recherche + filtres ────────────────────────────── */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-48 max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <Input
            placeholder="Rechercher un article..."
            className="pl-9 bg-white border-slate-200"
          />
        </div>

        <Select>
          <SelectTrigger className="w-40 bg-white border-slate-200 cursor-pointer">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="publié">Publié</SelectItem>
            <SelectItem value="brouillon">Brouillon</SelectItem>
            <SelectItem value="planifié">Planifié</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-44 bg-white border-slate-200 cursor-pointer">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes les catégories</SelectItem>
            <SelectItem value="Ingénierie">Ingénierie</SelectItem>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="Produit">Produit</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ── Table ────────────────────────────────────────────────────── */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50 border-slate-200">
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 pl-6 w-[42%]">
                Article
              </TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                Catégorie
              </TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                Statut
              </TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                Date
              </TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 pr-6 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {articles.map((article) => {
              const status = statusConfig[article.status] ?? statusConfig['brouillon']
              const catClass = categoryColors[article.category] ?? 'bg-slate-50 text-slate-700 border-slate-200'

              return (
                <TableRow key={article.id} className="group border-slate-100 hover:bg-slate-50/60 transition-colors">

                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-12 h-12 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate max-w-60">
                          {article.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 truncate max-w-60">
                          {article.excerpt}
                        </p>
                        <p className="text-[11px] text-slate-400 italic mt-0.5">
                          {article.readTime} min · {article.author}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className={`text-[11px] font-bold uppercase px-2.5 py-1 rounded-md border ${catClass}`}>
                      {article.category}
                    </span>
                  </TableCell>

                  <TableCell>
                    <Badge className={`text-[11px] font-semibold border ${status.className}`}>
                      {status.label}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-xs text-slate-400 whitespace-nowrap">
                    {article.date}
                  </TableCell>

                  <TableCell className="pr-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-44">
                        <DropdownMenuItem
                          onClick={() => navigate(`/articles/${article.slug}`)}
                          className="gap-2 cursor-pointer text-slate-600"
                        >
                          <Eye size={14} />
                          Voir l'article
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigate('/edit', { state: { article } })}
                          className="gap-2 cursor-pointer text-slate-600"
                        >
                          <Pencil size={14} />
                          Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => setDeleteTarget(article)}
                          className="gap-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                        >
                          <Trash2 size={14} />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>

                </TableRow>
              )
            })}

            {articles.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-sm text-slate-400">
                  Aucun article. Créez-en un.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* AlertDialog Supprimer */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cet article ?</AlertDialogTitle>
            <AlertDialogDescription>
              «{deleteTarget?.title}» sera définitivement supprimé. Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 cursor-pointer"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}
