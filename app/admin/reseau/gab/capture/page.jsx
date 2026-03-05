'use client'

import { useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Link2, MapPin, CheckCircle2, AlertCircle, Loader2, ArrowLeft, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createGabAction, updateGabAction } from '@/actions/reseau'

// ─── Parseur de liens Google Maps / WhatsApp ──────────────────────────────────
function parseGoogleMapsUrl(url) {
  if (!url) return null

  // Format 1 : ?q=lat,lng  (WhatsApp, partage direct)
  const qMatch = url.match(/[?&]q=(-?\d+\.?\d*),(-?\d+\.?\d*)/)
  if (qMatch) return { lat: parseFloat(qMatch[1]), lng: parseFloat(qMatch[2]) }

  // Format 2 : /@lat,lng,zoom  (Google Maps classique)
  const atMatch = url.match(/\/@(-?\d+\.?\d*),(-?\d+\.?\d*)/)
  if (atMatch) return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) }

  // Format 3 : /maps?ll=lat,lng
  const llMatch = url.match(/[?&]ll=(-?\d+\.?\d*),(-?\d+\.?\d*)/)
  if (llMatch) return { lat: parseFloat(llMatch[1]), lng: parseFloat(llMatch[2]) }

  // Format 4 : !3dlat!4dlng (URL longue Google Maps)
  const dMatch = url.match(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/)
  if (dMatch) return { lat: parseFloat(dMatch[1]), lng: parseFloat(dMatch[2]) }

  // Format 5 : coordonnées brutes  "6.350956, 2.347800"
  const rawMatch = url.trim().match(/^(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)$/)
  if (rawMatch) return { lat: parseFloat(rawMatch[1]), lng: parseFloat(rawMatch[2]) }

  return null
}

function isValidCoords(lat, lng) {
  return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function GabCapturePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const gabId         = searchParams.get('id')
  const cityParam     = searchParams.get('city') ?? ''
  const locationParam = searchParams.get('location') ?? ''

  const [urlInput, setUrlInput]     = useState('')
  const [coords, setCoords]         = useState(null)
  const [parseError, setParseError] = useState(null)
  const [formError, setFormError]   = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone]             = useState(false)

  const cityRef     = useRef(null)
  const locationRef = useRef(null)

  function handleUrlChange(val) {
    setUrlInput(val)
    setParseError(null)
    if (!val.trim()) { setCoords(null); return }
    const result = parseGoogleMapsUrl(val.trim())
    if (result && isValidCoords(result.lat, result.lng)) {
      setCoords(result)
    } else {
      setCoords(null)
      if (val.trim().length > 10) {
        setParseError('Lien non reconnu. Copiez un lien Google Maps ou des coordonnées brutes (ex : 6.3509, 2.3478).')
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const city     = cityRef.current?.value?.trim()
    const location = locationRef.current?.value?.trim()
    if (!city || !location) { setFormError('La ville et la localisation sont requises.'); return }
    if (!coords) { setFormError("Extrayez d'abord les coordonnées depuis un lien."); return }
    setFormError(null)
    setSubmitting(true)
    try {
      const fd = new FormData()
      if (gabId) fd.set('id', gabId)
      fd.set('city', city)
      fd.set('location', location)
      fd.set('lat', String(coords.lat))
      fd.set('lng', String(coords.lng))
      const action = gabId ? updateGabAction : createGabAction
      const result = await action(null, fd)
      if (result?.error) { setFormError(result.error); setSubmitting(false) }
      else setDone(true)
    } catch {
      setFormError('Une erreur inattendue est survenue.')
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100 cursor-pointer border-none bg-transparent text-slate-600">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-semibold text-slate-900">GAB UBA — Position GPS</h1>
        </div>
        <div className="bg-white rounded-2xl border border-emerald-200 p-10 flex flex-col items-center gap-5 text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-emerald-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {gabId ? 'Position mise à jour !' : 'GAB enregistré avec succès !'}
            </h2>
            <p className="text-sm text-slate-500 mt-1">Coordonnées GPS sauvegardées. L'adresse a été générée automatiquement.</p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Button onClick={() => router.push('/admin/reseau/gab/carte')} className="w-full gap-2 cursor-pointer bg-primary hover:bg-primary-hover text-white border-none h-10 rounded-xl">
              <MapPin size={15} /> Voir sur la carte
            </Button>
            <Button variant="outline" onClick={() => router.push('/admin/reseau/gab')} className="w-full cursor-pointer h-10 rounded-xl">
              Retour à la liste
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 max-w-xl">

      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => router.back()} className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100 cursor-pointer border-none bg-transparent text-slate-600">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-lg font-semibold text-slate-900">
            {gabId ? 'Mettre à jour la position GPS' : 'Nouveau GAB — Position GPS'}
          </h1>
          <p className="text-sm text-slate-400">GAB UBA</p>
        </div>
      </div>

      {/* Étape 1 — Coller le lien */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-primary">1</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Coller le lien de localisation</p>
            <p className="text-xs text-slate-400 mt-0.5">L'agent envoie sa position via Google Maps ou WhatsApp</p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-3 flex flex-col gap-1 text-xs text-slate-500">
          <p className="font-medium text-slate-600 mb-0.5">Formats acceptés :</p>
          <p>• Lien Google Maps partagé</p>
          <p>• Position envoyée depuis WhatsApp</p>
          <p>• Coordonnées brutes : <span className="font-mono">6.350956, 2.347800</span></p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="relative">
            <Link2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={urlInput}
              onChange={e => handleUrlChange(e.target.value)}
              placeholder="Collez le lien ou les coordonnées ici…"
              className="w-full h-11 rounded-xl border border-slate-200 bg-white pl-9 pr-9 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
            />
            {urlInput && (
              <button type="button" onClick={() => { setUrlInput(''); setCoords(null); setParseError(null) }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 cursor-pointer border-none bg-transparent">
                <X size={14} />
              </button>
            )}
          </div>

          {coords && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5">
              <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-emerald-800">Coordonnées extraites</p>
                <p className="text-xs font-mono text-emerald-600">{coords.lat.toFixed(6)}, {coords.lng.toFixed(6)}</p>
              </div>
              <a href={`https://www.google.com/maps?q=${coords.lat},${coords.lng}`} target="_blank" rel="noopener noreferrer"
                className="text-[11px] font-medium text-emerald-700 hover:underline shrink-0 whitespace-nowrap">
                Vérifier ↗
              </a>
            </div>
          )}

          {parseError && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
              <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs text-red-700">{parseError}</p>
            </div>
          )}
        </div>
      </div>

      {/* Étape 2 — Formulaire */}
      <form onSubmit={handleSubmit}
        className={`bg-white rounded-2xl border p-5 flex flex-col gap-4 transition-opacity duration-200 ${coords ? 'border-slate-200 opacity-100' : 'border-slate-100 opacity-40 pointer-events-none select-none'}`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${coords ? 'bg-primary/10' : 'bg-slate-100'}`}>
            <span className={`text-xs font-bold ${coords ? 'text-primary' : 'text-slate-400'}`}>2</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Informations du GAB</p>
            <p className="text-xs text-slate-400 mt-0.5">Complétez le nom et la localisation</p>
          </div>
        </div>

        {formError && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">
            <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
            <p className="text-xs text-red-700">{formError}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">Ville *</label>
            <input ref={cityRef} name="city" type="text" required defaultValue={cityParam}
              placeholder="ex: Cotonou"
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-slate-600">Localisation *</label>
            <input ref={locationRef} name="location" type="text" required defaultValue={locationParam}
              placeholder="ex: Carrefour SIKA"
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors" />
          </div>
        </div>

        <Button type="submit" disabled={submitting || !coords}
          className="w-full gap-2 cursor-pointer bg-primary hover:bg-primary-hover text-white border-none h-11 rounded-xl font-medium disabled:opacity-60">
          {submitting
            ? <><Loader2 size={15} className="animate-spin" /> Enregistrement…</>
            : <><CheckCircle2 size={15} /> {gabId ? 'Mettre à jour' : 'Enregistrer le GAB'}</>
          }
        </Button>
      </form>

    </div>
  )
}