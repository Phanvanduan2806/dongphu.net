import { getProjects } from '@/utilities/getProjects'

import ProjectPageClient from '@/components/Projects/ProjectPageClient'

export default async function Page() {
  const projects = await getProjects({
    limit: 100,
  })

  return <ProjectPageClient initialData={projects} />
}
