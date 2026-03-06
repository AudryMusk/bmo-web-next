import { useState } from 'react'
import { Code2, Palette, Package, BarChart2, Pencil, Trash2, Plus, Layers } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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

// ─── Constantes ───────────────────────────────────────────────────────────────

const COLORS = [
  '#2563EB', '#7C3AED', '#D97706', '#059669',
  '#DC2626', '#0891B2', '#BE185D', '#374151',
]

const categoryIcons = {
  Ingénierie: Code2,
  Design:     Palette,
  Produit:    Package,
  Marketing:  BarChart2,
}

function toSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

const emptyForm = { name: '', description: '', color: COLORS[0] }

// ─── Composant formulaire ─────────────────────────────────────────────────────

function CategoryForm({ form, onChange }) {
  return (
    <div className="flex flex-col gap-5">

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="cat-name">Nom</Label>
        <Input
          id="cat-name"
          placeholder="ex. Ingénierie"
          value={form.name}
          onChange={e => onChange({ ...form, name: e.target.value })}
        />
        {form.name && (
          <p className="text-xs text-slate-400">
            Slug : <span className="font-mono">{toSlug(form.name)}</span>
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="cat-desc">Description</Label>
        <textarea
          id="cat-desc"
          rows={3}
          placeholder="Décrivez cette catégorie..."
          value={form.description}
          onChange={e => onChange({ ...form, description: e.target.value })}
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-primary resize-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Couleur</Label>
        <div className="flex gap-2 flex-wrap">
          {COLORS.map(color => (
            <button
              key={color}
              type="button"
              onClick={() => onChange({ ...form, color })}
              className="w-7 h-7 rounded-full border-2 transition-all cursor-pointer"
              style={{
                backgroundColor: color,
                borderColor: form.color === color ? '#0f172a' : 'transparent',
                outline: form.color === color ? `2px solid ${color}` : 'none',
                outlineOffset: '2px',
              }}
            />
          ))}
        </div>
      </div>

    </div>
  )
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function Categories({ categories, addCategory, updateCategory, deleteCategory }) {
  const [dialogMode, setDialogMode]     = useState(null)   // 'create' | 'edit'
  const [selectedCat, setSelectedCat]   = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm]                 = useState(emptyForm)

  const totalArticles = categories.reduce((sum, c) => sum + c.articlesCount, 0)

  function openCreate() {
    setForm(emptyForm)
    setDialogMode('create')
  }

  function openEdit(cat) {
    setSelectedCat(cat)
    setForm({ name: cat.name, description: cat.description, color: cat.color })
    setDialogMode('edit')
  }

  function handleSave() {
    const payload = { ...form, slug: toSlug(form.name) }
    if (dialogMode === 'create') {
      addCategory(payload)
    } else {
      updateCategory(selectedCat.id, payload)
    }
    setDialogMode(null)
  }

  function handleDelete() {
    deleteCategory(deleteTarget.id)
    setDeleteTarget(null)
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Catégories</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            {categories.length} catégories · {totalArticles} articles au total
          </p>
        </div>
        <Button size="sm" className="cursor-pointer gap-1.5" onClick={openCreate}>
          <Plus size={14} />
          Nouvelle catégorie
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 hover:bg-slate-50 border-slate-200">
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 pl-6 w-55">Nom</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">Description</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 w-30">Slug</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 w-30">Articles</TableHead>
              <TableHead className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400 w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.name] ?? Layers
              return (
                <TableRow key={cat.id} className="group border-slate-100 hover:bg-slate-50/60 transition-colors">
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{ backgroundColor: cat.color + '18' }}
                      >
                        <Icon size={14} style={{ color: cat.color }} />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-900">{cat.name}</span>
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="text-sm text-slate-500 max-w-xs block truncate">{cat.description}</span>
                  </TableCell>
                  <TableCell className="py-4">
                    <span className="font-mono text-xs text-slate-400 bg-slate-50 border border-slate-200 px-2 py-1 rounded-md">
                      {cat.slug}
                    </span>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge variant="secondary" className="text-xs font-medium">
                      {cat.articlesCount} articles
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEdit(cat)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 border-none bg-transparent cursor-pointer transition-all"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(cat)}
                        className="p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 border-none bg-transparent cursor-pointer transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}

            {categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-sm text-slate-400">
                  Aucune catégorie. Créez-en une.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog Créer / Modifier */}
      <Dialog open={!!dialogMode} onOpenChange={() => setDialogMode(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {dialogMode === 'create' ? 'Nouvelle catégorie' : 'Modifier la catégorie'}
            </DialogTitle>
          </DialogHeader>

          <CategoryForm form={form} onChange={setForm} />

          <DialogFooter className="mt-2">
            <Button variant="outline" onClick={() => setDialogMode(null)} className="cursor-pointer">
              Annuler
            </Button>
            <Button
              onClick={handleSave}
              disabled={!form.name.trim()}
              className="cursor-pointer"
            >
              {dialogMode === 'create' ? 'Créer' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AlertDialog Supprimer */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer «{deleteTarget?.name}» ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Les {deleteTarget?.articlesCount} articles associés
              ne seront pas supprimés mais perdront leur catégorie.
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
