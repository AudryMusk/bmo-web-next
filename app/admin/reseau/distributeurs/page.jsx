import { prisma } from '@/lib/prisma'
import {
  createMarchandAction,
  updateMarchandAction,
  deleteMarchandAction,
  importMarchandsAction,
  bulkSetActiveMarchandsAction,
} from '@/actions/reseau'
import NetworkManager from '@/components/admin/NetworkManager'

export const metadata = { title: 'Marchands — CMS B-MO' }

const fields = [
  { name: 'name',       label: 'Nom du marchand (exact dans BMO)', required: true },
  { name: 'phone',      label: 'Numéro du marchand', placeholder: '+229...' },
  { name: 'email',      label: 'Email', placeholder: 'ex: contact@marchand.com' },
  { name: 'country',    label: 'Pays', placeholder: 'Bénin' },
  { name: 'department', label: 'Département', placeholder: 'ex: Atlantique' },
  { name: 'city',       label: 'Ville', placeholder: 'ex: Cotonou' },
  { name: 'lat',        label: 'Latitude', placeholder: 'ex: 6.3509' },
  { name: 'lng',        label: 'Longitude', placeholder: 'ex: 2.3478' },
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
      importAction={importMarchandsAction}
      bulkActiveAction={bulkSetActiveMarchandsAction}
      shareLinkBase="/inscription-marchand"
      showGps
      showPhoto
      mapHref="/admin/reseau/distributeurs/carte"
    />
  )
}
