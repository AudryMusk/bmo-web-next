import Link from 'next/link'
import { ArrowLeft, Plus, MapPin } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import NetworkMap from '@/components/admin/NetworkMap'

export const metadata = { title: 'Carte Marchands — CMS B-MO' }

export default async function MarchandsCartePage() {
  const items = await prisma.marchand.findMany({ orderBy: { order: 'asc' } })
  const withGps = items.filter(i => i.lat != null && i.lng != null)

  return (
    <div className="flex flex-col gap-6 h-full">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/reseau/distributeurs"
            className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-slate-900">Carte des Marchands</h1>
            <p className="text-sm text-slate-400">
              {withGps.length} / {items.length} géolocalisé{withGps.length > 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <Link
          href="/admin/reseau/distributeurs/capture"
          className="flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-hover transition-colors"
        >
          <Plus size={15} /> Nouveau
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-12 flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
            <MapPin size={24} className="text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-600">Aucun marchand enregistré</p>
          <p className="text-xs text-slate-400">Ajoutez des marchands pour les voir sur la carte</p>
        </div>
      ) : (
        <div className="flex-1">
          <NetworkMap
            items={items}
            primaryField="name"
            secondaryField="city"
            entityLabel="marchand"
            entityLabelPlural="marchands"
            captureHrefBase="/admin/reseau/distributeurs/capture"
            markerEmoji="🏪"
            markerColor="#8b5cf6"
          />
        </div>
      )}

    </div>
  )
}
