"use client"

import { 
  ShieldCheck, 
  Users, 
  ScrollText, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  Edit3,
  Trash2,
  UserCog,
  Lock,
  FileText
} from 'lucide-react'
import { cn } from '@/lib/utils'

const roles = [
  { 
    name: 'Admin', 
    users: 3,
    permissions: ['全部权限'],
    color: 'red'
  },
  { 
    name: 'Manager', 
    users: 12,
    permissions: ['查看', '编辑', '审批'],
    color: 'orange'
  },
  { 
    name: 'Employee', 
    users: 156,
    permissions: ['查看', '使用'],
    color: 'blue'
  },
  { 
    name: 'Customer', 
    users: 2341,
    permissions: ['受限访问'],
    color: 'green'
  },
]

const auditItems = [
  { title: 'Prompt审计', count: '12,456', status: 'active', icon: Eye },
  { title: '知识召回记录', count: '89,234', status: 'active', icon: FileText },
  { title: 'Agent行为日志', count: '456,123', status: 'active', icon: ScrollText },
  { title: '敏感词拦截', count: '234', status: 'warning', icon: AlertTriangle },
  { title: '人工修改记录', count: '1,234', status: 'active', icon: Edit3 },
]

const recentLogs = [
  { time: '14:32:45', user: '张三', action: '访问知识库', module: 'RAG', status: 'success' },
  { time: '14:32:41', user: 'Agent-01', action: '调用GPT-4', module: 'Runtime', status: 'success' },
  { time: '14:32:38', user: '李四', action: '敏感词触发', module: 'Security', status: 'blocked' },
  { time: '14:32:35', user: '王五', action: '修改知识条目', module: 'Knowledge', status: 'success' },
  { time: '14:32:30', user: 'System', action: '自动备份', module: 'System', status: 'success' },
]

const colorMap: Record<string, { text: string; bg: string; border: string }> = {
  red: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  orange: { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  green: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
}

export function GovernanceSecurityPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">数据治理与安全</h1>
        <p className="text-sm text-muted-foreground mt-1">权限管理、审计日志与安全控制</p>
      </div>

      {/* RBAC Section */}
      <div className="rounded-2xl bg-card border border-border/50 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
            <UserCog className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">角色权限管理 (RBAC)</h3>
            <p className="text-sm text-muted-foreground">用户角色与访问控制配置</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map((role) => {
            const colors = colorMap[role.color]
            return (
              <div 
                key={role.name}
                className={cn(
                  "rounded-xl p-5 border transition-all hover:scale-[1.02]",
                  colors.bg, colors.border
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={cn("text-lg font-bold", colors.text)}>{role.name}</span>
                  <Users className={cn("h-5 w-5", colors.text)} />
                </div>
                <p className="text-sm text-muted-foreground mb-3">{role.users} 用户</p>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.map((perm) => (
                    <span 
                      key={perm}
                      className="px-2 py-0.5 rounded text-xs bg-muted/50 text-muted-foreground"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Audit Items */}
      <div className="rounded-2xl bg-card border border-border/50 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20">
            <ScrollText className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">审计日志概览</h3>
            <p className="text-sm text-muted-foreground">系统操作与安全事件追踪</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {auditItems.map((item) => {
            const Icon = item.icon
            const isWarning = item.status === 'warning'
            return (
              <div 
                key={item.title}
                className={cn(
                  "rounded-xl p-4 border transition-all",
                  "bg-gradient-to-br from-muted/30 to-transparent",
                  isWarning ? "border-orange-500/30" : "border-border/50"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <Icon className={cn("h-5 w-5", isWarning ? "text-orange-400" : "text-muted-foreground")} />
                  {isWarning && <AlertTriangle className="h-4 w-4 text-orange-400" />}
                </div>
                <p className="text-xs text-muted-foreground mb-1">{item.title}</p>
                <p className={cn("text-xl font-bold", isWarning ? "text-orange-400" : "text-foreground")}>{item.count}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Logs */}
      <div className="rounded-2xl bg-card border border-border/50 backdrop-blur-sm overflow-hidden">
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Eye className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">实时审计流</h3>
              <p className="text-sm text-muted-foreground">最近系统操作记录</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">时间</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">用户</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">操作</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">模块</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-4 py-3">状态</th>
              </tr>
            </thead>
            <tbody>
              {recentLogs.map((log, index) => (
                <tr key={index} className={cn("border-b border-border/30 hover:bg-muted/20 transition-colors", index === recentLogs.length - 1 && "border-b-0")}>
                  <td className="px-4 py-3">
                    <span className="text-sm text-muted-foreground font-mono">{log.time}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-foreground">{log.user}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-foreground">{log.action}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 rounded-lg text-xs bg-muted/50 text-muted-foreground">{log.module}</span>
                  </td>
                  <td className="px-4 py-3">
                    {log.status === 'success' ? (
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-secondary" />
                        <span className="text-sm text-secondary">成功</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <XCircle className="h-4 w-4 text-orange-400" />
                        <span className="text-sm text-orange-400">拦截</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
