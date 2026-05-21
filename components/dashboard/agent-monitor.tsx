"use client"

import { cn } from '@/lib/utils'
import { Bot, MoreHorizontal, Play, Pause } from 'lucide-react'

const agents = [
  {
    name: '客服Agent',
    status: '在线',
    statusColor: 'secondary',
    tokenUsage: '12.4M',
    avgResponse: '1.2s',
    successRate: '98.2%',
    lastRun: '2秒前'
  },
  {
    name: '销售助手',
    status: '在线',
    statusColor: 'secondary',
    tokenUsage: '8.1M',
    avgResponse: '1.8s',
    successRate: '96.7%',
    lastRun: '5秒前'
  },
  {
    name: '知识检索Agent',
    status: '在线',
    statusColor: 'secondary',
    tokenUsage: '4.3M',
    avgResponse: '0.9s',
    successRate: '99.1%',
    lastRun: '1秒前'
  },
  {
    name: '数据分析Agent',
    status: '处理中',
    statusColor: 'warning',
    tokenUsage: '6.7M',
    avgResponse: '2.1s',
    successRate: '97.5%',
    lastRun: '正在运行'
  },
  {
    name: '文档生成Agent',
    status: '在线',
    statusColor: 'secondary',
    tokenUsage: '3.2M',
    avgResponse: '1.5s',
    successRate: '95.8%',
    lastRun: '8秒前'
  },
]

const statusColorMap = {
  secondary: 'bg-secondary',
  warning: 'bg-warning',
  destructive: 'bg-destructive'
}

export function AgentMonitor() {
  return (
    <div className="glass-card rounded-2xl p-6 border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
            <Bot className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">实时Agent运行状态</h3>
            <p className="text-xs text-muted-foreground">5个Agent正在运行</p>
          </div>
        </div>
        <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-muted transition-colors">
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Agent名称</th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">状态</th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Token消耗</th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">平均响应</th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">成功率</th>
              <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">最后运行</th>
              <th className="text-right py-3 px-2 text-xs font-medium text-muted-foreground">操作</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent, index) => (
              <tr 
                key={agent.name}
                className={cn(
                  "border-b border-border/30 hover:bg-muted/30 transition-colors",
                  index === agents.length - 1 && "border-b-0"
                )}
              >
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{agent.name}</span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "h-2 w-2 rounded-full animate-pulse",
                      statusColorMap[agent.statusColor as keyof typeof statusColorMap]
                    )} />
                    <span className="text-sm text-foreground">{agent.status}</span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span className="text-sm text-foreground font-mono">{agent.tokenUsage}</span>
                </td>
                <td className="py-3 px-2">
                  <span className="text-sm text-foreground font-mono">{agent.avgResponse}</span>
                </td>
                <td className="py-3 px-2">
                  <span className={cn(
                    "text-sm font-medium",
                    parseFloat(agent.successRate) >= 98 ? "text-secondary" : 
                    parseFloat(agent.successRate) >= 95 ? "text-foreground" : "text-warning"
                  )}>
                    {agent.successRate}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className="text-sm text-muted-foreground">{agent.lastRun}</span>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center justify-end gap-1">
                    <button className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-muted transition-colors">
                      {agent.status === '处理中' ? (
                        <Pause className="h-3.5 w-3.5 text-muted-foreground" />
                      ) : (
                        <Play className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
