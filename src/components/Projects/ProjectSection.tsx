import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import { Section } from '../sections/RootSection'
import { ProjectCard } from '@/components/Projects/ProjectCard'
import ProjectCategoryList from '@/components/Projects/ProjectCategoryList'
import RootButton from '../sections/RootButton'

import type { Project } from '@/payload-types'
import { getProjects } from '@/utilities/getProjects'

export default async function ProjectSection() {
  const projects = (await getProjects({
    featured: true,
    limit: 3,
  })) as Project[]

  const categoryMap = new Map<string, { slug: string; name: string; count: number }>()

  projects.forEach((project) => {
    const cats = Array.isArray(project.category)
      ? project.category
      : project.category
        ? [project.category]
        : []

    cats.forEach((c: any) => {
      if (!c || typeof c !== 'object') return
      if (!c.slug) return

      const existing = categoryMap.get(c.slug)

      if (existing) {
        existing.count += 1
      } else {
        categoryMap.set(c.slug, {
          slug: c.slug,
          name: c.name || c.slug,
          count: 1,
        })
      }
    })
  })

  const categories = Array.from(categoryMap.values())

  return (
    <Section.Root>
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4">
        <Section.Intro>
          <Section.Label>Showcase</Section.Label>
          <Section.Title>Những dự án tiêu biểu</Section.Title>
          <Section.Description>
            Một số dự án nổi bật được chọn lọc theo chất lượng và mức độ hoàn thiện.
          </Section.Description>
        </Section.Intro>

        {/* ================= BUTTON (ROOTBUTTON SYNC) ================= */}
        <RootButton href="/projects" variant="secondary">
          Xem thêm
        </RootButton>
      </div>

      {/* ================= GRID ================= */}
      <Section.Content>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project) => (
            <ProjectCard key={project.id} data={project} variant="grid" />
          ))}
        </div>

        <div className="mt-6">
          <ProjectCategoryList categories={categories} />
        </div>
      </Section.Content>
    </Section.Root>
  )
}
