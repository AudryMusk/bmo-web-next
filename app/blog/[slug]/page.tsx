import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, ExternalLink, ChevronRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/db'
import { Button } from '@/components/ui/button'

export const revalidate = 60

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

      {/* Hero banner */}
      <div className="relative pt-16">
        {article.image ? (
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-8">
              <div className="container mx-auto">
                <nav className="flex items-center gap-1.5 text-white/60 text-xs mb-3">
                  <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                  <ChevronRight size={12} />
                  <span className="text-white/80">{article.category}</span>
                </nav>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight max-w-4xl">
                  {article.title}
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="hero-gradient pt-12 pb-10 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
            </div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <nav className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
                <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                <ChevronRight size={14} />
                <span className="text-foreground/80">{article.category}</span>
              </nav>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight max-w-4xl">
                {article.title}
              </h1>
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-4xl mx-auto">

          {/* Back link */}
          <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2 text-muted-foreground hover:text-foreground">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Retour au blog
            </Link>
          </Button>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-border">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
              {article.category}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </span>
            <span className="text-sm text-muted-foreground">
              Par <span className="font-medium text-foreground">{article.author}</span>
            </span>
          </div>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-base md:text-lg text-foreground font-medium leading-relaxed border-l-4 border-primary pl-4 mb-8">
              {article.excerpt}
            </p>
          )}

          {/* Article body */}
          <div
            className="prose prose-slate max-w-none text-muted-foreground leading-relaxed
              prose-headings:text-foreground prose-headings:font-bold
              prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
              prose-p:mb-4 prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-foreground
              prose-ul:list-disc prose-ul:pl-5 prose-ol:list-decimal prose-ol:pl-5
              prose-li:mb-1"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* CTA */}
          <div className="mt-12 p-6 rounded-2xl bg-primary/5 border border-primary/15 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="font-bold text-foreground mb-1">Découvrez B-MO</p>
              <p className="text-sm text-muted-foreground">Paiement digital simple, rapide et sécurisé au Bénin · *890#</p>
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

        {/* Related articles */}
        {relatedPosts.length > 0 && (
          <section className="max-w-4xl mx-auto mt-14 pt-10 border-t border-border">
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
      </div>

      <Footer />
    </div>
  )
}
