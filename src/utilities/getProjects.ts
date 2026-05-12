import { getPayload } from 'payload'
import configPromise from '@payload-config'

type Args = {
  featured?: boolean
  slug?: string
  limit?: number
}

export async function getProjects({ featured, slug, limit = 100 }: Args = {}) {
  const payload = await getPayload({
    config: configPromise,
  })

  const where: any = {}

  if (featured !== undefined) {
    where.featured = {
      equals: featured,
    }
  }

  if (slug) {
    where.slug = {
      equals: slug,
    }
  }

  const result = await payload.find({
    collection: 'projects',
    depth: 2,
    limit,
    sort: '-publishedAt',

    ...(Object.keys(where).length > 0 && {
      where,
    }),

    overrideAccess: true,
  })

  return result.docs
}
