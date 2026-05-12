'use client'

import React from 'react'
import Link from 'next/link'

import { Folder, MoreVertical } from 'lucide-react'

type Category = {
  name: string
  slug: string
  count?: number
}

type Props = {
  categories: Category[]
  active?: string
  onSelect?: (slug: string) => void
}

export default function ProjectCategoryList({ categories, active, onSelect }: Props) {
  return (
    <div
      className="
        flex flex-wrap

        gap-2
        md:gap-3

        w-full
        relative
        z-10
      "
    >
      {categories.map((item) => {
        const isActive = active === item.slug

        return (
          <Link
            key={item.slug}
            href="/projects"
            onClick={() => {
              localStorage.setItem('project-category', item.slug)
              onSelect?.(item.slug)
            }}
            className={`
              group
              relative

              flex items-center

              min-w-0

              overflow-hidden

              rounded-sm
              border

              px-2 py-2
              md:px-4 md:py-2.5

              transition-all
              duration-300

              backdrop-blur-xl

              ${
                isActive
                  ? `
                    border-primary/30

                    bg-primary/[0.08]
                    dark:bg-primary/[0.12]

                    shadow-[0_4px_20px_rgba(var(--primary),0.10)]
                  `
                  : `
                    border-zinc-200/80
                    dark:border-white/[0.08]

                    bg-white/90
                    dark:bg-[#0b0b0c]

                    hover:border-primary/30

                    hover:bg-primary/[0.03]
                    dark:hover:bg-primary/[0.06]

                    hover:shadow-[0_4px_20px_rgba(var(--primary),0.06)]
                  `
              }
            `}
          >
            {/* Glow */}
            <div
              className="
                absolute inset-0

                opacity-0
                group-hover:opacity-100

                transition-opacity
                duration-300

                bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.12),transparent_45%)]
              "
            />

            {/* Shine */}
            <div
              className="
                absolute inset-0

                opacity-0
                group-hover:opacity-100

                transition-opacity
                duration-500

                bg-gradient-to-r
                from-transparent
                via-white/[0.04]
                to-transparent
              "
            />

            {/* Content */}
            <div
              className="
                relative

                flex items-center

                gap-2
                md:gap-3
              "
            >
              {/* Icon */}
              <Folder
                size={18}
                className={`
                  shrink-0

                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                        text-primary
                      `
                      : `
                        text-zinc-500
                        dark:text-zinc-400

                        group-hover:text-primary
                      `
                  }
                `}
              />

              {/* TEXT */}
              <div className="min-w-0">
                <h3
                  className="
                    truncate
                    text-[10px]
                    md:text-xs
                    font-medium
                    text-zinc-900
                    dark:text-white
                  "
                >
                  {item.name}
                </h3>

                <p
                  className="
                    text-[10px]
                    md:text-[11px]

                    text-zinc-500
                    dark:text-zinc-400
                  "
                >
                  {item.count || 0} mục
                </p>
              </div>

              {/* ACTION */}
              <MoreVertical
                size={13}
                className={`
                  shrink-0

                  transition-all
                  duration-300

                  ${
                    isActive
                      ? `
                        text-primary
                      `
                      : `
                        text-zinc-400
                        dark:text-zinc-500

                        group-hover:text-primary
                      `
                  }
                `}
              />
            </div>

            {/* Active Ring */}
            {isActive && (
              <div
                className="
                  absolute inset-0

                  rounded-full

                  ring-1
                  ring-primary/20

                  pointer-events-none
                "
              />
            )}
          </Link>
        )
      })}
    </div>
  )
}
