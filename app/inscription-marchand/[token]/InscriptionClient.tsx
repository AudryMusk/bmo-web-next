'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { MapPin, Navigation, ArrowLeft, Camera, CheckCircle2, AlertCircle, RefreshCw, ChevronRight, Store, Loader2 } from 'lucide-react'
import { submitMarchandLocationAction } from '@/actions/reseau'
import MobileOnlyGate from '@/components/MobileOnlyGate'

type Step = 'welcome' | 'gps' | 'photo' | 'submitting' | 'done' | 'error'

interface GpsCoords { lat: number; lng: number; accuracy: number }

interface Marchand {
  token: string
  name: string
  phone: string
  email: string
  city: string | null
  department: string | null
  country: string
  lat: number | null
  lng: number | null
  photo: string | null
}

function gpsErrorMsg(err: GeolocationPositionError) {
  if (err.code === err.PERMISSION_DENIED)  return "Accès à la localisation refusé. Activez-le dans les paramètres de votre navigateur."
  if (err.code === err.POSITION_UNAVAILABLE) return "Position non disponible. Sortez à l'air libre ou approchez-vous d'une fenêtre."
  if (err.code === err.TIMEOUT) return "Recherche GPS expirée. Vérifiez que le GPS est activé et réessayez."
  return "Erreur de localisation inconnue."
}

function AccuracyBadge({ accuracy }: { accuracy: number }) {
  const good = accuracy <= 10
  const ok   = accuracy <= 30
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
      good ? 'bg-emerald-100 text-emerald-700' : ok ? 'bg-yellow-100 text-yellow-700' : 'bg-orange-100 text-orange-700'
    }`}>
      <Navigation size={11} />
      {good ? 'Précis' : ok ? 'Acceptable' : 'Imprécis'} — ±{Math.round(accuracy)} m
    </span>
  )
}

function StepBar({ current }: { current: 1 | 2 }) {
  const steps = [{ n: 1, label: 'GPS' }, { n: 2, label: 'Photo' }]
  return (
    <div className="flex items-center w-full mb-6">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              s.n < current ? 'bg-emerald-500 text-white' : s.n === current ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'
            }`}>
              {s.n < current ? <CheckCircle2 size={14} /> : s.n}
            </div>
            <span className={`text-[11px] font-medium ${s.n === current ? 'text-primary' : 'text-slate-400'}`}>{s.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-3 mb-4 rounded ${s.n < current ? 'bg-emerald-400' : 'bg-slate-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function InscriptionClient({ marchand }: { marchand: Marchand }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const [step, setStep] = useState<Step>('welcome')

  // GPS
  const [coords, setCoords]       = useState<GpsCoords | null>(null)
  const [lockedCoords, setLocked] = useState<GpsCoords | null>(null)
  const [gpsErr, setGpsErr]       = useState<string | null>(null)

  const watchId = useRef<number | null>(null)

  // Photo
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreview, setPreview] = useState<string | null>(marchand.photo ?? null)
  const photoInputRef = useRef<HTMLInputElement>(null)

  const [submitError, setSubmitError] = useState<string | null>(null)

  const [permState, setPermState] = useState<PermissionState | null>(null)

  const watchGps = useCallback(() => {
    setGpsErr(null); setCoords(null)
    watchId.current = navigator.geolocation.watchPosition(
      pos => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      err => { setGpsErr(gpsErrorMsg(err)) },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 },
    )
  }, [])

  const startGps = useCallback(async (forceRetry = false) => {
    setGpsErr(null)
    if (!navigator.geolocation) { setGpsErr("La géolocalisation n'est pas supportée."); return }

    if (!navigator.permissions) { watchGps(); return }

    try {
      const result = await navigator.permissions.query({ name: 'geolocation' })
      setPermState(result.state)
      result.onchange = () => setPermState(result.state)

      if (result.state === 'denied' && !forceRetry) {
        setGpsErr("Localisation bloquée. Allez dans les réglages de votre navigateur et autorisez l'accès à la position pour ce site.")
        return
      }
      // Si forceRetry (user dit "j'ai activé"), on tente quand même watchPosition
      // Le navigateur retournera une erreur si toujours bloqué
      watchGps()
    } catch {
      watchGps()
    }
  }, [watchGps])

  const stopGps = useCallback(() => {
    if (watchId.current !== null) { navigator.geolocation.clearWatch(watchId.current); watchId.current = null }
  }, [])

  useEffect(() => () => stopGps(), [stopGps])

  // Auto-start GPS when user grants permission from settings
  useEffect(() => {
    if (permState === 'granted' && step === 'gps' && !coords) watchGps()
  }, [permState, step])

  function lockPosition() {
    if (!coords) return
    setLocked(coords); stopGps(); setStep('photo')
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoFile(file); setPreview(URL.createObjectURL(file))
  }

  async function handleSubmit() {
    setStep('submitting')
    const fd = new FormData()
    fd.set('token', marchand.token)
    if (lockedCoords) { fd.set('lat', String(lockedCoords.lat)); fd.set('lng', String(lockedCoords.lng)) }
    if (photoFile) fd.set('photo', photoFile)
    try {
      const res = await submitMarchandLocationAction(null, fd)
      if (res?.error) { setSubmitError(res.error); setStep('error') }
      else setStep('done')
    } catch {
      setSubmitError('Une erreur est survenue. Veuillez réessayer.')
      setStep('error')
    }
  }

  const alreadyHasGps = marchand.lat != null && marchand.lng != null

  if (!mounted) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-slate-400">
        <Loader2 size={32} className="animate-spin text-primary" />
        <p className="text-sm font-medium">Chargement…</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-start p-4 py-8">
      <MobileOnlyGate />
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/bmo-logo.png" alt="B-MO" className="h-12 w-auto" />
        </div>

        {/* ── WELCOME ── */}
        {step === 'welcome' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-br from-primary to-primary/80 p-8 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Store size={32} className="text-white" />
              </div>
              <h1 className="text-xl font-bold mb-1">Bonjour !</h1>
              <p className="text-white/80 text-sm">Complétez votre fiche marchand B-MO</p>
            </div>

            <div className="p-6 flex flex-col gap-4">
              {/* Merchant info card */}
              <div className="bg-slate-50 rounded-2xl p-4 flex flex-col gap-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Votre agence</p>
                <p className="text-base font-bold text-slate-900">{marchand.name}</p>
                {(marchand.city || marchand.department) && (
                  <p className="text-sm text-slate-500">{[marchand.city, marchand.department].filter(Boolean).join(', ')}</p>
                )}
                <p className="text-sm text-slate-500">{marchand.phone}</p>
              </div>

              {alreadyHasGps && (
                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700">
                  <MapPin size={12} /> Position GPS déjà enregistrée — vous pouvez la mettre à jour
                </div>
              )}

              <p className="text-sm text-slate-500 text-center">
                Nous avons besoin de votre <strong>position GPS exacte</strong> et d'une <strong>photo de la façade</strong> de votre agence.
              </p>

              <button
                type="button"
                onClick={() => { setStep('gps'); startGps() }}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl text-base flex items-center justify-center gap-2 transition-colors touch-manipulation"
              >
                Commencer <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ── GPS ── */}
        {step === 'gps' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <StepBar current={1} />
            <button type="button" onClick={() => { stopGps(); setStep('welcome') }} className="h-8 w-8 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-500 border-none bg-transparent cursor-pointer mb-2">
              <ArrowLeft size={18} />
            </button>

            <h2 className="text-lg font-bold text-slate-900 mb-1">Position GPS</h2>
            <p className="text-sm text-slate-500 mb-5">Placez-vous à l&apos;entrée de votre agence et confirmez votre position.</p>

            {/* Map */}
            <div className="flex flex-col gap-3 mb-5">
              <div className="w-full rounded-2xl border border-slate-200 overflow-hidden bg-slate-100" style={{ height: 220 }}>
                {coords ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${coords.lat},${coords.lng}&zoom=17&size=600x440&scale=2&maptype=roadmap&markers=color:red%7C${coords.lat},${coords.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                    alt="Carte"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-slate-400">
                    <Navigation size={28} className="text-primary animate-pulse" />
                    <p className="text-sm animate-pulse">Recherche de position…</p>
                  </div>
                )}
              </div>
              {coords && !gpsErr && (
                <div className="bg-slate-50 rounded-xl px-4 py-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <AccuracyBadge accuracy={coords.accuracy} />
                    <div className="flex items-center gap-1.5">
                      {coords.accuracy > 10 && <Loader2 size={12} className="animate-spin text-slate-400" />}
                      <p className="text-xs font-mono text-slate-500">{coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</p>
                    </div>
                  </div>
                  {coords.accuracy > 10 && (
                    <p className="text-xs text-amber-600 font-medium">
                      Restez immobile — le GPS affine la précision…
                    </p>
                  )}
                </div>
              )}
              {gpsErr && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-2 text-sm text-red-700">
                  <AlertCircle size={15} className="shrink-0 mt-0.5" /> {gpsErr}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {gpsErr && (
                <>
                  <button type="button" onClick={() => window.location.reload()} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors touch-manipulation">
                    <RefreshCw size={16} /> Réessayer
                  </button>
                  {permState === 'denied' && (
                    <p className="text-xs text-slate-400 text-center px-2">
                      Si la localisation reste bloquée, autorisez-la dans les <strong>réglages de votre navigateur</strong> puis réessayez.
                    </p>
                  )}
                </>
              )}
              <button
                type="button"
                onClick={lockPosition}
                disabled={!coords || coords.accuracy > 10}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-4 rounded-2xl text-base flex items-center justify-center gap-2 transition-colors touch-manipulation"
              >
                {coords && coords.accuracy <= 10
                  ? <><MapPin size={18} /> Confirmer ma position</>
                  : <><Loader2 size={18} className="animate-spin" /> En attente de précision GPS…</>
                }
              </button>
            </div>
          </div>
        )}

        {/* ── PHOTO ── */}
        {step === 'photo' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <StepBar current={2} />
            <button onClick={() => { setStep('gps'); startGps() }} className="h-8 w-8 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-500 border-none bg-transparent cursor-pointer mb-2">
              <ArrowLeft size={18} />
            </button>

            <h2 className="text-lg font-bold text-slate-900 mb-1">Photo de la façade</h2>
            <p className="text-sm text-slate-500 mb-5">Prenez une photo claire de l&apos;entrée de votre agence.</p>

            <div
              onClick={() => photoInputRef.current?.click()}
              className={`w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors mb-5 overflow-hidden ${photoPreview ? 'border-primary/30' : 'border-slate-200 hover:border-primary/40 bg-slate-50'}`}
              style={{ height: 220 }}
            >
              {photoPreview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photoPreview} alt="Façade" className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Camera size={24} className="text-primary" />
                  </div>
                  <p className="text-sm text-slate-500 font-medium">Appuyez pour prendre une photo</p>
                  <p className="text-xs text-slate-400">JPG, PNG — max 5 Mo</p>
                </>
              )}
            </div>

            <input ref={photoInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePhoto} />

            <div className="flex flex-col gap-3">
              {photoPreview && (
                <button onClick={() => photoInputRef.current?.click()} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-2xl text-sm flex items-center justify-center gap-2 transition-colors">
                  <Camera size={16} /> Reprendre la photo
                </button>
              )}
              <button
                onClick={handleSubmit}
                disabled={!photoFile && !marchand.photo}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-4 rounded-2xl text-base flex items-center justify-center gap-2 transition-colors touch-manipulation"
              >
                <CheckCircle2 size={18} /> Envoyer ma fiche
              </button>
              {marchand.photo && !photoFile && (
                <p className="text-xs text-slate-400 text-center">Photo existante conservée si aucune nouvelle photo prise</p>
              )}
            </div>
          </div>
        )}

        {/* ── SUBMITTING ── */}
        {step === 'submitting' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Navigation size={28} className="text-primary animate-pulse" />
            </div>
            <p className="text-lg font-bold text-slate-900">Envoi en cours…</p>
            <p className="text-sm text-slate-400">Merci de patienter.</p>
          </div>
        )}

        {/* ── DONE ── */}
        {step === 'done' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-10 flex flex-col items-center gap-4 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 size={40} className="text-emerald-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Merci !</h2>
            <p className="text-sm text-slate-500 max-w-xs">
              Votre fiche a été mise à jour avec succès. Elle sera validée par notre équipe dans les plus brefs délais.
            </p>
          </div>
        )}

        {/* ── ERROR ── */}
        {step === 'error' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle size={32} className="text-red-500" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Une erreur est survenue</h2>
            <p className="text-sm text-red-600">{submitError}</p>
            <button onClick={() => setStep('photo')} className="bg-primary text-white font-semibold py-3 px-6 rounded-2xl text-sm">
              Réessayer
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
