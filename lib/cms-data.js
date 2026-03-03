/**
 * lib/cms-data.js — Data access layer for CMS (admin) pages.
 */
import { prisma } from './prisma'

export async function getArticles() {
  return prisma.article.findMany({
    include: { category: true },
    orderBy: { date: 'desc' },
  })
}

export async function getArticleBySlug(slug) {
  return prisma.article.findUnique({
    where: { slug },
    include: { category: true },
  })
}

export async function getCategories() {
  const cats = await prisma.category.findMany({ orderBy: { name: 'asc' } })
  const counts = await prisma.article.groupBy({
    by: ['categoryId'],
    _count: { _all: true },
  })
  const countMap = Object.fromEntries(counts.map(c => [c.categoryId, c._count._all]))
  return cats.map(c => ({ ...c, articlesCount: countMap[c.id] ?? 0 }))
}

export async function getStats() {
  const [totalArticles, categoryCount] = await Promise.all([
    prisma.article.count(),
    prisma.category.count(),
  ])
  return {
    totalArticles,
    publishedToday: 0,
    categories: categoryCount,
    activeBlogs: 1,
  }
}
