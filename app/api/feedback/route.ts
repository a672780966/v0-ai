import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

type FeedbackType = '正确' | '错误' | '需要补充' | '转人工'

type FeedbackRecord = {
  id: string
  created_at: string
  session_id: string
  question: string
  ai_answer: string
  feedback_type: FeedbackType
  correction: string
  ai_answer_quality: number
  risk_flag: boolean
  needs_human: boolean
  feedback: string
  knowledge_writeback: boolean
  tags: string[]
}

const validFeedbackTypes: FeedbackType[] = ['正确', '错误', '需要补充', '转人工']
const globalStore = globalThis as typeof globalThis & { __mvpFeedback?: FeedbackRecord[] }
const feedbackPath = () => path.join(process.cwd(), 'data/feedback.json')

async function readFeedback(): Promise<FeedbackRecord[]> {
  try {
    const raw = await fs.readFile(feedbackPath(), 'utf-8')
    return [...(JSON.parse(raw) as FeedbackRecord[]), ...(globalStore.__mvpFeedback ?? [])]
  } catch {
    return globalStore.__mvpFeedback ?? []
  }
}

function buildRecord(body: Record<string, unknown>, index: number): FeedbackRecord {
  const feedbackType = typeof body.feedback_type === 'string' && validFeedbackTypes.includes(body.feedback_type as FeedbackType)
    ? body.feedback_type as FeedbackType
    : null

  if (!feedbackType) {
    throw new Error('feedback_type 无效')
  }

  const question = typeof body.question === 'string' ? body.question.trim() : ''
  const aiAnswer = typeof body.ai_answer === 'string' ? body.ai_answer.trim() : ''
  const correction = typeof body.correction === 'string' ? body.correction.trim() : ''

  if (!question || !aiAnswer) {
    throw new Error('question 和 ai_answer 不能为空')
  }

  const needsHuman = feedbackType === '转人工'
  const knowledgeWriteback = feedbackType === '错误' || feedbackType === '需要补充'
  const qualityMap: Record<FeedbackType, number> = {
    正确: 5,
    错误: 1,
    需要补充: 3,
    转人工: 2,
  }

  return {
    id: `FB${String(index + 1).padStart(3, '0')}`,
    created_at: new Date().toISOString(),
    session_id: `S-${Date.now()}`,
    question,
    ai_answer: aiAnswer,
    feedback_type: feedbackType,
    correction,
    ai_answer_quality: qualityMap[feedbackType],
    risk_flag: needsHuman || feedbackType === '错误',
    needs_human: needsHuman,
    feedback: correction || feedbackType,
    knowledge_writeback: knowledgeWriteback,
    tags: [feedbackType, ...(needsHuman ? ['人工介入'] : [])],
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const records = await readFeedback()
    const record = buildRecord(body, records.length)
    const nextRecords = [...records, record]

    try {
      await fs.writeFile(feedbackPath(), `${JSON.stringify(nextRecords, null, 2)}\n`, 'utf-8')
    } catch {
      globalStore.__mvpFeedback = nextRecords
    }

    return NextResponse.json({
      success: true,
      message: '反馈保存成功',
      feedback: record,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : '反馈保存失败' },
      { status: 400 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ feedback: await readFeedback() })
}
