'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { tariffRowSchema, tariffMetaSchema, createTariffMetaSchema, createTariffRowSchema, internationalCountrySchema, createInternationalCountrySchema, parseResult } from '@/lib/schemas'

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

export async function createTariffRowAction(_prevState, formData) {
  const raw = {
    tariffMetaId:       formData.get('tariffMetaId'),
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

  const parsed = createTariffRowSchema.safeParse(raw)
  const err    = parseResult(parsed)
  if (err) return err

  const maxOrder = await prisma.tariffRow.aggregate({
    where: { tariffMetaId: parsed.data.tariffMetaId },
    _max: { order: true },
  })
  const nextOrder = (maxOrder._max.order ?? 0) + 1

  const { tariffMetaId, ...rowData } = parsed.data
  await prisma.tariffRow.create({
    data: { ...rowData, order: nextOrder, tariffMeta: { connect: { id: tariffMetaId } } },
  })

  revalidatePath('/tarifs')
  return { success: true }
}

export async function deleteTariffRowAction(_prevState, formData) {
  const id = formData.get('id')
  if (!id) return { error: 'ID manquant.' }

  await prisma.tariffRow.delete({ where: { id } })

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

export async function createTariffMetaAction(_prevState, formData) {
  const parsed = createTariffMetaSchema.safeParse({
    region: formData.get('region')?.trim().toLowerCase(),
    title:  formData.get('title')?.trim(),
    note:   formData.get('note')?.trim() || null,
  })
  const err = parseResult(parsed)
  if (err) return err

  const { region, title, note } = parsed.data

  const existing = await prisma.tariffMeta.findUnique({ where: { region } })
  if (existing) return { error: `Une grille avec l'identifiant "${region}" existe déjà.` }

  await prisma.tariffMeta.create({
    data: { region, title, description: '', note },
  })

  revalidatePath('/tarifs')
  return { success: true }
}

export async function deleteTariffMetaAction(_prevState, formData) {
  const id = formData.get('id')
  if (!id) return { error: 'ID manquant.' }

  await prisma.tariffMeta.delete({ where: { id } })

  revalidatePath('/tarifs')
  return { success: true }
}

// ─── Pays Transferts Internationaux ──────────────────────────────────────────

export async function createCountryAction(_prevState, formData) {
  const parsed = createInternationalCountrySchema.safeParse({
    name: formData.get('name')?.trim(),
  })
  const err = parseResult(parsed)
  if (err) return err

  const maxOrder = await prisma.internationalCountry.aggregate({ _max: { order: true } })
  const nextOrder = (maxOrder._max.order ?? 0) + 1

  await prisma.internationalCountry.create({ data: { name: parsed.data.name, order: nextOrder } })

  revalidatePath('/tarifs')
  return { success: true }
}

export async function updateCountryAction(_prevState, formData) {
  const parsed = internationalCountrySchema.safeParse({
    id:   formData.get('id'),
    name: formData.get('name')?.trim(),
  })
  const err = parseResult(parsed)
  if (err) return err

  await prisma.internationalCountry.update({ where: { id: parsed.data.id }, data: { name: parsed.data.name } })

  revalidatePath('/tarifs')
  return { success: true }
}

export async function deleteCountryAction(_prevState, formData) {
  const id = formData.get('id')
  if (!id) return { error: 'ID manquant.' }

  await prisma.internationalCountry.delete({ where: { id } })

  revalidatePath('/tarifs')
  return { success: true }
}
