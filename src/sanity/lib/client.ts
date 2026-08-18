import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Next.js handles caching/revalidation, so skip Sanity's CDN cache layer
  // to avoid serving stale content after a webhook revalidation.
  useCdn: false,
});
