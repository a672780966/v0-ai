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
    id: 'question',
    data: { label: '用户提问', color: 'blue', category: 'input' },
    position: { x: 0, y: 150 },
    type: 'custom',
  },
  {
    id: 'intent',
    data: { label: '意图识别', color: 'cyan', category: 'nlp' },
    position: { x: 180, y: 150 },
    type: 'custom',
  },
  {
    id: 'kb',
    data: { label: '知识库检索', color: 'green', category: 'retrieval' },
    position: { x: 360, y: 150 },
    type: 'custom',
  },
  {
    id: 'answer',
    data: { label: 'AI回答', color: 'violet', category: 'generation' },
    position: { x: 540, y: 150 },
    type: 'custom',
  },
  {
    id: 'risk',
    data: { label: '风险判断', color: 'purple', category: 'risk' },
    position: { x: 720, y: 150 },
    type: 'custom',
  },
  {
    id: 'human',
    data: { label: '人工介入建议', color: 'orange', category: 'handoff' },
    position: { x: 900, y: 150 },
    type: 'custom',
  },
  {
    id: 'crm',
    data: { label: 'CRM线索标签', color: 'teal', category: 'crm' },
    position: { x: 1080, y: 150 },
    type: 'custom',
  },
  {
    id: 'feedback',
    data: { label: '知识回流记录', color: 'green', category: 'learning' },
    position: { x: 1260, y: 150 },
    type: 'custom',
  },
  {
    id: 'board',
    data: { label: '管理层看板更新', color: 'blue', category: 'dashboard' },
    position: { x: 1440, y: 150 },
    type: 'custom',
  },
]

const initialEdges: Edge[] = [
  { id: 'e1', source: 'question', target: 'intent', sourceHandle: 'source', targetHandle: 'target', animated: true, style: { stroke: '#3B82F6', strokeWidth: 2 } },
  { id: 'e2', source: 'intent', target: 'kb', sourceHandle: 'source', targetHandle: 'target', animated: true, style: { stroke: '#06B6D4', strokeWidth: 2 } },
  { id: 'e3', source: 'kb', target: 'answer', sourceHandle: 'source', targetHandle: 'target', animated: true, style: { stroke: '#10B981', strokeWidth: 2 } },
  { id: 'e4', source: 'answer', target: 'risk', sourceHandle: 'source', targetHandle: 'target', animated: true, style: { stroke: '#7C3AED', strokeWidth: 2 } },
  { id: 'e5', source: 'risk', target: 'human', sourceHandle: 'source', targetHandle: 'target', animated: true, style: { stroke: '#8B5CF6', strokeWidth: 2 } },
  { id: 'e6', source: 'human', target: 'crm', sourceHandle: 'source', targetHandle: 'target', animated: true, style: { stroke: '#F59E0B', strokeWidth: 2 } },
  { id: 'e7', source: 'crm', target: 'feedback', sourceHandle: 'source', targetHandle: 'target', animated: true, style: { stroke: '#14B8A6', strokeWidth: 2 } },
  { id: 'e8', source: 'feedback', target: 'board', sourceHandle: 'source', targetHandle: 'target', animated: true, style: { stroke: '#3B82F6', strokeWidth: 2 } },
  {
    id: 'e9',
    source: 'feedback',
    target: 'kb',
    sourceHandle: 'source',
    targetHandle: 'target',
    animated: true,
    style: { stroke: '#10B981', strokeDasharray: '5 5', strokeWidth: 2 },
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
              <p className="text-sm text-muted-foreground">企业服务AI资质顾问MVP流程</p>
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
            <p className="text-sm text-muted-foreground">企业服务AI资质顾问MVP流程</p>
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
          { color: 'blue', label: '输入/看板' },
          { color: 'cyan', label: '意图识别' },
          { color: 'green', label: '检索/学习' },
          { color: 'violet', label: 'AI回答' },
          { color: 'purple', label: '风险判断' },
          { color: 'orange', label: '人工介入' },
          { color: 'teal', label: 'CRM标签' },
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
