import { defineField, defineType } from "sanity";

export const member = defineType({
  name: "member",
  title: "Member",
  type: "document",
  fields: [
    defineField({
      name: "membershipNo",
      title: "Membership Number",
      type: "string",
      description: 'e.g. GON-0001',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fullName",
      title: "Full Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "Active" },
          { title: "Inactive", value: "Inactive" },
        ],
        layout: "radio",
      },
      initialValue: "Active",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "fullName",
      subtitle: "membershipNo",
    },
  },
  orderings: [
    {
      title: "Membership Number",
      name: "membershipNoAsc",
      by: [{ field: "membershipNo", direction: "asc" }],
    },
  ],
});
