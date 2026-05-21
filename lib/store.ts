"use client"

import { create } from 'zustand'

interface DashboardState {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  activeNav: string
  setActiveNav: (nav: string) => void
  notifications: number
  aiStatus: 'online' | 'processing' | 'offline'
}

export const useDashboardStore = create<DashboardState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  activeNav: 'AI工作台',
  setActiveNav: (nav) => set({ activeNav: nav }),
  notifications: 12,
  aiStatus: 'online',
}))
