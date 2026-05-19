import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const serverUrl = getServerSideURL()

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? `${doc.meta.title}`
    : 'Đông Phú Digital | Thiết kế website chuẩn SEO hiện đại'

  const description =
    doc?.meta?.description ||
    'Đông Phú Digital cung cấp giải pháp thiết kế website hiện đại, tối ưu SEO và trải nghiệm người dùng, giúp doanh nghiệp xây dựng thương hiệu số chuyên nghiệp.'

  const slug = typeof doc?.slug === 'string' && doc.slug !== 'home' ? `/${doc.slug}` : ''

  const canonicalURL = `${serverUrl}${slug}`

  return {
    metadataBase: new URL(serverUrl),

    title,
    description,

    keywords: [
      'thiết kế website',
      'seo website',
      'nextjs',
      'payload cms',
      'web development',
      'Đông Phú Digital',
    ],

    authors: [
      {
        name: 'Đông Phú Digital',
      },
    ],

    creator: 'Đông Phú Digital',
    publisher: 'Đông Phú Digital',

    robots: {
      index: true,
      follow: true,
    },

    alternates: {
      canonical: canonicalURL,
    },

    openGraph: mergeOpenGraph({
      title,
      description,
      url: canonicalURL,

      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
    }),

    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  }
}
