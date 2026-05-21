"use client"

import { 
  Clock3,
  TrendingUp,
  Users,
  DatabaseZap,
  Rocket,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

const executiveMetrics = [
  { 
    title: 'AI节省工时', 
    value: '4,231h', 
    trend: '+28.4%', 
    isUp: true,
    icon: Clock3, 
    color: 'blue',
    bgGradient: 'from-blue-500/10 to-blue-600/5'
  },
  { 
    title: '客服转化率', 
    value: '+18.2%', 
    trend: '+6.1%', 
    isUp: true,
    icon: TrendingUp, 
    color: 'green',
    bgGradient: 'from-emerald-500/10 to-emerald-600/5'
  },
  { 
    title: '人工转接率', 
    value: '6.2%', 
    trend: '-1.8%', 
    isUp: false,
    icon: Users, 
    color: 'orange',
    bgGradient: 'from-orange-500/10 to-orange-600/5'
  },
  { 
    title: '知识命中率', 
    value: '92.7%', 
    trend: '+4.1%', 
    isUp: true,
    icon: DatabaseZap, 
    color: 'purple',
    bgGradient: 'from-violet-500/10 to-violet-600/5'
  },
  { 
    title: '员工效率提升', 
    value: '+37%', 
    trend: '+12%', 
    isUp: true,
    icon: Rocket, 
    color: 'cyan',
    bgGradient: 'from-cyan-500/10 to-cyan-600/5'
  },
]

const colorClasses: Record<string, { text: string; bg: string; border: string; glow: string }> = {
  blue: { 
    text: 'text-blue-400', 
    bg: 'bg-blue-500/10', 
    border: 'border-blue-500/20',
    glow: 'shadow-[0_0_20px_rgba(59,130,246,0.15)]'
  },
  green: { 
    text: 'text-emerald-400', 
    bg: 'bg-emerald-500/10', 
    border: 'border-emerald-500/20',
    glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]'
  },
  orange: { 
    text: 'text-orange-400', 
    bg: 'bg-orange-500/10', 
    border: 'border-orange-500/20',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]'
  },
  purple: { 
    text: 'text-violet-400', 
    bg: 'bg-violet-500/10', 
    border: 'border-violet-500/20',
    glow: 'shadow-[0_0_20px_rgba(139,92,246,0.15)]'
  },
  cyan: { 
    text: 'text-cyan-400', 
    bg: 'bg-cyan-500/10', 
    border: 'border-cyan-500/20',
    glow: 'shadow-[0_0_20px_rgba(6,182,212,0.15)]'
  },
}

export function ExecutiveMetrics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {executiveMetrics.map((metric) => {
        const Icon = metric.icon
        const colors = colorClasses[metric.color]
        return (
          <div 
            key={metric.title}
            className={cn(
              "relative overflow-hidden rounded-2xl p-5",
              "bg-card border border-border/50",
              "backdrop-blur-sm transition-all duration-300",
              "hover:border-border hover:scale-[1.02]",
              colors.glow
            )}
          >
            {/* Background Gradient */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-50",
              metric.bgGradient
            )} />
            
            {/* Content */}
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  colors.bg, colors.border, "border"
                )}>
                  <Icon className={cn("h-5 w-5", colors.text)} />
                </div>
                <div className={cn(
                  "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium",
                  metric.isUp ? "bg-emerald-500/10 text-emerald-400" : "bg-orange-500/10 text-orange-400"
                )}>
                  {metric.isUp ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {metric.trend}
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <p className={cn("text-2xl font-bold", colors.text)}>{metric.value}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
