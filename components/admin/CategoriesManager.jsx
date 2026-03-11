'use client'

import { useState, useEffect } from 'react'
import { useActionState } from 'react'
import { useRouter } from 'next/navigation'
import { Code2, Palette, Package, BarChart2, Pencil, Trash2, Plus, Layers } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import SubmitButton from './SubmitButton'
import { useWithLoading } from '@/context/LoadingContext'

const COLORS = ['#2563EB', '#7C3AED', '#D97706', '#059669', '#DC2626', '#0891B2', '#BE185D', '#374151']
const categoryIcons = { Ingénierie: Code2, Design: Palette, Produit: Package, Marketing: BarChart2 }

const emptyForm = { name: '', description: '', color: COLORS[0] }

function CategoryForm({ form, onChange, fieldErrors }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Nom</label>
        <input
          placeholder="ex. Ingénierie"
          value={form.name}
          onChange={e => onChange({ ...form, name: e.target.value })}
          className={`h-9 rounded-lg border px-3 text-sm outline-none focus:ring-2 transition-colors ${fieldErrors?.name ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-primary focus:ring-primary/15'}`}
        />
        {fieldErrors?.name
          ? <p className="text-xs text-red-500">{fieldErrors.name[0]}</p>
          : form.name && (
            <p className="text-xs text-slate-400">Slug : <span className="font-mono">{form.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}</span></p>
          )
        }
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700">Description</label>
        <textarea
          rows={3}
          placeholder="Décrivez cette catégorie..."
          value={form.description}
          onChange={e => onChange({ ...form, description: e.target.value })}
          className={`w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 transition-colors resize-none ${fieldErrors?.description ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : 'border-slate-200 focus:border-primary focus:ring-primary/15'}`}
        />
        {fieldErrors?.description && (
          <p className="text-xs text-red-500">{fieldErrors.description[0]}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-700">Couleur</label>
        <div className="flex gap-2 flex-wrap">
          {COLORS.map(color => (
            <button
              key={color}
              type="button"
              onClick={() => onChange({ ...form, color })}
              className={`w-7 h-7 rounded-full transition-all cursor-pointer ${form.color === color ? 'ring-2 ring-offset-2 ring-slate-700' : ''}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CategoriesManager({ categories, createAction, updateAction, deleteAction }) {
  const [dialogMode, setDialogMode]     = useState(null)
  const [selectedCat, setSelectedCat]   = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm]                 = useState(emptyForm)

  const router = useRouter()
  const { withLoading } = useWithLoading()
  const [createState, createFormAction] = useActionState(createAction, null)
  const [updateState, updateFormAction] = useActionState(updateAction, null)

  useEffect(() => { if (createState?.success) setDialogMode(null) }, [createState])
  useEffect(() => { if (updateState?.success) setDialogMode(null) }, [updateState])

  const totalArticles = categories.reduce((sum, c) => sum + c.articlesCount, 0)

  function openCreate() { setForm(emptyForm); setDialogMode('create') }
  function openEdit(cat) {
    setSelectedCat(cat)
    setForm({ name: cat.name, description: cat.description ?? '', color: cat.color })
    setDialogMode('edit')
  }

  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-semibold text-slate-900">Catégories</h1>
          <p className="text-sm text-slate-400 mt-0.5">{categories.length} catégories · {totalArticles} articles au total</p>
        </div>
        <Button size="sm" className="cursor-pointer gap-1.5 shrink-0 bg-primary hover:bg-primary-hover text-white" onClick={openCreate}>
          <Plus size={14} />
          <span className="hidden sm:inline">Nouvelle catégorie</span>
          <span className="sm:hidden">Nouvelle</span>
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50 border-slate-200">
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 pl-4 md:pl-6">Nom</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 hidden md:table-cell">Description</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 hidden sm:table-cell">Slug</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">Articles</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.name] ?? Layers
              return (
                <TableRow key={cat.id} className="group border-slate-100 hover:bg-slate-50/60 transition-colors">
                  <TableCell className="pl-4 md:pl-6 py-3 md:py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: cat.color + '18' }}>
                        <Icon size={14} style={{ color: cat.color }} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-900">{cat.name}</span>
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 hidden md:table-cell">
                    <span className="text-sm text-slate-500 max-w-xs block truncate">{cat.description}</span>
                  </TableCell>
                  <TableCell className="py-4 hidden sm:table-cell">
                    <span className="font-mono text-xs text-slate-400 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md">{cat.slug}</span>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge variant="secondary" className="text-xs font-medium">{cat.articlesCount} articles</Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openEdit(cat)} className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 border-none bg-transparent cursor-pointer transition-all">
                        <Pencil size={13} />
                      </button>
                      <button onClick={() => setDeleteTarget(cat)} className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 border-none bg-transparent cursor-pointer transition-all">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
            {categories.length === 0 && (
              <TableRow><TableCell colSpan={5} className="py-12 text-center text-sm text-slate-400">Aucune catégorie. Créez-en une.</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog Créer / Modifier */}
      <Dialog open={!!dialogMode} onOpenChange={() => setDialogMode(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{dialogMode === 'create' ? 'Nouvelle catégorie' : 'Modifier la catégorie'}</DialogTitle>
          </DialogHeader>
          <form action={dialogMode === 'create' ? createFormAction : updateFormAction}>
            {dialogMode === 'edit' && <input type="hidden" name="id" value={selectedCat?.id} />}
            <input type="hidden" name="name" value={form.name} />
            <input type="hidden" name="description" value={form.description} />
            <input type="hidden" name="color" value={form.color} />
            <CategoryForm
              form={form}
              onChange={setForm}
              fieldErrors={dialogMode === 'create' ? createState?.fieldErrors : updateState?.fieldErrors}
            />
            {(createState?.error || updateState?.error) && (
              <p className="text-sm text-red-600 mt-3">{createState?.error || updateState?.error}</p>
            )}
            <DialogFooter className="mt-4">
              <Button type="button" variant="outline" onClick={() => setDialogMode(null)} className="cursor-pointer">Annuler</Button>
              <SubmitButton
                disabled={!form.name.trim()}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer bg-primary hover:bg-primary-hover text-white px-4 py-2 disabled:opacity-60"
              >
                {dialogMode === 'create' ? 'Créer' : 'Enregistrer'}
              </SubmitButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* AlertDialog Supprimer */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer «{deleteTarget?.name}» ?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                <p>Cette action est irréversible.</p>
                {deleteTarget?.articlesCount > 0 && (
                  <p className="mt-1 font-semibold text-red-600">
                    ⚠ {deleteTarget.articlesCount} article{deleteTarget.articlesCount > 1 ? 's' : ''} associé{deleteTarget.articlesCount > 1 ? 's' : ''} sera{deleteTarget.articlesCount > 1 ? 'ont' : ''} également supprimé{deleteTarget.articlesCount > 1 ? 's' : ''} définitivement.
                  </p>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Annuler</AlertDialogCancel>
            <AlertDialogAction
              className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 text-white px-4 py-2 cursor-pointer"
              onClick={async () => {
                const id = deleteTarget.id
                const fd = new FormData()
                fd.set('id', id)
                await withLoading(() => deleteAction(fd))
                router.refresh()
              }}
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}
