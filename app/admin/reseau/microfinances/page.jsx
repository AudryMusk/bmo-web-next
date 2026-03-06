import { prisma } from '@/lib/prisma'
import {
  createMicrofinanceAction,
  updateMicrofinanceAction,
  deleteMicrofinanceAction,
} from '@/actions/reseau'
import NetworkManager from '@/components/admin/NetworkManager'

export const metadata = { title: 'Microfinances — CMS B-MO' }

const fields = [
  { name: 'name',     label: 'Nom de la microfinance', required: true },
  { name: 'agencies', label: "Nombre d'agences",       type: 'number', required: true, placeholder: '0' },
]

const displayConfig = {
  primary: 'name',
  count: { field: 'agencies', singular: 'agence', plural: 'agences' },
}

export default async function MicrofinancesPage() {
  const items = await prisma.microfinance.findMany({ orderBy: { order: 'asc' } })
  return (
    <NetworkManager
      title="Microfinances"
      items={items}
      fields={fields}
      displayConfig={displayConfig}
      createAction={createMicrofinanceAction}
      updateAction={updateMicrofinanceAction}
      deleteAction={deleteMicrofinanceAction}
      showGps
      mapHref="/admin/reseau/microfinances/carte"
      captureHrefBase="/admin/reseau/microfinances/capture"
    />
  )
}
