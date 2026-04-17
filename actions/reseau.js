'use server'

import { writeFile, mkdir, unlink } from 'fs/promises'
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

async function deleteLogoFile(logoPath) {
  if (!logoPath || typeof logoPath !== 'string') return
  if (!logoPath.startsWith('/uploads/')) return
  const filePath = join(process.cwd(), 'public', logoPath)
  try {
    await unlink(filePath)
  } catch {
    // ignore missing file
  }
}

// ─── Microfinances ────────────────────────────────────────────────────────────

export async function createMicrofinanceAction(_prevState, formData) {
  const name     = formData.get('name')?.trim()
  const agencies = parseInt(formData.get('agencies'), 10)
  // allow passing an existing logo URL when recreating (logoUrl)
  const newLogoFile = formData.get('logo')
  const logoFromUrl = formData.get('logoUrl')
  const savedLogo = await saveLogo(newLogoFile)
  const logo     = savedLogo ?? (typeof logoFromUrl === 'string' ? logoFromUrl : null)
  const lat      = formData.get('lat')  ? parseFloat(formData.get('lat'))  : null
  const lng      = formData.get('lng')  ? parseFloat(formData.get('lng'))  : null
  const address  = (await reverseGeocode(lat, lng)) ?? formData.get('address')?.trim() ?? null
  if (!name) return { error: 'Le nom est requis.' }
  if (isNaN(agencies)) return { error: "Nombre d'agences invalide." }
  const count = await prisma.microfinance.count()
  await prisma.microfinance.create({ data: { name, agencies, logo, lat, lng, address, order: count } })
  revalidatePath('/admin/reseau/microfinances')
  return { success: true }
}

export async function updateMicrofinanceAction(_prevState, formData) {
  const id       = formData.get('id')
  const name     = formData.get('name')?.trim()
  const agencies = parseInt(formData.get('agencies'), 10)
  const newLogo  = await saveLogo(formData.get('logo'))
  const remove   = formData.get('removeLogo')
  const existing = await prisma.microfinance.findUnique({ where: { id }, select: { logo: true } })
  const logo     = remove ? null : (newLogo ?? existing?.logo ?? null)
  const lat      = formData.get('lat')  ? parseFloat(formData.get('lat'))  : null
  const lng      = formData.get('lng')  ? parseFloat(formData.get('lng'))  : null
  const address  = (await reverseGeocode(lat, lng)) ?? formData.get('address')?.trim() ?? null
  if (!name) return { error: 'Le nom est requis.' }
  if (isNaN(agencies)) return { error: "Nombre d'agences invalide." }
  await prisma.microfinance.update({ where: { id }, data: { name, agencies, logo, lat, lng, address } })
  if ((remove || newLogo) && existing?.logo && existing.logo !== logo) {
    await deleteLogoFile(existing.logo)
  }
  revalidatePath('/admin/reseau/microfinances')
  return { success: true }
}

export async function deleteMicrofinanceAction(formData) {
  const id = formData.get('id')
  const existing = await prisma.microfinance.findUnique({ where: { id }, select: { logo: true } })
  await prisma.microfinance.delete({ where: { id } })
  if (existing?.logo) await deleteLogoFile(existing.logo)
  revalidatePath('/admin/reseau/microfinances')
}

// ─── Marchands ────────────────────────────────────────────────────────────────

export async function createMarchandAction(_prevState, formData) {
  const name       = formData.get('name')?.trim()
  const phone      = formData.get('phone')?.trim() || ''
  const email      = formData.get('email')?.trim() || ''
  const country    = formData.get('country')?.trim() || 'Bénin'
  const department = formData.get('department')?.trim() || null
  const city       = formData.get('city')?.trim() || null
  const newLogoFile  = formData.get('logo')
  const logoFromUrl  = formData.get('logoUrl')
  const savedLogo    = await saveLogo(newLogoFile)
  const logo         = savedLogo ?? (typeof logoFromUrl === 'string' ? logoFromUrl : null)
  const newPhotoFile = formData.get('photo')
  const photoFromUrl = formData.get('photoUrl')
  const savedPhoto   = await saveLogo(newPhotoFile)
  const photo        = savedPhoto ?? (typeof photoFromUrl === 'string' ? photoFromUrl : null)
  const lat      = formData.get('lat')  ? parseFloat(formData.get('lat'))  : null
  const lng      = formData.get('lng')  ? parseFloat(formData.get('lng'))  : null
  const address  = (await reverseGeocode(lat, lng)) ?? formData.get('address')?.trim() ?? null
  if (!name) return { error: 'Le nom est requis.' }
  const count = await prisma.marchand.count()
  await prisma.marchand.create({ data: { name, phone, email, country, department, city, logo, photo, lat, lng, address, order: count } })
  revalidatePath('/admin/reseau/marchands')
  return { success: true }
}

export async function updateMarchandAction(_prevState, formData) {
  const id         = formData.get('id')
  const name       = formData.get('name')?.trim()
  const phone      = formData.get('phone')?.trim() || ''
  const email      = formData.get('email')?.trim() || ''
  const country    = formData.get('country')?.trim() || 'Bénin'
  const department = formData.get('department')?.trim() || null
  const city       = formData.get('city')?.trim() || null
  const newLogo    = await saveLogo(formData.get('logo'))
  const removeLogo = formData.get('removeLogo')
  const newPhoto   = await saveLogo(formData.get('photo'))
  const removePhoto = formData.get('removePhoto')
  const existing   = await prisma.marchand.findUnique({ where: { id }, select: { logo: true, photo: true } })
  const logo       = removeLogo ? null : (newLogo ?? existing?.logo ?? null)
  const photo      = removePhoto ? null : (newPhoto ?? existing?.photo ?? null)
  const lat        = formData.get('lat')  ? parseFloat(formData.get('lat'))  : null
  const lng        = formData.get('lng')  ? parseFloat(formData.get('lng'))  : null
  const address    = (await reverseGeocode(lat, lng)) ?? formData.get('address')?.trim() ?? null
  if (!name) return { error: 'Le nom est requis.' }
  await prisma.marchand.update({ where: { id }, data: { name, phone, email, country, department, city, logo, photo, lat, lng, address } })
  if ((removeLogo || newLogo) && existing?.logo && existing.logo !== logo) await deleteLogoFile(existing.logo)
  if ((removePhoto || newPhoto) && existing?.photo && existing.photo !== photo) await deleteLogoFile(existing.photo)
  revalidatePath('/admin/reseau/marchands')
  return { success: true }
}

export async function importMarchandsAction(rows) {
  if (!Array.isArray(rows) || rows.length === 0) return { error: 'Aucune donnée à importer.' }

  const existing = await prisma.marchand.findMany({ select: { name: true } })
  const existingNames = new Set(existing.map(m => m.name.trim().toLowerCase()))

  let order = await prisma.marchand.count()
  const added = [], skipped = [], errors = []

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const line = i + 2 // line 1 = header

    const missingFields = ['name', 'phone', 'email', 'country', 'department', 'city'].filter(f => !row[f]?.trim())
    if (missingFields.length > 0) {
      errors.push({ line, name: row.name?.trim() || '(vide)', reason: `Champs obligatoires manquants : ${missingFields.join(', ')}` })
      continue
    }
    const normalizedName = row.name.trim().toLowerCase()
    if (existingNames.has(normalizedName)) {
      skipped.push({ line, name: row.name.trim(), reason: 'Doublon — marchand déjà enregistré.' })
      continue
    }
    if (row.lat && isNaN(parseFloat(row.lat))) {
      errors.push({ line, name: row.name.trim(), reason: `Latitude invalide : "${row.lat}"` })
      continue
    }
    if (row.lng && isNaN(parseFloat(row.lng))) {
      errors.push({ line, name: row.name.trim(), reason: `Longitude invalide : "${row.lng}"` })
      continue
    }

    try {
      await prisma.marchand.create({
        data: {
          name:       row.name.trim(),
          phone:      row.phone?.trim()      || '',
          email:      row.email?.trim()      || '',
          country:    row.country?.trim()    || 'Bénin',
          department: row.department?.trim() || null,
          city:       row.city?.trim()       || null,
          lat:        row.lat ? parseFloat(row.lat) : null,
          lng:        row.lng ? parseFloat(row.lng) : null,
          active:     false,
          order:      order++,
        },
      })
      existingNames.add(normalizedName) // évite les doublons dans le même CSV
      added.push({ line, name: row.name.trim() })
    } catch (e) {
      errors.push({ line, name: row.name.trim(), reason: `Erreur base de données : ${e?.message ?? 'inconnue'}` })
    }
  }

  revalidatePath('/admin/reseau/marchands')
  revalidatePath('/admin/reseau/distributeurs')
  return { success: true, added, skipped, errors, total: rows.length }
}

export async function submitMarchandLocationAction(_prevState, formData) {
  const token = formData.get('token')
  if (!token) return { error: 'Lien invalide.' }

  const marchand = await prisma.marchand.findUnique({ where: { token } })
  if (!marchand) return { error: 'Lien invalide ou expiré.' }

  const lat = formData.get('lat') ? parseFloat(formData.get('lat')) : null
  const lng = formData.get('lng') ? parseFloat(formData.get('lng')) : null
  const address = (await reverseGeocode(lat, lng)) ?? null

  const photoFile = formData.get('photo')
  const newPhoto = await saveLogo(photoFile)
  const photo = newPhoto ?? marchand.photo ?? null

  await prisma.marchand.update({
    where: { token },
    data: { lat, lng, address, photo },
  })

  return { success: true }
}

export async function bulkSetActiveMarchandsAction(ids, active) {
  if (!Array.isArray(ids) || ids.length === 0) return
  await prisma.marchand.updateMany({ where: { id: { in: ids } }, data: { active } })
  revalidatePath('/admin/reseau/marchands')
  revalidatePath('/admin/reseau/distributeurs')
}

export async function deleteMarchandAction(formData) {
  const id = formData.get('id')
  const existing = await prisma.marchand.findUnique({ where: { id }, select: { logo: true, photo: true } })
  await prisma.marchand.delete({ where: { id } })
  if (existing?.logo)  await deleteLogoFile(existing.logo)
  if (existing?.photo) await deleteLogoFile(existing.photo)
  revalidatePath('/admin/reseau/marchands')
}

// ─── GAB ATMs ─────────────────────────────────────────────────────────────────

async function reverseGeocode(lat, lng) {
  const key = process.env.GOOGLE_MAPS_API_KEY
  if (!key || !lat || !lng) return null
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`,
      { redirect: 'follow' }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.results?.[0]?.formatted_address ?? null
  } catch {
    return null
  }
}

export async function createGabAction(_prevState, formData) {
  const city     = formData.get('city')?.trim()
  const location = formData.get('location')?.trim()
  const newLogoFile = formData.get('logo')
  const logoFromUrl = formData.get('logoUrl')
  const savedLogo = await saveLogo(newLogoFile)
  const logo     = savedLogo ?? (typeof logoFromUrl === 'string' ? logoFromUrl : null)
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
  const remove   = formData.get('removeLogo')
  const existing = await prisma.gabAtm.findUnique({ where: { id }, select: { logo: true } })
  const logo     = remove ? null : (newLogo ?? existing?.logo ?? null)
  const lat      = formData.get('lat')  ? parseFloat(formData.get('lat'))  : null
  const lng      = formData.get('lng')  ? parseFloat(formData.get('lng'))  : null
  const address  = (await reverseGeocode(lat, lng)) ?? formData.get('address')?.trim() ?? null

  if (!city || !location) return { error: 'Ville et localisation requises.' }
  await prisma.gabAtm.update({ where: { id }, data: { city, location, logo, lat, lng, address } })
  if ((remove || newLogo) && existing?.logo && existing.logo !== logo) {
    await deleteLogoFile(existing.logo)
  }
  revalidatePath('/admin/reseau/gab')
  return { success: true }
}

export async function deleteGabAction(formData) {
  const id = formData.get('id')
  const existing = await prisma.gabAtm.findUnique({ where: { id }, select: { logo: true } })
  await prisma.gabAtm.delete({ where: { id } })
  if (existing?.logo) await deleteLogoFile(existing.logo)
  revalidatePath('/admin/reseau/gab')
}

// ─── Partners ─────────────────────────────────────────────────────────────────

export async function createPartnerAction(_prevState, formData) {
  const name        = formData.get('name')?.trim()
  const category    = formData.get('category')?.trim() || ''
  const description = formData.get('description')?.trim() || ''
  const newLogoFile = formData.get('logo')
  const logoFromUrl = formData.get('logoUrl')
  const savedLogo = await saveLogo(newLogoFile)
  const logo        = savedLogo ?? (typeof logoFromUrl === 'string' ? logoFromUrl : null)
  const lat         = formData.get('lat')  ? parseFloat(formData.get('lat'))  : null
  const lng         = formData.get('lng')  ? parseFloat(formData.get('lng'))  : null
  const address     = (await reverseGeocode(lat, lng)) ?? formData.get('address')?.trim() ?? null
  if (!name) return { error: 'Le nom est requis.' }
  const count = await prisma.partner.count()
  await prisma.partner.create({ data: { name, category, description, logo, lat, lng, address, order: count } })
  revalidatePath('/admin/reseau/partenaires')
  return { success: true }
}

export async function updatePartnerAction(_prevState, formData) {
  const id          = formData.get('id')
  const name        = formData.get('name')?.trim()
  const category    = formData.get('category')?.trim() || ''
  const description = formData.get('description')?.trim() || ''
  const newLogo     = await saveLogo(formData.get('logo'))
  const remove      = formData.get('removeLogo')
  const existing    = await prisma.partner.findUnique({ where: { id }, select: { logo: true } })
  const logo        = remove ? null : (newLogo ?? existing?.logo ?? null)
  const lat         = formData.get('lat')  ? parseFloat(formData.get('lat'))  : null
  const lng         = formData.get('lng')  ? parseFloat(formData.get('lng'))  : null
  const address     = (await reverseGeocode(lat, lng)) ?? formData.get('address')?.trim() ?? null
  if (!name) return { error: 'Le nom est requis.' }
  await prisma.partner.update({ where: { id }, data: { name, category, description, logo, lat, lng, address } })
  if ((remove || newLogo) && existing?.logo && existing.logo !== logo) {
    await deleteLogoFile(existing.logo)
  }
  revalidatePath('/admin/reseau/partenaires')
  return { success: true }
}

export async function deletePartnerAction(formData) {
  const id = formData.get('id')
  const existing = await prisma.partner.findUnique({ where: { id }, select: { logo: true } })
  await prisma.partner.delete({ where: { id } })
  if (existing?.logo) await deleteLogoFile(existing.logo)
  revalidatePath('/admin/reseau/partenaires')
}
