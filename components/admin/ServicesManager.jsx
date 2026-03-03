'use client'

import { useFormState } from 'react-dom'
import { useState, useEffect } from 'react'
import { Pencil, X, Check, ChevronDown, ChevronUp, icons as LucideIcons } from 'lucide-react'

function ServiceIcon({ name }) {
  if (!name) return null
  const Icon = LucideIcons[name]
  if (Icon) return <Icon size={18} className="text-primary shrink-0" />
  return <span className="text-lg shrink-0">{name}</span>
}
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import SubmitButton from './SubmitButton'

function ServiceRow({ service, updateAction }) {
  const [editing, setEditing] = useState(false)
  const [open, setOpen]       = useState(false)
  const [state, formAction]   = useFormState(updateAction, null)

  useEffect(() => { if (state?.success) setEditing(false) }, [state])

  const features = Array.isArray(service.features) ? service.features : []

  if (editing) {
    return (
      <div className="border border-primary/30 rounded-xl p-4 bg-tint flex flex-col gap-3">
        <form action={formAction} className="flex flex-col gap-3">
          <input type="hidden" name="id" value={service.id} />
          {state?.error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{state.error}</p>
          )}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">Titre</label>
            <input
              name="title"
              defaultValue={service.title}
              required
              className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">Icône (nom Lucide ou emoji)</label>
            <input
              name="icon"
              defaultValue={service.icon ?? ''}
              placeholder="ex: Smartphone"
              className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">Description</label>
            <textarea
              name="description"
              defaultValue={service.description}
              rows={3}
              required
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors resize-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">Fonctionnalités (une par ligne)</label>
            <textarea
              name="features"
              defaultValue={features.join('\n')}
              rows={Math.max(3, features.length + 1)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors resize-none font-mono"
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="ghost" size="sm" onClick={() => setEditing(false)} className="gap-1.5 cursor-pointer">
              <X size={14} /> Annuler
            </Button>
            <SubmitButton
              loadingText="Enregistrement…"
              className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md bg-primary hover:bg-primary-hover text-white border-none cursor-pointer disabled:opacity-60"
              onClick={() => { if (state?.success) setEditing(false) }}
            >
              <Check size={14} /> Enregistrer
            </SubmitButton>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <ServiceIcon name={service.icon} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">{service.title}</p>
            <p className="text-xs text-slate-400 truncate max-w-xs">{service.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Badge variant="outline" className="text-[10px]">{features.length} fonctionnalité{features.length !== 1 ? 's' : ''}</Badge>
          <button onClick={() => setOpen(o => !o)} className="h-7 w-7 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-50 cursor-pointer border-none bg-transparent transition-colors">
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          <button onClick={() => setEditing(true)} className="h-7 w-7 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-50 cursor-pointer border-none bg-transparent transition-colors">
            <Pencil size={14} />
          </button>
        </div>
      </div>
      {open && features.length > 0 && (
        <div className="px-4 pb-3 border-t border-slate-100">
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {features.map((f, i) => (
              <li key={i} className="text-[11px] bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md">{f}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default function ServicesManager({ services, updateAction, typeLabel }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg md:text-xl font-semibold text-slate-900">Services — {typeLabel}</h1>
        <p className="text-sm text-slate-400 mt-0.5">{services.length} service{services.length !== 1 ? 's' : ''}</p>
      </div>
      <div className="flex flex-col gap-3">
        {services.map(service => (
          <ServiceRow key={service.id} service={service} updateAction={updateAction} />
        ))}
      </div>
    </div>
  )
}
