import { prisma } from '@/lib/prisma'
import { updateServiceAction, createServiceAction, deleteServiceAction } from '@/actions/services'
import ServicesManager from '@/components/admin/ServicesManager'

export const metadata = { title: 'Services Particuliers — CMS B-MO' }

export default async function ServicesParticuliersPage() {
  const services = await prisma.service.findMany({
    where: { type: 'particulier' },
    orderBy: { order: 'asc' },
  })

  return (
    <ServicesManager
      services={services}
      updateAction={updateServiceAction}
      createAction={createServiceAction}
      deleteAction={deleteServiceAction}
      typeLabel="Particuliers"
      serviceType="particulier"
    />
  )
}
