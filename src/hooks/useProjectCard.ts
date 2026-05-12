'use client'

import { useEffect, useRef, useState } from 'react'
import { extractCategoryIds } from './project'

type Params<T extends { id: string | number }> = {
  data: T
  activeId?: string | null
  setActiveId?: (id: string | null) => void
}

const STORAGE_KEY = 'project-category-history'

function saveCategory(ids: string[]) {
  if (!ids.length) return

  const saved = localStorage.getItem(STORAGE_KEY)
  const prev: string[] = saved ? JSON.parse(saved) : []

  const merged = [...ids, ...prev]
  const unique = Array.from(new Set(merged)).slice(0, 20)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(unique))
}

export function useProjectCard<T extends { id: string | number }>({
  data,
  activeId,
  setActiveId,
}: Params<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<number | null>(null)

  const playingRef = useRef(false)

  const isControlled = typeof setActiveId === 'function'
  const [localPlaying, setLocalPlaying] = useState(false)

  const playing = isControlled ? activeId === String(data.id) : localPlaying

  const speed = 1

  // ================= SCROLL AUTO PLAY =================
  useEffect(() => {
    const run = () => {
      const el = containerRef.current

      if (!el) {
        frameRef.current = requestAnimationFrame(run)
        return
      }

      if (playingRef.current) {
        const maxScroll = el.scrollHeight - el.clientHeight

        if (el.scrollTop < maxScroll) {
          el.scrollTop += speed
        } else {
          el.scrollTop = 0

          if (isControlled) {
            setActiveId?.(null)
          } else {
            setLocalPlaying(false)
          }
        }
      }

      frameRef.current = requestAnimationFrame(run)
    }

    frameRef.current = requestAnimationFrame(run)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  useEffect(() => {
    playingRef.current = playing
  }, [playing])

  useEffect(() => {
    if (!isControlled) return

    if (activeId !== null && String(activeId) !== String(data.id)) {
      const el = containerRef.current
      if (el) el.scrollTop = 0
    }
  }, [activeId, data.id, isControlled])

  // ================= CATEGORY TRACK (NEW) =================
  const trackCategory = () => {
    const ids = extractCategoryIds((data as any)?.category)

    console.log('TRACK CATEGORY:', ids)

    if (!ids.length) return

    saveCategory(ids)
  }

  // ================= TOGGLE PLAY =================
  const togglePlay = () => {
    trackCategory()

    if (isControlled) {
      setActiveId?.(playing ? null : String(data.id))
    } else {
      setLocalPlaying((prev) => !prev)
    }
  }

  // ================= OPTIONAL: CLICK TRACK (NEW CLEAN API) =================
  const onCardClick = () => {
    trackCategory()
  }

  return {
    containerRef,
    playing,
    togglePlay,
    onCardClick, // 👈 dùng nếu muốn gắn click toàn card
  }
}
