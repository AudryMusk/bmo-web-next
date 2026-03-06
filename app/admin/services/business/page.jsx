import { prisma } from '@/lib/prisma'
import { updateServiceAction, createServiceAction, deleteServiceAction } from '@/actions/services'
import ServicesManager from '@/components/admin/ServicesManager'

export const metadata = { title: 'Services Business — CMS B-MO' }

export default async function ServicesBusinessPage() {
  const services = await prisma.service.findMany({
    where: { type: 'business' },
    orderBy: { order: 'asc' },
  })

  return (
    <ServicesManager
      services={services}
      updateAction={updateServiceAction}
      createAction={createServiceAction}
      deleteAction={deleteServiceAction}
      typeLabel="Business"
      serviceType="business"
    />
  )
}
