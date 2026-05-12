'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import type { Header as HeaderType } from '@/payload-types'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const pathname = usePathname()
  const navItems = data?.navItems || []

  return (
    <nav
      className="
        relative

        flex items-center

        gap-1

        rounded-2xl

        border
        border-border/60

        bg-background/40

        backdrop-blur-xl

        px-2 py-2
      "
    >
      {navItems.map((item, i) => {
        const { link } = item
        const label = link?.label

        const href =
          link?.type === 'custom'
            ? link?.url || '#'
            : typeof link?.reference?.value === 'object'
              ? `/${link.reference.value.slug}`
              : '#'

        const isActive =
          href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')

        return (
          <Link
            key={i}
            href={href}
            className="
    relative

    px-4 py-2

    text-sm
    font-medium

    rounded-xl

    transition-colors
    duration-300

    text-muted-foreground

    hover:text-foreground

    z-10
  "
          >
            {/* PILL BACKGROUND */}
            {isActive && (
              <motion.span
                layoutId="nav-pill"
                className="
        absolute inset-0

        rounded-xl

        bg-primary/10

        border
        border-primary/20
      "
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 35,
                }}
              />
            )}

            {/* TEXT */}
            <span
              className={`
      relative z-10

      transition-colors
      duration-300

      ${isActive ? 'text-primary' : ''}
    `}
            >
              {label}
            </span>
          </Link>
        )
      })}

      {/* SEARCH */}
      <Link
        href="/search"
        className="
          ml-2

          flex items-center justify-center

          h-9 w-9

          rounded-xl

          text-muted-foreground

          transition-all

          hover:bg-muted/60
          hover:text-foreground
        "
      >
        <SearchIcon className="h-5 w-5" />
      </Link>
    </nav>
  )
}
