'use client'

import { useEffect, useRef, useState } from 'react'
import { setOptions, importLibrary } from '@googlemaps/js-api-loader'
import { MapPin, Navigation2, X, Wifi, WifiOff } from 'lucide-react'

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

export default function GabMap({ gabs }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const [selectedGab, setSelectedGab] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const gabsWithGps = gabs.filter(g => g.lat != null && g.lng != null)
  const gabsWithoutGps = gabs.filter(g => g.lat == null || g.lng == null)

  useEffect(() => {
    if (!mapRef.current) return

    if (!MAPS_API_KEY) {
      setError('Clé API Google Maps manquante.')
      setLoading(false)
      return
    }

    setOptions({ apiKey: MAPS_API_KEY, version: 'weekly' })

    Promise.all([
      importLibrary('maps'),
      importLibrary('marker'),
    ]).then(([{ Map }, { AdvancedMarkerElement }]) => {

      // Centre sur le Bénin par défaut, ou sur le barycentre des GABs
      let center = { lat: 6.3654, lng: 2.4183 } // Cotonou
      let zoom = 7

      if (gabsWithGps.length === 1) {
        center = { lat: gabsWithGps[0].lat, lng: gabsWithGps[0].lng }
        zoom = 15
      } else if (gabsWithGps.length > 1) {
        const avgLat = gabsWithGps.reduce((s, g) => s + g.lat, 0) / gabsWithGps.length
        const avgLng = gabsWithGps.reduce((s, g) => s + g.lng, 0) / gabsWithGps.length
        center = { lat: avgLat, lng: avgLng }
        zoom = 10
      }

      mapInstanceRef.current = new Map(mapRef.current, {
        center,
        zoom,
        mapId: 'bmo_gab_map',
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: true,
      })

      // Créer les marqueurs
      gabsWithGps.forEach((gab) => {
        const pinEl = document.createElement('div')
        pinEl.style.cssText = `
          background: #dc2626;
          color: white;
          border-radius: 50% 50% 50% 0;
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          transform: rotate(-45deg);
          box-shadow: 0 3px 12px rgba(220,38,38,0.4);
          border: 2.5px solid white;
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        `
        pinEl.innerHTML = `<span style="transform:rotate(45deg);font-size:18px;display:block;">🏧</span>`
        pinEl.onmouseover = () => {
          pinEl.style.transform = 'rotate(-45deg) scale(1.15)'
          pinEl.style.boxShadow = '0 6px 20px rgba(220,38,38,0.5)'
        }
        pinEl.onmouseout = () => {
          pinEl.style.transform = 'rotate(-45deg) scale(1)'
          pinEl.style.boxShadow = '0 3px 12px rgba(220,38,38,0.4)'
        }

        const marker = new AdvancedMarkerElement({
          map: mapInstanceRef.current,
          position: { lat: gab.lat, lng: gab.lng },
          content: pinEl,
          title: `${gab.location} — ${gab.city}`,
        })

        marker.addListener('click', () => {
          setSelectedGab(gab)
          mapInstanceRef.current.panTo({ lat: gab.lat, lng: gab.lng })
          mapInstanceRef.current.setZoom(16)
        })
      })

      setLoading(false)
    }).catch(() => {
      setError('Impossible de charger Google Maps.')
      setLoading(false)
    })
  }, [])

  return (
    <div className="flex flex-col h-full">
      {/* Carte */}
      <div className="relative flex-1" style={{ minHeight: 480 }}>
        <div ref={mapRef} className="absolute inset-0 rounded-xl overflow-hidden" />

        {/* Overlay loading */}
        {loading && (
          <div className="absolute inset-0 bg-slate-100 rounded-xl flex items-center justify-center gap-3">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin border-[3px]" />
            <span className="text-slate-600 text-sm font-medium">Chargement de la carte…</span>
          </div>
        )}

        {/* Overlay erreur */}
        {error && (
          <div className="absolute inset-0 bg-slate-100 rounded-xl flex items-center justify-center">
            <div className="text-center text-slate-500">
              <MapPin size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Popup info GAB sélectionné */}
        {selectedGab && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-10">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                {selectedGab.logo
                  ? <img src={selectedGab.logo} alt={selectedGab.location} className="w-10 h-10 rounded-lg object-contain border border-slate-100 bg-white shrink-0" />
                  : <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center shrink-0 text-lg">🏧</div>
                }
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 line-clamp-1">{selectedGab.location}</p>
                  <p className="text-xs text-slate-500">{selectedGab.city}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedGab(null)}
                className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-400 shrink-0 cursor-pointer border-none bg-transparent"
              >
                <X size={14} />
              </button>
            </div>

            {selectedGab.address && (
              <p className="text-xs text-slate-500 mt-2.5 pt-2.5 border-t border-slate-100 leading-relaxed">
                📍 {selectedGab.address}
              </p>
            )}

            <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex gap-1.5 text-[10px] font-mono text-slate-400">
              <span>{selectedGab.lat?.toFixed(6)},</span>
              <span>{selectedGab.lng?.toFixed(6)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Légende / Résumé */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl border border-emerald-200 px-4 py-3 flex items-center gap-2.5">
          <Wifi size={16} className="text-emerald-600 shrink-0" />
          <div>
            <p className="text-lg font-bold text-slate-900 leading-none">{gabsWithGps.length}</p>
            <p className="text-xs text-slate-500 mt-0.5">GAB géolocalisés</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-center gap-2.5">
          <WifiOff size={16} className="text-slate-400 shrink-0" />
          <div>
            <p className="text-lg font-bold text-slate-900 leading-none">{gabsWithoutGps.length}</p>
            <p className="text-xs text-slate-500 mt-0.5">Sans coordonnées</p>
          </div>
        </div>
      </div>

      {/* Liste des GABs sans GPS */}
      {gabsWithoutGps.length > 0 && (
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm font-medium text-amber-800 mb-2">
            ⚠️ {gabsWithoutGps.length} GAB{gabsWithoutGps.length > 1 ? 's' : ''} sans position GPS
          </p>
          <div className="flex flex-wrap gap-1.5">
            {gabsWithoutGps.map(g => (
              <a
                key={g.id}
                href={`/admin/reseau/gab/capture?id=${g.id}&city=${encodeURIComponent(g.city)}&location=${encodeURIComponent(g.location)}`}
                className="text-xs px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition-colors cursor-pointer"
              >
                📍 {g.location}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
