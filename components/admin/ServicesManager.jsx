'use client'

import { useFormState } from 'react-dom'
import { useState, useEffect } from 'react'
import { Pencil, X, Check, ChevronDown, ChevronUp, Plus, Trash2, icons as LucideIcons } from 'lucide-react'

function ServiceIcon({ name }) {
  if (!name) return null
  const Icon = LucideIcons[name]
  if (Icon) return <Icon size={18} className="text-primary shrink-0" />
  return <span className="text-lg shrink-0">{name}</span>
}
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import SubmitButton from './SubmitButton'

/* ─── Formulaire création ─────────────────────────────────────────────────── */
function CreateServiceForm({ createAction, type, onCancel, onCreated }) {
  const [state, formAction] = useFormState(createAction, null)
  useEffect(() => { if (state?.success) onCreated() }, [state])

  const field = (name, label, required = false, textarea = false, placeholder = '', rows = 3) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-600">{label}</label>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          placeholder={placeholder}
          rows={rows}
          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors resize-none"
        />
      ) : (
        <input
          name={name}
          required={required}
          placeholder={placeholder}
          className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
        />
      )}
    </div>
  )

  return (
    <div className="border border-primary/40 rounded-xl p-4 bg-tint">
      <p className="text-sm font-semibold text-slate-800 mb-3">Nouveau service</p>
      <form action={formAction} className="flex flex-col gap-3">
        <input type="hidden" name="type" value={type} />
        {state?.error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{state.error}</p>
        )}
        {field('title', 'Titre', true, false, "ex: Transferts d'argent")}
        {field('icon', 'Icône (nom Lucide ou emoji)', false, false, 'ex: ArrowLeftRight')}
        {field('description', 'Description', true, true, 'Description courte du service…')}
        {field('features', 'Fonctionnalités (une par ligne)', false, true, 'Fonctionnalité 1\nFonctionnalité 2', 4)}
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="ghost" size="sm" onClick={onCancel} className="gap-1.5 cursor-pointer">
            <X size={14} /> Annuler
          </Button>
          <SubmitButton
            loadingText="Création…"
            className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md bg-primary hover:bg-primary-hover text-white border-none cursor-pointer disabled:opacity-60"
          >
            <Check size={14} /> Créer
          </SubmitButton>
        </div>
      </form>
    </div>
  )
}

function ServiceRow({ service, updateAction, deleteAction, isOpen, onToggle }) {
  const [editing, setEditing]       = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [state, formAction]         = useFormState(updateAction, null)
  const [deleteState, deleteFormAction] = useFormState(deleteAction, null)

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
          <button onClick={onToggle} className="h-7 w-7 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-50 cursor-pointer border-none bg-transparent transition-colors">
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          <button onClick={() => setEditing(true)} className="h-7 w-7 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-50 cursor-pointer border-none bg-transparent transition-colors">
            <Pencil size={14} />
          </button>
          <button
            onClick={() => setConfirming(true)}
            className="h-7 w-7 flex items-center justify-center rounded-md text-slate-300 hover:text-red-500 hover:bg-red-50 cursor-pointer border-none bg-transparent transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Confirmation suppression */}
      {confirming && (
        <div className="border-t border-red-100 bg-red-50 px-4 py-3 flex items-center justify-between gap-3">
          <p className="text-xs text-red-700">Supprimer <strong>{service.title}</strong> ? Cette action est irréversible.</p>
          {deleteState?.error && <p className="text-xs text-red-600">{deleteState.error}</p>}
          <div className="flex gap-2 shrink-0">
            <Button type="button" variant="ghost" size="sm" onClick={() => setConfirming(false)} className="text-xs cursor-pointer h-7 px-2">
              Annuler
            </Button>
            <form action={deleteFormAction}>
              <input type="hidden" name="id" value={service.id} />
              <SubmitButton
                loadingText="…"
                className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 h-7 rounded-md bg-red-600 hover:bg-red-700 text-white border-none cursor-pointer disabled:opacity-60"
              >
                <Trash2 size={12} /> Supprimer
              </SubmitButton>
            </form>
          </div>
        </div>
      )}

      {isOpen && features.length > 0 && (
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

export default function ServicesManager({ services, updateAction, createAction, deleteAction, typeLabel, serviceType }) {
  const [openId, setOpenId]     = useState(null)
  const [creating, setCreating] = useState(false)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-semibold text-slate-900">Services — {typeLabel}</h1>
          <p className="text-sm text-slate-400 mt-0.5">{services.length} service{services.length !== 1 ? 's' : ''}</p>
        </div>
        {!creating && (
          <Button size="sm" onClick={() => setCreating(true)} className="gap-1.5 cursor-pointer">
            <Plus size={15} /> Ajouter
          </Button>
        )}
      </div>

      {creating && (
        <CreateServiceForm
          createAction={createAction}
          type={serviceType}
          onCancel={() => setCreating(false)}
          onCreated={() => setCreating(false)}
        />
      )}

      <div className="flex flex-col gap-3">
        {services.map(service => (
          <ServiceRow
            key={service.id}
            service={service}
            updateAction={updateAction}
            deleteAction={deleteAction}
            isOpen={openId === service.id}
            onToggle={() => setOpenId(prev => prev === service.id ? null : service.id)}
          />
        ))}
        {services.length === 0 && !creating && (
          <p className="text-sm text-slate-400 text-center py-8 border border-dashed border-slate-200 rounded-xl">
            Aucun service. Cliquez sur &quot;Ajouter&quot; pour en créer un.
          </p>
        )}
      </div>
    </div>
  )
}
