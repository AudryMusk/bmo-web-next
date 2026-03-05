'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { setOptions, importLibrary } from '@googlemaps/js-api-loader'
import { MapPin, Navigation, CheckCircle2, AlertCircle, Loader2, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createGabAction, updateGabAction } from '@/actions/reseau'

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

// ─── Mini-carte de confirmation ───────────────────────────────────────────────
function ConfirmMap({ lat, lng, onConfirm, onReset }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    if (!lat || !lng || !mapRef.current) return

    setOptions({ apiKey: MAPS_API_KEY, version: 'weekly' })

    Promise.all([
      importLibrary('maps'),
      importLibrary('marker'),
    ]).then(([{ Map }, { AdvancedMarkerElement }]) => {

      const position = { lat, lng }

      if (!mapInstanceRef.current) {
        mapInstanceRef.current = new Map(mapRef.current, {
          center: position,
          zoom: 16,
          mapId: 'bmo_gab_capture',
          disableDefaultUI: false,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        })
      } else {
        mapInstanceRef.current.setCenter(position)
      }

      if (markerRef.current) markerRef.current.map = null

      // Marqueur personnalisé rouge
      const pin = document.createElement('div')
      pin.innerHTML = `
        <div style="
          background:#ef4444;
          color:white;
          border-radius:50% 50% 50% 0;
          width:36px;height:36px;
          display:flex;align-items:center;justify-content:center;
          transform:rotate(-45deg);
          box-shadow:0 2px 8px rgba(0,0,0,0.3);
          border:2px solid white;
        ">
          <span style="transform:rotate(45deg);font-size:16px;">📍</span>
        </div>
      `
      markerRef.current = new AdvancedMarkerElement({
        map: mapInstanceRef.current,
        position,
        content: pin,
        title: 'Position du GAB',
      })
    })
  }, [lat, lng])

  if (!lat || !lng) return null

  return (
    <div className="flex flex-col gap-3">
      <div ref={mapRef} className="w-full rounded-xl overflow-hidden border border-slate-200" style={{ height: 240 }} />
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onReset}
          className="flex-1 gap-1.5 cursor-pointer"
        >
          <Navigation size={14} /> Recapturer
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={onConfirm}
          className="flex-1 gap-1.5 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white border-none"
        >
          <CheckCircle2 size={14} /> Confirmer
        </Button>
      </div>
    </div>
  )
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function GabCapturePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const gabId = searchParams.get('id')   // présent si mise à jour d'un GAB existant
  const cityParam = searchParams.get('city') ?? ''
  const locationParam = searchParams.get('location') ?? ''

  const [step, setStep] = useState('idle') // idle | locating | confirm | form | submitting | done
  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)
  const [gpsError, setGpsError] = useState(null)
  const [formError, setFormError] = useState(null)

  const cityRef = useRef(null)
  const locationRef = useRef(null)

  // ── Capture GPS ──
  const captureGPS = useCallback(() => {
    if (!navigator.geolocation) {
      setGpsError("La géolocalisation n'est pas supportée par ce navigateur.")
      return
    }
    setStep('locating')
    setGpsError(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude)
        setLng(pos.coords.longitude)
        setStep('confirm')
      },
      (err) => {
        setGpsError(
          err.code === 1
            ? 'Permission refusée. Autorisez la géolocalisation dans les paramètres du navigateur.'
            : err.code === 2
            ? 'Position introuvable. Vérifiez votre connexion GPS.'
            : 'Délai dépassé. Réessayez.'
        )
        setStep('idle')
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    )
  }, [])

  // ── Soumission du formulaire ──
  async function handleSubmit(e) {
    e.preventDefault()
    const city = cityRef.current?.value?.trim()
    const location = locationRef.current?.value?.trim()
    if (!city || !location) {
      setFormError('La ville et la localisation sont requises.')
      return
    }
    setFormError(null)
    setStep('submitting')
    try {
      const fd = new FormData()
      if (gabId) fd.set('id', gabId)
      fd.set('city', city)
      fd.set('location', location)
      if (lat) fd.set('lat', String(lat))
      if (lng) fd.set('lng', String(lng))

      const action = gabId ? updateGabAction : createGabAction
      const result = await action(null, fd)

      if (result?.error) {
        setFormError(result.error)
        setStep('form')
      } else {
        setStep('done')
      }
    } catch (err) {
      setFormError('Une erreur inattendue est survenue.')
      setStep('form')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={() => router.back()}
          className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors cursor-pointer border-none bg-transparent text-slate-600"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="text-sm font-semibold text-slate-900 leading-tight">
            {gabId ? 'Mettre à jour la position GPS' : 'Nouveau GAB — Capture GPS'}
          </h1>
          <p className="text-xs text-slate-400 leading-tight">GAB UBA</p>
        </div>
      </header>

      {/* Contenu */}
      <div className="flex-1 px-4 py-6 flex flex-col gap-6 max-w-lg mx-auto w-full">

        {/* Étape 1 : Capture */}
        {(step === 'idle' || step === 'locating') && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col items-center gap-5 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin size={30} className="text-primary" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Capturer la position GPS</h2>
              <p className="text-sm text-slate-500 mt-1">
                Placez-vous à proximité du GAB et appuyez sur le bouton ci-dessous.
              </p>
            </div>

            {gpsError && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 w-full text-left">
                <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{gpsError}</p>
              </div>
            )}

            <Button
              onClick={captureGPS}
              disabled={step === 'locating'}
              className="w-full gap-2 cursor-pointer bg-primary hover:bg-primary-hover text-white border-none h-12 text-base font-medium rounded-xl"
            >
              {step === 'locating'
                ? <><Loader2 size={18} className="animate-spin" /> Localisation en cours…</>
                : <><Navigation size={18} /> Capturer ma position</>
              }
            </Button>

            <p className="text-[11px] text-slate-400">
              Votre navigateur vous demandera l'autorisation d'accéder à votre position.
            </p>
          </div>
        )}

        {/* Étape 2 : Confirmation sur la carte */}
        {step === 'confirm' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-4">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Confirmer la position</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Vérifiez que le marqueur correspond bien à l'emplacement du GAB.
              </p>
            </div>

            <div className="flex gap-4 text-sm">
              <div className="bg-slate-50 rounded-lg px-3 py-2 flex-1 text-center">
                <p className="text-xs text-slate-400 mb-0.5">Latitude</p>
                <p className="font-mono font-medium text-slate-700">{lat?.toFixed(6)}</p>
              </div>
              <div className="bg-slate-50 rounded-lg px-3 py-2 flex-1 text-center">
                <p className="text-xs text-slate-400 mb-0.5">Longitude</p>
                <p className="font-mono font-medium text-slate-700">{lng?.toFixed(6)}</p>
              </div>
            </div>

            <ConfirmMap
              lat={lat}
              lng={lng}
              onConfirm={() => setStep('form')}
              onReset={() => { setLat(null); setLng(null); setStep('idle') }}
            />
          </div>
        )}

        {/* Étape 3 : Formulaire */}
        {(step === 'form' || step === 'submitting') && (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Informations du GAB</h2>
              <p className="text-sm text-slate-500 mt-0.5">
                Complétez les informations de localisation.
              </p>
            </div>

            {/* Badge GPS confirmé */}
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <div>
                <p className="text-sm font-medium text-emerald-800">Position GPS capturée</p>
                <p className="text-xs text-emerald-600 font-mono">{lat?.toFixed(6)}, {lng?.toFixed(6)}</p>
              </div>
            </div>

            {formError && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{formError}</p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">Ville *</label>
                <input
                  ref={cityRef}
                  name="city"
                  type="text"
                  required
                  defaultValue={cityParam}
                  placeholder="ex: Cotonou"
                  className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-slate-700">Localisation *</label>
                <input
                  ref={locationRef}
                  name="location"
                  type="text"
                  required
                  defaultValue={locationParam}
                  placeholder="ex: Carrefour SIKA, Akpakpa"
                  className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep('confirm')}
                disabled={step === 'submitting'}
                className="flex-1 cursor-pointer h-11 rounded-xl"
              >
                Retour
              </Button>
              <Button
                type="submit"
                disabled={step === 'submitting'}
                className="flex-1 gap-2 cursor-pointer bg-primary hover:bg-primary-hover text-white border-none h-11 rounded-xl font-medium"
              >
                {step === 'submitting'
                  ? <><Loader2 size={16} className="animate-spin" /> Enregistrement…</>
                  : <><CheckCircle2 size={16} /> {gabId ? 'Mettre à jour' : 'Enregistrer le GAB'}</>
                }
              </Button>
            </div>
          </form>
        )}

        {/* Étape 4 : Succès */}
        {step === 'done' && (
          <div className="bg-white rounded-2xl border border-emerald-200 p-8 flex flex-col items-center gap-5 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 size={32} className="text-emerald-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                {gabId ? 'Position mise à jour !' : 'GAB enregistré avec succès !'}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Les coordonnées GPS ont été sauvegardées. L'adresse a été générée automatiquement.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Button
                onClick={() => router.push('/admin/reseau/gab/carte')}
                className="w-full gap-2 cursor-pointer bg-primary hover:bg-primary-hover text-white border-none h-11 rounded-xl"
              >
                <MapPin size={16} /> Voir sur la carte
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/admin/reseau/gab')}
                className="w-full cursor-pointer h-11 rounded-xl"
              >
                Retour à la liste
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
