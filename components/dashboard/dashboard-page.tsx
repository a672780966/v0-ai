"use client"

import { Sidebar } from '@/components/dashboard/sidebar'
import { Topbar } from '@/components/dashboard/topbar'
import { HeroStats } from '@/components/dashboard/hero-stats'
import { WorkflowCanvas } from '@/components/dashboard/workflow-canvas'
import { AgentMonitor } from '@/components/dashboard/agent-monitor'
import { RagMonitor } from '@/components/dashboard/rag-monitor'
import { CustomerServicePanel } from '@/components/dashboard/customer-service-panel'
import { DataGovernance } from '@/components/dashboard/data-governance'
import { FeedbackLoop } from '@/components/dashboard/feedback-loop'
import { DashboardCharts } from '@/components/dashboard/charts'
import { useDashboardStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const { sidebarOpen } = useDashboardStore()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Topbar />
      
      <main className={cn(
        "pt-16 transition-all duration-300",
        sidebarOpen ? "pl-[280px]" : "pl-[72px]"
      )}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">AI Command Center</h1>
              <p className="text-sm text-muted-foreground mt-1">企业级AI运营中心 - 实时监控与智能决策</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
                <span className="text-xs text-muted-foreground">最后更新: </span>
                <span className="text-xs text-foreground font-medium">刚刚</span>
              </div>
              <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                生成报告
              </button>
            </div>
          </div>

          {/* Hero Stats */}
          <HeroStats />

          {/* Workflow Canvas */}
          <WorkflowCanvas />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <AgentMonitor />
              <DataGovernance />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <RagMonitor />
              <CustomerServicePanel />
            </div>
          </div>

          {/* Feedback Loop */}
          <FeedbackLoop />

          {/* Charts */}
          <DashboardCharts />
        </div>
      </main>
    </div>
  )
}
