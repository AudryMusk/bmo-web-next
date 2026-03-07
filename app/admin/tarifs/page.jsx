import { prisma } from '@/lib/prisma'
import { updateTariffRowAction, createTariffRowAction, deleteTariffRowAction, createTariffMetaAction, deleteTariffMetaAction, createCountryAction, updateCountryAction, deleteCountryAction } from '@/actions/tarifs'
import TariffsManager from '@/components/admin/TariffsManager'

export const metadata = { title: 'Grilles tarifaires — CMS B-MO' }

export default async function TarifsPage() {
  const [tariffs, countries] = await Promise.all([
    prisma.tariffMeta.findMany({
      include: { rows: { orderBy: { order: 'asc' } } },
      orderBy: { region: 'asc' },
    }),
    prisma.internationalCountry.findMany({ orderBy: { order: 'asc' } }),
  ])

  return (
    <TariffsManager
      tariffs={tariffs}
      updateRowAction={updateTariffRowAction}
      createRowAction={createTariffRowAction}
      deleteRowAction={deleteTariffRowAction}
      createMetaAction={createTariffMetaAction}
      deleteMetaAction={deleteTariffMetaAction}
      countries={countries}
      createCountryAction={createCountryAction}
      updateCountryAction={updateCountryAction}
      deleteCountryAction={deleteCountryAction}
    />
  )
}
