"use client"

import { 
  Headphones, 
  Database, 
  Sparkles, 
  Workflow, 
  Bot,
  CheckCircle2,
  Activity
} from 'lucide-react'
import { cn } from '@/lib/utils'

const aiModules = [
  { 
    name: 'AI客服', 
    status: 'active', 
    icon: Headphones,
    description: '智能客服对话',
    metrics: { calls: '128K', accuracy: '98.2%' }
  },
  { 
    name: '知识中台', 
    status: 'active', 
    icon: Database,
    description: 'RAG知识检索',
    metrics: { docs: '128K', hitRate: '92.7%' }
  },
  { 
    name: '员工Copilot', 
    status: 'active', 
    icon: Sparkles,
    description: '企业智能助手',
    metrics: { users: '2.4K', tasks: '89K' }
  },
  { 
    name: '工作流自动化', 
    status: 'active', 
    icon: Workflow,
    description: 'AI流程编排',
    metrics: { flows: '256', runs: '1.2M' }
  },
  { 
    name: '多Agent协同', 
    status: 'active', 
    icon: Bot,
    description: '智能体协作',
    metrics: { agents: '128', tasks: '456K' }
  },
]

export function EnterpriseAIMap() {
  return (
    <div className="rounded-2xl bg-card border border-border/50 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">企业AI能力全景</h3>
          <p className="text-sm text-muted-foreground mt-1">实时监控各AI模块运行状态</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/10 border border-secondary/20">
          <Activity className="h-4 w-4 text-secondary animate-pulse" />
          <span className="text-sm font-medium text-secondary">全部在线</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {aiModules.map((module) => {
          const Icon = module.icon
          return (
            <div 
              key={module.name}
              className={cn(
                "relative group rounded-xl p-4",
                "bg-gradient-to-br from-muted/30 to-muted/10",
                "border border-border/50 hover:border-primary/30",
                "transition-all duration-300 hover:scale-[1.02]",
                "hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
              )}
            >
              {/* Status Indicator */}
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-xs text-secondary font-medium">运行中</span>
                </div>
              </div>

              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 mb-4 group-hover:glow-blue transition-all">
                <Icon className="h-6 w-6 text-primary" />
              </div>

              {/* Content */}
              <h4 className="text-sm font-semibold text-foreground mb-1">{module.name}</h4>
              <p className="text-xs text-muted-foreground mb-3">{module.description}</p>

              {/* Metrics */}
              <div className="flex items-center gap-3 pt-3 border-t border-border/50">
                {Object.entries(module.metrics).map(([key, value]) => (
                  <div key={key} className="flex flex-col">
                    <span className="text-xs text-muted-foreground capitalize">{key}</span>
                    <span className="text-sm font-semibold text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
