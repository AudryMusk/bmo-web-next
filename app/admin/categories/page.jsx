import { getCategories } from '@/lib/cms-data'
import {
  createCategoryAction,
  updateCategoryAction,
  deleteCategoryAction,
} from '@/actions/categories'
import CategoriesManager from '@/components/admin/CategoriesManager'

export const metadata = { title: 'Catégories — CMS B-MO' }

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <CategoriesManager
      categories={categories}
      createAction={createCategoryAction}
      updateAction={updateCategoryAction}
      deleteAction={deleteCategoryAction}
    />
  )
}
