"use client"

import { Sidebar } from '@/components/dashboard/sidebar'
import { Topbar } from '@/components/dashboard/topbar'
import { ExecutiveMetrics } from '@/components/dashboard/executive-metrics'
import { EnterpriseAIMap } from '@/components/dashboard/enterprise-ai-map'
import { WorkflowCanvas } from '@/components/dashboard/workflow-canvas'
import { AgentMonitor } from '@/components/dashboard/agent-monitor'
import { RagMonitor } from '@/components/dashboard/rag-monitor'
import { CustomerServicePanel } from '@/components/dashboard/customer-service-panel'
import { DataGovernance } from '@/components/dashboard/data-governance'
import { FeedbackLoop } from '@/components/dashboard/feedback-loop'
import { DashboardCharts } from '@/components/dashboard/charts'
import { KnowledgeGovernancePage } from '@/components/dashboard/knowledge-governance-page'
import { AgentCollaborationPage } from '@/components/dashboard/agent-collaboration-page'
import { AIRuntimePage } from '@/components/dashboard/ai-runtime-page'
import { GovernanceSecurityPage } from '@/components/dashboard/governance-security-page'
import { CopilotPage } from '@/components/dashboard/copilot-page'
import { LogsPage } from '@/components/dashboard/logs-page'
import { SettingsPage } from '@/components/dashboard/settings-page'
import { useDashboardStore } from '@/lib/store'
import { cn } from '@/lib/utils'

function ExecutiveOverview() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">经营总览</h1>
          <p className="text-sm text-muted-foreground mt-1">企业AI经营层全景数据</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border/50">
            <span className="text-xs text-muted-foreground">数据更新: </span>
            <span className="text-xs text-foreground font-medium">实时</span>
          </div>
          <button className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
            生成报告
          </button>
        </div>
      </div>

      <ExecutiveMetrics />
      <EnterpriseAIMap />
      <DashboardCharts />
    </div>
  )
}

function WorkflowStudioPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">AI工作流</h1>
          <p className="text-sm text-muted-foreground mt-1">企业级AI流程编排与可视化</p>
        </div>
        <button className="w-fit px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
          + 新建工作流
        </button>
      </div>

      <WorkflowCanvas />
      <FeedbackLoop />
    </div>
  )
}

function CustomerServicePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">AI客服中心</h1>
        <p className="text-sm text-muted-foreground mt-1">智能客服对话管理与监控</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <CustomerServicePanel />
        <RagMonitor />
      </div>
      <AgentMonitor />
    </div>
  )
}

export default function DashboardPage() {
  const { sidebarOpen, currentPage } = useDashboardStore()

  const renderPage = () => {
    switch (currentPage) {
      case 'executive':
        return <ExecutiveOverview />
      case 'workflow':
        return <WorkflowStudioPage />
      case 'knowledge':
        return <KnowledgeGovernancePage />
      case 'agents':
        return <AgentCollaborationPage />
      case 'customer-service':
        return <CustomerServicePage />
      case 'copilot':
        return <CopilotPage />
      case 'runtime':
        return <AIRuntimePage />
      case 'governance':
        return <GovernanceSecurityPage />
      case 'logs':
        return <LogsPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <ExecutiveOverview />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <Topbar />
      
      <main className={cn(
        "pt-16 transition-all duration-300",
        sidebarOpen ? "pl-[280px]" : "pl-[72px]"
      )}>
        <div className="p-6">
          {renderPage()}
        </div>
      </main>
    </div>
  )
}
