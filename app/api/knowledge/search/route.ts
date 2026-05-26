import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

type SearchRequest = {
  message: string
  intent?: string
  region?: string
}

type KnowledgeItem = {
  id: string
  category: string
  title: string
  question: string
  answer: string
  risk_level: 'low' | 'medium' | 'high'
  tags?: string[]
}

type SearchResult = {
  id: string
  title: string
  content: string
  score: number
  source: string
  updated_at: string
  risk_level: 'low' | 'medium' | 'high'
}

const intentCategoryMap: Record<string, string[]> = {
  资质新办: ['建筑资质'],
  资质升级: ['建筑资质'],
  资质延期: ['建筑资质'],
  工商财税: ['工商财税', '财税'],
  项目申报: ['企业服务'],
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\s,，。！？;；:：()（）/\\]+/)
    .map((w) => w.trim())
    .filter((w) => w.length >= 2)
}

function calcScore(item: KnowledgeItem, message: string, intent?: string, region?: string): number {
  let score = 0
  const tokens = tokenize(message)
  const titleText = `${item.title} ${item.question}`
  const answerText = item.answer

  for (const token of tokens) {
    if (titleText.includes(token)) score += 12
    if (answerText.includes(token)) score += 6
    if (item.tags?.some((tag) => tag.includes(token))) score += 8
  }

  if (intent) {
    const mappedCategories = intentCategoryMap[intent] || []
    if (mappedCategories.includes(item.category)) score += 28

    if (
      (intent === '资质升级' && /(升级|增项|扩项|升一级|升二级)/.test(titleText)) ||
      (intent === '资质新办' && /(新办|首次申请|初次申请)/.test(titleText)) ||
      (intent === '资质延期' && /(延期|续期|到期|延续)/.test(titleText)) ||
      (intent === '工商财税' && /(税|发票|财务|汇算清缴)/.test(titleText + answerText)) ||
      (intent === '项目申报' && /(申报|补贴|高新|专精特新)/.test(titleText + answerText))
    ) {
      score += 20
    }
  }

  if (region && region !== '未知') {
    if ((titleText + answerText).includes(region)) score += 12
    else score += 3
  }

  if (item.risk_level === 'high') score += 4
  if (item.risk_level === 'medium') score += 2

  return Math.min(score, 100)
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SearchRequest
    const message = typeof body?.message === 'string' ? body.message.trim() : ''
    const intent = typeof body?.intent === 'string' ? body.intent.trim() : ''
    const region = typeof body?.region === 'string' ? body.region.trim() : '未知'

    if (!message) {
      return NextResponse.json({ error: 'message 不能为空' }, { status: 400 })
    }

    const filePath = path.join(process.cwd(), 'data/knowledge/qualification.json')
    const raw = await fs.readFile(filePath, 'utf-8')
    const knowledge = JSON.parse(raw) as KnowledgeItem[]

    const ranked = knowledge
      .map((item) => ({
        item,
        score: calcScore(item, message, intent, region),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)

    const results: SearchResult[] = ranked.map(({ item, score }) => ({
      id: item.id,
      title: item.title,
      content: `${item.question}｜${item.answer}`,
      score,
      source: '模拟政策库',
      updated_at: '2026-05-26',
      risk_level: item.risk_level,
    }))

    const confidence = results.length > 0 ? Number((results[0].score / 100).toFixed(2)) : 0

    return NextResponse.json({ results, confidence })
  } catch {
    return NextResponse.json({ error: '检索失败，请检查请求或知识库文件' }, { status: 500 })
  }
}
