"use client"

import { 
  Target, 
  Users,
  TrendingUp,
  MessageSquare,
  Phone,
  Mail,
  Calendar,
  Star,
  ArrowUpRight,
  Brain,
  Sparkles,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

const customerProfiles = [
  {
    id: 1,
    name: '张伟',
    company: '科技创新公司',
    stage: '意向客户',
    score: 85,
    value: '¥128万',
    lastContact: '2小时前',
    tags: ['高意向', '决策者', 'AI需求'],
    status: 'hot'
  },
  {
    id: 2,
    name: '李明',
    company: '智能制造集团',
    stage: '方案洽谈',
    score: 72,
    value: '¥256万',
    lastContact: '1天前',
    tags: ['大客户', '技术评估中'],
    status: 'warm'
  },
  {
    id: 3,
    name: '王芳',
    company: '数据服务中心',
    stage: '初步接触',
    score: 58,
    value: '¥68万',
    lastContact: '3天前',
    tags: ['待跟进', '预算有限'],
    status: 'cold'
  },
]

const aiSuggestions = [
  {
    customer: '张伟',
    type: 'action',
    suggestion: '建议今日下午3点进行产品演示，客户对AI工作流功能高度关注',
    priority: 'high',
    icon: Calendar,
  },
  {
    customer: '李明',
    type: 'insight',
    suggestion: '客户近期浏览了竞品方案，建议发送差异化优势对比材料',
    priority: 'medium',
    icon: Brain,
  },
  {
    customer: '王芳',
    type: 'risk',
    suggestion: '客户3天未响应，建议更换沟通方式或降低报价方案',
    priority: 'low',
    icon: AlertCircle,
  },
]

const scripts = [
  { title: '产品介绍话术', usage: 1280, rating: 4.9 },
  { title: '异议处理模板', usage: 856, rating: 4.7 },
  { title: '价格谈判指南', usage: 642, rating: 4.8 },
]

export function SalesCopilotPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">销售Copilot</h1>
          <p className="text-sm text-muted-foreground mt-1">AI驱动的智能销售助手，赋能全流程转化</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-muted/50 text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            今日日程
          </button>
          <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI分析报告
          </button>
        </div>
      </div>

      {/* Sales Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: '本月成交额', value: '¥892万', trend: '+24.5%', icon: TrendingUp, color: 'text-secondary' },
          { title: '转化率提升', value: '+18.2%', trend: '+6.1%', icon: Target, color: 'text-primary' },
          { title: '客户跟进', value: '128', trend: '+15', icon: Users, color: 'text-orange-400' },
          { title: 'AI辅助次数', value: '2,431', trend: '+342', icon: Brain, color: 'text-violet-400' },
        ].map((metric, i) => {
          const Icon = metric.icon
          return (
            <div key={i} className="rounded-2xl bg-card border border-border/50 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center">
                  <Icon className={cn("h-5 w-5", metric.color)} />
                </div>
                <span className="text-xs text-secondary font-medium flex items-center gap-1">
                  <ArrowUpRight className="h-3 w-3" />
                  {metric.trend}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
              <p className={cn("text-2xl font-bold", metric.color)}>{metric.value}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Customer Profiles */}
        <div className="xl:col-span-2 rounded-2xl bg-card border border-border/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">客户画像</h3>
                <p className="text-sm text-muted-foreground">AI智能分析客户意向与需求</p>
              </div>
            </div>
            <button className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
              查看全部 <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-3">
            {customerProfiles.map((customer) => (
              <div 
                key={customer.id}
                className="rounded-xl bg-muted/30 border border-border/30 p-4 hover:border-primary/30 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-medium">
                        {customer.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{customer.name}</span>
                          <span className={cn(
                            "px-2 py-0.5 rounded text-xs font-medium",
                            customer.status === 'hot' && "bg-destructive/20 text-destructive",
                            customer.status === 'warm' && "bg-warning/20 text-warning",
                            customer.status === 'cold' && "bg-muted text-muted-foreground"
                          )}>
                            {customer.stage}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{customer.company}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {customer.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-foreground">{customer.value}</div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <div className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold",
                        customer.score >= 80 && "bg-secondary/20 text-secondary",
                        customer.score >= 60 && customer.score < 80 && "bg-warning/20 text-warning",
                        customer.score < 60 && "bg-muted text-muted-foreground"
                      )}>
                        {customer.score}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                      <Clock className="h-3 w-3" />
                      {customer.lastContact}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="space-y-6">
          {/* Smart Suggestions */}
          <div className="rounded-2xl bg-card border border-border/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
                <Brain className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">AI跟进建议</h3>
                <p className="text-sm text-muted-foreground">智能分析最佳跟进策略</p>
              </div>
            </div>

            <div className="space-y-3">
              {aiSuggestions.map((suggestion, i) => {
                const Icon = suggestion.icon
                return (
                  <div 
                    key={i}
                    className={cn(
                      "rounded-xl p-4 border",
                      suggestion.priority === 'high' && "bg-destructive/5 border-destructive/20",
                      suggestion.priority === 'medium' && "bg-warning/5 border-warning/20",
                      suggestion.priority === 'low' && "bg-muted/30 border-border/30"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={cn(
                        "h-5 w-5 mt-0.5",
                        suggestion.priority === 'high' && "text-destructive",
                        suggestion.priority === 'medium' && "text-warning",
                        suggestion.priority === 'low' && "text-muted-foreground"
                      )} />
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">{suggestion.customer}</p>
                        <p className="text-sm text-foreground">{suggestion.suggestion}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl bg-card border border-border/50 p-6">
            <h3 className="text-base font-semibold text-foreground mb-4">快速操作</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Phone, label: '拨打电话', color: 'text-secondary' },
                { icon: Mail, label: '发送邮件', color: 'text-primary' },
                { icon: MessageSquare, label: '发送消息', color: 'text-orange-400' },
                { icon: Calendar, label: '预约会议', color: 'text-violet-400' },
              ].map((action, i) => {
                const Icon = action.icon
                return (
                  <button 
                    key={i}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <Icon className={cn("h-5 w-5", action.color)} />
                    <span className="text-xs text-muted-foreground">{action.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Sales Scripts */}
          <div className="rounded-2xl bg-card border border-border/50 p-6">
            <h3 className="text-base font-semibold text-foreground mb-4">智能话术库</h3>
            <div className="space-y-2">
              {scripts.map((script, i) => (
                <div 
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <span className="text-sm text-foreground">{script.title}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{script.usage}次</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-warning fill-warning" />
                      <span className="text-xs text-foreground">{script.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
