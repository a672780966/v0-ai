import { NextResponse } from 'next/server'

type LeadScoreRequest = {
  message: string
  intent?: '资质新办' | '资质升级' | '资质延期' | '工商财税' | '项目申报' | '其他'
  region?: string
  risk_level?: 'low' | 'medium' | 'high'
}

type LeadScoreResponse = {
  lead_score: number
  lead_level: 'A' | 'B' | 'C'
  tags: string[]
  recommended_service: string
  next_action: string
  sales_script: string
}

function hasCompanyContext(message: string): boolean {
  return /(我们公司|本公司|企业|建筑公司|工程公司|公司目前|现有资质|人员|社保|业绩)/.test(message)
}

function hasStrongApplyIntent(message: string): boolean {
  return /(办理|需要|怎么申请|如何申请|申请流程|想办|代办)/.test(message)
}

function isTooGeneric(message: string): boolean {
  return message.length < 10 || /(介绍一下|说说|了解下|咨询下|有哪些|是什么)/.test(message)
}

function getServiceByIntent(intent: LeadScoreRequest['intent']): string {
  switch (intent) {
    case '资质升级':
      return '建筑资质升级咨询'
    case '资质新办':
      return '建筑资质新办咨询'
    case '资质延期':
      return '建筑资质延期与续期咨询'
    case '工商财税':
      return '工商财税合规咨询'
    case '项目申报':
      return '项目申报咨询服务'
    default:
      return '企业资质综合咨询'
  }
}

function getLeadLevel(score: number): 'A' | 'B' | 'C' {
  if (score >= 75) return 'A'
  if (score >= 50) return 'B'
  return 'C'
}

function getNextAction(level: 'A' | 'B' | 'C', riskLevel: LeadScoreRequest['risk_level']): string {
  if (level === 'A') {
    return riskLevel === 'high' ? '建议资深资质顾问30分钟内电话跟进并预审风险' : '建议资质顾问30分钟内跟进'
  }
  if (level === 'B') {
    return '建议2小时内完成首轮需求澄清并发送资料清单'
  }
  return '建议24小时内进行基础回访并补充需求信息'
}

function buildSalesScript(params: {
  intent: LeadScoreRequest['intent']
  region: string
  level: 'A' | 'B' | 'C'
  service: string
  message: string
}): string {
  const { intent, region, level, service } = params
  return `您好，我们已收到您关于「${intent || '企业资质'}」的咨询。基于您当前信息，推荐您优先使用「${service}」。${region !== '未知' ? `我们可按${region}当地口径协助梳理材料与流程。` : '为确保政策匹配，建议先确认办理地区。'}您当前线索评级为${level}级，我们可先安排一次15-30分钟快速评估，明确办理路径、周期与关键风险。`
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LeadScoreRequest
    const message = typeof body?.message === 'string' ? body.message.trim() : ''
    const intent = body?.intent || '其他'
    const region = typeof body?.region === 'string' && body.region.trim() ? body.region.trim() : '未知'
    const riskLevel = body?.risk_level || 'low'

    if (!message) {
      return NextResponse.json({ error: 'message 不能为空' }, { status: 400 })
    }

    let score = 30
    const tags = new Set<string>()

    if (intent === '资质升级' || intent === '资质新办') {
      score += 30
      tags.add(intent)
      tags.add('建筑企业')
    }

    if (region !== '未知') {
      score += 10
      tags.add(region)
    }

    if (hasCompanyContext(message)) {
      score += 15
      tags.add('企业信息明确')
    }

    if (hasStrongApplyIntent(message)) {
      score += 20
      tags.add('高意向')
    }

    if (riskLevel === 'high') {
      score += 10
      tags.add('高风险政策')
    }

    if (isTooGeneric(message)) {
      score -= 10
      tags.add('需求待澄清')
    }

    score = Math.max(0, Math.min(100, score))

    const leadLevel = getLeadLevel(score)
    const recommendedService = getServiceByIntent(intent)
    const nextAction = getNextAction(leadLevel, riskLevel)
    const salesScript = buildSalesScript({
      intent,
      region,
      level: leadLevel,
      service: recommendedService,
      message,
    })

    const result: LeadScoreResponse = {
      lead_score: score,
      lead_level: leadLevel,
      tags: Array.from(tags),
      recommended_service: recommendedService,
      next_action: nextAction,
      sales_script: salesScript,
    }

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: '请求格式错误，请传入 JSON' }, { status: 400 })
  }
}
