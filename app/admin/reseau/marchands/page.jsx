import { prisma } from '@/lib/prisma'
import {
  createMarchandAction,
  updateMarchandAction,
  deleteMarchandAction,
} from '@/actions/reseau'
import NetworkManager from '@/components/admin/NetworkManager'

export const metadata = { title: 'Marchands — CMS B-MO' }

const fields = [
  { name: 'name',       label: 'Nom du marchand (exact dans BMO)', required: true },
  { name: 'phone',      label: 'Numéro du marchand', placeholder: '+229...' },
  { name: 'country',    label: 'Pays', placeholder: 'Bénin' },
  { name: 'department', label: 'Département', placeholder: 'ex: Atlantique' },
  { name: 'city',       label: 'Ville', placeholder: 'ex: Cotonou' },
]

const displayConfig = {
  primary:   'name',
  secondary: 'city',
  detail:    'phone',
}

export default async function MarchandsPage() {
  const items = await prisma.marchand.findMany({ orderBy: { order: 'asc' } })
  return (
    <NetworkManager
      title="Marchands"
      items={items}
      fields={fields}
      displayConfig={displayConfig}
      createAction={createMarchandAction}
      updateAction={updateMarchandAction}
      deleteAction={deleteMarchandAction}
      showGps
      mapHref="/admin/reseau/marchands/carte"
      captureHrefBase="/admin/reseau/marchands/capture"
    />
  )
}
