"use client"

import {
  ScrollText,
  Filter,
  Download,
  Search,
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
  RefreshCw
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useMemo, useState } from 'react'

const logLevels = ['全部', 'INFO', 'WARN', 'ERROR']
const modules = ['全部', 'Chat', 'Intent', 'Knowledge', 'Risk', 'System']

type RawLog = {
  id?: string
  timestamp?: string
  question?: string
  intent?: string
  matched_knowledge_ids?: string[]
  confidence?: number
  risk_level?: 'low' | 'medium' | 'high'
  need_human?: boolean
  lead_score?: number
  response_time_ms?: number
  session_id?: string
  stage?: string
  status?: string
  latency_ms?: number
  detail?: string
}

type ViewLog = {
  id: string
  time: string
  level: 'INFO' | 'WARN' | 'ERROR'
  module: string
  message: string
  meta: string
}

const levelConfig: Record<string, { icon: typeof Info; color: string; bg: string }> = {
  INFO: { icon: Info, color: 'text-blue-400', bg: 'bg-blue-500/10' },
  WARN: { icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/10' },
  ERROR: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
  DEBUG: { icon: CheckCircle2, color: 'text-muted-foreground', bg: 'bg-muted/30' },
}

export function LogsPage() {
  const [selectedLevel, setSelectedLevel] = useState('全部')
  const [selectedModule, setSelectedModule] = useState('全部')
  const [searchQuery, setSearchQuery] = useState('')
  const [logs, setLogs] = useState<RawLog[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadLogs = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/logs', { cache: 'no-store' })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.error || '读取日志失败')
      }

      setLogs(Array.isArray(data?.logs) ? data.logs : [])
    } catch {
      setError('读取日志失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLogs()
  }, [])

  const viewLogs = useMemo<ViewLog[]>(() => logs.map((log, index) => {
    const riskLevel = log.risk_level || 'low'
    const level: ViewLog['level'] = log.status === 'error'
      ? 'ERROR'
      : riskLevel === 'high' || log.status === 'warning'
        ? 'WARN'
        : 'INFO'
    const moduleName = log.intent ? 'Chat' : stageModule(log.stage)
    const matchedIds = log.matched_knowledge_ids?.length ? log.matched_knowledge_ids.join(', ') : '-'
    const message = log.question
      ? `用户问题：${log.question}`
      : log.detail || '系统日志记录'
    const meta = log.question
      ? `意图 ${log.intent || '-'} / 知识 ${matchedIds} / 置信度 ${log.confidence ?? 0} / 风险 ${riskLevel} / 转人工 ${log.need_human ? '是' : '否'} / 线索分 ${log.lead_score ?? 0} / ${log.response_time_ms ?? 0}ms`
      : `${log.session_id || '-'} / ${log.stage || '-'} / ${log.latency_ms ?? 0}ms`

    return {
      id: log.id || `LOG-${index}`,
      time: formatTime(log.timestamp),
      level,
      module: moduleName,
      message,
      meta,
    }
  }).reverse(), [logs])

  const filteredLogs = viewLogs.filter(log => {
    if (selectedLevel !== '全部' && log.level !== selectedLevel) return false
    if (selectedModule !== '全部' && log.module !== selectedModule) return false
    if (searchQuery && !`${log.message} ${log.meta}`.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">日志监控中心</h1>
          <p className="text-sm text-muted-foreground mt-1">实时系统日志与事件追踪</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={loadLogs} disabled={loading} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 border border-border/50 text-sm text-foreground hover:bg-muted disabled:opacity-50 transition-colors">
            <RefreshCw className="h-4 w-4" />
            {loading ? '刷新中' : '刷新'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            <Download className="h-4 w-4" />
            导出日志
          </button>
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-border/50 p-4 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索日志内容..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-muted/30 border border-border/50 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center gap-1">
              {logLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(level)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                    selectedLevel === level
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/30 text-muted-foreground hover:text-foreground"
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="px-3 py-2 rounded-xl bg-muted/30 border border-border/50 text-sm text-foreground outline-none focus:border-primary/50 transition-colors"
          >
            {modules.map((mod) => (
              <option key={mod} value={mod}>{mod}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-2xl bg-card border border-border/50 backdrop-blur-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
              <ScrollText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">实时日志流</h3>
              <p className="text-sm text-muted-foreground">{error || `显示 ${filteredLogs.length} 条记录`}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs text-secondary">实时更新</span>
          </div>
        </div>

        <div className="divide-y divide-border/30 max-h-[600px] overflow-y-auto">
          {filteredLogs.map((log) => {
            const config = levelConfig[log.level]
            const Icon = config.icon
            return (
              <div
                key={log.id}
                className="flex items-start gap-4 p-4 hover:bg-muted/20 transition-colors"
              >
                <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg shrink-0", config.bg)}>
                  <Icon className={cn("h-4 w-4", config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs text-muted-foreground font-mono">{log.time}</span>
                    <span className={cn("px-2 py-0.5 rounded text-xs font-medium", config.bg, config.color)}>
                      {log.level}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs bg-muted/30 text-muted-foreground">
                      {log.module}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{log.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{log.meta}</p>
                </div>
              </div>
            )
          })}
          {!filteredLogs.length && (
            <div className="p-8 text-center text-sm text-muted-foreground">
              暂无日志记录
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function formatTime(value?: string): string {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString('zh-CN', { hour12: false })
}

function stageModule(stage?: string): string {
  if (!stage) return 'System'
  if (stage.includes('intent')) return 'Intent'
  if (stage.includes('knowledge')) return 'Knowledge'
  if (stage.includes('risk')) return 'Risk'
  return 'System'
}
