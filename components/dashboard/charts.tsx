"use client"

import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { TrendingUp, Activity, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

const lineChartData = [
  { date: '03/01', calls: 850000 },
  { date: '03/05', calls: 920000 },
  { date: '03/10', calls: 880000 },
  { date: '03/15', calls: 1050000 },
  { date: '03/20', calls: 1180000 },
  { date: '03/25', calls: 1240000 },
  { date: '03/30', calls: 1285000 },
]

const barChartData = [
  { name: '客服', usage: 42 },
  { name: '销售', usage: 28 },
  { name: '检索', usage: 18 },
  { name: '分析', usage: 8 },
  { name: '其他', usage: 4 },
]

const areaChartData = [
  { date: '03/01', gpt4: 2.1, gpt35: 4.2, embedding: 1.8 },
  { date: '03/05', gpt4: 2.4, gpt35: 4.8, embedding: 2.0 },
  { date: '03/10', gpt4: 2.2, gpt35: 4.5, embedding: 1.9 },
  { date: '03/15', gpt4: 2.8, gpt35: 5.2, embedding: 2.3 },
  { date: '03/20', gpt4: 3.1, gpt35: 5.8, embedding: 2.5 },
  { date: '03/25', gpt4: 3.4, gpt35: 6.2, embedding: 2.7 },
  { date: '03/30', gpt4: 3.6, gpt35: 6.5, embedding: 2.9 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {typeof entry.value === 'number' && entry.value > 10000 
              ? (entry.value / 1000000).toFixed(2) + 'M' 
              : entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Line Chart - AI Calls Trend */}
      <div className="glass-card rounded-2xl p-5 border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">AI调用趋势</h4>
            <p className="text-xs text-muted-foreground">近30天</p>
          </div>
        </div>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
                axisLine={{ stroke: '#1F2937' }}
              />
              <YAxis 
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
                axisLine={{ stroke: '#1F2937' }}
                tickFormatter={(value) => (value / 1000000).toFixed(1) + 'M'}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="calls" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 0, r: 3 }}
                activeDot={{ r: 5, fill: '#3B82F6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart - Agent Load */}
      <div className="glass-card rounded-2xl p-5 border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10">
            <Activity className="h-4 w-4 text-secondary" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">Agent负载分布</h4>
            <p className="text-xs text-muted-foreground">按类型统计</p>
          </div>
        </div>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
                axisLine={{ stroke: '#1F2937' }}
              />
              <YAxis 
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
                axisLine={{ stroke: '#1F2937' }}
                tickFormatter={(value) => value + '%'}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="usage" 
                fill="#10B981" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Area Chart - Token Usage */}
      <div className="glass-card rounded-2xl p-5 border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
            <Zap className="h-4 w-4 text-accent" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">Token消耗趋势</h4>
            <p className="text-xs text-muted-foreground">按模型分类 (百万)</p>
          </div>
        </div>
        <div className="h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
                axisLine={{ stroke: '#1F2937' }}
              />
              <YAxis 
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
                axisLine={{ stroke: '#1F2937' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="gpt4" 
                stackId="1"
                stroke="#8B5CF6" 
                fill="#8B5CF6" 
                fillOpacity={0.3}
                name="GPT-4"
              />
              <Area 
                type="monotone" 
                dataKey="gpt35" 
                stackId="1"
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.3}
                name="GPT-3.5"
              />
              <Area 
                type="monotone" 
                dataKey="embedding" 
                stackId="1"
                stroke="#10B981" 
                fill="#10B981" 
                fillOpacity={0.3}
                name="Embedding"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
