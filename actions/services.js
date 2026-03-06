'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { serviceSchema, createServiceSchema, parseResult } from '@/lib/schemas'

function parseLines(val) {
  if (!val) return []
  return val.split('\n').map(s => s.trim()).filter(Boolean)
}

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export async function updateServiceAction(_prevState, formData) {
  const parsed = serviceSchema.safeParse({
    id:          formData.get('id'),
    title:       formData.get('title')?.trim(),
    description: formData.get('description')?.trim(),
    icon:        formData.get('icon')?.trim() || null,
    features:    formData.get('features'),
  })
  const err = parseResult(parsed)
  if (err) return err

  const { id, title, description, icon, features } = parsed.data

  await prisma.service.update({
    where: { id },
    data: { title, description, icon, features: parseLines(features) },
  })

  revalidatePath('/services/particuliers')
  revalidatePath('/services/business')
  return { success: true }
}

export async function createServiceAction(_prevState, formData) {
  const parsed = createServiceSchema.safeParse({
    type:        formData.get('type'),
    title:       formData.get('title')?.trim(),
    description: formData.get('description')?.trim(),
    icon:        formData.get('icon')?.trim() || null,
    features:    formData.get('features'),
  })
  const err = parseResult(parsed)
  if (err) return err

  const { type, title, description, icon, features } = parsed.data

  const maxOrder = await prisma.service.aggregate({
    where: { type },
    _max: { order: true },
  })
  const nextOrder = (maxOrder._max.order ?? 0) + 1
  const serviceId = `${slugify(title)}-${Date.now()}`

  await prisma.service.create({
    data: {
      serviceId,
      type,
      title,
      description,
      icon: icon ?? '',
      features: parseLines(features),
      order: nextOrder,
    },
  })

  revalidatePath('/services/particuliers')
  revalidatePath('/services/business')
  return { success: true }
}

export async function deleteServiceAction(_prevState, formData) {
  const id = formData.get('id')
  if (!id) return { error: 'ID manquant.' }

  await prisma.service.delete({ where: { id } })

  revalidatePath('/services/particuliers')
  revalidatePath('/services/business')
  return { success: true }
}
