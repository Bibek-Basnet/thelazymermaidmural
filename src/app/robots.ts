import type { MetadataRoute } from "next";

const siteUrl = "https://www.thelazymermaidmurals.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}