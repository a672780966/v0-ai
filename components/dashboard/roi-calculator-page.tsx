"use client"

import { BadgeDollarSign, BarChart3, BrainCircuit, CheckCircle2, Clock3, DatabaseZap, Lightbulb, LineChart, PieChart, Target, TrendingUp } from 'lucide-react'
import roi from '@/data/roi-calculator.json'
import { cn } from '@/lib/utils'

const formatMoney = (value: number) => `¥${Math.round(value).toLocaleString('zh-CN')}`
const formatHours = (value: number) => `${Math.round(value).toLocaleString('zh-CN')} 小时`
const formatPercent = (value: number) => `${Math.round(value * 100)}%`

export function ROICalculatorPage() {
  const assumptions = roi.assumptions
  const aiHandledCases = assumptions.monthly_consultations * assumptions.ai_auto_handle_rate
  const savedMinutes = aiHandledCases * assumptions.manual_minutes_per_case
  const savedHours = savedMinutes / 60
  const laborSaving = savedHours * assumptions.manual_hour_cost
  const highIntentLeads = assumptions.monthly_consultations * assumptions.high_intent_rate
  const expectedDeals = highIntentLeads * assumptions.lead_conversion_rate
  const pipelineValue = expectedDeals * assumptions.average_order_value
  const reusableKnowledge = assumptions.monthly_consultations * assumptions.knowledge_reuse_rate
  const totalEstimatedValue = laborSaving + pipelineValue

  const metrics = [
    { label: '预计节省工时', value: formatHours(savedHours), note: `${Math.round(aiHandledCases)} 次咨询由 AI 先处理`, icon: Clock3, color: 'text-blue-300', bg: 'border-blue-500/20 bg-blue-500/10' },
    { label: '人工成本节约', value: formatMoney(laborSaving), note: `按 ${formatMoney(assumptions.manual_hour_cost)}/小时估算`, icon: BadgeDollarSign, color: 'text-emerald-300', bg: 'border-emerald-500/20 bg-emerald-500/10' },
    { label: '潜在线索价值', value: formatMoney(pipelineValue), note: `${Math.round(highIntentLeads)} 条高意向线索，预计 ${expectedDeals.toFixed(1)} 单`, icon: Target, color: 'text-amber-300', bg: 'border-amber-500/20 bg-amber-500/10' },
    { label: '知识复用次数', value: `${Math.round(reusableKnowledge).toLocaleString('zh-CN')} 次`, note: `知识复用率 ${formatPercent(assumptions.knowledge_reuse_rate)}`, icon: DatabaseZap, color: 'text-cyan-300', bg: 'border-cyan-500/20 bg-cyan-500/10' },
  ]

  const assumptionRows = [
    ['月咨询量', assumptions.monthly_consultations.toLocaleString('zh-CN'), '客服、销售、顾问入口合计'],
    ['人工处理时长', `${assumptions.manual_minutes_per_case} 分钟/次`, '重复咨询的平均人工占用'],
    ['AI自动处理率', formatPercent(assumptions.ai_auto_handle_rate), '无需立即转人工的问题占比'],
    ['高意向线索率', formatPercent(assumptions.high_intent_rate), '有明确办理需求、地区、周期的咨询'],
    ['线索转化率', formatPercent(assumptions.lead_conversion_rate), '从高意向咨询到成交的模拟比例'],
    ['客单价', formatMoney(assumptions.average_order_value), '资质、工商财税、企业服务综合估算'],
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"><LineChart className="h-4 w-4" />管理层 ROI 视角</div>
          <h1 className="text-2xl font-bold text-foreground">{roi.summary.title}</h1>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">{roi.summary.subtitle}</p>
        </div>
        <div className="rounded-xl border border-border/50 bg-card p-4 xl:w-[360px]"><div className="text-xs text-muted-foreground">综合预计价值</div><div className="mt-2 text-3xl font-bold text-foreground">{formatMoney(totalEstimatedValue)}</div><p className="mt-2 text-xs leading-5 text-muted-foreground">{roi.summary.period} · {roi.summary.scenario}</p></div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return <div key={metric.label} className="rounded-xl border border-border/50 bg-card p-4"><div className="flex items-start justify-between gap-3"><div><div className="text-xs text-muted-foreground">{metric.label}</div><div className="mt-2 text-2xl font-bold text-foreground">{metric.value}</div></div><div className={cn('flex h-10 w-10 items-center justify-center rounded-xl border', metric.bg)}><Icon className={cn('h-5 w-5', metric.color)} /></div></div><p className="mt-3 text-xs leading-5 text-muted-foreground">{metric.note}</p></div>
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-2xl border border-border/50 bg-card p-6">
          <div className="mb-5 flex items-center justify-between"><div><h2 className="text-lg font-semibold text-foreground">测算假设</h2><p className="mt-1 text-sm text-muted-foreground">面试时用来说明 ROI 不是拍脑袋，而是有经营口径</p></div><PieChart className="h-5 w-5 text-primary" /></div>
          <div className="space-y-3">{assumptionRows.map(([label, value, note]) => <div key={label} className="rounded-xl border border-border/50 bg-muted/20 p-4"><div className="flex items-center justify-between gap-4"><div className="text-sm font-medium text-foreground">{label}</div><div className="text-sm font-semibold text-primary">{value}</div></div><p className="mt-2 text-xs leading-5 text-muted-foreground">{note}</p></div>)}</div>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card p-6">
          <div className="mb-5 flex items-center justify-between"><div><h2 className="text-lg font-semibold text-foreground">上线前后对比</h2><p className="mt-1 text-sm text-muted-foreground">把 AI 应用价值拆成效率、知识、转化和沉淀</p></div><BarChart3 className="h-5 w-5 text-primary" /></div>
          <div className="space-y-4">{roi.benchmarks.map((item) => <div key={item.label} className="rounded-xl border border-border/50 bg-muted/20 p-4"><div className="mb-3 flex items-center justify-between gap-3"><h3 className="text-sm font-semibold text-foreground">{item.label}</h3><TrendingUp className="h-4 w-4 text-secondary" /></div><div className="grid grid-cols-1 gap-3 md:grid-cols-2"><div className="rounded-lg border border-rose-500/20 bg-rose-500/10 p-3"><div className="text-xs text-rose-200">当前方式</div><div className="mt-1 text-sm font-medium text-foreground">{item.before}</div></div><div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3"><div className="text-xs text-emerald-200">AI MVP 后</div><div className="mt-1 text-sm font-medium text-foreground">{item.after}</div></div></div><p className="mt-3 text-xs leading-5 text-muted-foreground">{item.impact}</p></div>)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-border/50 bg-card p-6"><div className="mb-5 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10"><BrainCircuit className="h-5 w-5 text-primary" /></div><div><h2 className="text-lg font-semibold text-foreground">投入判断规则</h2><p className="text-sm text-muted-foreground">用指标决定是否扩大试点</p></div></div><div className="space-y-3">{roi.investment_advice.map((advice) => <div key={advice} className="flex items-start gap-2 rounded-lg border border-border/50 bg-muted/20 p-3 text-sm leading-6 text-muted-foreground"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-secondary" />{advice}</div>)}</div></div>
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6"><div className="flex items-start gap-3"><Lightbulb className="mt-0.5 h-6 w-6 shrink-0 text-emerald-300" /><div><h2 className="text-lg font-semibold text-emerald-100">面试表达重点</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">这页不是财务精算，而是 AI 应用规划岗的价值评估框架：先用 MVP 拿到自动处理率、知识命中率、转人工率和线索反馈，再用统一口径判断是否值得接真实 CRM、知识库和权限体系。</p><div className="mt-5 rounded-xl border border-emerald-500/20 bg-background/40 p-4"><div className="text-xs text-muted-foreground">建议汇报话术</div><p className="mt-2 text-sm leading-6 text-foreground">当前 MVP 预计每月节省 {formatHours(savedHours)} 人工处理时间，并形成约 {formatMoney(pipelineValue)} 的潜在线索价值。下一步不急于大规模系统集成，而是先用真实咨询样本验证指标稳定性。</p></div></div></div></div>
      </div>
    </div>
  )
}
