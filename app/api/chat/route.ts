import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

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

async function postJson<T>(url: URL, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    throw new Error(`请求失败：${url.pathname}`)
  }

  return res.json() as Promise<T>
}

async function writeChatLog(params: {
  question: string
  intent: IntentResp
  knowledge: KnowledgeResp
  lead: LeadResp
  responseTimeMs: number
}) {
  const filePath = path.join(process.cwd(), 'data/logs.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  const logs = JSON.parse(raw) as unknown[]
  const matchedKnowledgeIds = params.knowledge.results.map((item) => item.id)

  logs.push({
    id: `LOG${String(logs.length + 1).padStart(3, '0')}`,
    timestamp: new Date().toISOString(),
    question: params.question,
    intent: params.intent.intent,
    matched_knowledge_ids: matchedKnowledgeIds,
    confidence: params.knowledge.confidence,
    risk_level: params.intent.risk_level,
    need_human: params.intent.need_human,
    lead_score: params.lead.lead_score,
    response_time_ms: params.responseTimeMs,
  })

  await fs.writeFile(filePath, `${JSON.stringify(logs, null, 2)}\n`, 'utf-8')
}

export async function POST(req: Request) {
  const startedAt = Date.now()

  try {
    const body = await req.json()
    const message = typeof body?.message === 'string' ? body.message.trim() : ''

    if (!message) {
      return NextResponse.json({ error: 'message 不能为空' }, { status: 400 })
    }

    const intent = await postJson<IntentResp>(new URL('/api/intent', req.url), { message })
    const knowledge = await postJson<KnowledgeResp>(new URL('/api/knowledge/search', req.url), {
      message,
      intent: intent.intent,
      region: intent.region,
    })
    const lead = await postJson<LeadResp>(new URL('/api/lead/score', req.url), {
      message,
      intent: intent.intent,
      region: intent.region,
      risk_level: intent.risk_level,
    })

    const top = knowledge.results?.[0]
    const answer = top ? `根据知识库命中：${top.content}` : '暂未命中明确知识，建议转人工进一步评估。'
    const responseTimeMs = Date.now() - startedAt

    await writeChatLog({
      question: message,
      intent,
      knowledge,
      lead,
      responseTimeMs,
    })

    return NextResponse.json({
      answer,
      intent,
      knowledge,
      lead,
      response_time_ms: responseTimeMs,
    })
  } catch {
    return NextResponse.json({ error: '聊天处理失败' }, { status: 500 })
  }
}
