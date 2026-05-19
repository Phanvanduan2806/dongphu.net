'use client'

import React from 'react'

import type { Project } from '@/payload-types'

import { Section } from '../sections/RootSection'

import { useProjects } from '@/hooks/useProjects'

import { ProjectCard } from './ProjectCard'

import { Input } from '@/components/ui/input'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { LayoutGrid, SlidersHorizontal } from 'lucide-react'

type Props = {
  initialData: Project[]
}

export default function ProjectPageClient({ initialData }: Props) {
  const {
    loading,

    viewMode,
    setViewMode,

    activeId,
    setActiveId,

    keyword,
    setKeyword,

    category,
    setCategory,

    categories,

    page,
    setPage,

    totalPages,

    paginated,
  } = useProjects(initialData)

  return (
    <Section.Root>
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 gap-4">
        <Section.Intro>
          <Section.Title as="h1" className="sr-only">
            Dự án
          </Section.Title>
          <Section.Label>Showcase</Section.Label>

          <Section.Title>Danh sách dự án</Section.Title>
        </Section.Intro>
      </div>

      {/* ================= FILTER ================= */}
      <div
        className="
    flex flex-col xl:flex-row xl:items-end xl:justify-between
    gap-5
    mb-10

    rounded-3xl
    border

    border-zinc-200/80
    dark:border-white/10

    bg-white/80
    dark:bg-zinc-900/60

    backdrop-blur-xl

    shadow-sm
    dark:shadow-[0_0_0_1px_rgba(255,255,255,0.03)]

    p-5
  "
      >
        <div>
          <span
            className="
          inline-flex items-center
          px-3 py-1

          text-[11px]
          font-medium

          rounded-full

          border
          border-primary/20

          bg-primary/10
          text-primary

          dark:bg-primary/15
          dark:border-primary/20

          mb-3
        "
          >
            Bộ lọc dự án
          </span>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* ================= SEARCH ================= */}
            <Input
              placeholder="Tìm dự án..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="
            h-11
            w-full
            sm:w-[320px]

            rounded-2xl

            border
            border-zinc-200
            dark:border-white/10

            bg-white
            dark:bg-white/[0.03]

            text-zinc-900
            dark:text-white

            placeholder:text-zinc-400
            dark:placeholder:text-zinc-500

            shadow-none

            focus-visible:ring-2
            focus-visible:ring-primary/30
            focus-visible:border-primary/40

            transition-all
          "
            />

            {/* ================= CATEGORY ================= */}
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                className="
              h-11
              w-full
              sm:w-[240px]

              rounded-2xl

              border-zinc-200
              dark:border-white/10

              bg-white
              dark:bg-white/[0.03]

              text-zinc-900
              dark:text-white
            "
              >
                <SelectValue placeholder="Tất cả danh mục" />
              </SelectTrigger>

              <SelectContent
                className="
              rounded-2xl

              border-zinc-200
              dark:border-white/10

              bg-white
              dark:bg-zinc-900
            "
              >
                <SelectItem value="all">Tất cả</SelectItem>

                {categories.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ================= SUGGEST CATEGORY ================= */}
        <div>
          <span
            className="
          inline-flex items-center
          px-3 py-1

          text-[11px]
          font-medium

          rounded-full

          border
          border-primary/20

          bg-primary/10
          text-primary

          dark:bg-primary/15
          dark:border-primary/20

          mb-3
        "
          >
            Danh mục đề xuất
          </span>

          <div className="flex flex-wrap gap-1">
            {categories.slice(0, 4).map((c) => {
              const active = category === c.slug

              return (
                <button
                  key={c.slug}
                  onClick={() => setCategory(active ? 'all' : c.slug)}
                  className={`
          px-3 py-1.5

          rounded-xl

          border

          text-xs
          font-medium

          transition-all
          duration-200

          ${
            active
              ? `
                bg-primary
                text-primary-foreground
                border-primary

                shadow-md
                shadow-primary/20
              `
              : `
                bg-white
                dark:bg-white/[0.03]

                text-zinc-700
                dark:text-zinc-300

                border-zinc-200
                dark:border-white/10

                hover:bg-zinc-100
                dark:hover:bg-white/[0.06]

                hover:border-primary/30
              `
          }
        `}
                >
                  {c.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* ================= VIEW MODE ================= */}
        <div className="max-w-[190px]">
          <span
            className="
          inline-flex items-center
          px-3 py-1

          text-[11px]
          font-medium

          rounded-full

          border
          border-primary/20

          bg-primary/10
          text-primary

          dark:bg-primary/15
          dark:border-primary/20

          mb-3
        "
          >
            Chế độ xem
          </span>

          <div
            className="
        flex gap-2

        rounded-2xl

        border
        border-zinc-200
        dark:border-white/10

        bg-zinc-100/80
        dark:bg-white/[0.03]

        p-1
      "
          >
            <button
              onClick={() => setViewMode('grid')}
              className={`
          h-10
          px-4

          rounded-xl

          flex items-center gap-2

          text-sm
          font-medium

          transition-all

          ${
            viewMode === 'grid'
              ? `
                bg-white
                dark:bg-white/10

                text-zinc-900
                dark:text-white

                shadow-sm
              `
              : `
                text-zinc-500
                dark:text-zinc-400

                hover:text-zinc-900
                dark:hover:text-white
              `
          }
        `}
            >
              <LayoutGrid size={16} />
              Grid
            </button>

            <button
              onClick={() => setViewMode('slide')}
              className={`
          h-10
          px-4

          rounded-xl

          flex items-center gap-2

          text-sm
          font-medium

          transition-all

          ${
            viewMode === 'slide'
              ? `
                bg-white
                dark:bg-white/10

                text-zinc-900
                dark:text-white

                shadow-sm
              `
              : `
                text-zinc-500
                dark:text-zinc-400

                hover:text-zinc-900
                dark:hover:text-white
              `
          }
        `}
            >
              <SlidersHorizontal size={16} />
              Slide
            </button>
          </div>
        </div>
      </div>
      {/* ================= GRID ================= */}
      {viewMode === 'grid' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {loading && <div>Loading...</div>}

            {!loading && paginated.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-10">
                Không tìm thấy dự án
              </div>
            )}

            {!loading &&
              paginated.map((item) => (
                <ProjectCard
                  key={item.id}
                  data={item}
                  activeId={activeId}
                  setActiveId={setActiveId}
                  variant="grid"
                />
              ))}
          </div>

          {/* ================= PAGINATION ================= */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage((p) => Math.max(p - 1, 1))}
                      className={page === 1 ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>

                  {Array.from({
                    length: totalPages,
                  }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)}>
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                      className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <div className="relative">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {paginated.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="
                    pl-4
                    basis-[85%]
                    md:basis-1/2
                    xl:basis-1/3
                  "
                >
                  <ProjectCard
                    data={item}
                    activeId={activeId}
                    setActiveId={setActiveId}
                    variant="slide"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="-left-4" />

            <CarouselNext className="-right-4" />
          </Carousel>
        </div>
      )}
    </Section.Root>
  )
}
