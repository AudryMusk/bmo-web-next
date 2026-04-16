'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import {
  MapPin, Camera, CheckCircle2, AlertCircle, Loader2,
  ChevronRight, Navigation, RefreshCw, Store, Phone,
  Globe, ArrowLeft, ShieldCheck, ChevronDown, Building2,
} from 'lucide-react'
import { createMarchandAction } from '@/actions/reseau'
import bjData from './bj.json'

type Step = 'welcome' | 'info' | 'gps' | 'photo' | 'submitting' | 'done' | 'error'

interface GpsCoords { lat: number; lng: number; accuracy: number }

// ─── Helpers ─────────────────────────────────────────────────────────────────

function gpsErrorMsg(err: GeolocationPositionError) {
  if (err.code === err.PERMISSION_DENIED)
    return "Accès à la localisation refusé. Activez-le dans les paramètres de votre navigateur puis réessayez."
  if (err.code === err.POSITION_UNAVAILABLE)
    return "Position non disponible. Sortez à l'air libre ou approchez-vous d'une fenêtre."
  if (err.code === err.TIMEOUT)
    return "La recherche GPS a expiré. Vérifiez que le GPS de l'appareil est activé et réessayez."
  return "Erreur de localisation inconnue."
}

function AccuracyBadge({ accuracy }: { accuracy: number }) {
  const good = accuracy <= 10
  const ok   = accuracy <= 30
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
      good ? 'bg-emerald-100 text-emerald-700' :
      ok   ? 'bg-yellow-100 text-yellow-700'   :
             'bg-orange-100 text-orange-700'
    }`}>
      <Navigation size={11} />
      {good ? 'Précis' : ok ? 'Acceptable' : 'Imprécis'} — ±{Math.round(accuracy)} m
    </span>
  )
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepBar({ current }: { current: 1 | 2 | 3 }) {
  const steps = [
    { n: 1, label: 'Infos' },
    { n: 2, label: 'GPS' },
    { n: 3, label: 'Photo' },
  ]
  return (
    <div className="flex items-center w-full mb-6">
      {steps.map((s, i) => (
        <>
          <div key={s.n} className="flex flex-col items-center gap-1 shrink-0">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              s.n < current   ? 'bg-emerald-500 text-white' :
              s.n === current ? 'bg-primary text-white'     :
                                'bg-slate-100 text-slate-400'
            }`}>
              {s.n < current ? <CheckCircle2 size={14} /> : s.n}
            </div>
            <span className={`text-[11px] font-medium ${s.n === current ? 'text-primary' : 'text-slate-400'}`}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div key={`line-${i}`} className={`flex-1 h-0.5 mx-3 mb-4 rounded ${s.n < current ? 'bg-emerald-400' : 'bg-slate-200'}`} />
          )}
        </>
      ))}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

// ─── BJ data helpers ──────────────────────────────────────────────────────────

type BjEntry = { city: string; lat: string; lng: string; admin_name: string }
const bj = bjData as BjEntry[]
const departments = [...new Set(bj.map(e => e.admin_name))].sort()

export default function InscriptionMarchand() {
  const [step, setStep] = useState<Step>('welcome')

  // Info fields
  const [name, setName]           = useState('')
  const [phone, setPhone]         = useState('')
  const [department, setDept]     = useState('')
  const [city, setCity]           = useState('')

  const cities = useMemo(
    () => department ? bj.filter(e => e.admin_name === department).map(e => e.city).sort() : [],
    [department]
  )

  function handleDeptChange(val: string) {
    setDept(val)
    setCity('')
  }

  // GPS
  const [coords, setCoords]       = useState<GpsCoords | null>(null)
  const [lockedCoords, setLocked] = useState<GpsCoords | null>(null)
  const [gpsErr, setGpsErr]       = useState<string | null>(null)
  const [watching, setWatching]   = useState(false)
  const watchId = useRef<number | null>(null)

  // Photo
  const [photoFile, setPhotoFile]     = useState<File | null>(null)
  const [photoPreview, setPreview]    = useState<string | null>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)

  // Error
  const [submitError, setSubmitError] = useState<string | null>(null)

  // ── GPS ────────────────────────────────────────────────────────────────────

  const startGps = useCallback(() => {
    setGpsErr(null)
    setCoords(null)
    setWatching(true)
    if (!navigator.geolocation) {
      setGpsErr("La géolocalisation n'est pas supportée sur cet appareil.")
      setWatching(false)
      return
    }
    watchId.current = navigator.geolocation.watchPosition(
      pos => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      err => { setGpsErr(gpsErrorMsg(err)); setWatching(false) },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
    )
  }, [])

  const stopGps = useCallback(() => {
    if (watchId.current !== null) { navigator.geolocation.clearWatch(watchId.current); watchId.current = null }
    setWatching(false)
  }, [])

  useEffect(() => { return () => stopGps() }, [stopGps])

  function lockPosition() {
    if (!coords) return
    setLocked(coords)
    stopGps()
    setStep('photo')
  }

  // ── Photo ──────────────────────────────────────────────────────────────────

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoFile(file)
    setPreview(URL.createObjectURL(file))
  }

  // ── Submit ─────────────────────────────────────────────────────────────────

  async function handleSubmit() {
    setStep('submitting')
    const fd = new FormData()
    fd.set('name',       name.trim())
    fd.set('phone',      phone.trim())
    fd.set('country',    'Bénin')
    fd.set('department', department.trim())
    fd.set('city',       city.trim())
    if (lockedCoords) {
      fd.set('lat', String(lockedCoords.lat))
      fd.set('lng', String(lockedCoords.lng))
    }
    if (photoFile) fd.set('photo', photoFile)

    try {
      const res = await createMarchandAction(null, fd)
      if (res?.error) { setSubmitError(res.error); setStep('error') }
      else             setStep('done')
    } catch {
      setSubmitError('Une erreur est survenue. Veuillez réessayer.')
      setStep('error')
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-start p-4 py-8">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/bmo-logo.png" alt="B-MO" className="h-12 w-auto" />
        </div>

        {/* ── WELCOME ── */}
        {step === 'welcome' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-br from-primary to-primary/80 p-8 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Store size={32} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Bonjour cher Marchand</h1>
              <p className="text-white/80 text-sm leading-relaxed">
                Nous allons enregistrer votre point de vente dans le réseau B-MO.
              </p>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div className="bg-white border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={16} className="text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-800">Soyez à votre agence</p>
                  <p className="text-xs text-black mt-0.5 leading-relaxed">
                    Nous allons capturer la position GPS exacte de votre agence.
                    Assurez-vous d&apos;être physiquement sur place avant de commencer.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { icon: Building2, text: 'Vos informations de marchand' },
                  { icon: Navigation, text: 'Votre position GPS précise' },
                  { icon: Camera,    text: 'Une photo de façade de votre agence' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-primary" />
                    </div>
                    {text}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 bg-slate-50 rounded-xl p-3">
                <ShieldCheck size={15} className="text-slate-400 shrink-0" />
                <p className="text-xs text-slate-500">Vos données sont sécurisées et utilisées uniquement par B-MO.</p>
              </div>

              <button
                onClick={() => setStep('info')}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl text-base flex items-center justify-center gap-2 transition-colors mt-2"
              >
                Commencer <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* ── INFO ── */}
        {step === 'info' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <StepBar current={1} />
            <h2 className="text-lg font-bold text-slate-900 mb-1">Vos informations</h2>
            <p className="text-sm text-slate-500 mb-5">Renseignez les informations de votre point de vente.</p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <Store size={14} className="text-primary" /> Nom du marchand *
                </label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Nom exact tel qu'affiché dans B-MO"
                  className="h-12 rounded-xl border-2 border-slate-200 focus:border-primary px-4 text-sm outline-none transition-colors"
                />
                <p className="text-xs text-slate-400">Indiquez le nom exact tel qu&apos;il apparaît dans l&apos;application B-MO.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <Phone size={14} className="text-primary" /> Numéro de téléphone *
                </label>
                <input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+229 01 00 00 00 00"
                  type="tel"
                  className="h-12 rounded-xl border-2 border-slate-200 focus:border-primary px-4 text-sm outline-none transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <Globe size={14} className="text-primary" /> Département *
                </label>
                <div className="relative">
                  <select
                    value={department}
                    onChange={e => handleDeptChange(e.target.value)}
                    className="w-full h-12 rounded-xl border-2 border-slate-200 focus:border-primary px-4 pr-10 text-sm outline-none transition-colors appearance-none bg-white"
                  >
                    <option value="">Sélectionner un département</option>
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <MapPin size={14} className="text-primary" /> Ville *
                </label>
                <div className="relative">
                  <select
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    disabled={!department}
                    className="w-full h-12 rounded-xl border-2 border-slate-200 focus:border-primary px-4 pr-10 text-sm outline-none transition-colors appearance-none bg-white disabled:bg-slate-50 disabled:text-slate-400"
                  >
                    <option value="">{department ? 'Sélectionner une ville' : 'Choisir le département d\'abord'}</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <button
              onClick={() => { stopGps(); setStep('gps'); startGps() }}
              disabled={!name.trim() || !phone.trim() || !department || !city}
              className="w-full mt-6 bg-primary hover:bg-primary/90 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-4 rounded-2xl text-base flex items-center justify-center gap-2 transition-colors"
            >
              Suivant — Position GPS <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* ── GPS ── */}
        {step === 'gps' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <StepBar current={2} />
            <button onClick={() => { stopGps(); setStep('info') }} className="h-8 w-8 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-500 border-none bg-transparent cursor-pointer mb-2">
              <ArrowLeft size={18} />
            </button>

            <h2 className="text-lg font-bold text-slate-900 mb-1">Position GPS</h2>
            <p className="text-sm text-slate-500 mb-5">
              Placez-vous à l&apos;entrée de votre agence et confirmez votre position.
            </p>

            {/* GPS visual */}
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
                <div className="bg-slate-50 rounded-xl px-4 py-3 flex items-center justify-between">
                  <AccuracyBadge accuracy={coords.accuracy} />
                  <p className="text-xs font-mono text-slate-500">{coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}</p>
                </div>
              )}
              {coords && coords.accuracy > 50 && (
                <p className="text-xs text-amber-600 text-center">Restez immobile, le GPS s&apos;améliore…</p>
              )}
              {gpsErr && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-2 text-sm text-red-700">
                  <AlertCircle size={15} className="shrink-0 mt-0.5" />
                  {gpsErr}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              {gpsErr && (
                <button
                  onClick={() => { setGpsErr(null); startGps() }}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors"
                >
                  <RefreshCw size={16} /> Réessayer
                </button>
              )}

              <button
                onClick={lockPosition}
                disabled={!coords || coords.accuracy > 30}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-4 rounded-2xl text-base flex items-center justify-center gap-2 transition-colors"
              >
                <MapPin size={18} />
                {coords && coords.accuracy <= 30 ? 'Confirmer ma position' : 'En attente du GPS…'}
              </button>
            </div>
          </div>
        )}

        {/* ── PHOTO ── */}
        {step === 'photo' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6">
            <StepBar current={3} />
            <button onClick={() => { setStep('gps'); startGps() }} className="h-8 w-8 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-500 border-none bg-transparent cursor-pointer mb-2">
              <ArrowLeft size={18} />
            </button>

            <h2 className="text-lg font-bold text-slate-900 mb-1">Photo de votre agence</h2>
            <p className="text-sm text-slate-500 mb-5">
              Prenez une photo de la façade de votre agence depuis l&apos;extérieur.
            </p>

            <input
              ref={photoInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handlePhoto}
            />

            {!photoPreview ? (
              <button
                onClick={() => photoInputRef.current?.click()}
                className="w-full aspect-video rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary bg-slate-50 hover:bg-primary/5 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Camera size={32} className="text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-700">Prendre une photo</p>
                  <p className="text-xs text-slate-400 mt-0.5">Appuyez pour ouvrir l&apos;appareil photo</p>
                </div>
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-slate-200">
                  <img src={photoPreview} alt="Aperçu" className="w-full h-full object-cover" />
                </div>
                <button
                  onClick={() => { photoInputRef.current?.click() }}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
                >
                  <RefreshCw size={15} /> Reprendre la photo
                </button>
              </div>
            )}

            <div className="flex flex-col gap-3 mt-5">
              <button
                onClick={handleSubmit}
                disabled={!photoPreview}
                className="w-full bg-primary hover:bg-primary/90 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-4 rounded-2xl text-base flex items-center justify-center gap-2 transition-colors"
              >
                <CheckCircle2 size={18} /> Envoyer mon inscription
              </button>
            </div>
          </div>
        )}

        {/* ── SUBMITTING ── */}
        {step === 'submitting' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-12 flex flex-col items-center gap-4 text-center">
            <Loader2 size={48} className="text-primary animate-spin" />
            <div>
              <p className="font-bold text-slate-900">Enregistrement en cours…</p>
              <p className="text-sm text-slate-500 mt-1">Veuillez patienter</p>
            </div>
          </div>
        )}

        {/* ── DONE ── */}
        {step === 'done' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-8 text-white text-center">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Inscription enregistrée !</h2>
              <p className="text-white/80 text-sm">Merci de faire partie du réseau B-MO.</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-slate-600 text-sm leading-relaxed">
                Votre point de vente a été enregistré avec succès. Notre équipe va valider vos informations et vous contacter si nécessaire.
              </p>
              <div className="mt-4 bg-slate-50 rounded-xl p-3 text-xs text-slate-500">
                Agrément BCEAO B00/SSMP/00369-2022
              </div>
            </div>
          </div>
        )}

        {/* ── ERROR ── */}
        {step === 'error' && (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle size={32} className="text-red-500" />
            </div>
            <div>
              <p className="font-bold text-slate-900 mb-1">Une erreur est survenue</p>
              <p className="text-sm text-red-600">{submitError}</p>
            </div>
            <button
              onClick={() => { setSubmitError(null); setStep('photo') }}
              className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} /> Réessayer
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
