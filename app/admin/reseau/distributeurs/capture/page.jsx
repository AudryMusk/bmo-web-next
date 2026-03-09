import { Suspense } from 'react'
import { createDistributorAction, updateDistributorAction } from '@/actions/reseau'
import LocationCaptureForm from '@/components/admin/LocationCaptureForm'

export const metadata = { title: 'Distributeur — Position GPS' }

export default async function DistributeursCapturePage({ searchParams }) {
  const params        = await searchParams
  const entityId      = params?.id ?? null
  const nameParam     = params?.name ?? ''
  const cityParam     = params?.city ?? ''
  const locationParam = params?.location ?? ''

  return (
    <Suspense>
      <LocationCaptureForm
        createAction={createDistributorAction}
        updateAction={updateDistributorAction}
        entityLabel="Distributeur"
        backHref="/admin/reseau/distributeurs"
        mapHref="/admin/reseau/distributeurs/carte"
        entityId={entityId}
        nameParam={nameParam}
        cityParam={cityParam}
        locationParam={locationParam}
        showCity={true}
        showLocation={true}
        extraFields={[
          {
            name: 'phone',
            label: 'Téléphone',
            placeholder: 'ex: +229 97 00 00 00',
            required: false,
          },
        ]}
      />
    </Suspense>
  )
}
