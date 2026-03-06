import { FileText, CheckCircle, FolderOpen, Globe, TrendingUp, Pencil, Trash2, ArrowUpRight, Code2, Palette, Package, BarChart2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { stats, categories } from '../data/mock'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table'
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import useAuthStore from '@/auth/AuthStore'

const chartData = [
  { month: 'Sep', articles: 4 },
  { month: 'Oct', articles: 7 },
  { month: 'Nov', articles: 5 },
  { month: 'Déc', articles: 9 },
  { month: 'Jan', articles: 6 },
  { month: 'Fév', articles: 12 },
]

const chartConfig = {
  articles: { label: 'Articles', color: 'var(--primary)' },
}

const statCards = [
  {
    label: 'Total Articles',
    value: stats.totalArticles,
    icon: FileText,
    trend: '+12%',
    up: true,
    sub: 'vs mois dernier',
  },
  {
    label: 'Publiés aujourd\'hui',
    value: stats.publishedToday,
    icon: CheckCircle,
    trend: '+2',
    up: true,
    sub: 'ce mois-ci',
  },
  {
    label: 'Catégories',
    value: stats.categories,
    icon: FolderOpen,
    trend: 'stable',
    up: null,
    sub: 'actives',
  },
  {
    label: 'Blogs actifs',
    value: stats.activeBlogs,
    icon: Globe,
    trend: '+1',
    up: true,
    sub: 'nouveaux ce trimestre',
  },
]

const statusConfig = {
  publié: { dot: 'bg-emerald-500', label: 'Publié', text: 'text-emerald-600' },
  brouillon: { dot: 'bg-slate-400', label: 'Brouillon', text: 'text-slate-500' },
  planifié: { dot: 'bg-amber-500', label: 'Planifié', text: 'text-amber-600' },
}

const categoryColors = {
  Ingénierie: 'bg-blue-50 text-blue-700',
  Design: 'bg-purple-50 text-purple-700',
  Produit: 'bg-amber-50 text-amber-700',
  Marketing: 'bg-green-50 text-green-700',
}

const categoryIcons = {
  Ingénierie: Code2,
  Design: Palette,
  Produit: Package,
  Marketing: BarChart2,
}

export default function Dashboard({ articles }) {
  const navigate = useNavigate()
  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
  const todayCapitalized = today.charAt(0).toUpperCase() + today.slice(1)
  const recentArticles = articles.slice(0, 4)
  return (
    <div className="flex flex-col gap-6">

      {/* Hero banner */}
      <div
        className="rounded-2xl p-8 flex items-center justify-between overflow-hidden"
        style={{
          background: '#0F172B',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        <div>
          <h2 className="text-[28px] font-bold text-white mb-1">Bonjour, Audry</h2>
          <p className="text-white/60 text-sm">Nous sommes le {todayCapitalized}.</p>
        </div>
        <button
          onClick={() => navigate('/edit')}
          className="bg-white text-slate-900 font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-slate-100 transition-all cursor-pointer border-none flex items-center gap-2"
        >
          Nouvel article <ArrowUpRight size={15} />
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <Card
            key={s.label}
            className="bg-gradient-to-t from-primary/5 to-card shadow-xs"
          >
            <CardHeader className="pb-2">
              <CardDescription className="text-xs font-medium uppercase tracking-wide">
                {s.label}
              </CardDescription>
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl font-extrabold tabular-nums">
                  {s.value}
                </CardTitle>
                <Badge
                  variant="outline"
                  className={s.up === true ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : 'text-slate-500'}
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

        {/* Area chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Publications</CardTitle>
            <CardDescription>Articles publiés ces 6 derniers mois</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[200px] w-full">
              <AreaChart data={chartData} margin={{ left: 0, right: 0 }}>
                <defs>
                  <linearGradient id="fillArticles" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="articles"
                  type="natural"
                  fill="url(#fillArticles)"
                  stroke="var(--primary)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex items-center gap-2 text-sm">
            <TrendingUp size={14} className="text-emerald-500" />
            <span className="font-medium text-emerald-600">+100% ce mois</span>
            <span className="text-muted-foreground">vs mois précédent</span>
          </CardFooter>
        </Card>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Catégories</CardTitle>
            <CardDescription>Répartition par thème</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {categories.map((cat) => {
              const total = categories.reduce((sum, c) => sum + c.articlesCount, 0)
              const pct = Math.round((cat.articlesCount / total) * 100)
              return (
                <div key={cat.id} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium text-slate-700">
                      {(() => { const Icon = categoryIcons[cat.name]; return Icon ? <Icon size={14} /> : null })()}
                      {cat.name}
                    </span>
                    <span className="text-xs text-muted-foreground">{cat.articlesCount} articles</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-100">
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{ width: `${pct}%`, backgroundColor: cat.color }}
                    />
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
          <button
            onClick={() => navigate('/articles')}
            className="text-xs font-semibold text-primary hover:underline bg-transparent border-none cursor-pointer"
          >
            TOUT VOIR →
          </button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 pl-6">Titre</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Catégorie</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Statut</TableHead>
                <TableHead className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentArticles.map((article) => {
                const status = statusConfig[article.status] ?? statusConfig['brouillon']
                const catClass = categoryColors[article.category] ?? 'bg-blue-50 text-blue-700'
                return (
                  <TableRow key={article.id} className="group border-slate-100 hover:bg-slate-50/80">
                    <TableCell className="pl-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 rounded-lg">
                          <AvatarImage src={article.image} alt={article.title} className="object-cover" />
                          <AvatarFallback className="rounded-lg text-xs bg-slate-100">
                            {article.title.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 max-w-60 truncate">{article.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{article.author}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`text-[11px] font-bold uppercase px-2.5 py-1 rounded-md ${catClass}`}>
                        {article.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                        <span className={`text-sm font-medium ${status.text}`}>{status.label}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-slate-400">{article.date}</TableCell>
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
