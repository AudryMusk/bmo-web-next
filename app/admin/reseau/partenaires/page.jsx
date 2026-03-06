import { prisma } from '@/lib/prisma'
import {
  createPartnerAction,
  updatePartnerAction,
  deletePartnerAction,
} from '@/actions/reseau'
import NetworkManager from '@/components/admin/NetworkManager'

export const metadata = { title: 'Partenaires — CMS B-MO' }

const fields = [
  { name: 'name',        label: 'Nom',         required: true },
  { name: 'category',    label: 'Catégorie',   placeholder: 'ex: Transfert, Mobile Money…' },
  { name: 'description', label: 'Description', type: 'textarea' },
]

const displayConfig = {
  primary: 'name',
  badge: 'category',
  secondary: 'description',
}

export default async function PartenairesPage() {
  const items = await prisma.partner.findMany({ orderBy: { order: 'asc' } })
  return (
    <NetworkManager
      title="Partenaires"
      items={items}
      fields={fields}
      displayConfig={displayConfig}
      createAction={createPartnerAction}
      updateAction={updatePartnerAction}
      deleteAction={deletePartnerAction}
      showGps
      mapHref="/admin/reseau/partenaires/carte"
      captureHrefBase="/admin/reseau/partenaires/capture"
    />
  )
}
