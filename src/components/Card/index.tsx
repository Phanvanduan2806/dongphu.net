'use client'

import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'
import { ArrowRight } from 'lucide-react'

export type CardPostData = Partial<
  Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'createdAt' | 'publishedAt'>
>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})

  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, createdAt, publishedAt } = doc || {}

  const { description, image: metaImage } = meta || {}

  const hasCategories = Array.isArray(categories) && categories.length > 0

  const titleToUse = titleFromProps || title

  const sanitizedDescription = description?.replace(/\s/g, ' ')

  const href = relationTo && slug ? `/${relationTo}/${slug}` : '#'

  const dateValue = publishedAt || createdAt

  const date = dateValue
    ? new Date(dateValue).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : null

  return (
    <article
      className={cn(
        `
          border
          border-border

          rounded-xl
          overflow-hidden

          bg-card

          transition-all
          duration-300

          hover:shadow-lg
          hover:-translate-y-1
        `,
        className,
      )}
      ref={card.ref}
    >
      {/* IMAGE */}
      <div className="relative w-full overflow-hidden group">
        {!metaImage && (
          <div
            className="
              h-[200px]

              flex items-center justify-center

              text-sm
              text-muted-foreground
            "
          >
            No image
          </div>
        )}

        {metaImage && typeof metaImage !== 'string' && (
          <div
            className="
              transition-transform
              duration-500

              group-hover:scale-105
            "
          >
            <Media resource={metaImage} size="33vw" />
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-2">
        {/* Categories */}
        {showCategories && hasCategories && (
          <div
            className="
              text-xs
              uppercase

              text-muted-foreground
            "
          >
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const isLast = index === categories.length - 1

                return (
                  <Fragment key={index}>
                    {category.title}
                    {!isLast && ', '}
                  </Fragment>
                )
              }

              return null
            })}
          </div>
        )}

        {/* TITLE */}
        {titleToUse && (
          <h3
            className="
              text-lg
              font-semibold
              leading-snug
            "
          >
            <Link
              href={href}
              ref={link.ref}
              className="
                transition-colors
                hover:text-primary
              "
            >
              {titleToUse}
            </Link>
          </h3>
        )}

        {/* DATE */}
        {date && (
          <div
            className="
              text-xs
              text-muted-foreground
            "
          >
            {date}
          </div>
        )}

        {/* DESCRIPTION */}
        {sanitizedDescription && (
          <p
            className="
              text-sm
              text-muted-foreground

              line-clamp-2
            "
          >
            {sanitizedDescription}
          </p>
        )}

        {/* BUTTON */}
        <Link
          href={href}
          className="
            inline-flex
            items-center
            gap-2

            w-fit
            mt-1

            rounded-md
            border
            border-border

            px-3
            py-1.5

            text-xs

            transition

            hover:bg-muted
          "
        >
          Xem thêm
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  )
}
