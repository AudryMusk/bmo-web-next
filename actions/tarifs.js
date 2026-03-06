'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { tariffRowSchema, tariffMetaSchema, parseResult } from '@/lib/schemas'

export async function updateTariffRowAction(_prevState, formData) {
  const raw = {
    id:                 formData.get('id'),
    min:                formData.get('min'),
    max:                formData.get('max'),
    fraisRetrait:       formData.get('fraisRetrait'),
    fraisEnvoi:         formData.get('fraisEnvoi'),
    minEnvoi:           formData.get('minEnvoi'),
    maxEnvoi:           formData.get('maxEnvoi'),
    frais:              formData.get('frais'),
    fraisBmoVersAutres: formData.get('fraisBmoVersAutres'),
    fraisAutresVersBmo: formData.get('fraisAutresVersBmo') || null,
  }

  const parsed = tariffRowSchema.safeParse(raw)
  const err    = parseResult(parsed)
  if (err) return err

  const { id, ...data } = parsed.data
  await prisma.tariffRow.update({ where: { id }, data })

  revalidatePath('/tarifs')
  return { success: true }
}

export async function updateTariffMetaAction(_prevState, formData) {
  const parsed = tariffMetaSchema.safeParse({
    id:    formData.get('id'),
    title: formData.get('title')?.trim(),
    note:  formData.get('note')?.trim() || null,
  })
  const err = parseResult(parsed)
  if (err) return err

  const { id, title, note } = parsed.data
  await prisma.tariffMeta.update({ where: { id }, data: { title, note } })
  revalidatePath('/tarifs')
  return { success: true }
}
