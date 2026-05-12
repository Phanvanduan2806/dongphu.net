import React from 'react'

import { cn } from '@/utilities/ui'

import { Sparkles } from 'lucide-react'

type BaseProps = {
  children: React.ReactNode
  className?: string
}

type RootProps = BaseProps & {
  as?: React.ElementType
  container?: boolean
  containerClassName?: string
  size?: 'none' | 'sm' | 'md' | 'lg'
}

type BadgeProps = BaseProps & {
  icon?: React.ReactNode
}

const spacing = {
  none: '',
  sm: 'py-3 md:py-5 lg:py-8',
  md: 'py-8 md:py-10 lg:py-15',
  lg: 'py-8 md:py-12 lg:py-20',
}

function Root({
  children,
  className,
  as: Tag = 'section',
  container = true,
  containerClassName,
  size = 'md',
}: RootProps) {
  return (
    <Tag
      className={cn(
        'relative bg-background text-foreground transition-colors duration-300',
        spacing[size],
        className,
      )}
    >
      {container ? <div className={cn('container', containerClassName)}>{children}</div> : children}
    </Tag>
  )
}

function Intro({ children, className }: BaseProps) {
  return <div className={cn('max-w-3xl', className)}>{children}</div>
}

function Label({ children, className, icon = <Sparkles className="h-3.5 w-3.5" /> }: BadgeProps) {
  return (
    <div
      className={cn(
        `
          inline-flex items-center gap-2

          rounded-full

          border border-primary/15

          bg-primary/[0.06]
          dark:bg-primary/[0.08]

          px-4 py-2

          text-xs
          font-medium

          text-primary

          backdrop-blur-xl
        `,
        className,
      )}
    >
      {icon}

      <span>{children}</span>
    </div>
  )
}

function Title({ children, className }: BaseProps) {
  return (
    <h2
      className={cn(
        'mt-5 font-bold leading-tight tracking-tight text-foreground text-xl sm:text-2xl md:text-3xl',
        className,
      )}
    >
      {children}
    </h2>
  )
}

function Description({ children, className }: BaseProps) {
  return (
    <p className={cn('mt-4 text-base leading-relaxed text-muted-foreground md:text-lg', className)}>
      {children}
    </p>
  )
}

function Content({ children, className }: BaseProps) {
  return <div className={cn(className)}>{children}</div>
}

export const Section = {
  Root,
  Intro,
  Label,
  Title,
  Description,
  Content,
}
