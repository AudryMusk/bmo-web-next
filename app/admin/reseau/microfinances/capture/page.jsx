import { Suspense } from 'react'
import { createMicrofinanceAction, updateMicrofinanceAction } from '@/actions/reseau'
import LocationCaptureForm from '@/components/admin/LocationCaptureForm'

export const metadata = { title: 'Microfinance — Position GPS' }

// Wrapper pour lire les searchParams côté serveur
export default async function MicrofinancesCapturePage({ searchParams }) {
  const params    = await searchParams
  const entityId  = params?.id ?? null
  const nameParam = params?.name ?? ''
  const cityParam = params?.city ?? ''

  return (
    <Suspense>
      <LocationCaptureForm
        createAction={createMicrofinanceAction}
        updateAction={updateMicrofinanceAction}
        entityLabel="Microfinance"
        backHref="/admin/reseau/microfinances"
        mapHref="/admin/reseau/microfinances/carte"
        entityId={entityId}
        nameParam={nameParam}
        cityParam={cityParam}
        showCity={true}
        showLocation={false}
        extraFields={[
          {
            name: 'agencies',
            label: "Nombre d'agences",
            placeholder: 'ex: 12',
            required: true,
          },
        ]}
      />
    </Suspense>
  )
}
