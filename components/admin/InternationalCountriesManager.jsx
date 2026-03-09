'use client'

import { useActionState } from 'react'
import { useState, useEffect } from 'react'
import { Pencil, X, Check, Plus, Trash2, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SubmitButton from './SubmitButton'

function CountryRow({ country, updateAction, deleteAction }) {
  const [editing, setEditing]         = useState(false)
  const [confirming, setConfirming]   = useState(false)
  const [updateState, updateFormAction] = useActionState(updateAction, null)
  const [deleteState, deleteFormAction] = useActionState(deleteAction, null)

  useEffect(() => { if (updateState?.success) setEditing(false) }, [updateState])
  useEffect(() => { if (deleteState?.success) setConfirming(false) }, [deleteState])

  if (editing) {
    return (
      <div className="border border-primary/30 rounded-xl p-3 bg-tint">
        <form action={updateFormAction} className="flex items-center gap-2">
          <input type="hidden" name="id" value={country.id} />
          {updateState?.error && (
            <p className="text-xs text-red-600">{updateState.error}</p>
          )}
          <input
            name="name"
            defaultValue={country.name}
            required
            autoFocus
            placeholder="Nom du pays"
            className="flex-1 h-8 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
          />
          <Button type="button" variant="ghost" size="sm" onClick={() => setEditing(false)} className="h-8 px-2 cursor-pointer">
            <X size={14} />
          </Button>
          <SubmitButton
            loadingText="…"
            className="inline-flex items-center gap-1 text-xs font-medium px-3 h-8 rounded-md bg-primary hover:bg-primary-hover text-white border-none cursor-pointer disabled:opacity-60"
          >
            <Check size={13} /> OK
          </SubmitButton>
        </form>
      </div>
    )
  }

  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 gap-3">
        <div className="flex items-center gap-2.5">
          <Globe size={15} className="text-primary shrink-0" />
          <span className="text-sm font-medium text-slate-800">{country.name}</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => setEditing(true)}
            className="h-7 w-7 flex items-center justify-center rounded-md text-slate-300 hover:text-slate-700 hover:bg-slate-50 cursor-pointer border-none bg-transparent transition-colors"
          >
            <Pencil size={13} />
          </button>
          <button
            onClick={() => setConfirming(true)}
            className="h-7 w-7 flex items-center justify-center rounded-md text-slate-300 hover:text-red-500 hover:bg-red-50 cursor-pointer border-none bg-transparent transition-colors"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {confirming && (
        <div className="border-t border-red-100 bg-red-50 px-4 py-2.5 flex items-center justify-between gap-3">
          <p className="text-xs text-red-700">Supprimer <strong>{country.name}</strong> ?</p>
          {deleteState?.error && <p className="text-xs text-red-600">{deleteState.error}</p>}
          <div className="flex gap-2 shrink-0">
            <Button type="button" variant="ghost" size="sm" onClick={() => setConfirming(false)} className="h-6 text-xs cursor-pointer px-2">
              Annuler
            </Button>
            <form action={deleteFormAction}>
              <input type="hidden" name="id" value={country.id} />
              <SubmitButton
                loadingText="…"
                className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 h-6 rounded bg-red-600 hover:bg-red-700 text-white border-none cursor-pointer disabled:opacity-60"
              >
                <Trash2 size={11} /> Supprimer
              </SubmitButton>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function AddCountryForm({ createAction, onCancel, onCreated }) {
  const [state, formAction] = useActionState(createAction, null)
  useEffect(() => { if (state?.success) onCreated() }, [state])

  return (
    <div className="border border-primary/40 rounded-xl p-3 bg-tint">
      <form action={formAction} className="flex items-center gap-2">
        {state?.error && <p className="text-xs text-red-600">{state.error}</p>}
        <input
          name="name"
          required
          autoFocus
          placeholder="ex: Côte d'Ivoire"
          className="flex-1 h-8 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
        />
        <Button type="button" variant="ghost" size="sm" onClick={onCancel} className="h-8 px-2 cursor-pointer">
          <X size={14} />
        </Button>
        <SubmitButton
          loadingText="…"
          className="inline-flex items-center gap-1 text-xs font-medium px-3 h-8 rounded-md bg-primary hover:bg-primary-hover text-white border-none cursor-pointer disabled:opacity-60"
        >
          <Check size={13} /> Ajouter
        </SubmitButton>
      </form>
    </div>
  )
}

export default function InternationalCountriesManager({ countries, createAction, updateAction, deleteAction }) {
  const [adding, setAdding] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-800">Pays — Transferts Internationaux</h2>
          <p className="text-xs text-slate-400 mt-0.5">{countries.length} destination{countries.length !== 1 ? 's' : ''}</p>
        </div>
        {!adding && (
          <Button size="sm" onClick={() => setAdding(true)} className="gap-1.5 cursor-pointer">
            <Plus size={14} /> Ajouter un pays
          </Button>
        )}
      </div>

      {adding && (
        <AddCountryForm
          createAction={createAction}
          onCancel={() => setAdding(false)}
          onCreated={() => setAdding(false)}
        />
      )}

      <div className="grid sm:grid-cols-2 gap-2">
        {countries.map(c => (
          <CountryRow
            key={c.id}
            country={c}
            updateAction={updateAction}
            deleteAction={deleteAction}
          />
        ))}
        {countries.length === 0 && !adding && (
          <p className="col-span-2 text-sm text-slate-400 text-center py-6 border border-dashed border-slate-200 rounded-xl">
            Aucun pays. Cliquez sur &quot;Ajouter un pays&quot;.
          </p>
        )}
      </div>
    </div>
  )
}
