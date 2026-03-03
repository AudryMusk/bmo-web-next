import { prisma } from '@/lib/prisma'
import {
  createGabAction,
  updateGabAction,
  deleteGabAction,
} from '@/actions/reseau'
import NetworkManager from '@/components/admin/NetworkManager'

export const metadata = { title: 'GAB UBA — CMS B-MO' }

const fields = [
  { name: 'city',     label: 'Ville',        required: true, placeholder: 'ex: Cotonou' },
  { name: 'location', label: 'Localisation', required: true, placeholder: 'ex: Carrefour SIKA' },
]

const displayConfig = {
  primary: 'location',
  secondary: 'city',
}

export default async function GabPage() {
  const items = await prisma.gabAtm.findMany({ orderBy: [{ city: 'asc' }, { order: 'asc' }] })
  return (
    <NetworkManager
      title="GAB UBA"
      items={items}
      fields={fields}
      displayConfig={displayConfig}
      createAction={createGabAction}
      updateAction={updateGabAction}
      deleteAction={deleteGabAction}
    />
  )
}
