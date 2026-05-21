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
import { useState } from 'react'

const logLevels = ['全部', 'INFO', 'WARN', 'ERROR', 'DEBUG']
const modules = ['全部', 'Agent', 'RAG', 'Runtime', 'Security', 'System']

const logs = [
  { time: '2024-01-15 14:32:45.123', level: 'INFO', module: 'Agent', message: '客服Agent处理用户请求成功', requestId: 'req-abc123' },
  { time: '2024-01-15 14:32:44.892', level: 'INFO', module: 'RAG', message: '知识检索完成，召回5条相关文档', requestId: 'req-abc123' },
  { time: '2024-01-15 14:32:44.567', level: 'DEBUG', module: 'Runtime', message: 'GPT-4模型调用耗时: 1.2s', requestId: 'req-abc123' },
  { time: '2024-01-15 14:32:43.234', level: 'WARN', module: 'Security', message: '检测到敏感词，已自动过滤', requestId: 'req-def456' },
  { time: '2024-01-15 14:32:42.890', level: 'ERROR', module: 'Agent', message: '销售Agent超时，自动重试中', requestId: 'req-ghi789' },
  { time: '2024-01-15 14:32:41.456', level: 'INFO', module: 'System', message: '系统健康检查通过', requestId: 'sys-001' },
  { time: '2024-01-15 14:32:40.123', level: 'INFO', module: 'RAG', message: 'Embedding生成完成，维度: 1536', requestId: 'req-jkl012' },
  { time: '2024-01-15 14:32:39.789', level: 'DEBUG', module: 'Runtime', message: '模型负载均衡切换至Gemma', requestId: 'sys-002' },
  { time: '2024-01-15 14:32:38.456', level: 'INFO', module: 'Agent', message: '知识检索Agent启动新会话', requestId: 'req-mno345' },
  { time: '2024-01-15 14:32:37.123', level: 'WARN', module: 'Runtime', message: 'GPU内存使用率达到80%', requestId: 'sys-003' },
]

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

  const filteredLogs = logs.filter(log => {
    if (selectedLevel !== '全部' && log.level !== selectedLevel) return false
    if (selectedModule !== '全部' && log.module !== selectedModule) return false
    if (searchQuery && !log.message.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">日志监控中心</h1>
          <p className="text-sm text-muted-foreground mt-1">实时系统日志与事件追踪</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/50 border border-border/50 text-sm text-foreground hover:bg-muted transition-colors">
            <RefreshCw className="h-4 w-4" />
            刷新
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            <Download className="h-4 w-4" />
            导出日志
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl bg-card border border-border/50 p-4 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
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

          {/* Level Filter */}
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

          {/* Module Filter */}
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

      {/* Logs List */}
      <div className="rounded-2xl bg-card border border-border/50 backdrop-blur-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
              <ScrollText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">实时日志流</h3>
              <p className="text-sm text-muted-foreground">显示 {filteredLogs.length} 条记录</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs text-secondary">实时更新</span>
          </div>
        </div>

        <div className="divide-y divide-border/30 max-h-[600px] overflow-y-auto">
          {filteredLogs.map((log, index) => {
            const config = levelConfig[log.level]
            const Icon = config.icon
            return (
              <div 
                key={index}
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
                  <p className="text-xs text-muted-foreground mt-1 font-mono">{log.requestId}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
