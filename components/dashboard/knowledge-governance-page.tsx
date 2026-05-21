"use client"

import { 
  FileText, 
  Layers, 
  Database, 
  Clock,
  Shield,
  Lock,
  Users,
  Globe,
  ArrowRight,
  CheckCircle2,
  Zap
} from 'lucide-react'
import { cn } from '@/lib/utils'

const knowledgeMetrics = [
  { title: '知识文档', value: '128,000', icon: FileText, color: 'blue' },
  { title: 'Embedding数量', value: '91M', icon: Layers, color: 'purple' },
  { title: '向量数据库', value: '8,293,331', icon: Database, color: 'green' },
  { title: '平均检索耗时', value: '0.42s', icon: Clock, color: 'cyan' },
]

const governancePipeline = [
  { step: 'OCR解析', status: 'active' },
  { step: '数据清洗', status: 'active' },
  { step: '标签抽取', status: 'active' },
  { step: '术语标准化', status: 'active' },
  { step: 'Embedding', status: 'active' },
  { step: '向量入库', status: 'active' },
  { step: '权限隔离', status: 'active' },
]

const securityLevels = [
  { 
    level: 'S0', 
    title: '核心数据', 
    description: '禁止外部访问',
    icon: Lock,
    color: 'red',
    docs: '2,341'
  },
  { 
    level: 'S1', 
    title: '内部数据', 
    description: '部门权限隔离',
    icon: Users,
    color: 'orange',
    docs: '45,892'
  },
  { 
    level: 'S2', 
    title: '公开数据', 
    description: '客户可访问',
    icon: Globe,
    color: 'green',
    docs: '79,767'
  },
]

const colorMap: Record<string, { text: string; bg: string; border: string }> = {
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  purple: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  green: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  red: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  orange: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
}

export function KnowledgeGovernancePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">知识中台</h1>
        <p className="text-sm text-muted-foreground mt-1">企业级知识治理与RAG管理平台</p>
      </div>

      {/* Knowledge Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {knowledgeMetrics.map((metric) => {
          const Icon = metric.icon
          const colors = colorMap[metric.color]
          return (
            <div 
              key={metric.title}
              className="rounded-2xl bg-card border border-border/50 p-5 backdrop-blur-sm hover:border-border transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl border", colors.bg, colors.border)}>
                  <Icon className={cn("h-5 w-5", colors.text)} />
                </div>
                <span className="text-sm text-muted-foreground">{metric.title}</span>
              </div>
              <p className={cn("text-2xl font-bold", colors.text)}>{metric.value}</p>
            </div>
          )
        })}
      </div>

      {/* Governance Pipeline */}
      <div className="rounded-2xl bg-card border border-border/50 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">知识治理流水线</h3>
            <p className="text-sm text-muted-foreground">自动化知识处理与入库流程</p>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {governancePipeline.map((item, index) => (
            <div key={item.step} className="flex items-center">
              <div className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap",
                "bg-gradient-to-br from-primary/10 to-primary/5",
                "border border-primary/20"
              )}>
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                <span className="text-sm font-medium text-foreground">{item.step}</span>
              </div>
              {index < governancePipeline.length - 1 && (
                <ArrowRight className="h-5 w-5 text-muted-foreground mx-2 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Security Levels */}
      <div className="rounded-2xl bg-card border border-border/50 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20">
            <Shield className="h-5 w-5 text-orange-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">数据安全分级</h3>
            <p className="text-sm text-muted-foreground">知识库权限与访问控制</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {securityLevels.map((level) => {
            const Icon = level.icon
            const colors = colorMap[level.color]
            return (
              <div 
                key={level.level}
                className={cn(
                  "rounded-xl p-5 border transition-all hover:scale-[1.02]",
                  colors.bg, colors.border
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(
                    "px-3 py-1 rounded-lg text-sm font-bold",
                    colors.bg, colors.text
                  )}>
                    {level.level}
                  </div>
                  <Icon className={cn("h-5 w-5", colors.text)} />
                </div>
                <h4 className="text-base font-semibold text-foreground mb-1">{level.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{level.description}</p>
                <div className="pt-3 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">文档数量</span>
                  <p className={cn("text-lg font-bold", colors.text)}>{level.docs}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
