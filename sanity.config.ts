"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "The Lazy Mermaid Murals",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("project")
              .title("Projects")
              .child(
                S.documentTypeList("project")
                  .title("Projects")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),
            S.documentTypeListItem("galleryItem")
              .title("Gallery photos")
              .child(
                S.documentTypeList("galleryItem")
                  .title("Gallery photos")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),
          ]),
    }),
  ],
});
