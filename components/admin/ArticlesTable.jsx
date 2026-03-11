'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Plus, MoreHorizontal, Pencil, Trash2, Eye, Globe, EyeOff, CheckSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
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
import { useWithLoading } from '@/context/LoadingContext'

const statusConfig = {
  publie:    { label: 'Publié',    className: 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50' },
  brouillon: { label: 'Brouillon', className: 'bg-slate-100 text-slate-500  border-slate-200  hover:bg-slate-100' },
  planifie:  { label: 'Planifié',  className: 'bg-amber-50  text-amber-700  border-amber-200  hover:bg-amber-50' },
}

const categoryColors = {
  Ingénierie: 'bg-blue-50   text-blue-700   border-blue-200',
  Design:     'bg-purple-50 text-purple-700 border-purple-200',
  Produit:    'bg-amber-50  text-amber-700  border-amber-200',
  Marketing:  'bg-green-50  text-green-700  border-green-200',
}

const quickFilters = [
  { label: 'Tous',       fn: () => true },
  { label: 'Publiés',    fn: (a) => a.status === 'publie' },
  { label: 'Brouillons', fn: (a) => a.status === 'brouillon' },
  { label: 'Planifiés',  fn: (a) => a.status === 'planifie' },
]

export default function ArticlesTable({ articles, deleteArticleAction, toggleStatusAction, bulkAction }) {
  const router = useRouter()
  const { withLoading } = useWithLoading()
  const [deleteTarget, setDeleteTarget]   = useState(null)
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false)
  const [activeFilter, setActiveFilter]   = useState(0)
  const [selected, setSelected]           = useState(new Set())
  const [loadingId, setLoadingId]         = useState(null)
  const [search, setSearch]               = useState('')

  const displayed = articles
    .filter(quickFilters[activeFilter].fn)
    .filter(a => !search || a.title.toLowerCase().includes(search.toLowerCase()))

  const allSelected = displayed.length > 0 && displayed.every(a => selected.has(a.id))
  const someSelected = selected.size > 0

  function toggleSelect(id) {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  function toggleAll() {
    if (allSelected) {
      setSelected(prev => {
        const next = new Set(prev)
        displayed.forEach(a => next.delete(a.id))
        return next
      })
    } else {
      setSelected(prev => {
        const next = new Set(prev)
        displayed.forEach(a => next.add(a.id))
        return next
      })
    }
  }

  async function handleToggleStatus(article) {
    setLoadingId(article.id)
    const fd = new FormData()
    fd.set('id', article.id)
    fd.set('status', article.status === 'publie' ? 'brouillon' : 'publie')
    await withLoading(() => toggleStatusAction(fd))
    router.refresh()
    setLoadingId(null)
  }

  async function handleBulk(action) {
    if (action === 'delete') { setBulkDeleteOpen(true); return }
    const fd = new FormData()
    fd.set('ids', JSON.stringify([...selected]))
    fd.set('action', action)
    await withLoading(() => bulkAction(fd))
    setSelected(new Set())
    router.refresh()
  }

  async function confirmBulkDelete() {
    const fd = new FormData()
    fd.set('ids', JSON.stringify([...selected]))
    fd.set('action', 'delete')
    await withLoading(() => bulkAction(fd))
    setSelected(new Set())
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-semibold text-slate-900">Articles</h1>
          <p className="text-sm text-slate-400 mt-0.5">{articles.length} articles au total</p>
        </div>
        <Button
          size="sm"
          onClick={() => router.push('/admin/edit')}
          className="cursor-pointer gap-1.5 shrink-0 bg-primary hover:bg-primary-hover text-white border-none"
        >
          <Plus size={14} />
          <span className="hidden sm:inline">Nouvel article</span>
          <span className="sm:hidden">Nouveau</span>
        </Button>
      </div>

      {/* Quick filters */}
      <div className="flex gap-2 flex-wrap">
        {quickFilters.map(({ label, fn }, i) => (
          <button
            key={label}
            onClick={() => { setActiveFilter(i); setSelected(new Set()) }}
            className={`text-sm font-medium px-3 py-1.5 rounded-lg border transition-all cursor-pointer
              ${activeFilter === i
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'
              }`}
          >
            {label}
            <span className="ml-1.5 text-[11px] font-bold opacity-70">{articles.filter(fn).length}</span>
          </button>
        ))}
      </div>

      {/* Barre de recherche */}
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <div className="relative flex-1 min-w-0 sm:min-w-48 sm:max-w-sm">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un article..."
            className="pl-9 pr-3 h-10 w-full bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
          />
        </div>
      </div>

      {/* Bulk action bar */}
      {someSelected && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-primary/5 border border-primary/20 rounded-xl">
          <CheckSquare size={15} className="text-primary shrink-0" />
          <span className="text-sm font-semibold text-primary flex-1">
            {selected.size} article{selected.size > 1 ? 's' : ''} sélectionné{selected.size > 1 ? 's' : ''}
          </span>
          <div className="flex gap-2 flex-wrap">
            <Button size="sm" variant="outline" onClick={() => handleBulk('publie')}
              className="gap-1.5 cursor-pointer text-emerald-700 border-emerald-300 hover:bg-emerald-50">
              <Globe size={13} /> Publier
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleBulk('brouillon')}
              className="gap-1.5 cursor-pointer text-slate-600 border-slate-300 hover:bg-slate-50">
              <EyeOff size={13} /> Dépublier
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleBulk('delete')}
              className="gap-1.5 cursor-pointer text-red-600 border-red-300 hover:bg-red-50">
              <Trash2 size={13} /> Supprimer
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setSelected(new Set())}
              className="cursor-pointer text-slate-400 hover:text-slate-600">
              Désélectionner
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50 border-slate-200">
              <TableHead className="w-10 pl-4">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={toggleAll}
                  className="cursor-pointer"
                  aria-label="Tout sélectionner"
                />
              </TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 w-[40%]">Article</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 hidden md:table-cell">Catégorie</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">Statut</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 hidden sm:table-cell">Date</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 pr-4 md:pr-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {displayed.map((article) => {
              const status = statusConfig[article.status] ?? statusConfig.brouillon
              const categoryName = article.category?.name ?? ''
              const catClass = categoryColors[categoryName] ?? 'bg-slate-50 text-slate-700 border-slate-200'
              const isLoading = loadingId === article.id
              const isPublie = article.status === 'publie'

              return (
                <TableRow key={article.id} className={`group border-slate-100 hover:bg-slate-50/60 transition-colors ${selected.has(article.id) ? 'bg-primary/5' : ''}`}>

                  {/* Checkbox */}
                  <TableCell className="pl-4 w-10">
                    <Checkbox
                      checked={selected.has(article.id)}
                      onCheckedChange={() => toggleSelect(article.id)}
                      className="cursor-pointer"
                    />
                  </TableCell>

                  {/* Article */}
                  <TableCell className="py-3 md:py-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      {article.image && (
                        <img src={article.image} alt={article.title}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate max-w-[140px] sm:max-w-[200px] md:max-w-60">
                          {article.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 truncate max-w-[140px] sm:max-w-[200px] md:max-w-60 hidden sm:block">
                          {article.excerpt}
                        </p>
                        <p className="text-[11px] text-slate-400 italic mt-0.5 hidden md:block">
                          {article.readTime} min · {article.author}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Catégorie */}
                  <TableCell className="hidden md:table-cell">
                    <span className={`text-[11px] font-bold uppercase px-2.5 py-1 rounded-md border ${catClass}`}>
                      {categoryName}
                    </span>
                  </TableCell>

                  {/* Statut + toggle rapide */}
                  <TableCell>
                    <button
                      onClick={() => handleToggleStatus(article)}
                      disabled={isLoading || article.status === 'planifie'}
                      title={article.status === 'planifie' ? 'Planifié — éditer pour changer' : isPublie ? 'Cliquer pour dépublier' : 'Cliquer pour publier'}
                      className="cursor-pointer disabled:cursor-default disabled:opacity-70 group/toggle"
                    >
                      <Badge className={`text-[11px] font-semibold border transition-all ${status.className} ${!isLoading && article.status !== 'planifie' ? 'group-hover/toggle:scale-105' : ''}`}>
                        {isLoading ? '…' : status.label}
                      </Badge>
                    </button>
                  </TableCell>

                  {/* Date */}
                  <TableCell className="text-xs text-slate-400 whitespace-nowrap hidden sm:table-cell">
                    {new Date(article.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="pr-4 md:pr-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer text-slate-400 hover:text-slate-700">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => router.push(`/blog/${article.slug}`)} className="gap-2 cursor-pointer text-slate-600">
                          <Eye size={14} /> Voir l'article
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push(`/admin/edit?id=${article.id}`)} className="gap-2 cursor-pointer text-slate-600">
                          <Pencil size={14} /> Modifier
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleToggleStatus(article)} disabled={article.status === 'planifie'}
                          className="gap-2 cursor-pointer text-slate-600">
                          {isPublie ? <><EyeOff size={14} /> Dépublier</> : <><Globe size={14} /> Publier</>}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setDeleteTarget(article)}
                          className="gap-2 cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
                          <Trash2 size={14} /> Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}

            {displayed.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-16 text-center">
                  <p className="text-sm font-medium text-slate-500 mb-1">Aucun article trouvé</p>
                  <button onClick={() => router.push('/admin/edit')} className="text-sm text-primary hover:underline cursor-pointer bg-transparent border-none font-medium">
                    Créer le premier article →
                  </button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* AlertDialog suppression unitaire */}
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
              className="bg-red-600 hover:bg-red-700 cursor-pointer"
              onClick={async () => {
                const fd = new FormData()
                fd.set('id', deleteTarget.id)
                await withLoading(() => deleteArticleAction(fd))
                router.refresh()
              }}
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* AlertDialog suppression bulk */}
      <AlertDialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer {selected.size} article{selected.size > 1 ? 's' : ''} ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Les {selected.size} articles sélectionnés seront définitivement supprimés.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Annuler</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 cursor-pointer" onClick={confirmBulkDelete}>
              Supprimer tout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}
