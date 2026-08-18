import type { SchemaTypeDefinition } from "sanity";
import { projectType } from "./projectType";
import { galleryItemType } from "./galleryItemType";

export const schemaTypes: SchemaTypeDefinition[] = [
  projectType,
  galleryItemType,
];
