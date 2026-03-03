'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import { TrendingUp } from 'lucide-react'
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,
} from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

const chartData = [
  { month: 'Sep', articles: 4 },
  { month: 'Oct', articles: 7 },
  { month: 'Nov', articles: 5 },
  { month: 'Déc', articles: 9 },
  { month: 'Jan', articles: 6 },
  { month: 'Fév', articles: 12 },
]

const chartConfig = {
  articles: { label: 'Articles', color: '#D91F2B' },
}

export default function DashboardChart() {
  return (
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
                <stop offset="5%" stopColor="#D91F2B" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#D91F2B" stopOpacity={0} />
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area
              dataKey="articles"
              type="natural"
              fill="url(#fillArticles)"
              stroke="#D91F2B"
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
  )
}
