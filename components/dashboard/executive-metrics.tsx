"use client"

import {
  MessageCircle,
  Bot,
  TrendingUp,
  Users,
  DatabaseZap,
  Target,
  BrainCircuit
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { cn } from '@/lib/utils'

type ChatLog = {
  timestamp?: string
  question?: string
  matched_knowledge_ids?: string[]
  confidence?: number
  need_human?: boolean
  lead_score?: number
}

type Metric = {
  title: string
  value: string
  helper: string
  icon: typeof MessageCircle
  color: string
  bgGradient: string
}

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
  const [logs, setLogs] = useState<ChatLog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let ignore = false

    async function loadLogs() {
      try {
        const res = await fetch('/api/logs', { cache: 'no-store' })
        const data = await res.json()

        if (!ignore && res.ok) {
          setLogs(Array.isArray(data?.logs) ? data.logs : [])
        }
      } catch {
        if (!ignore) setLogs([])
      } finally {
        if (!ignore) setLoading(false)
      }
    }

    loadLogs()

    return () => {
      ignore = true
    }
  }, [])

  const executiveMetrics = useMemo<Metric[]>(() => {
    const chatLogs = logs.filter((log) => typeof log.question === 'string' && log.question.trim())
    const todayLogs = chatLogs.filter((log) => isToday(log.timestamp))
    const consultationCount = todayLogs.length
    const autoHandledCount = todayLogs.filter((log) => !log.need_human).length
    const humanHandoffCount = todayLogs.filter((log) => log.need_human).length
    const highIntentCount = todayLogs.filter((log) => (log.lead_score ?? 0) >= 75).length
    const confidenceLogs = todayLogs.filter((log) => typeof log.confidence === 'number')
    const avgConfidence = confidenceLogs.length
      ? confidenceLogs.reduce((sum, log) => sum + (log.confidence ?? 0), 0) / confidenceLogs.length
      : 0
    const knowledgeHitCount = todayLogs.filter((log) => (log.matched_knowledge_ids?.length ?? 0) > 0).length

    return [
      {
        title: '今日咨询数',
        value: String(consultationCount),
        helper: '来自 /api/chat 调用日志',
        icon: MessageCircle,
        color: 'blue',
        bgGradient: 'from-blue-500/10 to-blue-600/5',
      },
      {
        title: 'AI自动处理数',
        value: String(autoHandledCount),
        helper: '未触发人工介入',
        icon: Bot,
        color: 'green',
        bgGradient: 'from-emerald-500/10 to-emerald-600/5',
      },
      {
        title: '人工转接率',
        value: formatPercent(consultationCount ? humanHandoffCount / consultationCount : 0),
        helper: `${humanHandoffCount}/${consultationCount} 转人工`,
        icon: Users,
        color: 'orange',
        bgGradient: 'from-orange-500/10 to-orange-600/5',
      },
      {
        title: '高意向线索数',
        value: String(highIntentCount),
        helper: 'lead_score >= 75',
        icon: Target,
        color: 'cyan',
        bgGradient: 'from-cyan-500/10 to-cyan-600/5',
      },
      {
        title: '平均置信度',
        value: formatPercent(avgConfidence),
        helper: `${confidenceLogs.length} 条有效置信度`,
        icon: BrainCircuit,
        color: 'purple',
        bgGradient: 'from-violet-500/10 to-violet-600/5',
      },
      {
        title: '知识命中率',
        value: formatPercent(consultationCount ? knowledgeHitCount / consultationCount : 0),
        helper: `${knowledgeHitCount}/${consultationCount} 命中知识`,
        icon: DatabaseZap,
        color: 'purple',
        bgGradient: 'from-violet-500/10 to-violet-600/5',
      },
    ]
  }, [logs])

  const hasChatLogs = logs.some((log) => typeof log.question === 'string' && log.question.trim())

  if (!loading && !hasChatLogs) {
    return (
      <div className="rounded-2xl p-6 bg-card border border-border/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/30 border border-border/50">
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">暂无经营指标</p>
            <p className="text-xs text-muted-foreground mt-1">还没有 /api/chat 调用日志，完成一次咨询后将自动生成指标。</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-50",
              metric.bgGradient
            )} />

            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl",
                  colors.bg, colors.border, "border"
                )}>
                  <Icon className={cn("h-5 w-5", colors.text)} />
                </div>
                <div className="px-2 py-1 rounded-lg text-xs font-medium bg-muted/30 text-muted-foreground">
                  今日
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <p className={cn("text-2xl font-bold", colors.text)}>{metric.value}</p>
                <p className="text-xs text-muted-foreground truncate">{metric.helper}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function isToday(value?: string): boolean {
  if (!value) return false
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return false

  const now = new Date()
  return date.getFullYear() === now.getFullYear()
    && date.getMonth() === now.getMonth()
    && date.getDate() === now.getDate()
}

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}
