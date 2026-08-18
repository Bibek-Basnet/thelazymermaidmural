import { defineArrayMember, defineField, defineType } from "sanity";

const photoFields = [
  defineField({
    name: "alt",
    title: "Alt text",
    type: "string",
    description: "Short description of the photo for accessibility and SEO.",
  }),
  defineField({
    name: "showInGallery",
    title: "Show in landing page gallery",
    type: "boolean",
    initialValue: false,
    description:
      "Turn on to also show this photo in the gallery section on the home page — no need to upload it again.",
  }),
];

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "The URL of the project page, e.g. /portfolio/tv3-carpark",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),
    defineField({
      name: "eyebrow",
      title: "Eyebrow (landing carousel)",
      type: "string",
      description:
        "Small line shown above the title on the home page carousel, e.g. “Creative Bay of Plenty × Tauranga City Council”. Falls back to the client name.",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      description: "e.g. Public art, Interactive artwork, Community projects…",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      description: "e.g. “160 sqm” or “84 hand-painted animals, 2 buildings”",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description (landing carousel)",
      type: "text",
      rows: 2,
      description:
        "Shorter blurb for the home page carousel. Falls back to the main description.",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: photoFields,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      description:
        "Photos shown on the project detail page. Tip: use “Select” in the image picker to reuse any photo already uploaded elsewhere.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: photoFields,
        }),
      ],
      options: { layout: "grid" },
    }),
    defineField({
      name: "concepts",
      title: "Concepts",
      type: "array",
      description:
        "Optional sub-sections for projects with multiple concepts (e.g. a mural series). Each concept has its own label, text and photos.",
      of: [
        defineArrayMember({
          type: "object",
          name: "concept",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "images",
              title: "Photos",
              type: "array",
              of: [
                defineArrayMember({
                  type: "image",
                  options: { hotspot: true },
                  fields: photoFields,
                }),
              ],
              options: { layout: "grid" },
            }),
          ],
          preview: {
            select: { title: "label", media: "images.0" },
          },
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Feature on landing page",
      type: "boolean",
      initialValue: false,
      description:
        "Turn on to show this project in the “Featured work” carousel on the home page.",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      description:
        "Projects are sorted by this number (lowest first) on the portfolio page and the landing carousel.",
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Year (newest first)",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      client: "client",
      year: "year",
      featured: "featured",
      media: "coverImage",
    },
    prepare({ title, client, year, featured, media }) {
      return {
        title: `${featured ? "★ " : ""}${title ?? "Untitled"}`,
        subtitle: [client, year].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});
