'use client'

import { useFormState } from 'react-dom'
import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import SubmitButton from './SubmitButton'

function Field({ field, defaultValue }) {
  if (field.type === 'textarea') {
    return (
      <div className="flex flex-col gap-0.5">
        <label className="text-xs font-medium text-slate-600">{field.label}</label>
        <textarea
          name={field.name}
          defaultValue={defaultValue ?? ''}
          required={field.required}
          rows={2}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors resize-none"
        />
      </div>
    )
  }
  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-xs font-medium text-slate-600">{field.label}</label>
      <input
        name={field.name}
        type={field.type ?? 'text'}
        defaultValue={defaultValue ?? ''}
        required={field.required}
        placeholder={field.placeholder ?? ''}
        className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
      />
    </div>
  )
}

function EditRow({ item, fields, updateAction, onCancel }) {
  const [state, formAction] = useFormState(updateAction, null)

  useEffect(() => { if (state?.success) onCancel() }, [state])

  return (
    <form action={formAction} className="flex flex-col gap-3 p-4 bg-tint border border-primary/20 rounded-xl">
      <input type="hidden" name="id" value={item.id} />
      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{state.error}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fields.map(f => <Field key={f.name} field={f} defaultValue={item[f.name]} />)}
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel} className="gap-1.5 cursor-pointer">
          <X size={13} /> Annuler
        </Button>
        <SubmitButton
          loadingText="Enregistrement…"
          className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md bg-primary hover:bg-primary-hover text-white border-none cursor-pointer disabled:opacity-60"
        >
          <Check size={13} /> Enregistrer
        </SubmitButton>
      </div>
    </form>
  )
}

function AddRow({ fields, createAction, onCancel }) {
  const [state, formAction] = useFormState(createAction, null)

  useEffect(() => { if (state?.success) onCancel() }, [state])

  return (
    <form action={formAction} className="flex flex-col gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{state.error}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fields.map(f => <Field key={f.name} field={f} defaultValue="" />)}
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel} className="gap-1.5 cursor-pointer">
          <X size={13} /> Annuler
        </Button>
        <SubmitButton
          loadingText="Ajout…"
          className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white border-none cursor-pointer disabled:opacity-60"
        >
          <Plus size={13} /> Ajouter
        </SubmitButton>
      </div>
    </form>
  )
}

function ItemDisplay({ item, displayConfig }) {
  const { primary, secondary, detail, badge, count } = displayConfig
  return (
    <div>
      <div className="flex items-center gap-2">
        <p className="text-sm font-semibold text-slate-900">{item[primary]}</p>
        {badge && item[badge] && (
          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-500">
            {item[badge]}
          </span>
        )}
      </div>
      {secondary && item[secondary] && (
        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item[secondary]}</p>
      )}
      {count && (
        <p className="text-xs text-slate-400">
          {item[count.field]} {item[count.field] !== 1 ? count.plural : count.singular}
        </p>
      )}
      {detail && item[detail] && (
        <p className="text-xs text-slate-400">{item[detail]}</p>
      )}
    </div>
  )
}

export default function NetworkManager({ title, items, fields, displayConfig, createAction, updateAction, deleteAction }) {
  const router = useRouter()
  const [editingId, setEditingId]       = useState(null)
  const [adding, setAdding]             = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-semibold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-400 mt-0.5">{items.length} entrée{items.length !== 1 ? 's' : ''}</p>
        </div>
        <Button
          size="sm"
          onClick={() => { setAdding(true); setEditingId(null) }}
          className="cursor-pointer gap-1.5 shrink-0 bg-primary hover:bg-primary-hover text-white border-none"
        >
          <Plus size={14} /> Ajouter
        </Button>
      </div>

      {adding && (
        <AddRow fields={fields} createAction={createAction} onCancel={() => setAdding(false)} />
      )}

      <div className="flex flex-col gap-2">
        {items.map(item => (
          editingId === item.id ? (
            <EditRow
              key={item.id}
              item={item}
              fields={fields}
              updateAction={updateAction}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div key={item.id} className="flex items-center justify-between gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl group hover:border-slate-300 transition-colors">
              <div className="min-w-0"><ItemDisplay item={item} displayConfig={displayConfig} /></div>
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => { setEditingId(item.id); setAdding(false) }}
                  className="h-7 w-7 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer border-none bg-transparent transition-colors"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => setDeleteTarget(item)}
                  className="h-7 w-7 flex items-center justify-center rounded-md text-red-400 hover:text-red-600 hover:bg-red-50 cursor-pointer border-none bg-transparent transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          )
        ))}

        {items.length === 0 && !adding && (
          <div className="py-12 text-center text-slate-400 text-sm">
            Aucune entrée. Cliquez sur Ajouter pour commencer.
          </div>
        )}
      </div>

      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette entrée ?</AlertDialogTitle>
            <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Annuler</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 cursor-pointer"
              onClick={async () => {
                const id = deleteTarget.id
                const fd = new FormData()
                fd.set('id', id)
                await deleteAction(fd)
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
