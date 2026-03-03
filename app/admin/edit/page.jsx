import { prisma } from '@/lib/prisma'
import { createArticleAction, updateArticleAction } from '@/actions/articles'
import ArticleForm from '@/components/admin/ArticleForm'

export const metadata = { title: 'Éditeur — CMS B-MO' }

export default async function EditPage({ searchParams }) {
  const params = await searchParams
  const id = params?.id ?? null

  const [article, categories] = await Promise.all([
    id ? prisma.article.findUnique({ where: { id }, include: { category: true } }) : null,
    prisma.category.findMany({ orderBy: { name: 'asc' } }),
  ])

  return (
    <ArticleForm
      createAction={createArticleAction}
      updateAction={updateArticleAction}
      article={article}
      categories={categories}
    />
  )
}
