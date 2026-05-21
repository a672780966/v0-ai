"use client"

import { Database, FileText, Cpu, Timer, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const ragStats = [
  {
    title: '向量数据库',
    value: '8,293,331',
    icon: Database,
    color: 'primary',
    description: '条向量记录'
  },
  {
    title: 'Embedding数量',
    value: '91M',
    icon: Cpu,
    color: 'secondary',
    description: '维度总计'
  },
  {
    title: '知识文档',
    value: '128,000',
    icon: FileText,
    color: 'accent',
    description: '份文档'
  },
  {
    title: '检索耗时',
    value: '0.42s',
    icon: Timer,
    color: 'warning',
    description: '平均响应'
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

export function RagMonitor() {
  return (
    <div className="glass-card rounded-2xl p-6 border border-border/50">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 border border-secondary/20 glow-green">
            <Database className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">RAG知识中台</h3>
            <p className="text-xs text-muted-foreground">企业知识库状态监控</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
          <TrendingUp className="h-3.5 w-3.5 text-secondary" />
          <span className="text-xs font-medium text-secondary">健康</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {ragStats.map((stat) => {
          const Icon = stat.icon
          const colors = colorMap[stat.color as keyof typeof colorMap]
          
          return (
            <div
              key={stat.title}
              className={cn(
                "rounded-xl p-4 border transition-all duration-300 hover:scale-[1.02]",
                "bg-muted/30",
                colors.border
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg",
                  colors.bg
                )}>
                  <Icon className={cn("h-4 w-4", colors.text)} />
                </div>
                <span className="text-xs text-muted-foreground">{stat.title}</span>
              </div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </div>
          )
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-5 pt-4 border-t border-border/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">知识库容量使用</span>
          <span className="text-xs font-medium text-foreground">72%</span>
        </div>
        <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
            style={{ width: '72%' }}
          />
        </div>
      </div>
    </div>
  )
}
