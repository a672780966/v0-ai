"use client"

import { 
  LayoutDashboard, 
  Database, 
  Bot, 
  Headphones, 
  ShieldCheck, 
  Workflow, 
  ScrollText, 
  Settings,
  ChevronLeft,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDashboardStore } from '@/lib/store'

const navItems = [
  { title: 'AI工作台', icon: LayoutDashboard },
  { title: '知识中台', icon: Database },
  { title: 'Agent管理', icon: Bot },
  { title: 'AI客服', icon: Headphones },
  { title: '数据治理', icon: ShieldCheck },
  { title: '工作流', icon: Workflow },
  { title: '日志中心', icon: ScrollText },
  { title: '系统设置', icon: Settings },
]

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen, activeNav, setActiveNav } = useDashboardStore()

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out",
        "bg-sidebar border-r border-sidebar-border",
        sidebarOpen ? "w-[280px]" : "w-[72px]"
      )}
    >
      {/* Logo Area */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 glow-blue">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          {sidebarOpen && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground">AI Command</span>
              <span className="text-xs text-muted-foreground">企业智能中枢</span>
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
      <nav className="flex flex-col gap-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeNav === item.title
          return (
            <button
              key={item.title}
              onClick={() => setActiveNav(item.title)}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200",
                "hover:bg-sidebar-accent group",
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
            </button>
          )
        })}
      </nav>

      {/* Bottom Section */}
      {sidebarOpen && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 p-4 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-xs text-muted-foreground">系统状态</span>
            </div>
            <div className="text-sm font-medium text-foreground">所有服务正常运行</div>
            <div className="text-xs text-muted-foreground mt-1">最后检查: 10秒前</div>
          </div>
        </div>
      )}
    </aside>
  )
}
