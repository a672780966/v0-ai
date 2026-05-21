"use client"

import { 
  Sparkles, 
  MessageSquare, 
  FileText, 
  Code,
  Mail,
  Calendar,
  Search,
  Lightbulb,
  Send,
  Paperclip,
  Mic,
  MoreHorizontal
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const quickActions = [
  { title: '写邮件', icon: Mail, color: 'blue' },
  { title: '写文档', icon: FileText, color: 'purple' },
  { title: '写代码', icon: Code, color: 'green' },
  { title: '安排会议', icon: Calendar, color: 'orange' },
  { title: '搜索知识', icon: Search, color: 'cyan' },
  { title: '头脑风暴', icon: Lightbulb, color: 'yellow' },
]

const recentChats = [
  { 
    title: '如何优化产品转化率？', 
    preview: '根据您的数据分析，我建议从以下几个方面入手...',
    time: '5分钟前'
  },
  { 
    title: '本月销售报告生成', 
    preview: '报告已生成，包含销售额、增长率、客户分布等...',
    time: '2小时前'
  },
  { 
    title: '竞品分析请求', 
    preview: '已完成对竞品A、B、C的功能对比分析...',
    time: '昨天'
  },
]

const suggestions = [
  '帮我写一封客户感谢邮件',
  '分析上周的销售数据趋势',
  '生成本月的工作周报',
  '查询公司差旅报销政策',
]

const colorMap: Record<string, { text: string; bg: string; border: string }> = {
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  purple: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  green: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  orange: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  yellow: { text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20' },
}

export function CopilotPage() {
  const [input, setInput] = useState('')

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 glow-blue">
            <Sparkles className="h-7 w-7 text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-foreground">员工Copilot</h1>
        <p className="text-sm text-muted-foreground mt-2">您的AI工作助手，随时为您服务</p>
      </div>

      {/* Chat Input */}
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl bg-card border border-border/50 p-4 backdrop-blur-sm shadow-lg">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="问我任何问题，或告诉我您需要什么帮助..."
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
            />
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <Paperclip className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                <Mic className="h-5 w-5 text-muted-foreground" />
              </button>
              <button className="p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInput(suggestion)}
              className="px-3 py-1.5 rounded-lg bg-muted/30 border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-border transition-all"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl bg-card border border-border/50 p-6 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4">快捷操作</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon
            const colors = colorMap[action.color]
            return (
              <button
                key={action.title}
                className={cn(
                  "flex flex-col items-center gap-3 p-4 rounded-xl",
                  "bg-gradient-to-br from-muted/30 to-transparent",
                  "border border-border/50 hover:border-primary/30",
                  "transition-all hover:scale-[1.02]"
                )}
              >
                <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl border", colors.bg, colors.border)}>
                  <Icon className={cn("h-6 w-6", colors.text)} />
                </div>
                <span className="text-sm font-medium text-foreground">{action.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Recent Chats */}
      <div className="rounded-2xl bg-card border border-border/50 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">最近对话</h3>
          <button className="text-sm text-primary hover:underline">查看全部</button>
        </div>
        <div className="space-y-3">
          {recentChats.map((chat) => (
            <div 
              key={chat.title}
              className={cn(
                "flex items-start gap-4 p-4 rounded-xl",
                "bg-muted/20 border border-border/30",
                "hover:bg-muted/30 cursor-pointer transition-all"
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-sm font-medium text-foreground truncate">{chat.title}</h4>
                  <span className="text-xs text-muted-foreground shrink-0">{chat.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{chat.preview}</p>
              </div>
              <button className="p-1 hover:bg-muted/50 rounded-lg transition-colors shrink-0">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
