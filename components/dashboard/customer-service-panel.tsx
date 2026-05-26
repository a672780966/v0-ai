"use client"

import { Bot, CheckCircle2, AlertTriangle, UserCheck2, Search, Send, BrainCircuit, BadgeAlert, Target, ThumbsUp, ThumbsDown } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type IntentResp = {
  intent: string
  business_category: string
  region: string
  urgency: string
  risk_level: 'low' | 'medium' | 'high'
  need_human: boolean
  reason: string
}

type KnowledgeResp = {
  results: Array<{
    id: string
    title: string
    content: string
    score: number
    source: string
    updated_at: string
    risk_level: 'low' | 'medium' | 'high'
  }>
  confidence: number
}

type LeadResp = {
  lead_score: number
  lead_level: 'A' | 'B' | 'C'
  tags: string[]
  recommended_service: string
  next_action: string
  sales_script: string
}

type ChatResp = {
  answer: string
  intent: IntentResp
  knowledge: KnowledgeResp
  lead: LeadResp
  response_time_ms: number
}

type FeedbackRecord = {
  id?: string
  created_at?: string
  question?: string
  feedback_type?: string
  correction?: string
  feedback?: string
}

const riskColor = {
  low: 'text-secondary border-secondary/30 bg-secondary/10',
  medium: 'text-warning border-warning/30 bg-warning/10',
  high: 'text-destructive border-destructive/30 bg-destructive/10',
}

export function CustomerServicePanel() {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [lastQuestion, setLastQuestion] = useState('')
  const [aiAnswer, setAiAnswer] = useState('')
  const [intent, setIntent] = useState<IntentResp | null>(null)
  const [knowledge, setKnowledge] = useState<KnowledgeResp | null>(null)
  const [lead, setLead] = useState<LeadResp | null>(null)
  const [actionNote, setActionNote] = useState('')
  const [correction, setCorrection] = useState('')
  const [feedbackLoading, setFeedbackLoading] = useState(false)
  const [feedbackRecords, setFeedbackRecords] = useState<FeedbackRecord[]>([])

  const handleSend = async () => {
    if (!message.trim()) return
    const currentQuestion = message.trim()
    setLoading(true)
    setActionNote('')
    setCorrection('')
    setLastQuestion(currentQuestion)
    try {
      const chatRes = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentQuestion }),
      })
      const chatData: ChatResp = await chatRes.json()

      if (!chatRes.ok) {
        throw new Error('chat failed')
      }

      setIntent(chatData.intent)
      setKnowledge(chatData.knowledge)
      setLead(chatData.lead)
      setAiAnswer(chatData.answer)
    } catch {
      setAiAnswer('系统处理失败，请稍后再试。')
    } finally {
      setLoading(false)
    }
  }

  const handleFeedback = async (feedbackType: '正确' | '错误' | '需要补充' | '转人工') => {
    if (!lastQuestion || !aiAnswer) {
      setActionNote('请先完成一次AI回答后再提交反馈')
      return
    }

    setFeedbackLoading(true)
    setActionNote('')
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: lastQuestion,
          ai_answer: aiAnswer,
          feedback_type: feedbackType,
          correction,
        }),
      })
      const data = await res.json()
      setActionNote(data?.message || (res.ok ? '反馈保存成功' : '反馈保存失败'))
      if (res.ok) {
        setCorrection('')
        await loadFeedbackRecords()
      }
    } catch {
      setActionNote('反馈保存失败，请稍后再试')
    } finally {
      setFeedbackLoading(false)
    }
  }

  const loadFeedbackRecords = async () => {
    try {
      const res = await fetch('/api/feedback', { cache: 'no-store' })
      const data = await res.json()
      setFeedbackRecords(Array.isArray(data?.feedback) ? data.feedback.slice(-5).reverse() : [])
    } catch {
      setFeedbackRecords([])
    }
  }

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-2xl p-6 border border-border/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 glow-blue">
            <BrainCircuit className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">企业服务AI资质顾问</h3>
            <p className="text-xs text-muted-foreground">本地规则 + 本地知识库模拟MVP</p>
          </div>
        </div>

        <div className="flex gap-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="请输入企业资质/工商财税问题，例如：重庆建筑公司资质升级怎么申请？"
            className="flex-1 rounded-xl bg-muted/40 border border-border/50 px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="px-4 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            {loading ? '处理中...' : '发送'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-5 border border-border/50 space-y-4">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><Bot className="h-4 w-4 text-primary" />AI回答展示</h4>
          <div className="rounded-xl bg-muted/40 border border-border/40 p-4 text-sm text-foreground min-h-[90px]">{aiAnswer || '等待用户提问...'}</div>
          {intent?.risk_level === 'high' && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
              当前回答仅为初步参考，需资质顾问人工确认。
            </div>
          )}
          {aiAnswer && (
            <div className="rounded-xl border border-border/40 bg-background/30 p-3 space-y-3">
              <textarea
                value={correction}
                onChange={(e) => setCorrection(e.target.value)}
                placeholder="人工修正内容，可选。错误或需要补充时建议填写。"
                className="min-h-[72px] w-full resize-none rounded-lg bg-muted/40 border border-border/50 px-3 py-2 text-xs text-foreground outline-none focus:ring-2 focus:ring-primary/40"
              />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <button disabled={feedbackLoading} onClick={() => handleFeedback('正确')} className="px-3 py-2 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary text-xs font-medium hover:bg-secondary/20 disabled:opacity-50 flex items-center justify-center gap-2"><ThumbsUp className="h-3.5 w-3.5" />正确</button>
                <button disabled={feedbackLoading} onClick={() => handleFeedback('错误')} className="px-3 py-2 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium hover:bg-destructive/20 disabled:opacity-50 flex items-center justify-center gap-2"><ThumbsDown className="h-3.5 w-3.5" />错误</button>
                <button disabled={feedbackLoading} onClick={() => handleFeedback('需要补充')} className="px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-xs font-medium hover:bg-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"><AlertTriangle className="h-3.5 w-3.5" />需要补充</button>
                <button disabled={feedbackLoading} onClick={() => handleFeedback('转人工')} className="px-3 py-2 rounded-lg bg-warning/10 border border-warning/20 text-warning text-xs font-medium hover:bg-warning/20 disabled:opacity-50 flex items-center justify-center gap-2"><UserCheck2 className="h-3.5 w-3.5" />转人工</button>
              </div>
              {actionNote && <p className="text-xs text-muted-foreground">{actionNote}</p>}
            </div>
          )}

          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><Search className="h-4 w-4 text-secondary" />知识命中卡片</h4>
          <div className="space-y-2">
            {knowledge?.results?.length ? knowledge.results.map((item) => (
              <div key={item.id} className="rounded-lg border border-border/40 bg-background/40 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-foreground font-medium">{item.title}</p>
                  <span className="text-xs text-secondary">{item.score}分</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.content}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3 text-xs">
                  <div className="rounded-md bg-muted/30 border border-border/30 px-2 py-1">命中知识：<span className="text-foreground">{item.title}</span></div>
                  <div className="rounded-md bg-muted/30 border border-border/30 px-2 py-1">更新时间：<span className="text-foreground">{item.updated_at}</span></div>
                  <div className="rounded-md bg-muted/30 border border-border/30 px-2 py-1">来源：<span className="text-foreground">{item.source}</span></div>
                </div>
              </div>
            )) : <div className="text-xs text-muted-foreground">暂无命中结果</div>}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-5 border border-border/50">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3"><CheckCircle2 className="h-4 w-4 text-cyan-400" />意图识别卡片</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-muted/30 p-3 border border-border/40">意图：<span className="text-foreground">{intent?.intent || '-'}</span></div>
              <div className="rounded-lg bg-muted/30 p-3 border border-border/40">业务：<span className="text-foreground">{intent?.business_category || '-'}</span></div>
              <div className="rounded-lg bg-muted/30 p-3 border border-border/40">地区：<span className="text-foreground">{intent?.region || '-'}</span></div>
              <div className="rounded-lg bg-muted/30 p-3 border border-border/40">紧急度：<span className="text-foreground">{intent?.urgency || '-'}</span></div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-border/50">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3"><BadgeAlert className="h-4 w-4 text-warning" />风险等级提示 / 是否转人工</h4>
            <div className="flex items-center gap-3 text-xs">
              <span className={cn('px-3 py-1.5 rounded-lg border', intent ? riskColor[intent.risk_level] : 'border-border/50 bg-muted/20 text-muted-foreground')}>
                风险：{intent?.risk_level || '-'}
              </span>
              <span className="px-3 py-1.5 rounded-lg border border-border/50 bg-muted/20 text-foreground">
                转人工：{intent ? (intent.need_human ? '是' : '否') : '-'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{intent?.reason || '暂无风控说明'}</p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-border/50">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3"><Target className="h-4 w-4 text-primary" />CRM线索评分卡片</h4>
            <div className="space-y-2 text-xs">
              <div>线索分：<span className="text-foreground font-semibold">{lead?.lead_score ?? '-'}</span></div>
              <div>等级：<span className="text-foreground font-semibold">{lead?.lead_level ?? '-'}</span></div>
              <div>推荐服务：<span className="text-foreground">{lead?.recommended_service ?? '-'}</span></div>
              <div>下一步：<span className="text-foreground">{lead?.next_action ?? '-'}</span></div>
              <div>销售话术：<span className="text-foreground">{lead?.sales_script ?? '-'}</span></div>
              <div className="flex flex-wrap gap-2 mt-2">{lead?.tags?.map((tag) => <span key={tag} className="px-2 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary">{tag}</span>)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl p-5 border border-border/50">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2"><ThumbsDown className="h-4 w-4 text-warning" />反馈回流列表</h4>
          <button onClick={loadFeedbackRecords} className="px-3 py-1.5 rounded-lg bg-muted/30 border border-border/40 text-xs text-muted-foreground hover:text-foreground">
            刷新反馈
          </button>
        </div>
        <div className="space-y-2">
          {feedbackRecords.length ? feedbackRecords.map((record) => (
            <div key={record.id || `${record.created_at}-${record.question}`} className="rounded-lg border border-border/40 bg-background/40 p-3 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-foreground font-medium">{record.feedback_type || record.feedback || '-'}</span>
                <span className="text-muted-foreground">{formatTime(record.created_at)}</span>
              </div>
              <p className="text-muted-foreground mt-1 line-clamp-1">问题：{record.question || '-'}</p>
              {(record.correction || record.feedback) && <p className="text-muted-foreground mt-1 line-clamp-1">修正：{record.correction || record.feedback}</p>}
            </div>
          )) : (
            <div className="text-xs text-muted-foreground">暂无反馈记录。点击“回答错误”后会写入 data/feedback.json，并可在这里查看。</div>
          )}
        </div>
      </div>

      {!aiAnswer && actionNote && (
        <div className="glass-card rounded-2xl p-4 border border-border/50">
          <p className="text-xs text-muted-foreground">{actionNote}</p>
        </div>
      )}
    </div>
  )
}

function formatTime(value?: string): string {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString('zh-CN', { hour12: false })
}
