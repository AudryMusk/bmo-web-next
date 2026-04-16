import { Suspense } from 'react'
import { createMarchandAction, updateMarchandAction } from '@/actions/reseau'
import LocationCaptureForm from '@/components/admin/LocationCaptureForm'

export const metadata = { title: 'Marchand — Position GPS' }

export default async function MarchandCapturePage({ searchParams }) {
  const params        = await searchParams
  const entityId      = params?.id ?? null
  const nameParam     = params?.name ?? ''
  const cityParam     = params?.city ?? ''

  return (
    <Suspense>
      <LocationCaptureForm
        createAction={createMarchandAction}
        updateAction={updateMarchandAction}
        entityLabel="Marchand"
        backHref="/admin/reseau/distributeurs"
        mapHref="/admin/reseau/distributeurs/carte"
        entityId={entityId}
        nameParam={nameParam}
        cityParam={cityParam}
        showCity={true}
        showLocation={false}
        extraFields={[
          { name: 'phone',      label: 'Numéro du marchand', placeholder: 'ex: +229 97 00 00 00' },
          { name: 'country',    label: 'Pays', placeholder: 'Bénin' },
          { name: 'department', label: 'Département', placeholder: 'ex: Atlantique' },
        ]}
      />
    </Suspense>
  )
}
