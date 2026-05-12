import React from 'react'

export default function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border bg-background overflow-hidden animate-pulse">
      {/* ================= HEADER ================= */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          {/* TITLE */}
          <div className="h-5 w-3/4 bg-muted rounded" />

          {/* BUTTON */}
          <div className="w-8 h-8 rounded-lg bg-muted" />
        </div>

        {/* TAGS */}
        <div className="flex gap-2 mt-3 flex-wrap">
          <div className="h-5 w-16 rounded-full bg-muted" />
          <div className="h-5 w-20 rounded-full bg-muted" />
        </div>
      </div>

      {/* ================= IMAGE ================= */}
      <div className="h-[300px] bg-muted border-y border-border" />

      {/* ================= FOOTER ================= */}
      <div className="p-3">
        {/* DATE */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-muted rounded" />
          <div className="h-3 w-24 bg-muted rounded" />
        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-3 gap-2 p-1 bg-muted rounded-xl">
          <div className="h-9 rounded-lg bg-background" />
          <div className="h-9 rounded-lg bg-background" />
          <div className="h-9 rounded-lg bg-background" />
        </div>
      </div>
    </div>
  )
}
