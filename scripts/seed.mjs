/**
 * One-off migration: uploads the images in /public and creates the matching
 * Sanity documents, so the site starts with exactly the content it has today.
 *
 * Usage: npm run seed  (needs NEXT_PUBLIC_SANITY_PROJECT_ID,
 * NEXT_PUBLIC_SANITY_DATASET and SANITY_API_WRITE_TOKEN in .env.local)
 *
 * Safe to re-run: documents are created with stable ids (createOrReplace)
 * and Sanity de-duplicates identical image uploads by content hash.
 */
import { createClient } from "@sanity/client";
import { createReadStream, existsSync } from "node:fs";
import { basename, join } from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_API_WRITE_TOKEN in .env.local (see .env.local.example)."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-08-01",
  useCdn: false,
});

const PUBLIC_DIR = join(import.meta.dirname, "..", "public");

const PROJECTS = [
  {
    slug: "tv3-carpark",
    title: "TV3 Carpark Mural",
    client: "Tauranga City Council",
    eyebrow: "Creative Bay of Plenty × Tauranga City Council",
    year: 2026,
    category: "Public art",
    size: "160 sqm",
    description:
      "A full-height carpark facade turned into one of the city's biggest pieces of public colour, commissioned through Tauranga City Council's public art fund.",
    shortDescription:
      "A full-height carpark facade turned into one of the city's biggest pieces of public colour.",
    coverImage: "/portfolio/project1.jpeg",
    images: [
      "/portfolio/tv3-carpark/2.jpg",
      "/portfolio/tv3-carpark/3.jpg",
    ],
    featured: true,
  },
  {
    slug: "shell-hop-floor-mural",
    title: "'Shell Hop' Interactive Floor Mural",
    client: "Tauranga City Council",
    year: 2026,
    category: "Interactive artwork",
    size: "12–18 sqm",
    description:
      "A playable floor mural inviting people to hop across a trail of native shells - part of a series of interactive public floor pieces.",
    shortDescription:
      "A playable floor mural inviting people to hop across a trail of native shells.",
    coverImage: "/portfolio/project2.jpeg",
    images: [
      "/portfolio/shell-hop-floor-mural/1.jpg",
      "/portfolio/shell-hop-floor-mural/2.jpg",
    ],
    featured: true,
  },
  {
    slug: "welcome-bay-therapy-room",
    title: "'Therapy Room' Mural",
    client: "Welcome Bay Community Centre",
    year: 2026,
    category: "Community projects",
    size: "15 sqm",
    description:
      "A calming, sensory-friendly mural created for the therapy room at Welcome Bay Community Centre, painted alongside local youth.",
    shortDescription:
      "A calming, sensory-friendly mural painted alongside local youth, start to finish.",
    coverImage: "/portfolio/project3.jpeg",
    images: [
      "/portfolio/welcome-bay-therapy-room/1.jpg",
      "/portfolio/welcome-bay-therapy-room/2.jpg",
    ],
    featured: true,
  },
  {
    slug: "carpark-creatures",
    title: "Carpark Creatures",
    client: "Tauranga City Council",
    year: 2026,
    category: "Public art",
    size: "84 hand-painted animals, 2 buildings",
    description:
      "A scavenger-hunt trail of 84 hand-painted native New Zealand creatures, hidden through lift foyers, pillars and stairwells across two multi-storey carpark buildings.",
    coverImage: "/portfolio/project4.jpeg",
    images: [
      "/portfolio/carpark-creatures/1.jpg",
      "/portfolio/carpark-creatures/2.jpg",
      "/portfolio/carpark-creatures/3.jpg",
      "/portfolio/carpark-creatures/4.jpg",
    ],
    featured: false,
  },
  {
    slug: "city-centre-floor-mural-series",
    title: "Interactive Floor Mural Series",
    client: "Tauranga City Council",
    year: 2025,
    category: "Interactive artwork",
    location: "Tauranga City Centre",
    description:
      "A three-part series of playable floor murals across Tauranga's city centre, each with its own concept and colour story while sharing one connected visual language.",
    shortDescription:
      "A three-part series of playable floor murals, each with its own concept and colour story.",
    coverImage: "/portfolio/project5.jpeg",
    concepts: [
      {
        label: "Concept 1",
        description: "The first floor piece in the series.",
        images: [
          "/portfolio/city-centre-floor-mural-series/concept-1/1.jpg",
          "/portfolio/city-centre-floor-mural-series/concept-1/2.jpg",
        ],
      },
      {
        label: "Concept 2",
        description: "The second floor piece in the series.",
        images: [
          "/portfolio/city-centre-floor-mural-series/concept-2/1.jpg",
          "/portfolio/city-centre-floor-mural-series/concept-2/2.jpg",
        ],
      },
      {
        label: "Concept 3",
        description: "The third floor piece in the series.",
        images: [
          "/portfolio/city-centre-floor-mural-series/concept-3/1.jpg",
          "/portfolio/city-centre-floor-mural-series/concept-3/2.jpg",
        ],
      },
    ],
    featured: true,
  },
  {
    slug: "feel-good-art-club-studio",
    title: "The Feel Good Art Club Studio",
    client: "The Feel Good Art Club",
    year: 2025,
    category: "Branded spaces",
    size: "15 sqm",
    description:
      "A full studio mural built alongside brand identity work, designed so the artwork and the business's visual identity work as one piece.",
    shortDescription:
      "A full studio mural built alongside brand identity work, made to work as one piece.",
    coverImage: "/portfolio/project6.jpeg",
    images: [
      "/portfolio/feel-good-art-club-studio/1.jpg",
      "/portfolio/feel-good-art-club-studio/2.jpg",
    ],
    featured: true,
  },
  {
    slug: "kaiate-falls-chorus-box",
    title: "Kaiate Falls Chorus Electrical Box",
    client: "Chorus",
    year: 2024,
    category: "Public art",
    description:
      "A street-level electrical cabinet near Kaiate Falls transformed into a small piece of public art, commissioned by Chorus.",
    coverImage: "/portfolio/project7.jpeg",
    images: ["/portfolio/kaiate-falls-chorus-box/1.jpg"],
    featured: false,
  },
  {
    slug: "the-barista-mobile-coffee-shop",
    title: "'The Barista' Mobile Coffee Shop",
    client: "Private commission",
    year: 2024,
    category: "Commercial murals",
    description:
      "A full exterior wrap-style mural for a mobile coffee trailer, designed to stand out and travel well across different locations.",
    coverImage: "/portfolio/project8.jpeg",
    images: [
      "/portfolio/the-barista-mobile-coffee-shop/1.jpg",
      "/portfolio/the-barista-mobile-coffee-shop/2.jpg",
    ],
    featured: false,
  },
  {
    slug: "te-manawa-o-papamoa-school",
    title: "Te Manawa ō Pāpāmoa School Mural",
    client: "Tauranga City Council",
    year: 2024,
    category: "School artwork",
    description:
      "A school mural created in partnership with Te Manawa ō Pāpāmoa, translating the kura's values and identity into visual form.",
    shortDescription:
      "A school mural translating Te Manawa ō Pāpāmoa's values and identity into visual form.",
    coverImage: "/portfolio/project9.jpeg",
    images: [
      "/portfolio/te-manawa-o-papamoa-school/1.jpg",
      "/portfolio/te-manawa-o-papamoa-school/2.jpg",
    ],
    featured: true,
  },
];

const GALLERY = [
  { image: "/Gallery/gallery1.jpeg", alt: "Mural detail, close crop" },
  { image: "/Gallery/gallery2.jpeg", alt: "Community mural in progress" },
  { image: "/Gallery/gallery3.jpeg", alt: "Full wall mural, wide shot" },
  { image: "/Gallery/gallery4.jpeg", alt: "Floor mural, overhead view" },
  { image: "/Gallery/gallery5.jpeg", alt: "Sarah painting on site" },
  { image: "/Gallery/gallery6.jpeg", alt: "Character detail from a mural" },
  { image: "/Gallery/gallery7.jpeg", alt: "Commercial mural exterior" },
  { image: "/Gallery/gallery8.jpeg", alt: "Colour palette close-up" },
  { image: "/Gallery/gallery9.jpeg", alt: "School mural, full view" },
  { image: "/Gallery/gallery10.jpeg", alt: "Finished mural, golden hour" },
];

const uploadedAssets = new Map();

async function uploadImage(publicPath) {
  const filePath = join(PUBLIC_DIR, publicPath.replace(/^\//, ""));
  if (!existsSync(filePath)) {
    console.warn(`  ! skipping missing file: ${publicPath}`);
    return null;
  }
  if (uploadedAssets.has(filePath)) return uploadedAssets.get(filePath);

  console.log(`  ↑ uploading ${publicPath}`);
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename: basename(filePath),
  });
  uploadedAssets.set(filePath, asset._id);
  return asset._id;
}

function imageRef(assetId, extra = {}) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    ...extra,
  };
}

async function uploadImageArray(paths, keyPrefix, alt) {
  const result = [];
  for (const [index, path] of (paths ?? []).entries()) {
    const assetId = await uploadImage(path);
    if (!assetId) continue;
    result.push({
      ...imageRef(assetId, { alt, showInGallery: false }),
      _key: `${keyPrefix}-${index}`,
    });
  }
  return result;
}

async function run() {
  console.log(`Seeding project "${projectId}" dataset "${dataset}"…\n`);

  for (const [index, project] of PROJECTS.entries()) {
    console.log(`Project: ${project.title}`);
    const coverAssetId = await uploadImage(project.coverImage);
    if (!coverAssetId) {
      console.warn(`  ! no cover image, skipping project ${project.slug}`);
      continue;
    }

    const images = await uploadImageArray(
      project.images,
      project.slug,
      project.title
    );

    const concepts = [];
    for (const [conceptIndex, concept] of (project.concepts ?? []).entries()) {
      concepts.push({
        _type: "concept",
        _key: `${project.slug}-concept-${conceptIndex}`,
        label: concept.label,
        description: concept.description,
        images: await uploadImageArray(
          concept.images,
          `${project.slug}-c${conceptIndex}`,
          concept.label
        ),
      });
    }

    await client.createOrReplace({
      _id: `project-${project.slug}`,
      _type: "project",
      title: project.title,
      slug: { _type: "slug", current: project.slug },
      client: project.client,
      eyebrow: project.eyebrow,
      year: project.year,
      category: project.category,
      location: project.location,
      size: project.size,
      description: project.description,
      shortDescription: project.shortDescription,
      coverImage: imageRef(coverAssetId, {
        alt: project.title,
        showInGallery: false,
      }),
      images,
      concepts,
      featured: project.featured,
      order: index + 1,
    });
    console.log(`  ✓ project-${project.slug}\n`);
  }

  for (const [index, item] of GALLERY.entries()) {
    const assetId = await uploadImage(item.image);
    if (!assetId) continue;

    await client.createOrReplace({
      _id: `galleryItem-${index + 1}`,
      _type: "galleryItem",
      title: item.alt,
      image: imageRef(assetId, { alt: item.alt }),
      order: index + 1,
    });
    console.log(`✓ galleryItem-${index + 1} (${item.alt})`);
  }

  console.log("\nDone. Open /studio to manage the content.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
