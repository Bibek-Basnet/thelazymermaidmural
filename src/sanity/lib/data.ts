import { groq } from "next-sanity";
import { client } from "./client";
import { urlFor } from "./image";

/** Shared revalidation: pages refresh within 60s of an edit, or instantly
 * via the /api/revalidate webhook (tag: "sanity"). */
const fetchOptions = { next: { revalidate: 60, tags: ["sanity"] } };

type SanityPhoto = {
  asset?: { _ref: string };
  hotspot?: unknown;
  crop?: unknown;
  alt?: string;
  showInGallery?: boolean;
};

export type Photo = {
  src: string;
  alt: string;
};

export type ProjectListItem = {
  slug: string;
  title: string;
  client?: string;
  year?: number;
  category?: string;
  coverUrl: string;
};

export type FeaturedProject = {
  slug: string;
  title: string;
  eyebrow: string;
  detailLine: string;
  description: string;
  coverUrl: string;
};

export type ProjectConcept = {
  label: string;
  description?: string;
  images: Photo[];
};

export type ProjectDetail = {
  slug: string;
  title: string;
  client?: string;
  year?: number;
  category?: string;
  location?: string;
  size?: string;
  description: string;
  coverUrl: string;
  images: Photo[];
  concepts: ProjectConcept[];
};

const PROJECT_ORDER = "coalesce(order, 9999) asc, year desc, _createdAt asc";

function photoUrl(photo: SanityPhoto, width: number): string {
  return urlFor(photo).width(width).url();
}

function toPhotos(
  photos: SanityPhoto[] | null | undefined,
  fallbackAlt: string,
  width: number
): Photo[] {
  return (photos ?? [])
    .filter((photo) => photo.asset)
    .map((photo) => ({
      src: photoUrl(photo, width),
      alt: photo.alt || fallbackAlt,
    }));
}

export async function getAllProjects(): Promise<ProjectListItem[]> {
  const projects = await client.fetch<
    Array<{
      slug: string;
      title: string;
      client?: string;
      year?: number;
      category?: string;
      coverImage: SanityPhoto;
    }>
  >(
    groq`*[_type == "project" && defined(slug.current) && defined(coverImage.asset)]
      | order(${PROJECT_ORDER}) {
        "slug": slug.current, title, client, year, category, coverImage
      }`,
    {},
    fetchOptions
  );

  return projects.map(({ coverImage, ...project }) => ({
    ...project,
    coverUrl: photoUrl(coverImage, 1200),
  }));
}

export async function getFeaturedProjects(): Promise<FeaturedProject[]> {
  const projects = await client.fetch<
    Array<{
      slug: string;
      title: string;
      client?: string;
      eyebrow?: string;
      size?: string;
      location?: string;
      category?: string;
      description: string;
      shortDescription?: string;
      coverImage: SanityPhoto;
    }>
  >(
    groq`*[_type == "project" && featured == true && defined(slug.current) && defined(coverImage.asset)]
      | order(${PROJECT_ORDER}) {
        "slug": slug.current, title, client, eyebrow, size, location, category,
        description, shortDescription, coverImage
      }`,
    {},
    fetchOptions
  );

  return projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    eyebrow: project.eyebrow || project.client || "",
    detailLine: project.size || project.location || project.category || "",
    description: project.shortDescription || project.description,
    coverUrl: photoUrl(project.coverImage, 2000),
  }));
}

export async function getProjectBySlug(
  slug: string
): Promise<ProjectDetail | null> {
  const project = await client.fetch<{
    slug: string;
    title: string;
    client?: string;
    year?: number;
    category?: string;
    location?: string;
    size?: string;
    description: string;
    coverImage: SanityPhoto;
    images?: SanityPhoto[];
    concepts?: Array<{
      label: string;
      description?: string;
      images?: SanityPhoto[];
    }>;
  } | null>(
    groq`*[_type == "project" && slug.current == $slug][0] {
      "slug": slug.current, title, client, year, category, location, size,
      description, coverImage, images, concepts
    }`,
    { slug },
    fetchOptions
  );

  if (!project || !project.coverImage?.asset) return null;

  return {
    slug: project.slug,
    title: project.title,
    client: project.client,
    year: project.year,
    category: project.category,
    location: project.location,
    size: project.size,
    description: project.description,
    coverUrl: photoUrl(project.coverImage, 1800),
    images: toPhotos(project.images, project.title, 1200),
    concepts: (project.concepts ?? []).map((concept) => ({
      label: concept.label,
      description: concept.description,
      images: toPhotos(concept.images, concept.label, 1200),
    })),
  };
}

/** Ordered slugs + titles, used for static params and next-project links. */
export async function getProjectSlugs(): Promise<
  Array<{ slug: string; title: string }>
> {
  return client.fetch(
    groq`*[_type == "project" && defined(slug.current)] | order(${PROJECT_ORDER}) {
      "slug": slug.current, title
    }`,
    {},
    fetchOptions
  );
}

/** Home page gallery: standalone gallery photos plus every project photo
 * (cover, detail or concept) with "Show in landing page gallery" turned on. */
export async function getGalleryImages(): Promise<Photo[]> {
  const { standalone, projects } = await client.fetch<{
    standalone: Array<{ image: SanityPhoto; title?: string }>;
    projects: Array<{
      title: string;
      cover: SanityPhoto | null;
      photos: SanityPhoto[];
      conceptPhotos: SanityPhoto[];
    }>;
  }>(
    groq`{
      "standalone": *[_type == "galleryItem" && defined(image.asset)]
        | order(coalesce(order, 9999) asc, _createdAt asc) { image, title },
      "projects": *[_type == "project"] | order(${PROJECT_ORDER}) {
        title,
        "cover": select(coverImage.showInGallery == true => coverImage, null),
        "photos": coalesce(images[showInGallery == true && defined(asset)], []),
        "conceptPhotos": coalesce(concepts[].images[showInGallery == true && defined(asset)], [])
      }
    }`,
    {},
    fetchOptions
  );

  const standalonePhotos = standalone
    .filter(({ image }) => image.asset)
    .map(({ image, title }) => ({
      src: photoUrl(image, 800),
      alt: image.alt || title || "Mural photo",
    }));

  const projectPhotos = projects.flatMap((project) =>
    toPhotos(
      [
        ...(project.cover?.asset ? [project.cover] : []),
        ...project.photos,
        ...project.conceptPhotos,
      ],
      project.title,
      800
    )
  );

  // De-duplicate in case the same underlying photo is flagged twice.
  const seen = new Set<string>();
  return [...standalonePhotos, ...projectPhotos].filter(({ src }) => {
    if (seen.has(src)) return false;
    seen.add(src);
    return true;
  });
}
