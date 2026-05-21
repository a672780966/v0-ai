"use client"

import { useCallback, useEffect, useState } from 'react'
import ReactFlow, { 
  Node, 
  Edge, 
  Background, 
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
  Position,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { cn } from '@/lib/utils'

const nodeColors = {
  blue: { bg: '#3B82F6', border: '#60A5FA', glow: 'rgba(59, 130, 246, 0.5)' },
  cyan: { bg: '#06B6D4', border: '#22D3EE', glow: 'rgba(6, 182, 212, 0.5)' },
  purple: { bg: '#8B5CF6', border: '#A78BFA', glow: 'rgba(139, 92, 246, 0.5)' },
  green: { bg: '#10B981', border: '#34D399', glow: 'rgba(16, 185, 129, 0.5)' },
  violet: { bg: '#7C3AED', border: '#A78BFA', glow: 'rgba(124, 58, 237, 0.5)' },
  orange: { bg: '#F59E0B', border: '#FBBF24', glow: 'rgba(245, 158, 11, 0.5)' },
  teal: { bg: '#14B8A6', border: '#2DD4BF', glow: 'rgba(20, 184, 166, 0.5)' },
}

const initialNodes: Node[] = [
  {
    id: 'input',
    data: { label: '企业数据输入', color: 'blue' },
    position: { x: 0, y: 150 },
    type: 'custom',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'realtime',
    data: { label: '实时AI处理', color: 'cyan' },
    position: { x: 200, y: 150 },
    type: 'custom',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'govern',
    data: { label: '语义治理中心', color: 'purple' },
    position: { x: 400, y: 150 },
    type: 'custom',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'rag',
    data: { label: '企业知识中台', color: 'green', large: true },
    position: { x: 600, y: 130 },
    type: 'custom',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'agent',
    data: { label: 'AI Agent应用', color: 'violet' },
    position: { x: 830, y: 150 },
    type: 'custom',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'human',
    data: { label: '人工协同', color: 'orange' },
    position: { x: 1030, y: 150 },
    type: 'custom',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
  {
    id: 'loop',
    data: { label: '数据反馈闭环', color: 'teal' },
    position: { x: 1230, y: 150 },
    type: 'custom',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  },
]

const initialEdges: Edge[] = [
  { id: 'e1', source: 'input', target: 'realtime', animated: true, style: { stroke: '#3B82F6' } },
  { id: 'e2', source: 'realtime', target: 'govern', animated: true, style: { stroke: '#06B6D4' } },
  { id: 'e3', source: 'govern', target: 'rag', animated: true, style: { stroke: '#8B5CF6' } },
  { id: 'e4', source: 'rag', target: 'agent', animated: true, style: { stroke: '#10B981' } },
  { id: 'e5', source: 'agent', target: 'human', animated: true, style: { stroke: '#7C3AED' } },
  { id: 'e6', source: 'human', target: 'loop', animated: true, style: { stroke: '#F59E0B' } },
  { 
    id: 'e7', 
    source: 'loop', 
    target: 'rag', 
    animated: true, 
    style: { stroke: '#14B8A6', strokeDasharray: '5 5' },
    type: 'smoothstep',
  },
]

function CustomNode({ data }: { data: { label: string; color: string; large?: boolean } }) {
  const colors = nodeColors[data.color as keyof typeof nodeColors]
  
  return (
    <div 
      className={cn(
        "px-4 py-3 rounded-xl border-2 text-white font-medium text-sm text-center transition-all duration-300 hover:scale-105",
        data.large && "px-6 py-4 text-base"
      )}
      style={{
        background: `linear-gradient(135deg, ${colors.bg}, ${colors.border})`,
        borderColor: colors.border,
        boxShadow: `0 0 20px ${colors.glow}`,
      }}
    >
      {data.label}
    </div>
  )
}

const nodeTypes = {
  custom: CustomNode,
}

export function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="glass-card rounded-2xl p-6 border border-border/50">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">企业AI工作流</h3>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs text-muted-foreground">实时同步</span>
          </div>
        </div>
        <div className="h-[280px] bg-muted/20 rounded-xl flex items-center justify-center">
          <span className="text-muted-foreground">加载工作流...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card rounded-2xl p-6 border border-border/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">企业AI工作流</h3>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
          <span className="text-xs text-muted-foreground">实时同步</span>
        </div>
      </div>
      <div className="h-[280px] rounded-xl overflow-hidden bg-[#0a0f1a]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          proOptions={{ hideAttribution: true }}
          minZoom={0.5}
          maxZoom={1.5}
        >
          <Background color="#1F2937" gap={20} />
        </ReactFlow>
      </div>
    </div>
  )
}
