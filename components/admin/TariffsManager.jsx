'use client'

import { useActionState } from 'react'
import { useState, useEffect } from 'react'
import { Pencil, X, Check, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import SubmitButton from './SubmitButton'
import InternationalCountriesManager from './InternationalCountriesManager'

const FIXED_REGIONS = ['uemoa', 'senegal', 'cemac', 'mobile', 'international']

function fmt(v) {
  if (v == null) return '—'
  return Number(v).toLocaleString('fr-FR')
}

function TariffRowEdit({ row, updateRowAction, onCancel, onSaved }) {
  const [state, formAction] = useActionState(updateRowAction, null)
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

function TariffTable({ meta, updateRowAction, createRowAction, deleteRowAction }) {
  const [editingId, setEditingId]   = useState(null)
  const [addingRow, setAddingRow]   = useState(false)
  const [confirmId, setConfirmId]   = useState(null)
  const [createState, createFormAction] = useActionState(createRowAction, null)
  const [deleteState, deleteFormAction] = useActionState(deleteRowAction, null)

  useEffect(() => { if (createState?.success) setAddingRow(false) }, [createState])
  useEffect(() => { if (deleteState?.success) setConfirmId(null)  }, [deleteState])

  const rows = meta.rows ?? []

  const ALL_COLS = [
    { key: 'min',               label: 'Min' },
    { key: 'max',               label: 'Max' },
    { key: 'fraisRetrait',      label: 'Retrait' },
    { key: 'fraisEnvoi',        label: 'Envoi' },
    { key: 'minEnvoi',          label: 'Min envoi' },
    { key: 'maxEnvoi',          label: 'Max envoi' },
    { key: 'frais',             label: 'Frais' },
    { key: 'fraisBmoVersAutres',label: 'B-MO→Autres' },
    { key: 'fraisAutresVersBmo',label: 'Autres→B-MO' },
  ]

  const colHeaders = (() => {
    const cols = [{ key: 'min', label: 'Min' }]
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

  const numField = (name, label, placeholder = '—') => (
    <div className="flex flex-col gap-0.5">
      <label className="text-[10px] font-medium text-slate-500">{label}</label>
      <input
        name={name}
        type="number"
        step="any"
        placeholder={placeholder}
        className="h-7 w-full rounded border border-slate-200 bg-white px-2 text-xs outline-none focus:border-primary"
      />
    </div>
  )
  const textField = (name, label) => (
    <div className="flex flex-col gap-0.5">
      <label className="text-[10px] font-medium text-slate-500">{label}</label>
      <input
        name={name}
        type="text"
        placeholder="—"
        className="h-7 w-full rounded border border-slate-200 bg-white px-2 text-xs outline-none focus:border-primary"
      />
    </div>
  )

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {colHeaders.map(c => (
                <th key={c.key} className="text-left px-3 py-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400 whitespace-nowrap">
                  {c.label}
                </th>
              ))}
              <th className="w-16" />
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
              ) : confirmId === row.id ? (
                <tr key={row.id} className="bg-red-50">
                  <td colSpan={colHeaders.length + 1} className="px-3 py-2">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-red-700">Supprimer cette ligne ?</p>
                      {deleteState?.error && <p className="text-xs text-red-600">{deleteState.error}</p>}
                      <div className="flex gap-2">
                        <Button type="button" variant="ghost" size="sm" onClick={() => setConfirmId(null)} className="h-6 text-xs cursor-pointer px-2">Annuler</Button>
                        <form action={deleteFormAction}>
                          <input type="hidden" name="id" value={row.id} />
                          <SubmitButton loadingText="…" className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 h-6 rounded bg-red-600 hover:bg-red-700 text-white border-none cursor-pointer disabled:opacity-60">
                            <Trash2 size={11} /> Supprimer
                          </SubmitButton>
                        </form>
                      </div>
                    </div>
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
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingId(row.id)}
                        className="h-6 w-6 flex items-center justify-center rounded text-slate-300 hover:text-slate-600 hover:bg-slate-100 cursor-pointer border-none bg-transparent transition-colors"
                      >
                        <Pencil size={12} />
                      </button>
                      <button
                        onClick={() => setConfirmId(row.id)}
                        className="h-6 w-6 flex items-center justify-center rounded text-slate-300 hover:text-red-500 hover:bg-red-50 cursor-pointer border-none bg-transparent transition-colors"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={colHeaders.length + 1} className="px-3 py-6 text-center text-xs text-slate-400">
                  Aucune ligne. Cliquez sur &quot;Ajouter une ligne&quot; pour commencer.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Formulaire ajout de ligne */}
      {addingRow ? (
        <div className="border border-primary/30 rounded-xl p-4 bg-tint">
          <p className="text-xs font-semibold text-slate-700 mb-3">Nouvelle ligne tarifaire</p>
          <form action={createFormAction} className="flex flex-col gap-3">
            <input type="hidden" name="tariffMetaId" value={meta.id} />
            {createState?.error && <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1">{createState.error}</p>}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {numField('min', 'Min (FCFA) *')}
              {numField('max', 'Max (FCFA)')}
              {numField('fraisRetrait', 'Frais retrait')}
              {numField('fraisEnvoi', 'Frais envoi')}
              {numField('minEnvoi', 'Min envoi')}
              {numField('maxEnvoi', 'Max envoi')}
              {numField('frais', 'Frais')}
              {numField('fraisBmoVersAutres', 'B-MO→Autres')}
              {textField('fraisAutresVersBmo', 'Autres→B-MO')}
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="ghost" size="sm" onClick={() => setAddingRow(false)} className="gap-1 cursor-pointer">
                <X size={13} /> Annuler
              </Button>
              <SubmitButton loadingText="Ajout…" className="inline-flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-md bg-primary hover:bg-primary-hover text-white border-none cursor-pointer disabled:opacity-60">
                <Check size={13} /> Ajouter
              </SubmitButton>
            </div>
          </form>
        </div>
      ) : (
        <Button variant="outline" size="sm" onClick={() => setAddingRow(true)} className="self-start gap-1.5 cursor-pointer">
          <Plus size={14} /> Ajouter une ligne
        </Button>
      )}
    </div>
  )
}

/* ─── Formulaire nouvelle grille ─────────────────────────────────────────── */
function CreateMetaForm({ createMetaAction, onCancel, onCreated }) {
  const [state, formAction] = useActionState(createMetaAction, null)
  useEffect(() => { if (state?.success) onCreated() }, [state])

  return (
    <div className="border border-primary/40 rounded-xl p-4 bg-tint">
      <p className="text-sm font-semibold text-slate-800 mb-3">Nouvelle grille tarifaire</p>
      <form action={formAction} className="flex flex-col gap-3">
        {state?.error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{state.error}</p>}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">Identifiant <span className="text-slate-400">(unique, minuscules)</span></label>
            <input
              name="region"
              required
              placeholder="ex: cemac-2, afrique-ouest"
              className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">Titre</label>
            <input
              name="title"
              required
              placeholder="ex: Tarifs CEMAC 2025"
              className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-600">Note <span className="text-slate-400">(optionnel)</span></label>
          <input
            name="note"
            placeholder="ex: Mise à jour mars 2025"
            className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
          />
        </div>
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="ghost" size="sm" onClick={onCancel} className="gap-1.5 cursor-pointer">
            <X size={14} /> Annuler
          </Button>
          <SubmitButton loadingText="Création…" className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md bg-primary hover:bg-primary-hover text-white border-none cursor-pointer disabled:opacity-60">
            <Check size={14} /> Créer
          </SubmitButton>
        </div>
      </form>
    </div>
  )
}

export default function TariffsManager({ tariffs, updateRowAction, createRowAction, deleteRowAction, createMetaAction, deleteMetaAction, countries, createCountryAction, updateCountryAction, deleteCountryAction }) {
  const allMeta   = tariffs // array of { id, region, title, note, rows }
  const regions   = allMeta.map(t => ({ key: t.region, label: t.title || t.region }))
  const [activeTab, setActiveTab] = useState(regions[0]?.key ?? '')
  const [creatingMeta, setCreatingMeta] = useState(false)
  const [confirmDeleteMeta, setConfirmDeleteMeta] = useState(false)
  const [deleteMetaState, deleteMetaFormAction]   = useActionState(deleteMetaAction, null)

  useEffect(() => { if (deleteMetaState?.success) { setConfirmDeleteMeta(false); setActiveTab(regions[0]?.key ?? '') } }, [deleteMetaState])

  const meta = allMeta.find(t => t.region === activeTab)
  const isFixed = FIXED_REGIONS.includes(activeTab)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg md:text-xl font-semibold text-slate-900">Grilles tarifaires</h1>
          <p className="text-sm text-slate-400 mt-0.5">Cliquez sur une ligne pour la modifier.</p>
        </div>
        {!creatingMeta && (
          <Button size="sm" onClick={() => setCreatingMeta(true)} className="gap-1.5 cursor-pointer">
            <Plus size={15} /> Nouvelle grille
          </Button>
        )}
      </div>

      {creatingMeta && (
        <CreateMetaForm
          createMetaAction={createMetaAction}
          onCancel={() => setCreatingMeta(false)}
          onCreated={() => setCreatingMeta(false)}
        />
      )}

      {/* Onglets */}
      <div className="flex gap-2 flex-wrap">
        {regions.map(r => (
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
          <div className="flex items-start justify-between">
            <div>
              <p className="text-base font-semibold text-slate-900">{meta.title}</p>
              {meta.note && <p className="text-xs text-slate-400 mt-0.5">{meta.note}</p>}
            </div>
            {!isFixed && (
              confirmDeleteMeta ? (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  <p className="text-xs text-red-700">Supprimer cette grille et toutes ses lignes ?</p>
                  {deleteMetaState?.error && <p className="text-xs text-red-600">{deleteMetaState.error}</p>}
                  <Button type="button" variant="ghost" size="sm" onClick={() => setConfirmDeleteMeta(false)} className="h-6 text-xs cursor-pointer px-2">Annuler</Button>
                  <form action={deleteMetaFormAction}>
                    <input type="hidden" name="id" value={meta.id} />
                    <SubmitButton loadingText="…" className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 h-6 rounded bg-red-600 hover:bg-red-700 text-white border-none cursor-pointer disabled:opacity-60">
                      <Trash2 size={11} /> Supprimer
                    </SubmitButton>
                  </form>
                </div>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => setConfirmDeleteMeta(true)} className="gap-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer">
                  <Trash2 size={14} /> Supprimer la grille
                </Button>
              )
            )}
          </div>
          <TariffTable
            meta={meta}
            updateRowAction={updateRowAction}
            createRowAction={createRowAction}
            deleteRowAction={deleteRowAction}
          />

          {activeTab === 'international' && countries && (
            <div className="border-t border-slate-200 pt-6">
              <InternationalCountriesManager
                countries={countries}
                createAction={createCountryAction}
                updateAction={updateCountryAction}
                deleteAction={deleteCountryAction}
              />
            </div>
          )}
        </>
      ) : (
        <p className="text-sm text-slate-400">Aucune donnée pour cette région.</p>
      )}
    </div>
  )
}
