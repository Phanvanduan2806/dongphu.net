'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import type { Header as HeaderType } from '@/payload-types'
import { SearchIcon } from 'lucide-react'

const renderIcon = (name?: string | null, active?: boolean) => {
  if (!name) return null
  const Icon = (LucideIcons as any)[name]
  if (!Icon) return null

  return (
    <Icon
      className={`
        h-4 w-4
        transition-colors duration-300
        ${active ? 'text-primary' : 'text-muted-foreground'}
      `}
    />
  )
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const pathname = usePathname()
  const navItems = data?.navItems || []
  const isSearchActive = pathname === '/search'

  return (
    <nav
      className="
    relative

    grid grid-cols-5 md:flex md:items-center

    gap-1

    w-full md:w-auto

    rounded-2xl
    border border-border/60
    bg-background/20
    px-2 py-2
    backdrop-blur-md
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
              flex items-center justify-center
              gap-2
              px-3 md:px-4
              py-2
              rounded-xl
              text-sm font-medium
              transition-colors duration-300
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
                  border border-primary/20
                "
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 35,
                }}
              />
            )}

            {/* MOBILE ICON */}
            <span className="md:hidden relative z-10">{renderIcon(link?.icon, isActive)}</span>

            {/* DESKTOP TEXT */}
            <span
              className={`
                hidden md:inline
                relative z-10
                transition-colors duration-300
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
        className={`
        md:w-8 md:h-8
        md:ml-2
        relative
        flex items-center justify-center
        rounded-xl
        text-muted-foreground
        transition-all
        hover:bg-muted/60
        hover:text-foreground
        ${isSearchActive ? 'text-primary bg-primary/10 border border-primary/20' : ''}
      `}
      >
        <SearchIcon className="h-5 w-5" />
      </Link>
    </nav>
  )
}
