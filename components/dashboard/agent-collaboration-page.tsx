"use client"

import { 
  Bot, 
  MessageSquare, 
  Zap, 
  Clock,
  CheckCircle2,
  Activity,
  Cpu,
  Brain
} from 'lucide-react'
import { cn } from '@/lib/utils'

const agents = [
  { 
    name: '客服Agent', 
    role: '客户问答',
    status: 'online', 
    tokens: '12.4M', 
    responseTime: '1.2s', 
    successRate: '98.2%',
    lastRun: '2秒前'
  },
  { 
    name: '销售Agent', 
    role: '客户转化',
    status: 'online', 
    tokens: '8.1M', 
    responseTime: '1.8s', 
    successRate: '96.7%',
    lastRun: '5秒前'
  },
  { 
    name: '知识检索Agent', 
    role: 'RAG召回',
    status: 'online', 
    tokens: '4.3M', 
    responseTime: '0.9s', 
    successRate: '99.1%',
    lastRun: '1秒前'
  },
  { 
    name: '数据分析Agent', 
    role: '报表生成',
    status: 'online', 
    tokens: '6.2M', 
    responseTime: '2.1s', 
    successRate: '97.5%',
    lastRun: '8秒前'
  },
  { 
    name: '内容生成Agent', 
    role: '文案创作',
    status: 'online', 
    tokens: '9.8M', 
    responseTime: '1.5s', 
    successRate: '95.3%',
    lastRun: '3秒前'
  },
]

const orchestrationLayers = [
  { 
    title: 'Realtime Layer', 
    model: 'Gemma', 
    role: '实时处理',
    description: '低延迟在线推理',
    color: 'blue'
  },
  { 
    title: 'Governance Layer', 
    model: 'Qwen', 
    role: '语义治理',
    description: '内容审核与标准化',
    color: 'purple'
  },
  { 
    title: 'Night Layer', 
    model: 'GLM', 
    role: '知识重整',
    description: '离线批量处理',
    color: 'cyan'
  },
]

const colorMap: Record<string, { text: string; bg: string; border: string }> = {
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  purple: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
}

export function AgentCollaborationPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agent协同中心</h1>
          <p className="text-sm text-muted-foreground mt-1">多智能体协作与编排管理</p>
        </div>
        <button className="w-fit px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          + 创建Agent
        </button>
      </div>

      {/* Agent Table */}
      <div className="rounded-2xl bg-card border border-border/50 backdrop-blur-sm overflow-hidden">
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Agent运行状态</h3>
              <p className="text-sm text-muted-foreground">实时监控各Agent性能指标</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Agent名称</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">职责</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">状态</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">Token消耗</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">响应时间</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">成功率</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">最后运行</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent, index) => (
                <tr key={agent.name} className={cn("border-b border-border/30 hover:bg-muted/20 transition-colors", index === agents.length - 1 && "border-b-0")}>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{agent.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-muted-foreground">{agent.role}</span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                      <span className="text-sm text-secondary font-medium">在线</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-foreground font-medium">{agent.tokens}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-foreground">{agent.responseTime}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-secondary font-medium">{agent.successRate}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-muted-foreground">{agent.lastRun}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Orchestration Layers */}
      <div className="rounded-2xl bg-card border border-border/50 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20">
            <Brain className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">模型编排层</h3>
            <p className="text-sm text-muted-foreground">多层次Agent协作架构</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {orchestrationLayers.map((layer) => {
            const colors = colorMap[layer.color]
            return (
              <div 
                key={layer.title}
                className={cn(
                  "rounded-xl p-5 border transition-all hover:scale-[1.02]",
                  "bg-gradient-to-br from-muted/30 to-transparent",
                  colors.border
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={cn("px-3 py-1 rounded-lg text-xs font-bold", colors.bg, colors.text)}>
                    {layer.model}
                  </span>
                  <Cpu className={cn("h-5 w-5", colors.text)} />
                </div>
                <h4 className="text-base font-semibold text-foreground mb-1">{layer.title}</h4>
                <p className={cn("text-sm font-medium mb-2", colors.text)}>{layer.role}</p>
                <p className="text-xs text-muted-foreground">{layer.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
