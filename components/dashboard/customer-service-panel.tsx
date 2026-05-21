"use client"

import { Headphones, MessageCircle, ThumbsUp, AlertTriangle, User, Bot, Send } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const conversations = [
  {
    id: 1,
    type: 'user',
    message: '你好，我想咨询一下产品的退换货政策',
    time: '10:32:15'
  },
  {
    id: 2,
    type: 'ai',
    message: '您好！根据我们的退换货政策，自购买之日起7天内支持无理由退换货。请问您是想要退货还是换货呢？',
    time: '10:32:16',
    confidence: 0.95,
    knowledgeHit: '退换货政策文档'
  },
  {
    id: 3,
    type: 'user',
    message: '我想换一个颜色，需要怎么操作？',
    time: '10:32:28'
  },
  {
    id: 4,
    type: 'ai',
    message: '换货流程非常简单：1. 登录您的账户 2. 进入"我的订单" 3. 选择需要换货的商品 4. 提交换货申请。我们收到商品后会在3个工作日内为您发出新商品。',
    time: '10:32:29',
    confidence: 0.92,
    knowledgeHit: '换货流程指南'
  },
]

export function CustomerServicePanel() {
  const [inputValue, setInputValue] = useState('')

  return (
    <div className="glass-card rounded-2xl p-6 border border-border/50 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 glow-blue">
            <Headphones className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI客服中心</h3>
            <p className="text-xs text-muted-foreground">实时对话监控</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            23 个活跃对话
          </span>
        </div>
      </div>

      {/* Conversation Feed */}
      <div className="space-y-3 max-h-[280px] overflow-y-auto pr-2">
        {conversations.map((conv) => (
          <div key={conv.id} className={cn(
            "flex gap-3",
            conv.type === 'user' && "flex-row-reverse"
          )}>
            <div className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
              conv.type === 'user' ? "bg-accent/10" : "bg-primary/10"
            )}>
              {conv.type === 'user' ? (
                <User className="h-4 w-4 text-accent" />
              ) : (
                <Bot className="h-4 w-4 text-primary" />
              )}
            </div>
            <div className={cn(
              "flex-1 rounded-xl p-3",
              conv.type === 'user' ? "bg-accent/10 border border-accent/20" : "bg-muted/50 border border-border/50"
            )}>
              <p className="text-sm text-foreground">{conv.message}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-muted-foreground">{conv.time}</span>
                {conv.type === 'ai' && conv.confidence && (
                  <>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className={cn(
                      "text-xs",
                      conv.confidence >= 0.9 ? "text-secondary" : "text-warning"
                    )}>
                      置信度 {(conv.confidence * 100).toFixed(0)}%
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-primary">命中: {conv.knowledgeHit}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-4 pt-4 border-t border-border/30">
        <div className="grid grid-cols-3 gap-2">
          <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary text-xs font-medium hover:bg-secondary/20 transition-colors">
            <ThumbsUp className="h-3.5 w-3.5" />
            标记满意
          </button>
          <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-warning/10 border border-warning/20 text-warning text-xs font-medium hover:bg-warning/20 transition-colors">
            <AlertTriangle className="h-3.5 w-3.5" />
            人工介入
          </button>
          <button className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-medium hover:bg-primary/20 transition-colors">
            <MessageCircle className="h-3.5 w-3.5" />
            查看详情
          </button>
        </div>
      </div>
    </div>
  )
}
