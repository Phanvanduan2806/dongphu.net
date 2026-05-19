import { getProjects } from '@/utilities/getProjects'

import ProjectPageClient from '@/components/Projects/ProjectPageClient'

import { generateMeta } from '@/utilities/generateMeta'

export default async function Page() {
  const projects = await getProjects({
    limit: 100,
  })

  return <ProjectPageClient initialData={projects} />
}

export const metadata = await generateMeta({
  doc: {
    slug: 'projects',

    meta: {
      title: 'Dự án, template website | Đông Phú Digital',

      description:
        'Khám phá các dự án website hiện đại do Đông Phú Digital phát triển bằng Next.js và Payload CMS, Wordpress tối ưu SEO, UI/UX và hiệu năng trên mọi thiết bị.',
    },
  },
})
