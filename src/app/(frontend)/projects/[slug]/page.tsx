import type { Metadata } from 'next'

import { notFound } from 'next/navigation'

import { ScrollArea } from '@/components/ui/scroll-area'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { ProjectCard } from '@/components/Projects/ProjectCard'

import { getProjects } from '@/utilities/getProjects'
import { generateMeta } from '@/utilities/generateMeta'

import type { Project } from '@/payload-types'

type Props = {
  params: Promise<{
    slug: string
  }>
}

/* ================= SEO ================= */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  const projects = (await getProjects({
    limit: 1,
    slug,
  })) as Project[]

  const project = projects?.[0]

  if (!project) {
    return {}
  }

  return generateMeta({
    doc: {
      slug: `projects/${project.slug}`,

      meta: {
        title: project.meta?.title,

        description:
          project.meta?.description ||
          `Khám phá dự án ${project.title} được phát triển bởi đội ngũ Đông Phú Digital với giao diện hiện đại, tối ưu SEO, trải nghiệm người dùng mượt mà và hiệu năng cao bằng công nghệ Next.js cùng Payload CMS trên mọi thiết bị.`,
      },
    },
  })
}

/* ================= PAGE ================= */

export default async function ProjectDetail({ params }: Props) {
  // ================= PARAMS =================
  const { slug } = await params

  // ================= GET PROJECT =================
  const projects = (await getProjects({
    limit: 1,
    slug,
  })) as Project[]

  const project = projects?.[0]

  // ================= NOT FOUND =================
  if (!project) {
    console.log('❌ NOT FOUND PROJECT WITH SLUG:', slug)
    return notFound()
  }

  return (
    <div className="container py-20">
      {/* ================= TITLE ================= */}
      <div className="mb-10 space-y-4">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white transition-colors">
          {project.title}
        </h1>
      </div>

      {/* ================= GRID ================= */}
      <div className="grid lg:grid-cols-3 gap-5 mb-10 mt-5">
        {/* ================= LEFT ================= */}
        <div className="lg:col-span-2 space-y-4">
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {(project.gallery || []).map((item: any, i: number) => {
              if (!item?.image || typeof item.image === 'string') {
                return null
              }

              return (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="
                    border
                    border-zinc-200 dark:border-zinc-800
                    rounded-2xl
                    bg-white dark:bg-zinc-900
                    shadow-sm dark:shadow-black/20
                    px-4
                    transition-colors
                  "
                >
                  <AccordionTrigger
                    className="
                      text-left
                      font-medium
                      text-base
                      text-zinc-800 dark:text-zinc-100
                    "
                  >
                    {item.label || `Hình ${i + 1}`}
                  </AccordionTrigger>

                  <AccordionContent className="pt-4">
                    <div
                      className="
      h-[60vh]
      overflow-y-scroll
      rounded-xl
      border border-zinc-200 dark:border-zinc-800

      [scrollbar-width:none]
      [-ms-overflow-style:none]
      [&::-webkit-scrollbar]:hidden
    "
                    >
                      <Media resource={item.image} size="100vw" />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )
            })}
          </Accordion>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="sticky top-24 h-fit">
          <ProjectCard data={project} isDetail />
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      {project.content && (
        <div
          className="
            bg-white dark:bg-zinc-900
            border border-zinc-200 dark:border-zinc-800
            rounded-2xl
            p-6 md:p-10
            shadow-sm dark:shadow-black/20
            transition-colors
          "
        >
          <ScrollArea className="h-[calc(100vh-200px)] pr-4">
            <div
              className="
                prose
                prose-zinc
                dark:prose-invert
                max-w-none

                prose-headings:text-zinc-900
                dark:prose-headings:text-white

                prose-p:text-zinc-700
                dark:prose-p:text-zinc-300

                prose-strong:text-zinc-900
                dark:prose-strong:text-white

                prose-li:text-zinc-700
                dark:prose-li:text-zinc-300

                prose-a:text-primary
              "
            >
              <RichText data={project.content} />
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
