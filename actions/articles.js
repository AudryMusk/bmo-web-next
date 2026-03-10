'use server'

import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { toSlug } from '@/lib/utils'
import { getSession } from '@/lib/session'
import { articleSchema, parseResult } from '@/lib/schemas'

async function saveBanner(file) {
  if (!file || typeof file === 'string' || file.size === 0) return null
  const ext = file.name.split('.').pop()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const uploadDir = join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadDir, { recursive: true })
  await writeFile(join(uploadDir, filename), Buffer.from(await file.arrayBuffer()))
  return `/uploads/${filename}`
}

// ─── Upload d'image pour l'éditeur Tiptap ───────────────────────────────────
export async function uploadEditorImageAction(formData) {
  const file = formData.get('image')
  if (!file || typeof file === 'string' || file.size === 0) {
    return { error: 'Aucune image fournie.' }
  }
  
  try {
    const sharp = (await import('sharp')).default
    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Recadrage en carré (crop au centre) + redimensionnement à 800x800
    const squareImage = await sharp(buffer)
      .resize(800, 800, { fit: 'cover', position: 'center' })
      .toBuffer()
    
    const filename = `editor-${Date.now()}-${Math.random().toString(36).slice(2)}.jpg`
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })
    await writeFile(join(uploadDir, filename), squareImage)
    
    return { url: `/uploads/${filename}` }
  } catch (error) {
    // Fallback si sharp n'est pas disponible
    const ext = file.name.split('.').pop()
    const filename = `editor-${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const uploadDir = join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadDir, { recursive: true })
    await writeFile(join(uploadDir, filename), Buffer.from(await file.arrayBuffer()))
    return { url: `/uploads/${filename}` }
  }
}

const STATUS_MAP = {
  brouillon: 'brouillon',
  publie:    'publie',
  publié:    'publie',
  planifie:  'planifie',
  planifié:  'planifie',
}

export async function createArticleAction(_prevState, formData) {
  const raw = {
    title:           formData.get('title'),
    content:         formData.get('content'),
    status:          formData.get('status') ?? 'brouillon',
    categoryId:      formData.get('category') || null,
    publishedAt:     formData.get('publishedAt') || null,
    metaTitle:       formData.get('metaTitle') || null,
    metaDescription: formData.get('metaDescription') || null,
  }

  const parsed = articleSchema.safeParse(raw)
  const err    = parseResult(parsed)
  if (err) return err

  const { title, content, status: statusRaw, categoryId, publishedAt, metaTitle, metaDescription } = parsed.data

  if (!content || content.trim() === '' || content === '<p></p>') {
    return { error: 'Le contenu ne peut pas être vide.', fieldErrors: { content: ['Le contenu ne peut pas être vide.'] } }
  }

  const plainText = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const wordCount = plainText ? plainText.split(' ').length : 0
  const status    = STATUS_MAP[statusRaw] ?? 'brouillon'
  const session   = await getSession()
  const image     = await saveBanner(formData.get('banner'))

  await prisma.article.create({
    data: {
      title,
      content,
      categoryId,
      status,
      publishedAt:     publishedAt ? new Date(publishedAt) : null,
      metaTitle,
      metaDescription,
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
  const id  = formData.get('id')
  const raw = {
    title:           formData.get('title'),
    content:         formData.get('content'),
    status:          formData.get('status') ?? 'brouillon',
    categoryId:      formData.get('category') || null,
    publishedAt:     formData.get('publishedAt') || null,
    metaTitle:       formData.get('metaTitle') || null,
    metaDescription: formData.get('metaDescription') || null,
  }

  const parsed = articleSchema.safeParse(raw)
  const err    = parseResult(parsed)
  if (err) return err

  const { title, content, status: statusRaw, categoryId, publishedAt, metaTitle, metaDescription } = parsed.data

  const plainText = (content ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const wordCount = plainText ? plainText.split(' ').length : 0
  const status    = STATUS_MAP[statusRaw] ?? 'brouillon'
  const newImage  = await saveBanner(formData.get('banner'))
  const existing  = await prisma.article.findUnique({ where: { id }, select: { image: true } })
  const image     = newImage ?? existing?.image ?? null

  await prisma.article.update({
    where: { id },
    data: {
      title,
      content,
      categoryId,
      status,
      publishedAt:     publishedAt ? new Date(publishedAt) : null,
      metaTitle,
      metaDescription,
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
  }
  revalidatePath('/admin/articles')
  revalidatePath('/blog')
}

export async function toggleArticleStatusAction(formData) {
  const id     = formData.get('id')
  const status = formData.get('status') // 'publie' | 'brouillon'
  if (!id || !status) return
  await prisma.article.update({ where: { id }, data: { status } })
  revalidatePath('/admin/articles')
  revalidatePath('/blog')
}

export async function bulkArticlesAction(formData) {
  const ids    = JSON.parse(formData.get('ids') ?? '[]')
  const action = formData.get('action') // 'publie' | 'brouillon' | 'delete'
  if (!ids.length) return

  if (action === 'delete') {
    await prisma.article.deleteMany({ where: { id: { in: ids } } })
  } else if (action === 'publie' || action === 'brouillon') {
    await prisma.article.updateMany({ where: { id: { in: ids } }, data: { status: action } })
  }

  revalidatePath('/admin/articles')
  revalidatePath('/blog')
}

