'use client'

import { useEffect, useMemo, useState } from 'react'

import type { Project } from '@/payload-types'
import { fuzzyMatch } from '@/utilities/search'

export function useProjects(initialData: Project[] = []) {
  // ================= DATA =================
  const [data] = useState<Project[]>(initialData)

  const loading = false

  // ================= ACTIVE CARD =================
  const [activeId, setActiveId] = useState<string | null>(null)

  // ================= VIEW MODE =================
  const [viewModeState, setViewModeState] = useState<'grid' | 'slide'>('grid')

  const viewMode = viewModeState

  const setViewMode = (mode: 'grid' | 'slide') => {
    setViewModeState(mode)

    if (typeof window !== 'undefined') {
      localStorage.setItem('project-view-mode', mode)
    }
  }

  // ================= HYDRATE VIEW MODE =================
  useEffect(() => {
    const saved = localStorage.getItem('project-view-mode')

    if (saved === 'grid' || saved === 'slide') {
      setViewModeState(saved)
    }
  }, [])

  useEffect(() => {
    const savedCategory = localStorage.getItem('project-category')

    if (savedCategory) {
      setCategory(savedCategory)

      localStorage.removeItem('project-category')
    }
  }, [])

  // ================= FILTER =================
  const [keyword, setKeyword] = useState('')

  const [category, setCategory] = useState('all')

  const [page, setPage] = useState(1)

  const limit = 6

  // ================= CATEGORY LIST =================
  const categories = useMemo(() => {
    if (!data?.length) return []

    const map = new Map<string, string>()

    data.forEach((project) => {
      const cats = Array.isArray(project.category)
        ? project.category
        : project.category
          ? [project.category]
          : []

      cats.forEach((c: any) => {
        if (typeof c !== 'object' || !c) return

        if (!c.slug) return

        map.set(c.slug, c.name || c.slug)
      })
    })

    return Array.from(map.entries()).map(([slug, name]) => ({
      slug,
      name,
    }))
  }, [data])

  // ================= FILTERED =================
  const filtered = useMemo(() => {
    return data.filter((project) => {
      const matchName = fuzzyMatch(project.title ?? '', keyword)

      const cats = Array.isArray(project.category)
        ? project.category
        : project.category
          ? [project.category]
          : []

      const matchCategory =
        category === 'all' ||
        cats.some((c: any) => {
          if (typeof c !== 'object' || !c) return false

          return c.slug === category
        })

      return matchName && matchCategory
    })
  }, [data, keyword, category])

  // ================= PAGINATION =================
  const totalPages = Math.max(1, Math.ceil(filtered.length / limit))

  const paginated = useMemo(() => {
    const start = (page - 1) * limit

    return filtered.slice(start, start + limit)
  }, [filtered, page])

  // ================= RESET PAGE =================
  useEffect(() => {
    setPage(1)
  }, [keyword, category])

  // ================= PAGE OVERFLOW =================
  useEffect(() => {
    if (page > totalPages) {
      setPage(1)
    }
  }, [page, totalPages])

  return {
    data,
    loading,

    viewMode,
    setViewMode,

    activeId,
    setActiveId,

    keyword,
    setKeyword,

    category,
    setCategory,

    categories,

    page,
    setPage,

    limit,
    totalPages,

    paginated,
  }
}
