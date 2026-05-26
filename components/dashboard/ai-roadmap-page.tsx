"use client"

import type { ReactNode } from 'react'
import { AlertTriangle, ArrowUpRight, BadgeCheck, BrainCircuit, CheckCircle2, Clock3, Compass, Database, LineChart, Route, ShieldCheck, Target, Users } from 'lucide-react'
import roadmap from '@/data/ai-roadmap.json'
import { cn } from '@/lib/utils'

type Level = '高' | '中' | '低'
type Priority = 'P0' | 'P1' | 'P2'
type Scenario = {
  id: string
  name: string
  category: string
  business_value: Level
  implementation_difficulty: Level
  data_readiness: Level
  risk_level: Level
  priority: Priority
  mvp: string
  expected_outcome: string
}

const priorityStyle: Record<Priority, string> = {
  P0: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300',
  P1: 'border-blue-500/25 bg-blue-500/10 text-blue-300',
  P2: 'border-amber-500/25 bg-amber-500/10 text-amber-300',
}

const valueStyle: Record<Level, string> = {
  高: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
  中: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  低: 'text-muted-foreground bg-muted/30 border-border/60',
}

const difficultyStyle: Record<Level, string> = {
  高: 'text-rose-300 bg-rose-500/10 border-rose-500/20',
  中: 'text-amber-300 bg-amber-500/10 border-amber-500/20',
  低: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20',
}

const priorityIcon = { P0: Target, P1: ArrowUpRight, P2: Clock3 }

function Pill({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn('inline-flex items-center rounded-lg border px-2 py-1 text-xs font-medium', className)}>{children}</span>
}

function getQuadrant(scenario: Scenario) {
  if (scenario.business_value === '高' && scenario.implementation_difficulty !== '高') return '优先试点'
  if (scenario.business_value === '高') return '专项攻坚'
  if (scenario.implementation_difficulty === '低') return '快速补齐'
  return '储备规划'
}

export function AIRoadmapPage() {
  const scenarios = roadmap.scenarios as Scenario[]
  const p0Scenarios = scenarios.filter((item) => item.priority === 'P0')
  const avgReadiness = Math.round(
    scenarios.reduce((sum, item) => sum + (item.data_readiness === '高' ? 100 : item.data_readiness === '中' ? 65 : 35), 0) / scenarios.length
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            <Compass className="h-4 w-4" />
            AI 应用规划师面试作品模块
          </div>
          <h1 className="text-2xl font-bold text-foreground">{roadmap.summary.title}</h1>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">{roadmap.summary.positioning}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 xl:w-[420px]">
          {[
            ['P0 场景', p0Scenarios.length],
            ['规划场景', scenarios.length],
            ['数据准备', `${avgReadiness}%`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-border/50 bg-card p-4">
              <div className="text-xs text-muted-foreground">{label}</div>
              <div className="mt-2 text-2xl font-bold text-foreground">{value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {roadmap.summary.principles.map((principle, index) => (
          <div key={principle} className="rounded-xl border border-border/50 bg-card p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <div className="text-xs font-medium text-muted-foreground">原则 {index + 1}</div>
            <p className="mt-2 text-sm leading-6 text-foreground">{principle}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-border/50 bg-card p-6">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">AI 场景优先级矩阵</h2>
              <p className="mt-1 text-sm text-muted-foreground">按业务价值、落地难度、数据准备度和风险等级判断先做什么</p>
            </div>
            <LineChart className="h-5 w-5 text-primary" />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {scenarios.map((scenario) => {
              const Icon = priorityIcon[scenario.priority]
              return (
                <div key={scenario.id} className="rounded-xl border border-border/50 bg-muted/20 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-xs text-muted-foreground">{scenario.category}</div>
                      <h3 className="mt-1 text-sm font-semibold text-foreground">{scenario.name}</h3>
                    </div>
                    <Pill className={priorityStyle[scenario.priority]}><Icon className="mr-1.5 h-3.5 w-3.5" />{scenario.priority}</Pill>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Pill className={valueStyle[scenario.business_value]}>价值 {scenario.business_value}</Pill>
                    <Pill className={difficultyStyle[scenario.implementation_difficulty]}>难度 {scenario.implementation_difficulty}</Pill>
                    <Pill className={valueStyle[scenario.data_readiness]}>数据 {scenario.data_readiness}</Pill>
                    <Pill className={difficultyStyle[scenario.risk_level]}>风险 {scenario.risk_level}</Pill>
                  </div>

                  <div className="mt-4 rounded-lg border border-border/50 bg-background/40 p-3">
                    <div className="mb-1 text-xs font-medium text-primary">{getQuadrant(scenario)}</div>
                    <p className="text-xs leading-5 text-muted-foreground">{scenario.mvp}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10">
                <BadgeCheck className="h-5 w-5 text-emerald-300" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">第一批建议试点</h2>
                <p className="text-sm text-muted-foreground">先验证最能讲业务闭环的 P0 场景</p>
              </div>
            </div>
            <div className="space-y-3">
              {p0Scenarios.map((scenario) => (
                <div key={scenario.id} className="rounded-xl border border-border/50 bg-muted/20 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-medium text-foreground">{scenario.name}</div>
                    <Pill className={priorityStyle[scenario.priority]}>{scenario.priority}</Pill>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{scenario.expected_outcome}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
                <Route className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">90 天推进路线</h2>
                <p className="text-sm text-muted-foreground">从业务调研到试点复盘的管理岗交付路径</p>
              </div>
            </div>
            <div className="space-y-4">
              {roadmap.phases.map((phase, index) => (
                <div key={phase.name} className="rounded-xl border border-border/50 bg-muted/20 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-xs font-bold text-primary">{index + 1}</div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{phase.name}</div>
                      <div className="text-xs text-muted-foreground">{phase.focus}</div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    {phase.deliverables.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs leading-5 text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-secondary" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {[
          { label: '业务价值', value: '客服提效 + 线索转化', icon: Users },
          { label: '技术路径', value: '知识库 + 工作流 + 反馈回流', icon: BrainCircuit },
          { label: '数据基础', value: '先本地 JSON 验证，再接 CRM/RAG', icon: Database },
          { label: '风控原则', value: '高风险问题强制人工确认', icon: ShieldCheck },
        ].map((item) => {
          const Icon = item.icon
          return (
            <div key={item.label} className="rounded-xl border border-border/50 bg-card p-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium text-muted-foreground"><Icon className="h-4 w-4 text-primary" />{item.label}</div>
              <div className="text-sm font-semibold leading-6 text-foreground">{item.value}</div>
            </div>
          )
        })}
      </div>

      <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
          <div>
            <div className="text-sm font-semibold text-amber-200">面试表达重点</div>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">这个模块用于说明：我不是只做一个 AI 咨询窗口，而是能从集团业务场景出发，判断优先级、设计 MVP、规划 90 天推进节奏，并把风险控制、知识沉淀和经营指标纳入同一套落地方案。</p>
          </div>
        </div>
      </div>
    </div>
  )
}
