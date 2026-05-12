'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import React, { useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Menu, X } from 'lucide-react'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const { headerTheme } = useHeaderTheme()

  const [open, setOpen] = useState(false)

  return (
    <header
      className="
        sticky top-0 z-50

        h-[70px]

        border-b
        border-border/60

        bg-background/70

        backdrop-blur-xl
      "
      {...(headerTheme ? { 'data-theme': headerTheme } : {})}
    >
      <div className="container h-full flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center">
          <Logo loading="eager" priority="high" className="dark:brightness-0 dark:invert" />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex flex-1 justify-center">
          <HeaderNav data={data} />
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-2">
          <ThemeSelector />

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-muted transition"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE */}
      {open && (
        <div className="md:hidden border-t bg-background">
          <div className="container py-4">
            <HeaderNav data={data} />
          </div>
        </div>
      )}
    </header>
  )
}
