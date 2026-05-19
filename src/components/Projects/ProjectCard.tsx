'use client'

import Link from 'next/link'
import React from 'react'
import { cn } from '@/utilities/ui'
import { Media } from '@/components/Media'

import { Play, Pause, Monitor, Calendar, Copy, ScanSearch, MessageCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { toast } from 'sonner'

import type { Project } from '@/payload-types'
import { useProjectCard } from '@/hooks/useProjectCard'

type Props = {
  data: Project
  variant?: 'grid' | 'slide'
  isDetail?: boolean
  activeId?: string | null
  setActiveId?: (id: string | null) => void
}

export const ProjectCard: React.FC<Props> = ({
  data,
  variant = 'grid',
  isDetail = false,
  activeId,
  setActiveId,
}) => {
  const { containerRef, playing, togglePlay } = useProjectCard({
    data,
    activeId,
    setActiveId,
  })

  const date = data?.publishedAt
    ? new Date(data.publishedAt).toLocaleDateString('vi-VN')
    : 'update..'

  const categories = Array.isArray(data?.category)
    ? data.category
    : data?.category
      ? [data.category]
      : []

  const categoryList = categories
    .map((c: any) => (typeof c === 'object' && c !== null ? c : null))
    .filter(Boolean)

  return (
    <div
      className={cn(
        'flex flex-col justify-between rounded-2xl border bg-background border-border overflow-hidden transition-all duration-200 shadow-sm z-10 relative',
        variant === 'grid' && 'hover:shadow-xl hover:-translate-y-1',
      )}
    >
      {/* ================= HEADER ================= */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <Link href={`/projects/${data.slug}`}>
            <h3 className="font-bold text-lg text-foreground hover:text-primary transition line-clamp-2">
              {data.title}
            </h3>
          </Link>

          {/* PLAY / PAUSE */}
          <button
            onClick={togglePlay}
            className="w-8 h-8 flex items-center justify-center rounded-lg
            bg-primary/10 text-primary
            hover:bg-primary/20 hover:scale-105
            active:scale-95 transition-all duration-200"
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
        </div>

        {/* TAGS */}
        <div className="flex gap-1 mt-2 flex-wrap">
          {categoryList.length > 0 ? (
            categoryList.map((c: any, i: number) => (
              <span
                key={c.id || i}
                className="text-[10px] px-3 py-1 rounded-full bg-primary/10 text-primary"
              >
                {c?.name || 'Category'}
              </span>
            ))
          ) : (
            <span className="text-[10px] px-3 py-1 rounded-full bg-primary/10 text-primary">
              Demo
            </span>
          )}
        </div>
      </div>

      {/* ================= IMAGE ================= */}
      <div
        ref={containerRef}
        className="h-[300px] overflow-hidden border-y border-border relative group"
      >
        {data?.meta?.image && typeof data.meta.image !== 'string' ? (
          <div className="transition-transform duration-500 group-hover:scale-105">
            <Media resource={data.meta.image} size="100vw" />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}
      </div>

      {/* ================= FOOTER ================= */}
      <div className="p-2">
        {/* DATE */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2 px-1">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>

        {/* ACTIONS */}
        <TooltipProvider>
          <div
            className={cn(
              'grid grid-cols-3 gap-2 p-1 rounded-xl bg-muted',
              variant === 'grid' && 'shadow-sm',
            )}
          >
            {/* DETAIL / CONTACT */}
            <Tooltip>
              <TooltipTrigger asChild>
                {isDetail ? (
                  <Link href="/contact" className="w-full">
                    <Button
                      variant="ghost"
                      className="w-full h-9 rounded-lg justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10"
                    >
                      <MessageCircle size={16} />
                    </Button>
                  </Link>
                ) : (
                  <Link href={`/projects/${data.slug}`} className="w-full">
                    <Button
                      variant="ghost"
                      className="w-full h-9 rounded-lg justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10"
                    >
                      <ScanSearch size={16} />
                    </Button>
                  </Link>
                )}
              </TooltipTrigger>
              <TooltipContent>{isDetail ? 'Liên hệ' : 'Chi tiết'}</TooltipContent>
            </Tooltip>

            {/* DEMO */}
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href={data?.demoLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    variant="ghost"
                    className="w-full h-9 rounded-lg justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10"
                  >
                    <Monitor size={16} />
                  </Button>
                </a>
              </TooltipTrigger>
              <TooltipContent>Demo</TooltipContent>
            </Tooltip>

            {/* COPY */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.origin + `/projects/${data.slug}`)
                    toast.success('Đã copy link!')
                  }}
                  className="w-full h-9 rounded-lg justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10"
                >
                  <Copy size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Copy link</TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </div>
  )
}
