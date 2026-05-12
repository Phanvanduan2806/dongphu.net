'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/utilities/ui'

type BaseProps = {
  children: React.ReactNode
  className?: string

  icon?: React.ReactNode
  showArrow?: boolean

  variant?: 'primary' | 'secondary'
}

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never
  }

type LinkProps = BaseProps &
  React.ComponentProps<typeof Link> & {
    href: string
    onClick?: never
  }

type Props = ButtonProps | LinkProps

export default function RootButton(props: Props) {
  const { children, className, icon, showArrow = true, variant = 'primary', ...rest } = props

  const shouldShowArrow = showArrow && !icon

  const baseClass = cn(
    `
      group
      relative

      inline-flex
      items-center
      justify-center
      gap-2

      overflow-hidden

      rounded-2xl

      px-6 py-3.5

      text-sm
      font-semibold

      transition-all
      duration-300

      active:scale-[0.98]
    `,
    variant === 'primary' &&
      `
        border border-primary/20

        bg-primary
        text-primary-foreground

        shadow-[0_10px_30px_hsl(var(--primary)/0.25)]

        hover:-translate-y-0.5
        hover:shadow-[0_16px_40px_hsl(var(--primary)/0.35)]
      `,
    variant === 'secondary' &&
      `
        border border-zinc-200 dark:border-white/10

        bg-white/80 dark:bg-white/[0.03]
        backdrop-blur-xl

        text-zinc-700 dark:text-zinc-300

        hover:border-primary/20
        hover:bg-primary/[0.04]
        dark:hover:bg-primary/[0.08]

        hover:text-primary
      `,
    className,
  )

  const content = (
    <>
      {/* Shine */}
      <span
        className="
          absolute inset-0
          -translate-x-full
          group-hover:translate-x-full
          transition-transform duration-1000
          bg-gradient-to-r from-transparent via-white/20 to-transparent
          skew-x-12
        "
      />

      {/* Glow */}
      {variant === 'primary' && (
        <span
          className="
            absolute inset-0
            opacity-0 group-hover:opacity-100
            transition-opacity duration-300
            bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_40%)]
          "
        />
      )}

      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="shrink-0">{icon}</span>}

        {children}

        {shouldShowArrow && (
          <ArrowRight
            size={16}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        )}
      </span>
    </>
  )

  /* ================= LINK ================= */
  if ('href' in props) {
    return (
      <Link {...(rest as LinkProps)} className={baseClass}>
        {content}
      </Link>
    )
  }

  /* ================= BUTTON ================= */
  return (
    <button {...(rest as ButtonProps)} className={baseClass}>
      {content}
    </button>
  )
}
