"use client"

import { 
  BarChart3,
  Workflow, 
  Database, 
  Bot, 
  Headphones, 
  Sparkles,
  ShieldCheck, 
  ScrollText, 
  Settings,
  ChevronLeft,
  Zap,
  Store,
  Users,
  GraduationCap,
  Target
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDashboardStore } from '@/lib/store'

const navGroups = [
  {
    title: '经营中心',
    items: [
      { title: '经营总览', icon: BarChart3, route: 'executive' },
      { title: 'AI工作流', icon: Workflow, route: 'workflow' },
      { title: '模板市场', icon: Store, route: 'marketplace' },
    ]
  },
  {
    title: '业务场景',
    items: [
      { title: 'AI客服中心', icon: Headphones, route: 'customer-service' },
      { title: '销售Copilot', icon: Target, route: 'sales' },
      { title: '员工Copilot', icon: Sparkles, route: 'copilot' },
      { title: '培训系统', icon: GraduationCap, route: 'training' },
    ]
  },
  {
    title: 'AI中台',
    items: [
      { title: '知识中台', icon: Database, route: 'knowledge' },
      { title: 'Agent协同', icon: Bot, route: 'agents' },
    ]
  },
  {
    title: '系统管理',
    items: [
      { title: '组织架构', icon: Users, route: 'organization' },
      { title: '数据治理', icon: ShieldCheck, route: 'governance' },
      { title: '日志监控', icon: ScrollText, route: 'logs' },
      { title: '系统设置', icon: Settings, route: 'settings' },
    ]
  }
]

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen, activeNav, setActiveNav, setCurrentPage } = useDashboardStore()

  const handleNavClick = (title: string, route: string) => {
    setActiveNav(title)
    setCurrentPage(route)
  }

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out",
        "bg-sidebar border-r border-sidebar-border backdrop-blur-xl",
        sidebarOpen ? "w-[280px]" : "w-[72px]"
      )}
    >
      {/* Logo Area */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 glow-blue">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          {sidebarOpen && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">AI Operating</span>
              <span className="text-xs text-muted-foreground">企业智能操作系统</span>
            </div>
          )}
        </div>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            "bg-muted/50 hover:bg-muted transition-colors",
            !sidebarOpen && "rotate-180"
          )}
        >
          <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3 overflow-y-auto max-h-[calc(100vh-180px)]">
        {navGroups.map((group, groupIndex) => (
          <div key={group.title} className={cn(groupIndex > 0 && "mt-4")}>
            {sidebarOpen && (
              <div className="px-3 mb-2">
                <span className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wider">
                  {group.title}
                </span>
              </div>
            )}
            {!sidebarOpen && groupIndex > 0 && (
              <div className="h-px bg-border/50 mx-3 my-2" />
            )}
            <div className="flex flex-col gap-1">
              {group.items.map((item) => {
                const Icon = item.icon
                const isActive = activeNav === item.title
                return (
                  <button
                    key={item.title}
                    onClick={() => handleNavClick(item.title, item.route)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200",
                      "hover:bg-sidebar-accent group relative",
                      isActive && "bg-primary/10 border border-primary/20 glow-blue"
                    )}
                  >
                    <Icon 
                      className={cn(
                        "h-5 w-5 shrink-0 transition-colors",
                        isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                      )} 
                    />
                    {sidebarOpen && (
                      <span 
                        className={cn(
                          "text-sm font-medium transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                        )}
                      >
                        {item.title}
                      </span>
                    )}
                    {isActive && sidebarOpen && (
                      <div className="ml-auto h-2 w-2 rounded-full bg-primary pulse-glow" />
                    )}
                    {!sidebarOpen && isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom Section */}
      {sidebarOpen && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="rounded-xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-4 border border-primary/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs text-muted-foreground">系统状态</span>
            </div>
            <div className="text-sm font-medium text-foreground">所有AI服务正常运行</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="text-center p-2 rounded-lg bg-background/50">
                <div className="text-lg font-bold text-primary">128</div>
                <div className="text-xs text-muted-foreground">Agent在线</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-background/50">
                <div className="text-lg font-bold text-secondary">92.7%</div>
                <div className="text-xs text-muted-foreground">知识命中</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
