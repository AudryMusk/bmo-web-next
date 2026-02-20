import { Clock, Calendar, ChevronRight, Share2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'

const socialButtons = [
  { label: 'LinkedIn', bg: 'bg-[#0077B5]', icon: <span className="text-[11px] font-bold">in</span> },
  { label: 'X',        bg: 'bg-black',      icon: <span className="text-[11px] font-bold">X</span> },
  { label: 'Facebook', bg: 'bg-[#1877F2]',  icon: <span className="text-[11px] font-bold">f</span> },
  { label: 'Pinterest',bg: 'bg-[#E60023]',  icon: <span className="text-[11px] font-bold">P</span> },
  { label: 'WhatsApp', bg: 'bg-[#25D366]',  icon: <span className="text-[11px] font-bold">W</span> },
]

export default function PublicView({ articles }) {
  let navigate = useNavigate()
  const { articleSlug } = useParams()
  const article = articles.find(a => a.slug === articleSlug)
  const similarArticles = articles.filter((a) => a.slug !== article.slug)
  
  console.log(articleSlug)
  return (
    // -m-8 annule le padding du <main className="p-8"> de AppLayout
    <div className="-m-8 bg-white min-h-screen">

      {/* ── Hero image ─────────────────────────────────────────────── */}
      <div className="relative h-72 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 px-8 pb-8">
          <div className="max-w-5xl mx-auto">
            <nav className="flex items-center gap-1.5 text-white/60 text-xs mb-3">
              <span>Blog</span>
              <ChevronRight size={12} />
              <span>{article.category}</span>
              <ChevronRight size={12} />
              <span className="text-white/90">{article.blog}</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-white leading-tight max-w-3xl">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Zone de contenu ────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-8 py-10">
        <div className="flex gap-10">

          {/* ── Boutons de partage (colonne gauche) ─────────────────── */}
          <aside className="hidden lg:flex flex-col items-center gap-2.5 pt-1 shrink-0">
            {socialButtons.map(({ label, bg, icon }) => (
              <button
                key={label}
                title={`Partager sur ${label}`}
                className={`w-9 h-9 rounded-full ${bg} text-white flex items-center justify-center
                  hover:opacity-80 transition-opacity cursor-pointer border-none shrink-0`}
              >
                {icon}
              </button>
            ))}
            <div className="w-px h-5 bg-slate-200 my-1" />
            <button
              title="Copier le lien"
              className="w-9 h-9 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center
                hover:bg-slate-200 transition-colors cursor-pointer border-none"
            >
              <Share2 size={14} />
            </button>
          </aside>

          {/* ── Contenu principal ────────────────────────────────────── */}
          <main className="flex-1 min-w-0">

            {/* Meta : auteur, date, temps de lecture */}
            <div className="flex items-center gap-3 mb-7 pb-7 border-b border-slate-300">
              <img
                src={article.authorAvatar}
                alt={article.author}
                className="w-11 h-11 rounded-full object-cover shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-slate-800">{article.author}</p>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} /> {article.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {article.readTime} min de lecture
                  </span>
                </div>
              </div>
            </div>

            {/* Corps de l'article */}
            <article className="text-slate-600 text-[15px] leading-relaxed space-y-4">

              {/* Excerpt (intro mise en avant) */}
              <p className="text-lg text-slate-700 font-medium leading-relaxed border-l-4 border-primary pl-4">
                {article.excerpt}
              </p>

              {/* Contenu HTML (TipTap) ou blocs legacy (mock) */}
              {typeof article.content === 'string' ? (
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              ) : (
                article.content.map((block, index) => {
                  if (block.type === 'heading') {
                    return (
                      <h2 key={index} className="text-xl font-bold text-slate-900 mt-10! mb-2">
                        {block.text}
                      </h2>
                    )
                  }
                  return (
                    <p key={index} className="text-slate-600 leading-relaxed">
                      {block.text}
                    </p>
                  )
                })
              )}

            </article>
          </main>

          {/* ── Sidebar droite — CTAs BestCash ──────────────────────── */}
          <aside className="hidden lg:flex flex-col gap-5 w-52 shrink-0 pt-1">

            {/* CTA principal — Carte BestCash */}
            <div className="rounded-2xl overflow-hidden border border-amber-200">
              <div className="bg-linear-to-br from-amber-500 to-orange-600 p-5 text-white">
                <p className="text-xs font-bold uppercase tracking-wider mb-1 text-white/80">
                  Carte prépayée VISA
                </p>
                <p className="text-xl font-extrabold leading-tight mb-1">
                  Fiables. Pratiques. Sécurisées.
                </p>
                <p className="text-xs text-white/80 mt-2">
                  Sans compte bancaire. Acceptée partout dans le monde.
                </p>
              </div>
              <div className="bg-white p-4">
                <button className="w-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors cursor-pointer border-none mb-2">
                  Obtenir ma carte
                </button>
                <button className="w-full bg-transparent border border-amber-300 text-amber-600 text-sm font-medium py-2 rounded-xl hover:bg-amber-50 transition-colors cursor-pointer">
                  Voir la présentation
                </button>
              </div>
            </div>

            {/* Newsletter BestCash */}
            <div className="bg-slate-900 rounded-2xl p-5 text-white">
              <p className="text-sm font-bold mb-1">Newsletter BestCash</p>
              <p className="text-[11px] text-slate-400 mb-4">
                Conseils finances, actus produits et offres exclusives — chaque semaine.
              </p>
              <div className="flex rounded-lg overflow-hidden">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 bg-white text-slate-900 text-xs px-3 py-2 outline-none min-w-0"
                />
                <button className="bg-amber-500 px-3 py-2 text-white text-sm font-bold hover:bg-amber-600 transition-colors cursor-pointer border-none shrink-0">
                  →
                </button>
              </div>
            </div>

            {/* CTA secondaire — App mobile */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
              <p className="text-xs font-bold text-slate-800 mb-1">Gérez votre carte depuis l'app</p>
              <p className="text-[11px] text-slate-500 mb-3">
                Suivez vos dépenses, rechargez et bloquez votre carte en un tap.
              </p>
              <button className="w-full bg-slate-900 text-white text-xs font-semibold py-2 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer border-none">
                GÉRER MA CARTE
              </button>
            </div>

          </aside>
        </div>

        {/* ── Articles similaires ────────────────────────────────────── */}
        <section className="mt-16 pt-8 border-t border-slate-300">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Articles similaires</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {similarArticles.map((a) => (
              <div
                key={a.id}
                className="group rounded-2xl overflow-hidden border border-slate-100
                  hover:border-primary/30 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={a.image}
                    alt={a.title}
                    onClick={() => navigate(`/articles/${a.slug}`)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 text-slate-700 text-[10px] font-bold uppercase px-2 py-1 rounded-md">
                    {a.category}
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                    {a.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Clock size={10} />
                    <span>{a.readTime} min</span>
                    <span>·</span>
                    <span>{a.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
