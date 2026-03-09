import { Suspense } from 'react'
import { createPartnerAction, updatePartnerAction } from '@/actions/reseau'
import LocationCaptureForm from '@/components/admin/LocationCaptureForm'

export const metadata = { title: 'Partenaire — Position GPS' }

export default async function PartenairesCapturePage({ searchParams }) {
  const params    = await searchParams
  const entityId  = params?.id ?? null
  const nameParam = params?.name ?? ''
  const cityParam = params?.city ?? ''

  return (
    <Suspense>
      <LocationCaptureForm
        createAction={createPartnerAction}
        updateAction={updatePartnerAction}
        entityLabel="Partenaire"
        backHref="/admin/reseau/partenaires"
        mapHref="/admin/reseau/partenaires/carte"
        entityId={entityId}
        nameParam={nameParam}
        cityParam={cityParam}
        showCity={true}
        showLocation={false}
        extraFields={[
          {
            name: 'category',
            label: 'Catégorie',
            placeholder: 'ex: Banque, Assurance…',
            required: false,
          },
        ]}
      />
    </Suspense>
  )
}
