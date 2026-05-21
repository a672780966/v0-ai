"use client"

import { ShieldCheck, Tag, Eye, Trash2, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const governanceCards = [
  {
    title: '术语标准化',
    status: 'active',
    icon: Tag,
    processed: '12,847',
    description: '企业术语统一映射'
  },
  {
    title: '标签抽取',
    status: 'active',
    icon: Tag,
    processed: '8,293',
    description: '自动实体识别标注'
  },
  {
    title: '敏感信息过滤',
    status: 'active',
    icon: Eye,
    processed: '45,120',
    description: '隐私数据脱敏处理'
  },
  {
    title: '数据清洗',
    status: 'active',
    icon: Trash2,
    processed: '23,891',
    description: '去重与质量优化'
  },
]

export function DataGovernance() {
  return (
    <div className="glass-card rounded-2xl p-6 border border-border/50">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 glow-purple">
            <ShieldCheck className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">数据治理中心</h3>
            <p className="text-xs text-muted-foreground">数据质量与合规管理</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {governanceCards.map((card) => {
          const Icon = card.icon
          
          return (
            <div
              key={card.title}
              className="rounded-xl p-4 bg-muted/30 border border-border/50 hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                  <Icon className="h-4 w-4 text-accent" />
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-secondary" />
                  <span className="text-xs text-secondary">运行中</span>
                </div>
              </div>
              <h4 className="text-sm font-medium text-foreground mb-1">{card.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">{card.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">已处理</span>
                <span className="text-sm font-mono font-medium text-foreground">{card.processed}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
