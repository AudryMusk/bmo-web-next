'use server'

import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

async function saveLogo(file) {
  if (!file || typeof file === 'string' || file.size === 0) return null
  const ext = file.name.split('.').pop()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const uploadDir = join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadDir, { recursive: true })
  await writeFile(join(uploadDir, filename), Buffer.from(await file.arrayBuffer()))
  return `/uploads/${filename}`
}

// ─── Microfinances ────────────────────────────────────────────────────────────

export async function createMicrofinanceAction(_prevState, formData) {
  const name     = formData.get('name')?.trim()
  const agencies = parseInt(formData.get('agencies'), 10)
  const logo     = await saveLogo(formData.get('logo'))
  if (!name) return { error: 'Le nom est requis.' }
  if (isNaN(agencies)) return { error: "Nombre d'agences invalide." }
  const count = await prisma.microfinance.count()
  await prisma.microfinance.create({ data: { name, agencies, logo, order: count } })
  revalidatePath('/admin/reseau/microfinances')
  return { success: true }
}

export async function updateMicrofinanceAction(_prevState, formData) {
  const id       = formData.get('id')
  const name     = formData.get('name')?.trim()
  const agencies = parseInt(formData.get('agencies'), 10)
  const newLogo  = await saveLogo(formData.get('logo'))
  const existing = await prisma.microfinance.findUnique({ where: { id }, select: { logo: true } })
  const logo     = newLogo ?? existing?.logo ?? null
  if (!name) return { error: 'Le nom est requis.' }
  if (isNaN(agencies)) return { error: "Nombre d'agences invalide." }
  await prisma.microfinance.update({ where: { id }, data: { name, agencies, logo } })
  revalidatePath('/admin/reseau/microfinances')
  return { success: true }
}

export async function deleteMicrofinanceAction(formData) {
  const id = formData.get('id')
  await prisma.microfinance.delete({ where: { id } })
  revalidatePath('/admin/reseau/microfinances')
}

// ─── Distributors ─────────────────────────────────────────────────────────────

export async function createDistributorAction(_prevState, formData) {
  const name     = formData.get('name')?.trim()
  const location = formData.get('location')?.trim()
  const phone    = formData.get('phone')?.trim() || ''
  const logo     = await saveLogo(formData.get('logo'))
  if (!name) return { error: 'Le nom est requis.' }
  if (!location) return { error: 'La localisation est requise.' }
  const count = await prisma.distributor.count()
  await prisma.distributor.create({ data: { name, location, phone, logo, order: count } })
  revalidatePath('/admin/reseau/distributeurs')
  return { success: true }
}

export async function updateDistributorAction(_prevState, formData) {
  const id       = formData.get('id')
  const name     = formData.get('name')?.trim()
  const location = formData.get('location')?.trim()
  const phone    = formData.get('phone')?.trim() || ''
  const newLogo  = await saveLogo(formData.get('logo'))
  const existing = await prisma.distributor.findUnique({ where: { id }, select: { logo: true } })
  const logo     = newLogo ?? existing?.logo ?? null
  if (!name) return { error: 'Le nom est requis.' }
  if (!location) return { error: 'La localisation est requise.' }
  await prisma.distributor.update({ where: { id }, data: { name, location, phone, logo } })
  revalidatePath('/admin/reseau/distributeurs')
  return { success: true }
}

export async function deleteDistributorAction(formData) {
  const id = formData.get('id')
  await prisma.distributor.delete({ where: { id } })
  revalidatePath('/admin/reseau/distributeurs')
}

// ─── GAB ATMs ─────────────────────────────────────────────────────────────────

async function reverseGeocode(lat, lng) {
  const key = process.env.GOOGLE_MAPS_API_KEY
  if (!key || !lat || !lng) return null
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
    )
    const data = await res.json()
    return data.results?.[0]?.formatted_address ?? null
  } catch {
    return null
  }
}

export async function createGabAction(_prevState, formData) {
  const city     = formData.get('city')?.trim()
  const location = formData.get('location')?.trim()
  const logo     = await saveLogo(formData.get('logo'))
  const lat      = formData.get('lat')  ? parseFloat(formData.get('lat'))  : null
  const lng      = formData.get('lng')  ? parseFloat(formData.get('lng'))  : null
  const address  = (await reverseGeocode(lat, lng)) ?? formData.get('address')?.trim() ?? null

  if (!city || !location) return { error: 'Ville et localisation requises.' }
  const count = await prisma.gabAtm.count()
  await prisma.gabAtm.create({ data: { city, location, logo, lat, lng, address, order: count } })
  revalidatePath('/admin/reseau/gab')
  return { success: true }
}

export async function updateGabAction(_prevState, formData) {
  const id       = formData.get('id')
  const city     = formData.get('city')?.trim()
  const location = formData.get('location')?.trim()
  const newLogo  = await saveLogo(formData.get('logo'))
  const existing = await prisma.gabAtm.findUnique({ where: { id }, select: { logo: true } })
  const logo     = newLogo ?? existing?.logo ?? null
  const lat      = formData.get('lat')  ? parseFloat(formData.get('lat'))  : null
  const lng      = formData.get('lng')  ? parseFloat(formData.get('lng'))  : null
  const address  = (await reverseGeocode(lat, lng)) ?? formData.get('address')?.trim() ?? null

  if (!city || !location) return { error: 'Ville et localisation requises.' }
  await prisma.gabAtm.update({ where: { id }, data: { city, location, logo, lat, lng, address } })
  revalidatePath('/admin/reseau/gab')
  return { success: true }
}

export async function deleteGabAction(formData) {
  const id = formData.get('id')
  await prisma.gabAtm.delete({ where: { id } })
  revalidatePath('/admin/reseau/gab')
}

// ─── Partners ─────────────────────────────────────────────────────────────────

export async function createPartnerAction(_prevState, formData) {
  const name        = formData.get('name')?.trim()
  const category    = formData.get('category')?.trim() || ''
  const description = formData.get('description')?.trim() || ''
  const logo        = await saveLogo(formData.get('logo'))
  if (!name) return { error: 'Le nom est requis.' }
  const count = await prisma.partner.count()
  await prisma.partner.create({ data: { name, category, description, logo, order: count } })
  revalidatePath('/admin/reseau/partenaires')
  return { success: true }
}

export async function updatePartnerAction(_prevState, formData) {
  const id          = formData.get('id')
  const name        = formData.get('name')?.trim()
  const category    = formData.get('category')?.trim() || ''
  const description = formData.get('description')?.trim() || ''
  const newLogo     = await saveLogo(formData.get('logo'))
  const existing    = await prisma.partner.findUnique({ where: { id }, select: { logo: true } })
  const logo        = newLogo ?? existing?.logo ?? null
  if (!name) return { error: 'Le nom est requis.' }
  await prisma.partner.update({ where: { id }, data: { name, category, description, logo } })
  revalidatePath('/admin/reseau/partenaires')
  return { success: true }
}

export async function deletePartnerAction(formData) {
  const id = formData.get('id')
  await prisma.partner.delete({ where: { id } })
  revalidatePath('/admin/reseau/partenaires')
}
