'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function updateTariffRowAction(_prevState, formData) {
  const id                 = formData.get('id')
  const min                = parseFloat(formData.get('min'))
  const max                = formData.get('max')                ? parseFloat(formData.get('max'))                : null
  const fraisRetrait       = formData.get('fraisRetrait')       ? parseFloat(formData.get('fraisRetrait'))       : null
  const fraisEnvoi         = formData.get('fraisEnvoi')         ? parseFloat(formData.get('fraisEnvoi'))         : null
  const minEnvoi           = formData.get('minEnvoi')           ? parseFloat(formData.get('minEnvoi'))           : null
  const maxEnvoi           = formData.get('maxEnvoi')           ? parseFloat(formData.get('maxEnvoi'))           : null
  const frais              = formData.get('frais')              ? parseFloat(formData.get('frais'))              : null
  const fraisBmoVersAutres = formData.get('fraisBmoVersAutres') ? parseFloat(formData.get('fraisBmoVersAutres')) : null
  const fraisAutresVersBmo = formData.get('fraisAutresVersBmo') || null

  if (isNaN(min)) return { error: 'Montant minimum invalide.' }

  await prisma.tariffRow.update({
    where: { id },
    data: { min, max, fraisRetrait, fraisEnvoi, minEnvoi, maxEnvoi, frais, fraisBmoVersAutres, fraisAutresVersBmo },
  })

  revalidatePath('/tarifs')
  return { success: true }
}

export async function updateTariffMetaAction(_prevState, formData) {
  const id    = formData.get('id')
  const title = formData.get('title')?.trim()
  const note  = formData.get('note')?.trim() || null

  if (!title) return { error: 'Le titre est requis.' }

  await prisma.tariffMeta.update({ where: { id }, data: { title, note } })
  revalidatePath('/tarifs')
  return { success: true }
}
