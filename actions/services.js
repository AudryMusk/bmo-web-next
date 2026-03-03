'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

function parseLines(val) {
  if (!val) return []
  return val.split('\n').map(s => s.trim()).filter(Boolean)
}

export async function updateServiceAction(_prevState, formData) {
  const id          = formData.get('id')
  const title       = formData.get('title')?.trim()
  const description = formData.get('description')?.trim()
  const icon        = formData.get('icon')?.trim() || null
  const features    = parseLines(formData.get('features'))

  if (!title) return { error: 'Le titre est requis.' }
  if (!description) return { error: 'La description est requise.' }

  await prisma.service.update({
    where: { id },
    data: { title, description, icon, features },
  })

  revalidatePath('/services/particuliers')
  revalidatePath('/services/business')
  return { success: true }
}
