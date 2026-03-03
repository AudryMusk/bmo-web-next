/**
 * lib/db.ts — Data query layer backed by Prisma.
 * Returns data in shapes compatible with the existing page components.
 */
import { prisma } from './prisma'

// ─── Services ─────────────────────────────────────────────────────────────────

export async function getServicesParticuliers() {
  const rows = await prisma.service.findMany({
    where: { type: 'particulier' },
    orderBy: { order: 'asc' },
  })
  return rows.map(s => ({
    id:       s.serviceId,
    title:    s.title,
    icon:     s.icon ?? '',
    description: s.description,
    features:       (s.features       as string[] | null) ?? [],
    ussdSteps:      (s.ussdSteps      as string[] | null) ?? [],
    appSteps:       (s.appSteps       as string[] | null) ?? [],
    characteristics:(s.characteristics as string[] | null) ?? [],
    advantages:     (s.advantages     as string[] | null) ?? [],
    useCases:       (s.useCases       as string[] | null) ?? [],
    steps:          (s.steps          as string[] | null) ?? [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    linkingMethods: s.linkingMethods as any ?? null,
    model:          s.model ?? null,
  }))
}

export async function getServicesBusiness() {
  const rows = await prisma.service.findMany({
    where: { type: 'business' },
    orderBy: { order: 'asc' },
  })
  return rows.map(s => ({
    id:       s.serviceId,
    title:    s.title,
    icon:     s.icon ?? '',
    description: s.description,
    features:       (s.features       as string[] | null) ?? [],
    ussdSteps:      (s.ussdSteps      as string[] | null) ?? [],
    appSteps:       (s.appSteps       as string[] | null) ?? [],
    characteristics:(s.characteristics as string[] | null) ?? [],
    advantages:     (s.advantages     as string[] | null) ?? [],
    useCases:       (s.useCases       as string[] | null) ?? [],
    steps:          (s.steps          as string[] | null) ?? [],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    linkingMethods: s.linkingMethods as any ?? null,
    model:          s.model ?? null,
  }))
}

// ─── Tariffs ──────────────────────────────────────────────────────────────────

async function getTariff(region: string) {
  const meta = await prisma.tariffMeta.findUnique({
    where: { region },
    include: { rows: { orderBy: { order: 'asc' } } },
  })
  if (!meta) return { title: '', description: '', note: null, data: [] }
  return { title: meta.title, description: meta.description ?? '', note: meta.note ?? null, data: meta.rows }
}

export const getTarifsUEMOA        = () => getTariff('uemoa')
export const getTarifsSenegal      = () => getTariff('senegal')
export const getTarifsCEMAC        = () => getTariff('cemac')
export const getTarifsMobileMoney  = () => getTariff('mobile')
export const getTarifsInternational = () => getTariff('international')

// ─── Network ──────────────────────────────────────────────────────────────────

export async function getMicrofinances() {
  return prisma.microfinance.findMany({ orderBy: { order: 'asc' } })
}

export async function getDistributeurs() {
  return prisma.distributor.findMany({ orderBy: { order: 'asc' } })
}

/** Returns GAB ATMs grouped by city: Record<cityName, location[]> */
export async function getGabUBA(): Promise<Record<string, string[]>> {
  const rows = await prisma.gabAtm.findMany({ orderBy: [{ city: 'asc' }, { order: 'asc' }] })
  const grouped: Record<string, string[]> = {}
  for (const row of rows) {
    if (!grouped[row.city]) grouped[row.city] = []
    grouped[row.city].push(row.location)
  }
  return grouped
}

export async function getPartenaires() {
  return prisma.partner.findMany({ orderBy: { order: 'asc' } })
}

/** Compute network stats from live DB data */
export async function getNetworkStats() {
  const [microfinances, gabCount, distributors] = await Promise.all([
    prisma.microfinance.findMany({ select: { agencies: true } }),
    prisma.gabAtm.count(),
    prisma.distributor.count(),
  ])
  return {
    microfinances: microfinances.length,
    agencies: microfinances.reduce((sum, m) => sum + m.agencies, 0),
    distributors,
    gabCount,
    operators: 3,
  }
}

// ─── Blog ─────────────────────────────────────────────────────────────────────

export async function getBlogPosts(status = 'publie') {
  const posts = await prisma.article.findMany({
    where: { status: status as 'publie' | 'brouillon' | 'planifie' },
    include: { category: true },
    orderBy: { date: 'desc' },
  })
  return posts.map(p => ({
    id:       p.id,
    slug:     p.slug,
    title:    p.title,
    excerpt:  p.excerpt ?? '',
    category: p.category?.name ?? '',
    date:     new Date(p.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
    readTime: `${p.readTime} min`,
    image:    p.image ?? undefined,
    author:   p.author,
    content:  typeof p.content === 'string' ? p.content : '',
  }))
}

export async function getBlogCategories() {
  const cats = await prisma.category.findMany({ orderBy: { name: 'asc' } })
  return ['Tous', ...cats.map(c => c.name)]
}

export async function getBlogPostBySlug(slug: string) {
  const p = await prisma.article.findUnique({
    where: { slug },
    include: { category: true },
  })
  if (!p) return null
  return {
    id:       p.id,
    slug:     p.slug,
    title:    p.title,
    excerpt:  p.excerpt ?? '',
    category: p.category?.name ?? '',
    date:     new Date(p.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
    readTime: `${p.readTime} min`,
    image:    p.image ?? undefined,
    author:   p.author,
    content:  typeof p.content === 'string' ? p.content : '',
  }
}
