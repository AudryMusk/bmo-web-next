import {
  Form, FormControl, FormField, FormItem, FormMessage,
} from '@/components/ui/form'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Save, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import RichEditor from '@/components/editor/RichEditor'

const MAX_FILE_SIZE = 1024 * 1024 * 5
const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const formSchema = z.object({
  title: z
    .string()
    .min(20, "Le titre doit faire au moins 20 caractères.")
    .max(100, "Le titre doit faire au plus 100 caractères."),
  content: z.string().min(1, "Le contenu ne peut pas être vide."),
  category: z.string().optional(),
  status: z.enum(['publié', 'brouillon', 'planifié']).default('brouillon'),
  publishedAt: z.string().optional(),
  metaTitle: z.string().max(60, "Le meta title doit faire au plus 60 caractères.").optional(),
  metaDescription: z.string().max(160, "La meta description doit faire au plus 160 caractères.").optional(),
  banner: z
    .any()
    .refine(
      files => !files || files?.[0]?.size <= MAX_FILE_SIZE,
      "Taille max : 5 Mo."
    )
    .refine(
      files => !files || ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Formats acceptés : jpg, png, webp."
    )
    .optional(),
})

function toSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}

export function NewArticle({ addArticle, updateArticle }) {
  const navigate = useNavigate()
  const location = useLocation()
  const editArticle = location.state?.article ?? null
  const isEdit = !!editArticle

  const [seoOpen, setSeoOpen] = useState(false)
  const [bannerPreview, setBannerPreview] = useState(editArticle?.image ?? null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title:           editArticle?.title           ?? '',
      content:         editArticle?.content
        ? (typeof editArticle.content === 'string'
            ? editArticle.content
            : editArticle.content.map(b =>
                b.type === 'heading' ? `<h2>${b.text}</h2>` : `<p>${b.text}</p>`
              ).join(''))
        : '',
      category:        editArticle?.category        ?? '',
      status:          editArticle?.status          ?? 'brouillon',
      publishedAt:     editArticle?.publishedAt     ?? '',
      metaTitle:       editArticle?.metaTitle       ?? '',
      metaDescription: editArticle?.metaDescription ?? '',
    },
  })

  const titleValue   = form.watch('title')
  const contentValue = form.watch('content')
  const statusValue  = form.watch('status')
  const metaTitleValue = form.watch('metaTitle')
  const metaDescValue  = form.watch('metaDescription')
  const plainText = contentValue.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  const wordCount = plainText ? plainText.split(' ').length : 0

  function onSubmit(values) {
    const payload = {
      ...values,
      slug:    toSlug(values.title),
      content: values.content,
      date:    new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
      image:   bannerPreview ?? 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
      author:  'Audry',
      authorAvatar: 'https://i.pravatar.cc/150?img=4',
      readTime: Math.max(1, Math.round(wordCount / 200)),
    }
    if (isEdit) {
      updateArticle(editArticle.id, payload)
    } else {
      addArticle(payload)
    }
    navigate('/articles')
  }

  function onDraft() {
    form.setValue('status', 'brouillon')
    form.handleSubmit(onSubmit)()
  }

  return (
    <div className="-m-8 bg-white min-h-screen flex flex-col">

      {/* ── Header ───────────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-slate-100 shrink-0">
        <button
          type="button"
          onClick={() => navigate('/articles')}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors cursor-pointer bg-transparent border-none"
        >
          <ArrowLeft size={15} />
          Articles
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onDraft}
            className="text-sm text-slate-500 border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer bg-white"
          >
            Brouillon
          </button>
          <button
            type="submit"
            form="article-form"
            className="flex items-center gap-1.5 text-sm font-semibold bg-primary text-white px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity cursor-pointer border-none"
          >
            <Save size={14} />
            {isEdit ? 'Enregistrer' : 'Publier'}
          </button>
        </div>
      </header>

      <Form {...form}>
        <form
          id="article-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 max-w-3xl mx-auto w-full px-8 pt-12 pb-6 flex flex-col gap-6"
        >

          {/* ── Métadonnées (catégorie, statut, date) ─────────────────── */}
          <div className="flex gap-3 flex-wrap">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-40 bg-white border-slate-200 cursor-pointer text-sm">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ingénierie">Ingénierie</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Produit">Produit</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-36 bg-white border-slate-200 cursor-pointer text-sm">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="brouillon">Brouillon</SelectItem>
                      <SelectItem value="publié">Publier</SelectItem>
                      <SelectItem value="planifié">Planifier</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {statusValue === 'planifié' && (
              <FormField
                control={form.control}
                name="publishedAt"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormControl>
                      <Input
                        {...field}
                        type="datetime-local"
                        className="bg-white border-slate-200 text-sm w-52"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            )}
          </div>

          {/* ── Bannière ──────────────────────────────────────────────── */}
          <div className="flex flex-col gap-2">
            {bannerPreview && (
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-200">
                <img src={bannerPreview} alt="Bannière" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setBannerPreview(null)}
                  className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-md cursor-pointer border-none hover:bg-black/70 transition-colors"
                >
                  Retirer
                </button>
              </div>
            )}
            <FormField
              control={form.control}
              name="banner"
              render={({ field: { onChange } }) => (
                <FormItem className="space-y-1">
                  <Label className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                    Image de couverture
                  </Label>
                  <FormControl>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={e => {
                        onChange(e.target.files)
                        const file = e.target.files?.[0]
                        if (file) setBannerPreview(URL.createObjectURL(file))
                      }}
                      className="block w-full text-sm text-slate-500
                        file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-slate-200
                        file:text-xs file:font-medium file:text-slate-600 file:bg-white
                        file:cursor-pointer hover:file:bg-slate-50 cursor-pointer"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* ── Titre ─────────────────────────────────────────────────── */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormControl>
                  <input
                    {...field}
                    type="text"
                    placeholder="Saisissez le titre"
                    className="w-full text-4xl font-bold text-slate-900
                      placeholder:text-slate-300 bg-transparent
                      border-none outline-none leading-tight"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
                {titleValue && (
                  <p className="text-xs text-slate-400">
                    Slug : <span className="font-mono">{toSlug(titleValue)}</span>
                  </p>
                )}
              </FormItem>
            )}
          />

          <div className="h-px bg-slate-100" />

          {/* ── Contenu ───────────────────────────────────────────────── */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1 space-y-1">
                <RichEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Saisissez votre contenu ici..."
                />
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          {/* ── SEO (accordéon) ───────────────────────────────────────── */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setSeoOpen(o => !o)}
              className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 text-sm font-medium text-slate-700 cursor-pointer border-none hover:bg-slate-100 transition-colors"
            >
              <span>SEO & Métadonnées</span>
              {seoOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>

            {seoOpen && (
              <div className="px-4 py-4 flex flex-col gap-4 border-t border-slate-200">

                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <Label htmlFor="meta-title" className="text-xs font-medium text-slate-600">
                        Meta Title
                        <span className={`ml-2 font-mono ${(metaTitleValue?.length ?? 0) > 60 ? 'text-red-500' : 'text-slate-400'}`}>
                          {metaTitleValue?.length ?? 0}/60
                        </span>
                      </Label>
                      <FormControl>
                        <Input {...field} id="meta-title" placeholder="Titre pour les moteurs de recherche" />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metaDescription"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <Label htmlFor="meta-desc" className="text-xs font-medium text-slate-600">
                        Meta Description
                        <span className={`ml-2 font-mono ${(metaDescValue?.length ?? 0) > 160 ? 'text-red-500' : 'text-slate-400'}`}>
                          {metaDescValue?.length ?? 0}/160
                        </span>
                      </Label>
                      <FormControl>
                        <textarea
                          {...field}
                          id="meta-desc"
                          rows={3}
                          placeholder="Description affichée dans les résultats de recherche..."
                          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-primary resize-none"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {/* Aperçu Google */}
                {(metaTitleValue || metaDescValue) && (
                  <div className="bg-white border border-slate-200 rounded-lg p-3">
                    <p className="text-[11px] text-slate-400 mb-2 font-medium uppercase tracking-wide">Aperçu Google</p>
                    <p className="text-blue-700 text-sm font-medium leading-snug">
                      {metaTitleValue || titleValue || 'Titre de l\'article'}
                    </p>
                    <p className="text-green-700 text-xs mt-0.5">blog.bestcash.io › {toSlug(titleValue) || 'slug-article'}</p>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed line-clamp-2">
                      {metaDescValue || 'Aucune description renseignée.'}
                    </p>
                  </div>
                )}

              </div>
            )}
          </div>

        </form>
      </Form>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="flex items-center justify-between px-6 py-2 border-t border-slate-100 text-[11px] text-slate-400 shrink-0">
        <span>{isEdit ? 'Modification' : 'Nouvel article'}</span>
        <div className="flex items-center gap-4">
          <span>{wordCount} mot{wordCount !== 1 ? 's' : ''}</span>
          <span>{titleValue.length}/100 caractères</span>
        </div>
      </footer>

    </div>
  )
}
