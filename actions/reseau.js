'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

// ─── Microfinances ────────────────────────────────────────────────────────────

export async function createMicrofinanceAction(_prevState, formData) {
  const name     = formData.get('name')?.trim()
  const agencies = parseInt(formData.get('agencies'), 10)
  if (!name) return { error: 'Le nom est requis.' }
  if (isNaN(agencies)) return { error: "Nombre d'agences invalide." }
  const count = await prisma.microfinance.count()
  await prisma.microfinance.create({ data: { name, agencies, order: count } })
  revalidatePath('/admin/reseau/microfinances')
  return { success: true }
}

export async function updateMicrofinanceAction(_prevState, formData) {
  const id       = formData.get('id')
  const name     = formData.get('name')?.trim()
  const agencies = parseInt(formData.get('agencies'), 10)
  if (!name) return { error: 'Le nom est requis.' }
  if (isNaN(agencies)) return { error: "Nombre d'agences invalide." }
  await prisma.microfinance.update({ where: { id }, data: { name, agencies } })
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
  if (!name) return { error: 'Le nom est requis.' }
  if (!location) return { error: 'La localisation est requise.' }
  const count = await prisma.distributor.count()
  await prisma.distributor.create({ data: { name, location, phone, order: count } })
  revalidatePath('/admin/reseau/distributeurs')
  return { success: true }
}

export async function updateDistributorAction(_prevState, formData) {
  const id       = formData.get('id')
  const name     = formData.get('name')?.trim()
  const location = formData.get('location')?.trim()
  const phone    = formData.get('phone')?.trim() || ''
  if (!name) return { error: 'Le nom est requis.' }
  if (!location) return { error: 'La localisation est requise.' }
  await prisma.distributor.update({ where: { id }, data: { name, location, phone } })
  revalidatePath('/admin/reseau/distributeurs')
  return { success: true }
}

export async function deleteDistributorAction(formData) {
  const id = formData.get('id')
  await prisma.distributor.delete({ where: { id } })
  revalidatePath('/admin/reseau/distributeurs')
}

// ─── GAB ATMs ─────────────────────────────────────────────────────────────────

export async function createGabAction(_prevState, formData) {
  const city     = formData.get('city')?.trim()
  const location = formData.get('location')?.trim()
  if (!city || !location) return { error: 'Ville et localisation requises.' }
  const count = await prisma.gabAtm.count()
  await prisma.gabAtm.create({ data: { city, location, order: count } })
  revalidatePath('/admin/reseau/gab')
  return { success: true }
}

export async function updateGabAction(_prevState, formData) {
  const id       = formData.get('id')
  const city     = formData.get('city')?.trim()
  const location = formData.get('location')?.trim()
  if (!city || !location) return { error: 'Ville et localisation requises.' }
  await prisma.gabAtm.update({ where: { id }, data: { city, location } })
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
  if (!name) return { error: 'Le nom est requis.' }
  const count = await prisma.partner.count()
  await prisma.partner.create({ data: { name, category, description, order: count } })
  revalidatePath('/admin/reseau/partenaires')
  return { success: true }
}

export async function updatePartnerAction(_prevState, formData) {
  const id          = formData.get('id')
  const name        = formData.get('name')?.trim()
  const category    = formData.get('category')?.trim() || ''
  const description = formData.get('description')?.trim() || ''
  if (!name) return { error: 'Le nom est requis.' }
  await prisma.partner.update({ where: { id }, data: { name, category, description } })
  revalidatePath('/admin/reseau/partenaires')
  return { success: true }
}

export async function deletePartnerAction(formData) {
  const id = formData.get('id')
  await prisma.partner.delete({ where: { id } })
  revalidatePath('/admin/reseau/partenaires')
}
