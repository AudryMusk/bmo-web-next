import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { ArrowLeft, MapPin, Plus } from 'lucide-react'
import GabMap from './GabMap'

export const metadata = { title: 'Carte des GAB UBA — CMS B-MO' }

export default async function GabCartePage() {
  const gabs = await prisma.gabAtm.findMany({
    orderBy: [{ city: 'asc' }, { order: 'asc' }],
    select: { id: true, city: true, location: true, lat: true, lng: true, address: true, logo: true },
  })

  const withGps = gabs.filter(g => g.lat != null && g.lng != null)

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/reseau/gab"
            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors text-slate-600"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-lg md:text-xl font-semibold text-slate-900">Carte des GAB UBA</h1>
            <p className="text-sm text-slate-400 mt-0.5">
              {withGps.length} / {gabs.length} GAB{gabs.length !== 1 ? 's' : ''} géolocalisés
            </p>
          </div>
        </div>
        <Link
          href="/admin/reseau/gab/capture"
          className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors"
        >
          <Plus size={14} /> Nouveau GAB
        </Link>
      </div>

      {/* Message si aucun GAB géolocalisé */}
      {withGps.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 py-16 flex flex-col items-center gap-4 text-center">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-2xl">🏧</div>
          <div>
            <p className="text-sm font-medium text-slate-700">Aucun GAB géolocalisé pour l'instant</p>
            <p className="text-sm text-slate-400 mt-1">
              Capturez les positions GPS de vos GABs pour les voir sur la carte.
            </p>
          </div>
          <Link
            href="/admin/reseau/gab/capture"
            className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors mt-1"
          >
            <MapPin size={14} /> Capturer une position
          </Link>
        </div>
      ) : (
        <GabMap gabs={gabs} />
      )}
    </div>
  )
}
