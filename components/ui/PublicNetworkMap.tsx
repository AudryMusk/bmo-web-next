'use client'

import { useEffect, useRef, useState } from 'react'
import { importLibrary } from '@googlemaps/js-api-loader'
import { MapPin, X, Wifi, WifiOff } from 'lucide-react'

const MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

// ── Types ─────────────────────────────────────────────────────────────────────

type NetworkItem = {
  id?: string | number
  lat?: number | null
  lng?: number | null
  address?: string | null
  logo?: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

type Props = {
  items?: NetworkItem[]
  primaryField?: string
  secondaryField?: string
  entityLabel?: string
  entityLabelPlural?: string
  captureHrefBase?: string
  markerEmoji?: string
  markerColor?: string
}

// ── Composant ─────────────────────────────────────────────────────────────────

export default function PublicNetworkMap({
  items = [],
  primaryField = 'name',
  secondaryField = 'city',
  entityLabel = 'Entité',
  entityLabelPlural = 'Entités',
  captureHrefBase = '',
  markerEmoji = '📍',
  markerColor = '#0284c7',
}: Props) {
  const mapRef         = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)

  const [selected, setSelected] = useState<NetworkItem | null>(null)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)

  // Séparer les items avec/sans coordonnées (filtrés = non-nulls garantis)
  const withGps    = items.filter((i): i is NetworkItem & { lat: number; lng: number } =>
    typeof i.lat === 'number' && typeof i.lng === 'number'
  )
  const withoutGps = items.filter(i => i.lat == null || i.lng == null)

  useEffect(() => {
    if (!mapRef.current) return

    if (!MAPS_API_KEY) {
      setError('Clé API Google Maps manquante (NEXT_PUBLIC_GOOGLE_MAPS_API_KEY).')
      setLoading(false)
      return
    }

    // Initialiser l'API sans passer par le constructeur Loader supprimé en v2
    if (typeof window !== 'undefined' && !window.google?.maps) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__googlemaps_api_key = MAPS_API_KEY
    }

    importLibrary('maps')
      .then(({ Map }) => {
        if (!mapRef.current) return

        // Centre : barycentre des items avec GPS, sinon Cotonou
        let center = { lat: 6.3654, lng: 2.4183 }
        let zoom   = 7

        if (withGps.length === 1) {
          center = { lat: withGps[0].lat, lng: withGps[0].lng }
          zoom   = 15
        } else if (withGps.length > 1) {
          center = {
            lat: withGps.reduce((s, i) => s + i.lat, 0) / withGps.length,
            lng: withGps.reduce((s, i) => s + i.lng, 0) / withGps.length,
          }
          zoom = 10
        }

        const map = new Map(mapRef.current, {
          center,
          zoom,
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
        })
        mapInstanceRef.current = map

        withGps.forEach((item) => {
          // Pin HTML custom
          const pin = document.createElement('div')
          pin.style.cssText = `
            background: ${markerColor};
            color: white;
            border-radius: 50% 50% 50% 0;
            width: 38px; height: 38px;
            display: flex; align-items: center; justify-content: center;
            transform: rotate(-45deg);
            box-shadow: 0 3px 10px rgba(0,0,0,0.3);
            border: 2.5px solid white;
            cursor: pointer;
            transition: transform 0.15s ease;
          `
          pin.innerHTML = `<span style="transform:rotate(45deg);font-size:17px;display:block;">${markerEmoji}</span>`
          pin.onmouseover = () => { pin.style.transform = 'rotate(-45deg) scale(1.15)' }
          pin.onmouseout  = () => { pin.style.transform = 'rotate(-45deg) scale(1)' }

          // OverlayView pour positionner le pin HTML sur la carte
          const overlay = new window.google.maps.OverlayView()

          overlay.onAdd = function () {
            const panes = this.getPanes()
            if (panes) panes.overlayMouseTarget.appendChild(pin)
          }

          overlay.draw = function () {
            const proj = this.getProjection()
            if (!proj) return
            const pos = proj.fromLatLngToDivPixel(
              new window.google.maps.LatLng(item.lat, item.lng)
            )
            if (!pos) return
            pin.style.position = 'absolute'
            pin.style.left = `${pos.x - 19}px`
            pin.style.top  = `${pos.y - 38}px`
          }

          overlay.onRemove = function () { pin.remove() }
          overlay.setMap(map)

          pin.addEventListener('click', () => {
            setSelected(item)
            map.panTo({ lat: item.lat, lng: item.lng })
            map.setZoom(16)
          })
        })

        setLoading(false)
      })
      .catch(() => {
        setError('Impossible de charger Google Maps.')
        setLoading(false)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex flex-col h-full">

      {/* Carte */}
      <div className="relative flex-1" style={{ minHeight: 480 }}>
        <div ref={mapRef} className="absolute inset-0 rounded-xl overflow-hidden" />

        {loading && (
          <div className="absolute inset-0 bg-slate-100 rounded-xl flex items-center justify-center gap-3">
            <div className="w-8 h-8 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-slate-600 text-sm font-medium">Chargement de la carte…</span>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 bg-slate-100 rounded-xl flex items-center justify-center">
            <div className="text-center text-slate-500">
              <MapPin size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Popup item sélectionné */}
        {selected && (
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-10">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                {selected.logo
                  ? (
                    <img
                      src={selected.logo}
                      alt={String(selected[primaryField] ?? '')}
                      className="w-10 h-10 rounded-lg object-contain border border-slate-100 bg-white shrink-0"
                    />
                  ) : (
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 text-lg"
                      style={{ background: `${markerColor}20`, border: `1.5px solid ${markerColor}40` }}
                    >
                      {markerEmoji}
                    </div>
                  )
                }
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 line-clamp-1">
                    {String(selected[primaryField] ?? '')}
                  </p>
                  {secondaryField && selected[secondaryField] && (
                    <p className="text-xs text-slate-500">{String(selected[secondaryField])}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-400 shrink-0 cursor-pointer border-none bg-transparent"
              >
                <X size={14} />
              </button>
            </div>

            {selected.address && (
              <p className="text-xs text-slate-500 mt-2.5 pt-2.5 border-t border-slate-100 leading-relaxed">
                📍 {selected.address}
              </p>
            )}

            <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex gap-1.5 text-[10px] font-mono text-slate-400">
              <span>{selected.lat?.toFixed(6)},</span>
              <span>{selected.lng?.toFixed(6)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Statistiques */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl border border-emerald-200 px-4 py-3 flex items-center gap-2.5">
          <Wifi size={16} className="text-emerald-600 shrink-0" />
          <div>
            <p className="text-lg font-bold text-slate-900 leading-none">{withGps.length}</p>
            <p className="text-xs text-slate-500 mt-0.5">{entityLabelPlural} géolocalisé(e)s</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-center gap-2.5">
          <WifiOff size={16} className="text-slate-400 shrink-0" />
          <div>
            <p className="text-lg font-bold text-slate-900 leading-none">{withoutGps.length}</p>
            <p className="text-xs text-slate-500 mt-0.5">Sans coordonnées</p>
          </div>
        </div>
      </div>

      {/* Liste items sans GPS (affiché seulement si captureHrefBase fourni) */}
      {withoutGps.length > 0 && captureHrefBase && (
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-sm font-medium text-amber-800 mb-2">
            ⚠️ {withoutGps.length} {entityLabel}{withoutGps.length > 1 ? 's' : ''} sans position GPS
          </p>
          <div className="flex flex-wrap gap-1.5">
            {withoutGps.map((item, idx) => (
              <a
                key={item.id ?? idx}
                href={`${captureHrefBase}?id=${item.id}&name=${encodeURIComponent(String(item[primaryField] ?? ''))}`}
                className="text-xs px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition-colors cursor-pointer"
              >
                📍 {String(item[primaryField] ?? item.id)}
              </a>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
