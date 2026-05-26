import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

type ChatLogRecord = {
  id: string
  timestamp: string
  question: string
  intent: string
  matched_knowledge_ids: string[]
  confidence: number
  risk_level: 'low' | 'medium' | 'high'
  need_human: boolean
  lead_score: number
  response_time_ms: number
}

const logsPath = () => path.join(process.cwd(), 'data/logs.json')

async function readLogs(): Promise<unknown[]> {
  const raw = await fs.readFile(logsPath(), 'utf-8')
  return JSON.parse(raw) as unknown[]
}

export async function GET() {
  try {
    const logs = await readLogs()
    return NextResponse.json({ logs })
  } catch {
    return NextResponse.json({ error: '读取日志失败' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const logs = await readLogs()

    const record: ChatLogRecord = {
      id: `LOG${String(logs.length + 1).padStart(3, '0')}`,
      timestamp: new Date().toISOString(),
      question: typeof body?.question === 'string' ? body.question : '',
      intent: typeof body?.intent === 'string' ? body.intent : '其他',
      matched_knowledge_ids: Array.isArray(body?.matched_knowledge_ids) ? body.matched_knowledge_ids : [],
      confidence: typeof body?.confidence === 'number' ? body.confidence : 0,
      risk_level: body?.risk_level === 'high' || body?.risk_level === 'medium' ? body.risk_level : 'low',
      need_human: Boolean(body?.need_human),
      lead_score: typeof body?.lead_score === 'number' ? body.lead_score : 0,
      response_time_ms: typeof body?.response_time_ms === 'number' ? body.response_time_ms : 0,
    }

    if (!record.question) {
      return NextResponse.json({ error: 'question 不能为空' }, { status: 400 })
    }

    logs.push(record)
    await fs.writeFile(logsPath(), `${JSON.stringify(logs, null, 2)}\n`, 'utf-8')

    return NextResponse.json({ success: true, message: '日志保存成功', log: record })
  } catch {
    return NextResponse.json({ error: '日志保存失败' }, { status: 400 })
  }
}
