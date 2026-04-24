import { prisma } from '@/lib/prisma'
import {
  createMarchandAction,
  updateMarchandAction,
  deleteMarchandAction,
  importMarchandsAction,
  bulkSetActiveMarchandsAction,
  bulkDeleteMarchandsAction,
} from '@/actions/reseau'
import MarchandTable from '@/components/admin/MarchandTable'

export const metadata = { title: 'Marchands — CMS B-MO' }

export default async function MarchandsPage() {
  const items = await prisma.marchand.findMany({ orderBy: { order: 'asc' } })
  return (
    <MarchandTable
      title="Marchands"
      items={items}
      createAction={createMarchandAction}
      updateAction={updateMarchandAction}
      deleteAction={deleteMarchandAction}
      importAction={importMarchandsAction}
      bulkActiveAction={bulkSetActiveMarchandsAction}
      bulkDeleteAction={bulkDeleteMarchandsAction}
      shareLinkBase="/inscription-marchand"
      mapHref="/admin/reseau/distributeurs/carte"
    />
  )
}
