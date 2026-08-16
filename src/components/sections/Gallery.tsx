"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type GalleryItem = {
  image: string;
  alt: string;
};

const GALLERY_ITEMS: GalleryItem[] = [
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

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const tileVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function GalleryTile({ item }: { item: GalleryItem }) {
  const splashRef = useRef<SVGCircleElement>(null);
  const tileRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const splash = splashRef.current;
    const tile = tileRef.current;
    if (!splash || !tile) return;

    gsap.set(splash, { scale: 0, transformOrigin: "center" });

    const trigger = ScrollTrigger.create({
      trigger: tile,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(splash, { scale: 1, duration: 0.45, ease: "back.out(2)" });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <motion.div
      ref={tileRef}
      variants={tileVariants}
      className="group relative aspect-square overflow-hidden rounded-xl"
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <svg
        className="pointer-events-none absolute -right-2 -top-2 h-9 w-9"
        viewBox="0 0 36 36"
        aria-hidden="true"
      >
        <circle ref={splashRef} cx="18" cy="18" r="15" fill="#D93E87" opacity="0.85" />
      </svg>
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="bg-cream px-6 py-20 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-ink-soft">
              Gallery
            </p>
            <h2 className="mt-2 font-[var(--font-fraunces)] text-3xl font-bold text-magenta lg:text-4xl">
              A closer look at the walls
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="group inline-flex w-fit items-center gap-1.5 rounded-full border-2 border-ink px-5 py-2.5 text-sm font-bold text-ink transition-all duration-300 hover:gap-2.5 hover:border-magenta hover:bg-magenta hover:text-cream"
          >
            View full gallery
            <i
              className="ti ti-arrow-right text-base transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4"
        >
          {GALLERY_ITEMS.map((item) => (
            <GalleryTile key={item.image} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}