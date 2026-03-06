'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { serviceSchema, parseResult } from '@/lib/schemas'

function parseLines(val) {
  if (!val) return []
  return val.split('\n').map(s => s.trim()).filter(Boolean)
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
