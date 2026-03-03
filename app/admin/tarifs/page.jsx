import { prisma } from '@/lib/prisma'
import { updateTariffRowAction } from '@/actions/tarifs'
import TariffsManager from '@/components/admin/TariffsManager'

export const metadata = { title: 'Grilles tarifaires — CMS B-MO' }

export default async function TarifsPage() {
  const tariffs = await prisma.tariffMeta.findMany({
    include: { rows: { orderBy: { order: 'asc' } } },
    orderBy: { region: 'asc' },
  })

  return <TariffsManager tariffs={tariffs} updateRowAction={updateTariffRowAction} />
}
