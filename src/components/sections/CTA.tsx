'use client'

import Link from 'next/link'

import { ArrowRight, Dot } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Section } from './RootSection'
import RootButton from './RootButton'

type Props = {
  title?: string
  description?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
}

export default function CtaBanner({
  title = 'Bạn đã sẵn sàng mở rộng quy mô kinh doanh?',
  description = 'Tham gia cùng hàng trăm doanh nghiệp đang tối ưu vận hành, bán hàng và kế toán trên một nền tảng duy nhất.',
}: Props) {
  return (
    <Section.Root
      size="lg"
      className="
        overflow-hidden

        bg-gradient-to-b
        from-background
        via-primary/[0.02]
        to-background
      "
    >
      <div className="relative">
        {/* Ambient Glow */}
        <div
          className="
            absolute left-1/2 top-1/2

            h-[300px] w-[300px]

            -translate-x-1/2 -translate-y-1/2

            rounded-full

            bg-primary/20

            blur-3xl

            opacity-40
          "
        />

        {/* Card */}
        <div
          className="
            relative

            overflow-hidden

            rounded-[32px]

            border
            border-primary/10

            bg-white/80
            dark:bg-zinc-900/70

            backdrop-blur-2xl

            shadow-[0_10px_60px_rgba(0,0,0,0.06)]
            dark:shadow-[0_10px_60px_rgba(0,0,0,0.30)]

            px-6 py-14
            md:px-12 md:py-20
          "
        >
          {/* Grid Glow */}
          <div
            className="
              absolute inset-0

              opacity-[0.03]
              dark:opacity-[0.05]

              bg-[linear-gradient(to_right,hsl(var(--primary))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary))_1px,transparent_1px)]

              bg-[size:40px_40px]
            "
          />

          {/* Top Glow */}
          <div
            className="
              absolute -top-32 right-0

              h-72 w-72

              rounded-full

              bg-primary/20

              blur-3xl
            "
          />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div
              className="
                inline-flex items-center gap-2

                rounded-full

                border border-primary/15

                bg-primary/[0.06]
                dark:bg-primary/[0.10]

                px-4 py-1.5

                text-xs
                font-medium

                text-primary
              "
            >
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />

              <span className="hidden sm:inline">
                Hệ thống website & phần mềm hiện đại cho doanh nghiệp
              </span>

              <span className="sm:hidden">Giải pháp doanh nghiệp</span>
            </div>

            {/* Title */}
            <h2
              className="
                mt-6

                text-3xl
                sm:text-4xl
                md:text-5xl

                font-bold

                tracking-tight
                leading-tight

                text-zinc-900
                dark:text-white
              "
            >
              {title}
            </h2>

            {/* Description */}
            <p
              className="
                mx-auto
                mt-5

                max-w-2xl

                text-base
                md:text-lg

                leading-relaxed

                text-zinc-600
                dark:text-zinc-400
              "
            >
              {description}
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <RootButton href="/contact">Bắt đầu ngay</RootButton>
              <RootButton href="/projects" variant="secondary">
                Xem dự án
              </RootButton>
            </div>

            {/* Footer */}
            <div
              className="
                mt-8

                flex flex-wrap items-center justify-center

                text-xs
                md:text-sm

                text-zinc-500
                dark:text-zinc-500
              "
            >
              <span>Payload</span>

              <Dot className="mx-1 h-4 w-4 opacity-60" />

              <span>Landing page</span>

              <Dot className="mx-1 h-4 w-4 opacity-60" />

              <span>CRM & ERP System</span>

              <Dot className="mx-1 h-4 w-4 opacity-60" />

              <span>WordPress</span>
            </div>
          </div>
        </div>
      </div>
    </Section.Root>
  )
}
