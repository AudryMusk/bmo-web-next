import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Dashboard from './pages/Dashboard'
import Articles from './pages/Articles'
import Categories from './pages/Categories'
import PublicView from './pages/PublicView'
import Login from './pages/Login'
import Register from './pages/Register'
import { NewArticle } from './pages/NewArticle'
import { articles as initialArticles, categories as initialCategories } from './data/mock'
import { ProtectedRoutes } from './components/ProtectedRoutes'

export default function App() {
  const [articles, setArticles]     = useState(initialArticles)
  const [categories, setCategories] = useState(initialCategories)

  function addArticle(newArticle) {
    setArticles(prev => [...prev, { ...newArticle, id: Date.now() }])
  }

  function updateArticle(id, updates) {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a))
  }

  function deleteArticle(id) {
    setArticles(prev => prev.filter(a => a.id !== id))
  }

  function addCategory(cat) {
    setCategories(prev => [...prev, { ...cat, id: prev.length + 1, articlesCount: 0 }])
  }

  function updateCategory(id, updates) {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c))
  }

  function deleteCategory(id) {
    setCategories(prev => prev.filter(c => c.id !== id))
  }

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="public" element={<PublicView articles={articles} />} />
        <Route path="articles/:articleSlug" element={<PublicView articles={articles} />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoutes/>}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard"  element={<Dashboard articles={articles} />} />
            <Route path="articles"   element={
              <Articles
                articles={articles}
                deleteArticle={deleteArticle}
              />
            } />
            <Route path="categories" element={
              <Categories
                categories={categories}
                addCategory={addCategory}
                updateCategory={updateCategory}
                deleteCategory={deleteCategory}
              />
            } />
            <Route path="edit"  element={<NewArticle addArticle={addArticle} updateArticle={updateArticle} />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}
