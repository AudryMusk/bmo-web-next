import Link from 'next/link'
import { FileText, CheckCircle, FolderOpen, Globe, TrendingUp, ArrowUpRight, Code2, Palette, Package, BarChart2 } from 'lucide-react'
import { getArticles, getCategories, getStats } from '@/lib/cms-data'
import { getSession } from '@/lib/session'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import DashboardChart from '@/components/admin/DashboardChart'

export const metadata = { title: 'Dashboard — CMS B-MO' }

const statusConfig = {
  publie:    { dot: 'bg-emerald-500', label: 'Publié',    text: 'text-emerald-600' },
  brouillon: { dot: 'bg-slate-400',   label: 'Brouillon', text: 'text-slate-500' },
  planifie:  { dot: 'bg-amber-500',   label: 'Planifié',  text: 'text-amber-600' },
}

const categoryColors = {
  'Ingénierie': 'bg-blue-50 text-blue-700',
  'Design':     'bg-purple-50 text-purple-700',
  'Produit':    'bg-amber-50 text-amber-700',
  'Marketing':  'bg-green-50 text-green-700',
}

const categoryIcons = {
  'Ingénierie': Code2,
  'Design':     Palette,
  'Produit':    Package,
  'Marketing':  BarChart2,
}

export default async function DashboardPage() {
  const [articles, categories, stats, session] = await Promise.all([
    getArticles(),
    getCategories(),
    getStats(),
    getSession(),
  ])

  const recentArticles = articles.slice(0, 4)
  const userName = session?.name ?? 'Admin'

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1)

  const totalArticlesCount = categories.reduce((sum, c) => sum + c.articlesCount, 0)

  const statCards = [
    { label: 'Total Articles',      value: stats.totalArticles,  icon: FileText,    trend: '+12%',   up: true, sub: 'vs mois dernier' },
    { label: "Publiés aujourd'hui", value: stats.publishedToday, icon: CheckCircle, trend: '+2',     up: true, sub: 'ce mois-ci' },
    { label: 'Catégories',          value: stats.categories,     icon: FolderOpen,  trend: 'stable', up: null, sub: 'actives' },
    { label: 'Blogs actifs',        value: stats.activeBlogs,    icon: Globe,       trend: '+1',     up: true, sub: 'nouveaux ce trimestre' },
  ]

  return (
    <div className="flex flex-col gap-6">

      {/* Hero banner */}
      <div className="rounded-xl p-5 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden bg-white border border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold tracking-widest text-primary uppercase bg-tint px-2.5 py-1 rounded-full border border-primary/20">
              CMS B-MO
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Bonjour, {userName} 👋</h2>
          <p className="text-slate-400 text-sm">Nous sommes le {todayCapitalized}.</p>
        </div>
        <Link
          href="/admin/edit"
          className="bg-primary text-white font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-primary-hover transition-colors flex items-center gap-2 self-start sm:self-auto shrink-0"
        >
          Nouvel article <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <Card key={s.label} className="bg-white shadow-xs border border-slate-200 hover:shadow-sm hover:border-primary/20 transition-all">
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-medium uppercase tracking-wide">
                {s.label}
              </CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl font-extrabold tabular-nums">{s.value}</CardTitle>
                <Badge
                  variant="outline"
                  className={s.up === true ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : 'text-stone-500 border-stone-200'}
                >
                  {s.up === true && <TrendingUp size={11} />}
                  {s.trend}
                </Badge>
              </div>
            </CardHeader>
            <CardFooter className="pt-0">
              <p className="text-xs text-muted-foreground">{s.sub}</p>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Chart + Categories */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">

        {/* Area chart — Client Component */}
        <DashboardChart />

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Catégories</CardTitle>
            <CardDescription>Répartition par thème</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {categories.map((cat) => {
              const pct = totalArticlesCount > 0
                ? Math.round((cat.articlesCount / totalArticlesCount) * 100)
                : 0
              const Icon = categoryIcons[cat.name]
              return (
                <div key={cat.id} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium text-slate-700">
                      {Icon && <Icon size={14} />}
                      {cat.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{cat.articlesCount} articles</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100">
                    <div className="h-1.5 rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: cat.color }} />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Recent articles */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-semibold">Articles récents</CardTitle>
          <Link href="/admin/articles" className="text-xs font-medium text-slate-400 hover:text-slate-900 uppercase tracking-wide transition-colors">
            Tout voir →
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-stone-50 hover:bg-stone-50">
                <TableHead className="text-[11px] font-semibold uppercase tracking-wide text-stone-400 pl-6">Titre</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">Catégorie</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">Statut</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wide text-stone-400">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentArticles.map((article) => {
                const statusCfg = statusConfig[article.status] ?? statusConfig.brouillon
                const categoryName = article.category?.name ?? ''
                const catClass = categoryColors[categoryName] ?? 'bg-blue-50 text-blue-700'
                const formattedDate = new Date(article.date).toLocaleDateString('fr-FR', {
                  day: '2-digit', month: 'short', year: 'numeric',
                }).toUpperCase()
                return (
                  <TableRow key={article.id} className="group border-stone-100 hover:bg-stone-50/80">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage src={article.image} alt={article.title} className="object-cover" />
                          <AvatarFallback className="rounded-lg text-xs bg-orange-50 text-orange-600">
                            {article.title.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-stone-900 max-w-60 truncate">{article.title}</p>
                          <p className="text-xs text-stone-400 mt-0.5">{article.author}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`text-[11px] font-bold uppercase px-2.5 py-1 rounded-md ${catClass}`}>
                        {categoryName}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${statusCfg.dot}`} />
                        <span className={`text-sm font-medium ${statusCfg.text}`}>{statusCfg.label}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-stone-400">{formattedDate}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  )
}
