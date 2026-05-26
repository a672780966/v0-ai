import { NextResponse } from 'next/server'

type IntentResult = {
  intent: '资质新办' | '资质升级' | '资质延期' | '工商财税' | '项目申报' | '其他'
  business_category: '建筑资质' | '财税' | '工商' | '咨询' | '其他'
  region: string
  urgency: '低' | '中' | '高'
  risk_level: 'low' | 'medium' | 'high'
  need_human: boolean
  reason: string
}

const regionPatterns: Array<{ name: string; pattern: RegExp }> = [
  { name: '北京', pattern: /(北京|京)/ },
  { name: '上海', pattern: /(上海|沪)/ },
  { name: '广东', pattern: /(广东|广州|深圳|粤)/ },
  { name: '浙江', pattern: /(浙江|杭州|宁波|温州|绍兴|嘉兴|金华)/ },
  { name: '江苏', pattern: /(江苏|南京|苏州|无锡|常州|南通)/ },
  { name: '山东', pattern: /(山东|济南|青岛|烟台|潍坊)/ },
  { name: '四川', pattern: /(四川|成都|绵阳|德阳)/ },
  { name: '重庆', pattern: /(重庆|渝)/ },
  { name: '湖北', pattern: /(湖北|武汉)/ },
  { name: '河南', pattern: /(河南|郑州)/ },
]

const highRiskKeywords = ['处罚', '罚款', '驳回', '复议', '诉讼', '稽查', '跨省', '到期', '逾期']
const highUrgencyKeywords = ['今天', '马上', '加急', '尽快', '本周', '明天', '截止', '到期']
const mediumUrgencyKeywords = ['近期', '这个月', '下个月', '安排', '计划']

function detectRegion(message: string): string {
  const hit = regionPatterns.find((item) => item.pattern.test(message))
  return hit ? hit.name : '未知'
}

function detectIntent(message: string): Pick<IntentResult, 'intent' | 'business_category'> {
  if (/(新办|首次申请|初次申请|新申请|办理资质)/.test(message)) {
    return { intent: '资质新办', business_category: '建筑资质' }
  }
  if (/(升级|升二级|升一级|增项|扩项)/.test(message)) {
    return { intent: '资质升级', business_category: '建筑资质' }
  }
  if (/(延期|续期|年审|到期|延续)/.test(message)) {
    return { intent: '资质延期', business_category: '建筑资质' }
  }
  if (/(报税|税务|发票|汇算清缴|增值税|所得税|财务|账务)/.test(message)) {
    return { intent: '工商财税', business_category: '财税' }
  }
  if (/(营业执照|工商变更|股权变更|注销|设立|注册公司)/.test(message)) {
    return { intent: '其他', business_category: '工商' }
  }
  if (/(项目申报|高新|专精特新|补贴|政府资金|政策申报)/.test(message)) {
    return { intent: '项目申报', business_category: '咨询' }
  }

  return { intent: '其他', business_category: '其他' }
}

function detectUrgency(message: string): '低' | '中' | '高' {
  if (highUrgencyKeywords.some((kw) => message.includes(kw))) return '高'
  if (mediumUrgencyKeywords.some((kw) => message.includes(kw))) return '中'
  return '低'
}

function evaluateRisk(message: string, intent: IntentResult['intent'], region: string): Pick<IntentResult, 'risk_level' | 'need_human' | 'reason'> {
  let score = 0
  const reasons: string[] = []

  if (highRiskKeywords.some((kw) => message.includes(kw))) {
    score += 2
    reasons.push('命中高风险关键词')
  }

  if (intent === '资质延期') {
    score += 1
    reasons.push('资质延期类问题存在时效风险')
  }

  if (intent === '项目申报') {
    score += 1
    reasons.push('项目申报依赖地区政策细则')
  }

  if (region === '未知') {
    score += 1
    reasons.push('未识别地区，政策适配不确定')
  }

  if (score >= 3) {
    return { risk_level: 'high', need_human: true, reason: reasons.join('；') }
  }
  if (score >= 2) {
    return { risk_level: 'medium', need_human: true, reason: reasons.join('；') }
  }

  return {
    risk_level: 'low',
    need_human: false,
    reason: reasons.length > 0 ? reasons.join('；') : '常规咨询，规则判断风险较低',
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const message = typeof body?.message === 'string' ? body.message.trim() : ''

    if (!message) {
      return NextResponse.json({ error: 'message 不能为空' }, { status: 400 })
    }

    const { intent, business_category } = detectIntent(message)
    const region = detectRegion(message)
    const urgency = detectUrgency(message)
    const { risk_level, need_human, reason } = evaluateRisk(message, intent, region)

    const result: IntentResult = {
      intent,
      business_category,
      region,
      urgency,
      risk_level,
      need_human,
      reason,
    }

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: '请求格式错误，请传入 JSON' }, { status: 400 })
  }
}
