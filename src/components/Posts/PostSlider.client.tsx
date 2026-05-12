'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Card } from '@/components/Card'
import { Section } from '../sections/RootSection'
import RootButton from '@/components/sections/RootButton'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function PostSliderClient({ posts }: { posts: any[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
  })

  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  if (!posts?.length) return null

  return (
    <Section.Root
      size="lg"
      className="
        relative
        bg-gradient-to-b
        from-background
        via-primary/[0.02]
        to-background
      "
    >
      {/* ================= BACKGROUND ================= */}

      {/* GRID */}
      <div
        className="
          absolute inset-0
          opacity-[0.04]
          dark:opacity-[0.06]
          bg-[linear-gradient(to_right,hsl(var(--primary))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary))_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />
      <div
        className="
    absolute -top-[30%] right-0
    h-[420px]
    w-[420px]
    rounded-full
    bg-primary/25
    blur-[120px]
    pointer-events-none
    opacity-80
  "
      />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10">
        {/* HEADER */}
        <div className="flex items-end justify-between mb-8">
          <Section.Intro>
            <Section.Label>Latest Posts</Section.Label>
            <Section.Title>Bài viết mới</Section.Title>
            <Section.Description>
              Cập nhật nội dung mới nhất từ hệ thống của chúng tôi
            </Section.Description>
          </Section.Intro>

          {/* NAV BUTTONS (RootButton system) */}
          <div className="flex gap-2">
            <RootButton
              variant="secondary"
              onClick={() => emblaApi?.scrollPrev()}
              showArrow={false}
              icon={<ArrowLeft className="h-4 w-4" />}
              className="h-11 w-11 p-0"
            >
              <span className="sr-only">Prev</span>
            </RootButton>

            <RootButton
              variant="secondary"
              onClick={() => emblaApi?.scrollNext()}
              showArrow={false}
              icon={<ArrowRight className="h-4 w-4" />}
              className="h-11 w-11 p-0"
            >
              <span className="sr-only">Next</span>
            </RootButton>
          </div>
        </div>

        {/* ================= SLIDER ================= */}
        <div className="overflow-hidden py-2" ref={emblaRef}>
          <div className="flex gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="
                  flex-[0_0_85%]
                  sm:flex-[0_0_60%]
                  md:flex-[0_0_45%]
                  lg:flex-[0_0_30%]
                  xl:flex-[0_0_24%]
                "
              >
                <Card doc={post} relationTo="posts" className="h-full" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="mt-10 flex justify-center">
          <RootButton href="/posts" variant="secondary">
            Xem tất cả bài viết
          </RootButton>
        </div>
      </div>
    </Section.Root>
  )
}
