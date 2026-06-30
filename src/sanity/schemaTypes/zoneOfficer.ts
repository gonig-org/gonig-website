import { defineField, defineType } from "sanity";

export const zoneOfficer = defineType({
  name: "zoneOfficer",
  title: "Zone / Chapter Officer",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "zone",
      title: "Zone / Chapter",
      type: "string",
      description: "e.g. Southwest Zone, South-South Zone",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "e.g. Zonal Chairman, Zonal Secretary",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Controls the order within the zone. Lower numbers appear first.",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "zone",
    },
  },
});
