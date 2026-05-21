"use client"

import { 
  Users,
  Building2,
  ChevronRight,
  ChevronDown,
  Shield,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  Settings,
  Search,
  Plus,
  MoreHorizontal,
  Bot,
  Database,
  Headphones,
  Target,
  FileText,
  Eye,
  Edit3,
  Trash2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const departments = [
  {
    id: 'cs',
    name: '客服部',
    head: '张经理',
    members: 45,
    agents: ['客服Agent', '知识检索Agent'],
    expanded: true,
    teams: [
      { name: '在线客服组', members: 20, lead: '李组长' },
      { name: '电话客服组', members: 15, lead: '王组长' },
      { name: '售后服务组', members: 10, lead: '赵组长' },
    ]
  },
  {
    id: 'sales',
    name: '销售部',
    head: '李总监',
    members: 32,
    agents: ['销售Agent', '客户分析Agent'],
    expanded: false,
    teams: [
      { name: '大客户组', members: 12, lead: '陈组长' },
      { name: '渠道销售组', members: 12, lead: '刘组长' },
      { name: '商务拓展组', members: 8, lead: '周组长' },
    ]
  },
  {
    id: 'ops',
    name: '运营部',
    head: '王经理',
    members: 28,
    agents: ['内容Agent', '数据分析Agent'],
    expanded: false,
    teams: [
      { name: '用户运营组', members: 10, lead: '吴组长' },
      { name: '内容运营组', members: 10, lead: '郑组长' },
      { name: '活动策划组', members: 8, lead: '孙组长' },
    ]
  },
  {
    id: 'hr',
    name: 'HR部门',
    head: '陈经理',
    members: 12,
    agents: ['培训Agent', '招聘助手'],
    expanded: false,
    teams: [
      { name: '招聘组', members: 5, lead: '钱组长' },
      { name: '培训组', members: 4, lead: '冯组长' },
      { name: '薪酬绩效组', members: 3, lead: '韩组长' },
    ]
  },
  {
    id: 'tech',
    name: '技术部',
    head: '刘总监',
    members: 38,
    agents: ['代码助手', '运维Agent'],
    expanded: false,
    teams: [
      { name: '研发一组', members: 15, lead: '林组长' },
      { name: '研发二组', members: 13, lead: '何组长' },
      { name: '运维组', members: 10, lead: '罗组长' },
    ]
  },
]

const roles = [
  { 
    name: 'Admin', 
    description: '系统管理员，拥有全部权限', 
    users: 3,
    permissions: ['全部权限'],
    color: 'destructive'
  },
  { 
    name: 'Manager', 
    description: '部门经理，管理部门数据与人员', 
    users: 12,
    permissions: ['部门管理', '数据查看', 'Agent配置'],
    color: 'warning'
  },
  { 
    name: 'Employee', 
    description: '普通员工，使用AI功能', 
    users: 142,
    permissions: ['AI对话', '知识查询', '个人设置'],
    color: 'primary'
  },
  { 
    name: 'Guest', 
    description: '访客账户，受限访问', 
    users: 8,
    permissions: ['基础查询'],
    color: 'muted'
  },
]

const knowledgePermissions = [
  { 
    level: 'S0', 
    name: '核心机密', 
    description: '禁止外部访问，仅限高管', 
    docs: 128,
    color: 'destructive',
    icon: Lock
  },
  { 
    level: 'S1', 
    name: '内部数据', 
    description: '部门权限隔离，内部可见', 
    docs: 2456,
    color: 'warning',
    icon: Shield
  },
  { 
    level: 'S2', 
    name: '公开数据', 
    description: '客户可访问，对外开放', 
    docs: 8920,
    color: 'secondary',
    icon: Unlock
  },
]

export function OrganizationPage() {
  const [expandedDepts, setExpandedDepts] = useState<string[]>(['cs'])
  const [searchQuery, setSearchQuery] = useState('')

  const toggleDept = (deptId: string) => {
    setExpandedDepts(prev => 
      prev.includes(deptId) 
        ? prev.filter(id => id !== deptId)
        : [...prev, deptId]
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">组织架构</h1>
          <p className="text-sm text-muted-foreground mt-1">企业组织结构、权限管理与知识隔离</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl bg-muted/50 px-4 py-2.5 min-w-[200px] border border-border/50">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="搜索部门或人员..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
            />
          </div>
          <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Plus className="h-4 w-4" />
            新增部门
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: '部门总数', value: '5', icon: Building2, color: 'text-primary' },
          { title: '员工总数', value: '155', icon: Users, color: 'text-secondary' },
          { title: 'AI Agent', value: '10', icon: Bot, color: 'text-violet-400' },
          { title: '知识文档', value: '11.5K', icon: Database, color: 'text-orange-400' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="rounded-2xl bg-card border border-border/50 p-5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-muted/50 flex items-center justify-center">
                  <Icon className={cn("h-5 w-5", stat.color)} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Organization Tree */}
        <div className="xl:col-span-2 rounded-2xl bg-card border border-border/50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">组织架构图</h3>
                <p className="text-sm text-muted-foreground">企业部门与团队结构</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            {departments.map((dept) => (
              <div key={dept.id} className="rounded-xl border border-border/30 overflow-hidden">
                {/* Department Header */}
                <button
                  onClick={() => toggleDept(dept.id)}
                  className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "h-10 w-10 rounded-xl flex items-center justify-center",
                      "bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30"
                    )}>
                      <Building2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{dept.name}</span>
                        <span className="text-xs text-muted-foreground">({dept.members}人)</span>
                      </div>
                      <p className="text-sm text-muted-foreground">负责人: {dept.head}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2">
                      {dept.agents.map((agent, i) => (
                        <span key={i} className="px-2 py-1 rounded-lg bg-violet-500/10 text-violet-400 text-xs">
                          {agent}
                        </span>
                      ))}
                    </div>
                    {expandedDepts.includes(dept.id) ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {/* Teams */}
                {expandedDepts.includes(dept.id) && (
                  <div className="border-t border-border/30">
                    {dept.teams.map((team, i) => (
                      <div 
                        key={i}
                        className="flex items-center justify-between p-4 pl-14 hover:bg-muted/20 transition-colors border-b border-border/20 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-muted/50 flex items-center justify-center">
                            <Users className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{team.name}</p>
                            <p className="text-xs text-muted-foreground">{team.lead} · {team.members}人</p>
                          </div>
                        </div>
                        <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* RBAC Roles */}
          <div className="rounded-2xl bg-card border border-border/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-warning/10 flex items-center justify-center border border-warning/20">
                  <Shield className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">RBAC权限</h3>
                  <p className="text-sm text-muted-foreground">角色权限管理</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {roles.map((role, i) => (
                <div 
                  key={i}
                  className="rounded-xl bg-muted/30 border border-border/30 p-4 hover:border-warning/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-bold",
                        role.color === 'destructive' && "bg-destructive/20 text-destructive",
                        role.color === 'warning' && "bg-warning/20 text-warning",
                        role.color === 'primary' && "bg-primary/20 text-primary",
                        role.color === 'muted' && "bg-muted text-muted-foreground"
                      )}>
                        {role.name}
                      </span>
                      <span className="text-xs text-muted-foreground">{role.users}人</span>
                    </div>
                    <button className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{role.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((perm, j) => (
                      <span key={j} className="px-2 py-0.5 rounded text-xs bg-muted/50 text-muted-foreground">
                        {perm}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Knowledge Isolation */}
          <div className="rounded-2xl bg-card border border-border/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
                  <Database className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">知识隔离</h3>
                  <p className="text-sm text-muted-foreground">数据权限分级</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {knowledgePermissions.map((level, i) => {
                const Icon = level.icon
                return (
                  <div 
                    key={i}
                    className={cn(
                      "rounded-xl p-4 border",
                      level.color === 'destructive' && "bg-destructive/5 border-destructive/20",
                      level.color === 'warning' && "bg-warning/5 border-warning/20",
                      level.color === 'secondary' && "bg-secondary/5 border-secondary/20"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "h-8 w-8 rounded-lg flex items-center justify-center",
                        level.color === 'destructive' && "bg-destructive/20",
                        level.color === 'warning' && "bg-warning/20",
                        level.color === 'secondary' && "bg-secondary/20"
                      )}>
                        <Icon className={cn(
                          "h-4 w-4",
                          level.color === 'destructive' && "text-destructive",
                          level.color === 'warning' && "text-warning",
                          level.color === 'secondary' && "text-secondary"
                        )} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={cn(
                            "font-semibold",
                            level.color === 'destructive' && "text-destructive",
                            level.color === 'warning' && "text-warning",
                            level.color === 'secondary' && "text-secondary"
                          )}>
                            {level.level} - {level.name}
                          </span>
                          <span className="text-xs text-muted-foreground">{level.docs} 文档</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
