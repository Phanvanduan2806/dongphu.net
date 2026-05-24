import React from 'react'

import { Check, Globe, Server, DatabaseBackup, ShieldCheck, FolderKanban } from 'lucide-react'

import { Section } from '@/components/sections/RootSection'

export default function PriceList() {
  const plans = [
    {
      name: 'Tiêu chuẩn',
      price: '3.500.000đ',
      desc: 'Phù hợp cho cá nhân kinh doanh online và landing page cơ bản.',

      features: [
        'Giao diện có sẵn, không chỉnh sửa layout',
        'Responsive Mobile',
        'Bàn giao trong 3 - 5 ngày',
        'Tối ưu tốc độ tải trang',
        'SEO Onpage cơ bản',
      ],

      extras: [
        {
          icon: Globe,
          text: 'Tặng tên miền .com / 1 năm',
        },
        {
          icon: Server,
          text: 'Hosting 5GB / 1 năm',
        },
        {
          icon: FolderKanban,
          text: 'Bàn giao source code',
        },
        {
          icon: DatabaseBackup,
          text: 'Backup dữ liệu hàng tuần',
        },
      ],

      popular: false,
      button: 'Đăng ký ngay',
    },

    {
      name: 'Doanh nghiệp',
      price: '> 12.000.000đ',
      desc: 'Giải pháp chuyên nghiệp dành cho doanh nghiệp vừa và nhỏ.',

      features: [
        'Thiết kế layout riêng 8 trang',
        'Chỉnh sửa giao diện 2 lần',
        'Responsive Mobile & Tablet',
        'Tối ưu chuẩn SEO',
        'Animation & hiệu ứng hiện đại',
        'Tặng 2 banner thiết kế',
      ],

      extras: [
        {
          icon: Globe,
          text: 'Tên miền .COM 1 năm',
        },
        {
          icon: Server,
          text: 'Hosting 5GB / 1 năm',
        },
        {
          icon: FolderKanban,
          text: 'Bàn giao source đầy đủ',
        },
        {
          icon: DatabaseBackup,
          text: 'Backup dữ liệu định kỳ',
        },
      ],

      popular: true,
      button: 'Tư vấn ngay',
    },

    {
      name: 'Chuyên nghiệp',
      price: 'Liên hệ',
      desc: 'Thiết kế giao diện độc quyền theo yêu cầu riêng của doanh nghiệp.',

      features: [
        'Thiết kế UI/UX độc quyền',
        'Không giới hạn chỉnh sửa',
        'Responsive đa thiết bị',
        'Tối ưu SEO & Core Web Vitals',
        'Hiệu ứng cao cấp',
        'Tích hợp tính năng, API theo yêu cầu',
      ],

      extras: [
        {
          icon: Globe,
          text: 'Tên miền .COM 1 năm',
        },
        {
          icon: Server,
          text: 'Hosting 5GB / 1 năm',
        },
        {
          icon: FolderKanban,
          text: 'Bàn giao source đầy đủ',
        },
        {
          icon: DatabaseBackup,
          text: 'Backup dữ liệu định kỳ',
        },
      ],
      popular: false,
      button: 'Liên hệ ngay',
    },
  ]

  return (
    <Section.Root size="lg" className="relative overflow-hidden" containerClassName="relative z-10">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <Section.Intro className="mx-auto text-center">
        <Section.Label>Bảng Giá Dịch Vụ</Section.Label>

        <Section.Title className="text-3xl md:text-5xl">Giải Pháp Website Hiện Đại</Section.Title>

        <Section.Description>
          Các gói dịch vụ được tối ưu cho cá nhân, doanh nghiệp và hệ thống chuyên nghiệp với trải
          nghiệm hiện đại và nâng cao hiệu năng.
        </Section.Description>
      </Section.Intro>

      <Section.Content className="mt-14 grid gap-6 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`
              group relative flex flex-col overflow-hidden rounded-[30px]
              border backdrop-blur-xl transition-all duration-300

              ${
                plan.popular
                  ? `
                    border-primary/40
                    bg-primary/[0.08]
                    shadow-[0_0_60px_hsl(var(--primary)/0.18)]
                    lg:-translate-y-2
                  `
                  : `
                    border-border/60
                    bg-card/50
                    hover:border-primary/20
                    hover:bg-card
                  `
              }
            `}
          >
            {/* Hover Glow */}
            <div
              className="
                absolute inset-0 opacity-0 transition-opacity duration-500
                group-hover:opacity-100
              "
            >
              <div className="absolute inset-x-0 top-0 h-40 bg-primary/10 blur-3xl" />
            </div>

            {/* Popular Badge */}
            {plan.popular && (
              <div
                className="
                  absolute right-5 top-5
                  rounded-full border border-primary/20
                  bg-primary px-3 py-1
                  text-[11px] font-semibold uppercase tracking-[0.2em]
                  text-primary-foreground
                "
              >
                Phổ biến
              </div>
            )}

            <div className="relative flex h-full flex-col p-8">
              {/* Header */}
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">{plan.name}</h3>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-3xl font-bold tracking-tight md:text-4xl">
                    {plan.price}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">{plan.desc}</p>
              </div>

              {/* Features */}
              <div className="mt-8 space-y-4">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-foreground/90">
                    <div
                      className="
                        flex h-6 w-6 shrink-0 items-center justify-center
                        rounded-full border border-primary/20
                        bg-primary/10 text-primary
                      "
                    >
                      <Check className="h-3.5 w-3.5" />
                    </div>

                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Extras */}
              <div className="mt-8 border-t border-border/60 pt-6">
                <div className="space-y-4">
                  {plan.extras.map((item, i) => {
                    const Icon = item.icon

                    return (
                      <div
                        key={i}
                        className="
                          flex items-center gap-3
                          text-sm text-muted-foreground
                        "
                      >
                        <div
                          className="
                            flex h-9 w-9 shrink-0 items-center justify-center
                            rounded-xl border border-primary/10
                            bg-primary/10 text-primary
                          "
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <span>{item.text}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Button */}
              <button
                className={`
                  mt-10 inline-flex h-12 w-full items-center justify-center
                  rounded-2xl text-sm font-semibold
                  transition-all duration-300

                  ${
                    plan.popular
                      ? `
                        bg-primary
                        text-primary-foreground
                        hover:opacity-90
                        hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)]
                      `
                      : `
                        border border-border
                        bg-background/60
                        hover:border-primary/30
                        hover:bg-primary/5
                      `
                  }
                `}
              >
                {plan.button}
              </button>
            </div>
          </div>
        ))}
      </Section.Content>
    </Section.Root>
  )
}
