'use server'

import { writeFile, mkdir, unlink } from 'fs/promises'
import { join } from 'path'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

// ─── Helpers ──────────────────────────────────────────────────────────────────

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
  try { await unlink(join(process.cwd(), 'public', logoPath)) } catch {}
}

async function reverseGeocode(lat, lng) {
  const key = process.env.GOOGLE_MAPS_API_KEY
  if (!key || !lat || !lng) return null
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`,
      { redirect: 'follow', signal: AbortSignal.timeout(5000) }
    )
    if (!res.ok) return null
    const data = await res.json()
    return data.results?.[0]?.formatted_address ?? null
  } catch {
    return null
  }
}

function timer(label) {
  const t = Date.now()
  return () => console.log(`[action] ${label} — ${Date.now() - t}ms`)
}

// ─── Microfinances ────────────────────────────────────────────────────────────

export async function createMicrofinanceAction(_prevState, formData) {
  const done = timer('createMicrofinance')
  const name     = formData.get('name')?.trim()
  const agencies = parseInt(formData.get('agencies'), 10)
  const lat      = formData.get('lat') ? parseFloat(formData.get('lat')) : null
  const lng      = formData.get('lng') ? parseFloat(formData.get('lng')) : null
  const logoFromUrl = formData.get('logoUrl')

  if (!name) return { error: 'Le nom est requis.' }
  if (isNaN(agencies)) return { error: "Nombre d'agences invalide." }

  const [savedLogo, address, count] = await Promise.all([
    saveLogo(formData.get('logo')),
    reverseGeocode(lat, lng),
    prisma.microfinance.count(),
  ])
  const logo = savedLogo ?? (typeof logoFromUrl === 'string' ? logoFromUrl : null)

  await prisma.microfinance.create({
    data: { name, agencies, logo, lat, lng, address: address ?? formData.get('address')?.trim() ?? null, order: count },
  })
  revalidatePath('/admin/reseau/microfinances')
  done()
  return { success: true }
}

export async function updateMicrofinanceAction(_prevState, formData) {
  const done = timer('updateMicrofinance')
  const id       = formData.get('id')
  const name     = formData.get('name')?.trim()
  const agencies = parseInt(formData.get('agencies'), 10)
  const lat      = formData.get('lat') ? parseFloat(formData.get('lat')) : null
  const lng      = formData.get('lng') ? parseFloat(formData.get('lng')) : null
  const remove   = formData.get('removeLogo')

  if (!name) return { error: 'Le nom est requis.' }
  if (isNaN(agencies)) return { error: "Nombre d'agences invalide." }

  const [newLogo, address, existing] = await Promise.all([
    saveLogo(formData.get('logo')),
    reverseGeocode(lat, lng),
    prisma.microfinance.findUnique({ where: { id }, select: { logo: true } }),
  ])
  const logo = remove ? null : (newLogo ?? existing?.logo ?? null)

  await prisma.microfinance.update({
    where: { id },
    data: { name, agencies, logo, lat, lng, address: address ?? formData.get('address')?.trim() ?? null },
  })
  if ((remove || newLogo) && existing?.logo && existing.logo !== logo) await deleteLogoFile(existing.logo)
  revalidatePath('/admin/reseau/microfinances')
  done()
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
  const done = timer('createMarchand')
  const name       = formData.get('name')?.trim()
  const phone      = formData.get('phone')?.trim() || ''
  const email      = formData.get('email')?.trim() || ''
  const country    = formData.get('country')?.trim() || 'Bénin'
  const department = formData.get('department')?.trim() || null
  const city       = formData.get('city')?.trim() || null
  const quartier   = formData.get('quartier')?.trim() || null
  const lat        = formData.get('lat') ? parseFloat(formData.get('lat')) : null
  const lng        = formData.get('lng') ? parseFloat(formData.get('lng')) : null
  const logoFromUrl  = formData.get('logoUrl')
  const photoFromUrl = formData.get('photoUrl')

  if (!name) return { error: 'Le nom est requis.' }

  const [savedLogo, savedPhoto, address, count] = await Promise.all([
    saveLogo(formData.get('logo')),
    saveLogo(formData.get('photo')),
    reverseGeocode(lat, lng),
    prisma.marchand.count(),
  ])
  const logo  = savedLogo  ?? (typeof logoFromUrl  === 'string' ? logoFromUrl  : null)
  const photo = savedPhoto ?? (typeof photoFromUrl === 'string' ? photoFromUrl : null)

  await prisma.marchand.create({
    data: { name, phone, email, country, department, city, quartier, logo, photo, lat, lng, address: address ?? formData.get('address')?.trim() ?? null, order: count },
  })
  revalidatePath('/admin/reseau/marchands')
  revalidatePath('/admin/reseau/distributeurs')
  done()
  return { success: true }
}

export async function updateMarchandAction(_prevState, formData) {
  const done = timer('updateMarchand')
  const id         = formData.get('id')
  const name       = formData.get('name')?.trim()
  const phone      = formData.get('phone')?.trim() || ''
  const email      = formData.get('email')?.trim() || ''
  const country    = formData.get('country')?.trim() || 'Bénin'
  const department = formData.get('department')?.trim() || null
  const city       = formData.get('city')?.trim() || null
  const quartier   = formData.get('quartier')?.trim() || null
  const lat        = formData.get('lat') ? parseFloat(formData.get('lat')) : null
  const lng        = formData.get('lng') ? parseFloat(formData.get('lng')) : null
  const removeLogo  = formData.get('removeLogo')
  const removePhoto = formData.get('removePhoto')

  if (!name) return { error: 'Le nom est requis.' }

  const [newLogo, newPhoto, address, existing] = await Promise.all([
    saveLogo(formData.get('logo')),
    saveLogo(formData.get('photo')),
    reverseGeocode(lat, lng),
    prisma.marchand.findUnique({ where: { id }, select: { logo: true, photo: true } }),
  ])
  const logo  = removeLogo  ? null : (newLogo  ?? existing?.logo  ?? null)
  const photo = removePhoto ? null : (newPhoto ?? existing?.photo ?? null)

  await prisma.marchand.update({
    where: { id },
    data: { name, phone, email, country, department, city, quartier, logo, photo, lat, lng, address: address ?? formData.get('address')?.trim() ?? null },
  })
  if ((removeLogo  || newLogo)  && existing?.logo  && existing.logo  !== logo)  await deleteLogoFile(existing.logo)
  if ((removePhoto || newPhoto) && existing?.photo && existing.photo !== photo) await deleteLogoFile(existing.photo)
  revalidatePath('/admin/reseau/marchands')
  revalidatePath('/admin/reseau/distributeurs')
  done()
  return { success: true }
}

export async function importMarchandsAction(rows) {
  const done = timer('importMarchands')
  if (!Array.isArray(rows) || rows.length === 0) return { error: 'Aucune donnée à importer.' }

  const [existing, count] = await Promise.all([
    prisma.marchand.findMany({ select: { name: true, phone: true, email: true, city: true, quartier: true } }),
    prisma.marchand.count(),
  ])
  const existingNames    = new Set(existing.map(m => m.name.trim().toLowerCase()))
  const existingByPhone  = new Map(existing.filter(m => m.phone).map(m => [m.phone.trim(), m]))
  const existingByEmail  = new Map(existing.filter(m => m.email).map(m => [m.email.trim().toLowerCase(), m]))

  let order = count
  const added = [], skipped = [], errors = [], warnings = []
  const batchPhones = new Map() // phone -> name (déjà vu dans ce fichier)
  const batchEmails = new Map() // email -> name

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const line = i + 2

    const missingFields = ['name', 'phone', 'email', 'country', 'quartier'].filter(f => !row[f]?.trim())
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

    // ── Détection doublon probable ──────────────────────────────────────────
    const rPhone = row.phone?.trim()
    const rEmail = row.email?.trim().toLowerCase()
    const rCity  = row.city?.trim().toLowerCase()
    const rQuart = row.quartier?.trim().toLowerCase()

    if (rPhone && batchPhones.has(rPhone)) {
      warnings.push({ line, name: row.name.trim(), reason: `Même téléphone que "${batchPhones.get(rPhone)}" dans ce fichier` })
    } else if (rEmail && batchEmails.has(rEmail)) {
      warnings.push({ line, name: row.name.trim(), reason: `Même email que "${batchEmails.get(rEmail)}" dans ce fichier` })
    } else {
      const dbMatch = (rPhone && existingByPhone.get(rPhone)) || (rEmail && existingByEmail.get(rEmail))
      if (dbMatch) {
        const sameLocation = (rCity && dbMatch.city?.toLowerCase() === rCity) || (rQuart && dbMatch.quartier?.toLowerCase() === rQuart)
        if (sameLocation) {
          const field = rPhone && existingByPhone.has(rPhone) ? 'téléphone' : 'email'
          warnings.push({ line, name: row.name.trim(), reason: `Similaire à "${dbMatch.name}" en base (même ${field} et localisation)` })
        }
      }
    }
    if (rPhone) batchPhones.set(rPhone, row.name.trim())
    if (rEmail) batchEmails.set(rEmail, row.name.trim())
    // ───────────────────────────────────────────────────────────────────────

    try {
      await prisma.marchand.create({
        data: {
          name: row.name.trim(), phone: row.phone?.trim() || '', email: row.email?.trim() || '',
          country: row.country?.trim() || 'Bénin', department: row.department?.trim() || null,
          city: row.city?.trim() || null, quartier: row.quartier?.trim() || null,
          lat: row.lat ? parseFloat(row.lat) : null, lng: row.lng ? parseFloat(row.lng) : null,
          active: false, order: order++,
        },
      })
      existingNames.add(normalizedName)
      added.push({ line, name: row.name.trim() })
    } catch (e) {
      errors.push({ line, name: row.name.trim(), reason: `Erreur base de données : ${e?.message ?? 'inconnue'}` })
    }
  }

  revalidatePath('/admin/reseau/marchands')
  revalidatePath('/admin/reseau/distributeurs')
  done()
  return { success: true, added, skipped, warnings, errors, total: rows.length }
}

export async function submitMarchandLocationAction(_prevState, formData) {
  const done = timer('submitMarchandLocation')
  const token = formData.get('token')
  if (!token) return { error: 'Lien invalide.' }

  const marchand = await prisma.marchand.findUnique({ where: { token } })
  if (!marchand) return { error: 'Lien invalide ou expiré.' }

  const lat = formData.get('lat') ? parseFloat(formData.get('lat')) : null
  const lng = formData.get('lng') ? parseFloat(formData.get('lng')) : null

  const [address, newPhoto] = await Promise.all([
    reverseGeocode(lat, lng),
    saveLogo(formData.get('photo')),
  ])

  await prisma.marchand.update({
    where: { token },
    data: { lat, lng, address, photo: newPhoto ?? marchand.photo ?? null },
  })
  done()
  return { success: true }
}

export async function bulkSetActiveMarchandsAction(ids, active) {
  if (!Array.isArray(ids) || ids.length === 0) return
  await prisma.marchand.updateMany({ where: { id: { in: ids } }, data: { active } })
  revalidatePath('/admin/reseau/marchands')
  revalidatePath('/admin/reseau/distributeurs')
}

export async function bulkDeleteMarchandsAction(ids) {
  if (!Array.isArray(ids) || ids.length === 0) return
  const existing = await prisma.marchand.findMany({ where: { id: { in: ids } }, select: { logo: true, photo: true } })
  await prisma.marchand.deleteMany({ where: { id: { in: ids } } })
  await Promise.all(existing.flatMap(m => [
    m.logo  ? deleteLogoFile(m.logo)  : null,
    m.photo ? deleteLogoFile(m.photo) : null,
  ].filter(Boolean)))
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

export async function createGabAction(_prevState, formData) {
  const done = timer('createGab')
  const city     = formData.get('city')?.trim()
  const location = formData.get('location')?.trim()
  const lat      = formData.get('lat') ? parseFloat(formData.get('lat')) : null
  const lng      = formData.get('lng') ? parseFloat(formData.get('lng')) : null
  const logoFromUrl = formData.get('logoUrl')

  if (!city || !location) return { error: 'Ville et localisation requises.' }

  const [savedLogo, address, count] = await Promise.all([
    saveLogo(formData.get('logo')),
    reverseGeocode(lat, lng),
    prisma.gabAtm.count(),
  ])
  const logo = savedLogo ?? (typeof logoFromUrl === 'string' ? logoFromUrl : null)

  await prisma.gabAtm.create({
    data: { city, location, logo, lat, lng, address: address ?? formData.get('address')?.trim() ?? null, order: count },
  })
  revalidatePath('/admin/reseau/gab')
  done()
  return { success: true }
}

export async function updateGabAction(_prevState, formData) {
  const done = timer('updateGab')
  const id       = formData.get('id')
  const city     = formData.get('city')?.trim()
  const location = formData.get('location')?.trim()
  const lat      = formData.get('lat') ? parseFloat(formData.get('lat')) : null
  const lng      = formData.get('lng') ? parseFloat(formData.get('lng')) : null
  const remove   = formData.get('removeLogo')

  if (!city || !location) return { error: 'Ville et localisation requises.' }

  const [newLogo, address, existing] = await Promise.all([
    saveLogo(formData.get('logo')),
    reverseGeocode(lat, lng),
    prisma.gabAtm.findUnique({ where: { id }, select: { logo: true } }),
  ])
  const logo = remove ? null : (newLogo ?? existing?.logo ?? null)

  await prisma.gabAtm.update({
    where: { id },
    data: { city, location, logo, lat, lng, address: address ?? formData.get('address')?.trim() ?? null },
  })
  if ((remove || newLogo) && existing?.logo && existing.logo !== logo) await deleteLogoFile(existing.logo)
  revalidatePath('/admin/reseau/gab')
  done()
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
  const done = timer('createPartner')
  const name        = formData.get('name')?.trim()
  const category    = formData.get('category')?.trim() || ''
  const description = formData.get('description')?.trim() || ''
  const lat         = formData.get('lat') ? parseFloat(formData.get('lat')) : null
  const lng         = formData.get('lng') ? parseFloat(formData.get('lng')) : null
  const logoFromUrl = formData.get('logoUrl')

  if (!name) return { error: 'Le nom est requis.' }

  const [savedLogo, address, count] = await Promise.all([
    saveLogo(formData.get('logo')),
    reverseGeocode(lat, lng),
    prisma.partner.count(),
  ])
  const logo = savedLogo ?? (typeof logoFromUrl === 'string' ? logoFromUrl : null)

  await prisma.partner.create({
    data: { name, category, description, logo, lat, lng, address: address ?? formData.get('address')?.trim() ?? null, order: count },
  })
  revalidatePath('/admin/reseau/partenaires')
  done()
  return { success: true }
}

export async function updatePartnerAction(_prevState, formData) {
  const done = timer('updatePartner')
  const id          = formData.get('id')
  const name        = formData.get('name')?.trim()
  const category    = formData.get('category')?.trim() || ''
  const description = formData.get('description')?.trim() || ''
  const lat         = formData.get('lat') ? parseFloat(formData.get('lat')) : null
  const lng         = formData.get('lng') ? parseFloat(formData.get('lng')) : null
  const remove      = formData.get('removeLogo')

  if (!name) return { error: 'Le nom est requis.' }

  const [newLogo, address, existing] = await Promise.all([
    saveLogo(formData.get('logo')),
    reverseGeocode(lat, lng),
    prisma.partner.findUnique({ where: { id }, select: { logo: true } }),
  ])
  const logo = remove ? null : (newLogo ?? existing?.logo ?? null)

  await prisma.partner.update({
    where: { id },
    data: { name, category, description, logo, lat, lng, address: address ?? formData.get('address')?.trim() ?? null },
  })
  if ((remove || newLogo) && existing?.logo && existing.logo !== logo) await deleteLogoFile(existing.logo)
  revalidatePath('/admin/reseau/partenaires')
  done()
  return { success: true }
}

export async function deletePartnerAction(formData) {
  const id = formData.get('id')
  const existing = await prisma.partner.findUnique({ where: { id }, select: { logo: true } })
  await prisma.partner.delete({ where: { id } })
  if (existing?.logo) await deleteLogoFile(existing.logo)
  revalidatePath('/admin/reseau/partenaires')
}
