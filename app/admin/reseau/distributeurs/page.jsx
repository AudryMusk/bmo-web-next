import { prisma } from '@/lib/prisma'
import {
  createDistributorAction,
  updateDistributorAction,
  deleteDistributorAction,
} from '@/actions/reseau'
import NetworkManager from '@/components/admin/NetworkManager'

export const metadata = { title: 'Distributeurs — CMS B-MO' }

const fields = [
  { name: 'name',     label: 'Nom',          required: true },
  { name: 'phone',    label: 'Téléphone',    placeholder: '+229...' },
  { name: 'location', label: 'Localisation', required: true, type: 'textarea' },
]

const displayConfig = {
  primary: 'name',
  secondary: 'location',
  detail: 'phone',
}

export default async function DistributeursPage() {
  const items = await prisma.distributor.findMany({ orderBy: { order: 'asc' } })
  return (
    <NetworkManager
      title="Distributeurs"
      items={items}
      fields={fields}
      displayConfig={displayConfig}
      createAction={createDistributorAction}
      updateAction={updateDistributorAction}
      deleteAction={deleteDistributorAction}
    />
  )
}
