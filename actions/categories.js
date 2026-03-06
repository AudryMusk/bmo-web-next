'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { toSlug } from '@/lib/utils'
import { categorySchema, parseResult } from '@/lib/schemas'

export async function createCategoryAction(_prevState, formData) {
  const parsed = categorySchema.safeParse({
    name:        formData.get('name')?.trim(),
    description: formData.get('description') || undefined,
    color:       formData.get('color') ?? '#2563EB',
  })
  const err = parseResult(parsed)
  if (err) return err

  const { name, description, color } = parsed.data
  await prisma.category.create({ data: { name, description, color, slug: toSlug(name) } })
  revalidatePath('/admin/categories')
  return { success: true }
}

export async function updateCategoryAction(_prevState, formData) {
  const id     = formData.get('id')
  const parsed = categorySchema.safeParse({
    name:        formData.get('name')?.trim(),
    description: formData.get('description') || undefined,
    color:       formData.get('color') ?? '#2563EB',
  })
  const err = parseResult(parsed)
  if (err) return err

  const { name, description, color } = parsed.data
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
  }
  revalidatePath('/admin/categories')
  revalidatePath('/admin/articles')
  revalidatePath('/blog')
}
