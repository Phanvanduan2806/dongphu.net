import type { CollectionConfig } from 'payload'

const removeAccents = (str: string) =>
  str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')

const slugify = (text: string) =>
  removeAccents(text)
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

export const ProjectCategories: CollectionConfig = {
  slug: 'project-categories',

  labels: {
    singular: 'Danh mục dự án',
    plural: 'Danh mục dự án',
  },

  admin: {
    useAsTitle: 'name',
  },

  fields: [
    // =========================
    // NAME
    // =========================
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Tên danh mục',
    },

    // =========================
    // SLUG
    // =========================
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        position: 'sidebar',
        description: 'Tự tạo từ tên danh mục nếu để trống',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return slugify(data.name)
            }
            return value
          },
        ],
      },
    },

    // =========================
    // THUMBNAIL (SIDEBAR)
    // =========================
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Ảnh đại diện',
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
