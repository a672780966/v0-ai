"use client"

import { create } from 'zustand'

interface DashboardState {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  activeNav: string
  setActiveNav: (nav: string) => void
  notifications: number
  aiStatus: 'online' | 'processing' | 'offline'
  currentPage: string
  setCurrentPage: (page: string) => void
  selectedDepartment: string
  setSelectedDepartment: (dept: string) => void
}

export const useDashboardStore = create<DashboardState>((set) => ({
  sidebarOpen: true,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  activeNav: '经营总览',
  setActiveNav: (nav) => set({ activeNav: nav }),
  notifications: 12,
  aiStatus: 'online',
  currentPage: 'executive',
  setCurrentPage: (page) => set({ currentPage: page }),
  selectedDepartment: '全部',
  setSelectedDepartment: (dept) => set({ selectedDepartment: dept }),
}))
