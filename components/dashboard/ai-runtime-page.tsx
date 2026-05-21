"use client"

import { 
  Cpu, 
  Gauge, 
  Zap, 
  Clock,
  Activity,
  Server,
  BarChart3,
  TrendingUp
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

const models = [
  { 
    name: 'Gemma', 
    task: 'Realtime AI',
    status: 'active',
    gpu: '45%',
    latency: '0.8s',
    throughput: '12K/s'
  },
  { 
    name: 'Qwen', 
    task: 'Semantic Governance',
    status: 'active',
    gpu: '23%',
    latency: '1.2s',
    throughput: '8K/s'
  },
  { 
    name: 'GLM', 
    task: 'Knowledge Maintenance',
    status: 'active',
    gpu: '10%',
    latency: '2.5s',
    throughput: '4K/s'
  },
]

const runtimeMetrics = [
  { title: 'GPU使用率', value: '78%', icon: Cpu, color: 'blue' },
  { title: 'Token吞吐', value: '28K/s', icon: Zap, color: 'green' },
  { title: '平均延迟', value: '1.2s', icon: Clock, color: 'purple' },
  { title: '内存占用', value: '64GB', icon: Server, color: 'cyan' },
]

const throughputData = [
  { time: '00:00', gemma: 10000, qwen: 6000, glm: 3000 },
  { time: '04:00', gemma: 8000, qwen: 5000, glm: 4000 },
  { time: '08:00', gemma: 15000, qwen: 9000, glm: 2000 },
  { time: '12:00', gemma: 18000, qwen: 11000, glm: 3500 },
  { time: '16:00', gemma: 14000, qwen: 8500, glm: 5000 },
  { time: '20:00', gemma: 12000, qwen: 7000, glm: 6000 },
]

const colorMap: Record<string, { text: string; bg: string; border: string }> = {
  blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  green: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  purple: { text: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
}

export function AIRuntimePage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">模型调度中心</h1>
        <p className="text-sm text-muted-foreground mt-1">AI模型运行时监控与资源调度</p>
      </div>

      {/* Runtime Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {runtimeMetrics.map((metric) => {
          const Icon = metric.icon
          const colors = colorMap[metric.color]
          return (
            <div 
              key={metric.title}
              className="rounded-2xl bg-card border border-border/50 p-5 backdrop-blur-sm hover:border-border transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl border", colors.bg, colors.border)}>
                  <Icon className={cn("h-5 w-5", colors.text)} />
                </div>
                <Activity className="h-4 w-4 text-secondary animate-pulse" />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
              <p className={cn("text-2xl font-bold", colors.text)}>{metric.value}</p>
            </div>
          )
        })}
      </div>

      {/* Model Router */}
      <div className="rounded-2xl bg-card border border-border/50 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
            <Server className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">模型路由器</h3>
            <p className="text-sm text-muted-foreground">智能模型调度与负载均衡</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {models.map((model) => (
            <div 
              key={model.name}
              className={cn(
                "rounded-xl p-5 border transition-all hover:scale-[1.02]",
                "bg-gradient-to-br from-muted/30 to-transparent",
                "border-border/50 hover:border-primary/30"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-lg text-sm font-bold bg-primary/10 text-primary border border-primary/20">
                  {model.name}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-xs text-secondary">运行中</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{model.task}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">GPU使用</span>
                  <span className="text-sm font-medium text-foreground">{model.gpu}</span>
                </div>
                <div className="w-full h-1.5 bg-muted/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all" 
                    style={{ width: model.gpu }}
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">延迟</span>
                    <span className="text-sm font-medium text-foreground">{model.latency}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-xs text-muted-foreground">吞吐量</span>
                    <span className="text-sm font-medium text-foreground">{model.throughput}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Throughput Chart */}
      <div className="rounded-2xl bg-card border border-border/50 p-6 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <BarChart3 className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">模型吞吐量趋势</h3>
            <p className="text-sm text-muted-foreground">各模型Token处理速率对比</p>
          </div>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={throughputData}>
              <defs>
                <linearGradient id="gemmaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="qwenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="glmGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis dataKey="time" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#111827', 
                  border: '1px solid #1F2937',
                  borderRadius: '12px'
                }}
                labelStyle={{ color: '#F9FAFB' }}
              />
              <Area type="monotone" dataKey="gemma" stroke="#3B82F6" fill="url(#gemmaGradient)" strokeWidth={2} />
              <Area type="monotone" dataKey="qwen" stroke="#8B5CF6" fill="url(#qwenGradient)" strokeWidth={2} />
              <Area type="monotone" dataKey="glm" stroke="#06B6D4" fill="url(#glmGradient)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span className="text-sm text-muted-foreground">Gemma</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-violet-500" />
            <span className="text-sm text-muted-foreground">Qwen</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-cyan-500" />
            <span className="text-sm text-muted-foreground">GLM</span>
          </div>
        </div>
      </div>
    </div>
  )
}
