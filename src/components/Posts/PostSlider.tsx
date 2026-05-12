import { getPayload } from 'payload'
import config from '@payload-config'
import PostSliderClient from './PostSlider.client'

export default async function PostSlider() {
  const payload = await getPayload({ config })

  const res = await payload.find({
    collection: 'posts',
    limit: 6,
    sort: '-createdAt',
    depth: 1, // 🔥 để Card có meta.image object
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      publishedAt: true,
    },
  })

  return <PostSliderClient posts={res.docs} />
}
