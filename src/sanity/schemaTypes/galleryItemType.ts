import { defineField, defineType } from "sanity";

export const galleryItemType = defineType({
  name: "galleryItem",
  title: "Gallery photo",
  type: "document",
  description:
    "Standalone photos for the home page gallery. Project photos with “Show in landing page gallery” turned on appear there automatically — only add a photo here if it doesn't belong to a project. Use “Select” in the image picker to reuse an already-uploaded photo.",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Only used to identify the photo in this admin panel.",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description:
            "Short description of the photo for accessibility and SEO.",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description: "Gallery photos are sorted by this number (lowest first).",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", alt: "image.alt", media: "image" },
    prepare({ title, alt, media }) {
      return { title: title || alt || "Gallery photo", media };
    },
  },
});
