'use client'

import { useActionState } from 'react'
import { useState, useEffect, useRef } from 'react'
import { Plus, Pencil, Trash2, X, Check, ImageIcon, MapPin, Map } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import SubmitButton from './SubmitButton'
import { useWithLoading } from '@/context/LoadingContext'

function ImageUpload({ fieldName, removeFieldName, label, currentValue, previewClass = 'object-contain' }) {
  const [preview, setPreview] = useState(currentValue ?? null)
  const [removed, setRemoved] = useState(false)
  const inputRef = useRef(null)

  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-xs font-medium text-slate-600">{label}</label>
      <div className="flex items-center gap-3">
        <div
          onClick={() => inputRef.current?.click()}
          className="w-14 h-14 rounded-xl border-2 border-dashed border-slate-200 hover:border-primary bg-slate-50 hover:bg-primary/5 flex items-center justify-center cursor-pointer transition-colors overflow-hidden shrink-0"
        >
          {preview
            ? <img src={preview} alt={label} className={`w-full h-full ${previewClass}`} />
            : <ImageIcon size={20} className="text-slate-300" />
          }
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-xs font-medium text-primary hover:underline cursor-pointer bg-transparent border-none text-left"
          >
            {preview ? `Changer` : `Importer`}
          </button>
          {preview && (
            <button
              type="button"
              onClick={() => { setPreview(null); if (inputRef.current) inputRef.current.value = ''; setRemoved(true) }}
              className="text-xs text-red-500 hover:underline cursor-pointer bg-transparent border-none text-left"
            >
              Supprimer
            </button>
          )}
          <p className="text-[10px] text-slate-400">PNG, JPG — max 2 Mo</p>
        </div>
      </div>
      <input
        ref={inputRef}
        name={fieldName}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) { setPreview(URL.createObjectURL(file)); setRemoved(false) }
        }}
      />
      <input type="hidden" name={removeFieldName} value={removed ? '1' : ''} />
    </div>
  )
}

function LogoUpload({ currentLogo }) {
  return <ImageUpload fieldName="logo" removeFieldName="removeLogo" label="Logo (optionnel)" currentValue={currentLogo} previewClass="object-contain" />
}

function PhotoUpload({ currentPhoto }) {
  return <ImageUpload fieldName="photo" removeFieldName="removePhoto" label="Photo façade agence (optionnel)" currentValue={currentPhoto} previewClass="object-cover" />
}

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

function EditRow({ item, fields, updateAction, onCancel, showPhoto }) {
  const [state, formAction] = useActionState(updateAction, null)

  useEffect(() => { if (state?.success) onCancel() }, [state])

  return (
    <form action={formAction} className="flex flex-col gap-3 p-4 bg-tint border border-primary/20 rounded-xl" encType="multipart/form-data">
      <input type="hidden" name="id" value={item.id} />
      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{state.error}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fields.map(f => <Field key={f.name} field={f} defaultValue={item[f.name]} />)}
      </div>
      <div className={showPhoto ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : ''}>
        <LogoUpload currentLogo={item.logo ?? null} />
        {showPhoto && <PhotoUpload currentPhoto={item.photo ?? null} />}
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

function AddRow({ fields, createAction, onCancel, showPhoto }) {
  const [state, formAction] = useActionState(createAction, null)

  useEffect(() => { if (state?.success) onCancel() }, [state])

  return (
    <form action={formAction} className="flex flex-col gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl" encType="multipart/form-data">
      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{state.error}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fields.map(f => <Field key={f.name} field={f} defaultValue="" />)}
      </div>
      <div className={showPhoto ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : ''}>
        <LogoUpload currentLogo={null} />
        {showPhoto && <PhotoUpload currentPhoto={null} />}
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

function ItemDisplay({ item, displayConfig, showGps }) {
  const { primary, secondary, detail, badge, count } = displayConfig
  return (
    <div className="flex items-center gap-3">
      {(item.photo || item.logo)
        ? <img src={item.photo ?? item.logo} alt={item[primary]} className="w-9 h-9 rounded-lg object-cover border border-slate-100 bg-white shrink-0" />
        : <div className="w-9 h-9 rounded-lg border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center shrink-0"><ImageIcon size={14} className="text-slate-300" /></div>
      }
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-slate-900">{item[primary]}</p>
          {badge && item[badge] && (
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-500">
              {item[badge]}
            </span>
          )}
          {showGps && (
            item.lat != null && item.lng != null
              ? <span className="inline-flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                  <MapPin size={9} /> GPS
                </span>
              : <span className="inline-flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-400">
                  <MapPin size={9} /> Sans GPS
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
        {showGps && item.address && (
          <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">📍 {item.address}</p>
        )}
      </div>
    </div>
  )
}

export default function NetworkManager({ title, items, fields, displayConfig, createAction, updateAction, deleteAction, showGps, showPhoto, mapHref, captureHrefBase }) {
  const router = useRouter()
  const { withLoading } = useWithLoading()
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
        <div className="flex items-center gap-2 shrink-0">
          {showGps && mapHref && (
            <Link
              href={mapHref}
              className="inline-flex items-center gap-1.5 text-sm font-medium h-8 px-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors"
            >
              <Map size={14} /> Voir la carte
            </Link>
          )}
          <Button
            size="sm"
            onClick={() => { setAdding(true); setEditingId(null) }}
            className="cursor-pointer gap-1.5 bg-primary hover:bg-primary-hover text-white border-none"
          >
            <Plus size={14} /> Ajouter
          </Button>
        </div>
      </div>

      {adding && (
        <AddRow fields={fields} createAction={createAction} onCancel={() => setAdding(false)} showPhoto={showPhoto} />
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
              showPhoto={showPhoto}
            />
          ) : (
            <div key={item.id} className="flex items-center justify-between gap-3 px-4 py-3 bg-white border border-slate-200 rounded-xl group hover:border-slate-300 transition-colors">
              <div className="min-w-0"><ItemDisplay item={item} displayConfig={displayConfig} showGps={showGps} /></div>
              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                {showGps && captureHrefBase && (
                  <Link
                    href={`${captureHrefBase}?id=${item.id}&name=${encodeURIComponent(item.name ?? '')}&city=${encodeURIComponent(item.city ?? '')}&location=${encodeURIComponent(item.location ?? '')}`}
                    className="h-7 px-2 flex items-center gap-1 rounded-md text-slate-400 hover:text-primary hover:bg-primary/5 cursor-pointer text-[11px] font-medium transition-colors"
                    title="Capturer la position GPS"
                  >
                    <MapPin size={12} />
                    <span className="hidden sm:inline">GPS</span>
                  </Link>
                )}
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
                await withLoading(() => deleteAction(fd))
                setDeleteTarget(null)
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
