'use client'

import { useActionState } from 'react'
import { useState, useEffect, useRef } from 'react'
import {
  Plus, Pencil, Trash2, X, Check, ImageIcon, MapPin, Map,
  Upload, Download, CheckCircle2 as CheckCircle, AlertTriangle,
  Link2,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import SubmitButton from './SubmitButton'
import { useWithLoading } from '@/context/LoadingContext'
import geoData from '@/data/benin-geo.json'

// ─── Geo cascading selects ────────────────────────────────────────────────────

const SEL = 'h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors w-full disabled:opacity-50'
const INP = 'h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors w-full'

function GeoSelect({ defaultValue }) {
  const allDepts = Object.keys(geoData).sort()
  const [dept, setDept]         = useState(defaultValue?.department ?? '')
  const [city, setCity]         = useState(defaultValue?.city ?? '')
  const [quartier, setQuartier] = useState(defaultValue?.quartier ?? '')

  const cities    = dept ? Object.keys(geoData[dept] ?? {}).sort() : []
  const quartiers = dept && city ? (geoData[dept]?.[city] ?? []) : []

  return (
    <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="flex flex-col gap-0.5">
        <label className="text-xs font-medium text-slate-600">Département</label>
        <select name="department" value={dept} onChange={e => { setDept(e.target.value); setCity(''); setQuartier('') }} className={SEL}>
          <option value="">— Choisir —</option>
          {allDepts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div className="flex flex-col gap-0.5">
        <label className="text-xs font-medium text-slate-600">Ville</label>
        <select name="city" value={city} onChange={e => { setCity(e.target.value); setQuartier('') }} disabled={!dept} className={SEL}>
          <option value="">— Choisir —</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      <div className="flex flex-col gap-0.5">
        <label className="text-xs font-medium text-slate-600">Quartier</label>
        <select name="quartier" value={quartier} onChange={e => setQuartier(e.target.value)} disabled={!city} className={SEL}>
          <option value="">— Choisir —</option>
          {quartiers.map(q => <option key={q} value={q}>{q}</option>)}
        </select>
      </div>
    </div>
  )
}

// ─── Image upload ─────────────────────────────────────────────────────────────

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
          <button type="button" onClick={() => inputRef.current?.click()} className="text-xs font-medium text-primary hover:underline cursor-pointer bg-transparent border-none text-left">
            {preview ? 'Changer' : 'Importer'}
          </button>
          {preview && (
            <button type="button" onClick={() => { setPreview(null); if (inputRef.current) inputRef.current.value = ''; setRemoved(true) }} className="text-xs text-red-500 hover:underline cursor-pointer bg-transparent border-none text-left">
              Supprimer
            </button>
          )}
          <p className="text-[10px] text-slate-400">PNG, JPG — max 2 Mo</p>
        </div>
      </div>
      <input ref={inputRef} name={fieldName} type="file" accept="image/*" className="hidden" onChange={e => {
        const file = e.target.files?.[0]
        if (file) { setPreview(URL.createObjectURL(file)); setRemoved(false) }
      }} />
      <input type="hidden" name={removeFieldName} value={removed ? '1' : ''} />
    </div>
  )
}

// ─── Shared form fields grid ──────────────────────────────────────────────────

function MarchandFormFields({ defaultValues }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col gap-0.5">
        <label className="text-xs font-medium text-slate-600">Nom du marchand <span className="text-red-500">*</span></label>
        <input name="name" required defaultValue={defaultValues?.name ?? ''} className={INP} />
      </div>
      <div className="flex flex-col gap-0.5">
        <label className="text-xs font-medium text-slate-600">Téléphone</label>
        <input name="phone" placeholder="+229..." defaultValue={defaultValues?.phone ?? ''} className={INP} />
      </div>
      <div className="flex flex-col gap-0.5">
        <label className="text-xs font-medium text-slate-600">Email</label>
        <input name="email" type="email" defaultValue={defaultValues?.email ?? ''} className={INP} />
      </div>
      <div className="flex flex-col gap-0.5">
        <label className="text-xs font-medium text-slate-600">Pays</label>
        <input name="country" defaultValue={defaultValues?.country ?? 'Bénin'} className={INP} />
      </div>
      <GeoSelect defaultValue={defaultValues} />
      <div className="flex flex-col gap-0.5">
        <label className="text-xs font-medium text-slate-600">Latitude</label>
        <input name="lat" placeholder="ex: 6.3509" defaultValue={defaultValues?.lat ?? ''} className={INP} />
      </div>
      <div className="flex flex-col gap-0.5">
        <label className="text-xs font-medium text-slate-600">Longitude</label>
        <input name="lng" placeholder="ex: 2.3478" defaultValue={defaultValues?.lng ?? ''} className={INP} />
      </div>
      <ImageUpload fieldName="logo" removeFieldName="removeLogo" label="Logo (optionnel)" currentValue={defaultValues?.logo ?? null} previewClass="object-contain" />
      <ImageUpload fieldName="photo" removeFieldName="removePhoto" label="Photo façade (optionnel)" currentValue={defaultValues?.photo ?? null} previewClass="object-cover" />
    </div>
  )
}

// ─── Add form (above table) ───────────────────────────────────────────────────

function MarchandAddForm({ createAction, onCancel }) {
  const [state, formAction] = useActionState(createAction, null)
  useEffect(() => { if (state?.success) onCancel() }, [state])
  return (
    <form action={formAction} className="flex flex-col gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{state.error}</p>
      )}
      <MarchandFormFields defaultValues={null} />
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel} className="gap-1.5 cursor-pointer">
          <X size={13} /> Annuler
        </Button>
        <SubmitButton loadingText="Ajout…" className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white border-none cursor-pointer disabled:opacity-60">
          <Plus size={13} /> Ajouter
        </SubmitButton>
      </div>
    </form>
  )
}

// ─── Edit modal ──────────────────────────────────────────────────────────────

function MarchandEditModal({ item, updateAction, onClose }) {
  const [state, formAction] = useActionState(updateAction, null)
  useEffect(() => { if (state?.success) onClose() }, [state])
  if (!item) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg my-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100">
          <p className="text-base font-semibold text-slate-900">Modifier — {item.name}</p>
          <button type="button" onClick={onClose} className="h-7 w-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer border-none bg-transparent transition-colors">
            <X size={15} />
          </button>
        </div>
        <form action={formAction} className="flex flex-col gap-4 p-5">
          <input type="hidden" name="id" value={item.id} />
          {state?.error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{state.error}</p>
          )}
          <MarchandFormFields defaultValues={item} />
          <div className="flex gap-2 justify-end pt-1">
            <Button type="button" variant="ghost" size="sm" onClick={onClose} className="gap-1.5 cursor-pointer">
              <X size={13} /> Annuler
            </Button>
            <SubmitButton loadingText="Enregistrement…" className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-1.5 rounded-md bg-primary hover:bg-primary-hover text-white border-none cursor-pointer disabled:opacity-60">
              <Check size={13} /> Enregistrer
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── CSV helpers ──────────────────────────────────────────────────────────────

// Maps alternate column names from user files to internal field names
const COL_ALIASES = { departement: 'department', long: 'lng' }

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/).map(l => l.trim()).filter(Boolean)
  if (lines.length < 2) return { rows: [], error: 'Fichier vide ou sans données.' }

  // Auto-detect separator: use ';' if it appears more than ',' in the header
  const firstLine = lines[0]
  const sep = (firstLine.split(';').length > firstLine.split(',').length) ? ';' : ','

  const rawHeaders = firstLine.split(sep).map(h => h.trim().replace(/^"|"$/g, ''))
  const headers = rawHeaders.map(h => COL_ALIASES[h.toLowerCase()] ?? h.toLowerCase())

  const rows = lines.slice(1).map(line => {
    const values = []
    let cur = '', inQ = false
    for (const ch of line) {
      if (ch === '"') inQ = !inQ
      else if (ch === sep && !inQ) { values.push(cur.trim()); cur = '' }
      else cur += ch
    }
    values.push(cur.trim())
    return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? '']))
  })
  return { rows, headers, error: null }
}

// ─── Table header cell ────────────────────────────────────────────────────────

function TH({ children, className = '' }) {
  return (
    <th className={`px-3 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500 whitespace-nowrap ${className}`}>
      {children}
    </th>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

const CSV_FIELDS = ['name', 'phone', 'email', 'country', 'department', 'city', 'quartier', 'lat', 'lng']
const COL_COUNT  = 10  // checkbox + 8 data cols + actions
const PAGE_SIZE  = 25

function getPaginationPages(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, total, current, current - 1, current + 1].filter(p => p >= 1 && p <= total))
  const sorted = [...pages].sort((a, b) => a - b)
  const result = []
  let prev = 0
  for (const p of sorted) {
    if (p - prev > 1) result.push('…')
    result.push(p)
    prev = p
  }
  return result
}

export default function MarchandTable({ title, items, createAction, updateAction, deleteAction, importAction, bulkActiveAction, bulkDeleteAction, shareLinkBase, mapHref }) {
  const router = useRouter()
  const { withLoading } = useWithLoading()

  const [editItem, setEditItem]         = useState(null)
  const [adding, setAdding]             = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const csvInputRef               = useRef(null)
  const [csvRows, setCsvRows]     = useState(null)
  const [csvError, setCsvError]   = useState(null)
  const [importing, setImporting] = useState(false)
  const [importResult, setImportResult] = useState(null)

  const [page, setPage]                       = useState(1)
  const [selectedIds, setSelectedIds]         = useState(new Set())
  const [bulkLoading, setBulkLoading]         = useState(false)
  const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState(false)
  const [copiedId, setCopiedId]               = useState(null)

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE))
  const safePage   = Math.min(page, totalPages)
  const pageItems  = items.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  function copyShareLink(item) {
    const url = `${window.location.origin}${shareLinkBase}/${item.token}`
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(item.id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }
  function toggleSelect(id) {
    setSelectedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }
  function toggleAll() {
    const pageIds = pageItems.map(i => i.id)
    const allSelected = pageIds.every(id => selectedIds.has(id))
    setSelectedIds(prev => {
      const n = new Set(prev)
      allSelected ? pageIds.forEach(id => n.delete(id)) : pageIds.forEach(id => n.add(id))
      return n
    })
  }
  async function bulkSetActive(active) {
    if (!bulkActiveAction || selectedIds.size === 0) return
    setBulkLoading(true)
    await bulkActiveAction([...selectedIds], active)
    setSelectedIds(new Set())
    router.refresh()
    setBulkLoading(false)
  }
  async function bulkDelete() {
    if (!bulkDeleteAction || selectedIds.size === 0) return
    setBulkLoading(true)
    await bulkDeleteAction([...selectedIds])
    setSelectedIds(new Set())
    setBulkDeleteConfirm(false)
    setPage(1)
    router.refresh()
    setBulkLoading(false)
  }
  function exportCsv() {
    const header = CSV_FIELDS.join(';')
    const rowLines = items.map(item =>
      CSV_FIELDS.map(f => {
        const v = String(item[f] ?? '')
        return v.includes(';') || v.includes('"') || v.includes('\n') ? `"${v.replace(/"/g, '""')}"` : v
      }).join(';')
    )
    const blob = new Blob([header + '\n' + rowLines.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'marchands.csv'; a.click()
    URL.revokeObjectURL(url)
  }
  function downloadTemplate() {
    const blob = new Blob([CSV_FIELDS.join(',') + '\n'], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'modele-marchands.csv'; a.click()
    URL.revokeObjectURL(url)
  }
  async function handleCsvFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    const { rows, error } = parseCsv(text)
    e.target.value = ''
    if (error) { setCsvError(error); setCsvRows(null); return }
    setCsvError(null); setCsvRows(rows); setImportResult(null)
  }
  async function handleImport() {
    if (!csvRows || !importAction) return
    setImporting(true)
    try {
      const result = await importAction(csvRows)
      setImportResult(result)
      if (result?.success) { setCsvRows(null); setPage(1); router.refresh() }
    } catch {
      setImportResult({ error: "Erreur inattendue lors de l'import." })
    } finally { setImporting(false) }
  }

  return (
    <div className="flex flex-col gap-6 w-full min-w-0">

      {/* ── Header ── */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-semibold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-400 mt-0.5">{items.length} entrée{items.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
          {mapHref && (
            <Link href={mapHref} className="inline-flex items-center gap-1.5 text-sm font-medium h-8 px-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors">
              <Map size={14} /> Voir la carte
            </Link>
          )}
          {items.length > 0 && (
            <button onClick={exportCsv} className="inline-flex items-center gap-1.5 text-sm font-medium h-8 px-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer bg-transparent">
              <Download size={14} /> Exporter CSV
            </button>
          )}
          {importAction && (
            <>
              <button onClick={downloadTemplate} className="inline-flex items-center gap-1.5 text-sm font-medium h-8 px-3 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer bg-transparent">
                <Download size={14} /> Modèle CSV
              </button>
              <button onClick={() => csvInputRef.current?.click()} className="inline-flex items-center gap-1.5 text-sm font-medium h-8 px-3 rounded-lg border border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 text-emerald-700 transition-colors cursor-pointer bg-transparent">
                <Upload size={14} /> Importer CSV
              </button>
              <input ref={csvInputRef} type="file" accept=".csv,text/csv" className="hidden" onChange={handleCsvFile} />
            </>
          )}
          <Button size="sm" onClick={() => setAdding(true)} className="cursor-pointer gap-1.5 bg-primary hover:bg-primary-hover text-white border-none">
            <Plus size={14} /> Ajouter
          </Button>
        </div>
      </div>

      {/* ── CSV error ── */}
      {csvError && (
        <div className="flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
          <AlertTriangle size={15} className="shrink-0 mt-0.5" /> {csvError}
          <button onClick={() => setCsvError(null)} className="ml-auto text-red-400 hover:text-red-600 bg-transparent border-none cursor-pointer"><X size={14} /></button>
        </div>
      )}

      {/* ── CSV preview ── */}
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

      {/* ── Import result ── */}
      {importResult?.success && (
        <div className="flex flex-col gap-3 p-4 bg-white border border-slate-200 rounded-xl">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-800">Résultat — {importResult.total} ligne{importResult.total !== 1 ? 's' : ''} traitée{importResult.total !== 1 ? 's' : ''}</p>
            <button onClick={() => setImportResult(null)} className="text-slate-400 hover:text-slate-600 bg-transparent border-none cursor-pointer"><X size={14} /></button>
          </div>
          {importResult.added?.length > 0 && (
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1"><CheckCircle size={12} /> {importResult.added.length} ajouté{importResult.added.length !== 1 ? 's' : ''}</p>
              {importResult.added.map((r, i) => <p key={i} className="text-xs text-emerald-700 bg-emerald-50 rounded px-2 py-0.5">Ligne {r.line} — {r.name}</p>)}
            </div>
          )}
          {importResult.skipped?.length > 0 && (
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-amber-600 flex items-center gap-1"><AlertTriangle size={12} /> {importResult.skipped.length} ignoré{importResult.skipped.length !== 1 ? 's' : ''} (doublons)</p>
              {importResult.skipped.map((r, i) => <p key={i} className="text-xs text-amber-700 bg-amber-50 rounded px-2 py-0.5">Ligne {r.line} — {r.name} : {r.reason}</p>)}
            </div>
          )}
          {importResult.errors?.length > 0 && (
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold text-red-600 flex items-center gap-1"><AlertTriangle size={12} /> {importResult.errors.length} erreur{importResult.errors.length !== 1 ? 's' : ''}</p>
              {importResult.errors.map((r, i) => <p key={i} className="text-xs text-red-700 bg-red-50 rounded px-2 py-0.5">Ligne {r.line} — {r.name} : {r.reason}</p>)}
            </div>
          )}
        </div>
      )}

      {/* ── Add form ── */}
      {adding && <MarchandAddForm createAction={createAction} onCancel={() => setAdding(false)} />}

      {/* ── Bulk bar ── */}
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
            {bulkDeleteAction && (
              <button onClick={() => setBulkDeleteConfirm(true)} disabled={bulkLoading} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white border-none cursor-pointer transition-colors">
                <Trash2 size={12} /> Supprimer
              </button>
            )}
            <button onClick={() => setSelectedIds(new Set())} className="text-slate-400 hover:text-white bg-transparent border-none cursor-pointer ml-1"><X size={14} /></button>
          </div>
        </div>
      )}

      {/* ── Table ── */}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-[860px] text-sm border-collapse">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {bulkActiveAction && (
                <th className="pl-4 pr-2 py-2.5 w-8">
                  <input
                    type="checkbox"
                    checked={pageItems.length > 0 && pageItems.every(i => selectedIds.has(i.id))}
                    onChange={toggleAll}
                    className="w-3.5 h-3.5 cursor-pointer accent-primary"
                  />
                </th>
              )}
              <TH>Nom</TH>
              <TH>Téléphone</TH>
              <TH>Email</TH>
              <TH>Département</TH>
              <TH>Ville</TH>
              <TH>Quartier</TH>
              <TH className="text-center">Statut</TH>
              <TH className="text-center">GPS</TH>
              <TH className="text-right pr-4">Actions</TH>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.length === 0 && !adding && (
              <tr>
                <td colSpan={COL_COUNT} className="py-12 text-center text-slate-400 text-sm">
                  Aucun marchand. Cliquez sur Ajouter pour commencer.
                </td>
              </tr>
            )}
            {pageItems.map(item => (
                <tr key={item.id}
                  className={`group transition-colors hover:bg-slate-50/80 ${selectedIds.has(item.id) ? 'bg-primary/5' : ''}`}
                >
                    {bulkActiveAction && (
                      <td className="pl-4 pr-2 py-2.5">
                        <input
                          type="checkbox"
                          checked={selectedIds.has(item.id)}
                          onChange={() => toggleSelect(item.id)}
                          className="w-3.5 h-3.5 cursor-pointer accent-primary"
                        />
                      </td>
                    )}
                    {/* Nom + logo */}
                    <td className="px-3 py-2.5 max-w-[180px]">
                      <div className="flex items-center gap-2 min-w-0">
                        {item.logo
                          ? <img src={item.logo} alt="" className="w-6 h-6 rounded object-contain border border-slate-100 bg-white shrink-0" />
                          : <div className="w-6 h-6 rounded border border-dashed border-slate-200 bg-slate-50 flex items-center justify-center shrink-0"><ImageIcon size={10} className="text-slate-300" /></div>
                        }
                        <span className="font-medium text-slate-900 truncate text-xs">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-slate-600 whitespace-nowrap">{item.phone || <span className="text-slate-300">—</span>}</td>
                    <td className="px-3 py-2.5 text-xs text-slate-600 max-w-[160px] truncate">{item.email || <span className="text-slate-300">—</span>}</td>
                    <td className="px-3 py-2.5 text-xs text-slate-600 whitespace-nowrap">{item.department || <span className="text-slate-300">—</span>}</td>
                    <td className="px-3 py-2.5 text-xs text-slate-600 whitespace-nowrap">{item.city || <span className="text-slate-300">—</span>}</td>
                    <td className="px-3 py-2.5 text-xs text-slate-600 whitespace-nowrap">{item.quartier || <span className="text-slate-300">—</span>}</td>
                    {/* Statut */}
                    <td className="px-3 py-2.5 text-center">
                      {item.active
                        ? <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Actif</span>
                        : <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">Inactif</span>
                      }
                    </td>
                    {/* GPS */}
                    <td className="px-3 py-2.5 text-center">
                      {item.lat != null && item.lng != null
                        ? <span className="inline-flex items-center gap-0.5 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700"><MapPin size={9} /> GPS</span>
                        : <span className="text-slate-300 text-xs">—</span>
                      }
                    </td>
                    {/* Actions */}
                    <td className="px-3 py-2.5 pr-4">
                      <div className="flex items-center justify-end gap-1">
                        {/* Share link */}
                        {shareLinkBase && item.token && (
                          <button
                            onClick={() => copyShareLink(item)}
                            className={`h-7 w-7 flex items-center justify-center rounded-md text-xs cursor-pointer border-none transition-colors opacity-0 group-hover:opacity-100 ${copiedId === item.id ? 'bg-emerald-100 text-emerald-700' : 'bg-transparent hover:bg-blue-100 text-blue-600'}`}
                            title="Copier lien d'inscription"
                          >
                            {copiedId === item.id ? <Check size={12} /> : <Link2 size={12} />}
                          </button>
                        )}
                        {/* Edit */}
                        <button
                          onClick={() => { setEditItem(item); setAdding(false) }}
                          className="h-7 w-7 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer border-none bg-transparent transition-colors opacity-0 group-hover:opacity-100"
                          title="Modifier"
                        >
                          <Pencil size={13} />
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => setDeleteTarget(item)}
                          className="h-7 w-7 flex items-center justify-center rounded-md text-red-400 hover:text-red-600 hover:bg-red-50 cursor-pointer border-none bg-transparent transition-colors opacity-0 group-hover:opacity-100"
                          title="Supprimer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, items.length)} sur {items.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => p - 1)}
              disabled={safePage === 1}
              className="h-7 px-2.5 rounded-md text-xs font-medium border border-slate-200 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed bg-white text-slate-700 cursor-pointer transition-colors"
            >
              ←
            </button>
            {getPaginationPages(safePage, totalPages).map((p, i) =>
              p === '…'
                ? <span key={`ellipsis-${i}`} className="px-1 text-xs text-slate-400">…</span>
                : <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`h-7 w-7 rounded-md text-xs font-medium transition-colors cursor-pointer border ${
                      p === safePage
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >{p}</button>
            )}
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={safePage === totalPages}
              className="h-7 px-2.5 rounded-md text-xs font-medium border border-slate-200 hover:border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed bg-white text-slate-700 cursor-pointer transition-colors"
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* ── Edit modal ── */}
      <MarchandEditModal key={editItem?.id} item={editItem} updateAction={updateAction} onClose={() => setEditItem(null)} />

      {/* ── Bulk delete confirm ── */}
      <AlertDialog open={bulkDeleteConfirm} onOpenChange={setBulkDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer {selectedIds.size} marchand{selectedIds.size !== 1 ? 's' : ''} ?</AlertDialogTitle>
            <AlertDialogDescription>Cette action est irréversible. Tous les logos et photos associés seront également supprimés.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Annuler</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 cursor-pointer" onClick={bulkDelete} disabled={bulkLoading}>
              {bulkLoading ? 'Suppression…' : 'Supprimer'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ── Delete dialog ── */}
      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer ce marchand ?</AlertDialogTitle>
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
