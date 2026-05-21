"use client"

import { RefreshCcw, CheckCircle2, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  { label: '用户反馈', status: 'completed', count: 1234 },
  { label: '人工修正', status: 'completed', count: 892 },
  { label: '自动优化', status: 'active', count: 456 },
  { label: '再训练', status: 'pending', count: 0 },
  { label: '向量重建', status: 'pending', count: 0 },
]

export function FeedbackLoop() {
  return (
    <div className="glass-card rounded-2xl p-6 border border-border/50">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 border border-secondary/20">
            <RefreshCcw className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">数据回流闭环</h3>
            <p className="text-xs text-muted-foreground">持续学习优化流程</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl border-2 transition-all",
                step.status === 'completed' && "bg-secondary/10 border-secondary text-secondary",
                step.status === 'active' && "bg-primary/10 border-primary text-primary animate-pulse",
                step.status === 'pending' && "bg-muted/30 border-border text-muted-foreground"
              )}>
                {step.status === 'completed' ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <span className={cn(
                "text-xs mt-2 text-center max-w-[60px]",
                step.status === 'completed' && "text-secondary",
                step.status === 'active' && "text-primary font-medium",
                step.status === 'pending' && "text-muted-foreground"
              )}>
                {step.label}
              </span>
              {step.count > 0 && (
                <span className="text-xs text-muted-foreground mt-1">{step.count}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className={cn(
                "h-4 w-4 mx-2",
                step.status === 'completed' ? "text-secondary" : "text-muted-foreground"
              )} />
            )}
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="mt-5 pt-4 border-t border-border/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">本周优化进度</span>
          <span className="text-xs font-medium text-foreground">60%</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-secondary to-primary transition-all duration-500"
            style={{ width: '60%' }}
          />
        </div>
      </div>
    </div>
  )
}
