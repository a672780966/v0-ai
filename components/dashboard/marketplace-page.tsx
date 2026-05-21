"use client"

import { 
  Store, 
  Search,
  Headphones,
  Brain,
  Target,
  GraduationCap,
  FileText,
  Wand2,
  Download,
  Star,
  Users,
  ArrowRight,
  Sparkles,
  Filter
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const categories = ['全部', 'AI客服', '销售赋能', '员工效率', '知识管理', '内容生成']

const workflowTemplates = [
  {
    id: 1,
    title: 'AI智能客服',
    description: '多轮对话、知识库检索、人工转接一体化解决方案',
    category: 'AI客服',
    icon: Headphones,
    color: 'blue',
    downloads: '12.8K',
    rating: 4.9,
    tags: ['RAG', '多轮对话', '人工协同'],
    isHot: true,
  },
  {
    id: 2,
    title: '企业知识助手',
    description: '企业内部知识库智能问答，支持权限隔离与溯源',
    category: '知识管理',
    icon: Brain,
    color: 'green',
    downloads: '9.2K',
    rating: 4.8,
    tags: ['知识图谱', '权限管理', '溯源'],
    isHot: true,
  },
  {
    id: 3,
    title: '销售Copilot',
    description: '客户画像分析、跟进建议、话术推荐全流程赋能',
    category: '销售赋能',
    icon: Target,
    color: 'orange',
    downloads: '7.5K',
    rating: 4.7,
    tags: ['客户画像', '智能推荐', 'CRM集成'],
    isNew: true,
  },
  {
    id: 4,
    title: '新人培训系统',
    description: 'SOP学习路径、案例模拟、智能考核一站式培训',
    category: '员工效率',
    icon: GraduationCap,
    color: 'purple',
    downloads: '5.3K',
    rating: 4.6,
    tags: ['SOP', '模拟训练', '考核评估'],
    isNew: true,
  },
  {
    id: 5,
    title: '合同智能审核',
    description: '合同风险识别、条款校验、智能修改建议',
    category: '知识管理',
    icon: FileText,
    color: 'cyan',
    downloads: '4.1K',
    rating: 4.5,
    tags: ['风险识别', 'OCR', '法务审核'],
  },
  {
    id: 6,
    title: '内容生成Pipeline',
    description: '多模态内容生成、品牌风格统一、批量输出',
    category: '内容生成',
    icon: Wand2,
    color: 'pink',
    downloads: '6.8K',
    rating: 4.7,
    tags: ['多模态', '品牌一致', '批量生成'],
  },
]

const colorClasses: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20', glow: 'shadow-[0_0_20px_rgba(59,130,246,0.2)]' },
  green: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20', glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]' },
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20', glow: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]' },
  purple: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20', glow: 'shadow-[0_0_20px_rgba(139,92,246,0.2)]' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/20', glow: 'shadow-[0_0_20px_rgba(6,182,212,0.2)]' },
  pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20', glow: 'shadow-[0_0_20px_rgba(236,72,153,0.2)]' },
}

export function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('全部')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTemplates = workflowTemplates.filter(t => {
    const matchesCategory = selectedCategory === '全部' || t.category === selectedCategory
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI工作流模板市场</h1>
          <p className="text-sm text-muted-foreground mt-1">企业级AI场景解决方案，一键部署开箱即用</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-4 py-2.5 min-w-[240px] border border-border/50">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="搜索工作流模板..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
            />
          </div>
          <button className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            发布模板
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Filter className="h-4 w-4 text-muted-foreground mr-2" />
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all",
              selectedCategory === category
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Featured Section */}
      <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 border border-primary/20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30">
              <Store className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">本月精选</h3>
              <p className="text-sm text-muted-foreground">AI智能客服模板 - 已被 1,280+ 企业部署使用</p>
            </div>
          </div>
          <button className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
            立即查看
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredTemplates.map(template => {
          const Icon = template.icon
          const colors = colorClasses[template.color]
          return (
            <div 
              key={template.id}
              className={cn(
                "group relative rounded-2xl bg-card border border-border/50 p-5 transition-all duration-300",
                "hover:border-primary/30 hover:scale-[1.02]",
                colors.glow
              )}
            >
              {/* Badges */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                {template.isHot && (
                  <span className="px-2 py-1 rounded-lg bg-destructive/20 text-destructive text-xs font-medium">
                    热门
                  </span>
                )}
                {template.isNew && (
                  <span className="px-2 py-1 rounded-lg bg-secondary/20 text-secondary text-xs font-medium">
                    新品
                  </span>
                )}
              </div>

              {/* Icon & Title */}
              <div className="flex items-start gap-4 mb-4">
                <div className={cn(
                  "h-12 w-12 rounded-xl flex items-center justify-center border",
                  colors.bg, colors.border
                )}>
                  <Icon className={cn("h-6 w-6", colors.text)} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-foreground mb-1">{template.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {template.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats & Action */}
              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Download className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{template.downloads}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    <span className="text-sm text-foreground font-medium">{template.rating}</span>
                  </div>
                </div>
                <button className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  "bg-muted/50 text-foreground hover:bg-primary hover:text-primary-foreground"
                )}>
                  部署
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        {[
          { label: '模板总数', value: '86+', icon: Store },
          { label: '企业部署', value: '5,200+', icon: Users },
          { label: '平均评分', value: '4.7', icon: Star },
          { label: '节省工时', value: '120万h+', icon: Sparkles },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="rounded-xl bg-muted/30 p-4 text-center border border-border/30">
              <Icon className="h-5 w-5 text-primary mx-auto mb-2" />
              <div className="text-xl font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
