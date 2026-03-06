import { prisma } from '@/lib/prisma'
import { updateTariffRowAction, createTariffRowAction, deleteTariffRowAction, createTariffMetaAction, deleteTariffMetaAction, createCountryAction, updateCountryAction, deleteCountryAction } from '@/actions/tarifs'
import TariffsManager from '@/components/admin/TariffsManager'
import InternationalCountriesManager from '@/components/admin/InternationalCountriesManager'

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
    <div className="flex flex-col gap-10">
      <TariffsManager
        tariffs={tariffs}
        updateRowAction={updateTariffRowAction}
        createRowAction={createTariffRowAction}
        deleteRowAction={deleteTariffRowAction}
        createMetaAction={createTariffMetaAction}
        deleteMetaAction={deleteTariffMetaAction}
      />

      <div className="border-t border-slate-200 pt-8">
        <InternationalCountriesManager
          countries={countries}
          createAction={createCountryAction}
          updateAction={updateCountryAction}
          deleteAction={deleteCountryAction}
        />
      </div>
    </div>
  )
}
