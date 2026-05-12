'use client'

import Image from 'next/image'

import { motion } from 'framer-motion'
import {
  TrendingUp,
  Sparkles,
  ShieldCheck,
  Workflow,
  Zap,
  MessageSquareDot,
  Blocks,
} from 'lucide-react'
import { Squares2X2Icon } from '@heroicons/react/24/outline'

import { BorderBeam } from '@/components/ui/border-beam'

import { Section } from '@/components/sections/RootSection'
import RootButton from './RootButton'

export default function HeroBanner() {
  return (
    <Section.Root
      size="lg"
      className="
        relative

        overflow-hidden

        bg-gradient-to-b
        from-background
        via-primary/[0.02]
        to-background
      "
    >
      {/* BACKGROUND */}
      <div
        className="
          absolute inset-0

          opacity-[0.04]
          dark:opacity-[0.06]

          bg-[linear-gradient(to_right,hsl(var(--primary))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary))_1px,transparent_1px)]

          bg-[size:60px_60px]
        "
      />

      {/* TOP GLOW */}
      <div
        className="
          absolute left-1/2 top-0

          h-[500px]
          w-[500px]

          -translate-x-1/2

          rounded-full

          bg-primary/20

          blur-3xl
        "
      />

      <div className="relative z-10 grid items-center gap-14 lg:grid-cols-2">
        {/* ================= LEFT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Section.Label>Digital Transformation Solution</Section.Label>
          {/* TITLE */}
          <h1
            className="
              mt-6

              max-w-2xl

              text-4xl
              md:text-5xl
              xl:text-6xl

              font-black

              leading-[1.05]
              tracking-tight

              text-zinc-900
              dark:text-white
            "
          >
            Xây dựng
            <span className="relative mx-3 inline-block text-primary">hệ thống số</span>
            cho doanh nghiệp
          </h1>

          {/* DESCRIPTION */}
          <Section.Description
            className="
              mt-6

              max-w-xl

              text-base
              md:text-lg

              leading-relaxed

              text-zinc-600
              dark:text-zinc-400
            "
          >
            Thiết kế website, CRM, ERP và hệ thống quản trị dữ liệu giúp doanh nghiệp tối ưu vận
            hành, tự động hóa và tăng trưởng bền vững.
          </Section.Description>

          {/* ACTION */}
          <div className="mt-6 flex flex-wrap gap-4">
            <RootButton
              href="/contact"
              variant="primary"
              className="
                min-w-[180px]
                rounded-2xl
                px-7 py-4
                text-sm
              "
            >
              Bắt đầu ngay
            </RootButton>

            <RootButton
              href="/showcase"
              variant="secondary"
              icon={<Squares2X2Icon className="h-5 w-5" />}
              className="

                rounded-2xl

                px-7 py-4
              "
            >
              Xem dự án
            </RootButton>
          </div>

          {/* TRUST / VALUE STATS */}
          <div className="mt-6 flex flex-wrap gap-2 w-full sm:w-auto">
            {[
              {
                label: 'Triển khai nhanh',
                value: '7-14 ngày',
                icon: Zap,
              },
              {
                label: 'Tuỳ biến',
                value: 'Linh hoạt',
                icon: Blocks,
              },
              {
                label: 'Hỗ trợ kỹ thuật',
                value: 'Trọn vòng đời',
                icon: MessageSquareDot,
              },
            ].map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.label}
                  className="
          group

          inline-flex items-center gap-3

          rounded-2xl

          border
          border-zinc-200/70
          dark:border-white/10

          bg-white/80
          dark:bg-white/[0.03]

          px-4 py-3

          backdrop-blur-xl

          transition-all
          duration-300

          hover:border-primary/20
          hover:bg-primary/[0.03]
          dark:hover:bg-primary/[0.06]
        "
                >
                  {/* ICON */}
                  <div
                    className="
            flex h-9 w-9 items-center justify-center

            rounded-xl

            bg-primary/10

            text-primary
          "
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  {/* TEXT */}
                  <div className="leading-tight">
                    <p
                      className="
              text-sm
              font-bold

              text-zinc-900
              dark:text-white
            "
                    >
                      {item.value}
                    </p>

                    <p
                      className="
              mt-0.5

              text-[11px]

              text-zinc-500
              dark:text-zinc-400
            "
                    >
                      {item.label}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* ================= RIGHT ================= */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
          }}
          className="relative"
        >
          {/* IMAGE CARD */}
          <div
            className="
              relative

              overflow-hidden

              rounded-[32px]

              border
              border-zinc-200/70
              dark:border-white/10

              bg-white/70
              dark:bg-zinc-900/70

              backdrop-blur-2xl

              shadow-[0_20px_80px_rgba(0,0,0,0.08)]
              dark:shadow-[0_20px_80px_rgba(0,0,0,0.35)]
            "
          >
            <Image
              src="/api/media/file/herobanner.webp"
              alt="Hero Banner"
              width={1200}
              height={900}
              priority
              className="
                h-auto
                w-full

                object-cover

                dark:brightness-75
                dark:contrast-110
              "
            />

            {/* OVERLAY */}
            <div
              className="
                absolute inset-0

                bg-gradient-to-t
                from-black/30
                via-transparent
                to-transparent
              "
            />

            <BorderBeam
              duration={8}
              size={250}
              className="
                from-transparent
                via-primary/40
                to-transparent
              "
            />
          </div>

          {/* FLOATING CARD 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.5,
              duration: 0.5,
            }}
            className="
              absolute

              -left-4
              top-6

              hidden
              md:flex

              items-center gap-3

              rounded-2xl

              border
              border-white/10

              bg-background/80

              px-4 py-3

              shadow-2xl

              backdrop-blur-xl
            "
          >
            <div
              className="
                flex h-11 w-11 items-center justify-center

                rounded-2xl

                bg-primary/10

                text-primary
              "
            >
              <Workflow className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Workflow Automation</p>

              <p className="text-sm font-semibold">Tự động hóa quy trình</p>
            </div>
          </motion.div>

          {/* FLOATING CARD 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.7,
              duration: 0.5,
            }}
            className="
              absolute

              bottom-4
              left-4

              flex items-center gap-3

              rounded-2xl

              border
              border-white/10

              bg-background/80

              px-4 py-3

              shadow-2xl

              backdrop-blur-xl
            "
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="
                flex h-11 w-11 items-center justify-center

                rounded-2xl

                bg-primary/10

                text-primary
              "
            >
              <TrendingUp className="h-5 w-5" />
            </motion.div>

            <div>
              <p className="text-xs text-muted-foreground">Tăng trưởng doanh thu</p>

              <p className="text-sm font-semibold">+100% hiệu suất vận hành</p>
            </div>
          </motion.div>

          {/* FLOATING CARD 3 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.9,
              duration: 0.5,
            }}
            className="
              absolute

              -right-3
              top-1/2

              hidden
              lg:flex

              -translate-y-1/2

              items-center gap-3

              rounded-2xl

              border
              border-white/10

              bg-background/80

              px-4 py-3

              shadow-2xl

              backdrop-blur-xl
            "
          >
            <div
              className="
                flex h-11 w-11 items-center justify-center

                rounded-2xl

                bg-primary/10

                text-primary
              "
            >
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Secure Infrastructure</p>

              <p className="text-sm font-semibold">Hệ thống ổn định & bảo mật</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section.Root>
  )
}
