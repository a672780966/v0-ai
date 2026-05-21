"use client"

import { Search, Bell, User, Sparkles, ChevronDown, Menu, Clock, TrendingUp, Building2 } from 'lucide-react'
import { useDashboardStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const departments = ['全部', '客服部', '销售部', '运营部', 'HR', '技术部']

export function Topbar() {
  const { sidebarOpen, setSidebarOpen, notifications, aiStatus, activeNav, selectedDepartment, setSelectedDepartment } = useDashboardStore()

  return (
    <header 
      className={cn(
        "fixed top-0 right-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-xl transition-all duration-300",
        sidebarOpen ? "left-[280px]" : "left-[72px]"
      )}
    >
      <div className="flex h-full items-center justify-between px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 hover:bg-muted transition-colors"
          >
            <Menu className="h-5 w-5 text-muted-foreground" />
          </button>

          {/* Current Page Title */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-lg font-semibold text-foreground">{activeNav}</span>
          </div>
          
          {/* Global Search */}
          <div className="hidden md:flex items-center gap-2 rounded-xl bg-muted/50 px-4 py-2.5 min-w-[280px] border border-transparent hover:border-primary/20 transition-colors">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="搜索Agent、知识库、工作流..."
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
            />
            <kbd className="hidden lg:inline-flex h-5 items-center rounded bg-muted px-1.5 text-xs text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Department Filter */}
          <div className="hidden lg:flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <select 
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="bg-muted/50 border border-border/50 rounded-lg px-3 py-1.5 text-sm text-foreground outline-none focus:border-primary/50 cursor-pointer"
            >
              {departments.map(dept => (
                <option key={dept} value={dept} className="bg-background">{dept}</option>
              ))}
            </select>
          </div>

          {/* Business Quick Stats */}
          <div className="hidden xl:flex items-center gap-4 mx-4 px-4 py-1.5 rounded-xl bg-muted/30 border border-border/30">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-xs text-muted-foreground">今日节省</span>
              <span className="text-sm font-semibold text-primary">142h</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-secondary" />
              <span className="text-xs text-muted-foreground">转化率</span>
              <span className="text-sm font-semibold text-secondary">+18.2%</span>
            </div>
          </div>

          {/* AI Status */}
          <div className="hidden md:flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2 border border-primary/20">
            <div className={cn(
              "h-2 w-2 rounded-full",
              aiStatus === 'online' && "bg-secondary animate-pulse",
              aiStatus === 'processing' && "bg-warning animate-pulse",
              aiStatus === 'offline' && "bg-destructive"
            )} />
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-foreground">
              {aiStatus === 'online' && 'AI在线'}
              {aiStatus === 'processing' && 'AI处理中'}
              {aiStatus === 'offline' && 'AI离线'}
            </span>
          </div>

          {/* Notifications */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50 hover:bg-muted transition-colors">
            <Bell className="h-5 w-5 text-muted-foreground" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-medium text-destructive-foreground">
                {notifications > 9 ? '9+' : notifications}
              </span>
            )}
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-2 rounded-xl bg-muted/50 px-3 py-2 hover:bg-muted transition-colors">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="hidden md:flex flex-col items-start">
              <span className="text-sm font-medium text-foreground">张经理</span>
              <span className="text-xs text-muted-foreground">运营部</span>
            </div>
            <ChevronDown className="hidden md:block h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  )
}
