"use client"

import { Sparkles, DatabaseZap, Bot, Users, TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const stats = [
  {
    title: '今日AI调用',
    value: '1,284,993',
    trend: '+18.4%',
    trendUp: true,
    icon: Sparkles,
    color: 'primary',
    glowClass: 'glow-blue'
  },
  {
    title: 'RAG命中率',
    value: '92.7%',
    trend: '+4.1%',
    trendUp: true,
    icon: DatabaseZap,
    color: 'secondary',
    glowClass: 'glow-green'
  },
  {
    title: 'Agent在线数',
    value: '128',
    trend: '+9',
    trendUp: true,
    icon: Bot,
    color: 'accent',
    glowClass: 'glow-purple'
  },
  {
    title: '人工转接率',
    value: '6.2%',
    trend: '-1.8%',
    trendUp: false,
    icon: Users,
    color: 'warning',
    glowClass: 'glow-orange'
  },
]

const colorMap = {
  primary: {
    bg: 'bg-primary/10',
    text: 'text-primary',
    border: 'border-primary/20'
  },
  secondary: {
    bg: 'bg-secondary/10',
    text: 'text-secondary',
    border: 'border-secondary/20'
  },
  accent: {
    bg: 'bg-accent/10',
    text: 'text-accent',
    border: 'border-accent/20'
  },
  warning: {
    bg: 'bg-warning/10',
    text: 'text-warning',
    border: 'border-warning/20'
  }
}

export function HeroStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        const colors = colorMap[stat.color as keyof typeof colorMap]
        
        return (
          <div
            key={stat.title}
            className={cn(
              "glass-card glass-card-hover rounded-2xl p-5 transition-all duration-300",
              "border border-border/50 hover:border-primary/30"
            )}
          >
            <div className="flex items-start justify-between">
              <div className={cn(
                "flex h-12 w-12 items-center justify-center rounded-xl",
                colors.bg,
                colors.border,
                "border",
                stat.glowClass
              )}>
                <Icon className={cn("h-6 w-6", colors.text)} />
              </div>
              <div className={cn(
                "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
                stat.trendUp ? "bg-secondary/10 text-secondary" : "bg-destructive/10 text-destructive"
              )}>
                {stat.trendUp ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {stat.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
