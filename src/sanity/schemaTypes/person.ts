import { defineField, defineType } from "sanity";

export const person = defineType({
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "board",
      title: "Board",
      type: "string",
      options: {
        list: [
          { title: "National Executives", value: "executives" },
          { title: "Board of Advisers", value: "advisers" },
          { title: "Board of Trustees", value: "trustees" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "trusteeType",
      title: "Trustee Type",
      type: "string",
      description: "Only set this when Board is Board of Trustees",
      options: {
        list: [
          { title: "Founding Trustee", value: "founding" },
          { title: "New Appointee", value: "appointee" },
        ],
      },
      hidden: ({ document }) => document?.board !== "trustees",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "inMemoriam",
      title: "In Memoriam",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description:
        "Controls the order this person appears on the page. Lower numbers appear first.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "board",
      media: "photo",
    },
  },
});
