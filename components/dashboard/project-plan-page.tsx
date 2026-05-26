"use client"

import { AlertTriangle, ArrowRight, BadgeCheck, CalendarClock, CheckCircle2, ClipboardList, Flag, Layers3, ShieldAlert, Users } from 'lucide-react'
import plan from '@/data/project-plan.json'
import { cn } from '@/lib/utils'

type StageStatus = '已完成' | '进行中' | '待启动' | '规划中'
type Stage = {
  id: string
  stage: string
  status: StageStatus
  owner: string
  participants: string[]
  progress: number
  goal: string
  risks: string[]
  next_action: string
}

const statusStyle: Record<StageStatus, string> = {
  已完成: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300',
  进行中: 'border-blue-500/25 bg-blue-500/10 text-blue-300',
  待启动: 'border-amber-500/25 bg-amber-500/10 text-amber-300',
  规划中: 'border-muted-foreground/20 bg-muted/30 text-muted-foreground',
}

const progressStyle: Record<StageStatus, string> = {
  已完成: 'bg-emerald-400',
  进行中: 'bg-blue-400',
  待启动: 'bg-amber-400',
  规划中: 'bg-muted-foreground',
}

export function ProjectPlanPage() {
  const stages = plan.stages as Stage[]
  const activeStages = stages.filter((stage) => stage.status === '进行中')
  const highRiskCount = stages.reduce((sum, stage) => sum + stage.risks.length, 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            <ClipboardList className="h-4 w-4" />
            管理岗推进能力
          </div>
          <h1 className="text-2xl font-bold text-foreground">{plan.summary.title}</h1>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">{plan.summary.subtitle}</p>
        </div>

        <div className="rounded-xl border border-border/50 bg-card p-4 xl:w-[360px]">
          <div className="text-xs text-muted-foreground">当前聚焦项目</div>
          <div className="mt-2 text-base font-semibold text-foreground">{plan.summary.current_focus}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-lg border border-primary/20 bg-primary/10 px-2 py-1 text-xs text-primary">{plan.summary.owner_role}</span>
            <span className="rounded-lg border border-border/50 bg-muted/30 px-2 py-1 text-xs text-muted-foreground">{plan.summary.cycle}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plan.metrics.map((metric, index) => {
          const icons = [Layers3, Users, ShieldAlert, Flag]
          const Icon = icons[index] ?? Layers3
          return (
            <div key={metric.label} className="rounded-xl border border-border/50 bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-muted-foreground">{metric.label}</div>
                  <div className="mt-2 text-2xl font-bold text-foreground">{metric.value}</div>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">{metric.note}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-border/50 bg-card p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">AI项目推进阶段</h2>
              <p className="mt-1 text-sm text-muted-foreground">展示每个阶段的负责人、协作角色、风险点和下一步动作</p>
            </div>
            <CalendarClock className="h-5 w-5 text-primary" />
          </div>

          <div className="space-y-4">
            {stages.map((stage) => (
              <div key={stage.id} className="rounded-xl border border-border/50 bg-muted/20 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">{stage.id}</span>
                      <h3 className="text-sm font-semibold text-foreground">{stage.stage}</h3>
                      <span className={cn('rounded-lg border px-2 py-1 text-xs font-medium', statusStyle[stage.status])}>{stage.status}</span>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{stage.goal}</p>
                  </div>
                  <div className="shrink-0 rounded-lg border border-border/50 bg-background/40 px-3 py-2 text-xs text-muted-foreground">
                    Owner: <span className="font-medium text-foreground">{stage.owner}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">推进进度</span>
                    <span className="font-medium text-foreground">{stage.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className={cn('h-full rounded-full', progressStyle[stage.status])} style={{ width: `${stage.progress}%` }} />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-3">
                  <div className="rounded-lg border border-border/50 bg-background/40 p-3">
                    <div className="mb-2 text-xs font-medium text-muted-foreground">协作角色</div>
                    <div className="flex flex-wrap gap-2">
                      {stage.participants.map((participant) => <span key={participant} className="rounded-md bg-muted/50 px-2 py-1 text-xs text-foreground">{participant}</span>)}
                    </div>
                  </div>

                  <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-3">
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-amber-200">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      风险点
                    </div>
                    <div className="space-y-1.5">
                      {stage.risks.map((risk) => <div key={risk} className="text-xs leading-5 text-muted-foreground">{risk}</div>)}
                    </div>
                  </div>

                  <div className="rounded-lg border border-primary/20 bg-primary/10 p-3">
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-primary">
                      <ArrowRight className="h-3.5 w-3.5" />
                      下一步
                    </div>
                    <p className="text-xs leading-5 text-muted-foreground">{stage.next_action}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10"><BadgeCheck className="h-5 w-5 text-blue-300" /></div>
              <div><h2 className="text-lg font-semibold text-foreground">当前进行中</h2><p className="text-sm text-muted-foreground">适合面试时说明如何推进落地</p></div>
            </div>
            <div className="space-y-3">
              {activeStages.map((stage) => <div key={stage.id} className="rounded-xl border border-border/50 bg-muted/20 p-4"><div className="text-sm font-semibold text-foreground">{stage.stage}</div><p className="mt-2 text-xs leading-5 text-muted-foreground">{stage.next_action}</p></div>)}
            </div>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10"><CheckCircle2 className="h-5 w-5 text-emerald-300" /></div>
              <div><h2 className="text-lg font-semibold text-foreground">本周行动清单</h2><p className="text-sm text-muted-foreground">把规划转成可执行动作</p></div>
            </div>
            <div className="space-y-3">
              {plan.weekly_actions.map((action) => <div key={action} className="flex items-start gap-2 rounded-lg border border-border/50 bg-muted/20 p-3 text-sm leading-6 text-muted-foreground"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-secondary" />{action}</div>)}
            </div>
          </div>

          <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-4">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-rose-300" />
              <div><div className="text-sm font-semibold text-rose-200">管理风险提示</div><p className="mt-1 text-sm leading-6 text-muted-foreground">当前识别到 {highRiskCount} 个推进风险。面试表达时可以强调：AI 项目不是只交付功能，而是要同步管理数据质量、业务使用、风险兜底和 ROI 口径。</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
