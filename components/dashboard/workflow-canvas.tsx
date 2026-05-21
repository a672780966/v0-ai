"use client"

import { useEffect, useState, useMemo } from 'react'
import ReactFlow, { 
  Node, 
  Edge, 
  Background, 
  useNodesState,
  useEdgesState,
  Position,
  Handle,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { cn } from '@/lib/utils'
import { Workflow, Maximize2 } from 'lucide-react'

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
    data: { label: '企业数据输入', color: 'blue', category: 'source' },
    position: { x: 0, y: 150 },
    type: 'custom',
  },
  {
    id: 'intent',
    data: { label: '意图识别', color: 'cyan', category: 'routing' },
    position: { x: 200, y: 150 },
    type: 'custom',
  },
  {
    id: 'governance',
    data: { label: '语义治理', color: 'purple', category: 'processing' },
    position: { x: 400, y: 150 },
    type: 'custom',
  },
  {
    id: 'rag',
    data: { label: 'RAG知识中台', color: 'green', large: true, category: 'knowledge' },
    position: { x: 600, y: 130 },
    type: 'custom',
  },
  {
    id: 'agent',
    data: { label: '多Agent协作', color: 'violet', category: 'agent' },
    position: { x: 840, y: 150 },
    type: 'custom',
  },
  {
    id: 'human',
    data: { label: '人工审核', color: 'orange', category: 'human' },
    position: { x: 1040, y: 150 },
    type: 'custom',
  },
  {
    id: 'feedback',
    data: { label: '数据反馈闭环', color: 'teal', category: 'loop' },
    position: { x: 1240, y: 150 },
    type: 'custom',
  },
]

const initialEdges: Edge[] = [
  { id: 'e1', source: 'input', target: 'intent', sourceHandle: 'source', targetHandle: 'target', animated: true, style: { stroke: '#3B82F6', strokeWidth: 2 } },
  { id: 'e2', source: 'intent', target: 'governance', sourceHandle: 'source', targetHandle: 'target', animated: true, style: { stroke: '#06B6D4', strokeWidth: 2 } },
  { id: 'e3', source: 'governance', target: 'rag', sourceHandle: 'source', targetHandle: 'target', animated: true, style: { stroke: '#8B5CF6', strokeWidth: 2 } },
  { id: 'e4', source: 'rag', target: 'agent', sourceHandle: 'source', targetHandle: 'target', animated: true, style: { stroke: '#10B981', strokeWidth: 2 } },
  { id: 'e5', source: 'agent', target: 'human', sourceHandle: 'source', targetHandle: 'target', animated: true, style: { stroke: '#7C3AED', strokeWidth: 2 } },
  { id: 'e6', source: 'human', target: 'feedback', sourceHandle: 'source', targetHandle: 'target', animated: true, style: { stroke: '#F59E0B', strokeWidth: 2 } },
  { 
    id: 'e7', 
    source: 'feedback', 
    target: 'rag', 
    sourceHandle: 'source',
    targetHandle: 'target',
    animated: true, 
    style: { stroke: '#14B8A6', strokeDasharray: '5 5', strokeWidth: 2 },
    type: 'smoothstep',
  },
]

function CustomNode({ data }: { data: { label: string; color: string; large?: boolean; category?: string } }) {
  const colors = nodeColors[data.color as keyof typeof nodeColors]
  
  return (
    <div 
      className={cn(
        "px-4 py-3 rounded-xl border-2 text-white font-medium text-sm text-center transition-all duration-300 hover:scale-105 cursor-pointer relative",
        data.large && "px-6 py-4 text-base"
      )}
      style={{
        background: `linear-gradient(135deg, ${colors.bg}, ${colors.border})`,
        borderColor: colors.border,
        boxShadow: `0 0 25px ${colors.glow}`,
      }}
    >
      <Handle type="target" position={Position.Left} id="target" style={{ background: colors.border, border: 'none', width: 8, height: 8 }} />
      <div className="flex flex-col items-center gap-1">
        <span>{data.label}</span>
        {data.category && (
          <span className="text-xs opacity-70 capitalize">{data.category}</span>
        )}
      </div>
      <Handle type="source" position={Position.Right} id="source" style={{ background: colors.border, border: 'none', width: 8, height: 8 }} />
    </div>
  )
}

// Memoize nodeTypes outside component to prevent re-renders
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
      <div className="rounded-2xl bg-card border border-border/50 p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
              <Workflow className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">企业AI工作流</h3>
              <p className="text-sm text-muted-foreground">交互式流程编排</p>
            </div>
          </div>
        </div>
        <div className="h-[320px] bg-muted/20 rounded-xl flex items-center justify-center">
          <span className="text-muted-foreground">加载工作流...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-card border border-border/50 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
            <Workflow className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">企业AI工作流</h3>
            <p className="text-sm text-muted-foreground">交互式流程编排</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/10 border border-secondary/20">
            <div className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs text-secondary font-medium">实时同步</span>
          </div>
          <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Maximize2 className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
      <div className="h-[320px] w-full rounded-xl overflow-hidden bg-[#070b14] border border-border/30">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          proOptions={{ hideAttribution: true }}
          minZoom={0.5}
          maxZoom={1.5}
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
          defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        >
          <Background color="#1F2937" gap={24} size={1} />
        </ReactFlow>
      </div>
      
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4 pt-4 border-t border-border/30">
        {[
          { color: 'blue', label: '数据源' },
          { color: 'cyan', label: '路由' },
          { color: 'purple', label: '处理' },
          { color: 'green', label: '知识' },
          { color: 'violet', label: 'Agent' },
          { color: 'orange', label: '人工' },
          { color: 'teal', label: '闭环' },
        ].map((item) => (
          <div key={item.color} className="flex items-center gap-2">
            <div 
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: nodeColors[item.color as keyof typeof nodeColors].bg }}
            />
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
