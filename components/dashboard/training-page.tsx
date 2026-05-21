"use client"

import { 
  GraduationCap,
  BookOpen,
  Play,
  CheckCircle2,
  Clock,
  Award,
  Target,
  TrendingUp,
  Users,
  ChevronRight,
  Star,
  Sparkles,
  FileText,
  Video,
  MessageSquare,
  BarChart3
} from 'lucide-react'
import { cn } from '@/lib/utils'

const learningPaths = [
  {
    id: 1,
    title: '新员工入职培训',
    description: '企业文化、制度流程、基础技能全覆盖',
    progress: 75,
    totalModules: 12,
    completedModules: 9,
    duration: '8小时',
    level: '入门',
    students: 128,
  },
  {
    id: 2,
    title: '客服技能提升',
    description: '沟通技巧、产品知识、问题处理能力培养',
    progress: 45,
    totalModules: 8,
    completedModules: 4,
    duration: '6小时',
    level: '进阶',
    students: 86,
  },
  {
    id: 3,
    title: '销售实战训练',
    description: '客户开发、谈判技巧、成交策略系统学习',
    progress: 20,
    totalModules: 10,
    completedModules: 2,
    duration: '10小时',
    level: '高级',
    students: 64,
  },
]

const simulationScenarios = [
  {
    title: '客户投诉处理',
    type: '案例模拟',
    difficulty: '中等',
    duration: '15分钟',
    aiScore: 92,
    completions: 342,
  },
  {
    title: '产品演示讲解',
    type: '角色扮演',
    difficulty: '困难',
    duration: '20分钟',
    aiScore: 88,
    completions: 256,
  },
  {
    title: '价格谈判技巧',
    type: '情景模拟',
    difficulty: '困难',
    duration: '25分钟',
    aiScore: 85,
    completions: 198,
  },
]

const faqTopics = [
  { topic: '产品功能咨询', count: 1280, trend: '+12%' },
  { topic: '价格与付款', count: 856, trend: '+8%' },
  { topic: '售后服务', count: 642, trend: '+5%' },
  { topic: '技术支持', count: 524, trend: '+15%' },
]

export function TrainingSystemPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI培训系统</h1>
          <p className="text-sm text-muted-foreground mt-1">智能化员工培训与技能提升平台</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-muted/50 text-sm font-medium text-foreground hover:bg-muted transition-colors flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            学习报告
          </button>
          <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            AI推荐课程
          </button>
        </div>
      </div>

      {/* Training Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: '学习时长', value: '42.5h', subtext: '本月累计', icon: Clock, color: 'text-primary' },
          { title: '完成课程', value: '18', subtext: '门', icon: CheckCircle2, color: 'text-secondary' },
          { title: '技能评分', value: '92', subtext: '平均分', icon: Award, color: 'text-orange-400' },
          { title: '排名提升', value: '+15', subtext: '本周', icon: TrendingUp, color: 'text-violet-400' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="rounded-2xl bg-card border border-border/50 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center">
                  <Icon className={cn("h-5 w-5", stat.color)} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className={cn("text-2xl font-bold", stat.color)}>{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.subtext}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Learning Paths */}
        <div className="xl:col-span-2 space-y-6">
          <div className="rounded-2xl bg-card border border-border/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">学习路径</h3>
                  <p className="text-sm text-muted-foreground">个性化SOP学习计划</p>
                </div>
              </div>
              <button className="text-sm text-primary hover:text-primary/80 flex items-center gap-1">
                全部课程 <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              {learningPaths.map((path) => (
                <div 
                  key={path.id}
                  className="rounded-xl bg-muted/30 border border-border/30 p-4 hover:border-primary/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{path.title}</h4>
                        <span className={cn(
                          "px-2 py-0.5 rounded text-xs font-medium",
                          path.level === '入门' && "bg-secondary/20 text-secondary",
                          path.level === '进阶' && "bg-primary/20 text-primary",
                          path.level === '高级' && "bg-violet-500/20 text-violet-400"
                        )}>
                          {path.level}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{path.description}</p>
                    </div>
                    <button className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      继续
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {path.duration}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      {path.completedModules}/{path.totalModules} 模块
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {path.students} 人学习
                    </div>
                  </div>

                  <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                      style={{ width: `${path.progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-xs text-muted-foreground">进度</span>
                    <span className="text-xs text-foreground font-medium">{path.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simulation Training */}
          <div className="rounded-2xl bg-card border border-border/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                  <Video className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">案例模拟训练</h3>
                  <p className="text-sm text-muted-foreground">AI驱动的情景模拟与评估</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {simulationScenarios.map((scenario, i) => (
                <div 
                  key={i}
                  className="rounded-xl bg-muted/30 border border-border/30 p-4 hover:border-orange-500/30 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-muted text-muted-foreground">
                      {scenario.type}
                    </span>
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      scenario.difficulty === '中等' && "bg-warning/20 text-warning",
                      scenario.difficulty === '困难' && "bg-destructive/20 text-destructive"
                    )}>
                      {scenario.difficulty}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{scenario.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {scenario.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {scenario.completions}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-warning fill-warning" />
                      <span className="text-sm font-medium text-foreground">AI评分 {scenario.aiScore}</span>
                    </div>
                    <button className="p-2 rounded-lg bg-orange-500/10 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* FAQ Auto Learning */}
          <div className="rounded-2xl bg-card border border-border/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
                <MessageSquare className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">FAQ自动学习</h3>
                <p className="text-sm text-muted-foreground">热门问题智能汇总</p>
              </div>
            </div>

            <div className="space-y-3">
              {faqTopics.map((faq, i) => (
                <div 
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-muted-foreground">#{i + 1}</span>
                    <span className="text-sm text-foreground">{faq.topic}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{faq.count}次</span>
                    <span className="text-xs text-secondary">{faq.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-2.5 rounded-xl bg-secondary/10 text-secondary text-sm font-medium hover:bg-secondary/20 transition-colors flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" />
              生成学习材料
            </button>
          </div>

          {/* Achievements */}
          <div className="rounded-2xl bg-card border border-border/50 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                <Award className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">学习成就</h3>
                <p className="text-sm text-muted-foreground">已获得 8 个徽章</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {['金牌客服', '销售之星', '快速学习', '完美出勤', '知识达人', '团队贡献', '创新先锋', '???'].map((badge, i) => (
                <div 
                  key={i}
                  className={cn(
                    "aspect-square rounded-xl flex items-center justify-center",
                    i < 7 ? "bg-gradient-to-br from-violet-500/20 to-primary/20 border border-violet-500/30" : "bg-muted/30 border border-border/30"
                  )}
                >
                  {i < 7 ? (
                    <Award className="h-6 w-6 text-violet-400" />
                  ) : (
                    <span className="text-lg text-muted-foreground">?</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Team Ranking */}
          <div className="rounded-2xl bg-card border border-border/50 p-6">
            <h3 className="text-base font-semibold text-foreground mb-4">团队学习排行</h3>
            <div className="space-y-3">
              {[
                { name: '张明', dept: '客服部', hours: 48, rank: 1 },
                { name: '李华', dept: '销售部', hours: 42, rank: 2 },
                { name: '王芳', dept: '运营部', hours: 38, rank: 3 },
              ].map((member, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                >
                  <span className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold",
                    member.rank === 1 && "bg-warning/20 text-warning",
                    member.rank === 2 && "bg-muted text-foreground",
                    member.rank === 3 && "bg-orange-500/20 text-orange-400"
                  )}>
                    {member.rank}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.dept}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">{member.hours}h</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
