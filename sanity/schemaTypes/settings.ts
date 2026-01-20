import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Einstellungen',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Seitentitel',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'email',
      title: 'E-Mail',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'behance',
      title: 'Behance URL',
      type: 'url',
    }),
  ],
})