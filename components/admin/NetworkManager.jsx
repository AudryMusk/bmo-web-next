'use client'

import { useActionState } from 'react'
import { useState, useEffect, useRef } from 'react'
import geoData from '@/data/benin-geo.json'
import { Plus, Pencil, Trash2, X, Check, ImageIcon, MapPin, Map, Upload, Download, CheckCircle2 as CheckCircle, AlertTriangle, Link2 } from 'lucide-react'
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

const SELECT_CLASS = 'h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors w-full'

function GeoSelect({ defaultValue }) {
  const allDepts = Object.keys(geoData).sort()
  const [dept, setDept]       = useState(defaultValue?.department ?? '')
  const [city, setCity]       = useState(defaultValue?.city ?? '')
  const [quartier, setQuartier] = useState(defaultValue?.quartier ?? '')

  const cities   = dept ? Object.keys(geoData[dept] ?? {}).sort() : []
  const quartiers = dept && city ? (geoData[dept]?.[city] ?? []) : []

  function handleDept(v) {
    setDept(v)
    setCity('')
    setQuartier('')
  }
  function handleCity(v) {
    setCity(v)
    setQuartier('')
  }

  return (
    <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="flex flex-col gap-0.5">
        <label className="text-xs font-medium text-slate-600">Département</label>
        <select name="department" value={dept} onChange={e => handleDept(e.target.value)} className={SELECT_CLASS}>
          <option value="">— Choisir —</option>
          {allDepts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div className="flex flex-col gap-0.5">
        <label className="text-xs font-medium text-slate-600">Ville</label>
        <select name="city" value={city} onChange={e => handleCity(e.target.value)} disabled={!dept} className={SELECT_CLASS}>
          <option value="">— Choisir —</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="flex flex-col gap-0.5">
        <label className="text-xs font-medium text-slate-600">Quartier</label>
        <select name="quartier" value={quartier} onChange={e => setQuartier(e.target.value)} disabled={!city} className={SELECT_CLASS}>
          <option value="">— Choisir —</option>
          {quartiers.map(q => <option key={q} value={q}>{q}</option>)}
        </select>
      </div>
    </div>
  )
}

function Field({ field, defaultValue }) {
  if (field.type === 'geo-select') {
    return <GeoSelect defaultValue={defaultValue} />
  }
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
    <form action={formAction} className="flex flex-col gap-3 p-4 bg-tint border border-primary/20 rounded-xl">
      <input type="hidden" name="id" value={item.id} />
      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{state.error}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fields.map(f => <Field key={f.name ?? f.type} field={f} defaultValue={f.type === 'geo-select' ? item : item[f.name]} />)}
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
    <form action={formAction} className="flex flex-col gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{state.error}</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fields.map(f => <Field key={f.name ?? f.type} field={f} defaultValue={f.type === 'geo-select' ? null : ''} />)}
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
          {'active' in item && (
            item.active
              ? <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Actif</span>
              : <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">Inactif</span>
          )}
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

// ─── CSV helpers ─────────────────────────────────────────────────────────────

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/).map(l => l.trim()).filter(Boolean)
  if (lines.length < 2) return { rows: [], error: 'Fichier vide ou sans données.' }
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
  const rows = lines.slice(1).map(line => {
    const values = []
    let cur = '', inQ = false
    for (const ch of line) {
      if (ch === '"') inQ = !inQ
      else if (ch === ',' && !inQ) { values.push(cur.trim()); cur = '' }
      else cur += ch
    }
    values.push(cur.trim())
    return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? '']))
  })
  return { rows, headers, error: null }
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function NetworkManager({ title, items, fields, displayConfig, createAction, updateAction, deleteAction, showGps, showPhoto, mapHref, importAction, bulkActiveAction, shareLinkBase }) {
  const router = useRouter()
  const { withLoading } = useWithLoading()
  const [editingId, setEditingId]       = useState(null)
  const [adding, setAdding]             = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  // CSV import state
  const csvInputRef                     = useRef(null)
  const [csvRows, setCsvRows]           = useState(null)
  const [csvError, setCsvError]         = useState(null)
  const [importing, setImporting]       = useState(false)
  const [importResult, setImportResult] = useState(null)

  // Bulk selection state
  const [selectedIds, setSelectedIds]   = useState(new Set())
  const [bulkLoading, setBulkLoading]   = useState(false)
  const [copiedId, setCopiedId]         = useState(null)

  function copyShareLink(item) {
    const url = `${window.location.origin}${shareLinkBase}/${item.token}`
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(item.id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  function toggleSelect(id) {
    setSelectedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }
  function toggleAll() {
    setSelectedIds(prev => prev.size === items.length ? new Set() : new Set(items.map(i => i.id)))
  }
  async function bulkSetActive(active) {
    if (!bulkActiveAction || selectedIds.size === 0) return
    setBulkLoading(true)
    await bulkActiveAction([...selectedIds], active)
    setSelectedIds(new Set())
    router.refresh()
    setBulkLoading(false)
  }

  function downloadTemplate() {
    const headers = fields.map(f => f.name).join(',')
    const blob = new Blob([headers + '\n'], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `modele-${title.toLowerCase().replace(/\s+/g, '-')}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  async function handleCsvFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    const { rows, error } = parseCsv(text)
    e.target.value = ''
    if (error) { setCsvError(error); setCsvRows(null); return }
    setCsvError(null)
    setCsvRows(rows)
    setImportResult(null)
  }

  async function handleImport() {
    if (!csvRows || !importAction) return
    setImporting(true)
    try {
      const result = await importAction(csvRows)
      setImportResult(result)
      if (result?.success) { setCsvRows(null); router.refresh() }
    } catch {
      setImportResult({ error: 'Erreur inattendue lors de l\'import.' })
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-semibold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-400 mt-0.5">{items.length} entrée{items.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
          {showGps && mapHref && (
            <Link
              href={mapHref}
              className="inline-flex items-center gap-1.5 text-sm font-medium h-8 px-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors"
            >
              <Map size={14} /> Voir la carte
            </Link>
          )}
          {importAction && (
            <>
              <button
                onClick={downloadTemplate}
                className="inline-flex items-center gap-1.5 text-sm font-medium h-8 px-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer bg-transparent"
              >
                <Download size={14} /> Modèle CSV
              </button>
              <button
                onClick={() => csvInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 text-sm font-medium h-8 px-3 rounded-lg border border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 text-emerald-700 transition-colors cursor-pointer bg-transparent"
              >
                <Upload size={14} /> Importer CSV
              </button>
              <input ref={csvInputRef} type="file" accept=".csv,text/csv" className="hidden" onChange={handleCsvFile} />
            </>
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

      {/* CSV error */}
      {csvError && (
        <div className="flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <AlertTriangle size={15} className="shrink-0 mt-0.5" />
          {csvError}
          <button onClick={() => setCsvError(null)} className="ml-auto text-red-400 hover:text-red-600 bg-transparent border-none cursor-pointer"><X size={14} /></button>
        </div>
      )}

      {/* CSV preview panel */}
      {csvRows && !importResult && (
        <div className="flex flex-col gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-emerald-800">
              <CheckCircle size={15} className="inline mr-1.5" />
              {csvRows.length} ligne{csvRows.length !== 1 ? 's' : ''} détectée{csvRows.length !== 1 ? 's' : ''}
            </p>
            <button onClick={() => setCsvRows(null)} className="text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"><X size={14} /></button>
          </div>
          <div className="overflow-x-auto rounded-lg border border-emerald-200">
            <table className="text-xs w-full bg-white">
              <thead>
                <tr className="bg-emerald-100 text-emerald-700">
                  {Object.keys(csvRows[0]).map(h => <th key={h} className="px-3 py-1.5 text-left font-semibold whitespace-nowrap">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {csvRows.slice(0, 5).map((row, i) => (
                  <tr key={i} className="border-t border-slate-100">
                    {Object.values(row).map((v, j) => (
                      <td key={j} className="px-3 py-1.5 text-slate-600 whitespace-nowrap max-w-[160px] truncate">{v || <span className="text-slate-300">—</span>}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {csvRows.length > 5 && <p className="text-xs text-slate-400">… et {csvRows.length - 5} autres lignes</p>}
          <div className="flex gap-2 justify-end">
            <Button variant="ghost" size="sm" onClick={() => setCsvRows(null)} className="cursor-pointer"><X size={13} /> Annuler</Button>
            <button onClick={handleImport} disabled={importing} className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white border-none cursor-pointer transition-colors">
              {importing ? 'Import en cours…' : <><Upload size={13} /> Importer {csvRows.length} ligne{csvRows.length !== 1 ? 's' : ''}</>}
            </button>
          </div>
        </div>
      )}

      {/* Import results panel */}
      {importResult?.success && (
        <div className="flex flex-col gap-3 p-4 bg-white border border-slate-200 rounded-xl">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-800">Résultat de l&apos;import — {importResult.total} ligne{importResult.total !== 1 ? 's' : ''} traitée{importResult.total !== 1 ? 's' : ''}</p>
            <button onClick={() => setImportResult(null)} className="text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"><X size={14} /></button>
          </div>

          {importResult.added?.length > 0 && (
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1"><CheckCircle size={12} /> {importResult.added.length} ajouté{importResult.added.length !== 1 ? 's' : ''}</p>
              {importResult.added.map((r, i) => (
                <p key={i} className="text-xs text-emerald-700 bg-emerald-50 rounded px-2 py-0.5">Ligne {r.line} — {r.name}</p>
              ))}
            </div>
          )}

          {importResult.skipped?.length > 0 && (
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-amber-600 flex items-center gap-1"><AlertTriangle size={12} /> {importResult.skipped.length} ignoré{importResult.skipped.length !== 1 ? 's' : ''} (doublons)</p>
              {importResult.skipped.map((r, i) => (
                <p key={i} className="text-xs text-amber-700 bg-amber-50 rounded px-2 py-0.5">Ligne {r.line} — {r.name} : {r.reason}</p>
              ))}
            </div>
          )}

          {importResult.errors?.length > 0 && (
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-red-600 flex items-center gap-1"><AlertTriangle size={12} /> {importResult.errors.length} erreur{importResult.errors.length !== 1 ? 's' : ''} — à corriger</p>
              {importResult.errors.map((r, i) => (
                <p key={i} className="text-xs text-red-700 bg-red-50 rounded px-2 py-0.5">Ligne {r.line} — {r.name} : {r.reason}</p>
              ))}
            </div>
          )}
        </div>
      )}

      {adding && (
        <AddRow fields={fields} createAction={createAction} onCancel={() => setAdding(false)} showPhoto={showPhoto} />
      )}

      {/* Bulk action bar */}
      {bulkActiveAction && selectedIds.size > 0 && (
        <div className="sticky top-4 z-20 flex items-center gap-3 px-4 py-2.5 bg-slate-900 text-white rounded-xl shadow-lg">
          <span className="text-sm font-medium">{selectedIds.size} sélectionné{selectedIds.size !== 1 ? 's' : ''}</span>
          <div className="flex items-center gap-2 ml-auto">
            <button onClick={() => bulkSetActive(true)} disabled={bulkLoading} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white border-none cursor-pointer transition-colors">
              <CheckCircle size={12} /> Activer
            </button>
            <button onClick={() => bulkSetActive(false)} disabled={bulkLoading} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-600 hover:bg-slate-500 disabled:opacity-50 text-white border-none cursor-pointer transition-colors">
              <X size={12} /> Désactiver
            </button>
            <button onClick={() => setSelectedIds(new Set())} className="text-slate-400 hover:text-white bg-transparent border-none cursor-pointer ml-1"><X size={14} /></button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {/* Select all header */}
        {bulkActiveAction && items.length > 0 && (
          <div className="flex items-center gap-2 px-1 pb-1">
            <input
              type="checkbox"
              checked={selectedIds.size === items.length && items.length > 0}
              onChange={toggleAll}
              className="w-3.5 h-3.5 cursor-pointer accent-primary"
            />
            <span className="text-xs text-slate-400">Tout sélectionner</span>
          </div>
        )}

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
            <div key={item.id} className={`flex items-center gap-3 px-4 py-3 bg-white border rounded-xl group hover:border-slate-300 transition-colors ${selectedIds.has(item.id) ? 'border-primary/40 bg-primary/5' : 'border-slate-200'}`}>
              {bulkActiveAction && (
                <input
                  type="checkbox"
                  checked={selectedIds.has(item.id)}
                  onChange={() => toggleSelect(item.id)}
                  className="w-3.5 h-3.5 cursor-pointer accent-primary shrink-0"
                />
              )}
              <div className="min-w-10 flex-1"><ItemDisplay item={item} displayConfig={displayConfig} showGps={showGps} /></div>
              {shareLinkBase && item.token && (
                <button
                  onClick={() => copyShareLink(item)}
                  className={`shrink-0 h-7 px-2.5 flex items-center gap-1.5 rounded-md text-[11px] font-semibold cursor-pointer border-none transition-colors ${copiedId === item.id ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                  title="Copier le lien d'inscription"
                >
                  {copiedId === item.id ? <Check size={12} /> : <Link2 size={12} />}
                  {copiedId === item.id ? 'Copié !' : 'Lien'}
                </button>
              )}
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
