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

export const ProjectTiers: CollectionConfig = {
  slug: 'project-tiers',

  labels: {
    singular: 'Gói dự án',
    plural: 'Gói dự án',
  },

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'order', 'updatedAt'],
  },

  fields: [
    // =========================
    // NAME
    // =========================
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Tên gói',
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
        description: 'Tự tạo từ tên gói nếu để trống',
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
    // ORDER
    // =========================
    {
      name: 'order',
      type: 'number',
      label: 'Thứ tự hiển thị',
      defaultValue: 0,

      admin: {
        position: 'sidebar',
      },
    },
  ],
}
