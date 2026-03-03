'use client'

import { useFormState } from 'react-dom'
import { useState } from 'react'
import { Pencil, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SubmitButton from './SubmitButton'

const REGIONS = [
  { key: 'uemoa',         label: 'UEMOA' },
  { key: 'senegal',       label: 'Sénégal' },
  { key: 'cemac',         label: 'CEMAC' },
  { key: 'mobile',        label: 'Mobile Money' },
  { key: 'international', label: 'International' },
]

function fmt(v) {
  if (v == null) return '—'
  return Number(v).toLocaleString('fr-FR')
}

function TariffRowEdit({ row, updateRowAction, onCancel, onSaved }) {
  const [state, formAction] = useFormState(updateRowAction, null)
  if (state?.success) { onSaved(); return null }

  const field = (name, label, isText = false) => (
    <div className="flex flex-col gap-0.5">
      <label className="text-[10px] font-medium text-slate-500">{label}</label>
      <input
        name={name}
        type={isText ? 'text' : 'number'}
        step="any"
        defaultValue={row[name] ?? ''}
        placeholder="—"
        className="h-7 w-full rounded border border-slate-200 bg-white px-2 text-xs outline-none focus:border-primary"
      />
    </div>
  )

  return (
    <form action={formAction} className="col-span-full bg-tint border border-primary/20 rounded-lg p-3 flex flex-col gap-3">
      <input type="hidden" name="id" value={row.id} />
      {state?.error && <p className="text-xs text-red-600">{state.error}</p>}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {field('min', 'Min (FCFA)')}
        {field('max', 'Max (FCFA)')}
        {field('fraisRetrait', 'Frais retrait')}
        {field('fraisEnvoi', 'Frais envoi')}
        {field('minEnvoi', 'Min envoi')}
        {field('maxEnvoi', 'Max envoi')}
        {field('frais', 'Frais')}
        {field('fraisBmoVersAutres', 'B-MO→Autres')}
        {field('fraisAutresVersBmo', 'Autres→B-MO', true)}
      </div>
      <div className="flex gap-2 justify-end">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel} className="gap-1 cursor-pointer">
          <X size={13} /> Annuler
        </Button>
        <SubmitButton
          loadingText="…"
          className="inline-flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-md bg-primary hover:bg-primary-hover text-white border-none cursor-pointer disabled:opacity-60"
        >
          <Check size={13} /> OK
        </SubmitButton>
      </div>
    </form>
  )
}

function TariffTable({ meta, updateRowAction }) {
  const [editingId, setEditingId] = useState(null)
  const rows = meta.rows ?? []

  const colHeaders = (() => {
    const cols = []
    cols.push({ key: 'min', label: 'Min' })
    if (rows.some(r => r.max != null))               cols.push({ key: 'max',               label: 'Max' })
    if (rows.some(r => r.fraisRetrait != null))       cols.push({ key: 'fraisRetrait',       label: 'Retrait' })
    if (rows.some(r => r.fraisEnvoi != null))         cols.push({ key: 'fraisEnvoi',         label: 'Envoi' })
    if (rows.some(r => r.minEnvoi != null))           cols.push({ key: 'minEnvoi',           label: 'Min envoi' })
    if (rows.some(r => r.maxEnvoi != null))           cols.push({ key: 'maxEnvoi',           label: 'Max envoi' })
    if (rows.some(r => r.frais != null))              cols.push({ key: 'frais',              label: 'Frais' })
    if (rows.some(r => r.fraisBmoVersAutres != null)) cols.push({ key: 'fraisBmoVersAutres', label: 'B-MO→Autres' })
    if (rows.some(r => r.fraisAutresVersBmo != null)) cols.push({ key: 'fraisAutresVersBmo', label: 'Autres→B-MO' })
    return cols
  })()

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-slate-50 border-b border-slate-200">
            {colHeaders.map(c => (
              <th key={c.key} className="text-left px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400 whitespace-nowrap">
                {c.label}
              </th>
            ))}
            <th className="w-8" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            editingId === row.id ? (
              <tr key={row.id}>
                <td colSpan={colHeaders.length + 1} className="p-2">
                  <TariffRowEdit
                    row={row}
                    updateRowAction={updateRowAction}
                    onCancel={() => setEditingId(null)}
                    onSaved={() => setEditingId(null)}
                  />
                </td>
              </tr>
            ) : (
              <tr key={row.id} className={`border-slate-100 hover:bg-slate-50/60 ${i < rows.length - 1 ? 'border-b' : ''}`}>
                {colHeaders.map(c => (
                  <td key={c.key} className="px-3 py-2 text-slate-600 whitespace-nowrap tabular-nums">
                    {fmt(row[c.key])}
                  </td>
                ))}
                <td className="px-2">
                  <button
                    onClick={() => setEditingId(row.id)}
                    className="h-6 w-6 flex items-center justify-center rounded text-slate-300 hover:text-slate-600 hover:bg-slate-100 cursor-pointer border-none bg-transparent transition-colors"
                  >
                    <Pencil size={12} />
                  </button>
                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function TariffsManager({ tariffs, updateRowAction }) {
  const [activeTab, setActiveTab] = useState('uemoa')
  const metaMap = Object.fromEntries(tariffs.map(t => [t.region, t]))
  const meta = metaMap[activeTab]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg md:text-xl font-semibold text-slate-900">Grilles tarifaires</h1>
        <p className="text-sm text-slate-400 mt-0.5">Cliquez sur une ligne pour la modifier.</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {REGIONS.map(r => (
          <button
            key={r.key}
            onClick={() => setActiveTab(r.key)}
            className={`text-sm font-medium px-3 py-1.5 rounded-lg border transition-all cursor-pointer
              ${activeTab === r.key
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'
              }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {meta ? (
        <>
          <div>
            <p className="text-base font-semibold text-slate-900">{meta.title}</p>
            {meta.note && <p className="text-xs text-slate-400 mt-0.5">{meta.note}</p>}
          </div>
          <TariffTable meta={meta} updateRowAction={updateRowAction} />
        </>
      ) : (
        <p className="text-sm text-slate-400">Aucune donnée pour cette région.</p>
      )}
    </div>
  )
}
