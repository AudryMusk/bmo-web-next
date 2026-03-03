'use server'

import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { toSlug } from '@/lib/utils'
import { getSession } from '@/lib/session'

async function saveBanner(file) {
  if (!file || typeof file === 'string' || file.size === 0) return null
  const ext = file.name.split('.').pop()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const uploadDir = join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadDir, { recursive: true })
  await writeFile(join(uploadDir, filename), Buffer.from(await file.arrayBuffer()))
  return `/uploads/${filename}`
}

const STATUS_MAP = {
  brouillon: 'brouillon',
  publie:    'publie',
  publié:    'publie',
  planifie:  'planifie',
  planifié:  'planifie',
}

export async function createArticleAction(_prevState, formData) {
  const title       = formData.get('title')
  const content     = formData.get('content')
  const categoryId  = formData.get('category') || null
  const statusRaw   = formData.get('status') ?? 'brouillon'
  const publishedAt = formData.get('publishedAt') || null
  const metaTitle   = formData.get('metaTitle') || null
  const metaDesc    = formData.get('metaDescription') || null
  const image       = await saveBanner(formData.get('banner'))

  if (!title || title.length < 20) {
    return { error: 'Le titre doit faire au moins 20 caractères.' }
  }
  if (!content || content.trim() === '' || content === '<p></p>') {
    return { error: 'Le contenu ne peut pas être vide.' }
  }

  const plainText = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const wordCount = plainText ? plainText.split(' ').length : 0
  const status = STATUS_MAP[statusRaw] ?? 'brouillon'
  const session = await getSession()

  await prisma.article.create({
    data: {
      title,
      content,
      categoryId,
      status,
      publishedAt:     publishedAt ? new Date(publishedAt) : null,
      metaTitle,
      metaDescription: metaDesc,
      slug:            toSlug(title),
      image,
      author:          session?.name ?? 'Admin',
      authorAvatar:    null,
      readTime:        Math.max(1, Math.round(wordCount / 200)),
    },
  })

  revalidatePath('/admin/articles')
  revalidatePath('/blog')
  redirect('/admin/articles')
}

export async function updateArticleAction(_prevState, formData) {
  const id          = formData.get('id')
  const title       = formData.get('title')
  const content     = formData.get('content')
  const categoryId  = formData.get('category') || null
  const statusRaw   = formData.get('status') ?? 'brouillon'
  const publishedAt = formData.get('publishedAt') || null
  const metaTitle   = formData.get('metaTitle') || null
  const metaDesc    = formData.get('metaDescription') || null
  const newImage    = await saveBanner(formData.get('banner'))
  const existing    = await prisma.article.findUnique({ where: { id }, select: { image: true } })
  const image       = newImage ?? existing?.image ?? null

  if (!title || title.length < 20) {
    return { error: 'Le titre doit faire au moins 20 caractères.' }
  }

  const plainText = (content ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const wordCount = plainText ? plainText.split(' ').length : 0
  const status = STATUS_MAP[statusRaw] ?? 'brouillon'

  await prisma.article.update({
    where: { id },
    data: {
      title,
      content,
      categoryId,
      status,
      publishedAt:     publishedAt ? new Date(publishedAt) : null,
      metaTitle,
      metaDescription: metaDesc,
      slug:            toSlug(title),
      image,
      readTime:        Math.max(1, Math.round(wordCount / 200)),
    },
  })

  revalidatePath('/admin/articles')
  revalidatePath('/blog')
  redirect('/admin/articles')
}

export async function deleteArticleAction(formData) {
  const id = formData.get('id')
  if (!id) return
  try {
    await prisma.article.delete({ where: { id } })
  } catch (e) {
    if (e?.code !== 'P2025') throw e
    // Record already deleted — ignore
  }
  revalidatePath('/admin/articles')
  revalidatePath('/blog')
}
