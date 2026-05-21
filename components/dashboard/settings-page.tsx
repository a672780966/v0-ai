"use client"

import { 
  Settings, 
  User, 
  Bell, 
  Shield,
  Palette,
  Globe,
  Key,
  Database,
  Cloud,
  Save,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const settingsCategories = [
  { id: 'profile', title: '个人设置', icon: User, description: '管理您的个人信息和偏好' },
  { id: 'notifications', title: '通知设置', icon: Bell, description: '配置系统通知和提醒' },
  { id: 'security', title: '安全设置', icon: Shield, description: '密码、两步验证和登录设置' },
  { id: 'appearance', title: '外观设置', icon: Palette, description: '主题、语言和界面定制' },
  { id: 'api', title: 'API设置', icon: Key, description: '管理API密钥和访问令牌' },
  { id: 'integrations', title: '集成设置', icon: Cloud, description: '第三方服务和数据源配置' },
]

const systemSettings = [
  { title: 'AI模型配置', description: '配置默认AI模型和参数', status: 'configured' },
  { title: '知识库配置', description: '管理向量数据库和索引设置', status: 'configured' },
  { title: '日志保留策略', description: '设置日志存储时间和归档规则', status: 'configured' },
  { title: '备份设置', description: '自动备份和恢复配置', status: 'warning' },
]

export function SettingsPage() {
  const [activeCategory, setActiveCategory] = useState('profile')

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">系统设置</h1>
        <p className="text-sm text-muted-foreground mt-1">管理平台配置和个人偏好</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Categories */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl bg-card border border-border/50 p-4 backdrop-blur-sm">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4 px-2">设置分类</h3>
            <div className="space-y-1">
              {settingsCategories.map((category) => {
                const Icon = category.icon
                const isActive = activeCategory === category.id
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-xl transition-all",
                      isActive 
                        ? "bg-primary/10 border border-primary/20" 
                        : "hover:bg-muted/30"
                    )}
                  >
                    <div className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-lg",
                      isActive ? "bg-primary/20" : "bg-muted/30"
                    )}>
                      <Icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className={cn("text-sm font-medium", isActive ? "text-primary" : "text-foreground")}>{category.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{category.description}</p>
                    </div>
                    <ChevronRight className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings Example */}
          <div className="rounded-2xl bg-card border border-border/50 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">个人设置</h3>
                <p className="text-sm text-muted-foreground">管理您的账户信息</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">用户名</label>
                  <input 
                    type="text" 
                    defaultValue="admin" 
                    className="w-full px-4 py-2 rounded-xl bg-muted/30 border border-border/50 text-sm text-foreground outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">邮箱</label>
                  <input 
                    type="email" 
                    defaultValue="admin@company.com" 
                    className="w-full px-4 py-2 rounded-xl bg-muted/30 border border-border/50 text-sm text-foreground outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">部门</label>
                <select className="w-full px-4 py-2 rounded-xl bg-muted/30 border border-border/50 text-sm text-foreground outline-none focus:border-primary/50 transition-colors">
                  <option>技术部</option>
                  <option>产品部</option>
                  <option>运营部</option>
                </select>
              </div>
            </div>
          </div>

          {/* System Settings */}
          <div className="rounded-2xl bg-card border border-border/50 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20">
                <Database className="h-5 w-5 text-violet-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">系统配置</h3>
                <p className="text-sm text-muted-foreground">平台核心设置</p>
              </div>
            </div>

            <div className="space-y-3">
              {systemSettings.map((setting) => (
                <div 
                  key={setting.title}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-border/30 hover:bg-muted/30 transition-colors cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{setting.title}</p>
                    <p className="text-xs text-muted-foreground">{setting.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {setting.status === 'configured' ? (
                      <span className="px-2 py-1 rounded-lg text-xs bg-secondary/10 text-secondary">已配置</span>
                    ) : (
                      <span className="px-2 py-1 rounded-lg text-xs bg-orange-500/10 text-orange-400">需检查</span>
                    )}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              <Save className="h-4 w-4" />
              保存设置
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
