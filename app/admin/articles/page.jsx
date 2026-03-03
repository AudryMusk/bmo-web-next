import { getArticles } from '@/lib/cms-data'
import { deleteArticleAction } from '@/actions/articles'
import ArticlesTable from '@/components/admin/ArticlesTable'

export const metadata = { title: 'Articles — CMS B-MO' }

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <ArticlesTable
      articles={articles}
      deleteArticleAction={deleteArticleAction}
    />
  )
}
