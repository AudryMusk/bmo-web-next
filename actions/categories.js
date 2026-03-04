'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { toSlug } from '@/lib/utils'

export async function createCategoryAction(_prevState, formData) {
  const name        = formData.get('name')?.trim()
  const description = formData.get('description') || null
  const color       = formData.get('color') ?? '#2563EB'

  if (!name) {
    return { error: 'Le nom est requis.' }
  }

  await prisma.category.create({ data: { name, description, color, slug: toSlug(name) } })
  revalidatePath('/admin/categories')
  return { success: true }
}

export async function updateCategoryAction(_prevState, formData) {
  const id          = formData.get('id')
  const name        = formData.get('name')?.trim()
  const description = formData.get('description') || null
  const color       = formData.get('color') ?? '#2563EB'

  if (!name) {
    return { error: 'Le nom est requis.' }
  }

  await prisma.category.update({ where: { id }, data: { name, description, color, slug: toSlug(name) } })
  revalidatePath('/admin/categories')
  return { success: true }
}

export async function deleteCategoryAction(formData) {
  const id = formData.get('id')
  if (!id) return
  try {
    await prisma.article.deleteMany({ where:{ categoryId: id } })
    await prisma.category.delete({ where: { id } })
  } catch (e) {
    if (e?.code !== 'P2025') throw e
    // Ca veut dire que la categorie n etait pas deja dans la database, on ignore l action
  }
  revalidatePath('/admin/categories') // Recharge la page des categories pour refleter les changements
  revalidatePath('/admin/articles')
  revalidatePath('/blog')
}
