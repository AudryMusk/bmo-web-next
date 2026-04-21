import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, ExternalLink, ChevronRight, MessageCircle, Users, Briefcase, Network } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ArticleContent from '@/components/ArticleContent'
import ShareSidebar from '@/components/ShareSidebar'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/db'
import { Button } from '@/components/ui/button'

export const revalidate = 60

export async function generateStaticParams() {
  const { prisma } = await import('@/lib/prisma')
  const articles = await prisma.article.findMany({
    where: { status: 'publie' },
    select: { slug: true },
  })
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getBlogPostBySlug(slug)
  if (!article) return { title: 'Article introuvable — B-MO' }
  return {
    title: `${article.title} — B-MO Blog`,
    description: article.excerpt,
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [article, allPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPosts('publie'),
  ])

  if (!article) notFound()

  const relatedPosts = allPosts.filter(p => p.slug !== slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── Article Header (full-width, no hero) ── */}
      <div className="pt-24 pb-8 border-b border-border bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-muted-foreground text-sm mb-5">
            <Link href="/blog" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              Blog
            </Link>
            <ChevronRight size={12} />
            {article.category && (
              <span className="text-foreground/70">{article.category}</span>
            )}
          </nav>

          {/* Category badge */}
          {article.category && (
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-4">
              {article.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight max-w-4xl mb-6">
            {article.title}
          </h1>

          {/* Meta bar */}
          <div className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
            {article.author && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold shadow-sm">
                  {article.author.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium text-foreground">{article.author}</span>
              </div>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* ── 3-column layout ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-10 md:py-14">
        <div className="flex gap-8 xl:gap-12">

          {/* LEFT — Social share (desktop only, sticky) */}
          <div className="hidden lg:block shrink-0 w-12 sticky top-24 self-start">
            <ShareSidebar title={article.title} />
          </div>

          {/* CENTER — Article content */}
          <div className="flex-1 min-w-0">

            {/* Featured image */}
            {article.image && (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8 shadow-md">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Excerpt */}
            {article.excerpt && (
              <p className="text-base md:text-lg text-foreground font-medium leading-relaxed border-l-4 border-primary pl-4 mb-8 bg-primary/5 py-3 pr-4 rounded-r-xl">
                {article.excerpt}
              </p>
            )}

            {/* Article body */}
            <ArticleContent
              html={article.content}
              className="prose prose-slate max-w-none text-muted-foreground leading-relaxed
                prose-headings:text-foreground prose-headings:font-bold
                prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
                prose-p:mb-4 prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5
                prose-li:mb-1 prose-img:rounded-xl"
            />

            {/* Mobile share bar */}
            <div className="lg:hidden mt-10 pt-6 border-t border-border">
              <ShareSidebar title={article.title} horizontal />
            </div>

            {/* Bottom CTA (inline, mobile + desktop) */}
            <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/15 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="font-bold text-foreground mb-1">Découvrez B-MO</p>
                <p className="text-sm text-muted-foreground">
                  Paiement digital simple, rapide et sécurisé au Bénin ·{" "}
                  <Link href="tel:*890%23" className="text-primary hover:underline">
                    *890#
                  </Link>
                </p>
              </div>
              <a
                href="https://www.bmo.bj"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-colors no-underline"
              >
                Visiter bmo.bj
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* RIGHT — B-MO CTA sidebar (desktop only, sticky) */}
          <div className="hidden lg:flex flex-col gap-5 shrink-0 w-64 xl:w-72 sticky top-24 self-start">

            {/* Main CTA */}
            <div className="gradient-primary text-primary-foreground rounded-2xl p-6 text-center shadow-md">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-extrabold">B</span>
              </div>
              <h3 className="text-lg font-bold mb-2 leading-snug">Besoin d'un accompagnement ?</h3>
              <p className="text-primary-foreground/80 text-sm mb-5 leading-relaxed">
                Nos experts B-MO vous guident dans vos démarches financières et digitales.
              </p>
              <Link
                href="/contact"
                className="block bg-white text-primary font-semibold px-4 py-2.5 rounded-xl hover:bg-white/90 transition-colors text-sm"
              >
                Prendre rendez-vous →
              </Link>
            </div>

            {/* Services links */}
            <div className="border border-border rounded-2xl p-5 bg-card">
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Nos services</h3>
              <div className="space-y-3">
                <Link
                  href="/services/particuliers"
                  className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  <span>Pour les particuliers</span>
                </Link>
                <Link
                  href="/services/business"
                  className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                    <Briefcase className="w-4 h-4 text-primary" />
                  </div>
                  <span>Pour les entreprises</span>
                </Link>
                <Link
                  href="/reseau"
                  className="flex items-center gap-3 text-sm text-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                    <Network className="w-4 h-4 text-primary" />
                  </div>
                  <span>Notre réseau</span>
                </Link>
              </div>
            </div>

            {/* Quick contact */}
            <div className="bg-muted rounded-2xl p-5">
              <h3 className="font-bold text-foreground mb-1 text-sm">Une question ?</h3>
              <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                Contactez-nous directement, nous vous répondons rapidement.
              </p>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground text-sm font-medium py-2.5 rounded-xl hover:bg-primary/90 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Nous contacter
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── Related articles (UNCHANGED) ── */}
      {relatedPosts.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl mt-4 pb-16 pt-10 border-t border-border">
          <h3 className="text-xl font-bold text-foreground mb-6">Articles similaires</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {relatedPosts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-36 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                    {post.image ? (
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow group-hover:scale-110 transition-transform duration-300">
                          <span className="text-primary-foreground font-bold text-xl">B</span>
                        </div>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-accent/90 text-accent-foreground text-xs font-medium rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                    <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 flex-1">{post.excerpt}</p>
                    <div className="flex items-center gap-1 text-primary text-xs font-medium mt-3 group-hover:gap-2 transition-all">
                      Lire <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link href="/blog">
                Voir tous les articles
                <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
              </Link>
            </Button>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
