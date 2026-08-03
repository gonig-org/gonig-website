import { defineArrayMember, defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Event Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Used in the URL: gonig.org/events/your-slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "date",
      title: "Event Date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "standfirst",
      title: "Short Description",
      type: "text",
      rows: 2,
      description: "One or two sentences shown in the hero carousel and event listings.",
    }),
    defineField({
      name: "writeup",
      title: "Full Writeup",
      type: "text",
      rows: 8,
      description: "Full event description shown on the event gallery page.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      description: "The featured image shown in the hero carousel.",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Photo Gallery",
      type: "array",
      description: "The full photo album for this event.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "showInHero",
      title: "Show in Hero Carousel",
      type: "boolean",
      description: "Turn on to feature this event in the home page carousel.",
      initialValue: false,
    }),
    defineField({
      name: "heroOrder",
      title: "Hero Order",
      type: "number",
      description: "Controls the order in the carousel. Lower numbers appear first.",
      hidden: ({ document }) => !document?.showInHero,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "date",
      media: "heroImage",
    },
  },
  orderings: [
    {
      title: "Date, Newest First",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
});
