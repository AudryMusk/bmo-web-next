'use client'

import { useActionState } from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, ChevronDown, ChevronUp, ImagePlus } from 'lucide-react'
import RichEditor from '@/components/admin/RichEditor'

function toSlug(title) {
  return title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

export default function ArticleForm({ createAction, updateAction, article = null, categories = [] }) {
  const isEdit = !!article
  const action = isEdit ? updateAction : createAction
  const router = useRouter()

  const [state, formAction] = useActionState(action, { error: null })
  const [isPending, setIsPending] = useState(false)
  const [seoOpen, setSeoOpen]     = useState(false)
  const [bannerPreview, setBannerPreview] = useState(article?.image ?? null)
  const [content, setContent]     = useState(
    article?.content
      ? (typeof article.content === 'string'
          ? article.content
          : article.content.map(b => b.type === 'heading' ? `<h2>${b.text}</h2>` : `<p>${b.text}</p>`).join(''))
      : ''
  )
  const [title, setTitle]         = useState(article?.title ?? '')
  const STATUS_NORM = { 'publié': 'publie', 'planifié': 'planifie' }
  const [status, setStatus]       = useState(STATUS_NORM[article?.status] ?? article?.status ?? 'brouillon')
  const [metaTitle, setMetaTitle] = useState(article?.metaTitle ?? '')
  const [metaDesc, setMetaDesc]   = useState(article?.metaDescription ?? '')

  const wordCount = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).length

  useEffect(() => {
    if (state?.success) router.push('/admin/articles')
  }, [state, router])

  // Reset isPending when state updates (action completed)
  useEffect(() => { setIsPending(false) }, [state])

  return (
    <div className="-m-4 md:-m-8 bg-white min-h-screen flex flex-col">

      {/* Header */}
      <header className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-slate-100 shrink-0">
        <button
          type="button"
          onClick={() => router.push('/admin/articles')}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors cursor-pointer bg-transparent border-none"
        >
          <ArrowLeft size={15} />
          <span className="hidden sm:inline">Articles</span>
        </button>
        <div className="flex items-center gap-2">
          <button
            type="submit"
            form="article-form"
            name="intent"
            value="draft"
            disabled={isPending}
            className="text-sm text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer bg-white disabled:opacity-60"
          >
            Brouillon
          </button>
          <button
            type="submit"
            form="article-form"
            disabled={isPending}
            className="flex items-center gap-1.5 text-sm font-semibold bg-primary text-white px-4 py-1.5 rounded-lg hover:bg-primary-hover transition-colors cursor-pointer border-none disabled:opacity-60"
          >
            <Save size={14} />
            {isPending ? 'Enregistrement…' : isEdit ? 'Enregistrer' : 'Publier'}
          </button>
        </div>
      </header>

      <form
        id="article-form"
        action={formAction}
        onSubmit={() => setIsPending(true)}
        className="flex-1 max-w-3xl mx-auto w-full px-4 md:px-8 pt-8 md:pt-12 pb-6 flex flex-col gap-6"
      >

        {isEdit && <input type="hidden" name="id" value={article.id} />}

        {state?.error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">{state.error}</p>
        )}

        {/* Métadonnées */}
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          <select
            name="category"
            defaultValue={article?.categoryId ?? ''}
            className="w-full sm:w-40 h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm cursor-pointer outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
          >
            <option value="">Catégorie</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>

          <select
            name="status"
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="w-full sm:w-36 h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm cursor-pointer outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
          >
            <option value="brouillon">Brouillon</option>
            <option value="publie">Publier</option>
            <option value="planifie">Planifier</option>
          </select>

          {status === 'planifie' && (
            <input
              type="datetime-local"
              name="publishedAt"
              defaultValue={article?.publishedAt ?? ''}
              className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors w-full sm:w-52"
            />
          )}
        </div>

        {/* Bannière — label toujours dans le DOM, masqué en CSS quand preview */}
        <div className="flex flex-col gap-2">
          {bannerPreview && (
            <div className="relative w-full h-52 rounded-xl overflow-hidden border border-slate-200">
              <img src={bannerPreview} alt="Bannière" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setBannerPreview(null)}
                className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2.5 py-1 rounded-md cursor-pointer border-none hover:bg-black/70 transition-colors"
              >
                Retirer
              </button>
            </div>
          )}
          <label className={`relative w-full h-36 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group ${bannerPreview ? 'hidden' : ''}`}>
            <ImagePlus size={20} className="text-slate-300 group-hover:text-slate-400 transition-colors" />
            <span className="text-sm text-slate-400 group-hover:text-slate-500 font-medium transition-colors">Ajouter une image de couverture</span>
            <span className="text-xs text-slate-300">JPEG, PNG, WEBP</span>
            <input
              type="file"
              name="banner"
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={e => {
                const file = e.target.files?.[0]
                if (file) setBannerPreview(URL.createObjectURL(file))
              }}
            />
          </label>
        </div>

        {/* Titre */}
        <div className="flex flex-col gap-1">
          <input
            type="text"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Saisissez le titre"
            required
            minLength={20}
            maxLength={100}
            className="w-full text-2xl md:text-4xl font-bold text-slate-900 placeholder:text-slate-300 bg-transparent border-none outline-none leading-tight"
          />
          <input type="hidden" name="slug" value={toSlug(title)} />
          {title && (
            <p className="text-xs text-slate-400">Slug : <span className="font-mono">{toSlug(title)}</span></p>
          )}
        </div>

        <div className="h-px bg-slate-100" />

        {/* Contenu */}
        <input type="hidden" name="content" value={content} />
        <RichEditor value={content} onChange={setContent} placeholder="Saisissez votre contenu ici..." />

        {/* Stats */}
        <div className="flex gap-4 text-xs text-slate-400">
          <span>{wordCount} mots</span>
          <span>~{Math.max(1, Math.round(wordCount / 200))} min de lecture</span>
        </div>

        {/* Extrait */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-700">Extrait</label>
          <textarea
            name="excerpt"
            defaultValue={article?.excerpt ?? ''}
            rows={2}
            placeholder="Résumé court (affiché dans les listes d'articles)..."
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors resize-none"
          />
        </div>

        {/* SEO accordion */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setSeoOpen(o => !o)}
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer border-none text-left"
          >
            <span className="text-sm font-medium text-slate-700">SEO & Métadonnées</span>
            {seoOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
          </button>

          {seoOpen && (
            <div className="px-4 py-4 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Meta titre</label>
                <input
                  name="metaTitle"
                  value={metaTitle}
                  onChange={e => setMetaTitle(e.target.value)}
                  placeholder="Titre SEO..."
                  maxLength={60}
                  className="h-9 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors"
                />
                <p className="text-xs text-slate-400">{metaTitle.length}/60</p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Meta description</label>
                <textarea
                  name="metaDescription"
                  value={metaDesc}
                  onChange={e => setMetaDesc(e.target.value)}
                  rows={2}
                  placeholder="Description SEO..."
                  maxLength={160}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-colors resize-none"
                />
                <p className="text-xs text-slate-400">{metaDesc.length}/160</p>
              </div>
            </div>
          )}
        </div>

      </form>
    </div>
  )
}
