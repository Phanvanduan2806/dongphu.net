'use client'

import {
  Wallet,
  LayoutTemplate,
  Server,
  MessageCircle,
  Briefcase,
  Monitor,
  Users,
  ArrowRight,
} from 'lucide-react'

import { Section } from '@/components/sections/RootSection'
import RootButton from '@/components/sections/RootButton'

export default function WhySection() {
  const features = [
    {
      icon: Wallet,
      title: 'Chi phí tối ưu',
      desc: 'Giải pháp phù hợp ngân sách nhưng vẫn đảm bảo hiệu quả lâu dài.',
    },
    {
      icon: LayoutTemplate,
      title: 'Thiết kế hiện đại',
      desc: 'UI/UX tối ưu trải nghiệm người dùng và tăng chuyển đổi.',
    },
    {
      icon: Server,
      title: 'Hạ tầng ổn định',
      desc: 'Hosting tốc độ cao, bảo mật và tối ưu hiệu suất.',
    },
  ]

  const stats = [
    {
      icon: Briefcase,
      value: '5+',
      label: 'Năm kinh nghiệm',
    },
    {
      icon: Monitor,
      value: '500+',
      label: 'Dự án triển khai',
    },
    {
      icon: Users,
      value: '50+',
      label: 'Khách hàng',
    },
  ]

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
      {/* GRID BACKGROUND */}
      <div
        className="
          absolute inset-0

          opacity-[0.03]
          dark:opacity-[0.05]

          bg-[linear-gradient(to_right,hsl(var(--primary))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary))_1px,transparent_1px)]

          bg-[size:50px_50px]
        "
      />

      <div className="relative z-10 grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* LEFT */}
        <div>
          <Section.Label>Why Choose Us</Section.Label>

          <Section.Title className="max-w-xl">
            Đồng hành cùng doanh nghiệp trong hành trình tăng trưởng số
          </Section.Title>

          <Section.Description className="max-w-2xl">
            Chúng tôi tập trung vào hiệu suất, trải nghiệm người dùng và khả năng mở rộng hệ thống
            để giúp doanh nghiệp vận hành hiệu quả hơn.
          </Section.Description>

          {/* FEATURES */}
          <div className="mt-8 space-y-4">
            {features.map((item, i) => {
              const Icon = item.icon

              return (
                <div
                  key={i}
                  className="
                    group

                    flex items-start gap-4

                    rounded-3xl

                    border
                    border-zinc-200/70
                    dark:border-white/10

                    bg-white/70
                    dark:bg-white/[0.03]

                    p-5

                    backdrop-blur-xl

                    transition-all
                    duration-300

                    hover:border-primary/20
                    hover:bg-primary/[0.03]

                    dark:hover:bg-primary/[0.05]
                  "
                >
                  {/* ICON */}
                  <div
                    className="
                      flex h-12 w-12 min-w-[48px]
                      items-center justify-center

                      rounded-2xl

                      bg-primary/10

                      text-primary

                      transition-transform
                      duration-300

                      group-hover:scale-110
                    "
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* TEXT */}
                  <div>
                    <h3
                      className="
                        text-base
                        font-semibold

                        text-zinc-900
                        dark:text-white
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-1

                        text-sm
                        leading-relaxed

                        text-zinc-500
                        dark:text-zinc-400
                      "
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div>
          <div
            className="
            relative

            overflow-hidden

            rounded-[32px]

            border
            border-primary/10

            bg-white/80
            dark:bg-zinc-900/70

            p-8

            backdrop-blur-2xl

            shadow-[0_20px_60px_rgba(0,0,0,0.06)]
            dark:shadow-[0_20px_60px_rgba(0,0,0,0.30)]
          "
          >
            {/* GLOW */}
            <div
              className="
              absolute -top-20 right-0

              h-60 w-60

              rounded-full

              bg-primary/20

              blur-3xl
            "
            />

            <div className="relative z-10">
              {/* ICON */}
              <div
                className="
                flex h-14 w-14 items-center justify-center

                rounded-2xl

                bg-primary/10

                text-primary
              "
              >
                <MessageCircle className="h-6 w-6" />
              </div>

              {/* TITLE */}
              <h3
                className="
                mt-6

                text-2xl
                font-bold

                tracking-tight

                text-zinc-900
                dark:text-white
              "
              >
                Hỗ trợ & đồng hành lâu dài
              </h3>

              {/* DESC */}
              <p
                className="
                mt-4

                text-sm
                leading-relaxed

                text-zinc-600
                dark:text-zinc-400
              "
              >
                Không chỉ xây dựng website hoặc phần mềm, chúng tôi đồng hành cùng doanh nghiệp
                trong quá trình vận hành và phát triển hệ thống.
              </p>

              {/* ACTION */}
              <div className="mt-8">
                <RootButton href="/contact" className="w-full justify-center">
                  Liên hệ tư vấn
                </RootButton>
              </div>
            </div>
          </div>
          {/* STATS */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            {stats.map((item, i) => {
              const Icon = item.icon

              return (
                <div
                  key={i}
                  className="
                      rounded-2xl

                      border
                      border-zinc-200/70
                      dark:border-white/10

                      bg-background/70

                      p-4

                      text-center
                    "
                >
                  <div
                    className="
                        mx-auto

                        flex h-10 w-10 items-center justify-center

                        rounded-xl

                        bg-primary/10

                        text-primary
                      "
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <p
                    className="
                        mt-3

                        text-xl
                        font-bold

                        text-zinc-900
                        dark:text-white
                      "
                  >
                    {item.value}
                  </p>

                  <p
                    className="
                        mt-1

                        text-[11px]

                        text-zinc-500
                        dark:text-zinc-400
                      "
                  >
                    {item.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Section.Root>
  )
}
