export type ProjectConcept = {
  label: string;
  description: string;
  images: string[];
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: number;
  category: string;
  location?: string;
  size?: string;
  description: string;
  coverImage: string;
  // Most projects: a flat gallery. Multi-concept projects (like the
  // 2025 floor mural series) use `concepts` instead of `images`.
  images?: string[];
  concepts?: ProjectConcept[];
  featured: boolean;
};

export const PROJECTS: Project[] = [
  {
    slug: "tv3-carpark",
    title: "TV3 Carpark Mural",
    client: "Tauranga City Council",
    year: 2026,
    category: "Public art",
    size: "160 sqm",
    description:
      "A full-height carpark facade turned into one of the city's biggest pieces of public colour, commissioned through Tauranga City Council's public art fund.",
    coverImage: "/portfolio/project1.jpeg",
    images: [
      "/portfolio/project1.jpeg",
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
    featured: true,
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
    featured: false,
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
    coverImage: "/portfolio/project9.jpeg",
    images: [
      "/portfolio/te-manawa-o-papamoa-school/1.jpg",
      "/portfolio/te-manawa-o-papamoa-school/2.jpg",
    ],
    featured: false,
  },
];

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getFeaturedProjects() {
  return PROJECTS.filter((project) => project.featured);
}