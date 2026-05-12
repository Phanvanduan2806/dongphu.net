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

import type { Project } from '@/payload-types'

type Props = {
  params: Promise<{
    slug: string
  }>
}

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
        <h1 className="text-3xl font-bold">{project.title}</h1>
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
                    border rounded-xl
                    bg-white shadow-sm
                    px-4
                  "
                >
                  <AccordionTrigger className="text-left font-medium text-base">
                    {item.label || `Hình ${i + 1}`}
                  </AccordionTrigger>

                  <AccordionContent className="pt-4">
                    <div className="rounded-xl overflow-hidden">
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
        <div className="bg-white border rounded-2xl p-6 md:p-10 shadow-sm">
          <ScrollArea className="h-[calc(100vh-200px)] pr-4">
            <div className="prose dark:prose-invert max-w-none">
              <RichText data={project.content} />
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
